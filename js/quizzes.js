// Comprehensive Interactive Knowledge Check & Quiz Module for Units II, III, IV, and V

const QUIZ_QUESTIONS = [
  // UNIT II QUESTIONS
  {
    id: 1,
    unit: "Unit II",
    question: "In Go-Back-N (GBN) ARQ, what happens when packet k is lost, but packets k+1, k+2 arrive at the receiver?",
    options: [
      "The receiver buffers packets k+1 and k+2 and sends selective ACKs.",
      "The receiver discards packets k+1 and k+2 and re-ACKs the highest in-order packet.",
      "The receiver immediately crashes the TCP connection.",
      "The receiver expands its receive window dynamically to fit the gap."
    ],
    correct: 1,
    explanation: "In Go-Back-N, the receiver window size is strictly 1. The receiver cannot buffer out-of-order packets; it discards them and sends a duplicate ACK for the highest consecutively received packet."
  },
  {
    id: 2,
    unit: "Unit II",
    question: "Why is the minimum frame size of standard Ethernet (IEEE 802.3) specified as 64 bytes (512 bits)?",
    options: [
      "To allow enough space for IPv6 128-bit addresses in the payload.",
      "To ensure the transmitting host is still actively sending bits when a collision arrives from the farthest edge of the collision domain.",
      "Because the CRC-32 algorithm requires at least 512 bits of input.",
      "To prevent buffer overflows in standard 10 Mbps hubs."
    ],
    correct: 1,
    explanation: "At 10 Mbps over the maximum allowable network span, the round-trip propagation time plus repeater delays is approximately 51.2 microseconds (512 bit-times). If frames were shorter than 64 bytes, a sender might finish transmitting before detecting a collision, failing CSMA/CD."
  },
  {
    id: 3,
    unit: "Unit II",
    question: "In Hamming (7,4) code, at which bit positions are the parity check bits located?",
    options: [
      "At positions 1, 2, and 3",
      "At positions 1, 2, and 4 (powers of 2)",
      "At the last three positions: 5, 6, and 7",
      "At odd positions: 1, 3, 5, and 7"
    ],
    correct: 1,
    explanation: "In Hamming codes, parity bits are placed at bit positions that are powers of two (2^0 = 1, 2^1 = 2, 2^2 = 4, etc.) so that each bit position's binary expansion uniquely determines which parity bits monitor it."
  },
  {
    id: 101,
    unit: "Unit II",
    question: "What is the maximum theoretical channel throughput of Pure ALOHA and Slotted ALOHA, respectively?",
    options: [
      "Pure ALOHA: 50.0%, Slotted ALOHA: 100.0%",
      "Pure ALOHA: 18.4% (1/2e), Slotted ALOHA: 36.8% (1/e)",
      "Pure ALOHA: 36.8%, Slotted ALOHA: 18.4%",
      "Pure ALOHA: 10.0%, Slotted ALOHA: 90.0%"
    ],
    correct: 1,
    explanation: "According to Tanenbaum (Ch. 4) and Forouzan (Ch. 12), Pure ALOHA throughput is S = G e^(-2G) with a maximum of 1/(2e) ≈ 18.4% at G = 0.5. Slotted ALOHA throughput is S = G e^(-G) with a maximum of 1/e ≈ 36.8% at G = 1.0."
  },
  {
    id: 102,
    unit: "Unit II",
    question: "In CSMA protocols, what does a '1-persistent' station do when it senses that the shared channel is currently busy?",
    options: [
      "It aborts immediately and generates a fatal protocol exception.",
      "It waits a random backoff time before sensing again.",
      "It continues sensing continuously until the channel becomes idle, and then transmits immediately with probability 1.",
      "It transmits immediately anyway, ignoring the carrier sense signal."
    ],
    correct: 2,
    explanation: "In 1-persistent CSMA, the station greedily monitors the medium. As soon as the channel becomes idle, it transmits immediately (probability = 1). If two stations were waiting for the channel to become idle, both transmit immediately and collide."
  },
  {
    id: 103,
    unit: "Unit II",
    question: "How does the MACA / IEEE 802.11 RTS/CTS handshake resolve the Hidden Terminal problem in Wireless LANs?",
    options: [
      "By increasing transmission power to cover all possible hidden stations.",
      "The receiver replies with a CTS frame, informing all stations within the receiver's range (including hidden senders) to defer transmission using NAV.",
      "By using wired Ethernet coaxial cables instead of radio frequencies.",
      "By switching automatically to TDMA fixed frequency channels."
    ],
    correct: 1,
    explanation: "Because a hidden terminal cannot hear the sender's RTS, it DOES hear the receiver's CTS frame. The CTS contains a duration value, allowing all stations in hearing range of the receiver to set their Network Allocation Vector (NAV) and refrain from transmitting."
  },
  {
    id: 104,
    unit: "Unit II",
    question: "When a transparent learning bridge receives a frame with an unknown destination MAC address, what action does it take?",
    options: [
      "It immediately drops the frame and sends an ICMP Host Unreachable error.",
      "It floods (broadcasts) the frame out of all ports except the port on which it was received.",
      "It stores the frame permanently until a human administrator configures the route.",
      "It returns the frame back to the sender as a collision warning."
    ],
    correct: 1,
    explanation: "In transparent bridge backward learning (Tanenbaum Ch. 4.7), if a destination MAC is not found in the bridge table, the bridge floods the frame to all ports except the arrival port. Once the destination responds, the bridge learns which port that MAC resides on."
  },
  {
    id: 105,
    unit: "Unit II",
    question: "Which networking device separates BOTH collision domains AND broadcast domains?",
    options: [
      "Repeater (Layer 1)",
      "Hub (Layer 1)",
      "Switch / Transparent Bridge (Layer 2)",
      "Router (Layer 3)"
    ],
    correct: 3,
    explanation: "Switches and bridges separate collision domains on each port, but maintain a single shared broadcast domain across all ports (unless partitioned by VLANs). Only Routers (Layer 3) separate both collision domains AND broadcast domains across subnets."
  },

  // UNIT III QUESTIONS
  {
    id: 4,
    unit: "Unit III",
    question: "Which of the following correctly describes the fundamental difference between the Network Layer Data Plane and Control Plane?",
    options: [
      "Data plane executes routing algorithms (OSPF/BGP); Control plane forwards individual packets in hardware.",
      "Data plane operates locally in nanoseconds to forward packets; Control plane computes network-wide paths in software.",
      "Data plane operates over inter-AS networks; Control plane operates only within a local LAN.",
      "Data plane uses TCP port 80; Control plane uses UDP port 53."
    ],
    correct: 1,
    explanation: "The data plane performs local, per-router packet forwarding at line-rate in nanoseconds (hardware TCAM lookup). The control plane computes the end-to-end paths and installs forwarding tables using routing algorithms or SDN controllers."
  },
  {
    id: 5,
    unit: "Unit III",
    question: "Why did the IPv6 designers completely remove the Header Checksum field found in IPv4?",
    options: [
      "Because IPv6 packets are never subjected to electrical noise or bit errors.",
      "To speed up router packet forwarding latency, since link-layer (Ethernet CRC) and transport-layer (TCP/UDP checksums) already provide error checking.",
      "Because 128-bit addresses are self-healing using Reed-Solomon codes.",
      "Because IPv6 does not allow routers to decrement Hop Limit."
    ],
    correct: 1,
    explanation: "In IPv4, the checksum must be recomputed at every router because the TTL decrements at each hop. By omitting the header checksum in IPv6, intermediate routers forward packets substantially faster, relying on L2 (Ethernet CRC) and L4 (TCP/UDP) checksums."
  },
  {
    id: 6,
    unit: "Unit III",
    question: "In Distance-Vector routing, what mechanism prevents two adjacent routers from creating a routing loop by bouncing outdated distance metrics back and forth?",
    options: [
      "Spanning Tree Protocol (STP)",
      "Poisoned Reverse (advertising infinity back to the next-hop neighbor)",
      "Dijkstra shortest path recomputation",
      "BGP AS-PATH attribute injection"
    ],
    correct: 1,
    explanation: "Under Poisoned Reverse, if router Z routes to destination X through neighbor Y, Z advertises to Y that its distance to X is infinity (Dz(X) = ∞). This prevents Y from attempting to route to X through Z."
  },

  // UNIT IV QUESTIONS
  {
    id: 7,
    unit: "Unit IV",
    question: "During the TCP 3-Way Handshake, if the Client sends SYN with seq = 500, what will be the ACK number in the Server's SYN+ACK response?",
    options: [
      "ack = 500",
      "ack = 501",
      "ack = 0",
      "ack = 1000"
    ],
    correct: 1,
    explanation: "The SYN flag consumes exactly 1 sequence number in the TCP byte stream. Therefore, the server acknowledges the SYN by acknowledging the next expected byte: ack = 500 + 1 = 501."
  },
  {
    id: 8,
    unit: "Unit IV",
    question: "How does TCP Reno react when it detects packet loss via 3 Duplicate ACKs, compared to a physical Timeout?",
    options: [
      "Both 3 Dup ACKs and Timeout reset cwnd to 1 MSS.",
      "3 Dup ACKs cuts cwnd in half (Fast Recovery); Timeout resets cwnd to 1 MSS.",
      "3 Dup ACKs ignores the loss; Timeout quadruples the retransmission timer.",
      "3 Dup ACKs increases cwnd exponentially."
    ],
    correct: 1,
    explanation: "TCP Reno implements Fast Recovery: arrival of 3 duplicate ACKs indicates that although one segment was lost, other segments are still reaching the receiver. Thus, cwnd is halved (ssthresh = cwnd/2, cwnd = ssthresh) and linear AIMD continues. A full timeout indicates severe congestion and resets cwnd = 1 MSS."
  },
  {
    id: 9,
    unit: "Unit IV",
    question: "What is the total fixed header size of a UDP datagram?",
    options: [
      "20 bytes",
      "40 bytes",
      "8 bytes (64 bits)",
      "Variable between 20 and 60 bytes"
    ],
    correct: 2,
    explanation: "A UDP header contains exactly four 16-bit fields: Source Port, Destination Port, Length, and Checksum, totaling exactly 8 bytes."
  },

  // UNIT V QUESTIONS
  {
    id: 10,
    unit: "Unit V",
    question: "In the Domain Name System (DNS), which resource record type maps a domain name to the canonical hostname of a Mail Server?",
    options: [
      "Type A Record",
      "Type CNAME Record",
      "Type MX Record",
      "Type NS Record"
    ],
    correct: 2,
    explanation: "The MX (Mail Exchange) record specifies the mail server responsible for accepting email messages on behalf of a domain name."
  },
  {
    id: 11,
    unit: "Unit V",
    question: "Why is textbook (unpadded) RSA cryptographic encryption considered insecure for real-world production deployment?",
    options: [
      "Because prime numbers larger than 100 do not exist.",
      "Because it is deterministic and exhibits the multiplicative homomorphic property, allowing attackers to forge ciphertexts or decrypt small messages.",
      "Because public keys must be kept confidential.",
      "Because Euler's totient theorem only works in base 10."
    ],
    correct: 1,
    explanation: "Textbook RSA is deterministic (same plaintext produces same ciphertext) and has the multiplicative property E(m1) * E(m2) = E(m1 * m2). Modern standards like RFC 8017 mandate randomized padding such as RSAES-OAEP to resist chosen-ciphertext attacks."
  },
  {
    id: 12,
    unit: "Unit V",
    question: "According to NIST SP 800-41 and SP 800-94, what is the crucial operational difference between an Intrusion Detection System (IDS) and an Intrusion Prevention System (IPS)?",
    options: [
      "An IDS is deployed inline and drops malicious packets; an IPS sits out-of-band and only generates logs.",
      "An IDS passively monitors and alerts on suspicious traffic; an IPS sits inline in the physical packet path and actively blocks or drops malicious traffic.",
      "An IDS only inspects IPv6; an IPS only inspects IPv4.",
      "An IDS runs on routers; an IPS only runs on client smartphones."
    ],
    correct: 1,
    explanation: "An IDS is passive (out-of-band, receives copies of traffic via SPAN/TAP) and detects/reports threats without stopping packets. An IPS is inline (in the live data path) and actively prevents intrusions by dropping packets or terminating TCP connections."
  }
];

