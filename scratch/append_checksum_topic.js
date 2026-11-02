const fs = require('fs');

const checksumTopic = {
  id: "u2-checksum",
  title: "Checksum (Error Detection & 1's Complement)",
  unit: "Unit 2 – Data Link Layer",
  unitId: "unit2",
  level: "Core",
  category: "datalink",
  difficulty: "Core",
  readingTime: "20 min",
  standard: "Forouzan Ch. 10.5 / RFC 1071 / RFC 791 / RFC 793",
  oneLiner: "One's-complement summation used by senders to append check bits and by receivers to detect corruption with a simple zero test.",
  quickAnswer: "Checksum is an error-detecting mechanism based on redundancy and one's-complement addition. The sender divides data into equal-sized words (e.g. 4-bit, 8-bit, or 16-bit), sums them wrapping overflow carries, inverts the sum to produce the checksum, and appends it to the transmission. The receiver adds all received data words PLUS the checksum using one's-complement; if the inverted result is exactly 0 (or sum is all 1s), the frame is accepted as uncorrupted. If non-zero, an error occurred and the receiver discards the packet.",
  whyItMatters: "The checksum provides an extremely fast, lightweight software error-detection mechanism that can be executed natively in general-purpose CPU arithmetic registers without needing specialized CRC polynomial hardware. It is the core integrity mechanism of IPv4, TCP, and UDP.",
  prerequisitesList: [
    { concept: "Introduction to Error Detection", meaning: "Binary frame validation and error identification." },
    { concept: "One's Complement Arithmetic", meaning: "Binary representation where negative numbers are formed by inverting bits, and carries wrap around." }
  ],
  learningObjectives: [
    "Understand the working principle of Checksum as an error detection mechanism at both sender and receiver.",
    "Master one's complement binary addition with end-around carry wrapping.",
    "Trace sender checksum generation and receiver-side verification using Forouzan's exact textbook examples.",
    "Analyze the error detection strengths and vulnerabilities (such as compensating errors) of checksums compared to CRC."
  ],
  infobox: {
    layer: "Layer 2 & Layer 3 / Layer 4",
    standard: "Forouzan Ch. 10.5 / IETF RFC 1071",
    type: "Error-Detecting Code",
    prerequisites: ["u2-intro-error-detection", "u2-redundancy-error-control"],
    relatedConcepts: ["u2-error-techniques", "u2-crc-working-principle"],
    compareWith: ["u2-crc-generator-polynomial"],
    primaryUses: ["IPv4 Header Checksum", "TCP and UDP Segment Integrity", "ICMP Error Reporting"]
  },
  imageUrl: "assets/images/unit2/topic1/checksum-generator-checker.svg",
  imageCaption: "Figure 10.16: Checksum Architecture: Sender Generator, 1's Complement Carry Wrapping, and Receiver Verification.",
  sections: {
    overview: `
      <p>As <em>Behrouz A. Forouzan</em> establishes in <strong>Chapter 10.5 (pp. 334–337)</strong>: <strong>"The last error detection method we discuss here is called the checksum. Like linear and cyclic codes, the checksum is based on the concept of redundancy."</strong></p>
      <p>The checksum is widely used throughout the Internet protocol suite (notably in IPv4, TCP, UDP, and ICMP). The central idea is intuitive:</p>
      <ul>
        <li><strong>At the Sender:</strong> The message is divided into fixed-size units (typically 16-bit words). The sender sums all the words using <strong>one's complement arithmetic</strong>. The sum is then complemented (all bits inverted) to create the <em>checksum</em>, which is appended to the message.</li>
        <li><strong>At the Receiver:</strong> The receiver performs the exact same one's complement summation over all received data words <strong>plus the received checksum</strong>. If no error occurred during transit, the sum will evaluate to all 1s (which, when inverted, equals <strong>0</strong>). If the result is non-zero, the receiver knows an error occurred and discards the packet!</li>
      </ul>
      <div class="wiki-callout tip">
        <div class="callout-header"><i class="fa-solid fa-check-double text-gfg-green mr-1"></i> Why the Receiver Checks for Zero</div>
        <p class="text-xs">Because the checksum transmitted by the sender is the <em>negative (complement)</em> of the data sum, adding the data to its own negative at the receiver produces zero ($X + (-X) = 0$). In one's complement, negative zero is represented as all 1s (e.g. <code>1111</code> in 4 bits or <code>0xFFFF</code> in 16 bits). Inverting all 1s yields <code>0000</code>, providing an unambiguous test for frame integrity.</p>
      </div>
    `,
    eli10: "Imagine you're buying 5 items at a supermarket: $7, $11, $12, $0, and $6. The total sum is $36. The cashier writes '-$36' on your receipt as a security check. When you get home, you add all the prices PLUS the security check: 7 + 11 + 12 + 0 + 6 + (-36) = 0! If the final answer is exactly ZERO, you know nobody overcharged you or altered your receipt!",
    analogy: "Double-entry accounting: in bookkeeping, every credit must have an equal and opposite debit so that the net balance of all accounts equals zero ($0.00$). If an auditor sums all columns and the final balance is anything other than zero, an error or fraud has occurred.",
    howItWorks: `
      <p><strong>1. The Sender Algorithm (Checksum Generator):</strong></p>
      <ol class="list-decimal pl-5 space-y-1 text-xs">
        <li>Initialize the checksum field to 0.</li>
        <li>Divide the data into $n$-bit words (typically $n = 16$ or $n = 4$).</li>
        <li>Add all $n$-bit data words together using binary addition.</li>
        <li><strong>Carry Wrapping (End-Around Carry):</strong> If the sum exceeds $n$ bits, take the overflow bits from the left (the carry) and add them to the lowest $n$ bits. Repeat until the sum fits into $n$ bits.</li>
        <li><strong>Complement:</strong> Invert all bits of the wrapped sum ($0 \\to 1, 1 \\to 0$). This inverted value is the <strong>Checksum</strong>.</li>
        <li>Transmit the data words along with the checksum.</li>
      </ol>
      <p><strong>2. The Receiver Algorithm (Checksum Checker):</strong></p>
      <ol class="list-decimal pl-5 space-y-1 text-xs">
        <li>Divide the received payload into $n$-bit words.</li>
        <li>Add all data words <strong>PLUS the received checksum</strong> together.</li>
        <li>Wrap any carry bits from the left and add them to the rightmost $n$ bits.</li>
        <li><strong>Complement the final sum:</strong>
          <br>• If the result is <strong>0</strong> (all zero bits): The data is verified! Accept the packet.
          <br>• If the result is <strong>non-zero</strong>: One or more bit errors occurred! Reject and drop the packet.
        </li>
      </ol>
    `,
    diagram: `
+---------------------------------------------------------------------------------+
|               CHECKSUM GENERATION AND VERIFICATION (FOROUZAN CH. 10.5)          |
+---------------------------------------------------------------------------------+
|                                                                                 |
|   SENDER (Generator):                                                           |
|   Data words: [ W1 ] [ W2 ] [ W3 ] ... [ Wk ]                                   |
|                     |                                                           |
|                     v                                                           |
|          One's Complement Summation (with End-Around Carry)                     |
|                     |                                                           |
|                     v Wrapped Sum                                               |
|               [ Invert All Bits: NOT(Sum) ]                                     |
|                     |                                                           |
|                     v                                                           |
|                 Checksum C                                                      |
|                     |                                                           |
|   Transmitted Packet: [ W1 ] [ W2 ] [ W3 ] ... [ Wk ] [ Checksum C ]            |
|                                                                                 |
|   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Transmission Channel ~~~~~~~~~~~~~~~~~~~~~~~~~   |
|                                                                                 |
|   RECEIVER (Checker):                                                           |
|   Received Packet:    [ W1' ] [ W2' ] [ W3' ] ... [ Wk' ] [ C' ]                |
|                                       |                                         |
|                                       v                                         |
|          One's Complement Summation: W1' + W2' + ... + Wk' + C'                 |
|                                       |                                         |
|                                       v Wrapped Sum                             |
|                         [ Invert All Bits: NOT(Sum) ]                           |
|                                       |                                         |
|                             Is Result == 0 ?                                    |
|                                /          \\                                     |
|                             [YES]        [NO]                                   |
|                              |             |                                    |
|                              v             v                                    |
|                        NO ERROR DETECTED! ERROR DETECTED!                       |
|                        (Accept Data)      (Drop Frame)                          |
+---------------------------------------------------------------------------------+
    `,
    technicalDetails: `
      <p><strong>One's Complement Arithmetic Fundamentals (Forouzan Section 10.5):</strong></p>
      <p>In standard unsigned arithmetic with $n$ bits, numbers range from $0$ to $2^n - 1$. When adding numbers, any carry beyond $n$ bits is normally stored in a separate carry register. In <strong>one's complement arithmetic</strong>, the extra leftmost carry bits are <em>wrapped around and added to the least significant bits</em>.</p>
      <p>For example, in 4-bit one's complement ($2^4 - 1 = 15$):</p>
      <ul>
        <li>The decimal number 21 in binary is <code>10101</code> (5 bits). The leftmost bit (<code>1</code>) is wrapped: <code>0101 + 1 = 0110</code> (which is 6). Indeed, $21 \\pmod{15} = 6$.</li>
        <li>The negative of 6 is obtained by inverting <code>0110</code> $\\to$ <code>1001</code> (which is 9, or $15 - 6 = 9$).</li>
      </ul>
      <p><strong>Checksum vs CRC vs Parity Comparison:</strong></p>
      <table class="wiki-table">
        <thead><tr><th>Feature</th><th>Simple Parity</th><th>Internet Checksum</th><th>Cyclic Redundancy Check (CRC-32)</th></tr></thead>
        <tbody>
          <tr><td><strong>Mathematical Basis</strong></td><td>Bitwise XOR</td><td>One's Complement Addition</td><td>Modulo-2 Polynomial Division</td></tr>
          <tr><td><strong>Implementation</strong></td><td>Hardware gate</td><td>Software ALU instructions (fast CPU add)</td><td>Hardware LFSR shift registers</td></tr>
          <tr><td><strong>Single-Bit Detection</strong></td><td>100%</td><td>100%</td><td>100%</td></tr>
          <tr><td><strong>Burst Error Detection</strong></td><td>Very poor</td><td>Moderate (catches most bursts $\\le 16$ bits)</td><td><strong>100%</strong> of bursts $\\le 32$ bits</td></tr>
          <tr><td><strong>Compensating Error Flaw</strong></td><td>Vulnerable to even flips</td><td><strong>Vulnerable</strong> if bit increases match bit decreases</td><td><strong>Immune</strong> due to non-commutative division</td></tr>
          <tr><td><strong>Primary OSI Layer</strong></td><td>Physical / Serial</td><td><strong>Network & Transport (IPv4, TCP, UDP)</strong></td><td><strong>Data Link (Ethernet, Wi-Fi)</strong></td></tr>
        </tbody>
      </table>
    `,
    workedExamples: {
      level1: "<strong>Forouzan Example 10.22 (Step-by-Step 4-Bit Walkthrough):</strong><br>Suppose the sender has five 4-bit numbers: $7, 11, 12, 0, 6$.<br><br><strong>Sender Step-by-Step Calculation:</strong><br>1. Binary values: $7 = 0111_2, 11 = 1011_2, 12 = 1100_2, 0 = 0000_2, 6 = 0110_2$.<br>2. Sum in decimal: $7 + 11 + 12 + 0 + 6 = 36$.<br>3. Binary sum: $36 = 100100_2$ (6 bits).<br>4. Wrap the two leftmost carry bits ($10_2 = 2$):<br>$\\text{Wrapped Sum} = 0100_2 + 10_2 = 0110_2 \\text{ (decimal 6)}$.<br>5. Invert all bits (one's complement): $\\text{NOT}(0110_2) = \\mathbf{1001_2} \\text{ (decimal 9)}$.<br>6. Checksum = $\\mathbf{9}$. Transmitted sequence: $(7, 11, 12, 0, 6, 9)$.<br><br><strong>Receiver Step-by-Step Verification:</strong><br>1. Receiver adds all 6 received items: $7 + 11 + 12 + 0 + 6 + 9 = 45$.<br>2. Binary sum: $45 = 101101_2$ (6 bits).<br>3. Wrap the two leftmost carry bits ($10_2 = 2$):<br>$\\text{Wrapped Sum} = 1101_2 + 10_2 = 1111_2 \\text{ (decimal 15, all 1s)}$.<br>4. Invert all bits: $\\text{NOT}(1111_2) = \\mathbf{0000_2} \\text{ (decimal 0)}$.<br>5. <strong>Decision:</strong> Result is 0! No error detected; data accepted.",
      level2: "<strong>Receiver Error Detection Case:</strong> Suppose in the example above, electrical noise corrupts the second number from $11$ ($1011_2$) to $9$ ($1001_2$). Show how the receiver detects the error.<br><br><strong>Receiver Calculation:</strong><br>1. Received items: $(7, 9, 12, 0, 6, 9)$.<br>2. Sum = $7 + 9 + 12 + 0 + 6 + 9 = 43$.<br>3. Binary sum: $43 = 101011_2$.<br>4. Wrap leftmost carry ($10_2 = 2$): $1011_2 + 10_2 = 1101_2$ (13).<br>5. Invert all bits: $\\text{NOT}(1101_2) = \\mathbf{0010_2} \\text{ (decimal 2)}$.<br>6. <strong>Diagnosis:</strong> Since $0010_2 \\ne 0000_2$, the receiver detects the corruption and <strong>discards the packet</strong>!",
      level3: "<strong>Vulnerability Analysis (Compensating Errors):</strong> Construct a scenario where errors occur but the checksum fails to detect them.<br><br><strong>Analysis:</strong> Suppose during transmission, the first number increases by 2 ($7 \\to 9$) and the third number decreases by 2 ($12 \\to 10$).<br>Received data: $(9, 11, 10, 0, 6, 9)$.<br>Sum at receiver = $9 + 11 + 10 + 0 + 6 + 9 = 45$.<br>Notice the sum is still 45! The carry wrap gives 15, and inversion yields 0! The receiver accepts the corrupted data without detecting any error. This weakness (inability to detect compensating errors or byte swaps) is why high-speed Data Link Layers rely on CRC instead of Checksums."
    },
    advantagesLimitations: `
      <table class="wiki-table">
        <thead><tr><th>Advantages of Checksum</th><th>Limitations & Weaknesses</th></tr></thead>
        <tbody>
          <tr><td>Very easy and fast to compute in software on host CPUs using native 16-bit adders.</td><td>Cannot detect compensating errors where opposing bit flips cancel out.</td></tr>
          <tr><td>Requires minimal memory overhead (only 16 bits per packet).</td><td>Vulnerable to byte swaps: <code>0x1234</code> + <code>0x5678</code> produces the exact same sum as <code>0x5678</code> + <code>0x1234</code>.</td></tr>
          <tr><td>Verifying zero at receiver requires zero complex comparator hardware.</td><td>Inferior burst-error detection compared to Cyclic Redundancy Check (CRC).</td></tr>
        </tbody>
      </table>
    `,
    whereUsed: [
      "IPv4 Header Checksum (RFC 791) - verifies router-to-router packet header integrity",
      "TCP Segment Checksum (RFC 793) - verifies end-to-end transport payload and pseudo-header",
      "UDP Datagram Checksum (RFC 768) - optional lightweight transport error checking",
      "ICMP Echo Request and Reply messages (RFC 792)"
    ],
    quiz: [
      {
        question: "How does the receiver verify that a packet with a checksum is error-free?",
        options: [
          "It adds all data words plus the checksum in one's complement; if the inverted result is exactly 0, no error is detected.",
          "It divides the packet by a generator polynomial and checks for remainder 0.",
          "It counts the number of 1s in the packet and tests if it is an even number.",
          "It sends the packet back to the sender for confirmation."
        ],
        correct: 0,
        explanation: "Because the checksum is the 1's complement of the sum, adding all data words plus the checksum results in all 1s; inverting all 1s yields 0, confirming no error."
      },
      {
        question: "What is 'end-around carry' in one's complement addition?",
        options: [
          "Any overflow carry bit from the most significant position is wrapped around and added to the least significant bit.",
          "The carry bit is discarded completely.",
          "The carry bit is shifted left by 8 bits.",
          "The carry bit is sent as a separate frame."
        ],
        correct: 0,
        explanation: "In one's complement arithmetic, an overflow beyond the word size is wrapped around and added back into the lowest-order bit."
      },
      {
        question: "Which of the following is a known limitation of the Internet Checksum that CRC avoids?",
        options: [
          "It fails to detect compensating errors where one bit flips from 0 to 1 and another bit flips from 1 to 0 in the same column.",
          "It cannot be calculated on computers with 64-bit processors.",
          "It requires 128 redundant bits.",
          "It can only be used on fiber optic cables."
        ],
        correct: 0,
        explanation: "Because simple addition is commutative and associative, compensating errors that leave the total sum unchanged go completely undetected by checksums."
      }
    ],
    references: [
      { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, Chapter 10.5 'Checksum', pp. 334–337.", url: "" },
      { cite: "IETF RFC 1071, 'Computing the Internet Checksum', RT Braden, DA Borman, C. Partridge, September 1988.", url: "https://www.ietf.org/rfc/rfc1071.txt" }
    ]
  }
};

// Append to js/topics_u2_additional.js
let fileContent = fs.readFileSync('js/topics_u2_additional.js', 'utf8');

// Also make available as 'checksum' and 'u2-checksum'
const topicCode = `
// Append Checksum topic
TOPICS_U2_ADDITIONAL["u2-checksum"] = ${JSON.stringify(checksumTopic, null, 2)};
TOPICS_U2_ADDITIONAL["checksum"] = TOPICS_U2_ADDITIONAL["u2-checksum"];
`;

// Insert before the window assignment
const target = "if (typeof window !== 'undefined') {";
if (!fileContent.includes('"u2-checksum"')) {
  fileContent = fileContent.replace(target, topicCode + '\n' + target);
  fs.writeFileSync('js/topics_u2_additional.js', fileContent, 'utf8');
  console.log('Successfully appended u2-checksum to js/topics_u2_additional.js');
} else {
  console.log('u2-checksum already in js/topics_u2_additional.js');
}

