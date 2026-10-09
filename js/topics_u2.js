// Unit II Topics Database: Data Link Layer & Reliable Transfer
// Matches Kurose & Ross Chapter 3 & 6, IEEE 802.3
const TOPICS_U2 = {
  "framing": {
    id: "framing",
    title: "Framing & Boundaries",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 2 — Standard Topic",
    category: "datalink",
    difficulty: "Core",
    readingTime: "6 min read",
    standard: "IEEE 802.3 / HDLC / PPP",
    oneLiner: "Encapsulating network-layer packets into link-layer frames with recognizable start and end delimiters.",
    quickAnswer: "Framing breaks an unbroken physical bitstream into discrete frames with headers, payloads, and error-check trailers.",
    whyItMatters: "Physical links transmit unbroken bitstreams; receivers must detect where each frame begins and ends to parse addresses and verify integrity.",
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "IEEE 802.3, ISO 13239 (HDLC), RFC 1661 (PPP)",
      type: "Data Link Delineation",
      keyFormula: "\\text{Frame} = \\text{Flag} + \\text{Header} + \\text{Payload} + \\text{FCS} + \\text{Flag}",
      prerequisites: ["encapsulation", "packet"],
      relatedConcepts: ["byte-stuffing", "bit-stuffing", "crc", "ethernet"],
      compareWith: ["packet"],
      primaryUses: ["Ethernet, PPP, HDLC, Wi-Fi 802.11"]
    },
    sections: {
      overview: `The physical layer delivers an unbroken stream of raw bits. The Data Link Layer must break this bitstream into discrete <strong>frames</strong> so that hardware addresses, error checks, and control headers can be applied. The receiver must detect frame boundaries without mistaking payload data for control flags.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Byte-Count Framing:</strong> An integer in the header indicates frame byte length. (Fragile: if noise flips the count field, synchronization is permanently lost).</li>
          <li><strong>Byte Stuffing (Sentinel Framing):</strong> Marks boundaries with delimiter flag \`0x7E\`. An escape byte (\`0x7D\`) is stuffed before payload bytes that match flags.</li>
          <li><strong>Bit Stuffing:</strong> Delimiter is \`01111110\` (six 1s). The hardware stuffs a '0' after any sequence of five consecutive '1's in the data.</li>
          <li><strong>Physical Layer Coding Violations:</strong> In 4B/5B or Manchester encoding, unused line signals mark boundaries directly in hardware.</li>
        </ol>`,
      diagram: `
Network Layer Packet
         |
         v
+----------+-----------------------------+----------+
|  HEADER  |        PACKET PAYLOAD       | TRAILER  |
| (Src/Dst)|                             |  (CRC)   |
+----------+-----------------------------+----------+
    ^                                         ^
[Preamble / Start Flag]                  [Inter-Frame Gap / End Flag]`,
      technicalDetails: `Comparison of framing strategies:
        <ul class="wiki-bullet-list">
          <li><strong>Byte Count:</strong> No stuffing required, but 1-bit channel noise leads to complete framing catastrophe.</li>
          <li><strong>PPP Byte Stuffing (RFC 1661):</strong> Flag \`0x7E\` (01111110), Escape byte \`0x7D\`. Payload byte \`0x7E\` is transmitted as \`0x7D 0x5E\`.</li>
          <li><strong>HDLC Bit Stuffing:</strong> Pure bit-level hardware rule. Prevents six consecutive 1s from appearing in data.</li>
        </ul>`,
      workedExample: `Sender wants to transmit byte sequence: \`[A] [0x7E] [B] [0x7D] [C]\`.
        <br><strong>With Byte Stuffing:</strong>
        <br>Output Frame: \`[0x7E] [A] [0x7D, 0x5E] [B] [0x7D, 0x5D] [C] [0x7E]\`.
        <br>Receiver strips \`0x7D\` and XORs following byte with \`0x20\`, restoring original payload.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Framing Method</th><th>Advantages</th><th>Disadvantages</th></tr></thead>
          <tbody>
            <tr><td>Byte Count</td><td>Zero stuffing overhead</td><td>Catastrophic framing desync on noise</td></tr>
            <tr><td>Byte Stuffing</td><td>Simple software processing</td><td>Variable frame length expansion up to 100%</td></tr>
            <tr><td>Bit Stuffing</td><td>Low overhead (~1 bit per 5 ones)</td><td>Requires hardware bit-level shift registers</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Ethernet frames on copper/fiber", "Point-to-Point Protocol (PPP) over serial lines", "HDLC industrial serial links"],
      commonMistakes: "Thinking Ethernet uses bit stuffing. Modern Ethernet (IEEE 802.3) uses a 7-byte preamble (10101010...) followed by a 1-byte Start Frame Delimiter (10101011) and an Inter-Frame Gap (IFG) of 96 bit times.",
      compareWith: { title: "Byte Stuffing vs Bit Stuffing", note: "Byte stuffing operates on whole 8-bit octets using ESC bytes. Bit stuffing operates bit-by-bit inserting a '0' after five consecutive '1's." },
      practice: {
        question: "In HDLC bit stuffing, what does the transmitter insert after encountering five consecutive '1's?",
        choices: ["A '1' bit", "A '0' bit", "An ESC byte", "A parity bit"],
        correctIndex: 1,
        explanation: "In HDLC, the sender automatically stuffs a '0' bit after every five consecutive '1's to guarantee the flag pattern 01111110 never appears in the payload."
      },
      references: [
        { cite: "Kurose & Ross, Chapter 6.1: Introduction to the Link Layer", url: "https://gaia.cs.umass.edu/kurose_ross/" },
        { cite: "RFC 1661: The Point-to-Point Protocol (PPP)", url: "https://datatracker.ietf.org/doc/html/rfc1661" }
      ]
    },
    prevTopicId: "encapsulation",
    nextTopicId: "byte-stuffing"
  },

  "byte-stuffing": {
    id: "byte-stuffing",
    title: "Byte Stuffing (Character-Oriented Framing)",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 1 — Concept Card",
    category: "datalink",
    difficulty: "Core",
    readingTime: "4 min read",
    standard: "RFC 1661 (PPP)",
    oneLiner: "Inserting an Escape byte (0x7D) before flag delimiters (0x7E) that occur inside the payload.",
    quickAnswer: "Byte stuffing prevents data bytes matching delimiter flags from being falsely recognized by the receiver as the end of a frame.",
    whyItMatters: "Character-oriented protocols (like PPP) must safely transmit arbitrary binary files containing 0x7E without corrupting frame boundaries.",
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "RFC 1661, ISO 3309",
      type: "Framing Delimitation",
      keyFormula: "\\text{Escape Rule: } 0x7E \\to 0x7D \\ 0x5E",
      prerequisites: ["framing"],
      relatedConcepts: ["bit-stuffing", "framing"],
      compareWith: ["bit-stuffing"],
      primaryUses: ["PPP Over Dialup/Cellular, Serial Communications"]
    },
    sections: {
      overview: `<strong>Byte stuffing</strong> (also called character stuffing) is a framing mechanism where special flag bytes mark frame boundaries, and an escape byte (ESC) is dynamically prepended to any payload byte identical to the flag.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li>Start and end of frame are marked by Flag byte \`0x7E\` (\`01111110\`).</li>
          <li>If the payload contains \`0x7E\`, sender inserts Escape byte \`0x7D\` and XORs with \`0x20\`: \`0x7D 0x5E\`.</li>
          <li>If the payload contains \`0x7D\`, sender transmits \`0x7D 0x5D\`.</li>
          <li>Receiver checks for \`0x7D\`, discards it, and recovers original data byte.</li>
        </ol>`,
      diagram: `
Original Data:   [ FLAG: 0x7E ]   [ ESC: 0x7D ]
Stuffed Output:  [ 0x7D, 0x5E ]   [ 0x7D, 0x5D ]`,
      technicalDetails: `Worst-case overhead occurs when transmitting a file consisting entirely of 0x7E and 0x7D bytes, doubling frame size (100% expansion overhead).`,
      workedExample: `Payload bytes: \`[41] [7E] [42] [7D] [43]\`.
        <br>Transmitted on wire: \`[7E] [41] [7D, 5E] [42] [7D, 5D] [43] [7E]\`.
        <br>Receiver decodes back to original \`[41, 7E, 42, 7D, 43]\`.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Works on standard byte-oriented UART serial ports</td><td>Variable packet size expansion</td></tr>
            <tr><td>Simple software loop implementation</td><td>Wastes bandwidth compared to bit stuffing</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["PPP (Point-to-Point Protocol)", "Legacy Bisync and SLIP connections"],
      commonMistakes: "Forgetting to escape the escape byte itself. If 0x7D appears in data, it must also be escaped, otherwise the receiver will treat the next byte as a control command.",
      compareWith: { title: "Byte Stuffing vs Bit Stuffing", note: "Byte stuffing handles 8-bit bytes in software; bit stuffing operates bit-by-bit in hardware." },
      practice: {
        question: "In PPP byte stuffing, what two bytes are transmitted if the data contains 0x7E?",
        choices: ["0x7E 0x7E", "0x7D 0x5E", "0x7D 0x7E", "0x00 0x7E"],
        correctIndex: 1,
        explanation: "PPP replaces 0x7E with the two-byte sequence 0x7D 0x5E (0x7E XOR 0x20 = 0x5E)."
      },
      references: [
        { cite: "RFC 1662: PPP in HDLC-like Framing", url: "https://datatracker.ietf.org/doc/html/rfc1662" }
      ]
    },
    prevTopicId: "framing",
    nextTopicId: "bit-stuffing"
  },

  "bit-stuffing": {
    id: "bit-stuffing",
    title: "HDLC Bit Stuffing Algorithm",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 1 — Concept Card",
    category: "datalink",
    difficulty: "Core",
    readingTime: "5 min read",
    standard: "ISO 13239 (HDLC)",
    oneLiner: "Automatically inserting a '0' after every five consecutive '1's in the data bitstream.",
    quickAnswer: "Bit stuffing ensures the delimiter flag pattern 01111110 never appears inside frame data by inserting a zero after every five consecutive ones.",
    whyItMatters: "Bit stuffing achieves frame boundary delimitation with minimal overhead (~1 bit per 5 consecutive ones) directly inside hardware shift registers.",
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "ISO 13239, ITU-T X.25",
      type: "Bit-Level Framing",
      keyFormula: "\\text{Rule: Five 1s } \\to \\text{ Insert '0'}",
      prerequisites: ["framing"],
      relatedConcepts: ["byte-stuffing", "framing", "error-detection"],
      compareWith: ["byte-stuffing"],
      primaryUses: ["HDLC, USB 2.0 (NRZI Bit Stuffing), CAN Bus"]
    },
    sections: {
      overview: `In bit-oriented protocols like HDLC, frame boundaries are demarcated by the unique 8-bit flag <strong><code>01111110</code></strong>. To prevent arbitrary user payloads from accidentally containing this sequence, transmitters enforce <strong>bit stuffing</strong> in hardware.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Transmitter Rule:</strong> Scans payload bit-by-bit. Whenever it outputs five consecutive 1s (\`11111\`), it unconditionally outputs a \`0\`.</li>
          <li><strong>Receiver Rule:</strong> Scans incoming bits. When it encounters five consecutive 1s:
            <ul>
              <li>If the 6th bit is \`0\`, it is discarded (it was stuffed).</li>
              <li>If the 6th bit is \`1\` and 7th bit is \`0\`, it recognizes the Flag \`01111110\`!</li>
              <li>If the 6th and 7th bits are \`1\`, it signals an Abort / Error condition.</li>
            </ul>
          </li>
        </ol>`,
      diagram: `
Sender Data:     0 1 1 1 1 1 1 0 1 1 1 1 1 0
                             ^           ^
Stuffed Output:  0 1 1 1 1 1[0]1 0 1 1 1 1 1[0]0`,
      technicalDetails: `Average overhead of bit stuffing: For purely random data, the probability of five consecutive ones is $(1/2)^5 = 1/32 \\approx 3.125\\%$. Thus, average frame expansion is roughly 3%, far superior to byte stuffing.`,
      workedExample: `Payload: \`0111111011111010\`.
        <br>1. Bits \`0 1 1 1 1 1\` $\\to$ Five 1s! Stuff a '0' $\\to$ \`0 1 1 1 1 1 [0]\`
        <br>2. Next bit \`1\`, then \`0 1 1 1 1 1\` $\\to$ Five 1s! Stuff a '0' $\\to$ \`0 1 1 1 1 1 [0] 0 1 0\`
        <br>Transmitted bitstream: \`011111010111110010\`.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Minimal transmission overhead (~3%)</td><td>Requires hardware shift-register logic</td></tr>
            <tr><td>Works for arbitrary bitstream sizes (not limited to bytes)</td><td>Single bit error can misalign frame boundary</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["HDLC and SDLC synchronous serial links", "USB 2.0 (NRZI synchronization bit stuffing)", "CAN bus in automotive networks"],
      commonMistakes: "Thinking the transmitter stuffs a zero only if the next bit is a one. The sender inserts a zero regardless of what the next bit was!",
      compareWith: { title: "HDLC Bit Stuffing vs Byte Stuffing", note: "Bit stuffing inserts individual 0 bits in hardware; byte stuffing inserts full 8-bit ESC bytes in software." },
      practice: {
        question: "Given data stream 01111100, what is the bit-stuffed output?",
        choices: ["011111000", "01111100", "01111100", "011111000"],
        correctIndex: 1,
        explanation: "After five 1s, a 0 is stuffed. The next bit is already 0, so output is: 011111[0]00."
      },
      references: [
        { cite: "ISO/IEC 13239: Information technology -- High-level data link control (HDLC) procedures", url: "https://www.iso.org/" }
      ]
    },
    prevTopicId: "byte-stuffing",
    nextTopicId: "error-detection"
  },

  "error-detection": {
    id: "error-detection",
    title: "Error Detection vs Correction",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 2 — Standard Topic",
    category: "datalink",
    difficulty: "Core",
    readingTime: "6 min read",
    standard: "Kurose & Ross Chapter 6.2",
    oneLiner: "Mathematical techniques allowing a receiver to detect and optionally correct bit errors introduced by channel noise.",
    quickAnswer: "Error detection identifies corrupted frames so they can be discarded and retransmitted; error correction (FEC) reconstructs the original data without retransmission.",
    whyItMatters: "Electrical thermal noise, attenuation, and wireless interference flip bits in transit. Without error control, corrupt data would crash operating systems and applications.",
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "Kurose & Ross Ch 6",
      type: "Channel Coding Foundation",
      keyFormula: "d_{\\text{min}} \\ge 2t + 1 \\text{ (Correction)}, \\ d_{\\text{min}} \\ge d + 1 \\text{ (Detection)}",
      prerequisites: ["framing"],
      relatedConcepts: ["parity", "checksum", "crc", "hamming-code"],
      compareWith: ["hamming-code"],
      primaryUses: ["Ethernet FCS, Wi-Fi 802.11, Deep Space Telemetry"]
    },
    sections: {
      overview: `Transmission media are subject to electromagnetic interference, attenuation, and thermal noise. The link layer appends redundant error-detection bits (EDC) to the frame. The receiver uses the received bits and EDC to verify whether errors occurred.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Sender:</strong> Computes error-detection bits $EDC = f(D)$ over data $D$ and transmits $[D \\mid EDC]$.</li>
          <li><strong>Channel:</strong> May introduce bit flips: received as $[D' \\mid EDC']$.</li>
          <li><strong>Receiver:</strong> Recomputes $EDC'' = f(D')$. If $EDC'' \\neq EDC'$, an error is detected.</li>
          <li><strong>Decision:</strong> Frame is dropped (ARQ request) or corrected (FEC).</li>
        </ol>`,
      diagram: `
Sender:    Data D  -----> [ Calculate EDC ] -----> Transmit: [ D | EDC ]
                                                                 |
Channel:   Noise & Interferences                              | Bit Flips!
                                                                 v
Receiver:  Received: [ D' | EDC' ] ---> [ Recompute f(D') ] =?= EDC'
                                             |
                                    +--------+--------+
                                    |                 |
                                 Match (OK)     Mismatch (CORRUPT!)`,
      technicalDetails: `Error Detection vs Forward Error Correction (FEC):
        <ul class="wiki-bullet-list">
          <li><strong>Detection + Retransmission (ARQ):</strong> Low overhead. Perfect for low-latency wired links where packet error rate (PER) is low.</li>
          <li><strong>Forward Error Correction (FEC):</strong> Higher overhead (many redundant bits). Mandatory for high-latency links (satellite, deep space) or real-time audio where retransmission is too slow.</li>
          <li><strong>Hamming Distance ($d_{\\text{min}}$):</strong> To detect $e$ errors, code requires $d_{\\text{min}} \\ge e + 1$. To correct $t$ errors, code requires $d_{\\text{min}} \\ge 2t + 1$.</li>
        </ul>`,
      workedExample: `To correct 1 bit error ($t=1$), minimum Hamming distance must be $d_{\\text{min}} \\ge 2(1) + 1 = 3$. If two valid codewords are \`00000\` and \`11111\`, received \`00001\` has distance 1 from \`00000\` and distance 4 from \`11111\`, correcting safely to \`00000\`.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Technique</th><th>Main Idea</th><th>Corrects?</th><th>Typical Application</th></tr></thead>
          <tbody>
            <tr><td>Parity</td><td>Count number of 1s</td><td>No (2D can correct 1)</td><td>RAM parity, UART</td></tr>
            <tr><td>Checksum</td><td>1's complement sum</td><td>No</td><td>TCP / UDP / IP</td></tr>
            <tr><td>CRC</td><td>Polynomial XOR division</td><td>No</td><td>Ethernet, Wi-Fi</td></tr>
            <tr><td>Hamming Code</td><td>Positioned parity bits</td><td>Yes (1 bit)</td><td>ECC RAM, Satellite</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Ethernet (CRC-32 FCS)", "TCP/IP transport checksums", "ECC computer memory"],
      commonMistakes: "Assuming CRC can correct errors. CRC is purely an error detection code; it discards corrupted frames, relying on higher-layer ARQ to retransmit.",
      compareWith: { title: "Error Detection vs Error Correction", note: "Detection spots errors and requests retransmission. Correction mathematically reconstructs original bits without retransmission." },
      practice: {
        question: "What is the minimum Hamming distance required to detect up to 3 bit errors?",
        choices: ["3", "4", "6", "7"],
        correctIndex: 1,
        explanation: "To detect $e$ bit errors, the minimum Hamming distance must be $d_{\\text{min}} \\ge e + 1 = 3 + 1 = 4$."
      },
      references: [
        { cite: "Kurose & Ross Chapter 6.2: Error-Detection and -Correction Techniques", url: "https://gaia.cs.umass.edu/kurose_ross/" }
      ]
    },
    prevTopicId: "bit-stuffing",
    nextTopicId: "parity"
  },

  "parity": {
    id: "parity",
    title: "Parity Checks (1D & 2D Parity Matrix)",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 1 — Concept Card",
    category: "datalink",
    difficulty: "Foundation",
    readingTime: "4 min read",
    standard: "Kurose & Ross Chapter 6.2",
    oneLiner: "Appending a single bit to ensure the total count of 1-bits is always even (or odd).",
    quickAnswer: "1D parity detects all single-bit errors; 2D parity organizes data in a matrix to detect and correct single-bit errors.",
    whyItMatters: "Parity is the simplest, lowest-overhead error check in hardware, widely used in CPU caches and asynchronous serial ports.",
    infobox: {
      layer: "Layer 2 / Physical / Hardware",
      standard: "UART RS-232, Kurose & Ross",
      type: "Linear Block Check",
      keyFormula: "\\text{Even Parity: } \\sum b_i \\equiv 0 \\pmod 2",
      prerequisites: ["error-detection"],
      relatedConcepts: ["checksum", "crc", "hamming-code"],
      compareWith: ["checksum"],
      primaryUses: ["UART Serial, SCSI buses, CPU Cache RAM"]
    },
    sections: {
      overview: `A <strong>parity bit</strong> is added to a string of binary data to ensure the total number of 1-bits is either even (even parity) or odd (odd parity). In <strong>Two-Dimensional Parity</strong>, data is arranged in a grid, calculating parity for each row and each column.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Even Parity:</strong> Sender appends \`1\` if the number of 1s is odd, and \`0\` if even. Total 1s is always even.</li>
          <li><strong>Odd Parity:</strong> Sender appends \`1\` if the number of 1s is even, and \`0\` if odd. Total 1s is always odd.</li>
          <li><strong>2D Parity Correction:</strong> A single flipped bit causes a parity error in exactly one row AND one column. The intersection pinpointing the corrupt bit allows instant correction!</li>
        </ol>`,
      diagram: `
Row Data         Row Parity
1 0 1 0 1   --->     1
0 1 1 1 0   --->     1
1 1 0 0 1   --->     1  (Bit flips to 0!)
-----------------------
0 0 0 1 0   <--- Column Parity
       ^
Intersection of bad row and bad column = (Row 3, Col 4) corrected!`,
      technicalDetails: `1D parity detects all odd numbers of errors (1, 3, 5 bit flips) but fails to detect any even number of errors (2, 4 bit flips). 2D parity detects all 1, 2, and 3-bit errors, and corrects all 1-bit errors.`,
      workedExample: `Data: \`1011001\`. Number of 1s is 4 (already even).
        <br>For Even Parity: Append \`0\` $\\to$ Transmitted: \`10110010\`.
        <br>For Odd Parity: Append \`1\` $\\to$ Transmitted: \`10110011\`.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Extremely low overhead (single bit)</td><td>1D parity detects 0% of 2-bit errors</td></tr>
            <tr><td>Single XOR gate in hardware</td><td>Ineffective against burst errors</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["UART serial communication", "Memory bus error detection", "Keyboard and mouse PS/2 protocols"],
      commonMistakes: "Assuming 1D parity can tell which bit was flipped. 1D parity only indicates that an error occurred somewhere, with zero localization.",
      compareWith: { title: "1D Parity vs 2D Parity", note: "1D parity detects single errors only. 2D parity localizes the exact row and column, enabling single-bit correction." },
      practice: {
        question: "With even parity, what is the parity bit for the data word 1101010?",
        choices: ["0", "1", "Cannot be determined", "Both 0 and 1"],
        correctIndex: 0,
        explanation: "Data 1101010 has four '1' bits, which is already even. Therefore, the even parity bit is 0."
      },
      references: [
        { cite: "Kurose & Ross Chapter 6.2: Parity Checks", url: "https://gaia.cs.umass.edu/kurose_ross/" }
      ]
    },
    prevTopicId: "error-detection",
    nextTopicId: "checksum"
  },

  "checksum": {
    id: "checksum",
    title: "Internet Checksum (16-Bit 1's Complement)",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 2 — Standard Topic",
    category: "datalink",
    difficulty: "Core",
    readingTime: "5 min read",
    standard: "RFC 1071 (Computing the Internet Checksum)",
    oneLiner: "A 16-bit error-detection code calculated by summing 16-bit words using 1's complement arithmetic.",
    quickAnswer: "The Internet Checksum adds all 16-bit words with end-around carries and takes the 1's complement (inverting all bits). The receiver sums all words plus the checksum; a valid result is all 1s (0xFFFF).",
    whyItMatters: "Standardized across IPv4, TCP, and UDP, the Internet Checksum is fast to compute in software on general-purpose CPUs.",
    infobox: {
      layer: "Layer 3 (IP) & Layer 4 (TCP/UDP)",
      standard: "RFC 1071, RFC 791, RFC 768",
      type: "Additive Error Check",
      keyFormula: "\\text{Checksum} = \\sim (\\sum W_i \\pmod{2^{16} - 1})",
      prerequisites: ["error-detection"],
      relatedConcepts: ["udp-checksum", "parity", "crc"],
      compareWith: ["crc"],
      primaryUses: ["TCP Segment Header, UDP Datagram, IPv4 Header"]
    },
    sections: {
      overview: `The <strong>Internet Checksum</strong> is the error-detection mechanism used in TCP, UDP, and IPv4. It treats data as a sequence of 16-bit integers, adds them using 1's complement arithmetic, and inverts the sum.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Sender Partitioning:</strong> Treats packet bytes as a series of 16-bit integers. (Pads a trailing zero byte if odd length).</li>
          <li><strong>Summation:</strong> Adds all 16-bit words. Any carry out of the most significant bit (bit 16) is wrapped around and added to the least significant bit.</li>
          <li><strong>1's Complement Inversion:</strong> Flips all bits (\`~sum\`) to create the 16-bit checksum.</li>
          <li><strong>Receiver Verification:</strong> Sums all 16-bit words including the checksum. If no errors occurred, the sum is strictly \`0xFFFF\` (all 1s).</li>
        </ol>`,
      diagram: `
Word 1:    1 1 0 0 0 1 0 0   1 0 1 0 1 0 0 1
Word 2:    0 1 1 0 1 1 0 1   0 1 0 1 0 1 0 1
---------------------------------------------
Sum:     1 0 0 1 1 0 0 0 1   1 1 1 1 1 1 1 0
Wrap Carry:                +               1
---------------------------------------------
Wrapped:   0 0 1 1 0 0 1 0   0 0 0 0 0 0 0 1
Checksum (Invert): 1 1 0 0 1 1 0 1  1 1 1 1 1 1 1 0`,
      technicalDetails: `Why 1's complement?
        <br>1's complement arithmetic is independent of system endianness: whether an architecture is Little-Endian (x86) or Big-Endian (ARM/network order), the 16-bit 1's complement sum produces the identical bit pattern!`,
      workedExample: `Summing two 16-bit words: \`0x4500\` and \`0x003C\`.
        <br>Sum: \`0x453C\`.
        <br>Invert bits: \`0xBA43\`.
        <br>Receiver sums: \`0x4500 + 0x003C + 0xBA43 = 0xFFFF\`. Valid!`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Fast and lightweight to compute in software on CPU</td><td>Vulnerable to compensating bit errors (swapped bytes undetected)</td></tr>
            <tr><td>Endian-neutral calculation</td><td>Weaker protection than CRC against burst noise</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["IPv4 header verification (RFC 791)", "TCP reliability checks (RFC 9293)", "UDP optional checksum (RFC 768)"],
      commonMistakes: "Forgetting the end-around carry. In standard 2's complement addition, carries out of bit 16 are dropped; in 1's complement, the carry bit must be added back to bit 0.",
      compareWith: { title: "Internet Checksum vs CRC", note: "Checksum is lightweight and software-friendly. CRC is polynomial-based, detecting all burst errors up to generator degree, but requires hardware XOR shift registers." },
      practice: {
        question: "When a receiver sums all packet 16-bit words along with the valid checksum, what result indicates zero error?",
        choices: ["0x0000", "0xFFFF", "0x0001", "0x1000"],
        correctIndex: 1,
        explanation: "Because the checksum is the bitwise inverse of the sum, adding the words plus the checksum produces all 1s (0xFFFF in hexadecimal)."
      },
      references: [
        { cite: "RFC 1071: Computing the Internet Checksum", url: "https://datatracker.ietf.org/doc/html/rfc1071" }
      ]
    },
    prevTopicId: "parity",
    nextTopicId: "crc"
  },

  "crc": {
    id: "crc",
    title: "Cyclic Redundancy Check (CRC)",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 3 — Major Topic / Module",
    category: "datalink",
    difficulty: "Core",
    readingTime: "7 min read",
    standard: "IEEE 802.3 (CRC-32) / Kurose & Ross Ch 6",
    oneLiner: "A polynomial error-detection code using modulo-2 arithmetic (XOR binary division) to detect burst noise.",
    quickAnswer: "CRC treats bitstrings as polynomials over GF(2), divides the data appended with r zeros by a generator polynomial G, and appends the remainder R as the Frame Check Sequence (FCS).",
    whyItMatters: "CRC detects all single-bit errors, double-bit errors, odd numbers of bit flips, and burst errors of length up to r bits, making it the gold standard in link-layer hardware.",
    infobox: {
      layer: "Layer 2 (Data Link FCS)",
      standard: "IEEE 802.3 (Ethernet), ITU-T CRC-32",
      type: "Polynomial Error-Detection Code",
      keyFormula: "T(x) = D(x) \\cdot x^r + R(x) \\quad [R(x) = D(x)x^r \\pmod{G(x)}]",
      prerequisites: ["error-detection"],
      relatedConcepts: ["ethernet", "parity", "checksum", "hamming-code"],
      compareWith: ["checksum"],
      primaryUses: ["Ethernet (CRC-32), Wi-Fi (802.11 FCS), SATA Hard Drives, ZIP files"]
    },
    sections: {
      overview: `A <strong>Cyclic Redundancy Check (CRC)</strong> is an error-detecting code based on polynomial division in Galois Field $GF(2)$. The sender and receiver agree on a generator polynomial $G$ of degree $r$ ($r+1$ bits). CRC achieves near-perfect detection of burst noise in physical hardware with trivial XOR shift registers.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Generator Agreement:</strong> Sender and receiver agree on an $(r+1)$-bit generator $G$ whose most significant bit is 1.</li>
          <li><strong>Append Zeros:</strong> Sender appends $r$ zeros to the $d$-bit data: $D \\cdot 2^r$.</li>
          <li><strong>Modulo-2 Division:</strong> Sender divides $D \\cdot 2^r$ by $G$ using bitwise XOR division (no carries, no borrows).</li>
          <li><strong>Remainder as FCS:</strong> The resulting $r$-bit remainder $R$ is appended to $D$, forming transmitted frame $T = [D \\mid R]$.</li>
          <li><strong>Receiver Check:</strong> Receiver divides received frame $T'$ by $G$. If remainder is exactly 0, no errors occurred!</li>
        </ol>`,
      diagram: `
+------------------------------------+------------------+
|            DATA BITS D             |   CRC FCS (R)    |
+------------------------------------+------------------+
|<------------- d bits ------------->|<---- r bits ---->|

Transmitted: T = D * 2^r XOR R
Receiver:   T / G === 0 ? ACCEPT : DROP!`,
      interactiveLabKey: "crc",
      technicalDetails: `Mathematical properties of CRC with generator polynomial $G(x)$:
        <ul class="wiki-bullet-list">
          <li><strong>All single-bit errors:</strong> Detected as long as $G(x)$ has at least two non-zero terms ($x^r$ and $x^0$).</li>
          <li><strong>All double-bit errors:</strong> Detected as long as $G(x)$ does not divide $x^k - 1$ for any $k$ up to frame length.</li>
          <li><strong>All odd numbers of errors:</strong> Detected as long as $G(x)$ contains factor $(x+1)$.</li>
          <li><strong>Burst errors:</strong> All burst errors of length $\\le r$ bits are guaranteed detected 100%!</li>
        </ul>
        Ethernet uses <strong>CRC-32</strong>: $G(x) = x^{32} + x^{26} + x^{23} + x^{22} + x^{16} + x^{12} + x^{11} + x^{10} + x^8 + x^7 + x^5 + x^4 + x^2 + x + 1$.`,
      workedExample: `Data $D = 1101011011$, Generator $G = 10011$ (degree $r=4$).
        <br>1. Append 4 zeros: $11010110110000$.
        <br>2. Perform XOR division:
        <pre class="wiki-code-block">
11010110110000 / 10011
XOR:  11010
    ^ 10011
    -------
      010011 -> XOR with 10011 -> 00000...
Remainder after full division = 1110 (4 bits)
        </pre>
        3. Transmitted codeword: $11010110111110$.
        <br>4. Receiver divides by $10011$: Remainder = $0000$ (Accepted!).`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Detects 100% of burst errors up to generator degree $r$</td><td>Cannot localize or correct bit positions</td></tr>
            <tr><td>Implemented in blazing fast hardware linear feedback shift registers (LFSR)</td><td>Slower than simple checksums when implemented purely in software</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Ethernet frames (4-byte FCS)", "Wi-Fi 802.11 MAC frames", "PNG image file format chunks", "Hard drive SATA error detection"],
      commonMistakes: "Using standard arithmetic with borrows during binary division. In GF(2) modulo-2 division, addition and subtraction are identical to bitwise XOR: $1 \\oplus 1 = 0, 1 \\oplus 0 = 1, 0 \\oplus 0 = 0$.",
      compareWith: { title: "CRC vs Internet Checksum", note: "CRC detects virtually all burst noise in hardware. Checksum is designed for simple CPU addition in software." },
      practice: {
        question: "If a generator polynomial has degree r=4, how many zeros are appended to the data bits before XOR division?",
        choices: ["3 zeros", "4 zeros", "5 zeros", "8 zeros"],
        correctIndex: 1,
        explanation: "The number of appended zeros is exactly equal to the degree of the generator polynomial, which is r=4 bits."
      },
      references: [
        { cite: "Peterson, W. W., & Brown, D. T. (1961). Cyclic Codes for Error Detection. Proceedings of the IRE.", url: "https://ieeexplore.ieee.org/document/4066091" },
        { cite: "IEEE 802.3 Ethernet Standard, Clause 3.2.9: Frame Check Sequence (FCS)", url: "https://standards.ieee.org/" }
      ]
    },
    prevTopicId: "checksum",
    nextTopicId: "hamming-code"
  },

  "hamming-code": {
    id: "hamming-code",
    title: "Hamming (7,4) Single Error-Correcting Code",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 2 — Standard Topic",
    category: "datalink",
    difficulty: "Advanced",
    readingTime: "6 min read",
    standard: "Richard Hamming (1950) / UofT Curriculum",
    oneLiner: "A linear forward error-correcting code encoding 4 data bits into 7 bits by inserting 3 parity check bits.",
    quickAnswer: "Hamming (7,4) places parity check bits at power-of-2 bit positions (1, 2, 4) to detect and automatically correct any single-bit error without retransmission.",
    whyItMatters: "Hamming codes introduced Forward Error Correction (FEC), forming the foundation of error-correcting RAM (ECC memory) and space satellite telemetry.",
    infobox: {
      layer: "Layer 2 & Physical Hardware",
      standard: "Hamming (1950) / IEEE Transactions",
      type: "Forward Error Correction (FEC)",
      keyFormula: "2^r \\ge m + r + 1 \\quad [2^3 \\ge 4 + 3 + 1 = 8]",
      prerequisites: ["parity", "error-detection"],
      relatedConcepts: ["crc", "parity"],
      compareWith: ["crc"],
      primaryUses: ["ECC Computer RAM, Satellite Communications, RAID-2"]
    },
    sections: {
      overview: `Invented by Richard Hamming in 1950, <strong>Hamming Codes</strong> are linear error-correcting block codes. The standard <strong>Hamming (7,4)</strong> code encodes 4 data bits into a 7-bit codeword by inserting 3 redundant parity bits, achieving a minimum Hamming distance of $d_{\\text{min}} = 3$, enabling automatic single-bit error correction.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Bit Positions:</strong> Number positions 1 to 7. Powers of 2 ($1, 2, 4$) are parity bits ($P_1, P_2, P_4$). The remaining positions ($3, 5, 6, 7$) hold data bits ($D_3, D_5, D_6, D_7$).</li>
          <li><strong>Parity Coverage:</strong>
            <ul>
              <li>$P_1$ checks bits whose binary position has 1 in bit 0: positions 1, 3, 5, 7.</li>
              <li>$P_2$ checks bits whose binary position has 1 in bit 1: positions 2, 3, 6, 7.</li>
              <li>$P_4$ checks bits whose binary position has 1 in bit 2: positions 4, 5, 6, 7.</li>
            </ul>
          </li>
          <li><strong>Syndrome Calculation:</strong> Receiver calculates parity checks $S_1, S_2, S_4$. The integer syndrome $S = S_4 S_2 S_1$ directly indicates the 1-based index of the flipped bit ($S=0$ means no error)!</li>
        </ol>`,
      diagram: `
Bit Position:    1    2    3    4    5    6    7
Bit Type:       P1   P2   D3   P4   D5   D6   D7
Binary Pos:    001  010  011  100  101  110  111
Checked by P1:   X         X         X         X
Checked by P2:        X    X              X    X
Checked by P4:                  X    X    X    X`,
      technicalDetails: `Hamming Bound Rule:
        <br>To encode $m$ data bits with $r$ parity bits correcting single-bit errors:
        $$2^r \\ge m + r + 1$$
        For $m=4$, minimum $r$ is 3 because $2^3 = 8 \\ge 4 + 3 + 1 = 8$.`,
      workedExample: `Data bits: $D_3=1, D_5=0, D_6=1, D_7=1$.
        <br>1. Calculate parity bits:
        <br>• $P_1 = D_3 \\oplus D_5 \\oplus D_7 = 1 \\oplus 0 \\oplus 1 = 0$
        <br>• $P_2 = D_3 \\oplus D_6 \\oplus D_7 = 1 \\oplus 1 \\oplus 1 = 1$
        <br>• $P_4 = D_5 \\oplus D_6 \\oplus D_7 = 0 \\oplus 1 \\oplus 1 = 0$
        <br>Codeword transmitted: \`0 1 1 0 0 1 1\`.
        <br>Suppose bit 5 flips to 1 $\\to$ Received: \`0 1 1 0 1 1 1\`.
        <br>Receiver computes syndrome: $S_1 = 1, S_2 = 0, S_4 = 1 \\to S = 101_2 = 5$.
        <br>Bit 5 is flipped! Invert bit 5 back to 0. Corrected!`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Self-corrects errors with zero retransmission</td><td>3 redundant bits for 4 data bits (43% overhead)</td></tr>
            <tr><td>Fast hardware syndrome decoder circuit</td><td>Cannot correct 2-bit errors (requires SECDED with 4th parity bit)</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Server ECC RAM (detects 2 errors, corrects 1 error via SECDED)", "Deep-space probe communication channels", "Flash memory storage controllers"],
      commonMistakes: "Numbering bit positions from 0 instead of 1. Hamming codes require 1-based indexing because parity positions are powers of two ($1, 2, 4, 8\\dots$), and syndrome 0 represents no error.",
      compareWith: { title: "Hamming Code vs CRC", note: "Hamming code corrects bit errors in real time. CRC only detects errors and triggers retransmission." },
      practice: {
        question: "In Hamming (7,4) code, if the receiver computes syndrome S = 110 (binary 6), what action is taken?",
        choices: ["Discard the frame", "Invert bit 6 to correct the error", "Retransmit bits 1 and 2", "No action needed"],
        correctIndex: 1,
        explanation: "The syndrome value in binary directly indicates the bit position of the error. Syndrome 110 in binary is 6 in decimal, so bit 6 was corrupted and must be inverted."
      },
      references: [
        { cite: "Hamming, R. W. (1950). Error detecting and error correcting codes. Bell System Technical Journal.", url: "https://archive.org/details/bstj29-2-147" }
      ]
    },
    prevTopicId: "crc",
    nextTopicId: "flow-control"
  },

  "flow-control": {
    id: "flow-control",
    title: "Flow Control & Channel Utilization",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 2 — Standard Topic",
    category: "datalink",
    difficulty: "Core",
    readingTime: "5 min read",
    standard: "Kurose & Ross Chapter 3 & 6",
    oneLiner: "A speed-matching mechanism ensuring a fast sender does not overwhelm a slow receiver's buffer.",
    quickAnswer: "Flow control throttles transmission rate according to the receiver's available buffer capacity, preventing packet drops due to buffer overflow.",
    whyItMatters: "Without flow control, high-speed senders would flood slower destination devices, wasting bandwidth through dropped packets.",
    infobox: {
      layer: "Layer 2 (Data Link) & Layer 4 (TCP)",
      standard: "IEEE 802.3x (PAUSE frames), RFC 9293",
      type: "Speed-Matching Protocol",
      keyFormula: "U_{\\text{stop-wait}} = \\frac{1}{1 + 2a}, \\quad a = \\frac{t_{\\text{prop}}}{t_{\\text{trans}}}",
      prerequisites: ["framing", "packet"],
      relatedConcepts: ["stop-and-wait", "sliding-window", "gbn", "selective-repeat"],
      compareWith: ["congestion-control"],
      primaryUses: ["Data Link Layer ARQ, TCP Receive Window (rwnd), Ethernet Pause Frames"]
    },
    sections: {
      overview: `<strong>Flow control</strong> is an end-to-end or hop-by-hop speed-matching service. A sending host may be able to transmit at 10 Gbps, but if the receiving application processes data at only 100 Mbps, the receiver's buffer will quickly overflow unless the sender is throttled.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Feedback Signals:</strong> Receiver sends acknowledgements (ACKs) containing credit allocations or buffer limits.</li>
          <li><strong>Stop-and-Wait:</strong> Sender transmits 1 packet and pauses until receiving an ACK. Safe but poor link utilization.</li>
          <li><strong>Sliding Window:</strong> Sender can transmit up to $W$ unacknowledged packets in flight, keeping the pipeline full.</li>
        </ol>`,
      diagram: `
Fast Sender                               Slow Receiver
    |                                           |
    | ======= [ Packet 1 (10 Gbps) ] ======>    | [Buffer fills up!]
    | ======= [ Packet 2 (10 Gbps) ] ======>    | 
    |                                           |
    | <------ [ FLOW CONTROL: rwnd = 0 ] ------ | "STOP! Buffer is full!"
    | (Sender pauses transmission)              |`,
      technicalDetails: `Channel Utilization Analysis:
        <br>Let $t_{\\text{trans}} = L/R$ and $t_{\\text{prop}} = d/s$. The parameter $a = t_{\\text{prop}} / t_{\\text{trans}}$:
        $$U_{\\text{stop-wait}} = \\frac{t_{\\text{trans}}}{t_{\\text{trans}} + 2 t_{\\text{prop}}} = \\frac{1}{1 + 2a}$$
        If propagation delay is large (e.g., satellite links where $a \\gg 1$), utilization drops to under 1%! Pipelining with window size $W \\ge 1 + 2a$ restores utilization to 100%.`,
      workedExample: `Consider a 1 Gbps satellite link with round-trip time $\\text{RTT} = 500\\text{ ms}$. Packet size $L = 1000\\text{ bytes} = 8000\\text{ bits}$.
        <br>• $t_{\\text{trans}} = \\frac{8000}{10^9} = 8\\text{ }\\mu\\text{s}$.
        <br>• Stop-and-Wait utilization: $U = \\frac{0.008\\text{ ms}}{0.008 + 500\\text{ ms}} \\approx 0.0016\\%$!
        <br>Sender is idle 99.998% of the time! Pipelined sliding window is mandatory.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Protocol Model</th><th>Buffer Needs</th><th>Utilization</th></tr></thead>
          <tbody>
            <tr><td>Stop-and-Wait</td><td>1 packet buffer</td><td>Abysmal on high RTT ($1 / (1+2a)$)</td></tr>
            <tr><td>Sliding Window ($W$)</td><td>$W$ packet buffers</td><td>Up to 100% when $W \\ge 1+2a$</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Ethernet PAUSE frames (IEEE 802.3x)", "TCP receive window (rwnd)", "HDLC flow control"],
      commonMistakes: "Confusing Flow Control with Congestion Control. Flow control protects the receiving host from buffer overflow; congestion control protects the shared network links from overload.",
      compareWith: { title: "Flow Control vs Congestion Control", note: "Flow control is a point-to-point speed matching mechanism between sender and receiver. Congestion control prevents network collapse caused by too much traffic across shared routers." },
      practice: {
        question: "If propagation delay is 10 ms and transmission delay is 2 ms, what is the channel utilization of Stop-and-Wait?",
        choices: ["9.09%", "16.67%", "50%", "83.33%"],
        correctIndex: 0,
        explanation: "$U = t_{\\text{trans}} / (t_{\\text{trans}} + 2 \\cdot t_{\\text{prop}}) = 2 / (2 + 2(10)) = 2 / 22 \\approx 9.09\\%$."
      },
      references: [
        { cite: "Kurose & Ross Chapter 3.4: Principles of Reliable Data Transfer", url: "https://gaia.cs.umass.edu/kurose_ross/" }
      ]
    },
    prevTopicId: "hamming-code",
    nextTopicId: "stop-and-wait"
  },

  "stop-and-wait": {
    id: "stop-and-wait",
    title: "Stop-and-Wait ARQ Protocol",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 2 — Standard Topic",
    category: "datalink",
    difficulty: "Core",
    readingTime: "5 min read",
    standard: "Kurose & Ross Ch 3 / Alternating Bit Protocol",
    oneLiner: "A reliable protocol where the sender transmits one packet and stalls until receiving an ACK before sending the next.",
    quickAnswer: "Stop-and-Wait uses 1-bit sequence numbers (0 and 1) and retransmission timers to guarantee error-free delivery over lossy channels.",
    whyItMatters: "Stop-and-Wait is the simplest reliable protocol, providing the pedagogical baseline for understanding sequence numbers, ACKs, and timeouts.",
    infobox: {
      layer: "Layer 2 & Layer 4",
      standard: "Alternating Bit Protocol (rdt 3.0)",
      type: "ARQ Protocol",
      keyFormula: "\\text{Window Size} = 1, \\quad \\text{Seq Bits} = 1 \\text{ (0 or 1)}",
      prerequisites: ["flow-control", "error-detection"],
      relatedConcepts: ["sliding-window", "gbn", "selective-repeat"],
      compareWith: ["gbn"],
      primaryUses: ["TFTP (Trivial FTP), Low-Power Wireless Sensor Networks"]
    },
    sections: {
      overview: `<strong>Stop-and-Wait ARQ</strong> (Automatic Repeat reQuest) is a connection-oriented reliable protocol. The sender sends a packet, starts a timer, and halts. If a positive ACK arrives before the timer expires, it advances to the next packet. If the timer expires (due to lost packet or lost ACK), it retransmits.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Alternating Bit:</strong> Packets use alternating sequence numbers 0 and 1 to prevent duplicate delivery.</li>
          <li><strong>Timeout Retransmission:</strong> Sender starts a retransmission timer upon dispatch. If no ACK arrives within timeout period, packet is resent.</li>
          <li><strong>Receiver Deduplication:</strong> If receiver gets duplicate packet (e.g. packet 0 when expecting 1), it re-sends ACK 0 and discards the duplicate payload.</li>
        </ol>`,
      diagram: `
Normal Operation             Lost Packet Recovery         Lost ACK Recovery
Sender       Receiver        Sender       Receiver        Sender       Receiver
  |             |              |             |              |             |
  |-- PKT 0 --->|              |-- PKT 0 --X | (Lost!)      |-- PKT 0 --->|
  |             |              |             |              |             |
  |<-- ACK 0 ---|              | [TIMEOUT]   |              |<-- ACK 0 -X | (Lost!)
  |             |              |-- PKT 0 --->|              | [TIMEOUT]   |
  |-- PKT 1 --->|              |             |              |-- PKT 0 --->| (Duplicate!)
  |             |              |<-- ACK 0 ---|              |<-- ACK 0 ---|`,
      interactiveLabKey: "stop-and-wait",
      technicalDetails: `State Machine Transitions:
        <ul class="wiki-bullet-list">
          <li><strong>Sender:</strong> Waits for call from above with Seq=0 $\\to$ Transmits $\\to$ Waits for ACK 0 $\\to$ Transitions to Seq=1.</li>
          <li><strong>Sequence Number Space:</strong> 1 bit is strictly sufficient because at most one packet is ever in flight.</li>
        </ul>`,
      workedExample: `Sender transmits Packet 0. Packet arrives, receiver sends ACK 0, but ACK is delayed past timeout.
        <br>1. Sender timer fires $\\to$ Sender retransmits Packet 0.
        <br>2. Receiver recognizes duplicate sequence number 0 $\\to$ drops duplicate payload, re-sends ACK 0.
        <br>3. Sender receives ACK 0 $\\to$ advances safely to Packet 1. Zero data corruption!`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Extremely simple sender and receiver logic</td><td>Abysmal link utilization on high-latency channels</td></tr>
            <tr><td>Zero receiver buffering required</td><td>Entire bandwidth-delay pipeline remains empty</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Trivial File Transfer Protocol (TFTP)", "Industrial CAN bus sensors", "Zigbee low-power nodes"],
      commonMistakes: "Omitting sequence numbers from ACKs. If ACKs carry no sequence number, the sender cannot distinguish whether an ACK confirms the original packet or an old delayed duplicate.",
      compareWith: { title: "Stop-and-Wait vs Go-Back-N", note: "Stop-and-Wait allows only 1 packet in flight ($W=1$). Go-Back-N pipelines up to $N$ packets simultaneously, dramatically improving throughput." },
      practice: {
        question: "Why are sequence numbers necessary in Stop-and-Wait ARQ?",
        choices: ["To reorder packets", "To allow the receiver to detect duplicate retransmissions caused by delayed ACKs", "To compress header size", "To encrypt data"],
        correctIndex: 1,
        explanation: "If an ACK is lost or delayed, the sender retransmits. The 1-bit sequence number allows the receiver to recognize that the retransmitted packet is a duplicate and discard it."
      },
      references: [
        { cite: "Kurose & Ross Chapter 3.4.1: Building a Reliable Data Transfer Protocol", url: "https://gaia.cs.umass.edu/kurose_ross/" }
      ]
    },
    prevTopicId: "flow-control",
    nextTopicId: "sliding-window"
  },

  "sliding-window": {
    id: "sliding-window",
    title: "Sliding Window Protocol & Pipelining",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 2 — Standard Topic",
    category: "datalink",
    difficulty: "Core",
    readingTime: "6 min read",
    standard: "Kurose & Ross Ch 3 / RFC 9293",
    oneLiner: "A pipelining protocol allowing up to N unacknowledged packets to be in flight simultaneously.",
    quickAnswer: "Sliding window maintains a sender window of size N. As ACKs arrive, the window slides forward over the sequence number space, keeping the transmission pipe full.",
    whyItMatters: "Pipelining solves the fatal inefficiency of Stop-and-Wait, increasing channel utilization by up to $N$-fold over long propagation links.",
    infobox: {
      layer: "Layer 2 (Data Link) & Layer 4 (TCP)",
      standard: "HDLC, RFC 9293 (TCP)",
      type: "Pipelined ARQ Architecture",
      keyFormula: "U_{\\text{pipelined}} = \\min\\left(1, \\frac{N}{1 + 2a}\\right)",
      prerequisites: ["stop-and-wait", "flow-control"],
      relatedConcepts: ["gbn", "selective-repeat", "tcp-flow-control"],
      compareWith: ["stop-and-wait"],
      primaryUses: ["TCP Internet Transport, Satellite High-Bandwidth Links"]
    },
    sections: {
      overview: `Rather than waiting for an ACK after each packet, <strong>pipelining</strong> permits the sender to dispatch multiple packets without waiting for acknowledgements. The range of allowable sequence numbers for in-flight packets is visualized as a <strong>sliding window</strong> that slides to the right as ACKs are received.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Sender Window ($W_s$):</strong> Contains sent-but-unacknowledged packets plus ready-to-send packets.</li>
          <li><strong>Sequence Numbers:</strong> Drawn from finite field $0, 1, \\dots, 2^k - 1$ using modulo arithmetic.</li>
          <li><strong>Window Slide:</strong> When ACK for the oldest unacknowledged packet arrives, the left edge of the window slides rightward.</li>
        </ol>`,
      diagram: `
Sequence Number Space:
... [ 0 | 1 | 2 | 3 | 4 | 5 ] 6 | 7 | 8 | 9 ...
      |-------------------|
      |<-- Window N=6 --->|
      
ACK 0 arrives! Window slides right:
... 0 [ 1 | 2 | 3 | 4 | 5 | 6 ] 7 | 8 | 9 ...
        |-------------------|
        |<-- Window N=6 --->|`,
      technicalDetails: `The two foundational implementations of the sliding window concept are:
        <ul class="wiki-bullet-list">
          <li><strong>Go-Back-N (GBN):</strong> Receiver window $W_r = 1$. Cumulative ACKs. Sender retransmits all $N$ packets from the lost packet onwards upon timeout.</li>
          <li><strong>Selective Repeat (SR):</strong> Receiver window $W_r = N$. Individual ACKs. Receiver buffers out-of-order packets; sender retransmits strictly the missing packet.</li>
        </ul>`,
      workedExample: `In a link where $1 + 2a = 10$, Stop-and-Wait achieves $1/10 = 10\\%$ utilization. With a sliding window of size $N = 10$, utilization increases to $\\frac{10}{10} = 100\\%$! Throughput increases by 1000%.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Near 100% channel utilization on high bandwidth-delay links</td><td>Requires buffer memory at sender (and receiver in SR)</td></tr>
            <tr><td>Smooth continuous data streaming</td><td>Complex sequence number space and timer management</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["TCP transport protocol", "HDLC data link communication", "Satellite broadband connections"],
      commonMistakes: "Assuming window size can be arbitrarily large. The sequence number space $2^k$ limits the maximum allowable window size to prevent ambiguity ($N \\le 2^k - 1$ in GBN, $N \\le 2^{k-1}$ in SR).",
      compareWith: { title: "Sliding Window vs Stop-and-Wait", note: "Stop-and-Wait is simply a sliding window with size $N=1$. Pipelining with $N > 1$ keeps multiple packets in flight simultaneously." },
      practice: {
        question: "If RTT is 30 ms and transmission delay is 1 ms, what minimum window size N is required for 100% channel utilization?",
        choices: ["15", "30", "31", "60"],
        correctIndex: 2,
        explanation: "100% utilization requires $N \\ge 1 + 2a = 1 + \\text{RTT} / t_{\\text{trans}} = 1 + 30 / 1 = 31$ packets."
      },
      references: [
        { cite: "Kurose & Ross Chapter 3.4.2: Pipelined Reliable Data Transfer Protocols", url: "https://gaia.cs.umass.edu/kurose_ross/" }
      ]
    },
    prevTopicId: "stop-and-wait",
    nextTopicId: "go-back-n"
  },

  "go-back-n": {
    id: "go-back-n",
    title: "Go-Back-N ARQ (GBN)",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 2 — Standard Topic",
    category: "datalink",
    difficulty: "Core",
    readingTime: "6 min read",
    standard: "Kurose & Ross Ch 3 / HDLC",
    oneLiner: "A sliding window protocol where receiver window is 1; upon timeout, sender retransmits all unacknowledged packets in the window.",
    quickAnswer: "GBN allows up to N packets in flight using cumulative ACKs. The receiver discards out-of-order packets; on timeout, the sender goes back and retransmits all packets starting from the lost one.",
    whyItMatters: "GBN requires minimal receiver memory (no out-of-order buffers), making it ideal for simple hardware, though it wastes bandwidth on noisy links.",
    infobox: {
      layer: "Layer 2 & Layer 4",
      standard: "HDLC, Kurose & Ross Ch 3",
      type: "Sliding Window Protocol",
      keyFormula: "W_s = N, \\quad W_r = 1, \\quad N \\le 2^k - 1",
      prerequisites: ["sliding-window"],
      relatedConcepts: ["selective-repeat", "stop-and-wait", "tcp"],
      compareWith: ["selective-repeat"],
      primaryUses: ["Legacy HDLC, Simple Microcontroller Radios"]
    },
    sections: {
      overview: `In <strong>Go-Back-N (GBN)</strong>, the sender can transmit up to $N$ packets without waiting for an acknowledgement. The receiver maintains a window of size 1: it accepts only packets that arrive in strictly correct sequential order, discarding any out-of-order packets.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Cumulative ACKs:</strong> \`ACK(n)\` indicates all packets up to and including sequence $n$ were received correctly.</li>
          <li><strong>Single Timer:</strong> The sender maintains a single timer for the oldest unacknowledged packet (\`base\`).</li>
          <li><strong>Timeout Retransmission:</strong> When the timer expires, the sender retransmits <em>all</em> currently unacknowledged packets $[\\text{base}, \\dots, \\text{nextseqnum}-1]$.</li>
          <li><strong>Discarding Out-of-Order:</strong> If packet $k$ is lost, packets $k+1, k+2\\dots$ arriving at the receiver are discarded, and receiver re-ACKs $k-1$.</li>
        </ol>`,
      diagram: `
Sender transmits 1, 2, 3, 4 (Window N=4). Packet 2 is lost!
Sender                              Receiver (Wr = 1)
  |------ [PKT 1] ------------->|   Accept 1, send ACK 1
  |------ [PKT 2] -------X      |   (Lost!)
  |------ [PKT 3] ------------->|   Discard 3! Send duplicate ACK 1
  |------ [PKT 4] ------------->|   Discard 4! Send duplicate ACK 1
  |                             |
  | [TIMEOUT ON PKT 2!]         |
  |------ [PKT 2] ------------->|   Accept 2, send ACK 2
  |------ [PKT 3] ------------->|   Accept 3, send ACK 3
  |------ [PKT 4] ------------->|   Accept 4, send ACK 4`,
      interactiveLabKey: "gbn",
      technicalDetails: `Sequence Number Window Rule:
        <br>For a $k$-bit sequence number space ($2^k$), the maximum sender window size in GBN is:
        $$N \\le 2^k - 1$$
        If $N = 2^k$, and all ACKs for a full window are lost, the sender retransmits old packets, which the receiver would mistakenly accept as new packets!`,
      workedExample: `Packets 0, 1, 2, 3 are sent ($N=4$).
        <br>Packet 1 is dropped in transit.
        <br>Packets 2 and 3 arrive at receiver $\\to$ Receiver drops both and returns ACK 0.
        <br>Timer for packet 1 expires at sender $\\to$ Sender goes back and retransmits: <strong>Packet 1, Packet 2, and Packet 3</strong>.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Simple receiver: zero out-of-order buffer memory needed</td><td>Wasteful duplicate retransmissions over lossy links</td></tr>
            <tr><td>Single timer simplifies sender logic</td><td>Performance degrades sharply on noisy channels</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["HDLC synchronous serial links", "TFTP windowing extension", "Foundational academic model for TCP Reno"],
      commonMistakes: "Believing the receiver in GBN buffers packet 3 and 4 when packet 2 is lost. GBN receivers have window size $W_r = 1$ and unconditionally discard out-of-order packets.",
      compareWith: { title: "Go-Back-N vs Selective Repeat", note: "GBN retransmits all packets from the lost packet onwards ($W_r=1$). Selective Repeat buffers out-of-order arrivals ($W_r=N$) and retransmits only the single lost packet." },
      practice: {
        question: "With a 3-bit sequence number space (0 to 7), what is the maximum sender window size in Go-Back-N?",
        choices: ["4", "7", "8", "16"],
        correctIndex: 1,
        explanation: "In Go-Back-N, the maximum window size is $N \\le 2^k - 1$. With $k=3$, $N \\le 2^3 - 1 = 7$."
      },
      references: [
        { cite: "Kurose & Ross Chapter 3.4.3: Go-Back-N (GBN)", url: "https://gaia.cs.umass.edu/kurose_ross/" }
      ]
    },
    prevTopicId: "sliding-window",
    nextTopicId: "selective-repeat"
  },

  "selective-repeat": {
    id: "selective-repeat",
    title: "Selective Repeat ARQ (SR)",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 2 — Standard Topic",
    category: "datalink",
    difficulty: "Core",
    readingTime: "6 min read",
    standard: "Kurose & Ross Ch 3 / TCP SACK",
    oneLiner: "A sliding window protocol where receiver buffers out-of-order packets and sender retransmits only missing packets.",
    quickAnswer: "Selective Repeat avoids redundant retransmissions: the receiver acknowledges each packet individually and buffers out-of-order arrivals, while the sender retransmits only packets that timed out.",
    whyItMatters: "Selective Repeat is optimal on noisy or high-bandwidth links, eliminating unnecessary retransmissions of packets that already arrived safely.",
    infobox: {
      layer: "Layer 2 & Layer 4",
      standard: "RFC 2018 (TCP SACK), Kurose & Ross",
      type: "Selective Retransmission ARQ",
      keyFormula: "W_s = W_r = N, \\quad N \\le 2^{k-1}",
      prerequisites: ["sliding-window", "gbn"],
      relatedConcepts: ["gbn", "tcp", "sliding-window"],
      compareWith: ["gbn"],
      primaryUses: ["TCP Selective Acknowledgment (SACK), Satellite Broadband"]
    },
    sections: {
      overview: `<strong>Selective Repeat (SR)</strong> avoids GBN's wasteful retransmissions by having the sender retransmit only those packets suspected of being lost or corrupted. The receiver buffers out-of-order packets until missing predecessor packets arrive, delivering continuous sequential byte streams to the layer above.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Individual ACKs:</strong> Every correctly received packet generates a selective ACK for that specific sequence number.</li>
          <li><strong>Receiver Buffering:</strong> Out-of-order packets falling inside receiver window $[\\text{rcv\\_base}, \\text{rcv\\_base}+N-1]$ are buffered.</li>
          <li><strong>Logical Timers:</strong> Sender maintains an independent timer for each unacknowledged packet in flight.</li>
          <li><strong>Selective Retransmission:</strong> When timer for packet $k$ expires, sender retransmits <em>strictly packet $k$</em>.</li>
        </ol>`,
      diagram: `
Sender transmits 1, 2, 3, 4 (Window N=4). Packet 2 is lost!
Sender                              Receiver (Wr = 4)
  |------ [PKT 1] ------------->|   Accept 1, send ACK 1
  |------ [PKT 2] -------X      |   (Lost!)
  |------ [PKT 3] ------------->|   BUFFER 3! Send ACK 3
  |------ [PKT 4] ------------->|   BUFFER 4! Send ACK 4
  |                             |
  | [TIMEOUT ON PKT 2 ONLY!]    |
  |------ [PKT 2] ------------->|   Accept 2! Reassemble [1,2,3,4]
  |                             |   Deliver to App, Slide Window!`,
      interactiveLabKey: "sr",
      technicalDetails: `Sequence Number Window Rule:
        <br>In Selective Repeat, to prevent new packets from overlapping with old duplicate packets:
        $$W_s + W_r \\le 2^k \\implies N \\le 2^{k-1}$$
        For 3-bit sequence numbers ($2^3 = 8$), the maximum window size is $N = 4$. If $N=5$, receiver cannot distinguish whether packet 0 is a duplicate retransmission or a brand new packet!`,
      workedExample: `Packets 0, 1, 2, 3 sent ($N=4$). Packet 1 is lost.
        <br>Packets 2 and 3 arrive $\\to$ Receiver buffers 2 and 3, sends ACK 2 and ACK 3.
        <br>Sender timer for packet 1 expires $\\to$ Sender retransmits <strong>only Packet 1</strong>!
        <br>Upon receiving Packet 1, receiver reassembles $0, 1, 2, 3$ in order and delivers to application.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Zero redundant retransmissions on lossy links</td><td>Requires buffer memory at both sender and receiver</td></tr>
            <tr><td>Optimal bandwidth efficiency</td><td>Managing multiple timers increases software complexity</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["TCP with Selective Acknowledgements (RFC 2018)", "Deep space high-latency links", "Wi-Fi 802.11 Block ACK aggregation"],
      commonMistakes: "Setting window size $N > 2^{k-1}$. In Selective Repeat, window size must not exceed half the sequence number space, otherwise sequence numbers wrap around and cause catastrophic data corruption.",
      compareWith: { title: "Go-Back-N vs Selective Repeat", note: "GBN uses cumulative ACKs and retransmits all packets in the window. Selective Repeat uses individual ACKs and retransmits only the single lost packet." },
      practice: {
        question: "With a 4-bit sequence number space (0 to 15), what is the maximum allowable window size in Selective Repeat?",
        choices: ["7", "8", "15", "16"],
        correctIndex: 1,
        explanation: "In Selective Repeat, window size cannot exceed half the sequence number space: $N \\le 2^{k-1} = 2^{4-1} = 8$."
      },
      references: [
        { cite: "RFC 2018: TCP Selective Acknowledgement Options", url: "https://datatracker.ietf.org/doc/html/rfc2018" },
        { cite: "Kurose & Ross Chapter 3.4.4: Selective Repeat (SR)", url: "https://gaia.cs.umass.edu/kurose_ross/" }
      ]
    },
    prevTopicId: "go-back-n",
    nextTopicId: "ethernet"
  },

  "ethernet": {
    id: "ethernet",
    title: "Ethernet & IEEE 802.3 Frame",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 3 — Major Topic / Module",
    category: "datalink",
    difficulty: "Core",
    readingTime: "7 min read",
    standard: "IEEE 802.3 Standard",
    oneLiner: "The ubiquitous wired Local Area Network standard operating across Physical and MAC layers using CSMA/CD or full-duplex switches.",
    quickAnswer: "IEEE 802.3 defines the 64-byte minimum Ethernet frame, 48-bit MAC addressing, CSMA/CD collision detection, and binary exponential backoff.",
    whyItMatters: "Ethernet is the universal foundation of modern wired LANs, enterprise intranets, and cloud data center networks worldwide.",
    infobox: {
      layer: "Layer 1 (PHY) & Layer 2 (MAC)",
      standard: "IEEE 802.3 / DIX Ethernet II",
      type: "Local Area Network Standard",
      keyFormula: "\\text{Min Frame Size} = 64 \\text{ Bytes (512 bit-times)}",
      prerequisites: ["framing", "crc"],
      relatedConcepts: ["mac-address", "switch", "arp", "vlan"],
      compareWith: ["wifi"],
      primaryUses: ["Campus LANs, Data Center Spine-Leaf, Office Ethernet"]
    },
    sections: {
      overview: `Invented by Robert Metcalfe in 1973 and standardized as <strong>IEEE 802.3</strong>, Ethernet evolved from shared coaxial cables using CSMA/CD to modern gigabit switched twisted-pair copper (Cat 6) and fiber-optic fabrics.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Frame Structure:</strong> 7-byte Preamble + 1-byte SFD + 6-byte Dest MAC + 6-byte Src MAC + 2-byte Type/Length + 46..1500 byte Payload + 4-byte CRC-32 FCS.</li>
          <li><strong>Minimum Frame Size (64 Bytes):</strong> Guarantees that on shared media, a sender is still transmitting when a collision reflection returns from the furthest cable end.</li>
          <li><strong>CSMA/CD:</strong> Carrier Sense Multiple Access with Collision Detection. Listen before transmit; listen while transmitting.</li>
          <li><strong>Binary Exponential Backoff:</strong> After collision $n$, choose random wait time $k \\in [0, 2^{\\min(n,10)} - 1]$ slots.</li>
        </ol>`,
      diagram: `
+----------+-----+----------+----------+------+-----------------+---------+
| PREAMBLE | SFD | DEST MAC | SRC MAC  | TYPE |  PAYLOAD (MTU)  | CRC FCS |
|  7 Bytes | 1 B | 6 Bytes  | 6 Bytes  | 2 B  | 46 - 1500 Bytes | 4 Bytes |
+----------+-----+----------+----------+------+-----------------+---------+
|<------- Preamble: 10101010... ------->|      |<-- Min 64B Frame w/o Pre -->|`,
      technicalDetails: `Why 64 bytes minimum?
        <br>For 10 Mbps Ethernet over maximum 2.5 km coaxial bus, round-trip propagation time is $2 \\times t_{\\text{prop}} \\approx 51.2\\text{ }\\mu\\text{s}$.
        <br>$$\\text{Min Bits} = R \\times 2 t_{\\text{prop}} = 10^7\\text{ bps} \\times 51.2 \\times 10^{-6}\\text{ s} = 512\\text{ bits} = 64\\text{ bytes}.$$
        If a frame were smaller than 64 bytes, a station could finish transmitting before detecting a collision, failing to realize its frame was destroyed!`,
      workedExample: `An application sends a 10-byte payload over Ethernet.
        <br>1. Minimum Ethernet payload is 46 bytes.
        <br>2. Hardware appends 36 padding bytes to reach 46 bytes.
        <br>3. Frame length: $6\\text{ (dst)} + 6\\text{ (src)} + 2\\text{ (type)} + 46\\text{ (data+pad)} + 4\\text{ (FCS)} = 64\\text{ bytes}$.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Universal standard, low NIC hardware cost</td><td>Maximum cable length of 100 meters on copper (Cat 6)</td></tr>
            <tr><td>Full-duplex eliminates collisions entirely</td><td>Broadcast traffic floods entire VLAN</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Gigabit Ethernet (1000BASE-T) on copper", "10G, 40G, 100G, 400G optical data center links", "Office patch panels and wall jacks"],
      commonMistakes: "Thinking CSMA/CD is active on modern gigabit Ethernet. Modern Ethernet connects via full-duplex switches where transmission and reception use separate wire pairs, so collisions never occur and CSMA/CD is disabled.",
      compareWith: { title: "Ethernet vs Wi-Fi (802.11)", note: "Ethernet uses Collision Detection (CSMA/CD). Wi-Fi cannot detect collisions while transmitting radio waves, so it uses Collision Avoidance (CSMA/CA) with ACK handshakes." },
      practice: {
        question: "What is the minimum frame size of an IEEE 802.3 Ethernet frame (excluding the preamble)?",
        choices: ["46 bytes", "64 bytes", "1500 bytes", "1518 bytes"],
        correctIndex: 1,
        explanation: "The minimum frame size in Ethernet is 64 bytes (512 bit times), ensuring collision detection across maximum cable distances."
      },
      references: [
        { cite: "IEEE Standard 802.3-2022: Ethernet", url: "https://standards.ieee.org/ieee/802.3/7071/" },
        { cite: "Metcalfe, R. M., & Boggs, D. R. (1976). Ethernet: Distributed packet switching for local computer networks. CACM.", url: "https://dl.acm.org/doi/10.1145/363283.363291" }
      ]
    },
    prevTopicId: "selective-repeat",
    nextTopicId: "mac-address"
  },

  "mac-address": {
    id: "mac-address",
    title: "MAC Address (IEEE 48-Bit EUI-48)",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 1 — Concept Card",
    category: "datalink",
    difficulty: "Foundation",
    readingTime: "4 min read",
    standard: "IEEE 802 Guidelines",
    oneLiner: "A 48-bit globally unique hardware identifier burned into a Network Interface Card (NIC).",
    quickAnswer: "A MAC address is a flat 6-byte hexadecimal address that identifies a physical network interface on a local subnet.",
    whyItMatters: "While IP addresses are hierarchical and change depending on where a device connects, MAC addresses are hardware identifiers that enable local frame delivery inside a broadcast domain.",
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "IEEE 802 EUI-48",
      type: "Physical Hardware Identifier",
      keyFormula: "\\text{Format: } \\underbrace{XX:XX:XX}_{\\text{OUI (Vendor)}} : \\underbrace{YY:YY:YY}_{\\text{Device Serial}}",
      prerequisites: ["ethernet"],
      relatedConcepts: ["arp", "switch", "ip"],
      compareWith: ["ip"],
      primaryUses: ["Ethernet, Wi-Fi 802.11, Bluetooth"]
    },
    sections: {
      overview: `A <strong>MAC address</strong> (Media Access Control address) is a 48-bit (6-byte) physical address permanently burned into ROM on a Network Interface Card. MAC addresses are represented as 12 hexadecimal digits separated by colons or hyphens (e.g. \`00:1A:2B:3C:4D:5E\`).`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Organizationally Unique Identifier (OUI):</strong> The first 24 bits (3 bytes) are assigned by IEEE to the hardware manufacturer (e.g., Apple, Intel, Cisco).</li>
          <li><strong>Network Interface Identifier:</strong> The remaining 24 bits are assigned by the vendor as a unique serial number.</li>
          <li><strong>Broadcast Address:</strong> \`FF:FF:FF:FF:FF:FF\` (all 1s) targets every device in the local broadcast domain.</li>
        </ol>`,
      diagram: `
+-----------------------------------+-----------------------------------+
|     OUI (Vendor Identifier)       |    NIC Serial Number (Device)     |
|             24 Bits               |             24 Bits               |
+-----------------------------------+-----------------------------------+
|       00  :  1A  :  2B            |       3C  :  4D  :  5E            |
+-----------------------------------+-----------------------------------+`,
      technicalDetails: `Flat vs Hierarchical addressing:
        <br>MAC addresses are <em>flat</em>: moving a laptop from New York to Tokyo does not change its MAC address. In contrast, IP addresses are <em>hierarchical</em> (subnet prefixes), enabling routers to aggregate millions of routes into small routing tables.`,
      workedExample: `Consider MAC: \`F4:5C:89:9B:12:34\`.
        <br>• \`F4:5C:89\` is registered to <strong>Apple, Inc.</strong>
        <br>• \`9B:12:34\` is the unique device number of that specific iPhone Wi-Fi chip.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Globally unique out of the box (zero configuration)</td><td>Flat structure cannot scale for global Internet routing</td></tr>
            <tr><td>Fast hardware MAC table lookups in switches</td><td>Can be spoofed via software OS configuration</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Ethernet NICs", "Wi-Fi adapters", "Bluetooth pairing"],
      commonMistakes: "Believing MAC addresses are permanently unchangeable. While burned into ROM, modern operating systems can easily spoof or randomize MAC addresses for Wi-Fi privacy.",
      compareWith: { title: "MAC Address vs IP Address", note: "MAC address is like a Social Security Number (identifies who you are). IP address is like a postal address (identifies where you live in the network)." },
      practice: {
        question: "How many bits are in a standard Ethernet MAC address?",
        choices: ["32 bits", "48 bits", "64 bits", "128 bits"],
        correctIndex: 1,
        explanation: "Standard Ethernet MAC addresses (EUI-48) are 48 bits (6 bytes) long."
      },
      references: [
        { cite: "IEEE Guidelines for 48-Bit Global Identifiers (EUI-48)", url: "https://standards.ieee.org/" }
      ]
    },
    prevTopicId: "ethernet",
    nextTopicId: "arp"
  },

  "arp": {
    id: "arp",
    title: "Address Resolution Protocol (ARP)",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 2 — Standard Topic",
    category: "datalink",
    difficulty: "Core",
    readingTime: "5 min read",
    standard: "RFC 826",
    oneLiner: "The protocol mapping an IP network-layer address to a physical link-layer MAC address.",
    quickAnswer: "ARP broadcasts a query asking 'Who has IP X? Tell me your MAC', and the target host responds with a unicast ARP reply containing its MAC address.",
    whyItMatters: "ARP bridges the gap between Layer-3 logical routing (IP) and Layer-2 physical transmission (Ethernet/Wi-Fi).",
    infobox: {
      layer: "Layer 2.5 (Link / Network Boundary)",
      standard: "RFC 826",
      type: "Address Translation Protocol",
      keyFormula: "\\text{Mapping: } \\text{IP Address} \\xrightarrow{\\text{ARP}} \\text{MAC Address}",
      prerequisites: ["mac-address", "ipv4"],
      relatedConcepts: ["ethernet", "switch", "router"],
      compareWith: ["dns"],
      primaryUses: ["IPv4 Local Subnet Delivery, Gateway MAC Resolution"]
    },
    sections: {
      overview: `When a host wants to send an IP packet to another host on the same local subnet, it knows the destination IP address, but the Ethernet hardware card requires the destination MAC address to build the frame. <strong>ARP</strong> (RFC 826) dynamically resolves this mapping.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>ARP Cache Check:</strong> Host checks local memory cache for destination IP. If present, it sends the frame immediately.</li>
          <li><strong>ARP Request (Broadcast):</strong> If missing, host sends an ARP Request frame to broadcast address \`FF:FF:FF:FF:FF:FF\`: <em>"Who has IP 192.168.1.5? Tell 192.168.1.1"</em>.</li>
          <li><strong>ARP Reply (Unicast):</strong> Host 192.168.1.5 sees the request and returns a direct unicast ARP Reply: <em>"192.168.1.5 is at 00:11:22:33:44:55"</em>.</li>
          <li><strong>Cache Update:</strong> Sender stores mapping with a TTL (typically 20 minutes) and transmits the pending frame.</li>
        </ol>`,
      diagram: `
Host A (192.168.1.1)                                Host B (192.168.1.5)
      |                                                     |
      | ===== [ ARP Request (Broadcast: FF..FF) ] ========> |
      |       "Who has 192.168.1.5? Tell 192.168.1.1"       |
      |                                                     |
      | <==== [ ARP Reply (Unicast to Host A MAC) ] ======= |
      |       "192.168.1.5 is at 00:11:22:33:44:55"        |
      |                                                     |
      | ----- [ Standard Data Frame to B's MAC ] ---------> |`,
      technicalDetails: `Gratuitous ARP: A host broadcasts an ARP announcement for its own IP upon booting. This detects IP address conflicts and updates neighbors' caches after a NIC swap.`,
      workedExample: `To view the ARP table on your machine, run in terminal:
        <pre class="wiki-code-block">arp -a
Internet Address      Physical Address      Type
192.168.1.1           00-0c-29-28-a4-b9     dynamic
192.168.1.254         c4-72-95-58-12-80     dynamic</pre>`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Automatic plug-and-play address resolution</td><td>Broadcast requests consume LAN bandwidth</td></tr>
            <tr><td>Zero manual configuration needed</td><td>Vulnerable to ARP Poisoning / Spoofing MITM attacks</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Every IPv4 local network communication", "Default gateway MAC resolution in home/office Wi-Fi"],
      commonMistakes: "Sending an ARP request across a router. Routers do not forward Layer-2 broadcast frames. If the destination is on a remote subnet, the host uses ARP to resolve the MAC of its <em>default gateway router</em>.",
      compareWith: { title: "ARP vs DNS", note: "ARP resolves IP addresses to physical MAC addresses within a local subnet. DNS resolves human hostnames to IP addresses globally." },
      practice: {
        question: "What destination MAC address is used in an ARP Request frame?",
        choices: ["00:00:00:00:00:00", "FF:FF:FF:FF:FF:FF", "The sender's own MAC address", "The router's MAC address"],
        correctIndex: 1,
        explanation: "ARP Requests are broadcast to all local devices using the Layer-2 broadcast address FF:FF:FF:FF:FF:FF."
      },
      references: [
        { cite: "RFC 826: An Ethernet Address Resolution Protocol", url: "https://datatracker.ietf.org/doc/html/rfc826" }
      ]
    },
    prevTopicId: "mac-address",
    nextTopicId: "vlan"
  },

  "vlan": {
    id: "vlan",
    title: "Virtual Local Area Networks (VLAN & IEEE 802.1Q)",
    unit: "Unit II: Data Link Layer & Reliable Transfer",
    unitId: "unit2",
    level: "Level 2 — Standard Topic",
    category: "datalink",
    difficulty: "Core",
    readingTime: "5 min read",
    standard: "IEEE 802.1Q Standard",
    oneLiner: "Logically partitioning a single physical switch into multiple isolated broadcast domains.",
    quickAnswer: "A VLAN divides a physical switch into independent virtual switches, containing broadcast traffic and enforcing security policies across departmental subnets.",
    whyItMatters: "VLANs eliminate the need to buy separate physical switches and cables for every department, saving millions in enterprise infrastructure costs.",
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "IEEE 802.1Q (VLAN Tagging)",
      type: "Logical Network Segmentation",
      keyFormula: "\\text{VLAN ID Range: } 1 \\text{ to } 4094 \\text{ (12 bits)}",
      prerequisites: ["switch", "ethernet"],
      relatedConcepts: ["switch", "router", "ethernet"],
      compareWith: ["subnet"],
      primaryUses: ["Enterprise Office Segmentation, Voice over IP (VoIP), Cloud Multi-Tenancy"]
    },
    sections: {
      overview: `A <strong>Virtual Local Area Network (VLAN)</strong> enables network engineers to partition a physical Layer-2 switch into multiple distinct logical broadcast domains. Ports assigned to VLAN 10 cannot communicate with ports on VLAN 20 without traversing a Layer-3 router.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Port-Based VLANs:</strong> Switch ports are assigned to specific VLAN IDs (e.g. Ports 1-8 $\\to$ VLAN 10 Accounting, Ports 9-16 $\\to$ VLAN 20 Engineering).</li>
          <li><strong>Broadcast Isolation:</strong> Broadcast frames from VLAN 10 are delivered strictly to other ports assigned to VLAN 10.</li>
          <li><strong>Trunk Ports & 802.1Q:</strong> High-capacity trunk links between switches carry traffic from multiple VLANs by inserting a 4-byte 802.1Q tag into the Ethernet header.</li>
          <li><strong>Inter-VLAN Routing:</strong> Traffic between different VLANs must be routed by a Layer-3 switch or router (Router-on-a-Stick).</li>
        </ol>`,
      diagram: `
+-------------------------------------------------------------+
|                 PHYSICAL SWITCH HARDWARE                    |
|  [VLAN 10: Engineering]             [VLAN 20: Accounting]   |
|  Port 1  Port 2  Port 3             Port 4  Port 5  Port 6  |
|    |       |       |                  |       |       |     |
|   PC1     PC2     PC3                PC4     PC5     PC6    |
|   (Broadcasts stay here)             (Isolated from Eng)    |
+-------------------------------------------------------------+
                               | Trunk Link (802.1Q Tagged)
                               v
                   [ To Secondary Switch / Router ]`,
      technicalDetails: `The IEEE 802.1Q tag adds 4 bytes between the Source MAC and EtherType fields:
        <ul class="wiki-bullet-list">
          <li><strong>Tag Protocol Identifier (TPID):</strong> 2 bytes set to \`0x8100\`.</li>
          <li><strong>Priority Code Point (PCP):</strong> 3 bits for Class of Service (QoS).</li>
          <li><strong>Drop Eligible Indicator (DEI):</strong> 1 bit.</li>
          <li><strong>VLAN Identifier (VID):</strong> 12 bits supporting up to $2^{12} - 2 = 4094$ distinct VLANs.</li>
        </ul>`,
      workedExample: `In a university network:
        <br>• VLAN 10: Faculty (Subnet \`10.0.10.0/24\`)
        <br>• VLAN 20: Students (Subnet \`10.0.20.0/24\`)
        <br>• VLAN 30: Guest Wi-Fi (Subnet \`10.0.30.0/24\`)
        <br>Students cannot sniff faculty exam servers, and malware on guest Wi-Fi is strictly contained.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Cost savings: shares expensive switch hardware</td><td>Misconfiguration can bridge untrusted networks</td></tr>
            <tr><td>Enhanced security and broadcast confinement</td><td>Inter-VLAN communication requires Layer-3 routing</td></tr>
            <tr><td>Simplified moves, adds, and departmental changes</td><td>VLAN hopping attacks if native VLAN is untagged</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Separating VoIP phones from employee PC data", "Multi-tenant cloud server clusters", "Hospital medical telemetry isolation"],
      commonMistakes: "Assuming hosts add the 802.1Q tags. Standard end hosts know nothing about VLANs; the switch access port adds and strips the 802.1Q tags transparently.",
      compareWith: { title: "VLAN vs Subnet", note: "A VLAN is a Layer-2 broadcast domain. A subnet is a Layer-3 IP addressing block. Best practice assigns exactly one IP subnet per VLAN." },
      practice: {
        question: "How many bits are allocated for the VLAN ID (VID) in an IEEE 802.1Q tag?",
        choices: ["8 bits", "12 bits", "16 bits", "24 bits"],
        correctIndex: 1,
        explanation: "The VLAN Identifier field in the IEEE 802.1Q header is 12 bits, supporting up to 4,094 distinct VLANs."
      },
      references: [
        { cite: "IEEE 802.1Q: Bridges and Bridged Networks", url: "https://standards.ieee.org/" }
      ]
    },
    prevTopicId: "arp",
    nextTopicId: "network-layer"
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TOPICS_U2;
}
