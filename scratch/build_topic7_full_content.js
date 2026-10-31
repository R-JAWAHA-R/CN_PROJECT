const fs = require('fs');
const syllabus = require('../js/topics_u2_syllabus.js');

const t7Data = {
  "wireless-lan-protocols": {
    id: "wireless-lan-protocols",
    title: "Introduction to Wireless LANs",
    unit: "Unit 2 - Data Link Layer",
    level: "Foundational",
    standard: "IEEE 802.11 / Forouzan Ch. 14 / Tanenbaum Ch. 4",
    oneLiner: "Comprehensive introduction to Wireless Local Area Networks, IEEE 802.11 scope, and comparison with wired Ethernet.",
    quickAnswer: "A Wireless Local Area Network (WLAN) connects devices within a limited geographic area using radio frequency (RF) waves instead of physical cables. Standardized by IEEE 802.11, it defines the Physical Layer and Data Link Layer (MAC and LLC sublayers) to provide high-speed, flexible local connectivity.",
    whyItMatters: "Wireless LANs form the fundamental infrastructure for modern enterprise, academic, and consumer networking, eliminating tethered physical wiring while introducing unique medium sharing and security challenges.",
    sections: {
      overview: `
        <p>A <strong>Wireless Local Area Network (WLAN)</strong> is a local computer network that links two or more devices using high-frequency radio waves or infrared signals rather than physical copper or optical fiber cables.</p>
        <p>According to <em>Behrouz A. Forouzan (Chapter 14)</em>, Wireless LANs provide users with the mobility to move around within a local coverage area (such as an office building, university campus, airport, or home) while maintaining uninterrupted continuous network connectivity.</p>
        
        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Scope of IEEE 802.11 Standard</h3>
        <p>The IEEE 802.11 committee defined specifications that cover strictly the lowest two layers of the OSI reference model:</p>
        <ul class="wiki-bullet-list">
          <li><strong>Physical Layer (PHY):</strong> Governs radio frequency transmission bands (2.4 GHz ISM, 5 GHz U-NII, and 6 GHz), modulation schemes (OFDM, DSSS, MIMO), and RF signal encoding.</li>
          <li><strong>Data Link Layer (DLL):</strong> Divided into two distinct sublayers:
            <ul class="wiki-bullet-list mt-1">
              <li><strong>Logical Link Control (LLC - IEEE 802.2):</strong> Provides a standardized, uniform interface to Layer 3 (Network Layer), multiplexing network protocols.</li>
              <li><strong>Medium Access Control (MAC - IEEE 802.11):</strong> Resolves medium access contention among wireless stations, coordinates transmissions via DCF and PCF, handles frame addressing, fragmentation, and positive acknowledgements.</li>
            </ul>
          </li>
        </ul>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Comparative Analysis: Wired LAN vs. Wireless LAN</h3>
        <p>While both wired Ethernet (IEEE 802.3) and Wireless LAN (IEEE 802.11) provide local area data communications, their underlying physical and medium access characteristics diverge fundamentally:</p>
        <table class="wiki-table">
          <thead>
            <tr>
              <th>Comparison Parameter</th>
              <th>Wired LAN (IEEE 802.3 Ethernet)</th>
              <th>Wireless LAN (IEEE 802.11 Wi-Fi)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Transmission Medium</strong></td>
              <td>Guided physical media: Twisted-pair copper (Cat5e/Cat6) or Optical Fiber.</td>
              <td>Unguided atmospheric media: Radio Frequency (RF) electromagnetic waves (2.4 GHz, 5 GHz, 6 GHz).</td>
            </tr>
            <tr>
              <td><strong>Station Mobility</strong></td>
              <td>Tethered & stationary; devices are anchored to wall jacks and patch panels.</td>
              <td>High mobility; mobile devices roam seamlessly within the Access Point coverage area.</td>
            </tr>
            <tr>
              <td><strong>Installation & Setup</strong></td>
              <td>Labor-intensive; requires running cables through conduits, walls, and ceilings.</td>
              <td>Rapid & flexible; stations join the network immediately upon association with an AP.</td>
            </tr>
            <tr>
              <td><strong>Environmental Interference</strong></td>
              <td>Extremely low; guided cables are shielded from external electromagnetic noise.</td>
              <td>Susceptible to RF interference from microwave ovens, Bluetooth, physical obstacles, and multipath reflection.</td>
            </tr>
            <tr>
              <td><strong>Medium Access Protocol</strong></td>
              <td><strong>CSMA/CD:</strong> Collision Detection is physically feasible due to guided cable voltage monitoring.</td>
              <td><strong>CSMA/CA:</strong> Collision Avoidance with positive ACKs because transceiver dynamic range prevents detection.</td>
            </tr>
            <tr>
              <td><strong>Bit Error Rate (BER)</strong></td>
              <td>Extremely low ($10^{-9}$ to $10^{-12}$); highly dependable link quality.</td>
              <td>Relatively high ($10^{-5}$ to $10^{-7}$) due to signal attenuation, noise, and multipath fading.</td>
            </tr>
            <tr>
              <td><strong>Security Vulnerability</strong></td>
              <td>High physical security; an intruder must physically tap into the cable plant.</td>
              <td>Open perimeter; RF signals radiate beyond physical walls, requiring mandatory WPA2/WPA3 encryption.</td>
            </tr>
          </tbody>
        </table>
      `,
      howItWorks: `
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Step-by-Step Wireless Transmission Workflow</h3>
        <ol class="wiki-ordered-list">
          <li><strong>Packet Arrival from Layer 3:</strong> The Network Layer passes an IP packet down to the 802.11 MAC sublayer.</li>
          <li><strong>MAC Header & CRC Encapsulation:</strong> The MAC sublayer prepends Frame Control, Duration/ID, Source MAC, Destination MAC, BSSID, and Sequence Control fields, and appends a 32-bit CRC Frame Check Sequence (FCS).</li>
          <li><strong>Carrier Sensing (Physical & Virtual):</strong> The wireless station monitors the RF medium for energy and inspects its internal Network Allocation Vector (NAV) timer.</li>
          <li><strong>Contention & Backoff Deferral:</strong> If the medium is sensed idle for a DIFS duration, the station executes a pseudo-random backoff countdown before transmitting to minimize collision probability.</li>
          <li><strong>RF Modulation:</strong> The Physical Layer modulates the framed bitstream onto RF carrier waves using Orthogonal Frequency Division Multiplexing (OFDM).</li>
          <li><strong>Antenna Transmission & Propagation:</strong> The signal radiates through the atmosphere. The receiving Access Point captures the wavefront, verifies the FCS checksum, and returns an immediate ACK frame after a short SIFS interval.</li>
        </ol>
      `,
      technicalDetails: `
        <div class="space-y-4">
          <div class="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800 text-xs">
            <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-1">Key IEEE 802.11 Standards Family</h4>
            <ul class="space-y-1 text-slate-700 dark:text-slate-300">
              <li><strong>802.11b (1999):</strong> 2.4 GHz band, DSSS modulation, maximum data rate 11 Mbps.</li>
              <li><strong>802.11a (1999):</strong> 5 GHz band, OFDM modulation, maximum data rate 54 Mbps.</li>
              <li><strong>802.11g (2003):</strong> 2.4 GHz band, OFDM modulation, backwards compatible with 802.11b, maximum rate 54 Mbps.</li>
              <li><strong>802.11n (Wi-Fi 4 - 2009):</strong> Dual-band 2.4/5 GHz, MIMO multi-antenna streams, up to 600 Mbps.</li>
              <li><strong>802.11ac (Wi-Fi 5 - 2013):</strong> 5 GHz band, 80/160 MHz channel bonding, 256-QAM, multi-gigabit throughput.</li>
              <li><strong>802.11ax (Wi-Fi 6/6E - 2021):</strong> 2.4/5/6 GHz, OFDMA, 1024-QAM, high efficiency in dense deployments.</li>
            </ul>
          </div>
        </div>
      `,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/WLAN_overview.svg/800px-WLAN_overview.svg.png",
      imageCaption: "Figure 14.1: Architecture of Wireless Local Area Network (WLAN) linking mobile stations to enterprise backbone.",
      workedExamples: [
        {
          title: "Worked Example 1: Wired vs Wireless Link Budget Comparison",
          difficulty: "Easy",
          problem: "A university computer lab is deciding between installing Cat6 wired Ethernet drops (1 Gbps) or deploying an 802.11ac Wi-Fi access point for 40 workstations. Compare both approaches on installation complexity, throughput guarantees, and channel security.",
          solution: `
            <p><strong>1. Throughput & Contention:</strong> Cat6 Ethernet provides dedicated, full-duplex 1 Gbps non-blocking bandwidth per workstation switch port. Wi-Fi shares its aggregate half-duplex radio bandwidth (e.g., 1.3 Gbps total) among all 40 actively contending stations, yielding lower average throughput per device under peak load.</p>
            <p><strong>2. Installation & Flexibility:</strong> Wired deployment requires pulling 40 physical cables through drop ceilings, punch-down patch panels, and switch racks. Wi-Fi requires mounting a single ceiling AP with one PoE uplink, dramatically reducing physical installation labor and preserving room flexibility.</p>
            <p><strong>3. Security:</strong> The wired lab can enforce 802.1X physical port security and is immune to external eavesdropping. The wireless deployment must enforce WPA3-Enterprise (802.1X EAP-TLS) to prevent packet capture outside classroom walls.</p>
          `
        }
      ],
      advantagesLimitations: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 text-xs">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-1">Advantages of Wireless LANs</h4>
            <ul class="space-y-1 text-slate-700 dark:text-slate-300">
              <li>&bull; <strong>Mobility:</strong> Users roam freely without breaking active TCP/IP sessions.</li>
              <li>&bull; <strong>Rapid Deployment:</strong> New stations connect instantly without pulling cables.</li>
              <li>&bull; <strong>Scalability:</strong> Additional clients require zero physical rewiring.</li>
              <li>&bull; <strong>Reduced Infrastructure Cost:</strong> Eliminates recurring cable maintenance and renovation disruption.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800 text-xs">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-1">Limitations of Wireless LANs</h4>
            <ul class="space-y-1 text-slate-700 dark:text-slate-300">
              <li>&bull; <strong>Shared Channel Capacity:</strong> Bandwidth diminishes as client count increases.</li>
              <li>&bull; <strong>Susceptible to Interference:</strong> 2.4 GHz band crowded by Bluetooth and microwaves.</li>
              <li>&bull; <strong>Higher Latency & Jitter:</strong> Contention and retransmissions introduce non-deterministic delays.</li>
              <li>&bull; <strong>Security Perimeter:</strong> RF boundary cannot be physically cordoned off.</li>
            </ul>
          </div>
        </div>
      `,
      whereUsed: "Campus Wi-Fi networks, enterprise agile offices, smart warehouses, home automation, and public hotspots.",
      references: "Behrouz A. Forouzan, Data Communications and Networking (5th Ed.), Chapter 14; Andrew S. Tanenbaum, Computer Networks (5th Ed.), Chapter 4."
    }
  },

  "u2-wireless-characteristics": {
    id: "u2-wireless-characteristics",
    title: "Characteristics of Wireless Communication",
    unit: "Unit 2 - Data Link Layer",
    level: "Intermediate",
    standard: "Forouzan Ch. 14 / Tanenbaum Ch. 4",
    oneLiner: "The 7 defining physical and electromagnetic characteristics of wireless links governing MAC sublayer design.",
    quickAnswer: "Wireless communication is characterized by station mobility, unguided broadcast media, limited transmission distance, signal attenuation (path loss), multipath fading and interference, shared medium contention, and heightened vulnerability to eavesdropping.",
    whyItMatters: "Unlike predictable guided copper cables, the wireless medium is dynamic, noisy, and broadcast-oriented. Understanding these 7 physical characteristics explains why wireless networks require complex MAC layer protocols like CSMA/CA, RTS/CTS, and frame acknowledgements.",
    sections: {
      overview: `
        <p>In <em>Chapter 14 of Forouzan's Data Communications and Networking</em>, wireless communication is shown to diverge sharply from guided wireline networking due to seven fundamental physical characteristics:</p>
        
        <div class="space-y-3 mt-3">
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 class="font-bold text-xs text-blue-600 dark:text-blue-400">1. Station Mobility</h4>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-0.5">Mobile hosts are not bound to a fixed physical location. Devices move continuously while maintaining real-time communication, requiring dynamic association, roaming, and handoff protocols across Access Points.</p>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 class="font-bold text-xs text-blue-600 dark:text-blue-400">2. Elimination of Physical Cables</h4>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-0.5">Communication occurs through unguided electromagnetic radiation across atmospheric space, eliminating costly copper/fiber cable runs, physical patch bays, and structural renovation overhead.</p>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 class="font-bold text-xs text-blue-600 dark:text-blue-400">3. Limited Transmission Range & Spatial Cells</h4>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-0.5">Radio signal coverage is geographically constrained by regulatory transmit power caps (e.g., 100 mW to 1 W EIRP). A wireless Access Point typically covers a cell radius of 30 to 100 meters indoors.</p>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 class="font-bold text-xs text-blue-600 dark:text-blue-400">4. Environmental Interference & Multipath Fading</h4>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-0.5">Electromagnetic waves reflect off walls, floors, and metal furniture, arriving at the receiver antenna via multiple paths at slightly different times (multipath propagation), causing destructive interference and fading.</p>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 class="font-bold text-xs text-blue-600 dark:text-blue-400">5. Severe Signal Attenuation (Path Loss)</h4>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-0.5">Electromagnetic power decays exponentially with distance. In free space, received power follows the inverse-square law ($P_r \\propto 1/d^2$); in obstructed indoor environments, path loss exponents escalate to $1/d^3$ or $1/d^4$.</p>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 class="font-bold text-xs text-blue-600 dark:text-blue-400">6. Shared Broadcast Communication Medium</h4>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-0.5">All stations within transmission range share the same radio frequency spectrum. If two nearby stations transmit simultaneously on the same channel, their signals collide destructively at the receiver, making medium access control essential.</p>
          </div>

          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 class="font-bold text-xs text-blue-600 dark:text-blue-400">7. Heightened Security Vulnerabilities</h4>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-0.5">Because radio signals traverse walls and outdoor public spaces indiscriminately, wireless links lack physical perimeters. Unauthenticated passive eavesdropping, rogue AP spoofing, and frame injection mandate robust cryptographic protocols (WPA3-AES).</p>
          </div>
        </div>
      `,
      howItWorks: `
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Free-Space Path Loss & Friis Transmission Formula</h3>
        <p>In wireless communications, the theoretical power received by an antenna at distance $d$ from a transmitter radiating power $P_t$ in unobstructed free space is governed by the <strong>Friis Transmission Formula</strong>:</p>
        <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg font-mono text-xs text-center my-3">
          $$P_r = P_t \\cdot G_t \\cdot G_r \\cdot \\left( \\frac{\\lambda}{4\\pi d} \\right)^2$$
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-300">Where $G_t$ and $G_r$ are transmitter/receiver antenna gains, $\\lambda = \\frac{c}{f}$ is the signal wavelength, and $d$ is separation distance. Notice that received power drops inversely with the square of frequency ($f^2$) and distance ($d^2$), explaining why 5 GHz Wi-Fi attenuates significantly faster through walls than 2.4 GHz Wi-Fi.</p>
      `,
      technicalDetails: `
        <table class="wiki-table">
          <thead>
            <tr><th>Wireless Characteristic</th><th>Technical Manifestation</th><th>Protocol Countermeasure</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Multipath Fading</strong></td><td>Inter-Symbol Interference (ISI), deep nulls</td><td>OFDM subcarriers & Guard Interval (GI)</td></tr>
            <tr><td><strong>Path Loss ($1/d^2$)</strong></td><td>Weak signal at cell fringe</td><td>Dynamic Rate Adaptation (MCS index fallback)</td></tr>
            <tr><td><strong>Shared Broadcast</strong></td><td>Frame collisions at receiver</td><td>CSMA/CA, DIFS/SIFS, Random Backoff</td></tr>
            <tr><td><strong>RF Leakage</strong></td><td>Eavesdropping beyond walls</td><td>WPA3-Enterprise 192-bit cryptographic suite</td></tr>
          </tbody>
        </table>
      `,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Multipath.svg/800px-Multipath.svg.png",
      imageCaption: "Figure 14.2: Multipath propagation and reflection off physical obstacles causing fading and inter-symbol interference.",
      workedExamples: [
        {
          title: "Worked Example 1: Calculating Free Space Path Loss Attenuation",
          difficulty: "Medium",
          problem: "A Wi-Fi access point transmits at 2.4 GHz ($f = 2.4 \\times 10^9$ Hz). Calculate the free-space path loss in decibels (dB) experienced by a mobile station at a distance of 10 meters and 50 meters.",
          solution: `
            <p><strong>Step 1: Formula for Free Space Path Loss (FSPL) in dB:</strong></p>
            <p>$$\\text{FSPL (dB)} = 20\\log_{10}(d) + 20\\log_{10}(f) - 147.55$$</p>
            <p>For $f = 2.4 \\times 10^9$ Hz, $20\\log_{10}(2.4 \\times 10^9) \\approx 187.6$ dB.</p>
            <p>$$\\text{FSPL (dB)} = 20\\log_{10}(d) + 187.6 - 147.55 = 20\\log_{10}(d) + 40.05\\text{ dB}$$</p>
            <p><strong>Step 2: Calculate for $d = 10$ meters:</strong></p>
            <p>$$\\text{FSPL}(10\\text{ m}) = 20\\log_{10}(10) + 40.05 = 20(1) + 40.05 = 60.05\\text{ dB}$$</p>
            <p><strong>Step 3: Calculate for $d = 50$ meters:</strong></p>
            <p>$$\\text{FSPL}(50\\text{ m}) = 20\\log_{10}(50) + 40.05 = 20(1.699) + 40.05 = 33.98 + 40.05 = 74.03\\text{ dB}$$</p>
            <p><strong>Conclusion:</strong> Increasing distance by a factor of 5 increases path loss by 14 dB (reducing signal power to less than 4% of its 10-meter value).</p>
          `
        }
      ],
      advantagesLimitations: `
        <div class="space-y-2 text-xs">
          <p><strong>Summary:</strong> The physical properties of wireless transmission eliminate wires at the cost of non-deterministic channel quality, requiring link adaptation and collision avoidance.</p>
        </div>
      `,
      whereUsed: "RF engineering, indoor Wi-Fi planning, cellular site surveys, and wireless link budgeting.",
      references: "Forouzan, Data Communications and Networking (5th Ed.), Section 14.1; Rappaport, Wireless Communications: Principles and Practice."
    }
  },

  "u2-wireless-lan-architecture": {
    id: "u2-wireless-lan-architecture",
    title: "Wireless LAN Architecture (BSS, ESS, AP & Distribution System)",
    unit: "Unit 2 - Data Link Layer",
    level: "Intermediate",
    standard: "IEEE 802.11 / Forouzan Ch. 14 / Tanenbaum Ch. 4",
    oneLiner: "The architectural hierarchy of IEEE 802.11 networks: Basic Service Sets (Ad Hoc vs Infrastructure), Access Points, Extended Service Sets, and the Distribution System.",
    quickAnswer: "IEEE 802.11 defines the Basic Service Set (BSS) as the fundamental building block of a wireless LAN. A BSS operates either in Ad Hoc mode (Independent BSS without an AP) or Infrastructure mode (with a central Access Point). Multiple BSSs are interconnected via a wired Distribution System (DS) to form an Extended Service Set (ESS), enabling seamless station roaming.",
    whyItMatters: "BSS, ESS, and DS architecture forms the basis of all enterprise Wi-Fi networks worldwide, governing how laptops and mobile phones roam across large buildings without dropping calls or re-authenticating.",
    sections: {
      overview: `
        <p>In the IEEE 802.11 standard, wireless networks are organized in a data-driven hierarchical architecture consisting of four essential components:</p>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">1. Basic Service Set (BSS)</h3>
        <p>The <strong>Basic Service Set (BSS)</strong> is the fundamental architectural building block of any IEEE 802.11 wireless network. A BSS is defined as a group of wireless stations (computers, smartphones, IoT sensors) communicating within a defined geographic radio coverage area.</p>
        <p>A BSS exists in two distinct architectural configurations:</p>
        <ul class="wiki-bullet-list">
          <li><strong>Ad Hoc Network (Independent BSS / IBSS):</strong> Stations communicate directly with each other on a peer-to-peer basis without any centralized coordinator or Access Point. An IBSS is temporary, spontaneous, and has no uplink to external networks or the Internet.</li>
          <li><strong>Infrastructure Network (BSS with Access Point):</strong> Stations communicate strictly through a central hub called the <strong>Access Point (AP)</strong>. Even if Station A wants to send a frame to Station B standing one meter away, the frame must travel Station A &rarr; AP &rarr; Station B. The AP also provides connectivity to a wired network backbone.</li>
        </ul>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Comparative Analysis: Ad Hoc vs. Infrastructure Network</h3>
        <table class="wiki-table">
          <thead>
            <tr><th>Parameter</th><th>Ad Hoc Network (IBSS)</th><th>Infrastructure Network (BSS)</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Central Controller</strong></td><td>None; decentralized peer-to-peer.</td><td>Mandatory Access Point (AP).</td></tr>
            <tr><td><strong>Station Communication</strong></td><td>Direct peer-to-peer transmission.</td><td>All frames pass through the central AP.</td></tr>
            <tr><td><strong>Internet / Uplink</strong></td><td>No native uplink; isolated cluster.</td><td>AP connects to wired Distribution System / Internet.</td></tr>
            <tr><td><strong>Coverage Area</strong></td><td>Restricted to mutual radio range of nodes.</td><td>Extensible by connecting multiple APs.</td></tr>
            <tr><td><strong>Deployment Cost</strong></td><td>Zero hardware cost; ad hoc software setup.</td><td>Requires purchasing and cabling APs.</td></tr>
            <tr><td><strong>Typical Applications</strong></td><td>Quick file transfers (AirDrop, Wi-Fi Direct).</td><td>Enterprise offices, university campuses, homes.</td></tr>
          </tbody>
        </table>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">2. Extended Service Set (ESS)</h3>
        <p>An <strong>Extended Service Set (ESS)</strong> is formed when two or more Infrastructure BSSs are linked together through a backbone network known as the <strong>Distribution System (DS)</strong>.</p>
        <p>An ESS appears to higher layers (Network Layer and above) as a single, unified, homogeneous local area network. Users can roam freely from one BSS to another without losing network access.</p>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">3. The Distribution System (DS)</h3>
        <p>The <strong>Distribution System (DS)</strong> is the switching and transmission backbone that interconnects the Access Points of multiple BSSs. Although IEEE 802.11 does not mandate the physical medium of the DS, in almost all practical enterprise installations, the DS is a high-speed wired Ethernet LAN (IEEE 802.3 Gigabit or 10-Gigabit switch backbone).</p>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">4. Three Levels of Station Mobility in IEEE 802.11</h3>
        <p>The IEEE 802.11 standard classifies mobile stations into three distinct mobility categories:</p>
        <ul class="wiki-bullet-list">
          <li><strong>No-Transition Mobility:</strong> The station is completely stationary or moves strictly within the coverage area of a single BSS. It never changes its AP association.</li>
          <li><strong>BSS-Transition Mobility:</strong> The station moves from one BSS to another BSS <em>within the same Extended Service Set (ESS)</em>. The station performs seamless <strong>roaming (handoff)</strong>, re-associating with the new AP while retaining its IP address and sustaining uninterrupted transport-layer connections.</li>
          <li><strong>ESS-Transition Mobility:</strong> The station moves completely out of its parent ESS into an entirely separate ESS (e.g., leaving a university Wi-Fi network and entering a city-wide municipal Wi-Fi). Communication will typically be interrupted, and a new IP address must be acquired via DHCP unless Mobile IP is deployed.</li>
        </ul>
      `,
      howItWorks: `
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Access Point (AP) Roles & Responsibilities</h3>
        <ol class="wiki-ordered-list">
          <li><strong>Beacon Broadcasting:</strong> Transmits periodic Beacon frames (typically every 100 ms) announcing the SSID, supported data rates, security capabilities, and clock synchronization timestamps.</li>
          <li><strong>Association & Authentication Management:</strong> Maintains an internal Association Table mapping each client's 48-bit MAC address to its current operational state.</li>
          <li><strong>Frame Bridging & Relay:</strong> Receives 802.11 wireless frames, strips wireless MAC encapsulation, converts headers into standard 802.3 Ethernet format, and forwards frames onto the wired Distribution System backbone.</li>
          <li><strong>Power Management Coordination:</strong> Buffers data frames destined for mobile stations operating in power-saving sleep mode, notifying them during Beacon Traffic Indication Maps (TIM).</li>
        </ol>
      `,
      technicalDetails: `
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-mono space-y-1">
          <p class="font-bold text-blue-600 dark:text-blue-400">IEEE 802.11 Architectural Hierarchy Summary:</p>
          <p>&bull; Station (STA): Any device containing an 802.11 MAC & PHY interface.</p>
          <p>&bull; BSSID: The 48-bit MAC address of the Access Point's radio interface.</p>
          <p>&bull; SSID (Service Set Identifier): The human-readable name of the wireless network (up to 32 ASCII characters).</p>
          <p>&bull; ESSID: The shared network name across multiple APs belonging to the same ESS.</p>
        </div>
      `,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/802.11_Infrastructure_BSS.svg/800px-802.11_Infrastructure_BSS.svg.png",
      imageCaption: "Figure 14.3: Extended Service Set (ESS) integrating multiple Infrastructure BSSs via a wired Distribution System (DS).",
      workedExamples: [
        {
          title: "Worked Example 1: BSS vs ESS Comparison & Roaming Scenario",
          difficulty: "Easy",
          problem: "A student walks across a college campus while on a VoIP video call. The student transitions from Academic Hall (AP 1) to the Library (AP 2), both connected to the same campus Distribution System. Identify the mobility category and explain why the call does not drop.",
          solution: `
            <p><strong>1. Mobility Category:</strong> This is an example of <strong>BSS-Transition Mobility</strong> because the student transitions between two BSSs belonging to the same Extended Service Set (ESS).</p>
            <p><strong>2. Roaming Mechanism:</strong> As the student moves away from AP 1, the Received Signal Strength Indicator (RSSI) drops below a threshold. The client station scans channels, detects AP 2's Beacon, and initiates a Reassociation Request.</p>
            <p><strong>3. Session Continuity:</strong> AP 2 notifies the wired Distribution System switch to update its MAC address forwarding table. Because both APs share the same IP subnet on the DS, the student's IP address remains unchanged, and the VoIP UDP stream continues without interruption.</p>
          `
        }
      ],
      advantagesLimitations: `
        <div class="space-y-1 text-xs">
          <p><strong>Key Advantage:</strong> ESS decouples physical RF coverage from network size, permitting arbitrary geographic scaling.</p>
        </div>
      `,
      whereUsed: "Enterprise campus networking, multi-AP home mesh systems, hospital wireless networks, and airport Wi-Fi.",
      references: "Forouzan Ch. 14, Section 14.2; Tanenbaum Ch. 4, Section 4.4."
    }
  },

  "u2-hidden-terminal-problem": {
    id: "u2-hidden-terminal-problem",
    title: "Hidden Terminal (Hidden Station) Problem",
    unit: "Unit 2 - Data Link Layer",
    level: "Intermediate",
    standard: "Forouzan Ch. 14 / Tanenbaum Ch. 4",
    oneLiner: "Detailed analysis of the Hidden Station problem in wireless networks and its complete resolution via the 4-way RTS/CTS handshake.",
    quickAnswer: "The Hidden Station Problem occurs when two wireless stations (B and C) are outside each other's radio transmission range, but both can communicate with a central station (A). When both sense the channel idle and transmit simultaneously, their frames collide at Station A. Neither sender detects the collision because neither can hear the other.",
    whyItMatters: "The hidden station problem is the primary reason why simple CSMA (listen-before-talk) fails in wireless networks and necessitates virtual carrier sensing via RTS/CTS and the Network Allocation Vector (NAV).",
    sections: {
      overview: `
        <p>In wireline Ethernet, all stations share a common physical wire; if Station B transmits, every other station on the cable immediately senses the electrical carrier. In wireless networks, radio waves attenuate with distance, leading to the <strong>Hidden Station (Hidden Terminal) Problem</strong>.</p>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Scenario & Geometric Topology</h3>
        <p>Consider three wireless stations arranged linearly in space: <strong>Station B</strong>, <strong>Station A (AP)</strong>, and <strong>Station C</strong>:</p>
        <ul class="wiki-bullet-list">
          <li>Station B has a radio coverage circle that reaches Station A, but does <em>not</em> reach Station C.</li>
          <li>Station C has a radio coverage circle that reaches Station A, but does <em>not</em> reach Station B.</li>
          <li>Station A is positioned centrally and can hear both Station B and Station C.</li>
          <li>Therefore, <strong>Station B is hidden from Station C</strong>, and <strong>Station C is hidden from Station B</strong>.</li>
        </ul>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">How Collisions Occur in Hidden Station Scenarios</h3>
        <ol class="wiki-ordered-list">
          <li>Station B wants to transmit data to Station A. It performs physical carrier sensing, detects no RF energy on the channel, and begins transmitting.</li>
          <li>While Station B is actively transmitting, Station C also decides to transmit data to Station A.</li>
          <li>Station C performs physical carrier sensing. Because Station B is beyond Station C's radio horizon, Station C detects zero RF energy and erroneously concludes the channel is <strong>IDLE</strong>.</li>
          <li>Station C begins transmitting its frame to Station A.</li>
          <li><strong>The Collision:</strong> At central Station A, the incoming signals from B and C overlap simultaneously. The overlapping electromagnetic waves garble each other, causing a destructive collision. Station A receives corrupted garbage.</li>
          <li><strong>Transmitter Blindness:</strong> Neither Station B nor Station C is aware that a collision occurred because neither can hear the other's transmission!</li>
        </ol>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The Solution: 4-Way RTS / CTS Handshake (Virtual Carrier Sensing)</h3>
        <p>To eliminate hidden station collisions, IEEE 802.11 implements the <strong>RTS/CTS (Request To Send / Clear To Send)</strong> handshake protocol:</p>
        <div class="space-y-2 mt-2 text-xs">
          <div class="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800">
            <span class="font-bold text-blue-700 dark:text-blue-300">Step 1: RTS (Request To Send) Transmission</span>
            <p class="text-slate-600 dark:text-slate-300 mt-1">Station B sends a short control frame called <strong>RTS</strong> to Station A. The RTS frame contains a <em>Duration</em> field specifying exactly how much channel time Station B requires to transmit its DATA frame and receive an ACK.</p>
          </div>
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <span class="font-bold text-emerald-700 dark:text-emerald-300">Step 2: CTS (Clear To Send) Broadcast</span>
            <p class="text-slate-600 dark:text-slate-300 mt-1">Station A receives the RTS and responds with a <strong>CTS</strong> frame. Crucially, Station A broadcasts the CTS at full power, meaning <strong>Station C hears the CTS</strong> even though C never heard B's RTS!</p>
          </div>
          <div class="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-800">
            <span class="font-bold text-purple-700 dark:text-purple-300">Step 3: Network Allocation Vector (NAV) Setting</span>
            <p class="text-slate-600 dark:text-slate-300 mt-1">Station C extracts the duration field from Station A's CTS and programs its internal <strong>Network Allocation Vector (NAV)</strong> countdown timer. While the NAV timer is non-zero, Station C treats the channel as logically <strong>BUSY</strong> and defers all transmissions.</p>
          </div>
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <span class="font-bold text-emerald-700 dark:text-emerald-300">Step 4: Collision-Free DATA & ACK Exchange</span>
            <p class="text-slate-600 dark:text-slate-300 mt-1">Station B transmits its long DATA frame collision-free. Station A verifies the FCS and returns an ACK frame. Once the NAV expires, Station C can contend for the channel.</p>
          </div>
        </div>
      `,
      howItWorks: `
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Interframe Space (IFS) Timing During RTS/CTS</h3>
        <p>To ensure that the RTS/CTS/DATA/ACK sequence is not interrupted by other stations contending for the channel, all frames within the exchange are separated by the ultra-short <strong>SIFS (Short Interframe Space)</strong>:</p>
        <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg font-mono text-xs text-center my-2">
          RTS &rarr; [SIFS] &rarr; CTS &rarr; [SIFS] &rarr; DATA &rarr; [SIFS] &rarr; ACK
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-300">Because SIFS is shorter than the standard DIFS waiting time, contending stations cannot seize the channel in the middle of an active RTS/CTS dialogue.</p>
      `,
      technicalDetails: `
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs space-y-2">
          <p><strong>RTS Threshold Optimization:</strong> Because RTS and CTS control frames introduce protocol overhead (consuming bandwidth), 802.11 drivers enforce an <em>RTS Threshold</em> parameter (typically 2347 bytes). Frames smaller than the threshold are sent directly without RTS/CTS; frames larger than the threshold mandate the handshake.</p>
        </div>
      `,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Hidden_terminal_problem.svg/800px-Hidden_terminal_problem.svg.png",
      imageCaption: "Figure 14.4: Hidden terminal scenario where stations B and C cannot hear each other, causing collisions at central AP A.",
      workedExamples: [
        {
          title: "Worked Example 1: Hidden Terminal NAV Calculation",
          difficulty: "Medium",
          problem: "Station B sends an RTS frame requesting transmission of a 1500-byte DATA frame at 54 Mbps. SIFS = 10 microseconds, CTS transmission time = 44 microseconds, ACK transmission time = 44 microseconds, and DATA transmission time = 222 microseconds. Calculate the Duration field value Station B places in its RTS frame.",
          solution: `
            <p><strong>Step 1: Understand the RTS Duration Field:</strong></p>
            <p>The duration field must reserve sufficient time for the complete subsequent exchange: CTS + DATA + ACK + 3 SIFS intervals.</p>
            <p>$$\\text{Duration} = T_{\\text{CTS}} + T_{\\text{DATA}} + T_{\\text{ACK}} + 3 \\times T_{\\text{SIFS}}$$</p>
            <p><strong>Step 2: Substitute Values:</strong></p>
            <p>$$\\text{Duration} = 44\\,\\mu\\text{s} + 222\\,\\mu\\text{s} + 44\\,\\mu\\text{s} + 3(10\\,\\mu\\text{s})$$</p>
            <p>$$\\text{Duration} = 310 + 30 = 340\\,\\mu\\text{s}$$</p>
            <p><strong>Conclusion:</strong> Station B writes 340 microseconds into its RTS Duration field. Station C will read this from Station A's CTS and defer for 340 microseconds, preventing collision.</p>
          `
        }
      ],
      advantagesLimitations: `
        <div class="space-y-1 text-xs">
          <p><strong>Trade-off:</strong> RTS/CTS eliminates hidden collisions for large frames but adds small control overhead for short frames.</p>
        </div>
      `,
      whereUsed: "Large meeting rooms, outdoor directional Wi-Fi links, dense classroom auditoriums, and wireless mesh topologies.",
      references: "Forouzan, Data Communications and Networking, Chapter 14, Section 14.3; Tanenbaum, Section 4.4.2."
    }
  },

  "u2-exposed-terminal-problem": {
    id: "u2-exposed-terminal-problem",
    title: "Exposed Terminal (Exposed Station) Problem",
    unit: "Unit 2 - Data Link Layer",
    level: "Intermediate",
    standard: "Forouzan Ch. 14 / Tanenbaum Ch. 4",
    oneLiner: "Analysis of the Exposed Station problem in wireless networks, channel capacity waste, and comparison with Hidden Stations.",
    quickAnswer: "The Exposed Station Problem occurs when a wireless station (C) wishes to transmit to another station (D), but overhears an active transmission from Station A to Station B. Station C falsely concludes the channel is busy and defers transmission, even though Station C transmitting to Station D would cause zero interference to Station B. This results in unnecessary deferral and wasted channel throughput.",
    whyItMatters: "While the Hidden Station problem causes destructive collisions, the Exposed Station problem causes spatial bandwidth starvation and throughput loss. Understanding why standard CSMA/CA does not solve exposed terminals is a classic university examination topic.",
    sections: {
      overview: `
        <p>The inverse companion of the hidden station problem is the <strong>Exposed Station (Exposed Terminal) Problem</strong>. While hidden terminals suffer from collisions due to under-sensing, exposed terminals suffer from wasted bandwidth due to over-sensing.</p>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Scenario & 4-Station Linear Topology</h3>
        <p>Consider four wireless stations positioned in a line: <strong>B &larr; A &mdash;&mdash; C &rarr; D</strong>:</p>
        <ul class="wiki-bullet-list">
          <li><strong>Station B:</strong> Located on the far left. Within radio range of Station A, but completely outside the range of Station C.</li>
          <li><strong>Station A:</strong> Transmitting actively to Station B. Within range of both B and C.</li>
          <li><strong>Station C:</strong> Located to the right of A. Within range of A and D, but outside the range of B. Station C wants to transmit data to Station D.</li>
          <li><strong>Station D:</strong> Located on the far right. Within range of C, but completely outside the range of Station A.</li>
        </ul>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">How the Inefficiency Occurs</h3>
        <ol class="wiki-ordered-list">
          <li>Station A begins transmitting data frames to Station B.</li>
          <li>Station C decides it needs to transmit data frames to Station D.</li>
          <li>Station C performs physical carrier sensing. Because Station C is within radio range of Station A, Station C hears Station A's RF signal.</li>
          <li>Station C erroneously concludes: <em>"The medium is busy! If I transmit now, I will cause a collision."</em></li>
          <li>Station C defers its transmission and waits until Station A finishes.</li>
          <li><strong>The Reality (False Deferral):</strong> Station C's intended receiver is Station D. Station D is far out of range of Station A. Furthermore, Station A's receiver is Station B, which is far out of range of Station C.</li>
          <li>Therefore, <strong>transmissions A &rarr; B and C &rarr; D could have proceeded at the exact same instant without interfering with one another!</strong></li>
          <li><strong>Consequence:</strong> The wireless channel's spatial capacity is wasted, and overall network throughput is halved unnecessarily.</li>
        </ol>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Comparative Master Analysis: Hidden vs. Exposed Station Problem</h3>
        <table class="wiki-table">
          <thead>
            <tr><th>Comparison Parameter</th><th>Hidden Station Problem</th><th>Exposed Station Problem</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Root Cause</strong></td><td>Stations cannot hear each other because they are out of mutual radio range.</td><td>A station overhears a neighbor's transmission directed away from it.</td></tr>
            <tr><td><strong>Carrier Sensing Failure</strong></td><td>Under-sensing: Medium is sensed IDLE when it is actually active at receiver.</td><td>Over-sensing: Medium is sensed BUSY when transmission would be safe.</td></tr>
            <tr><td><strong>Direct Consequence</strong></td><td><strong>Frame Collisions</strong> at the shared central receiver (data corruption).</td><td><strong>Unnecessary Deferral</strong> and wasted channel capacity (throughput loss).</td></tr>
            <tr><td><strong>Impact on Throughput</strong></td><td>Destroys frames, requiring expensive retransmissions.</td><td>Starves idle stations and underutilizes spatial spectrum.</td></tr>
            <tr><td><strong>RTS / CTS Resolution</strong></td><td><strong>Completely resolved</strong> by CTS broadcast and NAV timer.</td><td><strong>Not inherently resolved;</strong> Station C still senses RF energy or CTS.</td></tr>
            <tr><td><strong>Advanced Remedies</strong></td><td>4-Way RTS/CTS handshake.</td><td>Directional smart antennas, MIMO beamforming, dual-channel MAC.</td></tr>
          </tbody>
        </table>
      `,
      howItWorks: `
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Why RTS/CTS Does Not Solve the Exposed Station Problem</h3>
        <p>In standard IEEE 802.11 implementations, when Station A sends an RTS to Station B, Station C overhears the RTS. Although Station C does not hear Station B's CTS, Station C may still defer because:</p>
        <ul class="wiki-bullet-list">
          <li>Station C detects raw RF physical energy from Station A during Clear Channel Assessment (CCA).</li>
          <li>If Station C attempts to send an RTS to Station D while Station A is transmitting, Station C's RTS might drown out Station A's reception if A were trying to receive.</li>
          <li>Solving the exposed station problem in omnidirectional systems without causing collisions remains an open challenge, usually addressed today using <strong>spatial frequency reuse in Wi-Fi 6 (BSS Coloring)</strong> and <strong>MIMO directional beamforming</strong>.</li>
        </ul>
      `,
      technicalDetails: `
        <div class="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-800 text-xs">
          <h4 class="font-bold text-amber-900 dark:text-amber-200 mb-1">Wi-Fi 6 (802.11ax) Innovation: BSS Coloring</h4>
          <p class="text-slate-700 dark:text-slate-300">To mitigate exposed station starvation in dense deployments, 802.11ax assigns a 6-bit numeric "Color" (0 to 63) to each BSS. When Station C hears a transmission with a different BSS Color, it applies a higher energy detection threshold (-62 dBm instead of -82 dBm), allowing concurrent transmission to Station D.</p>
        </div>
      `,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Exposed_terminal_problem.svg/800px-Exposed_terminal_problem.svg.png",
      imageCaption: "Figure 14.5: Exposed terminal scenario where Station C unnecessarily defers sending to D because it overhears A.",
      workedExamples: [
        {
          title: "Worked Example 1: Spatial Throughput Loss Calculation",
          difficulty: "Easy",
          problem: "Two independent pairs of wireless stations (A &rarr; B and C &rarr; D) each have a maximum link rate of 54 Mbps. Under ideal spatial reuse, both pairs transmit concurrently. Under the exposed station problem, Station C defers while A transmits. Calculate the percentage throughput loss caused by the exposed station problem.",
          solution: `
            <p><strong>Step 1: Calculate Ideal Concurrent Throughput:</strong></p>
            <p>$$\\text{Throughput}_{\\text{ideal}} = R_{A \\to B} + R_{C \\to D} = 54\\text{ Mbps} + 54\\text{ Mbps} = 108\\text{ Mbps}$$</p>
            <p><strong>Step 2: Calculate Throughput Under Exposed Deferral:</strong></p>
            <p>Because C must wait for A to finish, the links share channel time equally (50% duty cycle each):</p>
            <p>$$\\text{Throughput}_{\\text{exposed}} = \\frac{54}{2} + \\frac{54}{2} = 54\\text{ Mbps}$$</p>
            <p><strong>Step 3: Calculate Percentage Loss:</strong></p>
            <p>$$\\text{Throughput Loss} = \\frac{108 - 54}{108} \\times 100\\% = 50\\%$$</p>
            <p><strong>Conclusion:</strong> The exposed terminal problem cuts aggregate spatial channel capacity in half (50% penalty).</p>
          `
        }
      ],
      advantagesLimitations: `
        <div class="space-y-1 text-xs">
          <p><strong>Summary:</strong> Exposed stations underutilize the spectrum; resolved in modern networks via BSS coloring and beamforming.</p>
        </div>
      `,
      whereUsed: "Dense apartment complexes, high-density auditoriums, and wireless mesh backhauls.",
      references: "Forouzan Ch. 14, Section 14.3; Tanenbaum Ch. 4, Section 4.4.2."
    }
  },

  "u2-wireless-multiple-access": {
    id: "u2-wireless-multiple-access",
    title: "Multiple Access in Wireless Networks (Why CSMA/CA over CSMA/CD)",
    unit: "Unit 2 - Data Link Layer",
    level: "Intermediate",
    standard: "IEEE 802.11 / Forouzan Ch. 14 / Tanenbaum Ch. 4",
    oneLiner: "The 3 critical technical reasons why CSMA/CD is impossible in wireless LANs and why CSMA/CA is mandatory.",
    quickAnswer: "Wireless LANs cannot use CSMA/CD (Collision Detection) because of three physical limitations: 1) Transceiver dynamic range blindness (transmitted power drowns out received collision energy); 2) Hidden station collisions (collisions occur at the distant receiver, not at the sender); and 3) Signal attenuation over distance. Instead, wireless networks use CSMA/CA (Collision Avoidance) with backoff and positive ACKs.",
    whyItMatters: "This is one of the most frequently asked questions in university computer network examinations and technical interviews, clarifying the direct link between RF electromagnetic physics and MAC protocol architecture.",
    sections: {
      overview: `
        <p>In wired Ethernet networks (IEEE 802.3), devices employ <strong>CSMA/CD (Carrier Sense Multiple Access with Collision Detection)</strong>. When a wired station transmits, it monitors voltage levels on the copper wire; if the voltage exceeds a collision threshold, it aborts transmission immediately, transmits a 32-bit jam signal, and executes backoff.</p>
        <p>However, according to <em>Behrouz A. Forouzan (Chapter 14)</em> and <em>Andrew S. Tanenbaum (Chapter 4)</em>, <strong>CSMA/CD is technically impossible to implement in Wireless Local Area Networks</strong>. Wireless LANs are forced to adopt <strong>CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance)</strong>.</p>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The Three Fundamental Reasons Why CSMA/CD Fails in Wireless</h3>
        
        <div class="space-y-3 mt-3">
          <div class="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-900/40">
            <h4 class="font-bold text-xs text-red-700 dark:text-red-300 flex items-center gap-1.5">
              <i class="fa-solid fa-volume-xmark"></i> 1. Transceiver Dynamic Range Blindness (Hardware Limitation)
            </h4>
            <p class="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
              To detect a collision during transmission, a station must transmit and listen simultaneously on the same radio channel. However, a station's own transmitter radiates at high power (e.g., $+20$ dBm or 100 mW), while incoming signals from distant stations arrive at minuscule power levels (e.g., $-70$ dBm to $-90$ dBm or 1 to 100 picowatts).
            </p>
            <p class="text-xs text-slate-700 dark:text-slate-300 mt-1 font-semibold">
              The station's own outgoing signal is up to 100 dB ($10^{10}$ times!) stronger than any incoming signal on its antenna. The transmitter completely overwhelms and blinds the local receiver circuit, making it physically impossible for the receiver to detect that another station's faint signal has collided.
            </p>
          </div>

          <div class="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-900/40">
            <h4 class="font-bold text-xs text-red-700 dark:text-red-300 flex items-center gap-1.5">
              <i class="fa-solid fa-eye-slash"></i> 2. The Hidden Station Problem (Spatial Asymmetry)
            </h4>
            <p class="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
              In a wired bus, every transceiver is coupled to the exact same copper conductor and hears all electrical activity. In wireless networks, radio waves attenuate with distance.
            </p>
            <p class="text-xs text-slate-700 dark:text-slate-300 mt-1 font-semibold">
              A collision occurs at the <em>receiving station (e.g., the Access Point)</em>, not at the transmitting station. Even if a station had infinite hardware sensitivity, it cannot detect a collision taking place at an AP that is caused by a hidden station located on the far side of the building!
            </p>
          </div>

          <div class="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-900/40">
            <h4 class="font-bold text-xs text-red-700 dark:text-red-300 flex items-center gap-1.5">
              <i class="fa-solid fa-chart-line-down"></i> 3. Severe Signal Attenuation and Multipath Fading
            </h4>
            <p class="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
              In guided coaxial or twisted-pair cable, signal attenuation is mild and predictable. In unguided wireless channels, power dissipates according to inverse-square and inverse-fourth laws ($1/d^2$ to $1/d^4$).
            </p>
            <p class="text-xs text-slate-700 dark:text-slate-300 mt-1 font-semibold">
              Any faint collision energy created in the air dissipates rapidly into background thermal noise before it could ever propagate back to the transmitting station.
            </p>
          </div>
        </div>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The Wireless Solution: CSMA/CA Protocol Mechanics</h3>
        <p>Because collisions <em>cannot be detected during transmission</em>, IEEE 802.11 focuses entirely on <strong>avoiding collisions before they occur</strong> and <strong>verifying delivery via explicit ACKs</strong>:</p>
        <ol class="wiki-ordered-list">
          <li><strong>Interframe Space (DIFS):</strong> A station must find the channel idle for a continuous DIFS period before doing anything.</li>
          <li><strong>Contention Window & Exponential Backoff:</strong> Stations do not transmit immediately when the channel becomes idle; they select a random backoff integer from $[0, CW]$ to stagger transmissions.</li>
          <li><strong>Positive Acknowledgement (ACK):</strong> Because the sender cannot know if its frame collided, the receiver must return an explicit Layer 2 ACK frame after SIFS. If no ACK arrives before a timeout, the sender assumes collision and retransmits.</li>
        </ol>
      `,
      howItWorks: `
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Direct Comparison: CSMA/CD vs. CSMA/CA</h3>
        <table class="wiki-table">
          <thead>
            <tr><th>Feature</th><th>CSMA/CD (IEEE 802.3 Wired)</th><th>CSMA/CA (IEEE 802.11 Wireless)</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Medium</strong></td><td>Guided copper cable (Ethernet).</td><td>Unguided atmospheric radio waves.</td></tr>
            <tr><td><strong>Collision Strategy</strong></td><td><strong>Detects</strong> collisions during transmission and aborts.</td><td><strong>Avoids</strong> collisions prior to transmission; verifies with ACK.</td></tr>
            <tr><td><strong>Full Duplex Sensing</strong></td><td>Supported; monitors line voltage while sending.</td><td>Unsupported; local TX drowns incoming RX signals by 100 dB.</td></tr>
            <tr><td><strong>Jam Signal</strong></td><td>Transmits 32-bit jam signal upon collision.</td><td>No jam signal; collision detection is absent.</td></tr>
            <tr><td><strong>Layer 2 ACKs</strong></td><td>No Layer 2 ACKs needed (unacknowledged).</td><td>Mandatory Layer 2 ACK for every unicast frame.</td></tr>
            <tr><td><strong>Bandwidth Wasted</strong></td><td>Tiny fraction (only slot time $2\\tau$).</td><td>Entire frame duration is lost when collision occurs.</td></tr>
          </tbody>
        </table>
      `,
      technicalDetails: `
        <div class="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800 text-xs">
          <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-1">Dynamic Range Calculation</h4>
          <p class="text-slate-700 dark:text-slate-300">Transmit power $P_{\\text{tx}} = 100$ mW ($+20$ dBm). Weakest decodable received power $P_{\\text{rx}} = 0.00000001$ mW ($-80$ dBm). Dynamic range $= 20 - (-80) = 100$ dB. In linear terms, local transmission is $10^{10}$ times stronger than received energy.</p>
        </div>
      `,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/CSMA_CA.svg/800px-CSMA_CA.svg.png",
      imageCaption: "Figure 14.6: Flowchart of Carrier Sense Multiple Access with Collision Avoidance (CSMA/CA) in IEEE 802.11.",
      workedExamples: [
        {
          title: "Worked Example 1: Dynamic Range Comparison",
          difficulty: "Easy",
          problem: "A laptop Wi-Fi card transmits with an output power of 50 mW (+17 dBm). It attempts to receive an incoming collision signal that has attenuated down to -83 dBm. Express the ratio of transmitted power to received collision power in linear scale.",
          solution: `
            <p><strong>Step 1: Calculate Difference in Decibels (dB):</strong></p>
            <p>$$\\Delta P = P_{\\text{tx (dBm)}} - P_{\\text{rx (dBm)}} = 17 - (-83) = 100\\text{ dB}$$</p>
            <p><strong>Step 2: Convert Decibels to Linear Ratio:</strong></p>
            <p>$$\\text{Power Ratio} = 10^{\\frac{\\Delta P}{10}} = 10^{\\frac{100}{10}} = 10^{10} = 10,000,000,000$$</p>
            <p><strong>Conclusion:</strong> The laptop's own transmission is <strong>10 billion times stronger</strong> than the incoming collision signal, making collision detection on the same antenna physically impossible.</p>
          `
        }
      ],
      advantagesLimitations: `
        <div class="space-y-1 text-xs">
          <p><strong>Summary:</strong> CSMA/CA incurs ACK and backoff overhead but provides robust communication over unguided RF channels.</p>
        </div>
      `,
      whereUsed: "All Wi-Fi standards (802.11a/b/g/n/ac/ax), Zigbee (IEEE 802.15.4), and underwater acoustic networks.",
      references: "Forouzan Ch. 14, Section 14.3; Tanenbaum Ch. 4, Section 4.4.2."
    }
  },

  "u2-wireless-lan-access-methods": {
    id: "u2-wireless-lan-access-methods",
    title: "Wireless LAN Access Methods (DCF vs. PCF)",
    unit: "Unit 2 - Data Link Layer",
    level: "Intermediate",
    standard: "IEEE 802.11 / Forouzan Ch. 14 / Tanenbaum Ch. 4",
    oneLiner: "Comprehensive architectural comparison of Distributed Coordination Function (DCF) and Point Coordination Function (PCF).",
    quickAnswer: "IEEE 802.11 defines two medium access control methods: 1) Distributed Coordination Function (DCF), a mandatory, contention-based access method using CSMA/CA for best-effort asynchronous traffic; and 2) Point Coordination Function (PCF), an optional, contention-free centralized polling method operated by the Access Point for time-sensitive, delay-critical streaming.",
    whyItMatters: "DCF vs. PCF is the core architectural duality of IEEE 802.11 MAC, illustrating how a single physical layer can support both uncoordinated best-effort web traffic and coordinated real-time multimedia.",
    sections: {
      overview: `
        <p>In IEEE 802.11, the MAC sublayer operates two coordination functions to arbitrate access to the shared radio medium: the <strong>Distributed Coordination Function (DCF)</strong> and the <strong>Point Coordination Function (PCF)</strong>.</p>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">1. Distributed Coordination Function (DCF)</h3>
        <p><strong>DCF</strong> is the foundation of 802.11 and is <strong>mandatory</strong> for all Wi-Fi certified devices:</p>
        <ul class="wiki-bullet-list">
          <li><strong>Contention-Based:</strong> Stations contend independently for channel access using CSMA/CA. There is no central master coordinating when stations speak.</li>
          <li><strong>Interframe Space (DIFS):</strong> Stations must sense the channel idle for a minimum duration called <strong>DCF Interframe Space (DIFS)</strong> before attempting transmission.</li>
          <li><strong>Random Backoff:</strong> If the channel is busy, or after a successful transmission, stations select a random backoff slot count from $[0, CW]$ to prevent synchronized collision.</li>
          <li><strong>Traffic Type:</strong> Designed for standard asynchronous, bursty, best-effort traffic (web browsing, email, file transfers).</li>
          <li><strong>Network Modes:</strong> Supported in both Ad Hoc (IBSS) and Infrastructure (BSS) networks.</li>
        </ul>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">2. Point Coordination Function (PCF)</h3>
        <p><strong>PCF</strong> is an <strong>optional</strong> access method implemented strictly on top of DCF in Infrastructure networks:</p>
        <ul class="wiki-bullet-list">
          <li><strong>Contention-Free (Polling):</strong> Access is centrally coordinated by the <strong>Point Coordinator</strong>, which resides inside the Access Point (AP). Stations never collide because they only transmit when explicitly polled by the AP.</li>
          <li><strong>Priority via PIFS:</strong> The Point Coordinator uses a shorter interframe space called <strong>PIFS (PCF Interframe Space)</strong>. Because $\\text{SIFS} < \\text{PIFS} < \\text{DIFS}$, the AP gains priority access to the channel over all standard DCF stations!</li>
          <li><strong>Traffic Type:</strong> Designed for time-bounded, latency-sensitive traffic (VoIP telephony, real-time video streaming) that cannot tolerate random backoff delays.</li>
          <li><strong>Network Modes:</strong> Can only operate in Infrastructure mode where a central AP is present.</li>
        </ul>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">The 802.11 Superframe Architecture</h3>
        <p>In networks supporting PCF, time on the wireless medium is divided into repeating cycles called <strong>Superframes</strong>. Each Superframe consists of two alternating periods:</p>
        <ol class="wiki-ordered-list">
          <li><strong>Beacon Frame:</strong> The AP transmits a Beacon frame marking the start of the Superframe.</li>
          <li><strong>Contention-Free Period (CFP):</strong> The AP uses PCF to poll registered time-sensitive stations one by one. No DCF stations can seize the channel.</li>
          <li><strong>Contention Period (CP):</strong> The AP releases the channel. Standard stations compete for access using DCF (CSMA/CA).</li>
        </ol>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Comparative Master Table: DCF vs. PCF</h3>
        <table class="wiki-table">
          <thead>
            <tr><th>Feature</th><th>Distributed Coordination Function (DCF)</th><th>Point Coordination Function (PCF)</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Status in Standard</strong></td><td><strong>Mandatory</strong> for all 802.11 stations.</td><td><strong>Optional;</strong> rarely implemented in consumer APs.</td></tr>
            <tr><td><strong>Coordination Mode</strong></td><td>Decentralized; fully distributed contention.</td><td>Centralized polling via Point Coordinator (AP).</td></tr>
            <tr><td><strong>Channel Access Technique</strong></td><td>CSMA/CA with exponential backoff and ACKs.</td><td>Polling: AP polls stations sequentially.</td></tr>
            <tr><td><strong>Interframe Space (IFS)</strong></td><td><strong>DIFS</strong> (DCF Interframe Space).</td><td><strong>PIFS</strong> (PCF Interframe Space, shorter than DIFS).</td></tr>
            <tr><td><strong>Access Priority</strong></td><td>Lower priority (longer IFS).</td><td>Higher priority than DCF (shorter IFS).</td></tr>
            <tr><td><strong>Collision Possibility</strong></td><td>Collisions can occur during simultaneous backoff expiry.</td><td><strong>Zero collisions</strong> during the Contention-Free Period.</td></tr>
            <tr><td><strong>Target Traffic</strong></td><td>Asynchronous best-effort data (web, FTP).</td><td>Time-bounded streaming (VoIP, video conference).</td></tr>
            <tr><td><strong>Network Topology</strong></td><td>Supported in both Ad Hoc and Infrastructure.</td><td>Supported strictly in Infrastructure mode.</td></tr>
          </tbody>
        </table>
      `,
      howItWorks: `
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Hierarchy of IEEE 802.11 Interframe Spaces (IFS)</h3>
        <p>IEEE 802.11 prioritizes different types of transmissions by assigning different Interframe Spaces:</p>
        <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg font-mono text-xs text-center my-2">
          $$\\text{SIFS} < \\text{PIFS} < \\text{DIFS} < \\text{EIFS}$$
        </div>
        <ul class="wiki-bullet-list text-xs">
          <li><strong>SIFS (Short IFS):</strong> Highest priority; used for CTS, ACK, and data frame fragments.</li>
          <li><strong>PIFS (PCF IFS):</strong> Second priority; used by the Point Coordinator to seize the channel for PCF polling.</li>
          <li><strong>DIFS (DCF IFS):</strong> Normal priority; used by ordinary stations contending via DCF.</li>
          <li><strong>EIFS (Extended IFS):</strong> Lowest priority; used when a station receives a corrupted frame to give others time to finish.</li>
        </ul>
      `,
      technicalDetails: `
        <div class="p-3 bg-violet-50 dark:bg-violet-950/40 rounded-lg border border-violet-200 dark:border-violet-800 text-xs">
          <h4 class="font-bold text-violet-900 dark:text-violet-200 mb-1">Evolution Note: IEEE 802.11e EDCA / HCCA</h4>
          <p class="text-slate-700 dark:text-slate-300">Because PCF had high implementation overhead and was rarely adopted by commercial vendors, IEEE 802.11e superseded PCF with <strong>EDCA (Enhanced Distributed Channel Access)</strong>, which defines 4 Quality of Service (QoS) Access Categories (Voice, Video, Best Effort, Background) using variable AIFS parameters.</p>
        </div>
      `,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/802.11_DCF_PCF.svg/800px-802.11_DCF_PCF.svg.png",
      imageCaption: "Figure 14.7: MAC sublayer architecture showing DCF contention access and PCF centralized polling on top of PHY.",
      workedExamples: [
        {
          title: "Worked Example 1: Calculating Superframe Duty Cycle",
          difficulty: "Easy",
          problem: "An enterprise AP configures a Superframe length of 100 ms. The Contention-Free Period (CFP) under PCF is allocated 40 ms, and the Contention Period (CP) under DCF is allocated 60 ms. What fraction of channel time is dedicated to real-time VoIP traffic?",
          solution: `
            <p><strong>Step 1: Formula for CFP Duty Cycle:</strong></p>
            <p>$$\\text{CFP Duty Cycle} = \\frac{T_{\\text{CFP}}}{T_{\\text{Superframe}}} = \\frac{40\\text{ ms}}{100\\text{ ms}} = 0.40 = 40\\%$$</p>
            <p><strong>Conclusion:</strong> 40% of channel bandwidth is guaranteed for collision-free time-sensitive VoIP polling, while the remaining 60% is shared via DCF for asynchronous web data.</p>
          `
        }
      ],
      advantagesLimitations: `
        <div class="space-y-1 text-xs">
          <p><strong>Summary:</strong> DCF provides robust distributed fairness; PCF guarantees bounded latency at the cost of AP complexity.</p>
        </div>
      `,
      whereUsed: "Voice over Wi-Fi (VoWLAN), industrial IoT wireless control loops, and modern 802.11e/ax QoS queues.",
      references: "Forouzan Ch. 14, Section 14.3; Tanenbaum Ch. 4, Section 4.4.2."
    }
  },

  "u2-wireless-communication-challenges": {
    id: "u2-wireless-communication-challenges",
    title: "Challenges in Wireless Communication (Advantages, Disadvantages & Terminology)",
    unit: "Unit 2 - Data Link Layer",
    level: "Intermediate",
    standard: "Forouzan Ch. 14 / Tanenbaum Ch. 4",
    oneLiner: "Comprehensive survey of WLAN advantages, disadvantages, engineering challenges, complete terminology glossary, and exam revision notes.",
    quickAnswer: "Wireless communication offers unmatched mobility, rapid deployment, and structural flexibility, but faces severe engineering challenges including multipath fading, limited spectrum, interference from ISM devices, battery power constraints, and heightened security risks. This topic provides the complete terminology glossary and key exam revision takeaways from Forouzan Chapter 14.",
    whyItMatters: "Provides the master summary, trade-off evaluation, and high-yield vocabulary needed to master Section 12-17 of the curriculum for university examinations.",
    sections: {
      overview: `
        <p>While Wireless LANs have revolutionized modern connectivity, wireless communication engineers must constantly balance the compelling operational benefits against formidable physical and security limitations.</p>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Advantages of Wireless LANs</h3>
        <ol class="wiki-ordered-list">
          <li><strong>Host Mobility:</strong> Users maintain seamless, continuous network connectivity while moving freely throughout an office, hospital, or university campus.</li>
          <li><strong>Ease and Speed of Installation:</strong> Eliminates the extensive labor, time, and architectural disruption of pulling cables through walls, ceilings, and floors.</li>
          <li><strong>High Flexibility:</strong> Networks can be established instantly in historic buildings, temporary disaster-relief camps, trade shows, and outdoor spaces where cabling is impractical or forbidden.</li>
          <li><strong>Long-Term Cost Savings:</strong> While initial enterprise AP hardware incurs costs, it eliminates recurring copper recabling expenses whenever office layouts reconfigure.</li>
          <li><strong>Scalability:</strong> New stations can join the network immediately upon entering the coverage area without requiring new physical switch ports or wall drops.</li>
          <li><strong>Ubiquitous Device Support:</strong> Modern smartphones, tablets, smart watches, and IoT sensors lack physical RJ-45 Ethernet jacks and rely exclusively on wireless connectivity.</li>
        </ol>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Disadvantages & Technical Challenges of Wireless LANs</h3>
        <ol class="wiki-ordered-list">
          <li><strong>Susceptibility to RF Interference:</strong> The 2.4 GHz Industrial, Scientific, and Medical (ISM) band is severely congested by microwave ovens, cordless phones, Bluetooth headsets, and neighboring Wi-Fi networks.</li>
          <li><strong>Signal Attenuation and Range Limits:</strong> High-frequency radio signals attenuate rapidly through brick, concrete, and metal structures, necessitating dense AP deployments for 5 GHz and 6 GHz bands.</li>
          <li><strong>Security Vulnerabilities:</strong> RF waves penetrate building boundaries. Without robust cryptographic encryption (WPA3-AES), malicious actors can intercept packets, launch Evil Twin rogue AP attacks, or inject forged deauthentication frames.</li>
          <li><strong>Shared Channel Contention:</strong> All stations within a BSS share the same half-duplex RF channel. Throughput per user degrades as the number of actively contending stations increases.</li>
          <li><strong>Higher Bit Error Rates (BER):</strong> Ambient atmospheric noise, multipath distortion, and shadowing result in bit error rates ($10^{-5}$) orders of magnitude higher than optical fiber ($10^{-12}$).</li>
          <li><strong>Battery Power Consumption:</strong> Continuous radio transmission and receiver listening rapidly drain battery reserves on mobile and IoT devices.</li>
        </ol>

        <h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">Important Terminology Glossary (Section 14)</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mt-3">
          <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-blue-600 dark:text-blue-400">WLAN:</span> Wireless Local Area Network linking devices via radio waves.
          </div>
          <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-blue-600 dark:text-blue-400">IEEE 802.11:</span> International standard specifying physical and MAC layers for wireless LANs.
          </div>
          <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-blue-600 dark:text-blue-400">BSS (Basic Service Set):</span> The fundamental architectural building block of 802.11.
          </div>
          <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-blue-600 dark:text-blue-400">ESS (Extended Service Set):</span> Two or more BSSs linked via a Distribution System.
          </div>
          <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-blue-600 dark:text-blue-400">Access Point (AP):</span> Central coordinating bridge connecting wireless stations to a wired backbone.
          </div>
          <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-blue-600 dark:text-blue-400">Ad Hoc (IBSS):</span> Temporary peer-to-peer network operating without a central AP.
          </div>
          <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-blue-600 dark:text-blue-400">DCF:</span> Mandatory contention-based CSMA/CA access method for asynchronous data.
          </div>
          <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-blue-600 dark:text-blue-400">PCF:</span> Optional contention-free centralized polling method operated by the AP.
          </div>
          <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-blue-600 dark:text-blue-400">CSMA/CA:</span> Carrier Sense Multiple Access with Collision Avoidance.
          </div>
          <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-blue-600 dark:text-blue-400">RTS / CTS:</span> Request To Send / Clear To Send 4-way virtual carrier sensing handshake.
          </div>
          <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-blue-600 dark:text-blue-400">Hidden Station:</span> Stations out of mutual radio range whose transmissions collide at an AP.
          </div>
          <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-blue-600 dark:text-blue-400">Exposed Station:</span> A station that defers unnecessarily because it overhears a neighbor's transmission.
          </div>
          <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-blue-600 dark:text-blue-400">Distribution System (DS):</span> Wired backbone (Ethernet) linking multiple APs into an ESS.
          </div>
          <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-blue-600 dark:text-blue-400">NAV (Network Allocation Vector):</span> Internal timer maintaining channel reservation state.
          </div>
        </div>
      `,
      howItWorks: `
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">High-Yield Quick Revision Notes (Section 17)</h3>
        <ol class="wiki-ordered-list text-xs space-y-1">
          <li>WLAN connects devices via radio waves; defined by IEEE 802.11 covering Physical and Data Link layers.</li>
          <li>WLAN offers station mobility and cable-free flexibility, while wired LAN offers higher, dedicated throughput and lower interference.</li>
          <li>A Basic Service Set (BSS) is the fundamental cell of 802.11. An Ad Hoc BSS operates peer-to-peer; an Infrastructure BSS uses an Access Point (AP).</li>
          <li>An Extended Service Set (ESS) combines multiple BSSs connected via a wired Distribution System (DS).</li>
          <li>Three mobility levels: No-Transition (stationary), BSS-Transition (roaming across APs in same ESS), ESS-Transition (moving between ESSs).</li>
          <li>The Hidden Station Problem occurs when two stations cannot hear each other but both transmit to the same AP, causing collisions.</li>
          <li>RTS/CTS solves hidden stations: B sends RTS to AP, AP broadcasts CTS, and hidden station C hears CTS and sets its NAV timer to defer.</li>
          <li>The Exposed Station Problem occurs when Station C hears A sending to B and unnecessarily defers sending to D.</li>
          <li>CSMA/CD cannot be used in wireless because transceiver dynamic range blindness, hidden stations, and signal attenuation prevent collision detection.</li>
          <li>CSMA/CA avoids collisions using DIFS deferral, random backoff, RTS/CTS handshakes, and explicit Layer 2 ACKs.</li>
          <li>DCF is mandatory, contention-based, and uses CSMA/CA. PCF is optional, contention-free, and uses centralized polling by the AP.</li>
          <li>Interframe spaces priority order: $\\text{SIFS} < \\text{PIFS} < \\text{DIFS} < \\text{EIFS}$.</li>
          <li>Advantages: Mobility, easy installation, scalability, lower physical infrastructure maintenance.</li>
          <li>Disadvantages: RF interference, limited transmission range, security vulnerabilities, and shared channel capacity.</li>
        </ol>
      `,
      technicalDetails: `
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
          <p class="font-bold text-slate-800 dark:text-slate-200">Exam Strategy Tip:</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1">When asked to compare Hidden vs Exposed Station problems in university exams, always draw the linear 3-station diagram for Hidden (B &rarr; A &larr; C) and the 4-station diagram for Exposed (B &larr; A &mdash; C &rarr; D), highlighting the difference between under-sensing (collisions) and over-sensing (capacity waste).</p>
        </div>
      `,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Wireless_network.svg/800px-Wireless_network.svg.png",
      imageCaption: "Figure 14.8: Complete wireless networking ecosystem integrating laptops, smartphones, Access Points, and the Internet.",
      workedExamples: [
        {
          title: "Worked Example 1: Comprehensive WLAN Architecture Exam Question",
          difficulty: "Medium",
          problem: "Explain the difference between an Ad Hoc BSS and an Infrastructure BSS. Under what circumstances would an enterprise network deploy an Extended Service Set (ESS)?",
          solution: `
            <p><strong>1. Ad Hoc BSS vs Infrastructure BSS:</strong></p>
            <p>An Ad Hoc BSS (IBSS) consists of peer devices communicating directly without any central Access Point or uplink. It is temporary and localized. An Infrastructure BSS requires an Access Point (AP) that arbitrates communication and bridges traffic onto a wired distribution backbone.</p>
            <p><strong>2. Why Enterprises Deploy an ESS:</strong></p>
            <p>A single BSS has an indoor range of roughly 30 to 50 meters. Large enterprise buildings, hospitals, and university campuses span thousands of square meters. By deploying an ESS (multiple APs connected via an Ethernet switch backbone), the enterprise provides continuous, campus-wide coverage where users can roam seamlessly (BSS-Transition mobility) without losing IP sessions.</p>
          `
        }
      ],
      advantagesLimitations: `
        <div class="space-y-1 text-xs">
          <p><strong>Summary:</strong> Wireless communication trade-offs require robust protocol engineering to achieve reliable local networking.</p>
        </div>
      `,
      whereUsed: "Curriculum synthesis, exam preparation, GATE review, and wireless network architecture design.",
      references: "Behrouz A. Forouzan, Data Communications and Networking (5th Ed.), Chapter 14 (Sections 14.1 to 14.4)."
    }
  }
};

// 1. Assign all 8 Topic 7 topics into syllabus
for (const [key, val] of Object.entries(t7Data)) {
  syllabus[key] = val;
  console.log(`Updated subtopic ${key} in syllabus.`);
}

// 2. Append Q66-Q77 to Short-Answer Questions
const newShortQuestions = `
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q66. What is a Wireless LAN (WLAN)?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> A Wireless LAN is a local computer network that connects devices within a limited geographic area using radio frequency waves instead of physical cables, defined by the IEEE 802.11 standard.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q67. Which OSI layers are covered by the IEEE 802.11 standard?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> IEEE 802.11 covers the Physical Layer (radio transmission, modulation) and the Data Link Layer (specifically the Medium Access Control sublayer and Logical Link Control interface).</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q68. What is a Basic Service Set (BSS)?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> A BSS is the fundamental building block of a wireless LAN. It consists of stationary or mobile wireless stations operating within a local radio coverage area, configured either in Ad Hoc mode or Infrastructure mode.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q69. Differentiate between Ad Hoc and Infrastructure BSS.</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> An Ad Hoc network (IBSS) is a temporary peer-to-peer network without an Access Point; an Infrastructure network requires a central Access Point (AP) through which all station communication is relayed.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q70. What is an Extended Service Set (ESS)?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> An ESS is formed by connecting two or more Infrastructure BSSs via a wired Distribution System (DS) backbone, allowing seamless station mobility across a wide campus.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q71. Name the three levels of station mobility in IEEE 802.11.</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> 1) No-Transition Mobility (stationary or moves only within one BSS); 2) BSS-Transition Mobility (roams between BSSs within the same ESS); 3) ESS-Transition Mobility (moves from one ESS to another).</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q72. What is the Hidden Station Problem?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> It occurs when two stations are out of radio range of each other, but both can communicate with a central AP. When both transmit simultaneously, their frames collide destructively at the AP.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q73. How does RTS/CTS resolve the hidden station problem?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> The sender transmits an RTS; the AP replies with a broadcast CTS containing the reservation duration. The hidden station hears the CTS and sets its NAV timer to defer transmission.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q74. What is the Exposed Station Problem?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> It occurs when a station hears an ongoing transmission to another destination, erroneously assumes the medium is busy, and unnecessarily defers its own transmission to an independent receiver.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q75. Why cannot CSMA/CD be used in Wireless LANs?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> 1) Transceiver blindness (local TX power is up to 100 dB stronger than incoming signals); 2) Collisions occur at the receiver, not at the sender (hidden stations); 3) Rapid signal attenuation.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q76. Differentiate between DCF and PCF.</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> DCF is mandatory, distributed, contention-based access using CSMA/CA for best-effort data. PCF is optional, centralized, contention-free access using AP polling for real-time traffic.</p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Q77. What is the priority order of IEEE 802.11 Interframe Spaces?</p>
          <p class="text-slate-600 dark:text-slate-300 mt-1"><strong>Ans:</strong> SIFS (Short IFS, highest priority) &lt; PIFS (PCF IFS) &lt; DIFS (DCF IFS) &lt; EIFS (Extended IFS, lowest priority).</p>
        </div>