const QuizModule = {
  activeUnitFilter: "all",
  userAnswers: {},

  render: function(container) {
    container.innerHTML = `
      <div class="unit-hero" style="--unit-accent: linear-gradient(90deg, #f43f5e, #a855f7);">
        <div class="hero-meta">
          <span class="badge-unit" style="background: rgba(244, 63, 94, 0.2); color: #fb7185; border: 1px solid rgba(244, 63, 94, 0.4);">
            Self-Assessment & Exam Preparation
          </span>
          <h2 class="unit-title">Interactive Knowledge Check & Practice Exams</h2>
          <p class="unit-desc">
            Test your mastery across Units II, III, IV, and V with instant automated grading, detailed technical explanations, and curriculum references.
          </p>
        </div>
        <div class="hero-stats">
          <div class="stat-box">
            <div class="stat-val" id="quiz-score-val" style="color: #fb7185;">0 / 12</div>
            <div class="stat-label">Score</div>
          </div>
          <div class="stat-box">
            <div class="stat-val" style="color: #38bdf8;">12</div>
            <div class="stat-label">Questions</div>
          </div>
        </div>
      </div>

      <!-- Filter pills -->
      <div class="subnav-bar">
        <button class="subnav-pill ${QuizModule.activeUnitFilter === 'all' ? 'active' : ''}" onclick="QuizModule.filterQuiz('all')">All Units (12)</button>
        <button class="subnav-pill ${QuizModule.activeUnitFilter === 'Unit II' ? 'active' : ''}" onclick="QuizModule.filterQuiz('Unit II')">Unit II: Data Link (3)</button>
        <button class="subnav-pill ${QuizModule.activeUnitFilter === 'Unit III' ? 'active' : ''}" onclick="QuizModule.filterQuiz('Unit III')">Unit III: Network & Routing (3)</button>
        <button class="subnav-pill ${QuizModule.activeUnitFilter === 'Unit IV' ? 'active' : ''}" onclick="QuizModule.filterQuiz('Unit IV')">Unit IV: Transport Layer (3)</button>
        <button class="subnav-pill ${QuizModule.activeUnitFilter === 'Unit V' ? 'active' : ''}" onclick="QuizModule.filterQuiz('Unit V')">Unit V: App & Security (3)</button>
      </div>

      <div class="quiz-container" id="quiz-cards-container">
        <!-- Rendered dynamically -->
      </div>
    `;

    QuizModule.renderQuestions();
  },

  filterQuiz: function(unit) {
    QuizModule.activeUnitFilter = unit;
    QuizModule.render(document.getElementById('main-content-container'));
  },

  renderQuestions: function() {
    const container = document.getElementById('quiz-cards-container');
    if (!container) return;

    const filtered = QUIZ_QUESTIONS.filter(q => {
      return QuizModule.activeUnitFilter === 'all' || q.unit === QuizModule.activeUnitFilter;
    });

    let html = "";
    filtered.forEach((q, idx) => {
      const answered = QuizModule.userAnswers[q.id] !== undefined;
      const userChoice = QuizModule.userAnswers[q.id];

      html += `
        <div class="quiz-card" id="q-card-${q.id}">
          <div class="quiz-q-num">Question ${idx + 1} • <span style="color: #38bdf8;">${q.unit}</span></div>
          <div class="quiz-question-text">${q.question}</div>
          <div class="quiz-options">
      `;

      q.options.forEach((opt, optIdx) => {
        let optClass = "";
        if (answered) {
          if (optIdx === q.correct) optClass = "correct";
          else if (optIdx === userChoice) optClass = "incorrect";
        }

        html += `
          <button class="quiz-opt-btn ${optClass}" 
                  ${answered ? 'disabled' : ''} 
                  onclick="QuizModule.selectOption(${q.id}, ${optIdx})">
            <span style="font-weight: 700; color: #64748b;">${String.fromCharCode(65 + optIdx)}.</span>
            <span>${opt}</span>
          </button>
        `;
      });

      html += `
          </div>
          <div class="quiz-explanation ${answered ? 'show' : ''}" id="q-exp-${q.id}">
            <strong style="color: #38bdf8;">Explanation:</strong> ${q.explanation}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    QuizModule.updateScore();
  },

  selectOption: function(qId, optIdx) {
    QuizModule.userAnswers[qId] = optIdx;
    QuizModule.renderQuestions();
  },

  updateScore: function() {
    let correctCount = 0;
    Object.keys(QuizModule.userAnswers).forEach(qId => {
      const q = QUIZ_QUESTIONS.find(item => item.id === parseInt(qId));
      if (q && QuizModule.userAnswers[qId] === q.correct) {
        correctCount++;
      }
    });

    const scoreEl = document.getElementById('quiz-score-val');
    if (scoreEl) {
      scoreEl.innerText = `${correctCount} / ${QUIZ_QUESTIONS.length}`;
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUIZ_QUESTIONS, QuizModule };
}
