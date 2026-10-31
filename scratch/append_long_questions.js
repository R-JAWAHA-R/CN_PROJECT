const fs = require('fs');

const syllabusPath = 'js/topics_u2_syllabus.js';
let content = fs.readFileSync(syllabusPath, 'utf8');

const additionalLongQuestions = `
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50 mb-4">
        <h4 class="font-bold text-sm text-gray-900 dark:text-white">Q14. Explain Standard Ethernet Architecture, 1-Persistent CSMA/CD Operation, and Slot Time. [10 Marks]</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          Standard Ethernet (IEEE 802.3) operates at 10 Mbps over shared coaxial or twisted-pair media using 1-persistent CSMA/CD. A station continuously monitors the medium; if idle, it transmits immediately with probability 1. If busy, it waits until idle and immediately transmits. If collision occurs, it transmits a 32-bit jam signal and executes Binary Exponential Backoff. Slot time ($2\\tau = 51.2\\,\\mu\\text{s} = 512$ bit times) dictates minimum frame size ($64$ bytes) to ensure collisions are detected before transmission completes.
        </p>
      </div>

      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50 mb-4">
        <h4 class="font-bold text-sm text-gray-900 dark:text-white">Q15. Explain Ethernet MAC Addressing and DIX Ethernet II vs. IEEE 802.3 Frame Formats. [8 Marks]</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          Ethernet MAC addresses are 48 bits (6 octets) represented in hexadecimal notation. The first 3 octets (24 bits) form the Organizationally Unique Identifier (OUI) assigned by IEEE; the last 3 octets form the Network Interface Controller (NIC) serial number assigned by manufacturer. Bit 0 of the first octet indicates Unicast (0) or Multicast/Broadcast (1). DIX Ethernet II frame uses a 2-byte EtherType field (e.g., 0x0800 for IPv4, 0x0806 for ARP). IEEE 802.3 frame uses a 2-byte Length field followed by an 802.2 LLC header. Values &ge; 1536 (0x0600) indicate EtherType; values &le; 1500 indicate Length.
        </p>
      </div>

      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50 mb-4">
        <h4 class="font-bold text-sm text-gray-900 dark:text-white">Q16. Explain the Binary Exponential Backoff Algorithm with worked numerical examples. [8 Marks]</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          After the $n$-th collision, the station picks a random integer $k$ from range $[0, 2^k - 1]$ where $k = \\min(n, 10)$. The wait time is $T_{\\text{wait}} = k \\times \\text{Slot Time} = k \\times 51.2\\,\\mu\\text{s}$. After collision 1: $k \\in [0, 1]$. After collision 2: $k \\in [0, 3]$. After collision 10: $k \\in [0, 1023]$. If collision count reaches 16 ($n = 16$), the transmission is aborted as link failure. This dynamically resolves heavy network contention.
        </p>
      </div>

      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50 mb-4">
        <h4 class="font-bold text-sm text-gray-900 dark:text-white">Q17. Trace the Evolution of Ethernet from Standard to 10-Gigabit Ethernet. [10 Marks]</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          Ethernet evolved through four key generations: 1) Standard Ethernet (10 Mbps, 802.3) using shared bus/hub and CSMA/CD; 2) Fast Ethernet (100 Mbps, 802.3u) over Cat5 100Base-TX with autonegotiation; 3) Gigabit Ethernet (1 Gbps, 802.3ab/z) with full-duplex switches and carrier extension/bursting for half-duplex; 4) 10-Gigabit Ethernet (10 Gbps, 802.3ae) operating strictly in full-duplex mode over fiber/Cat6a, permanently retiring CSMA/CD.
        </p>
      </div>

      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50 mb-4">
        <h4 class="font-bold text-sm text-gray-900 dark:text-white">Q18. Explain the Architecture of IEEE 802.11 Wireless LAN (BSS, ESS, AP & DS). [10 Marks]</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          The Basic Service Set (BSS) is the building block of 802.11, configured either as an Independent BSS (Ad Hoc, peer-to-peer without AP) or an Infrastructure BSS (coordinated by a central Access Point). An Extended Service Set (ESS) integrates two or more Infrastructure BSSs via a wired Distribution System (DS) backbone, enabling seamless campus-wide coverage. IEEE 802.11 defines three mobility classes: No-Transition (stationary), BSS-Transition (roaming across APs in the same ESS without losing IP identity), and ESS-Transition (moving between independent ESSs).
        </p>
      </div>

      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50 mb-4">
        <h4 class="font-bold text-sm text-gray-900 dark:text-white">Q19. Explain the Hidden Station Problem and the 4-Way RTS/CTS Handshake Solution. [10 Marks]</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          The Hidden Station Problem occurs when two stations (B and C) are outside each other's radio coverage, but both communicate with central AP A. Both sense the channel idle, transmit simultaneously, and collide destructively at A. To resolve this, IEEE 802.11 uses the RTS/CTS handshake: Station B sends a Request To Send (RTS) with a duration reservation; AP A replies with a broadcast Clear To Send (CTS); Station C hears the CTS and programs its Network Allocation Vector (NAV) timer to defer, allowing Station B to transmit its DATA and receive an ACK collision-free.
        </p>
      </div>

      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50 mb-4">
        <h4 class="font-bold text-sm text-gray-900 dark:text-white">Q20. Explain the Exposed Station Problem and compare it with the Hidden Station Problem. [8 Marks]</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          The Exposed Station Problem occurs when Station C hears Station A transmitting to Station B, mistakenly assumes the channel is busy, and defers transmitting to Station D. Because D is out of range of A, and B is out of range of C, both transmissions could have occurred concurrently without interference. Hidden stations cause packet collisions due to under-sensing (resolved by RTS/CTS); exposed stations cause throughput waste and bandwidth starvation due to over-sensing (mitigated by BSS coloring and directional beamforming).
        </p>
      </div>

      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50 mb-4">
        <h4 class="font-bold text-sm text-gray-900 dark:text-white">Q21. Why is CSMA/CD impossible in Wireless LANs? Explain CSMA/CA Operation. [8 Marks]</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          CSMA/CD cannot be used because: 1) Transceiver dynamic range blindness (outgoing signal is up to 100 dB stronger than incoming signals, blinding the receiver to collisions); 2) Hidden stations (collisions occur at the receiver, not at the sender); 3) Rapid inverse-square/fourth-power signal attenuation. CSMA/CA avoids collisions prior to transmission via: DIFS idle sensing, Contention Window pseudo-random backoff, RTS/CTS virtual carrier sensing (NAV), and explicit Layer 2 ACKs after SIFS.
        </p>
      </div>

      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50 mb-4">
        <h4 class="font-bold text-sm text-gray-900 dark:text-white">Q22. Compare Distributed Coordination Function (DCF) and Point Coordination Function (PCF). [8 Marks]</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          DCF is mandatory, decentralized, contention-based CSMA/CA access with DIFS interframe spaces, serving asynchronous best-effort data (web/email) across both Ad Hoc and Infrastructure modes. PCF is optional, centralized, contention-free polling operated by the AP Point Coordinator with higher-priority PIFS interframe spaces, serving time-bounded delay-critical traffic (VoIP/video) within Infrastructure mode. Superframes alternate between Contention-Free Periods (CFP) under PCF and Contention Periods (CP) under DCF.
        </p>
      </div>

      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50 mb-4">
        <h4 class="font-bold text-sm text-gray-900 dark:text-white">Q23. Detail the Advantages, Disadvantages, and Characteristics of Wireless LANs. [8 Marks]</h4>
        <p class="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          WLAN characteristics include station mobility, unguided broadcast media, limited coverage cells, multipath fading, path loss ($1/d^2$), shared medium contention, and open security boundaries. Advantages include host mobility, quick and flexible installation, scalability, and long-term cable maintenance savings. Disadvantages include RF interference in the crowded 2.4 GHz ISM band, limited transmission range, security vulnerabilities (requiring WPA3 encryption), shared channel bandwidth degradation, higher bit error rates, and mobile battery drain.
        </p>
      </div>
`;

const q13Target = 'Q13. Differentiate between CSMA/CD and CSMA/CA across all architectural features.</h4>';
if (content.includes(q13Target)) {
  const q13Idx = content.indexOf(q13Target);
  const divClose = content.indexOf('</div>', q13Idx);
  if (divClose !== -1) {
    const insertPos = divClose + 6;
    content = content.slice(0, insertPos) + '\n' + additionalLongQuestions + content.slice(insertPos);
    fs.writeFileSync(syllabusPath, content, 'utf8');
    console.log('Successfully appended Q14-Q23 to u2-long-answer-questions!');
  }
} else {
  console.log('Could not find Q13 target in content.');
}