`;

if (syllabus['u2-short-answer-questions']) {
  if (!syllabus['u2-short-answer-questions'].sections.overview.includes('Q66. What is a Wireless LAN')) {
    syllabus['u2-short-answer-questions'].sections.overview += '\n' + newShortQuestions;
    console.log('Appended Q66-Q77 to u2-short-answer-questions.');
  }
}

// 3. Append Q14-Q23 to Long-Answer Questions
const newLongQuestions = `
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

if (syllabus['u2-long-answer-questions']) {
  if (!syllabus['u2-long-answer-questions'].sections.overview.includes('Q18. Explain the Architecture of IEEE 802.11')) {
    syllabus['u2-long-answer-questions'].sections.overview += '\n' + newLongQuestions;
    console.log('Appended Q14-Q23 to u2-long-answer-questions.');
  }
}

// 4. Append the 10 Topic 7 MCQs
const topic7Mcqs = [
  {
    question: "Which IEEE standard defines specifications for Wireless Local Area Networks?",
    options: ["IEEE 802.3", "IEEE 802.11", "IEEE 802.5", "IEEE 802.15"],
    correct: 1,
    explanation: "IEEE 802.11 is the international standard governing Wireless LANs (Wi-Fi), covering the Physical Layer and MAC sublayer."
  },
  {
    question: "What is the basic building block of an IEEE 802.11 wireless network?",
    options: ["Extended Service Set (ESS)", "Basic Service Set (BSS)", "Distribution System (DS)", "Access Point (AP)"],
    correct: 1,
    explanation: "The Basic Service Set (BSS) is the fundamental architectural cell of an 802.11 wireless network."
  },
  {
    question: "A wireless network operating in Ad Hoc mode without an Access Point is known as:",
    options: ["Infrastructure BSS", "Independent BSS (IBSS)", "Extended Service Set", "Distribution System"],
    correct: 1,
    explanation: "An Ad Hoc network without an AP is standardized as an Independent Basic Service Set (IBSS)."
  },
  {
    question: "Which component interconnects multiple Access Points to form an Extended Service Set (ESS)?",
    options: ["Repeater", "Distribution System (DS)", "Modem", "Transceiver"],
    correct: 1,
    explanation: "The Distribution System (DS), typically a wired Gigabit Ethernet switch backbone, interconnects multiple APs."
  },
  {
    question: "The Hidden Station Problem in wireless networks leads directly to:",
    options: ["Channel underutilization", "Collisions at the receiving station", "Exposed node starvation", "Infinite backoff loops"],
    correct: 1,
    explanation: "Because hidden stations cannot hear each other, both transmit simultaneously, causing destructive collisions at the central receiver."
  },
  {
    question: "Which mechanism is used in IEEE 802.11 to resolve the Hidden Station Problem?",
    options: ["CSMA/CD", "Token Ring Passing", "RTS / CTS Handshake", "Binary Countdown"],
    correct: 2,
    explanation: "The 4-way RTS/CTS handshake with NAV timer setting allows hidden stations to defer transmission, eliminating hidden collisions."
  },
  {
    question: "In the Exposed Station Problem, what error does the exposed station make?",
    options: ["It transmits without sensing carrier", "It erroneously senses channel busy and unnecessarily defers", "It collides with the Access Point", "It floods the distribution system"],
    correct: 1,
    explanation: "The exposed station overhears a neighbor's transmission to an independent receiver, assumes the channel is busy, and defers unnecessarily."
  },
  {
    question: "Why cannot CSMA/CD be used in wireless LANs?",
    options: ["Wireless packets have no preamble", "A transmitting station's signal drowns out received collision energy", "Radio waves travel too fast for collision detection", "Wireless channels do not use MAC addresses"],
    correct: 1,
    explanation: "A station's own transmit power is up to 100 dB stronger than incoming signals, completely blinding the receiver to collisions."
  },
  {
    question: "Which access method is MANDATORY for all IEEE 802.11 compliant devices?",
    options: ["Point Coordination Function (PCF)", "Distributed Coordination Function (DCF)", "TDMA Fixed Allocation", "Token Bus Passing"],
    correct: 1,
    explanation: "DCF (CSMA/CA) is mandatory for all 802.11 devices, while PCF centralized polling is optional."
  },
  {
    question: "What is the correct order of IEEE 802.11 Interframe Spaces from shortest (highest priority) to longest?",
    options: [
      "DIFS < PIFS < SIFS < EIFS",
      "SIFS < PIFS < DIFS < EIFS",
      "PIFS < SIFS < DIFS < EIFS",
      "SIFS < DIFS < PIFS < EIFS"
    ],
    correct: 1,
    explanation: "The priority hierarchy is SIFS (Shortest) < PIFS (PCF) < DIFS (DCF) < EIFS (Extended)."
  }
];

if (syllabus['u2-mcqs'] && syllabus['u2-mcqs'].sections && syllabus['u2-mcqs'].sections.quiz) {
  const existingQuestions = new Set(syllabus['u2-mcqs'].sections.quiz.map(q => q.question));
  topic7Mcqs.forEach(q => {
    if (!existingQuestions.has(q.question)) {
      syllabus['u2-mcqs'].sections.quiz.push(q);
    }
  });
  console.log(`Updated MCQs quiz length to: ${syllabus['u2-mcqs'].sections.quiz.length}`);
}

const outContent = `// topics_u2_syllabus.js - Master Academic Topic Content Repository for Unit 2
// Cleaned: All ASCII symbol art removed. Integrated complete Topic 2, Topic 3, Topic 4, Topic 5, Topic 6, & Topic 7 content.
var TOPICS_U2_SYLLABUS = ${JSON.stringify(syllabus, null, 2)};

if (typeof window !== 'undefined') window.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
if (typeof global !== 'undefined') global.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
if (typeof module !== 'undefined' && module.exports) module.exports = TOPICS_U2_SYLLABUS;
`;

fs.writeFileSync('js/topics_u2_syllabus.js', outContent, 'utf8');
console.log('Successfully written complete updated topics_u2_syllabus.js!');
