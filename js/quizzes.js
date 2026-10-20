// Comprehensive Interactive Assessment & Examination Suite for Computer Networks
// Covers Units I, II, III, IV, and V with 105+ validated university and GATE-standard questions
// Sourced from Kurose & Ross (8th Ed.), Tanenbaum & Wetherall (6th Ed.), Forouzan (6th Ed.), and IETF RFCs

const QUIZ_QUESTIONS = [
  // ==========================================
  // UNIT I: NETWORKING FUNDAMENTALS & PHYSICAL (21 Questions)
  // ==========================================
  {
    id: 1,
    unit: "Unit I",
    category: "Performance & Delays",
    difficulty: "Core",
    question: "A 1000-byte packet is sent over a 100 Mbps point-to-point fiber optic link of length 200 km. Assuming propagation speed in glass is 2 x 10^8 m/s, what are the transmission delay and propagation delay, respectively?",
    options: [
      "Transmission delay = 0.08 ms, Propagation delay = 1.0 ms",
      "Transmission delay = 0.8 ms, Propagation delay = 0.1 ms",
      "Transmission delay = 8.0 ms, Propagation delay = 10.0 ms",
      "Transmission delay = 0.01 ms, Propagation delay = 2.0 ms"
    ],
    correct: 0,
    explanation: "Transmission delay d_trans = L / R = (1000 bytes * 8 bits) / (100 * 10^6 bps) = 8,000 / 100,000,000 = 0.00008 s = 0.08 ms. Propagation delay d_prop = d / s = (200 * 10^3 m) / (2 * 10^8 m/s) = 0.001 s = 1.0 ms."
  },
  {
    id: 2,
    unit: "Unit I",
    category: "Information Theory",
    difficulty: "Core",
    question: "According to Nyquist's theorem, what is the maximum theoretical bit rate of a noiseless channel with a bandwidth of 4 kHz transmitting a signal with 16 discrete voltage levels?",
    options: [
      "16 kbps",
      "32 kbps",
      "64 kbps",
      "128 kbps"
    ],
    correct: 1,
    explanation: "Nyquist formula: C = 2B * log2(M). Here B = 4000 Hz, M = 16 levels. C = 2 * 4000 * log2(16) = 8000 * 4 = 32,000 bps = 32 kbps."
  },
  {
    id: 3,
    unit: "Unit I",
    category: "Information Theory",
    difficulty: "Advanced",
    question: "A noisy transmission channel has a bandwidth of 3 kHz and a signal-to-noise ratio of 30 dB. What is the Shannon capacity limit of this channel?",
    options: [
      "Approximately 10 kbps",
      "Approximately 20 kbps",
      "Approximately 30 kbps",
      "Approximately 90 kbps"
    ],
    correct: 2,
    explanation: "First convert SNR from dB to linear ratio: 30 dB = 10 * log10(SNR) => SNR = 10^(30/10) = 1000. Apply Shannon formula: C = B * log2(1 + SNR) = 3000 * log2(1001) ≈ 3000 * 9.967 = 29,901 bps ≈ 30 kbps."
  },
  {
    id: 4,
    unit: "Unit I",
    category: "Network Topologies",
    difficulty: "Core",
    question: "How many physical point-to-point duplex links are required to interconnect 10 routers in a fully connected mesh topology?",
    options: [
      "10 links",
      "20 links",
      "45 links",
      "90 links"
    ],
    correct: 2,
    explanation: "In a fully connected mesh topology with N nodes, the number of unique links is N(N - 1) / 2 = 10 * 9 / 2 = 45 links."
  },
  {
    id: 5,
    unit: "Unit I",
    category: "OSI Reference Model",
    difficulty: "Core",
    question: "In the 7-layer OSI reference model, which layer is explicitly responsible for data compression, character code conversion (e.g., ASCII to EBCDIC), and cryptographic encryption/decryption?",
    options: [
      "Application Layer (Layer 7)",
      "Presentation Layer (Layer 6)",
      "Session Layer (Layer 5)",
      "Transport Layer (Layer 4)"
    ],
    correct: 1,
    explanation: "The Presentation Layer (Layer 6) handles syntax and semantics of information exchanged between end systems, including character encoding, compression, and encryption."
  },
  {
    id: 6,
    unit: "Unit I",
    category: "OSI Reference Model",
    difficulty: "Core",
    question: "Which OSI layer establishes, manages, synchronizes with checkpoints, and terminates dialogues between distributed application processes?",
    options: [
      "Network Layer (Layer 3)",
      "Transport Layer (Layer 4)",
      "Session Layer (Layer 5)",
      "Presentation Layer (Layer 6)"
    ],
    correct: 2,
    explanation: "The Session Layer (Layer 5) provides dialogue control, token management, and synchronization checkpoints allowing broken sessions to resume without restarting from scratch."
  },
  {
    id: 7,
    unit: "Unit I",
    category: "Switching Paradigms",
    difficulty: "Core",
    question: "Why is packet switching generally preferred over circuit switching for bursty computer data communication such as web browsing and cloud applications?",
    options: [
      "Packet switching guarantees fixed transmission delay with zero queuing jitter.",
      "Packet switching dynamically shares bandwidth through statistical multiplexing, avoiding channel waste during idle periods.",
      "Packet switching eliminates the need for network layer headers and routing tables.",
      "Packet switching reserves dedicated frequencies across all intermediate links."
    ],
    correct: 1,
    explanation: "Computer data is characteristically bursty. Packet switching dynamically multiplexes packets from active users onto shared links on demand, allowing many more users to share the link than the rigid pre-allocations of circuit switching."
  },
  {
    id: 8,
    unit: "Unit I",
    category: "Network Hardware",
    difficulty: "Core",
    question: "A network topology consists of one router with 3 active interfaces. Each interface connects to a 16-port Ethernet switch with 10 hosts attached. How many broadcast domains and collision domains exist in this topology?",
    options: [
      "1 broadcast domain, 30 collision domains",
      "3 broadcast domains, 33 collision domains",
      "3 broadcast domains, 3 collision domains",
      "30 broadcast domains, 33 collision domains"
    ],
    correct: 1,
    explanation: "Routers isolate broadcast domains: 1 per router interface = 3 broadcast domains. Switches isolate collision domains per active port: each switch has 10 hosts + 1 router uplink = 11 collision domains. Total collision domains = 3 * 11 = 33."
  },
  {
    id: 9,
    unit: "Unit I",
    category: "Transmission Media",
    difficulty: "Core",
    question: "Why does Single-Mode Optical Fiber (SMF) support much greater transmission distances without repeaters than Multimode Optical Fiber (MMF)?",
    options: [
      "Single-mode fiber uses copper cladding to boost signal voltage.",
      "Its extremely small core diameter (8-10 microns) permits only a single light mode, eliminating modal dispersion.",
      "It operates at lower radio frequencies that are immune to attenuation.",
      "It reflects light using metallic mirrors instead of total internal reflection."
    ],
    correct: 1,
    explanation: "Single-mode fiber has a core comparable to the wavelength of light (8-10 um), forcing light to travel along a single direct path. This eliminates modal dispersion, allowing signals to propagate 40-100+ km without repeaters."
  },
  {
    id: 10,
    unit: "Unit I",
    category: "Multiplexing",
    difficulty: "Core",
    question: "What is the primary difference between Synchronous Time Division Multiplexing (Sync TDM) and Statistical Time Division Multiplexing (STDM)?",
    options: [
      "Sync TDM is analog, whereas STDM is purely optical.",
      "Sync TDM reserves fixed time slots for all sources regardless of activity, while STDM dynamically allocates slots only to active channels.",
      "Sync TDM requires guard bands between frequencies, whereas STDM does not.",
      "Sync TDM cannot carry digital voice data."
    ],
    correct: 1,
    explanation: "In Synchronous TDM, each input connection has a reserved time slot in every frame, wasting capacity if a channel is idle. Statistical TDM allocates slots dynamically on demand with address headers, maximizing utilization."
  },
  {
    id: 11,
    unit: "Unit I",
    category: "Performance & Delays",
    difficulty: "Core",
    question: "What is the Bandwidth-Delay Product (BDP) of a 1 Gbps link with a Round-Trip Time (RTT) of 40 ms?",
    options: [
      "40,000 bits (5 KB)",
      "400,000 bits (50 KB)",
      "40,000,000 bits (5 MB)",
      "4,000,000,000 bits (500 MB)"
    ],
    correct: 2,
    explanation: "BDP = Link Rate * RTT = (10^9 bps) * (0.040 s) = 40,000,000 bits = 40 Mb = 5 Megabytes (MB). This represents the volume of unacknowledged data the sender must keep in flight to saturate the link."
  },
  {
    id: 12,
    unit: "Unit I",
    category: "Encapsulation & Architecture",
    difficulty: "Core",
    question: "What is the correct order of Protocol Data Units (PDUs) as data descends from the Application layer to the Physical layer in the Internet protocol stack?",
    options: [
      "Message -> Packet -> Segment -> Frame -> Bits",
      "Message -> Segment -> Packet -> Frame -> Bits",
      "Packet -> Frame -> Segment -> Message -> Bits",
      "Frame -> Packet -> Segment -> Message -> Bits"
    ],
    correct: 1,
    explanation: "Application layer creates Messages; Transport layer adds port headers creating Segments; Network layer adds IP headers creating Packets (Datagrams); Data Link layer adds MAC headers/trailers creating Frames; Physical layer transmits raw Bits."
  },
  {
    id: 13,
    unit: "Unit I",
    category: "Architecture & Standards",
    difficulty: "Core",
    question: "The Internet architecture is celebrated as an 'hourglass' model. What protocol occupies the central narrow waist of this hourglass?",
    options: [
      "Transmission Control Protocol (TCP)",
      "Ethernet (IEEE 802.3)",
      "Internet Protocol (IP)",
      "Hypertext Transfer Protocol (HTTP)"
    ],
    correct: 2,
    explanation: "The Internet Protocol (IP) forms the narrow waist of the hourglass. Thousands of diverse applications operate above IP, while IP operates over an arbitrary variety of physical and link media below."
  },
  {
    id: 14,
    unit: "Unit I",
    category: "Transmission Media",
    difficulty: "Core",
    question: "Why are the two insulated copper conductors in an unshielded twisted-pair (UTP) cable twisted together in a helical spiral?",
    options: [
      "To increase the tensile strength and physical flexibility of the cable.",
      "To ensure equal exposure to external electromagnetic interference so differential signaling can cancel the noise.",
      "To slow down the propagation speed of electrons to prevent reflections.",
      "To double the electrical resistance of the cable."
    ],
    correct: 1,
    explanation: "Twisting ensures both wires experience nearly identical ambient electromagnetic noise. The receiver takes the voltage difference between the two wires (differential signaling), causing common-mode noise to cancel out."
  },
  {
    id: 15,
    unit: "Unit I",
    category: "Performance & Delays",
    difficulty: "Advanced",
    question: "In queuing theory, what happens to the average queuing delay at a router buffer as the traffic intensity I = (L * a) / R approaches 1 from below?",
    options: [
      "It decreases linearly toward zero.",
      "It remains constant and equal to the transmission delay L/R.",
      "It increases asymptotically toward infinity.",
      "It drops abruptly to zero because packets bypass the buffer."
    ],
    correct: 2,
    explanation: "Traffic intensity I = (L * a) / R. As I approaches 1, packet arrival rate equals transmission capacity; queues grow uncontrollably and average queuing delay approaches infinity according to M/M/1 queuing models."
  },
  {
    id: 16,
    unit: "Unit I",
    category: "Network Hardware",
    difficulty: "Core",
    question: "At which layer of the OSI model does an unmanaged Ethernet switch make its forwarding decisions?",
    options: [
      "Physical Layer (Layer 1) using signal voltage levels",
      "Data Link Layer (Layer 2) using 48-bit MAC addresses",
      "Network Layer (Layer 3) using 32-bit IP addresses",
      "Transport Layer (Layer 4) using TCP port numbers"
    ],
    correct: 1,
    explanation: "Standard Ethernet switches operate at Layer 2 (Data Link Layer). They inspect incoming destination MAC addresses and consult an internal self-learning MAC table to forward frames to specific egress ports."
  },
  {
    id: 17,
    unit: "Unit I",
    category: "Protocol Design",
    difficulty: "Core",
    question: "Which of the following defines the 'semantics' component of a network protocol specification?",
    options: [
      "The exact bit offset and field width of header fields.",
      "The meaning of each pattern of bits and what action must be taken upon receipt.",
      "The clock synchronization and transmission speed matching.",
      "The physical cable gauge and connector pinout."
    ],
    correct: 1,
    explanation: "Syntax defines data formatting and structure; semantics defines the interpretation and meaning of each field and the resulting operational actions; timing coordinates speed matching and sequencing."
  },
  {
    id: 18,
    unit: "Unit I",
    category: "Transmission Media",
    difficulty: "Core",
    question: "What optical physics phenomenon enables light pulses to propagate through the glass core of a fiber optic cable without escaping through the sides?",
    options: [
      "Fraunhofer Diffraction",
      "Chromatic Dispersion",
      "Total Internal Reflection at the core-cladding boundary",
      "Polarization Mode Birefringence"
    ],
    correct: 2,
    explanation: "Total Internal Reflection occurs when light traveling through a dense medium (core, n1) strikes the boundary with a less dense medium (cladding, n2 < n1) at an angle greater than the critical angle, reflecting 100% of light back inside."
  },
  {
    id: 19,
    unit: "Unit I",
    category: "Multiplexing",
    difficulty: "Core",
    question: "Dense Wavelength Division Multiplexing (DWDM) is conceptually equivalent to which multiplexing technique, but operating in the optical domain?",
    options: [
      "Synchronous Time Division Multiplexing (TDM)",
      "Frequency Division Multiplexing (FDM)",
      "Code Division Multiple Access (CDMA)",
      "Space Division Multiplexing (SDM)"
    ],
    correct: 1,
    explanation: "Wavelength Division Multiplexing (WDM/DWDM) is FDM applied to light. Each optical carrier corresponds to a distinct optical frequency (or wavelength lambda) sharing the same physical fiber."
  },
  {
    id: 20,
    unit: "Unit I",
    category: "Architecture & Standards",
    difficulty: "Core",
    question: "Why did the TCP/IP reference model gain worldwide commercial dominance over the OSI reference model?",
    options: [
      "OSI protocols were patented and required high licensing royalties, whereas TCP/IP was proprietary to Microsoft.",
      "TCP/IP protocols were pragmatic, open, implemented in Berkeley UNIX, and tested on running networks before standards were finalized.",
      "OSI lacked a transport layer, preventing reliable end-to-end communication.",
      "The US Department of Defense banned the use of OSI standards in all European research laboratories."
    ],
    correct: 1,
    explanation: "TCP/IP succeeded due to working implementations ('running code') integrated freely into BSD UNIX. OSI was hindered by bureaucratic committee politics, high complexity, and delayed commercial implementations."
  },
  {
    id: 21,
    unit: "Unit I",
    category: "Performance & Delays",
    difficulty: "Core",
    question: "If a network user upgrades their residential Internet connection from 50 Mbps to 500 Mbps, which of the following delay components will decrease?",
    options: [
      "Propagation delay across transatlantic undersea cables",
      "Transmission delay for packets injected by the host",
      "Speed of light in the optical fiber",
      "Operating system TCP socket buffer allocation time"
    ],
    correct: 1,
    explanation: "Increasing bandwidth (R) reduces transmission delay d_trans = L / R. Propagation delay d_prop = d / s depends strictly on geographical distance and speed of light in the medium, remaining completely unchanged."
  },

  // ==========================================
  // UNIT II: DATA LINK LAYER & LAN TECHNOLOGIES (21 Questions)
  // ==========================================
  {
    id: 22,
    unit: "Unit II",
    category: "Sliding Window ARQ",
    difficulty: "Core",
    question: "In Go-Back-N (GBN) ARQ, what happens when packet k is lost in transit, but subsequent packets k+1, k+2, and k+3 successfully arrive at the receiver?",
    options: [
      "The receiver buffers packets k+1, k+2, and k+3 and sends selective acknowledgements.",
      "The receiver discards packets k+1, k+2, and k+3 and re-acknowledges the highest in-order packet (k-1).",
      "The receiver immediately crashes the connection and requests a full network reset.",
      "The receiver dynamically expands its receive window to accommodate the gap."
    ],
    correct: 1,
    explanation: "In Go-Back-N, the receiver window size is strictly 1. The receiver accepts packets only in strict sequential order; any out-of-order packet is discarded and a duplicate ACK is sent for the last in-order packet."
  },
  {
    id: 23,
    unit: "Unit II",
    category: "Ethernet & MAC",
    difficulty: "Core",
    question: "Why is the minimum frame size of classic 10 Mbps standard Ethernet (IEEE 802.3) specified as 64 bytes (512 bits)?",
    options: [
      "To allow enough space for IPv6 128-bit addresses in the payload.",
      "To guarantee that the transmitting station is still sending bits when a collision signal arrives from the farthest edge of the collision domain.",
      "Because the CRC-32 algorithm requires at least 512 bits of input to detect errors.",
      "To prevent buffer overflows in standard 10 Mbps multi-port repeaters."
    ],
    correct: 1,
    explanation: "In CSMA/CD, the frame transmission time (L/R) must be at least twice the maximum end-to-end propagation delay (2 * t_prop). At 10 Mbps over the maximum 2.5 km network span, the round-trip slot time is 51.2 microseconds = 512 bit-times = 64 bytes."
  },
  {
    id: 24,
    unit: "Unit II",
    category: "Error Correction",
    difficulty: "Core",
    question: "In standard Hamming (7,4) Single Error Correction code, at which bit positions are the parity check bits located?",
    options: [
      "At bit positions 1, 2, and 3",
      "At bit positions 1, 2, and 4 (powers of 2)",
      "At the last three positions: 5, 6, and 7",
      "At odd bit positions: 1, 3, 5, and 7"
    ],
    correct: 1,
    explanation: "In Hamming codes, parity bits are placed at bit positions that are powers of 2 (2^0 = 1, 2^1 = 2, 2^2 = 4, etc.). Each data bit position's binary expansion uniquely determines which parity bits monitor it."
  },
  {
    id: 25,
    unit: "Unit II",
    category: "Random Access MAC",
    difficulty: "Core",
    question: "What is the maximum theoretical channel throughput of Pure ALOHA and Slotted ALOHA, respectively?",
    options: [
      "Pure ALOHA: 50.0%, Slotted ALOHA: 100.0%",
      "Pure ALOHA: 18.4% (1 / 2e), Slotted ALOHA: 36.8% (1 / e)",
      "Pure ALOHA: 36.8%, Slotted ALOHA: 18.4%",
      "Pure ALOHA: 10.0%, Slotted ALOHA: 90.0%"
    ],
    correct: 1,
    explanation: "Throughput formulas: Pure ALOHA S = G * e^(-2G), maximizing at G = 0.5 with S = 1/(2e) ≈ 18.4%. Slotted ALOHA cuts vulnerable period in half, S = G * e^(-G), maximizing at G = 1.0 with S = 1/e ≈ 36.8%."
  },
  {
    id: 26,
    unit: "Unit II",
    category: "Random Access MAC",
    difficulty: "Core",
    question: "In CSMA protocols, what does a '1-persistent' carrier sensing station do when it senses that the shared channel is currently busy?",
    options: [
      "It aborts immediately and generates a fatal protocol exception.",
      "It waits a random backoff time before sensing the carrier again.",
      "It continues sensing continuously until the channel becomes idle, and then transmits immediately with probability 1.",
      "It transmits immediately anyway, ignoring carrier sensing."
    ],
    correct: 2,
    explanation: "1-persistent CSMA senses continuously when the medium is busy. The moment the channel becomes idle, it transmits with probability p = 1.0. (If multiple stations were waiting, a collision is guaranteed)."
  },
  {
    id: 27,
    unit: "Unit II",
    category: "Error Detection",
    difficulty: "Core",
    question: "When computing a Cyclic Redundancy Check (CRC) with generator polynomial G(x) = x^3 + x + 1 (binary 1011), how many zero bits must be appended to the dataword prior to modulo-2 division?",
    options: [
      "1 zero bit",
      "2 zero bits",
      "3 zero bits (degree of the generator polynomial)",
      "4 zero bits"
    ],
    correct: 2,
    explanation: "The degree of generator polynomial G(x) = x^3 + x + 1 is 3 (highest power). The number of appended zero bits always equals the degree of the generator polynomial (degree = bits in generator - 1 = 4 - 1 = 3)."
  },
  {
    id: 28,
    unit: "Unit II",
    category: "Framing",
    difficulty: "Core",
    question: "In HDLC bit-oriented framing, what does the transmitter's bit-stuffing hardware do whenever it encounters five consecutive '1' bits in the data stream?",
    options: [
      "It inverts the fifth bit to '0'.",
      "It automatically inserts a '0' bit immediately after the five consecutive '1's.",
      "It appends an ESC character to the frame header.",
      "It aborts frame transmission and recalculates the CRC."
    ],
    correct: 1,
    explanation: "To prevent payload data from accidentally mimicking the flag byte 01111110 (six 1s), the sender automatically stuffs a '0' after any sequence of five consecutive '1's. The receiver automatically destuffs the '0'."
  },
  {
    id: 29,
    unit: "Unit II",
    category: "Sliding Window ARQ",
    difficulty: "Core",
    question: "If k bits are allocated for sequence numbers in a Selective Repeat (SR) sliding window protocol, what is the maximum permissible sender window size (Ws) to avoid sequence number ambiguity?",
    options: [
      "Ws <= 2^k - 1",
      "Ws <= 2^(k - 1)",
      "Ws <= 2^k",
      "Ws <= k"
    ],
    correct: 1,
    explanation: "In Selective Repeat, receiver window equals sender window (Ws = Wr). To prevent overlap between the current window and the next sequence cycle, Ws + Wr <= 2^k => 2 * Ws <= 2^k => Ws <= 2^(k-1)."
  },
  {
    id: 30,
    unit: "Unit II",
    category: "Sliding Window ARQ",
    difficulty: "Core",
    question: "In a Go-Back-N (GBN) protocol using a 3-bit sequence number field (0 through 7), what is the maximum allowable sender window size?",
    options: [
      "8",
      "7",
      "4",
      "3"
    ],
    correct: 1,
    explanation: "In Go-Back-N, the maximum sender window size is 2^k - 1. With 3 bits, sequence numbers are 0-7 (range of 8). If window size were 8, the receiver could not distinguish between a retransmission of all 8 frames and transmission of 8 brand new frames."
  },
  {
    id: 31,
    unit: "Unit II",
    category: "Sliding Window ARQ",
    difficulty: "Advanced",
    question: "In a Stop-and-Wait protocol, the packet transmission time Tf = 1 ms and round-trip propagation time RTT = 2 * Tp = 18 ms. Neglecting ACK transmission and processing time, what is the channel utilization (efficiency)?",
    options: [
      "5.26%",
      "10.0%",
      "50.0%",
      "94.7%"
    ],
    correct: 0,
    explanation: "Utilization U = Tf / (Tf + 2*Tp) = 1 ms / (1 ms + 18 ms) = 1 / 19 ≈ 0.0526 = 5.26%. The sender is idle 94.7% of the time waiting for ACKs."
  },
  {
    id: 32,
    unit: "Unit II",
    category: "Ethernet & MAC",
    difficulty: "Core",
    question: "What is the standard format and length of an IEEE 802.3 Ethernet MAC address?",
    options: [
      "32 bits, expressed as four decimal octets (e.g., 192.168.1.1)",
      "48 bits (6 bytes), expressed as six hexadecimal pairs (e.g., 00:1A:2B:3C:4D:5E)",
      "64 bits, expressed as eight hexadecimal pairs",
      "128 bits, expressed in hexadecimal colon notation"
    ],
    correct: 1,
    explanation: "An Ethernet MAC address is 48 bits (6 bytes) long. The first 24 bits represent the Organizationally Unique Identifier (OUI) assigned by IEEE, and the last 24 bits are assigned by the manufacturer."
  },
  {
    id: 33,
    unit: "Unit II",
    category: "Address Resolution",
    difficulty: "Core",
    question: "How does the Address Resolution Protocol (ARP) discover the MAC address of a destination host on the same local subnet when only its IP address is known?",
    options: [
      "It queries the default gateway router via an encrypted TCP connection.",
      "It broadcasts an ARP Request frame to destination MAC FF:FF:FF:FF:FF:FF; the target host responds with a unicast ARP Reply.",
      "It sends an ICMP Echo Request ping packet directly to the destination.",
      "It looks up the IP in a centralized DNS server."
    ],
    correct: 1,
    explanation: "ARP broadcasts a Layer 2 frame to MAC address FF:FF:FF:FF:FF:FF ('Who has IP x.x.x.x? Tell me'). Every station on the LAN processes it, but only the host matching that IP responds with a unicast ARP Reply containing its MAC address."
  },
  {
    id: 34,
    unit: "Unit II",
    category: "Switching & Bridges",
    difficulty: "Core",
    question: "What action does a transparent learning switch take when it receives an Ethernet frame whose destination MAC address is NOT currently present in its forwarding MAC address table?",
    options: [
      "It drops the frame and sends an ICMP Destination Unreachable message.",
      "It floods the frame out of all active ports except the ingress port on which it arrived.",
      "It sends an ARP request to learn the missing switch port.",
      "It buffers the frame permanently until a broadcast arrives."
    ],
    correct: 1,
    explanation: "When a switch encounters an unknown destination unicast MAC address, it performs 'flooding': forwarding copies of the frame out every port except the port on which the frame arrived."
  },
  {
    id: 35,
    unit: "Unit II",
    category: "Virtual LANs",
    difficulty: "Core",
    question: "Under the IEEE 802.1Q standard, how many bytes does the VLAN tag insert into an Ethernet frame, and how many bits are allocated for the VLAN ID (VID)?",
    options: [
      "2 bytes inserted, 8 bits for VID (256 VLANs)",
      "4 bytes inserted, 12 bits for VID (4096 VLANs)",
      "8 bytes inserted, 16 bits for VID (65536 VLANs)",
      "1 byte inserted, 4 bits for VID (16 VLANs)"
    ],
    correct: 1,
    explanation: "IEEE 802.1Q inserts a 4-byte tag into the Ethernet header (TPID = 0x8100 + 2-byte TCI). The TCI field contains 12 bits for the VLAN ID (VID), supporting 2^12 = 4,096 VLANs (0 and 4095 reserved)."
  },
  {
    id: 36,
    unit: "Unit II",
    category: "Wireless LAN (802.11)",
    difficulty: "Core",
    question: "Why does Wi-Fi (IEEE 802.11) use CSMA/CA (Collision Avoidance) instead of Ethernet's CSMA/CD (Collision Detection)?",
    options: [
      "Wi-Fi stations transmit at light speed, preventing collision signals from traveling.",
      "A wireless transceiver's own transmitted signal drowns out any incoming signals, preventing a station from detecting collisions while actively transmitting.",
      "Wi-Fi does not use radio frequencies for transmission.",
      "Collisions cannot occur in wireless radio channels."
    ],
    correct: 1,
    explanation: "Wireless radios cannot detect collisions while transmitting because their own transmitted signal power is thousands of times stronger than incoming signals from distant stations. Furthermore, hidden terminals prevent stations from hearing each other."
  },
  {
    id: 37,
    unit: "Unit II",
    category: "Wireless LAN (802.11)",
    difficulty: "Core",
    question: "In IEEE 802.11 wireless networks, how does the optional RTS/CTS (Request to Send / Clear to Send) exchange solve the 'Hidden Terminal Problem'?",
    options: [
      "By forcing all Wi-Fi clients to use physical fiber optic cables.",
      "The Access Point's CTS broadcast alerts all surrounding stations (including hidden ones) to remain silent for the duration of the data transmission.",
      "By increasing transmission power so all stations hear each other.",
      "By disabling data link layer acknowledgments."
    ],
    correct: 1,
    explanation: "When Station A sends RTS to the AP, the AP responds with a CTS broadcast containing a duration value (Network Allocation Vector, NAV). All stations hearing the CTS (including Station C, which cannot hear A) defer transmission, preventing collisions."
  },
  {
    id: 38,
    unit: "Unit II",
    category: "Framing",
    difficulty: "Core",
    question: "In byte-oriented framing with flag byte FLAG (0x7E) and escape byte ESC (0x7D), what does the transmitter do if the user payload data itself contains an ESC byte?",
    options: [
      "It drops the packet.",
      "It transmits an ESC byte followed by an escaped byte pattern (e.g., ESC ESC).",
      "It replaces the ESC byte with binary zeros.",
      "It switches from byte stuffing to bit stuffing."
    ],
    correct: 1,
    explanation: "In character/byte stuffing, if the payload contains an ESC delimiter, the sender inserts an ESC prefix (ESC ESC). The receiver recognizes the prefix, strips the first ESC, and treats the second ESC as literal data."
  },
  {
    id: 39,
    unit: "Unit II",
    category: "Error Detection",
    difficulty: "Core",
    question: "What is the Hamming distance between the two binary codewords 1011101 and 1001001?",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    correct: 1,
    explanation: "Hamming distance is the number of bit positions in which two codewords differ (the number of 1s in their XOR). 1011101 XOR 1001001 = 0010100, which has exactly two 1s (positions 3 and 5). Hamming distance = 2."
  },
  {
    id: 40,
    unit: "Unit II",
    category: "Error Correction",
    difficulty: "Advanced",
    question: "To detect d single-bit errors and correct up to t single-bit errors, what are the minimum Hamming distances required of a code, respectively?",
    options: [
      "Detection: d + 1, Correction: 2t + 1",
      "Detection: 2d + 1, Correction: t + 1",
      "Detection: d, Correction: t",
      "Detection: d + 2, Correction: 2t + 2"
    ],
    correct: 0,
    explanation: "To detect d single-bit errors, the minimum Hamming distance must be at least d + 1 (so d errors cannot turn one valid codeword into another). To correct t errors, the distance must be at least 2t + 1 (so spheres of radius t do not overlap)."
  },
  {
    id: 41,
    unit: "Unit II",
    category: "Spanning Tree Protocol",
    difficulty: "Core",
    question: "What is the primary function of the Spanning Tree Protocol (IEEE 802.1D STP) in bridged Ethernet LANs?",
    options: [
      "To assign dynamic IPv4 addresses to connected hosts.",
      "To logically disable redundant physical switch links to prevent broadcast storms, duplicate frames, and MAC table thrashing.",
      "To encrypt Ethernet frame payloads using AES-256.",
      "To compute Dijkstra shortest paths across Layer 3 IP subnets."
    ],
    correct: 1,
    explanation: "Ethernet frames lack a TTL field. If physical loops exist in a switched LAN, broadcast frames circulate infinitely, causing catastrophic broadcast storms. STP elects a Root Bridge and blocks redundant ports to form a loop-free tree."
  },
  {
    id: 42,
    unit: "Unit II",
    category: "Flow Control",
    difficulty: "Core",
    question: "In Go-Back-N, the sender window size is N = 4 and transmission time is 1 ms. If packet 0, 1, 2, 3 are transmitted and packet 1 is lost, how many total packets are transmitted by the sender when packet 1 times out?",
    options: [
      "Only packet 1 is retransmitted (1 packet)",
      "Packets 1, 2, and 3 are retransmitted (3 packets)",
      "Packets 0, 1, 2, and 3 are retransmitted (4 packets)",
      "No packets are retransmitted; receiver recovers via parity"
    ],
    correct: 1,
    explanation: "Because the receiver window is 1 in GBN, the receiver dropped packets 2 and 3 when packet 1 failed to arrive. When the timer for packet 1 expires, the sender must 'go back' and retransmit all unacknowledged packets in the window: packets 1, 2, and 3."
  },

  // ==========================================
  // UNIT III: NETWORK LAYER & ROUTING (21 Questions)
  // ==========================================
  {
    id: 43,
    unit: "Unit III",
    category: "IP Addressing & Subnetting",
    difficulty: "Core",
    question: "A network router has the IPv4 prefix 192.168.10.0/27. What are the subnet mask, total IP addresses, and number of usable host addresses?",
    options: [
      "Mask: 255.255.255.0, Total: 256, Usable: 254",
      "Mask: 255.255.255.224, Total: 32, Usable: 30",
      "Mask: 255.255.255.240, Total: 16, Usable: 14",
      "Mask: 255.255.255.192, Total: 64, Usable: 62"
    ],
    correct: 1,
    explanation: "/27 means 27 network bits and 32 - 27 = 5 host bits. Subnet mask = 11111111.11111111.11111111.11100000 = 255.255.255.224. Total IP addresses = 2^5 = 32. Usable hosts = 32 - 2 (network 192.168.10.0 and broadcast 192.168.10.31 reserved) = 30."
  },
  {
    id: 44,
    unit: "Unit III",
    category: "IP Addressing & Subnetting",
    difficulty: "Advanced",
    question: "Under RFC 3021, a /31 subnet prefix is allocated for a point-to-point router link between two routers. How many usable host IP addresses are available on this link?",
    options: [
      "0 usable hosts (2 - 2 = 0)",
      "1 usable host",
      "2 usable hosts (both addresses are usable)",
      "4 usable hosts"
    ],
    correct: 2,
    explanation: "RFC 3021 specifies /31 subnets for point-to-point links. In /31, directed broadcast and traditional network address assumptions are eliminated, allowing both the 0-bit and 1-bit addresses to be assigned to the two router endpoints."
  },
  {
    id: 45,
    unit: "Unit III",
    category: "Routing Algorithms",
    difficulty: "Core",
    question: "Which shortest-path routing algorithm is utilized by the Open Shortest Path First (OSPF) link-state routing protocol?",
    options: [
      "Bellman-Ford Distributed Algorithm",
      "Edsger W. Dijkstra's Shortest Path First (SPF) Algorithm",
      "Floyd-Warshall All-Pairs Algorithm",
      "Ford-Fulkerson Maximum Flow Algorithm"
    ],
    correct: 1,
    explanation: "OSPF is a link-state routing protocol. Every router synchronizes an identical Link-State Database (LSDB) of the topology and independently executes Dijkstra's Shortest Path First (SPF) algorithm to compute its shortest path tree."
  },
  {
    id: 46,
    unit: "Unit III",
    category: "Routing Algorithms",
    difficulty: "Core",
    question: "What is the primary cause of the 'Count-to-Infinity' problem in Distance Vector routing protocols such as RIP?",
    options: [
      "Routers lacking sufficient memory to store BGP autonomous system numbers.",
      "When a link breaks, neighboring routers update each other iteratively based on outdated neighbor estimates, creating mutual dependency loops.",
      "The physical speed of light in optical fibers creates synchronization delays.",
      "Routers retransmitting TCP packets across Layer 2 broadcast domains."
    ],
    correct: 1,
    explanation: "Distance Vector routers have only local neighbor views ('routing by rumor'). When a link fails, neighbors continue advertising routes through each other, incrementally adding +1 in each round until costs reach infinity (16 in RIP)."
  },
  {
    id: 47,
    unit: "Unit III",
    category: "Routing Protocols",
    difficulty: "Core",
    question: "Why does the Border Gateway Protocol (BGP-4) utilize a 'Path-Vector' approach rather than standard distance vector routing?",
    options: [
      "To automatically configure host IP addresses using DHCP.",
      "To prevent inter-domain routing loops by carrying the full list of traversed Autonomous System numbers (AS-PATH) in each route advertisement.",
      "To enable multicast video streaming across corporate subnets.",
      "To encrypt BGP update packets with asymmetric RSA keys."
    ],
    correct: 1,
    explanation: "BGP is a Path-Vector protocol. Every BGP route advertisement includes the complete list of Autonomous Systems (AS-PATH) the route has traversed. If a router sees its own AS number in the AS-PATH attribute, it immediately discards the route, eliminating loops."
  },
  {
    id: 48,
    unit: "Unit III",
    category: "IPv4 Architecture",
    difficulty: "Core",
    question: "In an IPv4 header, the Total Length field is 1500 bytes and the IHL (Internet Header Length) field has the value 5. What is the size of the payload data carried by this datagram?",
    options: [
      "1500 bytes",
      "1495 bytes",
      "1480 bytes",
      "1400 bytes"
    ],
    correct: 2,
    explanation: "IHL represents header length in 32-bit (4-byte) words: Header Size = 5 * 4 = 20 bytes. Payload Size = Total Length - Header Size = 1500 - 20 = 1480 bytes."
  },
  {
    id: 49,
    unit: "Unit III",
    category: "IPv4 Architecture",
    difficulty: "Advanced",
    question: "An unfragmented IPv4 datagram with 4000 bytes payload is fragmented across a link with MTU = 1500 bytes (20 bytes header). What are the Fragment Offset values of the three resulting fragments?",
    options: [
      "0, 1480, 2960",
      "0, 185, 370",
      "0, 500, 1000",
      "1, 2, 3"
    ],
    correct: 1,
    explanation: "Available payload per fragment = MTU - 20 = 1480 bytes. Fragment Offset is measured in 8-byte units: Fragment 1 (bytes 0-1479) Offset = 0 / 8 = 0. Fragment 2 (bytes 1480-2959) Offset = 1480 / 8 = 185. Fragment 3 (bytes 2960-3999) Offset = 2960 / 8 = 370."
  },
  {
    id: 50,
    unit: "Unit III",
    category: "IPv4 Architecture",
    difficulty: "Core",
    question: "What happens when an intermediate router receives an IPv4 datagram with Time to Live (TTL) field equal to 1?",
    options: [
      "The router forwards the packet and sets TTL = 0.",
      "The router discards the packet and sends an ICMP Time Exceeded (Type 11, Code 0) message back to the source.",
      "The router increments the TTL to 64 and forwards the packet.",
      "The router sends the packet to the local broadcast address."
    ],
    correct: 1,
    explanation: "A router decrements TTL by 1 upon receiving a packet. If TTL becomes 0 (as when arriving with TTL=1), the router must discard the packet and transmit an ICMP Time Exceeded error back to the originating source IP. This mechanism powers traceroute."
  },
  {
    id: 51,
    unit: "Unit III",
    category: "IPv6 Architecture",
    difficulty: "Core",
    question: "Which of the following is a key architectural simplification of the IPv6 base header compared to the IPv4 header?",
    options: [
      "IPv6 added a 32-bit header checksum recalculated at every hop.",
      "IPv6 eliminated the header checksum entirely and fixed the base header size strictly to 40 bytes.",
      "IPv6 permits intermediate core routers to perform dynamic fragmentation.",
      "IPv6 introduced broadcast MAC flooding."
    ],
    correct: 1,
    explanation: "The IPv6 base header is strictly fixed at 40 bytes with only 8 fields. The header checksum was removed to accelerate hardware routing, and intermediate routers never fragment packets (only end hosts perform Path MTU Discovery)."
  },
  {
    id: 52,
    unit: "Unit III",
    category: "IPv6 Architecture",
    difficulty: "Core",
    question: "What is the fully compressed legal representation of the IPv6 address 2001:0db8:0000:0000:0000:0000:0000:0001?",
    options: [
      "2001:db8::1",
      "2001:db8:0:0:0:0:0:1",
      "2001:db8:::1",
      "2001::db8::1"
    ],
    correct: 0,
    explanation: "Leading zeros in each quartet are dropped ('0db8' -> 'db8', '0001' -> '1'). The contiguous sequence of six all-zero quartets is replaced by a double colon '::'. The double colon can appear only once in an address, yielding 2001:db8::1."
  },
  {
    id: 53,
    unit: "Unit III",
    category: "Network Address Translation",
    difficulty: "Core",
    question: "How does Network Address Translation (NAPT / Port Address Translation) allow hundreds of internal private hosts to share a single public IPv4 address simultaneously?",
    options: [
      "By converting all IPv4 packets into IPv6 extension headers.",
      "By translating private IP and source port combinations into the single public IP and unique ephemeral source port numbers.",
      "By assigning each private host a unique 48-bit MAC address.",
      "By routing all private packets through an encrypted VPN tunnel."
    ],
    correct: 1,
    explanation: "NAPT (RFC 3022) maintains a translation table mapping (Private IP, Private Port) pairs to (Public IP, NAT Assigned Ephemeral Port). When replies arrive on that port, NAT maps the packet back to the internal host."
  },
  {
    id: 54,
    unit: "Unit III",
    category: "Traffic Shaping & Congestion",
    difficulty: "Core",
    question: "What is the key operational difference between a Leaky Bucket traffic shaper and a Token Bucket traffic shaper?",
    options: [
      "Leaky bucket regulates traffic at the application layer; token bucket operates at the physical layer.",
      "Leaky bucket enforces a strictly constant, uniform output rate regardless of bursts; Token bucket permits short bursts of traffic up to the bucket capacity while maintaining an average rate.",
      "Token bucket drops all burst packets; leaky bucket buffers infinite packets.",
      "Leaky bucket generates cryptographic tokens for secure routing."
    ],
    correct: 1,
    explanation: "A Leaky Bucket drains packets at a strictly constant rate (smoothing out all bursts). A Token Bucket accumulates tokens at rate r up to capacity b; when a burst arrives, it can transmit at maximum line rate until tokens are exhausted, accommodating bursty traffic."
  },
  {
    id: 55,
    unit: "Unit III",
    category: "ICMP & Diagnostics",
    difficulty: "Core",
    question: "How does the 'traceroute' (or tracert) diagnostic utility determine the IP addresses of intermediate routers along a network path?",
    options: [
      "It queries the BGP routing tables of all Tier-1 Internet service providers.",
      "It sends a sequence of packets with incrementally increasing TTL values (TTL = 1, 2, 3...) and records the source IPs of the returned ICMP Time Exceeded error messages.",
      "It scans all open TCP ports on each intermediate router.",
      "It broadcasts an ARP request across the entire global Internet."
    ],
    correct: 1,
    explanation: "Traceroute sends packets starting with TTL = 1. The first router decrements TTL to 0, drops the packet, and returns an ICMP Time Exceeded (Type 11) message. Traceroute records that router's IP, then repeats with TTL = 2, 3, etc., mapping the complete path."
  },
  {
    id: 56,
    unit: "Unit III",
    category: "Longest Prefix Match",
    difficulty: "Core",
    question: "A router's forwarding table contains entries for 128.96.34.0/24 (Interface 1), 128.96.32.0/20 (Interface 2), and 0.0.0.0/0 (Interface 3). A packet arrives with destination IP 128.96.34.15. To which interface is it forwarded?",
    options: [
      "Interface 1 (Longest Prefix Match: /24)",
      "Interface 2 (/20)",
      "Interface 3 (Default Route)",
      "The packet is dropped because of conflicting entries"
    ],
    correct: 0,
    explanation: "The destination 128.96.34.15 matches all three routes: /24 (24 bits match), /20 (20 bits match), and 0.0.0.0/0 (0 bits match). Under the Longest Prefix Match (LPM) rule, the router forwards out Interface 1 because /24 is the most specific prefix."
  },
  {
    id: 57,
    unit: "Unit III",
    category: "Software-Defined Networking",
    difficulty: "Core",
    question: "What is the foundational architectural principle of Software-Defined Networking (SDN)?",
    options: [
      "Replacing all copper cables with optical wireless lasers.",
      "Decoupling the Control Plane (routing decision logic) from the Data Plane (forwarding hardware) and centralizing control in a programmable software controller.",
      "Running all network routers inside client web browsers.",
      "Eliminating the need for IP addresses in core routers."
    ],
    correct: 1,
    explanation: "SDN separates the Control Plane (path computation, policy logic) from the Data Plane (fast packet forwarding in switches). A centralized software controller (e.g., OpenFlow, ONOS) programs flow tables in simple packet-switching hardware."
  },
  {
    id: 58,
    unit: "Unit III",
    category: "Routing Theory",
    difficulty: "Core",
    question: "What does the 'Optimality Principle' in network routing state?",
    options: [
      "Every router must choose the shortest hop count link regardless of delay.",
      "If router J is on the optimal path from router I to router K, then the optimal path from J to K also falls along the same route.",
      "The shortest path tree must contain at least one circular loop.",
      "Packet routing costs can be negative if links are overprovisioned."
    ],
    correct: 1,
    explanation: "The Optimality Principle states that if router J is on the optimal path from I to K, then the optimal path from J to K must follow that same route. As a direct consequence, the set of optimal paths from all sources to a given destination forms a tree rooted at the destination (a sink tree)."
  },
  {
    id: 59,
    unit: "Unit III",
    category: "Explicit Congestion Notification",
    difficulty: "Core",
    question: "How does Explicit Congestion Notification (ECN, RFC 3168) alert end hosts of network congestion without dropping packets?",
    options: [
      "The router sends an out-of-band email to the system administrator.",
      "When a router buffer starts filling, it marks the 2-bit ECN field in the IPv4/IPv6 header with binary '11' (Congestion Experienced); the receiver echoes this in its TCP ACK.",
      "The router fragments the packet into 64-byte chunks.",
      "The router resets the TCP connection by transmitting an RST segment."
    ],
    correct: 1,
    explanation: "ECN utilizes 2 bits in the IP header TOS/Traffic Class field. When a router experiences queue buildup, it marks the ECN bits with '11' (CE - Congestion Experienced). The receiver returns this notification in the TCP ECE flag, prompting the sender to throttle without packet drop."
  },
  {
    id: 60,
    unit: "Unit III",
    category: "IP Addressing & Subnetting",
    difficulty: "Core",
    question: "What is the directed broadcast address for the subnet containing host 172.16.85.40 with subnet mask 255.255.254.0 (/23)?",
    options: [
      "172.16.85.255",
      "172.16.84.255",
      "172.16.85.0",
      "172.16.255.255"
    ],
    correct: 0,
    explanation: "In /23, the third octet has 7 network bits and 1 host bit (block size = 2 in third octet). 85 is an odd number, so the subnet spans 172.16.84.0 through 172.16.85.255. The directed broadcast address (all host bits 1) is 172.16.85.255."
  },
  {
    id: 61,
    unit: "Unit III",
    category: "OSPF Routing",
    difficulty: "Core",
    question: "In a multi-area OSPF network, what is the mandatory designated backbone area to which all other OSPF areas must physically or virtually connect?",
    options: [
      "Area 1",
      "Area 0 (or Area 0.0.0.0)",
      "Area 255",
      "Area 65535"
    ],
    correct: 1,
    explanation: "In OSPF, Area 0 (Area 0.0.0.0) is the backbone area. All inter-area traffic must traverse the Area 0 backbone via Area Border Routers (ABRs) to prevent routing loops between non-backbone areas."
  },
  {
    id: 62,
    unit: "Unit III",
    category: "IPv4 Architecture",
    difficulty: "Core",
    question: "If an IPv4 datagram has its Don't Fragment (DF) flag bit set to 1, what must an intermediate router do if the datagram size exceeds the outgoing link's MTU?",
    options: [
      "Clear the DF bit and fragment the datagram anyway.",
      "Discard the datagram and send an ICMP Destination Unreachable message with code 'Fragmentation Needed and DF set'.",
      "Compress the IP payload using gzip.",
      "Buffer the datagram until the link MTU increases."
    ],
    correct: 1,
    explanation: "If DF = 1, intermediate routers are forbidden from fragmenting the packet. If it cannot be forwarded intact, the router must drop it and return ICMP Type 3 Code 4 ('Fragmentation Needed and DF set'), including the link's MTU for Path MTU Discovery."
  },
  {
    id: 63,
    unit: "Unit III",
    category: "Tunneling",
    difficulty: "Core",
    question: "In network tunneling (e.g., 6to4 or GRE), what is the basic mechanism used to transmit packets of protocol A across a network running protocol B?",
    options: [
      "Compiling protocol A bytecode into protocol B machine code.",
      "Encapsulating the entire Protocol A packet as the data payload inside a standard Protocol B datagram.",
      "Converting Protocol A binary bits into analog audio tones.",
      "Using dual-port Ethernet switches with NAT."
    ],
    correct: 1,
    explanation: "Tunneling encapsulates an entire packet from one protocol (e.g., an IPv6 datagram) inside the payload field of an outer packet from another protocol (e.g., an IPv4 header with Protocol 41). The outer network routes the packet normally."
  },

  // ==========================================
  // UNIT IV: TRANSPORT LAYER (21 Questions)
  // ==========================================
  {
    id: 64,
    unit: "Unit IV",
    category: "TCP Three-Way Handshake",
    difficulty: "Core",
    question: "During the standard TCP three-way handshake, what flags and sequence/acknowledgement numbers are exchanged in the second segment sent from the server to the client?",
    options: [
      "SYN = 1, ACK = 0; Seq = client_isn, Ack = 0",
      "SYN = 1, ACK = 1; Seq = server_isn, Ack = client_isn + 1",
      "ACK = 1; Seq = client_isn + 1, Ack = server_isn + 1",
      "RST = 1, ACK = 1; Seq = 0, Ack = 0"
    ],
    correct: 1,
    explanation: "The server responds to the client's SYN with a SYN-ACK segment: SYN=1 to announce its own initial sequence number (server_isn), and ACK=1 with Acknowledgement Number = client_isn + 1 to confirm receipt of the client's SYN."
  },
  {
    id: 65,
    unit: "Unit IV",
    category: "TCP vs UDP",
    difficulty: "Core",
    question: "Which of the following characteristics is unique to UDP (User Datagram Protocol, RFC 768) compared to TCP?",
    options: [
      "Guaranteed in-order delivery of bytes.",
      "Dynamic flow control using receiver advertised windows.",
      "Preservation of discrete application message boundaries with minimal 8-byte fixed header overhead.",
      "Adaptive congestion control using AIMD."
    ],
    correct: 2,
    explanation: "UDP is message-oriented: a single write to a UDP socket produces exactly one independent UDP datagram at the receiver. TCP is a continuous byte-stream with no concept of message boundaries. UDP has a minimal fixed 8-byte header."
  },
  {
    id: 66,
    unit: "Unit IV",
    category: "TCP Flow Control",
    difficulty: "Core",
    question: "In TCP flow control, how does the receiver prevent a fast sender from overflowing its application buffer?",
    options: [
      "The receiver drops every second packet to force the sender into slow start.",
      "The receiver advertises its available buffer space in the 16-bit 'Receive Window' (rwnd) field of every ACK segment.",
      "The receiver resets the connection with an RST segment.",
      "The receiver decreases its physical link speed using CSMA/CD."
    ],
    correct: 1,
    explanation: "TCP flow control is receiver-driven. The receiver includes its available free buffer capacity in the Receive Window (rwnd) field of every TCP header. The sender guarantees that (LastByteSent - LastByteAcked) <= rwnd."
  },
  {
    id: 67,
    unit: "Unit IV",
    category: "TCP Flow Control",
    difficulty: "Advanced",
    question: "If a TCP receiver advertises rwnd = 0 (buffer full) and later frees up buffer space, but its window update ACK segment is lost in transit, how does TCP prevent deadlock?",
    options: [
      "The sender crashes with a broken pipe error.",
      "The sender runs a Persist Timer; upon expiration, it sends a 1-byte 'Zero-Window Probe' segment to force the receiver to re-advertise its current rwnd.",
      "The receiver automatically broadcasts an ARP announcement.",
      "The client closes the connection after 100 milliseconds."
    ],
    correct: 1,
    explanation: "If the receiver's window-opening ACK is lost, both sides would wait forever (deadlock). To prevent this, when rwnd=0, the sender starts a Persist Timer. When it expires, the sender transmits a 1-byte Zero-Window Probe segment, forcing an ACK with updated rwnd."
  },
  {
    id: 68,
    unit: "Unit IV",
    category: "TCP Congestion Control",
    difficulty: "Core",
    question: "In TCP Reno congestion control, what happens when the sender detects a packet loss via the receipt of 3 duplicate ACKs (Fast Retransmit)?",
    options: [
      "The sender resets cwnd to 1 MSS and re-enters Slow Start.",
      "The sender sets ssthresh = cwnd / 2, sets cwnd = ssthresh + 3 MSS, and enters Fast Recovery (AIMD).",
      "The sender terminates the connection immediately.",
      "The sender increases cwnd exponentially."
    ],
    correct: 1,
    explanation: "3 duplicate ACKs indicate that subsequent packets are still reaching the receiver (the network is still delivering data). TCP Reno performs Fast Retransmit (re-sending the missing segment) and sets ssthresh = cwnd/2, cwnd = ssthresh + 3, entering Fast Recovery rather than dropping to 1 MSS."
  },
  {
    id: 69,
    unit: "Unit IV",
    category: "TCP Congestion Control",
    difficulty: "Core",
    question: "In TCP Slow Start, how does the congestion window (cwnd) increase upon the receipt of each successful acknowledgement?",
    options: [
      "It increases linearly by 1 MSS per Round-Trip Time (RTT).",
      "It increases by 1 MSS for every ACK received, effectively doubling cwnd every RTT (exponential growth).",
      "It remains constant until the slow start threshold (ssthresh) is reached.",
      "It increases by 50% each second."
    ],
    correct: 1,
    explanation: "Despite its misleading name 'Slow Start', cwnd actually grows exponentially. For every individual ACK received, cwnd is incremented by 1 MSS. Thus, if a sender transmits N segments and receives N ACKs in one RTT, cwnd doubles to 2N MSS."
  },
  {
    id: 70,
    unit: "Unit IV",
    category: "TCP Connection Teardown",
    difficulty: "Core",
    question: "Why must the client in a standard TCP connection remain in the TIME_WAIT state for 2 * MSL (Maximum Segment Lifetime, typically 60 to 120 seconds) before fully closing?",
    options: [
      "To allow the operating system to format the hard disk.",
      "To ensure the final ACK reaches the server (and retransmit it if lost), and to prevent old duplicate packets from an earlier connection from corrupting a new incarnation of the same socket pair.",
      "To wait for DNS records to expire.",
      "To retransmit any remaining UDP messages."
    ],
    correct: 1,
    explanation: "TIME_WAIT (2MSL) serves two purposes: 1) If the client's final ACK was lost, the server re-sends FIN; the client must still be active to acknowledge it. 2) It allows any lingering duplicate packets wandering the network to expire before the same port tuple can be reused."
  },
  {
    id: 71,
    unit: "Unit IV",
    category: "Multiplexing & Sockets",
    difficulty: "Core",
    question: "What 4-tuple uniquely identifies a connection-oriented TCP socket on a host system?",
    options: [
      "(Source IP, Destination IP, MAC Address, Protocol)",
      "(Source IP, Source Port, Destination IP, Destination Port)",
      "(Source MAC, Destination MAC, VLAN ID, Port)",
      "(Hostname, Domain, URL, Path)"
    ],
    correct: 1,
    explanation: "A TCP connection is uniquely identified by the 4-tuple: (Source IP, Source Port, Destination IP, Destination Port). A web server on port 80 can support thousands of simultaneous TCP connections because each client has a distinct Source IP and/or Source Port."
  },
  {
    id: 72,
    unit: "Unit IV",
    category: "TCP Sequence Numbers",
    difficulty: "Core",
    question: "A TCP sender transmits 3 consecutive segments to a receiver with Sequence Numbers 1000, 1500, and 2000. Each segment contains 500 bytes of data. What will be the Acknowledgment Number sent by the receiver if all 3 segments arrive safely in order?",
    options: [
      "2000",
      "2500",
      "1500",
      "3000"
    ],
    correct: 1,
    explanation: "TCP Acknowledgement Numbers are cumulative and indicate the NEXT expected byte sequence number. The third segment covers byte sequence numbers 2000 through 2499 (500 bytes). The next byte expected by the receiver is 2500."
  },
  {
    id: 73,
    unit: "Unit IV",
    category: "TCP Header Fields",
    difficulty: "Core",
    question: "What is the purpose of the RST (Reset) control flag in the TCP header?",
    options: [
      "To initiate the graceful three-way handshake connection setup.",
      "To immediately abort and reject a connection (e.g., when a segment arrives for a closed port or half-open connection).",
      "To request retransmission of the last 10 packets.",
      "To increase the receiver buffer size dynamically."
    ],
    correct: 1,
    explanation: "The RST flag is used to refuse an invalid connection attempt, abort a compromised or crashing connection immediately, or notify a sender that a packet was addressed to a port where no application is currently listening."
  },
  {
    id: 74,
    unit: "Unit IV",
    category: "TCP RTT Estimation",
    difficulty: "Advanced",
    question: "In Jacobson's algorithm for TCP Retransmission Timeout (RFC 6298), how is the updated EstimatedRTT computed from the previous EstimatedRTT and the latest SampleRTT measurement (with weighting factor alpha = 0.125)?",
    options: [
      "EstimatedRTT = (SampleRTT + EstimatedRTT) / 2",
      "EstimatedRTT = (1 - alpha) * EstimatedRTT + alpha * SampleRTT",
      "EstimatedRTT = SampleRTT * alpha",
      "EstimatedRTT = max(SampleRTT, EstimatedRTT)"
    ],
    correct: 1,
    explanation: "TCP uses an Exponentially Weighted Moving Average (EWMA): EstimatedRTT = (1 - alpha) * EstimatedRTT + alpha * SampleRTT. With alpha = 0.125, the new estimate puts 87.5% weight on historical smoothed RTT and 12.5% weight on the newest sample."
  },
  {
    id: 75,
    unit: "Unit IV",
    category: "UDP Architecture",
    difficulty: "Core",
    question: "Why does the UDP header include a checksum calculation covering a 12-byte 'pseudo-header' in addition to the UDP header and data?",
    options: [
      "To verify that the packet was not misdelivered to the wrong IP address or protocol handler.",
      "To encrypt the packet with the IP address as a secret key.",
      "To determine the link-layer MAC address.",
      "To calculate the round-trip propagation time."
    ],
    correct: 0,
    explanation: "The UDP pseudo-header contains Source IP, Destination IP, Protocol (17), and UDP Length. Including these fields in the checksum calculation guarantees that the segment was not corrupted in transit and delivered to the wrong IP address or protocol."
  },
  {
    id: 76,
    unit: "Unit IV",
    category: "Modern Transport (QUIC)",
    difficulty: "Core",
    question: "What major performance advantage does QUIC (RFC 9000, underlying HTTP/3) provide over traditional TCP + TLS over IPv4?",
    options: [
      "QUIC eliminates IP addressing entirely.",
      "QUIC runs over UDP and eliminates Head-of-Line (HoL) blocking between independent streams while achieving 0-RTT connection resumption.",
      "QUIC transmits raw electrical bits across physical copper without framing.",
      "QUIC requires intermediate routers to verify digital signatures."
    ],
    correct: 1,
    explanation: "Traditional HTTP/2 over TCP suffers from Head-of-Line blocking: if one packet is lost, all concurrent streams stall waiting for TCP retransmission. QUIC multiplexes streams independently over UDP, supports 0-RTT handshakes, and survives client IP roaming."
  },
  {
    id: 77,
    unit: "Unit IV",
    category: "TCP Congestion Control",
    difficulty: "Core",
    question: "What is the additive-increase, multiplicative-decrease (AIMD) property of TCP Congestion Avoidance?",
    options: [
      "cwnd increases by 1 MSS every RTT when no loss occurs; cwnd is halved (cut by 50%) when a loss event occurs.",
      "cwnd doubles every RTT and resets to 0 upon loss.",
      "cwnd increases by 10 MSS every second and decreases by 1 MSS upon timeout.",
      "cwnd is locked permanently to the receiver window rwnd."
    ],
    correct: 0,
    explanation: "AIMD is the foundation of TCP congestion avoidance. In the absence of loss, cwnd increases linearly by 1 MSS per RTT (probing for bandwidth). Upon packet loss, cwnd is halved (multiplicatively decreased), driving the network toward fairness and stability."
  },
  {
    id: 78,
    unit: "Unit IV",
    category: "Port Numbers",
    difficulty: "Core",
    question: "Which range of port numbers is designated by IANA as the 'Well-Known Ports' reserved for standard server system protocols such as HTTP (80), HTTPS (443), and SSH (22)?",
    options: [
      "Ports 0 through 1023",
      "Ports 1024 through 49151",
      "Ports 49152 through 65535",
      "Ports 80 through 443"
    ],
    correct: 0,
    explanation: "IANA divides port numbers into three ranges: Well-Known Ports (0 to 1023, requiring root/administrator privilege to bind on UNIX), Registered Ports (1024 to 49151), and Dynamic/Private Ephemeral Ports (49152 to 65535)."
  },
  {
    id: 79,
    unit: "Unit IV",
    category: "TCP Optimization",
    difficulty: "Core",
    question: "What problem does Nagle's algorithm (RFC 896) address in interactive TCP sessions such as Telnet or SSH?",
    options: [
      "It prevents bufferbloat by dropping duplicate packets.",
      "It prevents the generation of numerous tiny packets (e.g., 1 byte data + 40 bytes header) by buffering small writes until all outstanding data is acknowledged or an MSS-sized chunk is assembled.",
      "It forces the receiver to delay sending acknowledgments for 500 ms.",
      "It dynamically increases the maximum segment size (MSS)."
    ],
    correct: 1,
    explanation: "In interactive typing, an application might write 1 byte at a time, producing 41-byte packets (4000% overhead). Nagle's algorithm buffers subsequent small writes until previous data is acknowledged or a full MSS is ready to transmit."
  },
  {
    id: 80,
    unit: "Unit IV",
    category: "TCP SYN Flood Attack",
    difficulty: "Core",
    question: "In cybersecurity, how does a TCP SYN Flood denial-of-service attack exhaust a target server's memory, and how do 'SYN Cookies' mitigate it?",
    options: [
      "The attacker sends giant 65,535-byte packets; the server runs out of disk space.",
      "The attacker floods forged SYN packets; the server allocates half-open connection state buffers until memory exhausts. SYN Cookies encode connection state inside the initial sequence number without allocating server memory until ACK arrives.",
      "The attacker floods FIN packets to force connection closes.",
      "The attacker modifies the server's ARP table."
    ],
    correct: 1,
    explanation: "In a SYN flood, the attacker sends SYNs from spoofed IPs and ignores the SYN-ACKs, leaving connections in SYN_RCVD state and exhausting the server's backlog queue. SYN Cookies eliminate the backlog buffer by encoding connection parameters into the server's initial sequence number."
  },
  {
    id: 81,
    unit: "Unit IV",
    category: "TCP Window Scaling",
    difficulty: "Core",
    question: "The standard TCP header allocated 16 bits for the Window Size field (max 65,535 bytes). How does the TCP Window Scale option (RFC 7323) allow modern systems to advertise gigabyte receive windows over high-BDP links?",
    options: [
      "By replacing IPv4 with IPv6.",
      "By defining a scale factor during the 3-way handshake that left-shifts the 16-bit window value by up to 14 bits (multiplying it by up to 2^14 = 16,384).",
      "By sending 4 consecutive window headers in every packet.",
      "By compressing the window field using Huffman encoding."
    ],
    correct: 1,
    explanation: "RFC 7323 defines the Window Scale option negotiated in SYN segments. It specifies a shift count S (0 to 14). The effective window is (Window Size) * 2^S, allowing window sizes up to 65,535 * 2^14 = 1,073,725,440 bytes (approx 1 Gigabyte)."
  },
  {
    id: 82,
    unit: "Unit IV",
    category: "TCP Congestion Control",
    difficulty: "Core",
    question: "In TCP Tahoe (the historical predecessor to TCP Reno), what action did the sender take whenever a packet loss was detected (either by timeout or 3 duplicate ACKs)?",
    options: [
      "It entered Fast Recovery and continued sending at half speed.",
      "It set ssthresh = cwnd / 2, unconditionally reset cwnd to 1 MSS, and restarted in Slow Start.",
      "It doubled cwnd and enabled selective acknowledgments.",
      "It ignored the loss and waited for a full connection timeout."
    ],
    correct: 1,
    explanation: "TCP Tahoe had no Fast Recovery. Whenever loss was detected (whether by timeout or 3 duplicate ACKs), Tahoe set ssthresh = cwnd / 2, crashed cwnd back to 1 MSS, and restarted from scratch in Slow Start, severely penalizing throughput."
  },
  {
    id: 83,
    unit: "Unit IV",
    category: "TCP Options & SACK",
    difficulty: "Core",
    question: "How does the TCP Selective Acknowledgment (SACK, RFC 2018) option improve retransmission efficiency over lossy links compared to standard cumulative ACKs?",
    options: [
      "It enables the receiver to explicitly inform the sender of non-contiguous isolated blocks of received data, allowing the sender to retransmit only missing segments.",
      "It automatically compresses the TCP payload with zlib.",
      "It eliminates the need for sequence numbers.",
      "It encrypts the payload using symmetric keys."
    ],
    correct: 0,
    explanation: "Standard cumulative ACKs acknowledge only the highest contiguous byte. If packet 2 of 10 is lost, the sender cannot tell which subsequent packets arrived. SACK specifies non-contiguous blocks ([3000-5000], [6000-8000]), so the sender retransmits strictly missing gaps."
  },
  {
    id: 84,
    unit: "Unit IV",
    category: "Transport Layer Services",
    difficulty: "Core",
    question: "Which of the following application requirements can the Transport Layer (TCP or UDP) natively guarantee without application assistance?",
    options: [
      "Absolute end-to-end delivery delay bound of exactly 5 milliseconds.",
      "Guaranteed minimum transmission throughput of 50 Mbps.",
      "Reliable, in-order byte stream delivery across an unreliable best-effort network.",
      "Zero physical wireless signal attenuation."
    ],
    correct: 2,
    explanation: "Standard Internet transport protocols (TCP/UDP) cannot guarantee minimum throughput or delay bounds because the underlying IP network layer is best-effort. However, TCP can and does guarantee reliable in-order byte stream delivery via sequence numbers and retransmissions."
  },

  // ==========================================
  // UNIT V: APPLICATION LAYER & NETWORK SECURITY (21 Questions)
  // ==========================================
  {
    id: 85,
    unit: "Unit V",
    category: "Domain Name System",
    difficulty: "Core",
    question: "In the Domain Name System (DNS), what is the primary operational difference between a 'Recursive' DNS query and an 'Iterative' DNS query?",
    options: [
      "Recursive queries use TCP port 53; iterative queries use UDP port 53.",
      "In a recursive query, the contacted server assumes responsibility for obtaining the final IP mapping; in an iterative query, the contacted server returns the best referral address of the next DNS server to contact.",
      "Recursive queries resolve hostnames to MAC addresses; iterative queries resolve hostnames to IP addresses.",
      "Iterative queries are used only for IPv6 addresses."
    ],
    correct: 1,
    explanation: "In a recursive query (typically sent from client host to local resolver), the resolver promises to track down the final answer. In an iterative query (sent from local resolver to Root/TLD/Authoritative servers), the queried server responds: 'I don't know the answer, but ask this next server instead'."
  },
  {
    id: 86,
    unit: "Unit V",
    category: "Domain Name System",
    difficulty: "Core",
    question: "Which DNS Resource Record (RR) type maps a canonical domain name (FQDN) to its corresponding 128-bit IPv6 address?",
    options: [
      "A Record",
      "AAAA Record",
      "CNAME Record",
      "MX Record"
    ],
    correct: 1,
    explanation: "An 'A' record maps a hostname to a 32-bit IPv4 address. An 'AAAA' record (quad-A) maps a hostname to a 128-bit IPv6 address. CNAME specifies an alias, and MX specifies a mail server."
  },
  {
    id: 87,
    unit: "Unit V",
    category: "HTTP Architecture",
    difficulty: "Core",
    question: "What major architectural improvement did HTTP/2 introduce over HTTP/1.1 to eliminate Head-of-Line (HoL) blocking at the application layer?",
    options: [
      "Switching from TCP to UDP.",
      "Binary framing and request/response multiplexing over a single shared TCP connection.",
      "Removing all HTTP headers.",
      "Mandating that all web servers run in physical memory caches."
    ],
    correct: 1,
    explanation: "HTTP/1.1 required multiple parallel TCP connections or serial pipelining where one slow asset stalled subsequent transfers. HTTP/2 introduces a binary framing layer that breaks requests/responses into discrete interleaved frames multiplexed over one single TCP connection."
  },
  {
    id: 88,
    unit: "Unit V",
    category: "HTTP Status Codes",
    difficulty: "Core",
    question: "What HTTP status code is returned by a web server to indicate that the requested resource has not been modified since the timestamp specified in the client's 'If-Modified-Since' header, enabling client cache revalidation?",
    options: [
      "200 OK",
      "301 Moved Permanently",
      "304 Not Modified",
      "404 Not Found"
    ],
    correct: 2,
    explanation: "When a browser has a cached copy, it sends a conditional GET with 'If-Modified-Since'. If the server's resource has not changed, it returns '304 Not Modified' with an empty body, saving significant bandwidth and page load time."
  },
  {
    id: 89,
    unit: "Unit V",
    category: "Email Architecture",
    difficulty: "Core",
    question: "In the Internet electronic mail architecture, why is SMTP used to push mail between servers, while IMAP or POP3 is used by a client to retrieve mail?",
    options: [
      "SMTP is encrypted; IMAP and POP3 are always plaintext.",
      "SMTP is a push protocol requiring the destination server to be online listening on port 25; a recipient's user machine is frequently offline, necessitating a pull protocol (POP3/IMAP) to fetch accumulated mail from a mailbox server.",
      "SMTP operates over UDP, whereas IMAP operates over TCP.",
      "IMAP and POP3 were designed for video streaming."
    ],
    correct: 1,
    explanation: "SMTP is a push protocol used by senders to push mail to their mail server and between mail transfer agents (MTAs). Because recipient user PCs are not permanent 24/7 servers with static public IPs, they use pull protocols (POP3/IMAP) to fetch messages on demand."
  },
  {
    id: 90,
    unit: "Unit V",
    category: "Public Key Cryptography",
    difficulty: "Core",
    question: "In the RSA public key cryptosystem, if prime numbers p = 3 and q = 11 are selected, what is the value of Euler's totient function phi(n)?",
    options: [
      "33",
      "20",
      "30",
      "14"
    ],
    correct: 1,
    explanation: "The modulus is n = p * q = 3 * 11 = 33. Euler's totient function phi(n) = (p - 1) * (q - 1) = (3 - 1) * (11 - 1) = 2 * 10 = 20."
  },
  {
    id: 91,
    unit: "Unit V",
    category: "Public Key Cryptography",
    difficulty: "Advanced",
    question: "In RSA with modulus n = 33 and public exponent e = 7, what is the matching private key decryption exponent d such that (e * d) mod phi(n) = 1 (where phi(n) = 20)?",
    options: [
      "3",
      "7",
      "13",
      "17"
    ],
    correct: 0,
    explanation: "We must find integer d such that (7 * d) mod 20 = 1. Testing values: 7 * 3 = 21. 21 mod 20 = 1. Therefore, the modular multiplicative inverse is d = 3."
  },
  {
    id: 92,
    unit: "Unit V",
    category: "Public Key Cryptography",
    difficulty: "Advanced",
    question: "Using RSA with public key (e = 3, n = 33), what is the ciphertext c produced when encrypting plaintext message m = 4?",
    options: [
      "12",
      "31",
      "64",
      "7"
    ],
    correct: 1,
    explanation: "Encryption formula: c = m^e mod n. Here m = 4, e = 3, n = 33. m^e = 4^3 = 64. c = 64 mod 33. 64 = 1 * 33 + 31. Therefore, ciphertext c = 31."
  },
  {
    id: 93,
    unit: "Unit V",
    category: "Digital Signatures & PKI",
    difficulty: "Core",
    question: "How does a sender generate an authentic digital signature for a document using public key cryptography?",
    options: [
      "The sender encrypts the document with the recipient's public key.",
      "The sender computes a cryptographic hash of the document and encrypts that hash using the sender's own private key.",
      "The sender transmits their private key to the recipient.",
      "The sender signs the document using a shared secret symmetric AES key."
    ],
    correct: 1,
    explanation: "A digital signature is created by hashing the document (e.g., with SHA-256) and encrypting the resulting hash with the sender's PRIVATE key. Anyone can verify it using the sender's PUBLIC key, proving both authorship (non-repudiation) and integrity."
  },
  {
    id: 94,
    unit: "Unit V",
    category: "Firewalls & Network Security",
    difficulty: "Core",
    question: "What is the key functional difference between a traditional stateless packet-filtering firewall and a stateful inspection firewall?",
    options: [
      "Stateless firewalls operate at Layer 7; stateful firewalls operate at Layer 1.",
      "Stateless firewalls inspect each packet in isolation against static rules; stateful firewalls track the connection state (e.g., TCP handshake state, sequence numbers) and permit inbound packets only if they belong to an established outbound session.",
      "Stateless firewalls require login passwords; stateful firewalls do not.",
      "Stateful firewalls block all encrypted HTTPS traffic."
    ],
    correct: 1,
    explanation: "Stateless firewalls evaluate packets independently using static ACLs (IP, port). Stateful firewalls maintain a dynamic connection state table. For example, when an internal host makes an outbound web request, the stateful firewall automatically permits the returning inbound HTTP response packets."
  },
  {
    id: 95,
    unit: "Unit V",
    category: "IDS & IPS",
    difficulty: "Core",
    question: "What is the primary operational distinction between an Intrusion Detection System (IDS) and an Intrusion Prevention System (IPS)?",
    options: [
      "An IDS is deployed in-line to actively block traffic; an IPS sits out-of-band on a SPAN port.",
      "An IDS passively monitors traffic copies and alerts administrators when an attack signature matches; an IPS sits actively in-line and drops or resets malicious packets before they reach targets.",
      "An IDS detects hardware failures; an IPS detects software bugs.",
      "An IDS operates strictly on wireless networks."
    ],
    correct: 1,
    explanation: "An IDS is passive (connected via a tap/mirror port): it inspects traffic and alerts. An IPS is active and inline: all traffic physically traverses the IPS, enabling it to immediately drop malicious packets or inject TCP RST segments to kill attacking connections in real time."
  },
  {
    id: 96,
    unit: "Unit V",
    category: "HTTPS & TLS",
    difficulty: "Core",
    question: "What prevents a Man-in-the-Middle (MitM) attacker from impersonating a legitimate banking website during the TLS 1.3 handshake?",
    options: [
      "The client's web browser verifies the server's X.509 digital certificate against pre-installed trusted Root Certificate Authorities (CAs).",
      "The client uses IP address spoofing prevention at Layer 2.",
      "The server verifies the client's home Wi-Fi password.",
      "TLS requires all routers to be manufactured by the same vendor."
    ],
    correct: 0,
    explanation: "During the TLS handshake, the server presents an X.509 certificate issued by a trusted Certificate Authority (CA). The browser verifies the CA's digital signature using public keys embedded in the OS/browser trust store, authenticating the server's identity."
  },
  {
    id: 97,
    unit: "Unit V",
    category: "Cryptographic Hash Functions",
    difficulty: "Core",
    question: "Which mathematical property of a cryptographic hash function guarantees that it is computationally infeasible to find any two distinct input messages m1 != m2 such that Hash(m1) == Hash(m2)?",
    options: [
      "Pre-image resistance (One-way property)",
      "Second pre-image resistance (Weak collision resistance)",
      "Collision resistance (Strong collision resistance)",
      "Symmetric homomorphic determinism"
    ],
    correct: 2,
    explanation: "Collision resistance (strong collision resistance) ensures that it is computationally infeasible to find ANY pair of distinct messages m1 != m2 that produce the identical hash output. Pre-image resistance means given h, finding m is infeasible."
  },
  {
    id: 98,
    unit: "Unit V",
    category: "Virtual Private Networks",
    difficulty: "Core",
    question: "In IPsec, what is the difference between 'Transport Mode' and 'Tunnel Mode'?",
    options: [
      "Transport mode encrypts only the IP payload (leaving original IP headers visible); Tunnel mode encrypts the entire original IP packet and wraps it in a brand new outer IP header.",
      "Transport mode runs over UDP; Tunnel mode runs over TCP.",
      "Transport mode is used strictly between gateway routers; Tunnel mode is used between browser and web server.",
      "Tunnel mode cannot support encryption."
    ],
    correct: 0,
    explanation: "In IPsec Transport Mode (host-to-host), only the upper-layer payload is encrypted/authenticated; the original IP header remains exposed. In IPsec Tunnel Mode (site-to-site VPNs), the entire original IP packet (header + payload) is encrypted and encapsulated inside a new outer IP header."
  },
  {
    id: 99,
    unit: "Unit V",
    category: "DNS Architecture",
    difficulty: "Core",
    question: "When a user types 'https://www.google.com' into a browser with an empty local cache, which DNS server hierarchy is queried first by the local recursive resolver?",
    options: [
      "The Google Authoritative DNS server",
      "The .com Top-Level Domain (TLD) DNS server",
      "One of the 13 Root DNS Server clusters (named A.ROOT-SERVERS.NET through M.ROOT-SERVERS.NET)",
      "The local router's ARP table"
    ],
    correct: 2,
    explanation: "With zero cached records, the recursive resolver starts at the top of the hierarchy by querying a DNS Root Server. The root server returns a referral to the TLD servers managing '.com', which in turn refer to the authoritative servers for 'google.com'."
  },
  {
    id: 100,
    unit: "Unit V",
    category: "HTTP Architecture",
    difficulty: "Core",
    question: "Why are HTTP GET requests required by RFC 9110 to be 'idempotent' and 'safe'?",
    options: [
      "Because GET requests are automatically encrypted by the Ethernet switch.",
      "Because executing a GET request multiple times must produce the identical side-effect on the server as executing it once, and must not alter server state.",
      "Because GET requests cannot carry query string parameters.",
      "Because GET requests bypass the TCP three-way handshake."
    ],
    correct: 1,
    explanation: "RFC 9110 defines GET and HEAD as safe (read-only; no server state changes) and idempotent (repeating the request N times produces the identical server state as executing it once), allowing web proxies and browsers to cache and pre-fetch them safely."
  },
  {
    id: 101,
    unit: "Unit V",
    category: "Network Security Attacks",
    difficulty: "Core",
    question: "What type of attack involves an attacker broadcasting unsolicited ARP responses associating the attacker's MAC address with the default gateway router's IP address?",
    options: [
      "DNS Cache Poisoning",
      "ARP Spoofing / ARP Poisoning",
      "SQL Injection",
      "Smurf ICMP Attack"
    ],
    correct: 1,
    explanation: "ARP Spoofing (ARP Poisoning) takes advantage of ARP's stateless, unauthenticated design. The attacker sends gratuitous ARP replies telling victim hosts 'I have the router's IP address', tricking hosts into routing all Internet traffic through the attacker (MitM interception)."
  },
  {
    id: 102,
    unit: "Unit V",
    category: "Symmetric vs Asymmetric",
    difficulty: "Core",
    question: "Why do secure web protocols like HTTPS (TLS 1.3) use asymmetric cryptography (RSA / ECDHE) during connection setup, but switch to symmetric cryptography (AES-GCM / ChaCha20) for actual bulk data transfer?",
    options: [
      "Symmetric cryptography is completely unhackable.",
      "Asymmetric cryptography solves key exchange without pre-shared secrets, but is 100 to 1,000 times slower computationally than hardware-accelerated symmetric encryption (AES-NI).",
      "Asymmetric keys cannot encrypt more than 100 bytes of data.",
      "Web browsers do not support symmetric encryption."
    ],
    correct: 1,
    explanation: "Asymmetric cryptography allows two endpoints to authenticate and securely establish a shared secret over an insecure channel. However, asymmetric modular math is computationally expensive. Once the shared key is established, fast symmetric encryption (AES) is used for bulk data."
  },
  {
    id: 103,
    unit: "Unit V",
    category: "HTTP Cookies & Sessions",
    difficulty: "Core",
    question: "What security flag on an HTTP cookie prevents client-side JavaScript (e.g., in a Cross-Site Scripting attack) from reading the cookie value via 'document.cookie'?",
    options: [
      "Secure flag",
      "HttpOnly flag",
      "SameSite=Strict flag",
      "Max-Age flag"
    ],
    correct: 1,
    explanation: "The 'HttpOnly' flag instructs the browser that the cookie must never be accessible via client-side scripting APIs like document.cookie. This prevents attackers from stealing session tokens during Cross-Site Scripting (XSS) attacks."
  },
  {
    id: 104,
    unit: "Unit V",
    category: "Email Security",
    difficulty: "Core",
    question: "What does the Sender Policy Framework (SPF) DNS record accomplish in electronic mail security?",
    options: [
      "It encrypts all email attachments with PGP keys.",
      "It publishes a list of authorized mail server IP addresses permitted to send emails from that domain, preventing unauthorized spammers from forging the sender domain.",
      "It guarantees delivery within 5 seconds.",
      "It automatically converts POP3 mailboxes into IMAP."
    ],
    correct: 1,
    explanation: "SPF (RFC 7208) is a DNS TXT record where a domain owner lists the IP addresses of servers authorized to send mail for that domain. Receiving MTAs check the sender IP against the SPF record; unlisted IPs fail validation, blocking forged sender headers."
  },
  {
    id: 105,
    unit: "Unit V",
    category: "Modern Protocols (DoH)",
    difficulty: "Core",
    question: "What security and privacy vulnerability of legacy DNS is solved by DNS-over-HTTPS (DoH, RFC 8484) and DNS-over-TLS (DoT, RFC 7858)?",
    options: [
      "Legacy DNS packets travel as unencrypted plaintext UDP on port 53, allowing local eavesdroppers and ISPs to monitor, censor, or hijack user browsing destinations.",
      "Legacy DNS queries cannot resolve IPv6 addresses.",
      "Legacy DNS is restricted to 256 websites.",
      "Legacy DNS crashes whenever web browsers use dark mode."
    ],
    correct: 0,
    explanation: "Traditional DNS queries are sent in plaintext UDP on port 53, visible to local Wi-Fi snoopers, ISPs, and nation-state censors. DoH encrypts DNS lookups inside standard HTTPS (port 443) traffic, protecting user privacy and preventing DNS hijacking."
  }
];

