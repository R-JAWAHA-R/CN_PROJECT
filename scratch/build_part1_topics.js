// Builder for Part 1 Data Link Layer Fundamentals: 15 Missing Topics
// Strictly aligned with Behrouz A. Forouzan Ch. 10 (Error Detection and Correction)

const part1Topics = {
  "u2-intro-error-detection": {
    id: "u2-intro-error-detection",
    title: "Introduction to Error Detection",
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: "Core",
    category: "datalink",
    difficulty: "Core",
    readingTime: "15 min",
    standard: "Forouzan Ch. 10.1 / Tanenbaum Ch. 3.2",
    oneLiner: "The process of verifying whether transmitted data bits were corrupted by noise, attenuation, or interference during transmission.",
    quickAnswer: "Error detection is a fundamental Data Link Layer mechanism designed to ascertain whether incoming frames contain bit errors. It employs mathematical redundancy functions at the sender to append check bits, enabling the receiver to perform verification and make an unambiguous binary decision (Accept or Drop).",
    whyItMatters: "Physical communication media (copper cables, fiber optics, and wireless radio paths) are inherently imperfect and prone to electromagnetic noise, thermal interference, and signal attenuation. Without error detection, corrupt packets would corrupt application memory, crash network services, or produce silent data loss.",
    prerequisitesList: [
      { concept: "Data Link Layer Framing", meaning: "Packaging network-layer datagrams into discrete frames with headers and trailers." },
      { concept: "Binary Signals & Transmission", meaning: "Representation of information as sequences of high and low voltage or optical pulses." }
    ],
    learningObjectives: [
      "Distinguish between single-bit errors and burst errors according to Forouzan's classification.",
      "Understand why error detection requires only a simple binary decision (Yes/No) without bit localization.",
      "Analyze the role of transmission noise, thermal noise, and crosstalk in generating bit errors."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "IEEE 802.3 / IEEE 802.11 / ISO 3309",
      type: "Error Control Mechanism",
      prerequisites: ["framing", "u2-error-control"],
      relatedConcepts: ["u2-intro-error-correction", "u2-redundancy-error-control", "u2-hamming-distance"],
      compareWith: ["u2-detection-vs-correction"],
      primaryUses: ["Detecting transmission noise", "Frame validation in Ethernet & Wi-Fi", "Drop decision trigger for ARQ"]
    },
    imageUrl: "assets/images/unit2/topic1/error-detection-concept.svg",
    imageCaption: "Figure 10.1: Generalized Error Detection Architecture (Sender Generator to Receiver Checker).",
    sections: {
      overview: `
        <p>In data communications, transmission media are subject to electrical interference, magnetic induction, lightning strikes, thermal noise, and signal attenuation. These physical imperfections alter the shape and phase of transmitted signals, causing the receiver to misinterpret a binary <strong>0 as a 1</strong> or a <strong>1 as a 0</strong>.</p>
        <p><strong>Error Detection</strong> is the systematic process of discovering whether any bits in a transmitted frame have been corrupted during transit. As formulated by <em>Behrouz A. Forouzan (Chapter 10.1)</em>, the fundamental objective of error detection is answering a simple binary question: <em>"Has an error occurred?"</em> The receiver is not tasked with locating which specific bits were inverted; it merely validates frame integrity to decide whether to accept the frame or discard it.</p>
        <div class="wiki-callout tip">
          <div class="callout-header"><i class="fa-solid fa-lightbulb text-amber-500 mr-1"></i> Key Insight from Forouzan</div>
          <p class="text-xs">In error detection, we are looking only to see if any error has occurred. The answer is a simple yes or no. We are not even interested in the number of errors. A single-bit error is treated with the same severity as a 1,000-bit burst error: both invalidate the frame.</p>
        </div>
      `,
      eli10: "Imagine mailing a sealed letter. Before mailing, you write a secret security number on the back of the envelope calculated from the words inside. When your friend receives the letter, they recalculate that number. If the numbers don't match, they immediately know someone tampered with or smudged the letter, so they throw it away and ask you to send it again!",
      analogy: "A tamper-evident seal on a medication bottle. The broken seal does not tell you exactly how many milligrams of medicine leaked out or which chemical molecule degraded; it simply gives you an undeniable visual proof that the contents are compromised, warning you not to consume them.",
      howItWorks: `
        <ol class="list-decimal pl-5 space-y-2 text-xs">
          <li><strong>Dataword Segmentation:</strong> The sender takes a block of $k$ data bits from the network layer datagram.</li>
          <li><strong>Generator Processing:</strong> The $k$ data bits pass through an encoder/generator function $G$, which calculates $r$ redundant check bits.</li>
          <li><strong>Codeword Assembly:</strong> The sender combines the $k$ data bits and $r$ redundant bits into an $n$-bit codeword ($n = k + r$) and transmits it over the physical medium.</li>
          <li><strong>Channel Propagation:</strong> The transmitted bits pass through a noisy channel where thermal noise or impulse bursts may flip one or more bits.</li>
          <li><strong>Receiver Checking:</strong> The receiver feeds the received $n$ bits into a verification checker algorithm.</li>
          <li><strong>Decision:</strong> If the checker yields a zero syndrome / valid code, the frame is accepted and data is passed up; otherwise, the frame is discarded and an error flag or NAK is triggered.</li>
        </ol>
      `,
      diagram: `
+---------------------------------------------------------------------------------+
|                       ERROR DETECTION ARCHITECTURE (FOROUZAN CH. 10)            |
+---------------------------------------------------------------------------------+
|                                                                                 |
|   +-----------------------+                         +-----------------------+   |
|   |      SENDER NODE      |                         |     RECEIVER NODE     |   |
|   |  Dataword (k bits)    |                         |   Received (n bits)   |   |
|   |           |           |                         |           |           |   |
|   |           v           |                         |           v           |   |
|   |  +-----------------+  |      Noisy Medium       |  +-----------------+  |   |
|   |  | Generator Func  |  |  [Thermal/Impulse Noise]|  | Verification    |  |   |
|   |  +-----------------+  |  ~~~~~> Bit Flips ~~~~~>|  | Checker Logic   |  |   |
|   |           |           |                         |  +-----------------+  |   |
|   |           v           |                         |      |         |      |   |
|   |  Codeword (n bits)    |                         |  Valid?     Invalid?  |   |
|   |  [Data (k) | Check(r)]|                         |    |           |      |   |
|   +-----------+-----------+                         |    v           v      |   |
|               |                                     | [Deliver]   [Discard] |   |
|               +------------------------------------>+                       |   |
+---------------------------------------------------------------------------------+
      `,
      technicalDetails: `
        <p><strong>Types of Errors (Forouzan Section 10.1):</strong></p>
        <table class="wiki-table">
          <thead><tr><th>Error Category</th><th>Formal Definition</th><th>Typical Physical Cause</th><th>Example Impact</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Single-Bit Error</strong></td>
              <td>Only 1 single bit in a given data unit is corrupted from 0 to 1 or 1 to 0.</td>
              <td>White noise, thermal noise fluctuations in copper circuits.</td>
              <td><code>00000010</code> becomes <code>00001010</code>. Rare in serial high-speed links.</td>
            </tr>
            <tr>
              <td><strong>Burst Error</strong></td>
              <td>2 or more bits in the data unit have changed from 1 to 0 or from 0 to 1.</td>
              <td>Impulse noise, lightning strikes, electrostatic discharge, power line spikes.</td>
              <td>Noise pulse of $1/100$ s on a 1 Mbps line corrupts up to $10,000$ consecutive bits!</td>
            </tr>
          </tbody>
        </table>
        <p><strong>Burst Error Span:</strong> According to Forouzan, the length of a burst error is measured from the <em>first corrupted bit to the last corrupted bit</em>, even if some bits between them are not corrupted.</p>
      `,
      workedExamples: {
        level1: "<strong>Question:</strong> If a noise burst lasts for 1 millisecond ($10^{-3}$ s) on a 10 Mbps Ethernet link, how many bits can be affected?<br><br><strong>Calculation:</strong><br>Bits affected = Data Rate × Duration<br>Bits affected = $(10 \\times 10^6 \\text{ bps}) \\times 0.001 \\text{ s} = 10,000 \\text{ bits}$.<br><br><strong>Conclusion:</strong> A fleeting 1 ms glitch corrupts 10,000 bits. Hence, burst errors dominate high-speed communications.",
        level2: "<strong>Problem:</strong> A sender transmits dataword <code>1011</code>. The parity generator produces an even parity bit. What is the codeword? If bit 2 flips during transit, show how the receiver detects the error.<br><br><strong>Solution:</strong><br>1. Count of 1s in <code>1011</code> is 3 (odd).<br>2. For even parity, parity bit $P = 1$. Codeword = <code>10111</code>.<br>3. Receiver receives <code>10011</code> (bit 2 flipped from 1 to 0).<br>4. Count of 1s at receiver = 3 (odd).<br>5. Parity check fails. Receiver declares an error and discards the frame.",
        level3: "<strong>Edge Case Analysis:</strong> What happens if two bits flip simultaneously (e.g. <code>10111</code> becomes <code>11011</code>)?<br><br><strong>Analysis:</strong> Count of 1s in <code>11011</code> is 4 (even). The single parity check evaluates as valid! This proves that a single parity bit has a minimum Hamming distance $d_{\\min} = 2$, which can only detect all 1-bit errors, but fails completely on 2-bit (even) errors."
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages of Error Detection</th><th>Limitations & Challenges</th></tr></thead>
          <tbody>
            <tr><td>Extremely low computational overhead and minimal latency.</td><td>Cannot fix errors locally; requires retransmission (ARQ).</td></tr>
            <tr><td>Requires very few redundant bits (e.g., 32 bits for a 1500-byte Ethernet frame).</td><td>Cannot be used in simplex links where reverse feedback is unavailable.</td></tr>
            <tr><td>Simplifies receiver hardware (straightforward XOR logic in silicon).</td><td>Retransmission latency is intolerable on high-delay satellite links.</td></tr>
          </tbody>
        </table>
      `,
      whereUsed: [
        "Ethernet (IEEE 802.3) Frame Check Sequence (FCS) using CRC-32",
        "Wi-Fi (IEEE 802.11) MAC frame validation and duplicate filtering",
        "Internet Protocol (IPv4) header checksum verification in edge routers",
        "Point-to-Point Protocol (PPP) frame validation over serial links"
      ],
      quiz: [
        {
          question: "According to Forouzan, what is the primary difference between single-bit and burst errors?",
          options: [
            "Single-bit errors affect only 1 bit; burst errors affect 2 or more bits measured from first to last corrupted bit.",
            "Single-bit errors occur only in fiber; burst errors occur only in copper.",
            "Burst errors can always be corrected without retransmission.",
            "Single-bit errors are caused exclusively by lightning strikes."
          ],
          correct: 0,
          explanation: "In a single-bit error, only one bit in the data unit is altered. In a burst error, two or more bits are altered, with the burst length measured from the first corrupted bit to the last corrupted bit."
        },
        {
          question: "Why does the Data Link Layer prefer error detection over error correction in wired LANs?",
          options: [
            "Wired LANs have low error rates, making detection plus retransmission vastly more bandwidth-efficient than heavy FEC redundancy.",
            "Error correction is mathematically impossible in local networks.",
            "Bridges cannot understand error correction codes.",
            "Ethernet cables cannot carry redundant bits."
          ],
          correct: 0,
          explanation: "In wired LANs, the bit error rate is very low (~1 in 10^9). Adding heavy redundant bits for forward error correction would waste bandwidth on every frame; detecting errors and retransmitting the rare bad frame is optimal."
        },
        {
          question: "What is the answer that an error-detecting mechanism seeks to find?",
          options: [
            "A binary Yes/No answer indicating whether any error occurred.",
            "The exact memory address of the corrupted transistor.",
            "The name of the user whose computer caused the collision.",
            "The exact original mathematical dataword."
          ],
          correct: 0,
          explanation: "In error detection, the receiver only needs to know whether the received codeword is valid or invalid (a simple binary decision)."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, McGraw-Hill, Chapter 10.1 'Types of Errors & Redundancy', pp. 303–307.", url: "" },
        { cite: "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, Pearson, Chapter 3.2 'Error-Detecting Codes'.", url: "" }
      ]
    }
  },

  "u2-intro-error-correction": {
    id: "u2-intro-error-correction",
    title: "Introduction to Error Correction",
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: "Intermediate",
    category: "datalink",
    difficulty: "Intermediate",
    readingTime: "15 min",
    standard: "Forouzan Ch. 10.1 / Tanenbaum Ch. 3.2",
    oneLiner: "The process of detecting transmission errors and reconstructing the exact original data bits without requesting retransmission.",
    quickAnswer: "Error correction (Forward Error Correction or FEC) is a technique whereby the receiver detects errors and reconstructs the pristine transmitted message using redundant check bits embedded in the codeword. Unlike error detection, error correction must determine both the presence of errors and their exact bit locations.",
    whyItMatters: "In long-delay communication environments (such as satellite links or deep-space probes) or simplex one-way channels, retransmission via ARQ introduces unacceptable latency or is physically impossible. Error correction enables error recovery on the spot without reverse communication.",
    prerequisitesList: [
      { concept: "Introduction to Error Detection", meaning: "Understanding bit corruption and frame validation." },
      { concept: "Redundancy Concepts", meaning: "Appending redundant bits to distinguish valid and invalid codewords." }
    ],
    learningObjectives: [
      "Understand the two fundamental methods of error correction: Forward Error Correction (FEC) and Retransmission (ARQ).",
      "Analyze why error correction requires substantially more redundant bits than error detection.",
      "Explore real-world situations where FEC is non-negotiable (satellite links, deep-space probes, ECC RAM)."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "IEEE 802.16 (WiMAX) / DVB-S2 / NASA Deep Space Standards",
      type: "Forward Error Correction (FEC)",
      prerequisites: ["u2-intro-error-detection", "u2-redundancy-error-control"],
      relatedConcepts: ["u2-hamming-code-calculation", "u2-hamming-distance"],
      compareWith: ["u2-detection-vs-correction"],
      primaryUses: ["Satellite communications", "Wireless cellular links (4G/5G)", "ECC server memory & SSD flash storage"]
    },
    imageUrl: "assets/images/unit2/topic1/error-correction-fec.svg",
    imageCaption: "Figure 10.2: Forward Error Correction (FEC) Pipeline with Syndrome Locator.",
    sections: {
      overview: `
        <p>As established by <em>Behrouz A. Forouzan (Chapter 10.1)</em>, <strong>error correction is much more difficult than error detection</strong>. In error detection, the receiver needs to know only that the received codeword is invalid; in error correction, the receiver needs to find (or guess) the exact original codeword that was transmitted.</p>
        <p>There are two primary paradigms for achieving error correction in computer networks:</p>
        <ul>
          <li><strong>Forward Error Correction (FEC):</strong> The sender appends sufficient redundant check bits so that the receiver can independently compute the syndrome, locate the altered bits, and invert them back to their original values without asking the sender for a retransmission.</li>
          <li><strong>Error Correction by Retransmission (ARQ):</strong> The receiver merely detects the error and requests that the sender retransmit the corrupted frame via Automatic Repeat Request protocols.</li>
        </ul>
      `,
      eli10: "If someone speaks to you on a noisy phone and says 'I want to eat an a#ple', you don't need them to repeat the sentence. You know English words, so your brain immediately corrects '#ple' to 'apple'! Forward Error Correction does the same thing with math: it figures out what the scrambled bits were supposed to be.",
      analogy: "Reading a book with a missing letter in a word: 'Th_ dog barked.' You don't need to return the book to the printing press; your context allows you to correct the missing 'e' instantly. However, if multiple words are missing ('Th_ ___ ______'), guessing becomes impossible without re-reading.",
      howItWorks: `
        <ol class="list-decimal pl-5 space-y-2 text-xs">
          <li><strong>Redundancy Encoding:</strong> The sender maps each $k$-bit dataword into an $n$-bit codeword ($n > k$) where the $r = n - k$ check bits encode parity equations over overlapping subsets of data bits.</li>
          <li><strong>Transmission:</strong> The codeword travels across the channel and suffers bit corruption.</li>
          <li><strong>Syndrome Vector Calculation:</strong> The receiver evaluates parity-check matrices or division polynomials on the received vector $r$ to produce a <em>syndrome</em> $S$.</li>
          <li><strong>Error Location Determination:</strong> If $S = 0$, the frame is clean. If $S \ne 0$, the syndrome points directly to the index of the erroneous bit.</li>
          <li><strong>Bit Inversion & Delivery:</strong> The receiver flips the erroneous bit ($0 \to 1$ or $1 \to 0$), strips the $r$ redundant bits, and delivers the restored $k$-bit dataword to the network layer.</li>
        </ol>
      `,
      diagram: `
+---------------------------------------------------------------------------------+
|                       FORWARD ERROR CORRECTION (FEC) DECODING FLOW              |
+---------------------------------------------------------------------------------+
|                                                                                 |
|   Received Vector r = [ r1 r2 r3 r4 r5 r6 r7 ]                                  |
|            |                                                                    |
|            v                                                                    |
|   +---------------------------------------+                                     |
|   |   Parity Check Matrix / Syndrome S    |                                     |
|   |       S = r * H^T  (Modulo-2)         |                                     |
|   +---------------------------------------+                                     |
|            |                                                                    |
|            +-----------------------+                                            |
|            |                       |                                            |
|        [ S == 0 ]             [ S != 0 ]                                        |
|            |                       |                                            |
|            v                       v                                            |
|    Codeword Valid!       Locate Error Position k = decimal(S)                   |
|    No errors present               |                                            |
|                                    v                                            |
|                          Invert Bit: r[k] = r[k] XOR 1                          |
|                                    |                                            |
|                                    v                                            |
|                          Extract Clean Dataword (k bits)                        |
|                                                                                 |
+---------------------------------------------------------------------------------+
      `,
      technicalDetails: `
        <p><strong>Theoretical Complexity (Forouzan Section 10.1):</strong></p>
        <p>Why is error correction so much more complex? Consider transmitting a 1,000-bit packet:</p>
        <ul>
          <li>To <em>detect</em> an error, the receiver checks whether the received vector belongs to the valid codeword set (1 single condition).</li>
          <li>To <em>correct a single error</em>, there are $1,000$ distinct single-bit error possibilities plus $1$ zero-error possibility = $1,001$ states. The syndrome must generate at least 1,001 unique values, requiring at least $r$ bits where $2^r \ge 1001 \implies r \ge 10$ bits.</li>
          <li>To <em>correct 2 burst errors</em>, there are $\binom{1000}{2} = 499,500$ error combinations! The redundant bits and computational hardware scale exponentially with the number of correctable errors.</li>
        </ul>
      `,
      workedExamples: {
        level1: "<strong>Question:</strong> Name two operational environments where Forward Error Correction (FEC) is vastly superior to Retransmission (ARQ).<br><br><strong>Answer:</strong><br>1. <strong>Satellite and Deep Space Links:</strong> Propagation delay to Mars is 4 to 24 minutes. Waiting for an ARQ retransmission would take 48 minutes per lost frame.<br>2. <strong>One-Way (Simplex) Broadcasts:</strong> Digital TV (DVB-T) and satellite broadcasts have millions of receivers and no physical return channel to send ACKs/NAKs.",
        level2: "<strong>Problem:</strong> A system uses a single-error correcting code for 4-bit datawords ($k = 4$). Calculate the minimum number of redundant bits $r$ required.<br><br><strong>Solution:</strong><br>Using Hamming's inequality: $2^r \ge m + r + 1$<br>For $m = 4$:<br>Try $r = 1$: $2^1 = 2 < 4 + 1 + 1 = 6$ (False)<br>Try $r = 2$: $2^2 = 4 < 4 + 2 + 1 = 7$ (False)<br>Try $r = 3$: $2^3 = 8 \\ge 4 + 3 + 1 = 8$ (True!)<br>Therefore, minimum $r = 3$ bits, producing a $(7,4)$ code.",
        level3: "<strong>Deep Analysis:</strong> Explain why adding a single parity bit cannot correct single-bit errors.<br><br><strong>Analysis:</strong> A single parity bit ($r = 1$) only yields 2 syndrome states: 0 (Even) or 1 (Odd). An odd state announces that an error occurred, but cannot distinguish whether bit 1, bit 2, bit 3, ... or bit $n$ failed. Because there are $n$ possible failure locations but only 1 error syndrome state, single parity lacks localization power."
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages of FEC</th><th>Disadvantages of FEC</th></tr></thead>
          <tbody>
            <tr><td>Zero retransmission delay; deterministic delivery time.</td><td>High bit overhead; redundant bits consume substantial channel bandwidth.</td></tr>
            <tr><td>Works seamlessly over unidirectional (simplex) channels.</td><td>High decoder hardware complexity and energy consumption.</td></tr>
            <tr><td>Prevents network congestion caused by repeated retransmissions.</td><td>If errors exceed correction threshold $t$, FEC produces erroneous data.</td></tr>
          </tbody>
        </table>
      `,
      whereUsed: [
        "Deep-space communications (NASA Voyager and Mars Rovers using Reed-Solomon/LDPC codes)",
        "DVB-S2 Satellite TV broadcasting where no return path exists",
        "Cellular 4G LTE and 5G NR physical layer transmission (Turbo and Polar codes)",
        "Server ECC DDR4/DDR5 RAM and PCIe 5.0/6.0 high-speed buses"
      ],
      quiz: [
        {
          question: "Why is Forward Error Correction indispensable in deep-space communications?",
          options: [
            "The immense round-trip propagation delay makes retransmission via ARQ completely impractical.",
            "Radio signals cannot travel through space without parity bits.",
            "Deep-space transmitters do not have memory buffers.",
            "Satellites are not allowed to send negative acknowledgments."
          ],
          correct: 0,
          explanation: "Because signals take minutes or hours to travel across deep space, waiting for an ARQ retransmission would stall communications; errors must be corrected on arrival."
        },
        {
          question: "What mathematical inequality dictates the minimum number of parity bits r required to correct a single-bit error in an m-bit dataword?",
          options: [
            "2^r >= m + r + 1",
            "2^m >= r + 1",
            "r = 2m + 1",
            "r >= log2(m)"
          ],
          correct: 0,
          explanation: "Hamming's inequality states that the total number of syndrome states 2^r must be at least m + r (to locate an error in any bit) plus 1 (to represent the error-free condition)."
        },
        {
          question: "What does the syndrome vector S evaluate to when a received codeword contains zero errors?",
          options: [
            "All zeros (S = 0)",
            "All ones (S = 111...)",
            "The length of the frame",
            "The IP address of the sender"
          ],
          correct: 0,
          explanation: "By mathematical design, a valid codeword satisfies all parity equations, producing an all-zero syndrome vector S = 0."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, Chapter 10.1 'Forward Error Correction Versus Retransmission', pp. 305–307.", url: "" },
        { cite: "Richard W. Hamming, 'Error Detecting and Error Correcting Codes', Bell System Technical Journal, 1950.", url: "" }
      ]
    }
  },

  "u2-redundancy-error-control": {
    id: "u2-redundancy-error-control",
    title: "Redundancy and Error Control",
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: "Core",
    category: "datalink",
    difficulty: "Core",
    readingTime: "18 min",
    standard: "Forouzan Ch. 10.1–10.2 / Tanenbaum Ch. 3.2",
    oneLiner: "The fundamental principle of appending extra non-information bits to data so that errors can be detected or corrected.",
    quickAnswer: "Redundancy is the core foundation of all error control in digital communications. To detect or correct errors, the transmitter must send extra bits with the data. These redundant bits create an artificial separation between valid codewords and invalid bit patterns in the transmission space.",
    whyItMatters: "Without redundancy, every possible sequence of $k$ bits would represent valid data. Consequently, if noise flips any bit, the resulting sequence would simply be another valid dataword, making error detection physically impossible.",
    prerequisitesList: [
      { concept: "Binary Coding", meaning: "Representation of characters and numbers as binary bits." },
      { concept: "Data Link Layer Framing", meaning: "Grouping bits into discrete frames." }
    ],
    learningObjectives: [
      "Understand why redundancy is mathematically mandatory for error detection and correction.",
      "Analyze the mapping of $k$-bit datawords into $n$-bit codewords ($n > k$) in block coding.",
      "Calculate the fraction of valid versus invalid codewords in the codeword space ($2^k$ vs $2^n$)."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "Information Theory (Shannon / Hamming)",
      type: "Mathematical Coding Principle",
      prerequisites: ["u2-intro-error-detection", "framing"],
      relatedConcepts: ["u2-hamming-distance", "u2-error-techniques"],
      compareWith: ["flow-control"],
      primaryUses: ["Block coding", "Convolutional coding", "Parity, CRC, and Checksum generation"]
    },
    imageUrl: "assets/images/unit2/topic1/redundancy-block-coding.svg",
    imageCaption: "Figure 10.3: Codeword Space Partitioning – Valid ($2^k$) vs Invalid ($2^n - 2^k$) Codewords.",
    sections: {
      overview: `
        <p>As <em>Forouzan</em> emphasizes on page 305: <strong>"The central concept in detecting or correcting errors is redundancy."</strong> To be able to detect or correct errors, we need to send some extra bits with our data. These redundant bits are added by the sender and removed by the receiver after verification. Their presence allows the receiver to detect or correct corrupted bits.</p>
        <p>In block coding, the message is divided into blocks of $k$ bits, called <strong>datawords</strong>. We add $r$ redundant bits to each block to produce an $n$-bit block called a <strong>codeword</strong>, where $n = k + r$.</p>
        <div class="wiki-callout note">
          <div class="callout-header"><i class="fa-solid fa-calculator text-blue-500 mr-1"></i> The Codeword Space Dichotomy</div>
          <p class="text-xs">With $k$ bits, we can create $2^k$ possible datawords. With $n$ bits, there are $2^n$ possible codewords. Since $n > k$, $2^n > 2^k$. Out of the $2^n$ possible codewords, <strong>only $2^k$ are valid</strong>! The remaining $(2^n - 2^k)$ bit patterns are <em>invalid codewords</em>. Error detection works because noise transforms a valid codeword into an invalid one!</p>
        </div>
      `,
      eli10: "Think of words in a human language like English. If all combinations of letters were valid words, then a typo like 'cat' -> 'cxt' would still be a real word, and nobody could ever catch a typo! But because 'cxt' is NOT in the dictionary, your brain spots the error immediately. Redundancy is creating an exclusive dictionary of allowed words!",
      analogy: "Bank account numbers or credit card numbers. Not every 16-digit combination is a real credit card. The final digit is a Luhn-algorithm check digit. If you mistype a single digit on an online checkout form, the website catches the error instantly without checking the bank database, because the number violates the redundancy formula.",
      howItWorks: `
        <ol class="list-decimal pl-5 space-y-2 text-xs">
          <li><strong>Data Partitioning:</strong> The sender divides raw binary data into fixed $k$-bit datawords.</li>
          <li><strong>Generator Matrix / Generator Polynomial:</strong> The dataword is multiplied by a generator matrix $G$ or divided by generator polynomial $g(x)$.</li>
          <li><strong>Appending Redundancy:</strong> The resulting $r$ parity/FCS bits are concatenated to form an $n$-bit codeword ($n = k + r$).</li>
          <li><strong>Channel Transition:</strong> If channel noise corrupts the codeword, it lands in the invalid codeword territory with very high probability.</li>
          <li><strong>Syndrome Detection:</strong> The receiver tests the codeword against the codebook rules. If it falls into the invalid territory, an error is detected!</li>
        </ol>
      `,
      diagram: `
+---------------------------------------------------------------------------------+
|                    CODEWORD SPACE PARTITIONING (FOROUZAN CH. 10.2)              |
+---------------------------------------------------------------------------------+
|                                                                                 |
|   TOTAL POSSIBLE BIT COMBINATIONS = 2^n                                         |
|   +-------------------------------------------------------------------------+   |
|   |  INVALID CODEWORDS: (2^n - 2^k) combinations                            |   |
|   |  +-------------------------------------------------------------------+  |   |
|   |  |                                                                   |  |   |
|   |  |     VALID CODEWORDS: 2^k combinations                             |  |   |
|   |  |     [ C1 ]        [ C2 ]        [ C3 ]        [ C4 ]              |  |   |
|   |  |       |             |             |             |                 |  |   |
|   |  |       +-------------+-------------+-------------+                 |  |   |
|   |  |                                                                   |  |   |
|   |  |   Noise flips bits ---> Codeword jumps OUTSIDE valid territory    |  |   |
|   |  |                         into INVALID zone!                        |  |   |
|   |  |                              |                                    |  |   |
|   |  |                              v                                    |  |   |
|   |  |                    RECEIVER CATCHES ERROR!                        |  |   |
|   |  +-------------------------------------------------------------------+  |   |
|   +-------------------------------------------------------------------------+   |
+---------------------------------------------------------------------------------+
      `,
      technicalDetails: `
        <p><strong>Code Rate and Efficiency:</strong></p>
        <p>The efficiency of an error-control code is measured by its <strong>Code Rate $R$</strong>:</p>
        <p>$$R = \\frac{k}{n} = \\frac{k}{k + r}$$</p>
        <p>Where:</p>
        <ul>
          <li>$k$ = number of actual information bits.</li>
          <li>$n$ = total transmitted bits in codeword.</li>
          <li>$r = n - k$ = redundant bits added for error control.</li>
          <li><strong>Redundancy Ratio:</strong> $\\frac{r}{n} = 1 - R$.</li>
        </ul>
        <p>A higher code rate ($R \\approx 1$) minimizes bandwidth overhead, whereas a lower code rate provides robust error-correcting capability at the cost of channel throughput.</p>
      `,
      workedExamples: {
        level1: "<strong>Question:</strong> In a block code $(8, 4)$, how many total codewords are possible, how many are valid, and how many are invalid?<br><br><strong>Solution:</strong><br>1. Dataword size $k = 4 \\implies$ Valid codewords = $2^4 = 16$.<br>2. Codeword size $n = 8 \\implies$ Total combinations = $2^8 = 256$.<br>3. Invalid codewords = $256 - 16 = 240$.<br>4. Ratio of invalid to total = $\\frac{240}{256} = 93.75\\%$. Any random noise hit has a 93.75% chance of landing in an invalid state.",
        level2: "<strong>Problem:</strong> Calculate the code rate and redundancy ratio for an Ethernet frame with a 1500-byte payload and a 32-bit (4-byte) CRC trailer.<br><br><strong>Solution:</strong><br>Data bits $k = 1500 \\times 8 = 12,000$ bits.<br>Redundant bits $r = 32$ bits.<br>Total bits $n = 12,032$ bits.<br>Code Rate $R = \\frac{12000}{12032} = 0.9973$ (99.73% efficiency).<br>Redundancy ratio = $1 - 0.9973 = 0.27\\%$.",
        level3: "<strong>Vulnerability Analysis:</strong> Can noise ever turn a valid codeword into another valid codeword?<br><br><strong>Analysis:</strong> Yes! If channel noise corrupts exactly the combination of bits separating one valid codeword $C_1$ from another valid codeword $C_2$, the corrupted frame will match $C_2$ perfectly. The receiver will accept the frame as clean, resulting in an <em>undetected error</em>. The probability of this depends directly on the minimum Hamming distance $d_{\\min}$."
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Benefits of Controlled Redundancy</th><th>Overhead Costs</th></tr></thead>
          <tbody>
            <tr><td>Creates mathematically detectable boundaries between valid and corrupted data.</td><td>Consumes channel bandwidth and transmitter transmission time.</td></tr>
            <tr><td>Enables forward error correction and automated repeat requests.</td><td>Requires extra processing logic and buffer space at both ends.</td></tr>
            <tr><td>Permits tuning: low redundancy for wired links, high for wireless/satellite.</td><td>Excessive redundancy degrades network throughput.</td></tr>
          </tbody>
        </table>
      `,
      whereUsed: [
        "Block coding in Ethernet (CRC-32 FCS)",
        "Parity checking in RS-232 serial UART communication",
        "Linear block codes in memory buses and RAID 5/6 storage arrays",
        "Convolutional and Turbo codes in 3G/4G satellite telecommunications"
      ],
      quiz: [
        {
          question: "According to Forouzan, what is the central concept in detecting or correcting errors?",
          options: [
            "Redundancy",
            "Encryption",
            "Frequency modulation",
            "Packet segmentation"
          ],
          correct: 0,
          explanation: "Forouzan states: 'The central concept in detecting or correcting errors is redundancy. To be able to detect or correct errors, we need to send some extra bits with our data.'"
        },
        {
          question: "In a block coding scheme (n, k), how many codewords out of 2^n are valid?",
          options: [
            "Exactly 2^k",
            "2^n - 2^k",
            "k / n",
            "2^(n-k)"
          ],
          correct: 0,
          explanation: "There are 2^k datawords, and each dataword maps to exactly one unique valid codeword. Therefore, exactly 2^k codewords are valid."
        },
        {
          question: "What happens when transmission noise transforms a valid codeword into another valid codeword?",
          options: [
            "The error goes completely undetected by the receiver.",
            "The receiver automatically inverts the bits.",
            "The bridge drops the packet immediately.",
            "The sender generates an interrupt."
          ],
          correct: 0,
          explanation: "If noise shifts a valid codeword into another valid codeword, the receiver checker validates it successfully and accepts the corrupted data; the error is undetectable."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, Chapter 10.1 'Redundancy', pp. 305–306.", url: "" },
        { cite: "Claude E. Shannon, 'A Mathematical Theory of Communication', Bell System Technical Journal, 1948.", url: "" }
      ]
    }
  },

  "u2-hamming-distance": {
    id: "u2-hamming-distance",
    title: "Hamming Distance",
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: "Core",
    category: "datalink",
    difficulty: "Core",
    readingTime: "20 min",
    standard: "Forouzan Ch. 10.2 / Tanenbaum Ch. 3.2",
    oneLiner: "The number of bit positions in which two binary words of equal length differ, forming the bedrock metric for error detection and correction.",
    quickAnswer: "Hamming distance $d(x, y)$ between two binary words of the same length is the number of bits in which they differ. It is calculated by applying bitwise XOR ($x \\oplus y$) and counting the number of 1s in the result. The minimum Hamming distance $d_{\\min}$ of a code determines its exact error-detecting ($d_{\\min} \\ge s + 1$) and error-correcting ($d_{\\min} \\ge 2t + 1$) capabilities.",
    whyItMatters: "Hamming distance provides the rigorous mathematical criterion that guarantees whether an error code can reliably catch $s$ bit flips or correct $t$ errors. Without understanding Hamming distance, designing reliable communication protocols is impossible.",
    prerequisitesList: [
      { concept: "Bitwise XOR Operation", meaning: "Modulo-2 addition where identical bits produce 0 and differing bits produce 1." },
      { concept: "Redundancy and Block Coding", meaning: "Mapping datawords to codewords in an n-bit space." }
    ],
    learningObjectives: [
      "Compute the Hamming distance between any two binary words using XOR and weight counting.",
      "Calculate the minimum Hamming distance $d_{\\min}$ of a codebook.",
      "Prove and apply the fundamental error detection bound: $d_{\\min} \\ge s + 1$.",
      "Prove and apply the fundamental error correction bound: $d_{\\min} \\ge 2t + 1$ using geometric sphere packing."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "Coding Theory / Richard Hamming (1950)",
      type: "Mathematical Distance Metric",
      prerequisites: ["u2-redundancy-error-control"],
      relatedConcepts: ["u2-hamming-code-calculation", "u2-detection-vs-correction"],
      compareWith: ["u2-error-techniques"],
      primaryUses: ["Error detection bound verification", "Error correction capacity design", "FEC codebook design"]
    },
    imageUrl: "assets/images/unit2/topic1/hamming-distance-spheres.svg",
    imageCaption: "Figure 10.4: Disjoint Decision Spheres for Error Correction ($d_{\\min} \\ge 2t + 1$).",
    sections: {
      overview: `
        <p>One of the central concepts in coding for error control is the idea of the <strong>Hamming Distance</strong>, introduced by <em>Richard W. Hamming (1950)</em> and detailed extensively in <em>Forouzan Chapter 10.2</em>.</p>
        <p>The Hamming distance between two words (of the same size) is the number of differences between the corresponding bits. We denote the Hamming distance between two words $x$ and $y$ as $d(x, y)$.</p>
        <div class="wiki-callout tip">
          <div class="callout-header"><i class="fa-solid fa-calculator text-amber-500 mr-1"></i> Calculation Method (Forouzan p. 308)</div>
          <p class="text-xs">The Hamming distance can easily be found if we apply the bitwise XOR operation ($\\oplus$) on the two words and count the number of 1s in the result: <br><strong>$d(x, y) = \\text{weight}(x \\oplus y)$</strong>.</p>
        </div>
      `,
      eli10: "Think of two words of the same length: 'TONE' and 'ROSE'. How many letters are different? T != R (1), O == O (0), N != S (1), E == E (0). They differ in 2 spots, so their distance is 2! Hamming distance is the exact same thing, but with binary 0s and 1s.",
      analogy: "Houses on a street numbered with unique security lights. If each house must have at least 3 light bulbs different from every other house, and 1 bulb burns out, neighbors can still easily tell which house it is. But if houses only differ by 1 bulb, a single burnt bulb makes house A look like house B!",
      howItWorks: `
        <ol class="list-decimal pl-5 space-y-2 text-xs">
          <li><strong>Pairwise Distance:</strong> For any two words $x$ and $y$, calculate $z = x \\oplus y$. Count the 1s in $z$ to get $d(x, y)$.</li>
          <li><strong>Codebook Analysis:</strong> For a set of valid codewords $C$, compute $d(c_i, c_j)$ for all pairs where $i \\ne j$.</li>
          <li><strong>Minimum Distance $d_{\\min}$:</strong> Find the minimum value among all pairs: $d_{\\min} = \\min_{i \\ne j} d(c_i, c_j)$. In a linear block code, $d_{\\min}$ equals the minimum weight of any non-zero codeword.</li>
          <li><strong>Error Detection Capability ($s$):</strong> To guarantee detecting up to $s$ bit errors, the minimum distance must satisfy:
            <br>$$d_{\\min} \\ge s + 1$$
          </li>
          <li><strong>Error Correction Capability ($t$):</strong> To guarantee correcting up to $t$ bit errors, the minimum distance must satisfy:
            <br>$$d_{\\min} \\ge 2t + 1$$
          </li>
        </ol>
      `,
      diagram: `
+---------------------------------------------------------------------------------+
|                    HAMMING DISTANCE & SPHERE PACKING THEOREM                     |
+---------------------------------------------------------------------------------+
|                                                                                 |
|   Case A: ERROR DETECTION (d_min >= s + 1)                                      |
|                                                                                 |
|       [ Valid Codeword C1 ] -------- s errors --------> ( Corrupted Word X )    |
|       |<----------------- d_min >= s + 1 ---------------->| [ Valid C2 ]        |
|                                                                                 |
|       Since X takes s steps from C1, and C2 is at least s+1 steps away,         |
|       X can NEVER reach C2. Thus X is guaranteed to be detected as invalid!     |
|                                                                                 |
|   Case B: ERROR CORRECTION (d_min >= 2t + 1)                                    |
|                                                                                 |
|          Radius t sphere           Disjoint gap           Radius t sphere       |
|       /-------------------\\                            /-------------------\\    |
|      |    .   .   .  .     |                          |     .  .   .   .    |   |
|      |   .    [C1]    .    |        Boundary Gap      |    .    [C2]   .    |   |
|      |    .   .   .  .     |                          |     .  .   .   .    |   |
|       \\-------------------/                            \\-------------------/    |
|              Sphere 1                                         Sphere 2          |
|       |<------- t -------->|<-------- 1 --------->|<------- t -------->|        |
|       |<------------------------- d_min >= 2t + 1 -------------------->|        |
|                                                                                 |
|       Spheres around C1 and C2 NEVER OVERLAP. A received corrupted word X       |
|       with <= t errors belongs exclusively to C1's sphere! Decode = C1.         |
+---------------------------------------------------------------------------------+
      `,
      technicalDetails: `
        <p><strong>Mathematical Derivation of Bounds (Forouzan Section 10.2):</strong></p>
        <p><strong>1. Error Detection Bound ($d_{\\min} \\ge s + 1$):</strong><br>
        Suppose a codeword $C_1$ is transmitted and $s$ bits are corrupted. The received pattern $X$ is at distance $d(C_1, X) = s$. For $X$ to be recognized as an invalid word, it must not coincide with any other valid codeword $C_2$. Since the minimum distance between any two valid codewords is $d_{\\min}$, if $d_{\\min} \\ge s + 1$, then $s$ errors can never alter $C_1$ into $C_2$. Hence, all patterns of $s$ or fewer errors are detected.</p>
        <p><strong>2. Error Correction Bound ($d_{\\min} \\ge 2t + 1$):</strong><br>
        To correct $t$ errors, the receiver uses nearest-neighbor decoding: it maps received word $X$ to whichever valid codeword is closest. Suppose codeword $C_1$ is corrupted by $t$ errors to $X$, so $d(C_1, X) \\le t$. For the receiver to correctly pick $C_1$ over any other codeword $C_2$, $X$ must be strictly closer to $C_1$ than to $C_2$ ($d(C_1, X) < d(C_2, X)$). By triangle inequality: $d(C_1, C_2) \\le d(C_1, X) + d(X, C_2) \\implies d_{\\min} \\ge t + (t + 1) = 2t + 1$.</p>
      `,
      workedExamples: {
        level1: "<strong>Question:</strong> Find the Hamming distance between the following pairs of words:<br>a) <code>10101</code> and <code>11110</code><br>b) <code>00000</code> and <code>11111</code><br><br><strong>Solution:</strong><br>a) <code>10101</code> $\\oplus$ <code>11110</code> = <code>01011</code>. Count of 1s is 3. Thus, $d(10101, 11110) = 3$.<br>b) <code>00000</code> $\\oplus$ <code>11111</code> = <code>11111</code>. Count of 1s is 5. Thus, $d(00000, 11111) = 5$.",
        level2: "<strong>Problem:</strong> A codebook contains 4 valid codewords: <code>00000</code>, <code>01011</code>, <code>10101</code>, and <code>11110</code>. Determine $d_{\\min}$ and state how many errors it can guarantee to detect and correct.<br><br><strong>Solution:</strong><br>$d(00000, 01011) = 3$<br>$d(00000, 10101) = 3$<br>$d(00000, 11110) = 4$<br>$d(01011, 10101) = 4$<br>$d(01011, 11110) = 3$<br>$d(10101, 11110) = 3$<br>Smallest distance $d_{\\min} = 3$.<br>• Error detection: $s = d_{\\min} - 1 = 3 - 1 = 2$ errors.<br>• Error correction: $t = \\lfloor(d_{\\min} - 1)/2\\rfloor = \\lfloor(3 - 1)/2\\rfloor = 1$ single error.",
        level3: "<strong>Exam Problem:</strong> A communication channel requires the detection of up to 4 bit errors OR the correction of up to 2 bit errors. What is the minimum Hamming distance required for the code?<br><br><strong>Solution:</strong><br>1. For detecting up to 4 errors ($s = 4$): $d_{\\min} \\ge s + 1 = 4 + 1 = 5$.<br>2. For correcting up to 2 errors ($t = 2$): $d_{\\min} \\ge 2t + 1 = 2(2) + 1 = 5$.<br>Both criteria require $d_{\\min} \\ge 5$. Therefore, the code must have a minimum Hamming distance of at least 5."
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Metric Strength</th><th>Design Constraint</th></tr></thead>
          <tbody>
            <tr><td>Provides exact, deterministic mathematical guarantees for error control.</td><td>Computing $d_{\\min}$ by brute force has $O(2^{2k})$ complexity for non-linear codes.</td></tr>
            <tr><td>Universal across block codes, parity, CRC, and convolutional codes.</td><td>Increasing $d_{\\min}$ requires adding more redundant bits, reducing code rate.</td></tr>
            <tr><td>Geometric sphere packing gives clear visual intuition of decoding boundaries.</td><td>Does not account for non-uniform channel noise or burst error clustering.</td></tr>
          </tbody>
        </table>
      `,
      whereUsed: [
        "Determining error detection strength of CRC generator polynomials",
        "Designing Hamming single-error correcting codes (d_min = 3)",
        "Designing SECDED (Single Error Correction, Double Error Detection) codes (d_min = 4)",
        "Measuring signal constellation distance in QAM/PSK modems"
      ],
      quiz: [
        {
          question: "How is the Hamming distance between two binary words calculated?",
          options: [
            "By taking their bitwise XOR and counting the number of 1s in the result.",
            "By adding the two decimal values and dividing by 2.",
            "By multiplying the two words using binary AND.",
            "By counting the total number of bits in the longest word."
          ],
          correct: 0,
          explanation: "Bitwise XOR produces a 1 wherever the two bits differ. Counting the 1s gives the exact number of differing positions."
        },
        {
          question: "What is the minimum Hamming distance d_min required to guarantee the correction of up to 3 bit errors?",
          options: [
            "7 (since d_min >= 2t + 1 = 2(3) + 1 = 7)",
            "4 (since d_min >= t + 1)",
            "6 (since d_min >= 2t)",
            "3 (since d_min >= t)"
          ],
          correct: 0,
          explanation: "To correct t errors, spheres of radius t must not overlap, requiring d_min >= 2t + 1. For t = 3: 2(3) + 1 = 7."
        },
        {
          question: "If a code has d_min = 4, how many errors can it guarantee to detect?",
          options: [
            "3 errors (since s = d_min - 1 = 4 - 1 = 3)",
            "4 errors",
            "2 errors",
            "1 error"
          ],
          correct: 0,
          explanation: "The error detection guarantee is s = d_min - 1. For d_min = 4, s = 3 errors."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, Chapter 10.2 'Hamming Distance & Minimum Distance', pp. 308–313.", url: "" },
        { cite: "Richard W. Hamming, 'Error Detecting and Error Correcting Codes', Bell System Technical Journal, 29(2), 1950.", url: "" }
      ]
    }
  },

  "u2-detection-vs-correction": {
    id: "u2-detection-vs-correction",
    title: "Error Detection vs Error Correction",
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: "Core",
    category: "datalink",
    difficulty: "Core",
    readingTime: "18 min",
    standard: "Forouzan Ch. 10.1 / Tanenbaum Ch. 3.2",
    oneLiner: "A comprehensive architectural and engineering comparison between discovering errors (Detection) and repairing them in-flight (Correction).",
    quickAnswer: "Error detection simply identifies whether any bit errors occurred during transmission, prompting retransmission upon failure. Error correction (FEC) not only identifies errors but also mathematically locates and inverts corrupted bits on the spot. Detection is bandwidth-efficient and ideal for low-noise links; correction is delay-optimal and essential for high-latency or simplex channels.",
    whyItMatters: "Choosing between detection (with ARQ) and correction (FEC) is one of the most critical trade-offs in network protocol engineering, directly dictating throughput, delay, buffer allocation, and transceiver hardware cost.",
    prerequisitesList: [
      { concept: "Introduction to Error Detection", meaning: "Binary frame validation." },
      { concept: "Introduction to Error Correction", meaning: "Syndrome decoding and bit reconstruction." }
    ],
    learningObjectives: [
      "Compare error detection and error correction across 10 critical engineering dimensions.",
      "Evaluate trade-offs between bandwidth overhead, computation complexity, and transmission delay.",
      "Select the optimal mechanism based on link bit error rate (BER) and round-trip time (RTT)."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "Network Architecture Design Trade-off",
      type: "Comparative Engineering Analysis",
      prerequisites: ["u2-intro-error-detection", "u2-intro-error-correction"],
      relatedConcepts: ["u2-hamming-distance", "comparison-noiseless-noisy"],
      compareWith: ["u2-error-techniques"],
      primaryUses: ["Protocol architecture design", "Channel capacity optimization", "Satellite vs terrestrial link tuning"]
    },
    imageUrl: "assets/images/unit2/topic1/detection-vs-correction-matrix.svg",
    imageCaption: "Figure 10.5: Engineering Decision Matrix: Error Detection vs Error Correction.",
    sections: {
      overview: `
        <p>In digital network design, architects face a fundamental choice when handling transmission errors: should the receiver merely <em>detect</em> errors and request a retransmission, or should it actively <em>correct</em> them using redundant information?</p>
        <p>As <em>Forouzan (p. 305)</em> contrasts: <strong>"The correction of errors is more difficult than the detection."</strong> In error detection, we are looking only to see if any error has occurred (a binary Yes or No). We do not care which bits or how many bits were corrupted. In error correction, we need to know the exact number and, more importantly, the exact location of the corrupted bits.</p>
      `,
      eli10: "Error detection is like a smoke alarm: it beeps loudly to tell you there is a fire, so you evacuate and call the fire department to start over. Error correction is like an automatic fire sprinkler system: it senses exactly where the flame is and puts it out right there on the spot!",
      analogy: "A proofreader vs an editor. The proofreader puts a red sticky note on page 5 saying 'Typo on this page!' and returns the manuscript to you to rewrite. The editor locates the missing semicolon, corrects it with their red pen, and sends the book straight to the printer.",
      howItWorks: `
        <ol class="list-decimal pl-5 space-y-2 text-xs">
          <li><strong>Low Bit Error Rate (BER) Wired Links:</strong> Since errors are rare (1 in $10^9$), send minimal check bits (e.g., CRC-32 = 4 bytes per 1500 bytes). If an error occurs, simply retransmit the frame via ARQ. High throughput is preserved.</li>
          <li><strong>High Bit Error Rate (BER) Wireless Links:</strong> Signal fading and multi-path interference cause frequent bit flips. Sending ARQs for every error would congest the channel. Use Hybrid ARQ (HARQ), combining FEC with ARQ fallback.</li>
          <li><strong>High Latency / Simplex Channels:</strong> Where round-trip time is measured in seconds or hours (satellite/deep space), retransmission is impossible; heavy FEC must be used regardless of overhead.</li>
        </ol>
      `,
      diagram: `
+---------------------------------------------------------------------------------+
|               DECISION FLOWCHART: DETECTION (ARQ) VS CORRECTION (FEC)           |
+---------------------------------------------------------------------------------+
|                                                                                 |
|                      Analyze Communication Channel                              |
|                                    |                                            |
|                  Is there a return channel for ACKs?                            |
|                            /               \\                                    |
|                         [NO]              [YES]                                 |
|                          |                  |                                   |
|                          v                  v                                   |
|                     USE FEC ONLY     Is Round Trip Time                         |
|                     (Simplex/TV)     extremely high (Satellite)?                |
|                                            /         \\                          |
|                                         [YES]        [NO]                       |
|                                          |             |                        |
|                                          v             v                        |
|                                       USE FEC     Is Channel BER high           |
|                                     (Deep Space)  (e.g., Wireless/Cellular)?    |
|                                                        /         \\              |
|                                                     [YES]        [NO]           |
|                                                      |             |            |
|                                                      v             v            |
|                                                  USE HYBRID    USE DETECTION    |
|                                                     ARQ        + ARQ (Ethernet) |
+---------------------------------------------------------------------------------+
      `,
      technicalDetails: `
        <p><strong>Comprehensive 10-Point Comparison Table:</strong></p>
        <table class="wiki-table">
          <thead><tr><th>Feature / Dimension</th><th>Error Detection (with ARQ)</th><th>Error Correction (FEC)</th></tr></thead>
          <tbody>
            <tr><td><strong>Fundamental Goal</strong></td><td>Ascertain if frame is intact (Yes/No).</td><td>Locate and invert corrupted bits.</td></tr>
            <tr><td><strong>Information Needed</strong></td><td>Is the codeword valid?</td><td>Exact bit position(s) of error(s).</td></tr>
            <tr><td><strong>Redundancy Overhead</strong></td><td>Very low (e.g. 1 bit parity, 16–32 bits CRC).</td><td>High ($2^r \ge m + r + 1$, multiple parity bits).</td></tr>
            <tr><td><strong>Bandwidth Efficiency</strong></td><td>Extremely high under clean channel conditions.</td><td>Constant bandwidth penalty on every packet.</td></tr>
            <tr><td><strong>Delivery Delay</strong></td><td>Variable (jitter caused by retransmissions).</td><td>Constant and deterministic.</td></tr>
            <tr><td><strong>Channel Requirement</strong></td><td>Requires bidirectional (duplex) channel for ACKs.</td><td>Works on unidirectional (simplex) channels.</td></tr>
            <tr><td><strong>Hardware Complexity</strong></td><td>Very low (linear shift registers, XOR gates).</td><td>High (matrix syndrome decoders, DSP).</td></tr>
            <tr><td><strong>Power Consumption</strong></td><td>Minimal at receiver.</td><td>Significant due to continuous decoding math.</td></tr>
            <tr><td><strong>Best Fit Topology</strong></td><td>Wired LANs (Ethernet 802.3), WANs, Fiber.</td><td>Deep space, Satellite, DVB-T, Wireless 5G.</td></tr>
            <tr><td><strong>Standard Protocols</strong></td><td>CRC-32, Internet Checksum, HDLC.</td><td>Hamming Code, Reed-Solomon, Turbo, LDPC.</td></tr>
          </tbody>
        </table>
      `,
      workedExamples: {
        level1: "<strong>Question:</strong> Why does Ethernet (IEEE 802.3) use error detection (CRC-32) rather than error correction?<br><br><strong>Answer:</strong><br>Fiber optic and twisted-pair Ethernet cables have an exceptionally low Bit Error Rate (BER $\\approx 10^{-10}$). Corrupted frames are exceedingly rare. Transmitting heavy FEC check bits on every frame would waste 10–25% of bandwidth. Using a 4-byte CRC overhead ($0.27\\%$) and dropping the rare bad frame achieves maximum throughput.",
        level2: "<strong>Problem:</strong> A satellite link has a propagation delay of 250 ms (RTT = 500 ms) and a data rate of 10 Mbps. An error occurs on a frame. Compare the delay penalty of Retransmission (ARQ) versus Forward Error Correction.<br><br><strong>Solution:</strong><br>1. <strong>ARQ Penalty:</strong> Detecting the error requires sender notification and retransmission, causing a minimum delay of $1 \\times \\text{RTT} = 500 \\text{ ms}$ before the corrected frame arrives.<br>2. <strong>FEC Penalty:</strong> The receiver corrects the error in silicon within microseconds ($< 1 \\,\\mu\\text{s}$) upon arrival.<br>FEC completely eliminates the 500 ms latency spike.",
        level3: "<strong>Hybrid ARQ (HARQ) Synthesis:</strong> Explain how modern 4G/5G mobile cellular networks combine detection and correction.<br><br><strong>Analysis:</strong> 4G/5G networks use <em>Hybrid ARQ (HARQ)</em>. Transmitted packets include Turbo/LDPC forward error correction. If noise is moderate, the receiver corrects the packet locally without retransmission. If noise is severe and FEC fails, the receiver saves the soft channel symbols in a buffer and requests a retransmission, combining the energy of both transmissions (Chase Combining / Incremental Redundancy) to decode successfully."
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>When to Choose Detection</th><th>When to Choose Correction</th></tr></thead>
          <tbody>
            <tr><td>Channels with low Bit Error Rate (optical fiber, copper LAN).</td><td>Channels with high Bit Error Rate (wireless mobile, RF, underwater).</td></tr>
            <tr><td>Bidirectional links where reverse channel is inexpensive.</td><td>Unidirectional links (simplex broadcasting, cable TV, pagers).</td></tr>
            <tr><td>Applications tolerant to variable retransmission jitter (file download).</td><td>Real-time, ultra-low latency streams (voice, video, telemetry).</td></tr>
          </tbody>
        </table>
      `,
      whereUsed: [
        "Ethernet 802.3 and Wi-Fi 802.11 MAC framing (CRC-32 error detection)",
        "Deep space communication links (Reed-Solomon / LDPC FEC)",
        "Hybrid ARQ in 3GPP LTE and 5G New Radio (NR) mobile physical layers",
        "PCI Express (PCIe) bus architectures (CRC detection with replay buffer)"
      ],
      quiz: [
        {
          question: "Under which channel condition is error detection with ARQ vastly superior to forward error correction?",
          options: [
            "A channel with very low bit error rate and low round-trip propagation delay.",
            "A satellite link with 30-minute propagation delay.",
            "A simplex radio broadcast with no return path.",
            "A noisy deep-space link with 50% packet corruption."
          ],
          correct: 0,
          explanation: "When errors are rare and round-trip delay is low, sending tiny detection check bits preserves nearly 100% bandwidth, and the rare retransmission costs virtually nothing."
        },
        {
          question: "What is the primary operational penalty imposed by Forward Error Correction (FEC)?",
          options: [
            "Constant bandwidth overhead due to abundant redundant parity bits on every packet.",
            "Infinite retransmission loops.",
            "Inability to transmit over copper media.",
            "Mandatory requirement for a bidirectional return channel."
          ],
          correct: 0,
          explanation: "FEC requires multiple redundant check bits on every single frame, permanently consuming a significant fraction of channel bandwidth regardless of whether errors actually occur."
        },
        {
          question: "What modern protocol technique combines both error detection and error correction in mobile wireless networks?",
          options: [
            "Hybrid ARQ (HARQ)",
            "Pure ALOHA",
            "Stop-and-Wait without sequence numbers",
            "Bit-map protocol"
          ],
          correct: 0,
          explanation: "Hybrid ARQ (HARQ) combines Forward Error Correction (FEC) with Automatic Repeat Request (ARQ), attempting local correction first and requesting retransmission only when FEC capacity is exceeded."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, Chapter 10.1 'Detection Versus Correction', pp. 305–307.", url: "" },
        { cite: "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Section 3.2.", url: "" }
      ]
    }
  },

  "u2-error-techniques": {
    id: "u2-error-techniques",
    title: "Error Detection and Correction Techniques",
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: "Core",
    category: "datalink",
    difficulty: "Core",
    readingTime: "22 min",
    standard: "Forouzan Ch. 10.1–10.5 / Tanenbaum Ch. 3.2",
    oneLiner: "The complete taxonomy and functional survey of error detection and correction coding schemes in computer communications.",
    quickAnswer: "Error control techniques in computer networking span four primary detection schemes (Simple Parity, 2D Parity, Checksum, and Cyclic Redundancy Check) and five major correction families (Hamming Codes, Reed-Solomon, Convolutional Codes, Turbo Codes, and LDPC). Each technique trades mathematical complexity and redundant overhead for error detection/correction guarantees.",
    whyItMatters: "Different network layers and communication media demand different mathematical coding techniques. For instance, routers use fast 16-bit one's complement checksums in software for IP headers, while network cards use high-speed hardware CRC-32 for Ethernet frames.",
    prerequisitesList: [
      { concept: "Redundancy and Block Coding", meaning: "Appending redundant bits to distinguish valid and invalid codewords." },
      { concept: "Hamming Distance", meaning: "Distance metrics governing code capabilities." }
    ],
    learningObjectives: [
      "Categorize all standard error detection and correction algorithms in computer networking.",
      "Understand the mechanics and limitations of Simple Parity, 2D Parity, Internet Checksum, and CRC.",
      "Compare detection strengths against single-bit, double-bit, odd-bit, and burst errors.",
      "Map specific techniques to their respective OSI layers and hardware implementations."
    ],
    infobox: {
      layer: "Layer 2 & Layer 3 / Layer 4",
      standard: "IEEE 802.3 / IETF RFC 1071 / ITU-T V.41",
      type: "Comprehensive Taxonomy",
      prerequisites: ["u2-intro-error-detection", "u2-redundancy-error-control"],
      relatedConcepts: ["u2-hamming-code-calculation", "u2-crc-working-principle"],
      compareWith: ["u2-detection-vs-correction"],
      primaryUses: ["Protocol stack error control selection", "Hardware vs software error checking", "Network interface design"]
    },
    imageUrl: "assets/images/unit2/topic1/error-control-taxonomy.svg",
    imageCaption: "Figure 10.6: Comprehensive Taxonomy of Error Detection and Correction Codes.",
    sections: {
      overview: `
        <p>In modern computer networks, no single error-control code fits all scenarios. Protocols deploy specialized algorithms tailored to the physical characteristics of the medium, available processor cycles, and acceptable bit overhead.</p>
        <p>As cataloged across <em>Forouzan Chapters 10.1 through 10.5</em>, error control techniques are divided into two macro families:</p>
        <ul>
          <li><strong>Error Detection Techniques:</strong> Parity Check (VRC), Two-Dimensional Parity Check (LRC), Checksum (1's complement addition), and Cyclic Redundancy Check (CRC).</li>
          <li><strong>Error Correction Techniques:</strong> Linear block codes (Hamming Code $(7,4)$), Reed-Solomon codes, Convolutional codes, Turbo codes, and Low-Density Parity-Check (LDPC) codes.</li>
        </ul>
      `,
      eli10: "Think of security inspections. A simple stamp on your hand is like a Parity bit (fast, easy, but easy to fool). An ID card with a barcode is like a Checksum. A passport with an encrypted microchip is like a CRC (very hard to fool). And a full biometric DNA match is like a Hamming Code (it knows exactly who you are and fixes any mistake)!",
      analogy: "Packing fragile glassware for moving: Simple parity is putting a single fragile sticker on the box. 2D parity is putting bubble wrap around each glass. CRC is sealing the box in a custom shock-absorbing foam mold. Hamming code is sending two identical trucks with spare parts so if one glass breaks, the movers assemble a replacement instantly.",
      howItWorks: `
        <ol class="list-decimal pl-5 space-y-2 text-xs">
          <li><strong>Simple Parity Check (VRC):</strong> Appends 1 bit so total count of 1s is even (or odd). Detects all single-bit errors and odd-number bit errors; misses all even-number bit errors ($d_{\\min} = 2$).</li>
          <li><strong>Two-Dimensional Parity Check (LRC/VRC):</strong> Arranges data in a 2D matrix; computes parity for each row and each column. Detects up to 3 errors and can correct any single-bit error located at the intersection of a bad row and bad column.</li>
          <li><strong>Internet Checksum:</strong> Divides data into 16-bit words, adds them using 1's complement arithmetic, and inverts the result. Optimized for fast software computation in routers (IP, TCP, UDP).</li>
          <li><strong>Cyclic Redundancy Check (CRC):</strong> Uses polynomial modulo-2 division. Superb burst error detection implemented via shift registers and XOR gates in silicon (Ethernet, Wi-Fi).</li>
          <li><strong>Hamming Code:</strong> Places check bits at powers-of-2 positions. Generates a binary syndrome vector that pinpoints the exact corrupted bit for instant hardware inversion ($d_{\\min} = 3$).</li>
        </ol>
      `,
      diagram: `
+---------------------------------------------------------------------------------+
|               TAXONOMY OF ERROR CONTROL TECHNIQUES (FOROUZAN CH. 10)            |
+---------------------------------------------------------------------------------+
|                                                                                 |
|                            ERROR CONTROL CODES                                  |
|                                     |                                           |
|            +------------------------+------------------------+                  |
|            |                                                 |                  |
|            v                                                 v                  |
|    ERROR DETECTION                                   ERROR CORRECTION (FEC)     |
|            |                                                 |                  |
|    +-------+-------+---------+                       +-------+-------+          |
|    |       |       |         |                       |               |          |
|    v       v       v         v                       v               v          |
|  Simple   2-D   Checksum    CRC                   Block Codes   Convolutional   |
|  Parity  Parity (16-bit)  (CRC-32)                 (Hamming,        Codes       |
|  (VRC)   (LRC)   IP/TCP   Ethernet                  Reed-Solomon)  (Viterbi,    |
|                                                                     Turbo, LDPC)|
+---------------------------------------------------------------------------------+
      `,
      technicalDetails: `
        <p><strong>Comprehensive Comparison Matrix of Error Control Techniques:</strong></p>
        <table class="wiki-table">
          <thead><tr><th>Technique</th><th>Overhead Bits</th><th>Min Distance ($d_{\\min}$)</th><th>Error Detection Capability</th><th>Error Correction?</th><th>Typical Application</th></tr></thead>
          <tbody>
            <tr><td><strong>Simple Parity</strong></td><td>1 bit</td><td>2</td><td>All single-bit errors; all odd errors. Fails on even errors.</td><td>No</td><td>UART, ASCII characters</td></tr>
            <tr><td><strong>Two-Dimensional Parity</strong></td><td>$r + c + 1$ bits</td><td>4</td><td>All 1, 2, and 3-bit errors; most burst errors.</td><td>1-bit errors only</td><td>Magnetic tape, serial buses</td></tr>
            <tr><td><strong>Internet Checksum</strong></td><td>16 bits</td><td>2</td><td>All single-bit errors; fails if inverted bits cancel out.</td><td>No</td><td>IPv4 header, TCP, UDP</td></tr>
            <tr><td><strong>CRC-32</strong></td><td>32 bits</td><td>4–6 (varies by len)</td><td>All single, double, odd errors; all bursts $\\le 32$ bits.</td><td>No</td><td>Ethernet 802.3, Wi-Fi 802.11</td></tr>
            <tr><td><strong>Hamming Code (7,4)</strong></td><td>3 bits for 4 data</td><td>3</td><td>Up to 2 errors detected.</td><td>1 single-bit error</td><td>ECC RAM, satellite telemetry</td></tr>
            <tr><td><strong>Reed-Solomon</strong></td><td>$2t$ symbols</td><td>$2t + 1$</td><td>Massive burst detection.</td><td>Up to $t$ symbol errors</td><td>CDs, DVDs, QR codes, DSL</td></tr>
          </tbody>
        </table>
      `,
      workedExamples: {
        level1: "<strong>Question:</strong> Why do network protocols use CRC at the Data Link Layer (Layer 2) but Checksum at the Network/Transport Layers (Layer 3/4)?<br><br><strong>Answer:</strong><br>1. <strong>Layer 2 (Data Link):</strong> Implemented in Network Interface Card (NIC) silicon hardware. Hardware shift registers compute complex CRC modulo-2 division at line rate (100 Gbps) with zero CPU load.<br>2. <strong>Layer 3/4 (IP/TCP):</strong> Implemented in operating system software on routers and hosts. Checksum uses standard 16-bit addition, which integer ALUs execute in 1 to 2 CPU clock cycles.",
        level2: "<strong>Problem:</strong> Calculate the 1's complement Internet Checksum for the two 8-bit numbers: <code>10011001</code> and <code>10101011</code>.<br><br><strong>Solution:</strong><br>1. Standard binary sum: <code>10011001</code> + <code>10101011</code> = <code>101000100</code> (9 bits, with carry 1).<br>2. Wrap around carry (1's complement addition): <code>01000100</code> + <code>1</code> = <code>01000101</code>.<br>3. Invert all bits (checksum): <code>NOT(01000101)</code> = <code>10111010</code>.<br>Checksum transmitted = <code>10111010</code>.",
        level3: "<strong>Vulnerability Analysis:</strong> Explain the fatal flaw of 1's complement Checksum that CRC easily avoids.<br><br><strong>Analysis:</strong> If one byte in the packet increases by $X$ and another byte decreases by $X$ (or if two bits swap places: $0 \\to 1$ and $1 \\to 0$), the arithmetic sum remains completely unchanged! The checksum will still evaluate to valid. CRC uses non-commutative polynomial modulo-2 arithmetic, making it virtually immune to byte-swapping or compensating errors."
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Technique Selection Criteria</th><th>Recommended Method</th></tr></thead>
          <tbody>
            <tr><td>Ultra-low silicon cost, byte-by-byte serial transmission.</td><td>Simple Parity Check.</td></tr>
            <tr><td>High-speed host CPU software execution.</td><td>Internet Checksum (RFC 1071).</td></tr>
            <tr><td>Maximum burst-error protection in physical network frames.</td><td>Cyclic Redundancy Check (CRC-32).</td></tr>
            <tr><td>High-reliability memory systems, instant single-error correction.</td><td>Hamming Code with SECDED.</td></tr>
            <tr><td>Massive burst scratching/fading recovery (optical storage, cellular).</td><td>Reed-Solomon / LDPC Codes.</td></tr>
          </tbody>
        </table>
      `,
      whereUsed: [
        "Ethernet (IEEE 802.3), Wi-Fi (IEEE 802.11), and Token Ring (CRC-32)",
        "IPv4, TCP, and UDP internet transport protocols (RFC 1071 Checksum)",
        "PCIe architecture and ECC Server Memory (Hamming Code)",
        "Audio CDs, DVDs, and QR Codes (Reed-Solomon burst error correction)"
      ],
      quiz: [
        {
          question: "Which error detection technique is mathematically based on polynomial modulo-2 binary division?",
          options: [
            "Cyclic Redundancy Check (CRC)",
            "Internet Checksum",
            "Two-Dimensional Parity",
            "Simple Parity Check"
          ],
          correct: 0,
          explanation: "CRC treats binary bit sequences as polynomials and performs modulo-2 division by a predetermined generator polynomial."
        },
        {
          question: "What is the primary operational advantage of the Internet Checksum over CRC for Layer 3/4 protocols?",
          options: [
            "It is simple and fast to compute in software using standard general-purpose CPU addition instructions.",
            "It provides higher burst error detection than CRC-32.",
            "It can correct multiple bit errors automatically.",
            "It requires zero redundant bits."
          ],
          correct: 0,
          explanation: "Software-based IP/TCP stacks need lightweight algorithms. Checksum relies on simple 16-bit integer addition, which CPUs execute natively at immense speed."
        },
        {
          question: "What type of error can Two-Dimensional (2D) Parity detect and correct?",
          options: [
            "It can detect up to 3 errors and correct any single-bit error located at the row-column intersection.",
            "It can correct 10 consecutive burst errors.",
            "It cannot detect single-bit errors.",
            "It only works on optical fiber links."
          ],
          correct: 0,
          explanation: "In 2D parity, a single bit flip creates an parity error in exactly one row and one column. The intersection of that row and column pinpoints the bad bit for correction."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, Chapter 10.1–10.5, pp. 303–342.", url: "" },
        { cite: "IETF RFC 1071, 'Computing the Internet Checksum', RT Braden, DA Borman, C. Partridge, 1988.", url: "https://www.ietf.org/rfc/rfc1071.txt" }
      ]
    }
  }
};

module.exports = part1Topics;

