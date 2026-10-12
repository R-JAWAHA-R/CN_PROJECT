// Unit II: Data Link Layer & MAC Sublayer - Curriculum & Topic Hub
// Master Pedagogical Hierarchy strictly aligned with the Syllabus PDF notes:
// Top 10 Core Topics from PDF + 2 Associated Curriculum Chapters (27 Complete Lessons)
// Reference Textbooks:
// 1. A.S. Tanenbaum & D.J. Wetherall, "Computer Networks", Pearson, 6th Edition, 2021
// 2. Behrouz A. Forouzan, "Data Communications and Networking with TCP/IP", McGraw Hill, 6th Edition, 2022
// 3. J.F. Kurose & K.W. Ross, "Computer Networking: A Top-Down Approach", Pearson, 8th Edition

const Unit2Module = {
  render: function(container) {
    container.innerHTML = `
      <!-- Unit Banner -->
      <div class="welcome-banner" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #075985 100%); color: white; border-radius: 16px; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 10px 25px -5px rgba(2, 132, 199, 0.25);">
        <div class="welcome-text">
          <div style="font-size: 0.8rem; font-weight: 800; color: #bae6fd; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
            <span style="background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 4px;">MODULE 2</span>
            <span>Computer Networks • Prescribed Curriculum & Master Syllabus Notes</span>
          </div>
          <h2 style="font-size: 1.85rem; font-weight: 900; margin-bottom: 0.75rem; letter-spacing: -0.02em;">Data Link Layer, Framing & MAC Sublayer</h2>
          <p style="font-size: 0.95rem; line-height: 1.6; color: #e0f2fe; max-width: 900px;">
            The complete Layer 2 curriculum structured into the <strong>Top 10 Official Topics</strong> from your syllabus PDF plus switching & device connecting infrastructure. Explore DLL design issues, framing, parity/checksum/Hamming/CRC error codes, sliding window protocols, ALOHA & CSMA multiaccess mechanisms, wired Ethernet 802.3, Wi-Fi 802.11, and transparent bridges.
          </p>
        </div>

        <!-- Quick Interactive Simulators Launcher Bar -->
        <div style="margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid rgba(255,255,255,0.2);">
          <div style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #bae6fd; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.4rem;">
            <i class="fa-solid fa-flask"></i> Live Interactive Visual Laboratories (Module 2)
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <button class="sim-btn" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white;" onclick="App.loadTopic('hamming-code')">
              🔬 Hamming Code Lab
            </button>
            <button class="sim-btn" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white;" onclick="App.loadTopic('crc')">
              ⚡ CRC Modulo-2 Division
            </button>
            <button class="sim-btn" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white;" onclick="App.loadTopic('sliding-window')">
              🚀 Sliding Window Studio
            </button>
            <button class="sim-btn" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white;" onclick="App.loadTopic('aloha')">
              📡 ALOHA & CSMA Contention
            </button>
            <button class="sim-btn" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white;" onclick="App.loadTopic('ethernet')">
              🔍 Ethernet & 802.11 Frame Explorer
            </button>
            <button class="sim-btn" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white;" onclick="App.loadTopic('framing')">
              ✂️ Byte & Bit Stuffing Studio
            </button>
          </div>
        </div>
      </div>

      <!-- MASTER SYLLABUS HIERARCHY ACCORDION / TABLE (EXACT MATCH WITH PDF PAGE 1 & TOPICS) -->
      <div class="study-card" style="margin-bottom: 2.25rem; border: 2px solid #bae6fd;">
        <div class="study-card-header flex justify-between items-center" style="border-bottom: 1px solid var(--border-light); padding-bottom: 1rem; margin-bottom: 1.25rem;">
          <div>
            <span class="topic-number-badge" style="background: #0284c7; color: white; font-weight: 800;">PDF OFFICIAL HIERARCHY</span>
            <h3 class="study-card-title text-lg font-black text-gray-900 dark:text-white mt-1">
              Revised Top 10 Topics Hierarchy & Curriculum Breakdown
            </h3>
          </div>
          <span class="badge" style="background: #e0f2fe; color: #0284c7; font-weight: 800; padding: 6px 14px; border-radius: 9999px;">
            12 Chapters • 27 Granular Subtopics
          </span>
        </div>

        <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          This pedagogical hierarchy is derived directly from the syllabus notes. Rather than an unorganized flat list, Module 2 is structured into <strong>10 foundational chapters</strong> covering the core link-layer mechanics plus <strong>2 associated networking chapters</strong> on Layer 2 switching and connecting devices.
        </p>

        <!-- Hierarchy Table -->
        <div class="overflow-x-auto">
          <table class="wiki-table w-full text-xs">
            <thead>
              <tr class="bg-blue-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <th style="width: 5%; text-align: center;">#</th>
                <th style="width: 28%;">Main Syllabus Topic (PDF Hierarchy)</th>
                <th style="width: 32%;">What to Prepare Under It</th>
                <th style="width: 35%;">Nested Subtopics & Direct Access</th>
              </tr>
            </thead>
            <tbody>
              <!-- Topic 1 -->
              <tr class="hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-colors">
                <td class="font-bold text-center text-blue-600 dark:text-blue-400">1</td>
                <td>
                  <a href="#chap-1" class="font-bold text-gray-900 dark:text-white hover:text-blue-600">
                    Design Issues of the Data Link Layer
                  </a>
                  <div class="text-[11px] text-gray-400">Layer 2 Foundations</div>
                </td>
                <td class="text-gray-600 dark:text-gray-300">
                  Services provided to network layer, framing boundaries, error control, and flow control.
                </td>
                <td>
                  <div class="flex flex-wrap gap-1">
                    <button class="px-2 py-1 rounded bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-200 hover:bg-blue-200 font-semibold text-[11px]" onclick="App.loadTopic('dll-design-issues')">
                      📄 DLL Design Issues
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Topic 2 -->
              <tr class="hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-colors">
                <td class="font-bold text-center text-blue-600 dark:text-blue-400">2</td>
                <td>
                  <a href="#chap-2" class="font-bold text-gray-900 dark:text-white hover:text-blue-600">
                    Framing in the Data Link Layer
                  </a>
                  <div class="text-[11px] text-gray-400">Delimiting Bitstreams • Stuffing Lab</div>
                </td>
                <td class="text-gray-600 dark:text-gray-300">
                  Character count, byte stuffing (flag/escape bytes), bit stuffing (HDLC zero insertion), coding violations.
                </td>
                <td>
                  <div class="flex flex-wrap gap-1">
                    <button class="px-2 py-1 rounded bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-200 hover:bg-blue-200 font-semibold text-[11px]" onclick="App.loadTopic('framing')">
                      📄 Framing Techniques
                    </button>
                    <button class="px-2 py-1 rounded bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-200 hover:bg-blue-200 font-semibold text-[11px]" onclick="App.loadTopic('byte-stuffing')">
                      ✂️ Byte Stuffing
                    </button>
                    <button class="px-2 py-1 rounded bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-200 hover:bg-blue-200 font-semibold text-[11px]" onclick="App.loadTopic('bit-stuffing')">
                      ✂️ Bit Stuffing
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Topic 3 -->
              <tr class="hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-colors">
                <td class="font-bold text-center text-blue-600 dark:text-blue-400">3</td>
                <td>
                  <a href="#chap-3" class="font-bold text-gray-900 dark:text-white hover:text-blue-600">
                    Error Detection and Correction in DLL
                  </a>
                  <div class="text-[11px] text-gray-400">Hamming Distance & Fundamentals</div>
                </td>
                <td class="text-gray-600 dark:text-gray-300">
                  Single vs burst errors, redundancy, detection vs correction, parity checking, Internet checksum, Hamming distance, FEC vs ARQ.
                </td>
                <td>
                  <div class="flex flex-wrap gap-1">
                    <button class="px-2 py-1 rounded bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-200 hover:bg-blue-200 font-semibold text-[11px]" onclick="App.loadTopic('error-detection')">
                      📄 Error Principles
                    </button>
                    <button class="px-2 py-1 rounded bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-200 hover:bg-blue-200 font-semibold text-[11px]" onclick="App.loadTopic('parity')">
                      📄 Parity (1D & 2D)
                    </button>
                    <button class="px-2 py-1 rounded bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-200 hover:bg-blue-200 font-semibold text-[11px]" onclick="App.loadTopic('checksum')">
                      📄 Internet Checksum
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Topic 4 -->
              <tr class="hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-colors">
                <td class="font-bold text-center text-blue-600 dark:text-blue-400">4</td>
                <td>
                  <a href="#chap-4" class="font-bold text-gray-900 dark:text-white hover:text-blue-600">
                    Hamming Code (Error Detection & Correction)
                  </a>
                  <div class="text-[11px] text-gray-400">Interactive Hamming Lab</div>
                </td>
                <td class="text-gray-600 dark:text-gray-300">
                  Parity bit positions (powers of 2), finding and correcting errors, Hamming (7,4), syndrome calculations, SECDED.
                </td>
                <td>
                  <div class="flex flex-wrap gap-1">
                    <button class="px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 hover:bg-purple-200 font-semibold text-[11px]" onclick="App.loadTopic('hamming-code')">
                      🔬 Hamming Code (7,4) & SECDED
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Topic 5 -->
              <tr class="hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-colors">
                <td class="font-bold text-center text-blue-600 dark:text-blue-400">5</td>
                <td>
                  <a href="#chap-5" class="font-bold text-gray-900 dark:text-white hover:text-blue-600">
                    Cyclic Redundancy Check (CRC)
                  </a>
                  <div class="text-[11px] text-gray-400">Live Modulo-2 Calculator</div>
                </td>
                <td class="text-gray-600 dark:text-gray-300">
                  Binary XOR division, CRC numerical calculation, generator polynomials, CRC-32, hardware shift register verification.
                </td>
                <td>
                  <div class="flex flex-wrap gap-1">
                    <button class="px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 hover:bg-purple-200 font-semibold text-[11px]" onclick="App.loadTopic('crc')">
                      ⚡ CRC Modulo-2 Division
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Topic 6 -->
              <tr class="hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-colors">
                <td class="font-bold text-center text-blue-600 dark:text-blue-400">6</td>
                <td>
                  <a href="#chap-6" class="font-bold text-gray-900 dark:text-white hover:text-blue-600">
                    DLL Protocols & Sliding Window Protocols
                  </a>
                  <div class="text-[11px] text-gray-400">Pipelined ARQ Studio • 6 Subtopics</div>
                </td>
                <td class="text-gray-600 dark:text-gray-300">
                  Simplex protocols, Stop-and-Wait, link utilization, sliding window concepts, Go-Back-N, Selective Repeat, window size limits.
                </td>
                <td>
                  <div class="flex flex-wrap gap-1">
                    <button class="px-2 py-1 rounded bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-200 hover:bg-blue-200 font-semibold text-[11px]" onclick="App.loadTopic('flow-control')">
                      📄 Flow Control
                    </button>
                    <button class="px-2 py-1 rounded bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-200 hover:bg-blue-200 font-semibold text-[11px]" onclick="App.loadTopic('simplex-protocol')">
                      📄 Simplex Protocols
                    </button>
                    <button class="px-2 py-1 rounded bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-200 hover:bg-blue-200 font-semibold text-[11px]" onclick="App.loadTopic('stop-and-wait')">
                      🚀 Stop-and-Wait
                    </button>
                    <button class="px-2 py-1 rounded bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-200 hover:bg-blue-200 font-semibold text-[11px]" onclick="App.loadTopic('sliding-window')">
                      🚀 Sliding Window
                    </button>
                    <button class="px-2 py-1 rounded bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-200 hover:bg-blue-200 font-semibold text-[11px]" onclick="App.loadTopic('go-back-n')">
                      🚀 Go-Back-N
                    </button>
                    <button class="px-2 py-1 rounded bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-200 hover:bg-blue-200 font-semibold text-[11px]" onclick="App.loadTopic('selective-repeat')">
                      🚀 Selective Repeat
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Topic 7 -->
              <tr class="hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-colors">
                <td class="font-bold text-center text-blue-600 dark:text-blue-400">7</td>
                <td>
                  <a href="#chap-7" class="font-bold text-gray-900 dark:text-white hover:text-blue-600">
                    MAC Sublayer & Channel Allocation Problem
                  </a>
                  <div class="text-[11px] text-gray-400">Multiaccess Foundations</div>
                </td>
                <td class="text-gray-600 dark:text-gray-300">
                  Static channel allocation (FDM/TDM) vs dynamic allocation, 5 multiaccess channel assumptions, MAC vs LLC sublayer.
                </td>
                <td>
                  <div class="flex flex-wrap gap-1">
                    <button class="px-2 py-1 rounded bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-200 hover:bg-blue-200 font-semibold text-[11px]" onclick="App.loadTopic('channel-allocation')">
                      📄 Channel Allocation Problem
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Topic 8 -->
              <tr class="hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-colors">
                <td class="font-bold text-center text-blue-600 dark:text-blue-400">8</td>
                <td>
                  <a href="#chap-8" class="font-bold text-gray-900 dark:text-white hover:text-blue-600">
                    Multiple Access Protocols (ALOHA & CSMA)
                  </a>
                  <div class="text-[11px] text-gray-400">Contention Simulator</div>
                </td>
                <td class="text-gray-600 dark:text-gray-300">
                  Pure ALOHA (18.4%), Slotted ALOHA (36.8%), 1-p / non-p / p-persistent CSMA, CSMA/CD, CSMA/CA, collision-free token passing.
                </td>
                <td>
                  <div class="flex flex-wrap gap-1">
                    <button class="px-2 py-1 rounded bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-200 hover:bg-blue-200 font-semibold text-[11px]" onclick="App.loadTopic('aloha')">
                      📡 ALOHA Protocols
                    </button>
                    <button class="px-2 py-1 rounded bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-200 hover:bg-blue-200 font-semibold text-[11px]" onclick="App.loadTopic('csma-protocols')">
                      📡 CSMA / CD / CA
                    </button>
                    <button class="px-2 py-1 rounded bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-200 hover:bg-blue-200 font-semibold text-[11px]" onclick="App.loadTopic('collision-free-protocols')">
                      📡 Collision-Free
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Topic 9 -->
              <tr class="hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-colors">
                <td class="font-bold text-center text-blue-600 dark:text-blue-400">9</td>
                <td>
                  <a href="#chap-9" class="font-bold text-gray-900 dark:text-white hover:text-blue-600">
                    Ethernet MAC Sublayer Protocol (IEEE 802.3)
                  </a>
                  <div class="text-[11px] text-gray-400">Frame Explorer • MAC Addressing</div>
                </td>
                <td class="text-gray-600 dark:text-gray-300">
                  Classic & switched Ethernet, 802.3 frame format, 64-byte minimum frame, binary exponential backoff, 48-bit EUI-48 MAC addresses.
                </td>
                <td>
                  <div class="flex flex-wrap gap-1">
                    <button class="px-2 py-1 rounded bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-200 hover:bg-blue-200 font-semibold text-[11px]" onclick="App.loadTopic('ethernet')">
                      🔍 IEEE 802.3 Ethernet
                    </button>
                    <button class="px-2 py-1 rounded bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-200 hover:bg-blue-200 font-semibold text-[11px]" onclick="App.loadTopic('mac-address')">
                      🔍 48-Bit MAC Addressing
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Topic 10 -->
              <tr class="hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-colors">
                <td class="font-bold text-center text-blue-600 dark:text-blue-400">10</td>
                <td>
                  <a href="#chap-10" class="font-bold text-gray-900 dark:text-white hover:text-blue-600">
                    IEEE 802.11 MAC Sublayer (Wireless LAN / Wi-Fi)
                  </a>
                  <div class="text-[11px] text-gray-400">Hidden/Exposed Terminal • RTS/CTS</div>
                </td>
                <td class="text-gray-600 dark:text-gray-300">
                  Wireless LAN architecture (BSS, ESS, AP), DCF CSMA/CA, SIFS/DIFS timing, Hidden/Exposed station problems, RTS/CTS handshaking, 802.11 frames.
                </td>
                <td>
                  <div class="flex flex-wrap gap-1">
                    <button class="px-2 py-1 rounded bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-200 hover:bg-blue-200 font-semibold text-[11px]" onclick="App.loadTopic('wireless-lan-protocols')">
                      📶 Wireless LAN Architecture
                    </button>
                    <button class="px-2 py-1 rounded bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-200 hover:bg-blue-200 font-semibold text-[11px]" onclick="App.loadTopic('wifi-mac-sublayer')">
                      📶 802.11 MAC & RTS/CTS
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Topic 11 (Curriculum Extension) -->
              <tr class="hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-colors bg-gray-50/40 dark:bg-gray-800/30">
                <td class="font-bold text-center text-gray-500">11</td>
                <td>
                  <a href="#chap-11" class="font-bold text-gray-900 dark:text-white hover:text-blue-600">
                    Data Link Layer Switching & Bridges
                  </a>
                  <div class="text-[11px] text-gray-400">Associated Layer 2 Curriculum</div>
                </td>
                <td class="text-gray-600 dark:text-gray-300">
                  Transparent learning bridges, forwarding and filtering decisions, Spanning Tree Protocol (IEEE 802.1D STP), Virtual LANs (IEEE 802.1Q).
                </td>
                <td>
                  <div class="flex flex-wrap gap-1">
                    <button class="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 font-semibold text-[11px]" onclick="App.loadTopic('dll-switching')">
                      🏢 DLL Switching & STP
                    </button>
                    <button class="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 font-semibold text-[11px]" onclick="App.loadTopic('vlan')">
                      🏢 IEEE 802.1Q VLANs
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Topic 12 (Curriculum Extension) -->
              <tr class="hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-colors bg-gray-50/40 dark:bg-gray-800/30">
                <td class="font-bold text-center text-gray-500">12</td>
                <td>
                  <a href="#chap-12" class="font-bold text-gray-900 dark:text-white hover:text-blue-600">
                    Network Connecting Devices & Layer 2 Protocols
                  </a>
                  <div class="text-[11px] text-gray-400">Associated Layer 2 Curriculum</div>
                </td>
                <td class="text-gray-600 dark:text-gray-300">
                  Comprehensive 5-layer connecting device taxonomy (Repeaters, Hubs, Bridges, Switches, Routers, Gateways), ARP IP-to-MAC resolution.
                </td>
                <td>
                  <div class="flex flex-wrap gap-1">
                    <button class="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 font-semibold text-[11px]" onclick="App.loadTopic('network-devices')">
                      🔌 Connecting Devices
                    </button>
                    <button class="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 font-semibold text-[11px]" onclick="App.loadTopic('arp')">
                      🔌 ARP Protocol
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
            <i class="fa-solid fa-list-ol text-blue-600"></i> Jump Directly to Syllabus Chapter:
          </span>
          <span style="color: #0284c7; font-size: 0.75rem; font-weight: 700;">12 Chapters Defined in Notes</span>
        </div>
        <div class="flex flex-wrap gap-1.5">
          <a href="#chap-1" class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 text-gray-700 dark:text-gray-300">1. DLL Design</a>
          <a href="#chap-2" class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 text-gray-700 dark:text-gray-300">2. Framing</a>
          <a href="#chap-3" class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 text-gray-700 dark:text-gray-300">3. Error Detection</a>
          <a href="#chap-4" class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 text-gray-700 dark:text-gray-300">4. Hamming Code</a>
          <a href="#chap-5" class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 text-gray-700 dark:text-gray-300">5. CRC</a>
          <a href="#chap-6" class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 text-gray-700 dark:text-gray-300">6. Sliding Window</a>
          <a href="#chap-7" class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 text-gray-700 dark:text-gray-300">7. MAC Sublayer</a>
          <a href="#chap-8" class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 text-gray-700 dark:text-gray-300">8. Multiple Access</a>
          <a href="#chap-9" class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 text-gray-700 dark:text-gray-300">9. Ethernet 802.3</a>
          <a href="#chap-10" class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 text-gray-700 dark:text-gray-300">10. Wi-Fi 802.11</a>
          <a href="#chap-11" class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 text-gray-700 dark:text-gray-300">11. Switching</a>
          <a href="#chap-12" class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 text-gray-700 dark:text-gray-300">12. Connecting Devices</a>
        </div>
      </div>

      <!-- CHAPTER 1 -->
      <div id="chap-1" class="chapter-block mb-10 pt-4">
        <div class="flex items-center justify-between pb-2 mb-4 border-b-2 border-blue-500">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded bg-blue-600 text-white font-black text-xs">TOPIC 1</span>
            <h3 class="text-base font-extrabold text-gray-900 dark:text-white">Design Issues of the Data Link Layer</h3>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">1 Nested Subtopic</span>
        </div>
        <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('dll-design-issues')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Subtopic 1.1 • Foundation</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Design Issues of the Data Link Layer</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">The four pillars of Layer 2: services provided to Network Layer, framing boundaries, error control, and flow control mechanisms.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 25–35 min</span>
              <span class="text-gfg-green font-bold">7 Practice MCQs</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CHAPTER 2 -->
      <div id="chap-2" class="chapter-block mb-10 pt-4">
        <div class="flex items-center justify-between pb-2 mb-4 border-b-2 border-blue-500">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded bg-blue-600 text-white font-black text-xs">TOPIC 2</span>
            <h3 class="text-base font-extrabold text-gray-900 dark:text-white">Framing in the Data Link Layer</h3>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">3 Nested Subtopics • Stuffing Studio</span>
        </div>
        <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('framing')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Subtopic 2.1 • Core</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Framing in the Data Link Layer</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Breaking continuous bitstreams into discrete frames: character count, byte stuffing, bit stuffing, and physical coding violations.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 20–30 min</span>
              <span class="text-gfg-green font-bold">6 Practice MCQs</span>
            </div>
          </div>

          <div class="study-card topic-catalog-card" onclick="App.loadTopic('byte-stuffing')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Subtopic 2.2 • Standard</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Byte Stuffing (Character Stuffing)</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Escaping reserved delimiter flag bytes inside payload with escape characters. RFC 1662 PPP octet stuffing standard.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 15–20 min</span>
              <span class="text-blue-500 font-bold">Live Stuffing Lab</span>
            </div>
          </div>

          <div class="study-card topic-catalog-card" onclick="App.loadTopic('bit-stuffing')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Subtopic 2.3 • Standard</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">HDLC Bit Stuffing</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Hardware-level zero insertion after five consecutive 1s to prevent data from matching the reserved 01111110 flag pattern.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 15–20 min</span>
              <span class="text-blue-500 font-bold">Live Bit Lab</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CHAPTER 3 -->
      <div id="chap-3" class="chapter-block mb-10 pt-4">
        <div class="flex items-center justify-between pb-2 mb-4 border-b-2 border-blue-500">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded bg-blue-600 text-white font-black text-xs">TOPIC 3</span>
            <h3 class="text-base font-extrabold text-gray-900 dark:text-white">Error Detection and Correction in DLL</h3>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">3 Nested Subtopics • Hamming Distance</span>
        </div>
        <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('error-detection')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Subtopic 3.1 • Foundation</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Error Detection and Correction Principles</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Single-bit vs burst errors, redundancy, Hamming distance d_min formula, and Forward Error Correction (FEC) vs ARQ.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 25–35 min</span>
              <span class="text-gfg-green font-bold">7 Practice MCQs</span>
            </div>
          </div>

          <div class="study-card topic-catalog-card" onclick="App.loadTopic('parity')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Subtopic 3.2 • Standard</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Parity Checking (1D & 2D Parity)</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Even vs odd parity, odd-error detection, limitations on even-bit errors, and 2D matrix single-bit error correction.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 15 min</span>
              <span class="text-gray-500 font-bold">XOR Logic</span>
            </div>
          </div>

          <div class="study-card topic-catalog-card" onclick="App.loadTopic('checksum')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Subtopic 3.3 • Standard</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Internet Checksum (RFC 1071)</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">One's-complement 16-bit summation, end-around carry addition, byte-order independence, and receiver verification.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 20 min</span>
              <span class="text-gray-500 font-bold">TCP/IP Checksum</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CHAPTER 4 -->
      <div id="chap-4" class="chapter-block mb-10 pt-4">
        <div class="flex items-center justify-between pb-2 mb-4 border-b-2 border-purple-500">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded bg-purple-600 text-white font-black text-xs">TOPIC 4</span>
            <h3 class="text-base font-extrabold text-gray-900 dark:text-white">Hamming Code — Error Detection & Correction</h3>
          </div>
          <span class="text-xs text-purple-600 dark:text-purple-400 font-medium">1 Nested Subtopic • Interactive Hamming Lab</span>
        </div>
        <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('hamming-code')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #f3e8ff; color: #7e22ce;">Subtopic 4.1 • Master</span>
              <span class="badge-difficulty advanced">Advanced</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Hamming Code (Error Detection & Correction)</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Hamming (7,4) code, 2^r >= m+r+1 formula, parity bit positions, syndrome calculation, bit error correction, and SECDED.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 25–35 min</span>
              <span class="text-purple-600 font-bold">Interactive Lab + 6 MCQs</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CHAPTER 5 -->
      <div id="chap-5" class="chapter-block mb-10 pt-4">
        <div class="flex items-center justify-between pb-2 mb-4 border-b-2 border-purple-500">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded bg-purple-600 text-white font-black text-xs">TOPIC 5</span>
            <h3 class="text-base font-extrabold text-gray-900 dark:text-white">Cyclic Redundancy Check (CRC)</h3>
          </div>
          <span class="text-xs text-purple-600 dark:text-purple-400 font-medium">1 Nested Subtopic • Live Modulo-2 Calculator</span>
        </div>
        <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('crc')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #f3e8ff; color: #7e22ce;">Subtopic 5.1 • Master</span>
              <span class="badge-difficulty advanced">Advanced</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Cyclic Redundancy Check (CRC)</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Modulo-2 binary XOR division, generator polynomials, codeword formation, Ethernet CRC-32, and burst-error detection guarantees.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 30–40 min</span>
              <span class="text-purple-600 font-bold">Live Calculator + 5 MCQs</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CHAPTER 6 -->
      <div id="chap-6" class="chapter-block mb-10 pt-4">
        <div class="flex items-center justify-between pb-2 mb-4 border-b-2 border-blue-500">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded bg-blue-600 text-white font-black text-xs">TOPIC 6</span>
            <h3 class="text-base font-extrabold text-gray-900 dark:text-white">Data Link Layer Protocols & Sliding Window Protocols</h3>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">6 Nested Subtopics • Sliding Window Studio</span>
        </div>
        <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('flow-control')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Subtopic 6.1 • Foundation</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Flow Control & Channel Utilization</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Preventing receiver buffer overrun, tap/glass analogy, flow control vs congestion control, and bandwidth-delay product.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 20 min</span>
              <span class="text-gray-500 font-bold">Buffer Theory</span>
            </div>
          </div>

          <div class="study-card topic-catalog-card" onclick="App.loadTopic('simplex-protocol')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Subtopic 6.2 • Standard</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Simplex Data Link Protocols</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Unrestricted Simplex (Utopian Protocol), Simplex Stop-and-Wait protocol, receiver pacing, and deadlock failure modes.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 20–25 min</span>
              <span class="text-gray-500 font-bold">Tanenbaum P1 & P2</span>
            </div>
          </div>

          <div class="study-card topic-catalog-card" onclick="App.loadTopic('stop-and-wait')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Subtopic 6.3 • Core</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Stop-and-Wait ARQ</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">1-bit sequence numbers (0 and 1), lost frame/ACK recovery, and channel efficiency derivation U = 1 / (1 + 2a).</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 25 min</span>
              <span class="text-blue-500 font-bold">Interactive ARQ Studio</span>
            </div>
          </div>

          <div class="study-card topic-catalog-card" onclick="App.loadTopic('sliding-window')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Subtopic 6.4 • Master</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Sliding Window Protocols</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Pipelining unacknowledged frames in flight, sending/receiving windows, and utilization formula U = min(1, W / (1 + 2a)).</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 25–35 min</span>
              <span class="text-blue-500 font-bold">Live Pipelining Studio</span>
            </div>
          </div>

          <div class="study-card topic-catalog-card" onclick="App.loadTopic('go-back-n')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Subtopic 6.5 • Core</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Go-Back-N ARQ</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Receiver window Wr = 1, discarding out-of-order frames, cumulative ACKs, window size proof Ws <= 2^k - 1, and timeout recovery.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 25 min</span>
              <span class="text-gray-500 font-bold">HDLC REJ</span>
            </div>
          </div>

          <div class="study-card topic-catalog-card" onclick="App.loadTopic('selective-repeat')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Subtopic 6.6 • Master</span>
              <span class="badge-difficulty advanced">Advanced</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Selective Repeat ARQ</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Receiver buffering of out-of-order frames, retransmitting only lost frames, and window size constraint proof Ws = Wr <= 2^(k-1).</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 25 min</span>
              <span class="text-purple-600 font-bold">TCP SACK Basis</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CHAPTER 7 -->
      <div id="chap-7" class="chapter-block mb-10 pt-4">
        <div class="flex items-center justify-between pb-2 mb-4 border-b-2 border-blue-500">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded bg-blue-600 text-white font-black text-xs">TOPIC 7</span>
            <h3 class="text-base font-extrabold text-gray-900 dark:text-white">Medium Access Control (MAC) Sublayer & Channel Allocation</h3>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">1 Nested Subtopic</span>
        </div>
        <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('channel-allocation')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Subtopic 7.1 • Foundation</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">MAC Sublayer & Channel Allocation</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">MAC vs LLC sublayers, Static FDM/TDM vs Dynamic allocation, contention vs controlled access, and 48-bit MAC addressing.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 30 min</span>
              <span class="text-gfg-green font-bold">8 Practice MCQs</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CHAPTER 8 -->
      <div id="chap-8" class="chapter-block mb-10 pt-4">
        <div class="flex items-center justify-between pb-2 mb-4 border-b-2 border-blue-500">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded bg-blue-600 text-white font-black text-xs">TOPIC 8</span>
            <h3 class="text-base font-extrabold text-gray-900 dark:text-white">Multiple Access Protocols (ALOHA & CSMA)</h3>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">3 Nested Subtopics • Contention Lab</span>
        </div>
        <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('aloha')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Subtopic 8.1 • Core</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">ALOHA Protocols (Pure & Slotted)</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Vulnerable period derivations (2T vs T), throughput formulas S = G·e^-2G (18.4%) vs S = G·e^-G (36.8%), and random backoff.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 25 min</span>
              <span class="text-blue-500 font-bold">Live Contention Lab</span>
            </div>
          </div>

          <div class="study-card topic-catalog-card" onclick="App.loadTopic('csma-protocols')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Subtopic 8.2 • Master</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">CSMA Protocols (CSMA, CSMA/CD, CSMA/CA)</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">1-p / non-p / p-persistent CSMA, propagation delay collisions, CSMA/CD exponential backoff, and CSMA/CA collision avoidance.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 30 min</span>
              <span class="text-purple-600 font-bold">CSMA/CD vs CSMA/CA</span>
            </div>
          </div>

          <div class="study-card topic-catalog-card" onclick="App.loadTopic('collision-free-protocols')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Subtopic 8.3 • Standard</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Collision-Free Protocols</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Deterministic channel sharing: Bit-Map reservation, Binary Countdown bit-by-bit arbitration, and Token Passing (Token Ring).</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 20 min</span>
              <span class="text-gray-500 font-bold">Token Ring & CAN</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CHAPTER 9 -->
      <div id="chap-9" class="chapter-block mb-10 pt-4">
        <div class="flex items-center justify-between pb-2 mb-4 border-b-2 border-blue-500">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded bg-blue-600 text-white font-black text-xs">TOPIC 9</span>
            <h3 class="text-base font-extrabold text-gray-900 dark:text-white">Ethernet MAC Sublayer Protocol (IEEE 802.3)</h3>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">2 Nested Subtopics • Frame Explorer</span>
        </div>
        <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('ethernet')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Subtopic 9.1 • Standard</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Ethernet MAC Sublayer (IEEE 802.3)</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">64 to 1518 byte frame format, Preamble/SFD, Type/Length, Data padding, FCS, and shared vs switched full-duplex Ethernet.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 30 min</span>
              <span class="text-blue-500 font-bold">Interactive Frame Lab</span>
            </div>
          </div>

          <div class="study-card topic-catalog-card" onclick="App.loadTopic('mac-address')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Subtopic 9.2 • Core</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Ethernet MAC Addressing & Learning</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">48-bit EUI-48 hardware addresses, OUI vs vendor bits, Unicast/Multicast/Broadcast, and switch MAC learning tables.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 20 min</span>
              <span class="text-gray-500 font-bold">CAM Table Logic</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CHAPTER 10 -->
      <div id="chap-10" class="chapter-block mb-10 pt-4">
        <div class="flex items-center justify-between pb-2 mb-4 border-b-2 border-blue-500">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded bg-blue-600 text-white font-black text-xs">TOPIC 10</span>
            <h3 class="text-base font-extrabold text-gray-900 dark:text-white">IEEE 802.11 MAC Sublayer (Wireless LAN / Wi-Fi)</h3>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">2 Nested Subtopics • RTS/CTS Handshake</span>
        </div>
        <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('wireless-lan-protocols')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Subtopic 10.1 • Foundation</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Wireless LAN Architecture (IEEE 802.11)</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">STAs, Access Points (APs), Basic Service Sets (BSS), Extended Service Sets (ESS), ad-hoc mode, and Wi-Fi standards evolution.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 30 min</span>
              <span class="text-gray-500 font-bold">Wi-Fi Architecture</span>
            </div>
          </div>

          <div class="study-card topic-catalog-card" onclick="App.loadTopic('wifi-mac-sublayer')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #e0f2fe; color: #0284c7;">Subtopic 10.2 • Master</span>
              <span class="badge-difficulty advanced">Advanced</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">IEEE 802.11 MAC Sublayer (CSMA/CA)</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">DCF CSMA/CA, Interframe Spaces (SIFS < PIFS < DIFS), Hidden/Exposed Node problems, RTS/CTS exchange, and 4-address frame layout.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 35 min</span>
              <span class="text-purple-600 font-bold">Interactive Lab + 6 MCQs</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CHAPTER 11 -->
      <div id="chap-11" class="chapter-block mb-10 pt-4">
        <div class="flex items-center justify-between pb-2 mb-4 border-b-2 border-gray-400 dark:border-gray-600">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded bg-gray-700 text-white font-black text-xs">TOPIC 11</span>
            <h3 class="text-base font-extrabold text-gray-900 dark:text-white">Data Link Layer Switching & Bridges</h3>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">2 Nested Subtopics • Associated L2 Curriculum</span>
        </div>
        <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('dll-switching')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #f1f5f9; color: #475569;">Subtopic 11.1 • Core</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Data Link Layer Switching & Bridges</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Transparent learning bridges, frame forwarding, filtering, broadcast flooding, and Spanning Tree Protocol (IEEE 802.1D).</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 25 min</span>
              <span class="text-gray-500 font-bold">802.1D STP</span>
            </div>
          </div>

          <div class="study-card topic-catalog-card" onclick="App.loadTopic('vlan')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #f1f5f9; color: #475569;">Subtopic 11.2 • Core</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Virtual LANs (IEEE 802.1Q)</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Logically segmenting physical switches into isolated broadcast domains using 4-byte 802.1Q tags, 12-bit VIDs, and Trunk ports.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 20 min</span>
              <span class="text-gray-500 font-bold">IEEE 802.1Q</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CHAPTER 12 -->
      <div id="chap-12" class="chapter-block mb-10 pt-4">
        <div class="flex items-center justify-between pb-2 mb-4 border-b-2 border-gray-400 dark:border-gray-600">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded bg-gray-700 text-white font-black text-xs">TOPIC 12</span>
            <h3 class="text-base font-extrabold text-gray-900 dark:text-white">Network Connecting Devices & Layer 2 Protocols</h3>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">2 Nested Subtopics • Associated L2 Curriculum</span>
        </div>
        <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
          <div class="study-card topic-catalog-card" onclick="App.loadTopic('network-devices')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #f1f5f9; color: #475569;">Subtopic 12.1 • Standard</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Network Connecting Devices</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Layer-by-layer taxonomy: Repeaters, Hubs, Bridges, Layer 2 Switches, Routers, and Gateways. Collision vs broadcast domains.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 25 min</span>
              <span class="text-gray-500 font-bold">OSI Hierarchy</span>
            </div>
          </div>

          <div class="study-card topic-catalog-card" onclick="App.loadTopic('arp')">
            <div class="catalog-card-top flex justify-between items-center mb-2">
              <span class="topic-number-badge" style="background: #f1f5f9; color: #475569;">Subtopic 12.2 • Core</span>
              <span class="badge-difficulty core">Core</span>
            </div>
            <h4 class="catalog-card-title font-bold text-sm text-gray-900 dark:text-white mb-1">Address Resolution Protocol (ARP)</h4>
            <p class="catalog-card-desc text-xs text-gray-500 line-clamp-2 mb-3">Resolving known 32-bit IP addresses to unknown 48-bit MAC addresses on local links. ARP requests, replies, cache, and poisoning.</p>
            <div class="catalog-card-meta flex justify-between text-[11px] text-gray-400 border-t pt-2">
              <span>⏱️ 15 min</span>
              <span class="text-gray-500 font-bold">RFC 826</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

if (typeof window !== 'undefined') window.Unit2Module = Unit2Module;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Unit2Module;
}