// ==========================================
// QUIZ ENGINE CONTROLLER & ASSESSMENT SUITE
// ==========================================
const QuizModule = {
  activeUnitFilter: "all",
  activeMode: "practice", // 'practice', 'exam', 'drill'
  userAnswers: {},
  markedForReview: {},
  examTimer: null,
  timeRemainingSeconds: 1800, // 30 min timed exam
  examSubmitted: false,
  activeQuestionsList: [],

  init: function() {
    QuizModule.userAnswers = {};
    QuizModule.markedForReview = {};
    QuizModule.examSubmitted = false;
    QuizModule.activeQuestionsList = QUIZ_QUESTIONS;
  },

  render: function(container) {
    if (!container) container = document.getElementById('main-content') || document.getElementById('main-content-container');
    if (!container) return;

    // Filter questions based on active unit
    let filtered = QUIZ_QUESTIONS;
    if (QuizModule.activeUnitFilter !== "all") {
      filtered = QUIZ_QUESTIONS.filter(q => q.unit === QuizModule.activeUnitFilter);
    }
    QuizModule.activeQuestionsList = filtered;

    const unitCounts = {
      all: QUIZ_QUESTIONS.length,
      "Unit I": QUIZ_QUESTIONS.filter(q => q.unit === "Unit I").length,
      "Unit II": QUIZ_QUESTIONS.filter(q => q.unit === "Unit II").length,
      "Unit III": QUIZ_QUESTIONS.filter(q => q.unit === "Unit III").length,
      "Unit IV": QUIZ_QUESTIONS.filter(q => q.unit === "Unit IV").length,
      "Unit V": QUIZ_QUESTIONS.filter(q => q.unit === "Unit V").length
    };

    const answeredCount = Object.keys(QuizModule.userAnswers).length;
    let correctCount = 0;
    Object.keys(QuizModule.userAnswers).forEach(qId => {
      const q = QUIZ_QUESTIONS.find(item => item.id === parseInt(qId));
      if (q && QuizModule.userAnswers[qId] === q.correct) {
        correctCount++;
      }
    });

    container.innerHTML = `
      <!-- Assessment Hero Banner -->
      <div class="welcome-banner" style="background: linear-gradient(135deg, #4338ca 0%, #6366f1 50%, #8b5cf6 100%); color: white; border-radius: 16px; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.3);">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div style="font-size: 0.8rem; font-weight: 800; color: #c7d2fe; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 4px;">ACADEMIC ASSESSMENT</span>
              <span>Computer Networks Examination & Self-Assessment Suite</span>
            </div>
            <h2 style="font-size: 1.85rem; font-weight: 900; margin-bottom: 0.5rem; letter-spacing: -0.02em;">
              Comprehensive Practice Exams & Question Bank
            </h2>
            <p style="font-size: 0.95rem; line-height: 1.6; color: #e0e7ff; max-width: 750px;">
              Test your technical mastery across all 5 curricular units with ${QUIZ_QUESTIONS.length} validated university and GATE-style multiple-choice questions, detailed mathematical solutions, and instant performance analysis.
            </p>
          </div>

          <!-- Dynamic Live Score Stats Card -->
          <div class="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl flex items-center gap-6 shrink-0 text-white">
            <div class="text-center">
              <div class="text-3xl font-black" id="quiz-score-val" style="color: #a5f3fc;">
                ${correctCount} / ${filtered.length}
              </div>
              <div class="text-xs text-indigo-200 font-semibold uppercase tracking-wider mt-1">Score</div>
            </div>
            <div class="h-10 w-px bg-white/20"></div>
            <div class="text-center">
              <div class="text-3xl font-black text-white" id="quiz-total-val">
                ${filtered.length}
              </div>
              <div class="text-xs text-indigo-200 font-semibold uppercase tracking-wider mt-1">Questions</div>
            </div>
          </div>
        </div>

        <!-- Mode Actions Bar -->
        <div class="mt-6 pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap gap-2 text-xs">
            <button onclick="QuizModule.startPracticeMode()" class="px-3.5 py-1.5 rounded-full font-bold transition-all ${QuizModule.activeMode === 'practice' ? 'bg-white text-indigo-900 shadow' : 'bg-white/15 text-white hover:bg-white/25'}">
              📚 Standard Practice Mode
            </button>
            <button onclick="QuizModule.startRandomDrill(15)" class="px-3.5 py-1.5 rounded-full font-bold transition-all ${QuizModule.activeMode === 'drill' ? 'bg-white text-indigo-900 shadow' : 'bg-white/15 text-white hover:bg-white/25'}">
              ⚡ 15-Question Random Drill
            </button>
            <button onclick="QuizModule.startTimedMockExam(25)" class="px-3.5 py-1.5 rounded-full font-bold transition-all ${QuizModule.activeMode === 'exam' ? 'bg-amber-400 text-amber-950 shadow' : 'bg-white/15 text-white hover:bg-white/25'}">
              ⏱️ 30-Min GATE Mock Exam (25 Qs)
            </button>
            <button onclick="QuizModule.retryMissedQuestions()" class="px-3.5 py-1.5 rounded-full font-bold bg-white/15 text-white hover:bg-white/25 transition-all">
              🔄 Retry Missed Questions
            </button>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="QuizModule.resetQuiz()" class="text-xs text-indigo-200 hover:text-white font-semibold underline">
              Reset Assessment
            </button>
          </div>
        </div>
      </div>

      <!-- Exam Timer Banner (Visible only in exam mode) -->
      <div id="exam-timer-bar" class="hidden mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 flex items-center justify-between text-amber-900 dark:text-amber-200">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-stopwatch text-xl text-amber-600 animate-pulse"></i>
          <div>
            <div class="font-bold text-sm">Timed Mock Examination in Progress</div>
            <div class="text-xs opacity-80">Answer all questions before the countdown timer expires.</div>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="font-mono text-2xl font-black text-amber-700 dark:text-amber-300" id="exam-timer-display">30:00</div>
          <button onclick="QuizModule.submitExam()" class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded shadow transition-all">
            Finish & Submit Exam
          </button>
        </div>
      </div>

      <!-- Unit Filter Pills -->
      <div class="flex flex-wrap gap-2 mb-6 pb-2 border-b border-gray-200 dark:border-gray-800">
        <button class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${QuizModule.activeUnitFilter === 'all' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'}" onclick="QuizModule.filterQuiz('all')">
          All Units (${unitCounts.all})
        </button>
        <button class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${QuizModule.activeUnitFilter === 'Unit I' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'}" onclick="QuizModule.filterQuiz('Unit I')">
          Unit I: Fundamentals (${unitCounts["Unit I"]})
        </button>
        <button class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${QuizModule.activeUnitFilter === 'Unit II' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'}" onclick="QuizModule.filterQuiz('Unit II')">
          Unit II: Data Link (${unitCounts["Unit II"]})
        </button>
        <button class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${QuizModule.activeUnitFilter === 'Unit III' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'}" onclick="QuizModule.filterQuiz('Unit III')">
          Unit III: Network & Routing (${unitCounts["Unit III"]})
        </button>
        <button class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${QuizModule.activeUnitFilter === 'Unit IV' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'}" onclick="QuizModule.filterQuiz('Unit IV')">
          Unit IV: Transport (${unitCounts["Unit IV"]})
        </button>
        <button class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${QuizModule.activeUnitFilter === 'Unit V' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'}" onclick="QuizModule.filterQuiz('Unit V')">
          Unit V: App & Security (${unitCounts["Unit V"]})
        </button>
      </div>

      <!-- Question Cards Stream Container -->
      <div class="space-y-6" id="quiz-cards-container">
        <!-- Rendered dynamically by renderQuestions() -->
      </div>
    `;

    QuizModule.renderQuestions();
  },

  filterQuiz: function(unit) {
    QuizModule.activeUnitFilter = unit;
    QuizModule.activeMode = "practice";
    if (QuizModule.examTimer) {
      clearInterval(QuizModule.examTimer);
      QuizModule.examTimer = null;
    }
    QuizModule.render();
  },

  startPracticeMode: function() {
    QuizModule.activeMode = "practice";
    if (QuizModule.examTimer) {
      clearInterval(QuizModule.examTimer);
      QuizModule.examTimer = null;
    }
    QuizModule.render();
  },

  startRandomDrill: function(count = 15) {
    QuizModule.activeMode = "drill";
    if (QuizModule.examTimer) {
      clearInterval(QuizModule.examTimer);
      QuizModule.examTimer = null;
    }
    // Pick random count questions
    let source = QUIZ_QUESTIONS;
    if (QuizModule.activeUnitFilter !== "all") {
      source = QUIZ_QUESTIONS.filter(q => q.unit === QuizModule.activeUnitFilter);
    }
    const shuffled = [...source].sort(() => 0.5 - Math.random());
    QuizModule.activeQuestionsList = shuffled.slice(0, Math.min(count, shuffled.length));
    QuizModule.renderQuestionsOnly();
  },

  startTimedMockExam: function(count = 25) {
    QuizModule.activeMode = "exam";
    QuizModule.examSubmitted = false;
    QuizModule.userAnswers = {};
    QuizModule.timeRemainingSeconds = 1800; // 30 minutes

    // Pick 25 balanced questions across units
    const u1 = QUIZ_QUESTIONS.filter(q => q.unit === "Unit I").sort(() => 0.5 - Math.random()).slice(0, 5);
    const u2 = QUIZ_QUESTIONS.filter(q => q.unit === "Unit II").sort(() => 0.5 - Math.random()).slice(0, 5);
    const u3 = QUIZ_QUESTIONS.filter(q => q.unit === "Unit III").sort(() => 0.5 - Math.random()).slice(0, 5);
    const u4 = QUIZ_QUESTIONS.filter(q => q.unit === "Unit IV").sort(() => 0.5 - Math.random()).slice(0, 5);
    const u5 = QUIZ_QUESTIONS.filter(q => q.unit === "Unit V").sort(() => 0.5 - Math.random()).slice(0, 5);
    QuizModule.activeQuestionsList = [...u1, ...u2, ...u3, ...u4, ...u5];

    QuizModule.render();

    const timerBar = document.getElementById('exam-timer-bar');
    if (timerBar) timerBar.classList.remove('hidden');

    if (QuizModule.examTimer) clearInterval(QuizModule.examTimer);
    QuizModule.examTimer = setInterval(() => {
      QuizModule.timeRemainingSeconds--;
      const display = document.getElementById('exam-timer-display');
      if (display) {
        const mins = Math.floor(QuizModule.timeRemainingSeconds / 60);
        const secs = QuizModule.timeRemainingSeconds % 60;
        display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }
      if (QuizModule.timeRemainingSeconds <= 0) {
        clearInterval(QuizModule.examTimer);
        QuizModule.examTimer = null;
        alert("Time is up! Submitting your examination answers now.");
        QuizModule.submitExam();
      }
    }, 1000);
  },

  submitExam: function() {
    if (QuizModule.examTimer) {
      clearInterval(QuizModule.examTimer);
      QuizModule.examTimer = null;
    }
    QuizModule.examSubmitted = true;
    const timerBar = document.getElementById('exam-timer-bar');
    if (timerBar) timerBar.classList.add('hidden');
    QuizModule.renderQuestionsOnly();
    QuizModule.showFinalReportModal();
  },

  retryMissedQuestions: function() {
    const missed = QUIZ_QUESTIONS.filter(q => {
      const ans = QuizModule.userAnswers[q.id];
      return ans !== undefined && ans !== q.correct;
    });

    if (missed.length === 0) {
      alert("Great job! You have no recorded incorrect answers to retry.");
      return;
    }

    // Reset user answers for missed questions
    missed.forEach(q => delete QuizModule.userAnswers[q.id]);
    QuizModule.activeQuestionsList = missed;
    QuizModule.activeMode = "drill";
    QuizModule.renderQuestionsOnly();
  },

  resetQuiz: function() {
    if (confirm("Reset all quiz answers, scores, and active timers?")) {
      QuizModule.userAnswers = {};
      QuizModule.examSubmitted = false;
      if (QuizModule.examTimer) {
        clearInterval(QuizModule.examTimer);
        QuizModule.examTimer = null;
      }
      QuizModule.render();
    }
  },

  renderQuestionsOnly: function() {
    const container = document.getElementById('quiz-cards-container');
    if (!container) return;
    const totalEl = document.getElementById('quiz-total-val');
    if (totalEl) totalEl.textContent = QuizModule.activeQuestionsList.length;
    QuizModule.renderQuestions();
  },

  renderQuestions: function() {
    const container = document.getElementById('quiz-cards-container');
    if (!container) return;

    const list = QuizModule.activeQuestionsList;
    if (list.length === 0) {
      container.innerHTML = `<div class="p-8 text-center text-gray-500 text-sm">No assessment questions match the current filter.</div>`;
      return;
    }

    let html = "";
    list.forEach((q, idx) => {
      const answered = QuizModule.userAnswers[q.id] !== undefined;
      const userChoice = QuizModule.userAnswers[q.id];
      const isCorrect = userChoice === q.correct;

      html += `
        <div class="bg-white dark:bg-gfg-darkcard rounded-xl border border-gray-200 dark:border-gfg-darkborder p-5 shadow-sm transition-all ${answered ? (isCorrect ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-rose-500') : ''}" id="q-card-${q.id}">
          <div class="flex items-center justify-between gap-2 mb-3">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold text-[11px]">
                Q${idx + 1}
              </span>
              <span class="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-semibold text-[11px]">
                ${q.unit}
              </span>
              <span class="text-[11px] text-gray-400 font-medium hidden sm:inline">
                ${q.category || ''}
              </span>
            </div>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded ${q.difficulty === 'Advanced' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'} font-bold">
              ${q.difficulty || 'Core'}
            </span>
          </div>

          <h3 class="text-sm md:text-base font-bold text-gray-900 dark:text-white leading-relaxed mb-4">
            ${q.question}
          </h3>

          <div class="space-y-2 mb-4">
      `;

      q.options.forEach((opt, optIdx) => {
        let optStateClass = "border-gray-200 dark:border-gray-700 hover:border-indigo-400 hover:bg-indigo-50/40 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200";
        let iconHtml = `<span class="w-5 h-5 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-[10px] font-bold text-gray-500 shrink-0">${String.fromCharCode(65 + optIdx)}</span>`;

        if (answered || QuizModule.examSubmitted) {
          if (optIdx === q.correct) {
            optStateClass = "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold";
            iconHtml = `<i class="fa-solid fa-circle-check text-emerald-600 dark:text-emerald-400 text-sm shrink-0"></i>`;
          } else if (optIdx === userChoice) {
            optStateClass = "bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200 font-medium";
            iconHtml = `<i class="fa-solid fa-circle-xmark text-rose-600 dark:text-rose-400 text-sm shrink-0"></i>`;
          } else {
            optStateClass = "opacity-60 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400";
          }
        }

        html += `
          <button class="w-full text-left p-3 rounded-lg border transition-all flex items-start gap-3 text-xs leading-relaxed ${optStateClass}" 
                  ${(answered || QuizModule.examSubmitted) ? 'disabled' : ''} 
                  onclick="QuizModule.selectOption(${q.id}, ${optIdx})">
            ${iconHtml}
            <span class="flex-1">${opt}</span>
          </button>
        `;
      });

      html += `
          </div>

          <!-- Technical Explanation Drawer -->
          <div class="${(answered || QuizModule.examSubmitted) ? 'block' : 'hidden'} mt-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-xs leading-relaxed" id="q-exp-${q.id}">
            <div class="flex items-center gap-1.5 font-bold mb-1 ${isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400'}">
              <i class="fa-solid fa-circle-info"></i>
              <span>${isCorrect ? 'Correct! Technical Explanation:' : 'Explanation & Syllabus Reference:'}</span>
            </div>
            <p class="text-gray-700 dark:text-gray-300 font-mono text-[11px] leading-relaxed">
              ${q.explanation}
            </p>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    QuizModule.updateScore();

    // Render KaTeX math in questions if available
    if (window.renderMathInElement) {
      renderMathInElement(container, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ],
        throwOnError: false
      });
    }
  },

  selectOption: function(qId, optIdx) {
    if (QuizModule.userAnswers[qId] !== undefined) return;
    QuizModule.userAnswers[qId] = optIdx;
    QuizModule.renderQuestions();
  },

  updateScore: function() {
    let correctCount = 0;
    const activeIds = QuizModule.activeQuestionsList.map(q => q.id);
    
    Object.keys(QuizModule.userAnswers).forEach(qId => {
      const numId = parseInt(qId);
      if (activeIds.includes(numId)) {
        const q = QUIZ_QUESTIONS.find(item => item.id === numId);
        if (q && QuizModule.userAnswers[qId] === q.correct) {
          correctCount++;
        }
      }
    });

    const scoreEl = document.getElementById('quiz-score-val');
    if (scoreEl) {
      scoreEl.innerText = `${correctCount} / ${QuizModule.activeQuestionsList.length}`;
    }
  },

  showFinalReportModal: function() {
    let correctCount = 0;
    const total = QuizModule.activeQuestionsList.length;
    const unitBreakdown = {};

    QuizModule.activeQuestionsList.forEach(q => {
      if (!unitBreakdown[q.unit]) unitBreakdown[q.unit] = { total: 0, correct: 0 };
      unitBreakdown[q.unit].total++;
      if (QuizModule.userAnswers[q.id] === q.correct) {
        correctCount++;
        unitBreakdown[q.unit].correct++;
      }
    });

    const pct = Math.round((correctCount / total) * 100);
    let grade = "Excellent (Mastery)";
    let gradeColor = "text-emerald-600";
    if (pct < 50) { grade = "Needs Review"; gradeColor = "text-rose-600"; }
    else if (pct < 75) { grade = "Good (Proficient)"; gradeColor = "text-blue-600"; }

    const modal = document.getElementById('universal-modal');
    const title = document.getElementById('modal-title');
    const icon = document.getElementById('modal-icon');
    const body = document.getElementById('modal-body');

    if (!modal) return;
    title.textContent = "Examination Performance Report";
    icon.innerHTML = '<i class="fa-solid fa-graduation-cap"></i>';

    body.innerHTML = `
      <div class="space-y-5 text-xs text-gray-800 dark:text-gray-200">
        <div class="p-6 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 text-center border border-indigo-100 dark:border-gray-700">
          <div class="text-4xl font-black ${gradeColor} mb-1">${pct}%</div>
          <div class="text-sm font-bold text-gray-900 dark:text-white">${grade}</div>
          <div class="text-xs text-gray-500 mt-1">${correctCount} of ${total} Questions Answered Correctly</div>
        </div>

        <div>
          <h4 class="font-bold text-xs uppercase text-gray-400 mb-2">Performance by Curricular Unit:</h4>
          <div class="space-y-2">
            ${Object.entries(unitBreakdown).map(([unit, data]) => {
              const uPct = Math.round((data.correct / data.total) * 100) || 0;
              return `
                <div>
                  <div class="flex justify-between text-xs font-semibold mb-1">
                    <span>${unit}</span>
                    <span class="font-mono">${data.correct} / ${data.total} (${uPct}%)</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div class="h-full bg-indigo-600 rounded-full" style="width: ${uPct}%"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
          <button onclick="closeModal()" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded shadow transition-colors text-xs">
            Review Questions
          </button>
        </div>
      </div>
    `;
    modal.classList.remove('hidden');
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUIZ_QUESTIONS, QuizModule };
}
