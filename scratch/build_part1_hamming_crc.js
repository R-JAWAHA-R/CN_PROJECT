// Builder for Hamming Code (4 topics) and CRC (5 topics) in Part 1
// Strictly aligned with Behrouz A. Forouzan Ch. 10.3 and Ch. 10.4

const hammingAndCrcTopics = {
  "u2-hamming-working-principle": {
    id: "u2-hamming-working-principle",
    title: "Hamming Code: Working Principle",
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: "Intermediate",
    category: "datalink",
    difficulty: "Intermediate",
    readingTime: "18 min",
    standard: "Forouzan Ch. 10.3 / Tanenbaum Ch. 3.2",
    oneLiner: "The core architecture of linear error-correcting codes using powers-of-2 parity positions to achieve single-error correction.",
    quickAnswer: "The Hamming code is a linear block error-correcting code designed by Richard Hamming with a minimum distance $d_{\\min} = 3$. It arranges codeword bits such that parity check bits occupy powers-of-2 positions ($1, 2, 4, 8, \\dots$), while data bits occupy the remaining positions. Each parity bit monitors a unique overlapping subset of data bits based on binary index representations.",
    whyItMatters: "Hamming code was the very first algorithm capable of automatic single-error correction and double-error detection. It forms the architectural basis of ECC (Error-Correcting Code) RAM in servers, cache memory in microprocessors, and high-reliability aerospace avionics.",
    prerequisitesList: [
      { concept: "Hamming Distance", meaning: "Distance metrics and the d_min >= 2t + 1 rule." },
      { concept: "Bitwise XOR and Even Parity", meaning: "Modulo-2 addition of bit subsets." }
    ],
    learningObjectives: [
      "Understand why parity bits are placed at powers-of-2 positions ($1, 2, 4, 8, \\dots$).",
      "Formulate the fundamental Hamming inequality: $2^r \\ge m + r + 1$.",
      "Explain how binary bit positions determine which parity bits monitor which data bits.",
      "Analyze the code parameters of $(7,4)$, $(15,11)$, and $(31,26)$ Hamming codes."
    ],
    infobox: {
      layer: "Layer 2 & Physical/Hardware Layers",
      standard: "Bell Labs / Richard W. Hamming (1950)",
      type: "Linear Block Code (Single-Error Correction)",
      prerequisites: ["u2-hamming-distance", "u2-intro-error-correction"],
      relatedConcepts: ["u2-hamming-code-calculation", "u2-hamming-detection-correction"],
      compareWith: ["u2-crc-working-principle"],
      primaryUses: ["ECC Computer Memory (RAM)", "Microprocessor L1/L2 cache", "Satellite and avionics telemetry"]
    },
    imageUrl: "assets/images/unit2/topic1/hamming-code-bit-layout.svg",
    imageCaption: "Figure 10.7: Bit Layout and Overlapping Parity Coverage Sets in Hamming (7,4) Code.",
    sections: {
      overview: `
        <p>In 1950, <em>Richard W. Hamming</em> at Bell Laboratories invented a revolutionary class of error-correcting codes that transformed digital engineering. As detailed in <em>Forouzan Chapter 10.3 (pp. 315–317)</em>, Hamming codes were originally designed with <strong>$d_{\\min} = 3$</strong>, meaning they can guarantee the detection of up to two errors ($s = 2$) or the correction of one single-bit error ($t = 1$).</p>
        <p>The brilliance of Hamming's design lies in using the <strong>binary representations of bit positions</strong> to construct the parity-check equations. Parity check bits are placed at positions that are powers of 2 ($1, 2, 4, 8, 16, \\dots, 2^{r-1}$), while the actual user data bits fill all other positions ($3, 5, 6, 7, 9, 10, \\dots$).</p>
      `,
      eli10: "Imagine 7 light bulbs in a row numbered 1 to 7. Bulbs 1, 2, and 4 are supervisors, and bulbs 3, 5, 6, 7 are workers. Each supervisor watches a specific team of workers based on their binary ID numbers. If worker bulb #5 flickers, supervisors 1 and 4 sound an alarm. When you add their numbers: 1 + 4 = 5! You instantly know bulb #5 is the broken one!",
      analogy: "A police investigation where 3 detectives question overlapping groups of suspects. Detective 1 questions suspects with odd numbers. Detective 2 questions suspects {2,3,6,7}. Detective 4 questions suspects {4,5,6,7}. If Detective 1 and Detective 4 both report a contradiction, the culprit must be suspect 1 + 4 = 5!",
      howItWorks: `
        <ol class="list-decimal pl-5 space-y-2 text-xs">
          <li><strong>Hamming Inequality:</strong> Given $m$ data bits, determine the number of parity bits $r$ satisfying:
            <br>$$2^r \\ge m + r + 1$$
          </li>
          <li><strong>Position Assignment:</strong> Total codeword length is $n = m + r$. Number the positions from $1$ to $n$.
            <br>• Parity bits occupy positions $p_i = 2^{i-1}$ (i.e. 1, 2, 4, 8, 16, ...).
            <br>• Data bits occupy all remaining non-power-of-2 positions ($3, 5, 6, 7, 9, 10, \\dots$).
          </li>
          <li><strong>Binary Decomposition:</strong> Every bit position index can be expressed as a unique sum of powers of 2 (e.g., $3 = 1 + 2$, $5 = 1 + 4$, $6 = 2 + 4$, $7 = 1 + 2 + 4$).</li>
          <li><strong>Parity Coverage:</strong> Parity bit $P_k$ at position $2^{k-1}$ monitors all positions whose binary index has a 1 in the $k$-th bit.</li>
          <li><strong>Syndrome Vector:</strong> At the receiver, each parity subset is recomputed. The resulting syndrome bits form a binary number that directly gives the corrupted bit position (or 0 if clean).</li>
        </ol>
      `,
      diagram: `
+---------------------------------------------------------------------------------+
|                    HAMMING (7,4) BIT POSITION & PARITY MATRIX                   |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  Bit Position:    1       2       3       4       5       6       7             |
|  Binary Index:  (001)   (010)   (011)   (100)   (101)   (110)   (111)           |
|  Bit Type:       P1      P2      D3      P4      D5      D6      D7             |
|                  ^       ^               ^                                      |
|                  |       |               |                                      |
|  Parity Bits at Powers of 2: [ 1=2^0, 2=2^1, 4=2^2 ]                            |
|                                                                                 |
|  P1 checks positions with binary xx1 (bit 0 = 1):  1, 3, 5, 7  --> P1 ⊕ D3 ⊕ D5 ⊕ D7 = 0
|  P2 checks positions with binary x1x (bit 1 = 1):  2, 3, 6, 7  --> P2 ⊕ D3 ⊕ D6 ⊕ D7 = 0
|  P4 checks positions with binary 1xx (bit 2 = 1):  4, 5, 6, 7  --> P4 ⊕ D5 ⊕ D6 ⊕ D7 = 0
|                                                                                 |
|  Syndrome S = (s4 s2 s1)_2 gives EXACT decimal index of erroneous bit!          |
+---------------------------------------------------------------------------------+
      `,
      technicalDetails: `
        <p><strong>Derivation of Hamming's Rule ($2^r \\ge m + r + 1$):</strong></p>
        <p>Assume we have an $m$-bit dataword and we add $r$ redundant bits, creating an $n$-bit codeword ($n = m + r$). When the codeword arrives at the receiver:</p>
        <ul>
          <li>An error could have occurred in any of the $m$ data bit positions ($m$ possibilities).</li>
          <li>An error could have occurred in any of the $r$ parity bit positions ($r$ possibilities).</li>
          <li>No error occurred at all ($1$ possibility).</li>
        </ul>
        <p>Hence, there are a total of $(m + r + 1)$ mutually exclusive states that must be uniquely identified. Since $r$ parity bits can represent $2^r$ distinct syndrome states, the syndrome must have sufficient capacity to encode all possibilities: <strong>$2^r \\ge m + r + 1$</strong>.</p>
        <table class="wiki-table">
          <thead><tr><th>Data Bits ($m$)</th><th>Redundant Bits ($r$)</th><th>Total Codeword ($n$)</th><th>Standard Designation</th><th>Efficiency ($m/n$)</th></tr></thead>
          <tbody>
            <tr><td>4 bits</td><td>3 bits ($2^3 = 8 \\ge 4 + 3 + 1$)</td><td>7 bits</td><td>Hamming $(7,4)$</td><td>57.1%</td></tr>
            <tr><td>11 bits</td><td>4 bits ($2^4 = 16 \\ge 11 + 4 + 1$)</td><td>15 bits</td><td>Hamming $(15,11)$</td><td>73.3%</td></tr>
            <tr><td>26 bits</td><td>5 bits ($2^5 = 32 \\ge 26 + 5 + 1$)</td><td>31 bits</td><td>Hamming $(31,26)$</td><td>83.9%</td></tr>
            <tr><td>57 bits</td><td>6 bits ($2^6 = 64 \\ge 57 + 6 + 1$)</td><td>63 bits</td><td>Hamming $(63,57)$</td><td>90.5%</td></tr>
          </tbody>
        </table>
      `,
      workedExamples: {
        level1: "<strong>Question:</strong> How many parity bits are needed to encode an 8-bit byte ($m = 8$) using Hamming code?<br><br><strong>Solution:</strong><br>We test values of $r$ in $2^r \\ge 8 + r + 1 = 9 + r$:<br>• $r = 3 \\implies 2^3 = 8 < 9 + 3 = 12$ (Insufficient)<br>• $r = 4 \\implies 2^4 = 16 \\ge 9 + 4 = 13$ (Satisfied!)<br>Therefore, 4 parity bits are required, creating a 12-bit codeword $(12,8)$.",
        level2: "<strong>Problem:</strong> For a 16-bit microprocessor data bus ($m = 16$), calculate the minimum number of parity bits required and identify the bit positions of all parity bits.<br><br><strong>Solution:</strong><br>1. Check $r$: $2^r \\ge 16 + r + 1 = 17 + r$.<br>For $r = 4$: $2^4 = 16 < 17 + 4 = 21$ (No).<br>For $r = 5$: $2^5 = 32 \\ge 17 + 5 = 22$ (Yes!).<br>2. Minimum parity bits $r = 5$. Codeword length $n = 16 + 5 = 21$ bits.<br>3. Parity bit positions: $P_1 = 1, P_2 = 2, P_4 = 4, P_8 = 8, P_{16} = 16$.",
        level3: "<strong>Analysis of SECDED:</strong> Why does standard ECC memory use 8 parity bits for 64-bit data ($m = 64$) rather than 7?<br><br><strong>Analysis:</strong> For $m = 64$, $2^r \\ge 64 + r + 1 \\implies r = 7$ bits ($2^7 = 128 \\ge 72$). A 7-bit Hamming code gives $d_{\\min} = 3$, which corrects 1 error but <em>misidentifies</em> a 2-bit error as a 1-bit error! By adding an 8th overall parity bit $P_0$ over the entire codeword, $d_{\\min}$ increases to 4. This provides <strong>SECDED (Single Error Correction, Double Error Detection)</strong>: 1 error is corrected; 2 errors are reliably detected and trigger a kernel panic instead of silent data corruption."
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Hamming Code Advantages</th><th>Hamming Code Limitations</th></tr></thead>
          <tbody>
            <tr><td>Simple hardware implementation using exclusively XOR trees.</td><td>High overhead for small block sizes (43% overhead in (7,4) code).</td></tr>
            <tr><td>Deterministic, near-instantaneous error localization and correction.</td><td>Cannot correct burst errors (only designed for independent random single-bit flips).</td></tr>
            <tr><td>Can be extended to SECDED with just 1 additional parity bit.</td><td>If 3 or more bits flip, decoding produces an incorrect codeword without warning.</td></tr>
          </tbody>
        </table>
      `,
      whereUsed: [
        "Server ECC DDR4 and DDR5 DIMM modules (SECDED Hamming encoding)",
        "L1, L2, and L3 processor cache integrity registers",
        "PCIe Express bus link layer retry mechanisms",
        "Aerospace and satellite radiation-hardened memory"
      ],
      quiz: [
        {
          question: "At which bit positions are the parity check bits placed in a standard Hamming code?",
          options: [
            "At positions that are powers of 2 (1, 2, 4, 8, 16, ...).",
            "At odd positions only (1, 3, 5, 7, ...).",
            "At the very end of the codeword as a trailer.",
            "At prime number positions (2, 3, 5, 7, 11, ...)."
          ],
          correct: 0,
          explanation: "Parity bits are placed at powers of 2 so that their binary representations have exactly one 1-bit, allowing each parity bit to serve as an independent coordinate in the syndrome."
        },
        {
          question: "What is the minimum Hamming distance of a standard single-error correcting Hamming code?",
          options: [
            "d_min = 3",
            "d_min = 1",
            "d_min = 2",
            "d_min = 5"
          ],
          correct: 0,
          explanation: "Standard Hamming codes are designed with d_min = 3, which satisfies d_min >= 2t + 1 for t = 1 (single-error correction)."
        },
        {
          question: "How many parity bits are required to encode an 11-bit dataword (m = 11) using Hamming code?",
          options: [
            "4 bits (since 2^4 = 16 >= 11 + 4 + 1 = 16)",
            "3 bits",
            "5 bits",
            "2 bits"
          ],
          correct: 0,
          explanation: "Plugging m = 11 into 2^r >= m + r + 1 gives 2^4 = 16 >= 11 + 4 + 1 = 16, perfectly satisfied by r = 4."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, Chapter 10.3 'Hamming Codes', pp. 315–319.", url: "" },
        { cite: "Richard W. Hamming, 'Error Detecting and Error Correcting Codes', Bell System Technical Journal, 1950.", url: "" }
      ]
    }
  },

  "u2-hamming-code-calculation": {
    id: "u2-hamming-code-calculation",
    title: "Hamming Code Calculation",
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: "Intermediate",
    category: "datalink",
    difficulty: "Intermediate",
    readingTime: "25 min",
    standard: "Forouzan Ch. 10.3 / Tanenbaum Ch. 3.2",
    oneLiner: "The exact, step-by-step mathematical algorithm for encoding an arbitrary dataword into a Hamming error-correcting codeword.",
    quickAnswer: "Hamming code calculation follows a five-step algorithmic procedure: (1) Compute redundant bits $r$ using $2^r \\ge m + r + 1$, (2) Set up bit positions from 1 to $n = m + r$, (3) Assign powers-of-2 positions ($1, 2, 4, \\dots$) as parity bits and remaining slots as data bits, (4) Map each parity bit to its binary subset, and (5) Evaluate each parity bit using even (or odd) parity XOR logic.",
    whyItMatters: "Mastering Hamming code calculation is essential for computer science university examinations and provides the foundational understanding of how error-resilient memory controllers are synthesized in silicon.",
    prerequisitesList: [
      { concept: "Hamming Code Working Principle", meaning: "Position allocation and the 2^r >= m + r + 1 rule." },
      { concept: "Bitwise Modulo-2 Arithmetic", meaning: "Even parity XOR equations." }
    ],
    learningObjectives: [
      "Execute the complete 5-step Hamming code encoding algorithm for any dataword.",
      "Construct the exact bit coverage equations for $P_1, P_2, P_4, P_8$.",
      "Encode 4-bit, 7-bit, and 8-bit datawords into pristine Hamming codewords.",
      "Verify even parity consistency across all parity subsets."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "Hamming Linear Block Coding",
      type: "Algorithmic Encoding Procedure",
      prerequisites: ["u2-hamming-working-principle"],
      relatedConcepts: ["u2-hamming-detection-correction", "u2-hamming-numerical-problems"],
      compareWith: ["u2-crc-binary-division"],
      primaryUses: ["ECC encoding synthesis", "Hardware ALU error checking", "Data link forward error correction"]
    },
    imageUrl: "assets/images/unit2/topic1/hamming-code-bit-layout.svg",
    imageCaption: "Figure 10.8: Step-by-Step Hamming Encoding Workflow for Dataword 1011.",
    sections: {
      overview: `
        <p>Calculating a Hamming codeword requires systematic execution of mathematical steps based on modular binary arithmetic. As presented in <em>Forouzan Chapter 10.3</em>, we assume the standard convention of <strong>even parity</strong>, where parity bits are set so that the total count of 1s in each parity-check group is an even number.</p>
        <div class="wiki-callout tip">
          <div class="callout-header"><i class="fa-solid fa-list-ol text-blue-500 mr-1"></i> The 5-Step Encoding Algorithm</div>
          <ol class="list-decimal pl-5 space-y-1 text-xs">
            <li><strong>Step 1:</strong> Find the minimum redundant bits $r$ satisfying $2^r \\ge m + r + 1$.</li>
            <li><strong>Step 2:</strong> Create an array of $n = m + r$ bits, numbered 1 to $n$ from left to right.</li>
            <li><strong>Step 3:</strong> Place parity bits $P_1, P_2, P_4, P_8, \\dots$ at positions $1, 2, 4, 8, \\dots$</li>
            <li><strong>Step 4:</strong> Fill the vacant positions in sequential order with the data bits ($D_3, D_5, D_6, D_7, \\dots$).</li>
            <li><strong>Step 5:</strong> Compute the value of each parity bit $P_i$ using XOR over its respective subset.</li>
          </ol>
        </div>
      `,
      eli10: "Encoding a Hamming code is like filling a row of 7 seats at a movie theater. Seats 1, 2, and 4 are reserved for team captains (parity bits). Seats 3, 5, 6, and 7 are for players (data bits). Once the players sit down, each captain looks at the players on their team, counts the 1s, and makes their own seat either 0 or 1 so the team total is always even!",
      analogy: "A sudoku puzzle row where certain cells are pre-filled with data, and you must calculate the remaining 'check cells' so that every row and intersecting box sums to an exact target number.",
      howItWorks: `
        <p><strong>Parity Subsets Breakdown:</strong></p>
        <ul>
          <li><strong>$P_1$ (Position 1, binary <code>..001</code>):</strong> Checks all positions with bit 0 set to 1:
            <br>Positions: $1, 3, 5, 7, 9, 11, 13, 15, \\dots$
            <br>Formula (for 7-bit code): $P_1 = D_3 \\oplus D_5 \\oplus D_7$.
          </li>
          <li><strong>$P_2$ (Position 2, binary <code>..010</code>):</strong> Checks all positions with bit 1 set to 1:
            <br>Positions: $2, 3, 6, 7, 10, 11, 14, 15, \\dots$
            <br>Formula (for 7-bit code): $P_2 = D_3 \\oplus D_6 \\oplus D_7$.
          </li>
          <li><strong>$P_4$ (Position 4, binary <code>..100</code>):</strong> Checks all positions with bit 2 set to 1:
            <br>Positions: $4, 5, 6, 7, 12, 13, 14, 15, \\dots$
            <br>Formula (for 7-bit code): $P_4 = D_5 \\oplus D_6 \\oplus D_7$.
          </li>
          <li><strong>$P_8$ (Position 8, binary <code>.1000</code>):</strong> Checks all positions with bit 3 set to 1:
            <br>Positions: $8, 9, 10, 11, 12, 13, 14, 15, \\dots$
            <br>Formula (for 11-bit code): $P_8 = D_9 \\oplus D_{10} \\oplus D_{11}$.
          </li>
        </ul>
      `,
      diagram: `
+---------------------------------------------------------------------------------+
|               HAMMING (7,4) STEP-BY-STEP CALCULATION: DATA = 1011               |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  Step 1: Dataword = 1 0 1 1  (m = 4). Redundant bits r = 3 (Total n = 7).       |
|                                                                                 |
|  Step 2 & 3: Allocate slots:                                                    |
|  Pos:    1    2    3    4    5    6    7                                        |
|  Type:  P1   P2   D3   P4   D5   D6   D7                                        |
|  Val:   ?    ?    1    ?    0    1    1                                         |
|                                                                                 |
|  Step 4: Compute Parity Bits (Even Parity):                                     |
|                                                                                 |
|  * P1 checks {1, 3, 5, 7}:                                                      |
|    P1 ⊕ D3 ⊕ D5 ⊕ D7 = 0  -->  P1 ⊕ 1 ⊕ 0 ⊕ 1 = 0                               |
|    P1 ⊕ 0 = 0  -->  P1 = 0                                                      |
|                                                                                 |
|  * P2 checks {2, 3, 6, 7}:                                                      |
|    P2 ⊕ D3 ⊕ D6 ⊕ D7 = 0  -->  P2 ⊕ 1 ⊕ 1 ⊕ 1 = 0                               |
|    P2 ⊕ 1 = 0  -->  P2 = 1                                                      |
|                                                                                 |
|  * P4 checks {4, 5, 6, 7}:                                                      |
|    P4 ⊕ D5 ⊕ D6 ⊕ D7 = 0  -->  P4 ⊕ 0 ⊕ 1 ⊕ 1 = 0                               |
|    P4 ⊕ 0 = 0  -->  P4 = 0                                                      |
|                                                                                 |
|  Step 5: Final Assembled Codeword:                                              |
|  Bit Position:   1   2   3   4   5   6   7                                      |
|  Codeword:       0   1   1   0   0   1   1  (Transmitted Vector)                |
+---------------------------------------------------------------------------------+
      `,
      technicalDetails: `
        <p><strong>Generator Matrix Representation:</strong></p>
        <p>In linear algebra, Hamming encoding can be expressed as a matrix multiplication over the Galois Field $\\text{GF}(2)$:</p>
        <p>$$C = D \\cdot G$$</p>
        <p>Where $D$ is the $1 \\times k$ dataword vector and $G$ is the $k \\times n$ Generator Matrix:</p>
        <p>$$G = [I_k \\mid P]$$</p>
        <p>For a systematic $(7,4)$ Hamming code:</p>
        <p>$$G = \\begin{bmatrix} 1 & 0 & 0 & 0 & 1 & 1 & 0 \\\\ 0 & 1 & 0 & 0 & 1 & 0 & 1 \\\\ 0 & 0 & 1 & 0 & 0 & 1 & 1 \\\\ 0 & 0 & 0 & 1 & 1 & 1 & 1 \\end{bmatrix}$$</p>
        <p>Multiplying data vector $D = [d_1, d_2, d_3, d_4]$ by $G$ modulo-2 yields the exact same codeword bits as the manual step-by-step algorithm.</p>
      `,
      workedExamples: {
        level1: "<strong>Question:</strong> Encode dataword <code>0110</code> using standard Hamming (7,4) code with even parity.<br><br><strong>Calculation:</strong><br>Data bits: $D_3 = 0, D_5 = 1, D_6 = 1, D_7 = 0$.<br>1. $P_1 = D_3 \\oplus D_5 \\oplus D_7 = 0 \\oplus 1 \\oplus 0 = 1$.<br>2. $P_2 = D_3 \\oplus D_6 \\oplus D_7 = 0 \\oplus 1 \\oplus 0 = 1$.<br>3. $P_4 = D_5 \\oplus D_6 \\oplus D_7 = 1 \\oplus 1 \\oplus 0 = 0$.<br><br><strong>Final Codeword:</strong><br>Positions $[1..7] = [P_1, P_2, D_3, P_4, D_5, D_6, D_7] = [1, 1, 0, 0, 1, 1, 0] = \\mathbf{1100110}$.",
        level2: "<strong>Problem:</strong> Encode the 7-bit ASCII character 'A' (binary <code>1000001</code>) using Hamming code. Find $r$, assign positions, and calculate all parity bits.<br><br><strong>Solution:</strong><br>1. $m = 7$. $2^r \\ge 7 + r + 1 \\implies r = 4$ ($2^4 = 16 \\ge 12$). Codeword length $n = 7 + 4 = 11$ bits.<br>2. Parity bits at positions 1, 2, 4, 8. Data bits at 3, 5, 6, 7, 9, 10, 11.<br>Data = $D_3=1, D_5=0, D_6=0, D_7=0, D_9=0, D_{10}=0, D_{11}=1$.<br>3. Calculations:<br>• $P_1 = D_3 \\oplus D_5 \\oplus D_7 \\oplus D_9 \\oplus D_{11} = 1 \\oplus 0 \\oplus 0 \\oplus 0 \\oplus 1 = 0$.<br>• $P_2 = D_3 \\oplus D_6 \\oplus D_7 \\oplus D_{10} \\oplus D_{11} = 1 \\oplus 0 \\oplus 0 \\oplus 0 \\oplus 1 = 0$.<br>• $P_4 = D_5 \\oplus D_6 \\oplus D_7 = 0 \\oplus 0 \\oplus 0 = 0$.<br>• $P_8 = D_9 \\oplus D_{10} \\oplus D_{11} = 0 \\oplus 0 \\oplus 1 = 1$.<br>4. Codeword = $[P_1, P_2, D_3, P_4, D_5, D_6, D_7, P_8, D_9, D_{10}, D_{11}] = \\mathbf{00100001001}$.",
        level3: "<strong>Self-Checking Verification:</strong> Verify that the codeword <code>00100001001</code> satisfies all 4 parity equations.<br><br><strong>Check:</strong><br>1. $C_1 = P_1 \\oplus D_3 \\oplus D_5 \\oplus D_7 \\oplus D_9 \\oplus D_{11} = 0 \\oplus 1 \\oplus 0 \\oplus 0 \\oplus 0 \\oplus 1 = 0$ (Even ✓)<br>2. $C_2 = P_2 \\oplus D_3 \\oplus D_6 \\oplus D_7 \\oplus D_{10} \\oplus D_{11} = 0 \\oplus 1 \\oplus 0 \\oplus 0 \\oplus 0 \\oplus 1 = 0$ (Even ✓)<br>3. $C_4 = P_4 \\oplus D_5 \\oplus D_6 \\oplus D_7 = 0 \\oplus 0 \\oplus 0 \\oplus 0 = 0$ (Even ✓)<br>4. $C_8 = P_8 \\oplus D_9 \\oplus D_{10} \\oplus D_{11} = 1 \\oplus 0 \\oplus 0 \\oplus 1 = 0$ (Even ✓)<br>All 4 parity checks evaluate to 0. Codeword verified!"
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Method Efficiency</th><th>Implementation Notes</th></tr></thead>
          <tbody>
            <tr><td>Algorithm is completely deterministic with linear complexity $O(m \\log m)$.</td><td>Positions must be strictly maintained; bit ordering mismatch breaks decoding.</td></tr>
            <tr><td>Bitwise XOR matches physical silicon logic gates perfectly.</td><td>Odd parity can also be used, but sender and receiver must strictly agree.</td></tr>
          </tbody>
        </table>
      `,
      whereUsed: [
        "FPGA and ASIC hardware synthesis of memory controllers",
        "Encoding DRAM bus transfers in enterprise mission-critical servers",
        "Embedded microcontroller serial communications (CAN-FD, UART)"
      ],
      quiz: [
        {
          question: "Which positions are checked by parity bit P2 in a 7-bit Hamming code?",
          options: [
            "Positions 2, 3, 6, and 7",
            "Positions 1, 3, 5, and 7",
            "Positions 4, 5, 6, and 7",
            "Positions 2, 4, 6, and 8"
          ],
          correct: 0,
          explanation: "In binary, positions 2 (010), 3 (011), 6 (110), and 7 (111) all have a 1 in bit position 1, so they are monitored by P2."
        },
        {
          question: "If data bits are D3=1, D5=0, D7=1, what is the value of P1 under even parity?",
          options: [
            "P1 = 0 (since 1 + 0 + 1 = 2, which is already even)",
            "P1 = 1",
            "P1 = 2",
            "P1 is undefined"
          ],
          correct: 0,
          explanation: "For even parity, the sum P1 + D3 + D5 + D7 must be even. Since D3 + D5 + D7 = 2 (even), P1 must be 0."
        },
        {
          question: "What is the total codeword length n for transmitting a 4-bit dataword using Hamming code?",
          options: [
            "7 bits (4 data bits + 3 parity bits)",
            "8 bits",
            "5 bits",
            "12 bits"
          ],
          correct: 0,
          explanation: "For m = 4, the minimum r is 3 bits, giving a total codeword length n = m + r = 7 bits."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, Chapter 10.3, pp. 316–318.", url: "" },
        { cite: "Richard W. Hamming, 'Error Detecting and Error Correcting Codes', Bell System Technical Journal, 1950.", url: "" }
      ]
    }
  },

  "u2-hamming-detection-correction": {
    id: "u2-hamming-detection-correction",
    title: "Error Detection and Correction Using Hamming Code",
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: "Intermediate",
    category: "datalink",
    difficulty: "Intermediate",
    readingTime: "25 min",
    standard: "Forouzan Ch. 10.3 / Tanenbaum Ch. 3.2",
    oneLiner: "How the receiver computes the syndrome vector to detect bit errors and locate the exact corrupted bit for instant hardware correction.",
    quickAnswer: "At the receiver, the incoming codeword undergoes syndrome calculation: parity checks ($s_1, s_2, s_4, s_8$) are recalculated over the same bit subsets used during encoding. If all syndrome bits are 0, the frame is error-free. If the syndrome $S = (s_r \\dots s_2 s_1)_2$ is non-zero, its decimal value indicates the exact 1-based bit position of the error! Inverting the bit at position $S$ restores the pristine data.",
    whyItMatters: "The syndrome vector provides a direct mathematical bridge between error detection and error localization. Instead of searching through every possible permutation of bit errors, the syndrome calculates the error position in a single hardware cycle.",
    prerequisitesList: [
      { concept: "Hamming Code Calculation", meaning: "Encoding datawords into Hamming codewords." },
      { concept: "Modulo-2 Syndrome Vector", meaning: "Calculating parity check differences." }
    ],
    learningObjectives: [
      "Understand the mechanics of syndrome calculation at the receiver.",
      "Interpret the decimal value of the binary syndrome vector $S$.",
      "Correct single-bit errors by inverting the bit at position $S$.",
      "Analyze the behavior of Hamming code when two errors occur (SECDED analysis)."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "Hamming Single-Error Correction (SEC)",
      type: "Syndrome Decoding Algorithm",
      prerequisites: ["u2-hamming-code-calculation"],
      relatedConcepts: ["u2-hamming-numerical-problems", "u2-hamming-distance"],
      compareWith: ["u2-crc-numerical-problems"],
      primaryUses: ["ECC RAM error scrubber", "Processor cache fault tolerance", "Satellite receiver decoding"]
    },
    imageUrl: "assets/images/unit2/topic1/hamming-syndrome-decoder.svg",
    imageCaption: "Figure 10.9: Syndrome Vector Decoding and Automatic Bit Inversion Logic.",
    sections: {
      overview: `
        <p>Once a Hamming codeword travels across a noisy physical channel and arrives at the receiver, the receiver executes <strong>Syndrome Decoding</strong>. As explained by <em>Forouzan (Chapter 10.3, pp. 317–319)</em>, the syndrome is a binary word $S = (s_r \\dots s_2 s_1)_2$ that answers two crucial questions:</p>
        <ol class="list-decimal pl-5 space-y-1 text-xs">
          <li><strong>Is there an error?</strong> If $S = 0$, no error occurred (or an undetected error).</li>
          <li><strong>Where is the error?</strong> If $S \\ne 0$, the binary value of $S$, converted to decimal, is the <em>exact 1-based index</em> of the corrupted bit!</li>
        </ol>
      `,
      eli10: "Imagine you're solving a murder mystery with 7 suspects. The 3 detectives compare their notes and generate a 3-digit binary clue. If their clue is '000', everyone is innocent. But if their clue is '101' (which is binary for the number 5), detective math proves suspect #5 is the guilty one! You simply tap suspect #5 on the shoulder and fix the case!",
      analogy: "A dashboard engine diagnostic scanner in your car. It reads error codes from multiple sensors. If code is <code>P0304</code>, the onboard computer has mathematically calculated that Spark Plug #4 has misfired. The mechanic doesn't inspect all cylinders; they replace spark plug #4 immediately.",
      howItWorks: `
        <ol class="list-decimal pl-5 space-y-2 text-xs">
          <li><strong>Extract Received Vector:</strong> Let the received vector be $R = [r_1, r_2, r_3, r_4, r_5, r_6, r_7]$.</li>
          <li><strong>Recalculate Syndrome Bits:</strong> Using even parity rules, compute:
            <br>• $s_1 = r_1 \\oplus r_3 \\oplus r_5 \\oplus r_7$
            <br>• $s_2 = r_2 \\oplus r_3 \\oplus r_6 \\oplus r_7$
            <br>• $s_4 = r_4 \\oplus r_5 \\oplus r_6 \\oplus r_7$
          </li>
          <li><strong>Construct Syndrome Binary Vector:</strong> Form the binary word $S = (s_4 s_2 s_1)_2$.</li>
          <li><strong>Evaluate Error Position:</strong> Convert $(s_4 s_2 s_1)_2$ to decimal integer $E$.
            <br>• If $E = 0$: Codeword is valid; no error detected.
            <br>• If $1 \\le E \\le 7$: Bit position $E$ is corrupted!
          </li>
          <li><strong>Invert & Recover:</strong> Correct the bit: $r_E = r_E \\oplus 1$. Extract clean data bits ($r_3, r_5, r_6, r_7$) and pass to network layer.</li>
        </ol>
      `,
      diagram: `
+---------------------------------------------------------------------------------+
|                       HAMMING SYNDROME DECODING PIPELINE                        |
+---------------------------------------------------------------------------------+
|                                                                                 |
|   Received Vector: R = [ r1, r2, r3, r4, r5, r6, r7 ]                           |
|                                |                                                |
|            +-------------------+-------------------+                            |
|            |                   |                   |                            |
|            v                   v                   v                            |
|     s1 = r1⊕r3⊕r5⊕r7    s2 = r2⊕r3⊕r6⊕r7    s4 = r4⊕r5⊕r6⊕r7                    |
|            |                   |                   |                            |
|            +-------------------+-------------------+                            |
|                                |                                                |
|                                v                                                |
|                  Syndrome S = ( s4  s2  s1 )_2                                  |
|                                |                                                |
|            +-------------------+-------------------+                            |
|            |                                       |                            |
|        [ S == 000 ]                            [ S != 000 ]                     |
|            |                                       |                            |
|            v                                       v                            |
|      Frame is CLEAN!                   Decimal Value = Position E               |
|      Accept Dataword                               |                            |
|                                                    v                            |
|                                          Flip Bit: R[E] = NOT R[E]              |
|                                                    |                            |
|                                                    v                            |
|                                          Restored Pristine Dataword!            |
+---------------------------------------------------------------------------------+
      `,
      technicalDetails: `
        <p><strong>Parity Check Matrix Form ($H$):</strong></p>
        <p>In linear block coding, syndrome decoding is formally represented using the <strong>Parity Check Matrix $H$</strong>:</p>
        <p>$$S = R \\cdot H^T \\pmod 2$$</p>
        <p>For a standard $(7,4)$ Hamming code:</p>
        <p>$$H = \\begin{bmatrix} 1 & 0 & 1 & 0 & 1 & 0 & 1 \\\\ 0 & 1 & 1 & 0 & 0 & 1 & 1 \\\\ 0 & 0 & 0 & 1 & 1 & 1 & 1 \\end{bmatrix}$$</p>
        <p>Note that the columns of $H$ are simply the binary representations of integers 1 through 7! Hence, when an error occurs at bit position $E$, the received vector is $R = C + e_E$. Since $C \\cdot H^T = 0$, $S = (C + e_E) \\cdot H^T = e_E \\cdot H^T$, which picks out exactly the $E$-th column of $H$, which is the binary representation of $E$!</p>
      `,
      workedExamples: {
        level1: "<strong>Question:</strong> Codeword <code>0110011</code> was transmitted. Suppose noise corrupts bit 5, so the receiver receives <code>0110111</code>. Demonstrate step-by-step how the syndrome detects and corrects this error.<br><br><strong>Solution:</strong><br>Received: $r_1=0, r_2=1, r_3=1, r_4=0, r_5=1, r_6=1, r_7=1$.<br>1. Calculate $s_1 = r_1 \\oplus r_3 \\oplus r_5 \\oplus r_7 = 0 \\oplus 1 \\oplus 1 \\oplus 1 = 1$.<br>2. Calculate $s_2 = r_2 \\oplus r_3 \\oplus r_6 \\oplus r_7 = 1 \\oplus 1 \\oplus 1 \\oplus 1 = 0$.<br>3. Calculate $s_4 = r_4 \\oplus r_5 \\oplus r_6 \\oplus r_7 = 0 \\oplus 1 \\oplus 1 \\oplus 1 = 1$.<br>4. Assemble syndrome: $S = (s_4 s_2 s_1)_2 = (101)_2$.<br>5. Convert to decimal: $(101)_2 = 1 \\times 4 + 0 \\times 2 + 1 \\times 1 = \\mathbf{5}$.<br>6. <strong>Correction:</strong> Error is at bit position 5! Invert bit 5: $r_5 = 1 \\to 0$.<br>Corrected codeword: <code>0110011</code>. Clean data bits: $D_3=1, D_5=0, D_6=1, D_7=1 \\implies \\mathbf{1011}$.",
        level2: "<strong>Problem:</strong> A receiver gets the 7-bit Hamming codeword <code>1010101</code>. Check if there is an error. If yes, locate and correct it.<br><br><strong>Solution:</strong><br>Bits: $r_1=1, r_2=0, r_3=1, r_4=0, r_5=1, r_6=0, r_7=1$.<br>• $s_1 = r_1 \\oplus r_3 \\oplus r_5 \\oplus r_7 = 1 \\oplus 1 \\oplus 1 \\oplus 1 = 0$.<br>• $s_2 = r_2 \\oplus r_3 \\oplus r_6 \\oplus r_7 = 0 \\oplus 1 \\oplus 0 \\oplus 1 = 0$.<br>• $s_4 = r_4 \\oplus r_5 \\oplus r_6 \\oplus r_7 = 0 \\oplus 1 \\oplus 0 \\oplus 1 = 0$.<br>Syndrome $S = (000)_2 = 0$.<br><strong>Result:</strong> No error detected! Codeword is pristine. Dataword = $D_3 D_5 D_6 D_7 = \\mathbf{1101}$.",
        level3: "<strong>Double-Bit Error Failure Case:</strong> What happens if both bit 3 and bit 5 are flipped in transmission?<br><br><strong>Analysis:</strong> Suppose clean codeword was <code>0000000</code>. With bits 3 and 5 flipped, received is <code>0010100</code> ($r_3=1, r_5=1$).<br>• $s_1 = 0 \\oplus 1 \\oplus 1 \\oplus 0 = 0$.<br>• $s_2 = 0 \\oplus 1 \\oplus 0 \\oplus 0 = 1$.<br>• $s_4 = 0 \\oplus 1 \\oplus 0 \\oplus 0 = 1$.<br>Syndrome $S = (110)_2 = 6$!<br>The receiver mistakenly concludes that bit 6 is corrupted! It inverts bit 6, resulting in 3 total corrupted bits! This demonstrates that a basic Hamming code ($d_{\\min} = 3$) cannot reliably handle 2-bit errors; an extra overall parity bit $P_0$ (SECDED) is mandatory to detect double errors."
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Syndrome Decoding Advantages</th><th>Known Edge Cases</th></tr></thead>
          <tbody>
            <tr><td>Zero search overhead: syndrome decimal value maps directly to bit index.</td><td>Double errors produce a valid syndrome pointing to a third, innocent bit.</td></tr>
            <tr><td>Fully parallelizable in digital hardware (instant gate propagation).</td><td>Odd-parity systems require inverted syndrome interpretation ($S \\oplus 111$).</td></tr>
          </tbody>
        </table>
      `,
      whereUsed: [
        "ECC memory controllers in modern server motherboards",
        "PCI Express 6.0 Flit Mode error recovery",
        "Spacecraft telemetry decoders on NASA Deep Space Network receivers"
      ],
      quiz: [
        {
          question: "What does a syndrome vector S = (011)_2 indicate in a (7,4) Hamming code?",
          options: [
            "An error occurred at bit position 3 (since 011 in binary is 3).",
            "An error occurred at bit position 6.",
            "The codeword is completely error-free.",
            "Three simultaneous errors occurred."
          ],
          correct: 0,
          explanation: "In Hamming decoding, the binary value of the syndrome directly represents the 1-based decimal index of the corrupted bit. (011)_2 = 3."
        },
        {
          question: "If a received Hamming codeword generates a syndrome S = (000)_2, what action does the receiver take?",
          options: [
            "Accepts the codeword as valid and extracts the dataword.",
            "Requests an immediate retransmission.",
            "Inverts bit position 0.",
            "Declares a fatal unrecoverable memory error."
          ],
          correct: 0,
          explanation: "A syndrome of 000 indicates that all parity checks passed; the codeword is valid and accepted."
        },
        {
          question: "Why does a standard (7,4) Hamming code fail when two bits are corrupted?",
          options: [
            "Because d_min = 3, which satisfies d_min >= 2t + 1 only for t = 1; two errors cause the syndrome to point to a valid, false codeword.",
            "Because 7 is a prime number.",
            "Because XOR cannot handle more than one operation.",
            "Because parity bits cannot be corrupted."
          ],
          correct: 0,
          explanation: "A code with d_min = 3 can only guarantee single-error correction. When two errors occur, the received word is closer to a different valid codeword, fooling the decoder."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, Chapter 10.3, pp. 317–319.", url: "" },
        { cite: "William Stallings, Data and Computer Communications, 10th Edition, Pearson, Chapter 6.", url: "" }
      ]
    }
  },

  "u2-hamming-numerical-problems": {
    id: "u2-hamming-numerical-problems",
    title: "Hamming Code: Numerical Problems",
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: "Advanced",
    category: "datalink",
    difficulty: "Advanced",
    readingTime: "30 min",
    standard: "Forouzan Ch. 10.3 / University Exam Pattern",
    oneLiner: "Mastering step-by-step solved numerical problems, encoding procedures, syndrome calculations, and error corrections.",
    quickAnswer: "This comprehensive problem repository provides step-by-step solved numerical problems covering 4-bit, 7-bit, and 8-bit Hamming encoding, error detection, single-bit and double-bit error analysis, minimum parity bit calculations, and SECDED extensions. Every calculation is explicitly explained with complete parity check tables.",
    whyItMatters: "Numerical problems on Hamming Codes are ubiquitous across university end-semester examinations and competitive exams (such as GATE). Mastering these step-by-step solutions ensures flawless performance in exam problem-solving.",
    prerequisitesList: [
      { concept: "Hamming Code Calculation", meaning: "Step-by-step encoding algorithm." },
      { concept: "Hamming Detection & Correction", meaning: "Syndrome vector derivation." }
    ],
    learningObjectives: [
      "Solve end-to-end university numerical problems on Hamming code encoding and decoding.",
      "Calculate parity equations for 4-bit, 7-bit, and 8-bit datawords with zero calculation errors.",
      "Perform syndrome calculations to detect, locate, and invert corrupted bits.",
      "Compute minimum parity bits for large data words (16-bit, 32-bit, 64-bit buses)."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "Examination & Numerical Problem Bank",
      type: "Solved Numerical Problem Repository",
      prerequisites: ["u2-hamming-code-calculation", "u2-hamming-detection-correction"],
      relatedConcepts: ["u2-crc-numerical-problems", "u2-hamming-distance"],
      compareWith: ["u2-crc-binary-division"],
      primaryUses: ["GATE examination preparation", "University semester exam preparation", "Algorithm verification"]
    },
    imageUrl: "assets/images/unit2/topic1/hamming-worked-numerical.svg",
    imageCaption: "Figure 10.10: Complete Step-by-Step Solved Hamming Code Numerical Matrix.",
    sections: {
      overview: `
        <p>This section is dedicated exclusively to rigorous, step-by-step solved numerical problems on Hamming Code, structured according to standard university examination rubrics (Forouzan Chapter 10.3).</p>
        <div class="wiki-callout note">
          <div class="callout-header"><i class="fa-solid fa-graduation-cap text-gfg-green mr-1"></i> Examination Strategy</div>
          <p class="text-xs">When solving Hamming code problems in examinations, always write out: (1) The formula $2^r \\ge m + r + 1$, (2) The bit position allocation table (1 to $n$), (3) The binary indices for all bit positions, (4) The individual parity check equations, and (5) The final codeword vector.</p>
        </div>
      `,
      eli10: "A practice gym with full step-by-step answer keys showing you exactly how to solve any Hamming code exam question from start to finish without getting stuck!",
      analogy: "Like a flight simulator for pilots before flying a real jet: practicing each numerical problem builds the muscle memory needed to calculate parity bits and syndrome decoders effortlessly under exam conditions.",
      howItWorks: `
        <p><strong>Standard Exam Problem Types:</strong></p>
        <ol class="list-decimal pl-5 space-y-2 text-xs">
          <li><strong>Type 1: Parity Bit Count:</strong> Find $r$ for an $m$-bit message using $2^r \\ge m + r + 1$.</li>
          <li><strong>Type 2: Forward Encoding:</strong> Given dataword $D$, generate the full $n$-bit codeword using even (or odd) parity.</li>
          <li><strong>Type 3: Syndrome Decoding & Correction:</strong> Given received vector $R$, calculate syndrome $S$, state if an error occurred, locate the bit, and write the corrected dataword.</li>
          <li><strong>Type 4: SECDED Extension:</strong> Show how an additional parity bit $P_0$ distinguishes single from double errors.</li>
        </ol>
      `,
      diagram: `
+---------------------------------------------------------------------------------+
|                   MASTER PROBLEM SOLVING MATRIX FOR HAMMING (7,4)               |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  Bit Position:    1       2       3       4       5       6       7             |
|  Position Binary:001     010     011     100     101     110     111            |
|  Role:            P1      P2      D3      P4      D5      D6      D7            |
|                                                                                 |
|  * P1 (xx1):      X               X               X               X             |
|  * P2 (x1x):              X       X                       X       X             |
|  * P4 (1xx):                              X       X       X       X             |
|                                                                                 |
|  Syndrome:                                                                      |
|  s1 = r1 ⊕ r3 ⊕ r5 ⊕ r7                                                         |
|  s2 = r2 ⊕ r3 ⊕ r6 ⊕ r7                                                         |
|  s4 = r4 ⊕ r5 ⊕ r6 ⊕ r7                                                         |
|  Position in Error = (s4 * 4) + (s2 * 2) + (s1 * 1)                             |
+---------------------------------------------------------------------------------+
      `,
      technicalDetails: `
        <p><strong>Comprehensive Problem Set:</strong></p>
        <p><strong>Problem 1 (GATE Question):</strong> A 7-bit Hamming codeword is received as <code>1010111</code>. Assuming even parity was used at the transmitter, determine whether the received data is correct. If corrupted, locate the error and reconstruct the original 4-bit dataword.</p>
        <p><strong>Problem 2:</strong> Encode the 7-bit dataword <code>1001101</code> using Hamming code with even parity.</p>
        <p><strong>Problem 3:</strong> Calculate the minimum number of parity bits required to transmit 16-bit, 32-bit, and 64-bit datawords with single-error correction capability.</p>
      `,
      workedExamples: {
        level1: "<strong>Detailed Solution for Problem 1:</strong><br>Received: $r_1=1, r_2=0, r_3=1, r_4=0, r_5=1, r_6=1, r_7=1$.<br>1. Calculate Syndrome Bit $s_1$:<br>$s_1 = r_1 \\oplus r_3 \\oplus r_5 \\oplus r_7 = 1 \\oplus 1 \\oplus 1 \\oplus 1 = 0$.<br>2. Calculate Syndrome Bit $s_2$:<br>$s_2 = r_2 \\oplus r_3 \\oplus r_6 \\oplus r_7 = 0 \\oplus 1 \\oplus 1 \\oplus 1 = 1$.<br>3. Calculate Syndrome Bit $s_4$:<br>$s_4 = r_4 \\oplus r_5 \\oplus r_6 \\oplus r_7 = 0 \\oplus 1 \\oplus 1 \\oplus 1 = 1$.<br>4. Assemble Syndrome: $S = (s_4 s_2 s_1)_2 = (110)_2$.<br>5. Decimal conversion: $(110)_2 = 1 \\times 4 + 1 \\times 2 + 0 \\times 1 = \\mathbf{6}$.<br>6. <strong>Diagnosis:</strong> Corrupted bit is at position 6 ($r_6$).<br>7. <strong>Correction:</strong> Invert bit 6: $r_6 = 1 \\to 0$.<br>Corrected Codeword = <code>1010101</code>.<br>8. <strong>Data Recovery:</strong> Extract data bits at positions 3, 5, 6, 7 $\\implies D_3=1, D_5=1, D_6=0, D_7=1 \\implies \\mathbf{1101}$.",
        level2: "<strong>Detailed Solution for Problem 2 (7-bit Dataword Encoding):</strong><br>Dataword = <code>1001101</code> ($m = 7$).<br>1. Find $r$: $2^r \\ge 7 + r + 1 \\implies 2^4 = 16 \\ge 12 \\implies r = 4$ parity bits ($P_1, P_2, P_4, P_8$).<br>Total codeword $n = 7 + 4 = 11$ bits.<br>2. Position Layout:<br>Positions: 1(P1), 2(P2), 3(D3), 4(P4), 5(D5), 6(D6), 7(D7), 8(P8), 9(D9), 10(D10), 11(D11).<br>Map Data: $D_3=1, D_5=0, D_6=0, D_7=1, D_9=1, D_{10}=0, D_{11}=1$.<br>3. Parity Calculations:<br>• $P_1 = D_3 \\oplus D_5 \\oplus D_7 \\oplus D_9 \\oplus D_{11} = 1 \\oplus 0 \\oplus 1 \\oplus 1 \\oplus 1 = 0$.<br>• $P_2 = D_3 \\oplus D_6 \\oplus D_7 \\oplus D_{10} \\oplus D_{11} = 1 \\oplus 0 \\oplus 1 \\oplus 0 \\oplus 1 = 1$.<br>• $P_4 = D_5 \\oplus D_6 \\oplus D_7 = 0 \\oplus 0 \\oplus 1 = 1$.<br>• $P_8 = D_9 \\oplus D_{10} \\oplus D_{11} = 1 \\oplus 0 \\oplus 1 = 0$.<br>4. Assemble 11-bit Codeword: $[0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1] = \\mathbf{01110010101}$.",
        level3: "<strong>Detailed Solution for Problem 3 (Bus Parity Sizing):</strong><br>1. <strong>16-bit word ($m=16$):</strong><br>$2^r \\ge 16 + r + 1 \\implies 2^5 = 32 \\ge 22 \\implies r = 5$ bits.<br>Total codeword = 21 bits. Overhead = $5/21 = 23.8\\%$.<br><br>2. <strong>32-bit word ($m=32$):</strong><br>$2^r \\ge 32 + r + 1 \\implies 2^6 = 64 \\ge 39 \\implies r = 6$ bits.<br>Total codeword = 38 bits. Overhead = $6/38 = 15.8\\%$.<br><br>3. <strong>64-bit word ($m=64$):</strong><br>$2^r \\ge 64 + r + 1 \\implies 2^7 = 128 \\ge 72 \\implies r = 7$ bits.<br>Total codeword = 71 bits. Overhead = $7/71 = 9.8\\%$.<br><br><em>Conclusion:</em> As dataword size grows, the percentage overhead of Hamming code drops significantly."
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Exam Tip</th><th>Common Student Error</th></tr></thead>
          <tbody>
            <tr><td>Always write binary position indices (e.g. 5 = 101) to verify parity subsets.</td><td>Confusing data bit numbers ($D_1, D_2$) with position numbers ($3, 5, 6, 7$).</td></tr>
            <tr><td>Remember that S is read in reverse: $(s_4 s_2 s_1)$ not $(s_1 s_2 s_4)$.</td><td>Calculating odd parity when the question explicitly specifies even parity.</td></tr>
          </tbody>
        </table>
      `,
      whereUsed: [
        "University semester examination papers in Computer Networks & Digital Systems",
        "GATE Computer Science & Information Technology question papers",
        "Hardware verification testbenches for memory controllers"
      ],
      quiz: [
        {
          question: "In Problem 1, if the syndrome evaluates to S = (110)_2, which bit position is corrupted?",
          options: [
            "Bit position 6 (since (110)_2 = 6 in decimal)",
            "Bit position 3",
            "Bit position 5",
            "Bit position 7"
          ],
          correct: 0,
          explanation: "In binary, (110)_2 is equal to 1*4 + 1*2 + 0*1 = 6. Therefore, bit position 6 is the corrupted bit."
        },
        {
          question: "For a 32-bit dataword (m = 32), what is the minimum number of parity bits required for Hamming code?",
          options: [
            "6 bits (since 2^6 = 64 >= 32 + 6 + 1 = 39)",
            "5 bits (since 2^5 = 32)",
            "7 bits",
            "4 bits"
          ],
          correct: 0,
          explanation: "Plugging r = 6 into 2^r >= m + r + 1 gives 64 >= 39, which is the smallest power of 2 that satisfies the inequality."
        },
        {
          question: "What is the consequence of reversing the syndrome bit order (reading s1 s2 s4 instead of s4 s2 s1)?",
          options: [
            "The receiver will calculate the wrong decimal value and invert an innocent bit instead of the corrupted one.",
            "The error will still be corrected properly.",
            "The frame will automatically be retransmitted.",
            "The parity generator will shut down."
          ],
          correct: 0,
          explanation: "The syndrome vector is binary: s4 is the MSB (2^2), s2 is the middle bit (2^1), and s1 is the LSB (2^0). Reversing them produces an incorrect index."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, Chapter 10.3, pp. 317–319.", url: "" },
        { cite: "GATE Computer Science Previous Years' Solved Papers (Computer Networks - Error Control).", url: "" }
      ]
    }
  },

  "u2-crc-intro": {
    id: "u2-crc-intro",
    title: "Cyclic Redundancy Check: Introduction to CRC",
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: "Core",
    category: "datalink",
    difficulty: "Core",
    readingTime: "15 min",
    standard: "Forouzan Ch. 10.4 / Tanenbaum Ch. 3.2",
    oneLiner: "The premier error-detecting cyclic code in modern networking based on polynomial modulo-2 binary arithmetic.",
    quickAnswer: "Cyclic Redundancy Check (CRC) is a category of cyclic block codes widely deployed in modern local and wide area networks (Ethernet, Wi-Fi, HDLC). In cyclic codes, any cyclic circular shift of a valid codeword yields another valid codeword. CRC treats binary data streams as algebraic polynomials and provides exceptional mathematical protection against burst errors.",
    whyItMatters: "CRC-32 is the universal Frame Check Sequence (FCS) protecting virtually every Ethernet frame and Wi-Fi packet transmitted on the planet. Without CRC, silent packet corruption would corrupt file downloads, database transactions, and operating system updates.",
    prerequisitesList: [
      { concept: "Introduction to Error Detection", meaning: "Frame integrity validation and rejection." },
      { concept: "Redundancy and Block Coding", meaning: "Appending check bits to datawords." }
    ],
    learningObjectives: [
      "Define cyclic codes and state the fundamental cyclic shift property.",
      "Understand why CRC is vastly superior to simple parity and checksum for burst errors.",
      "Recognize the algebraic representation of binary strings as polynomials in GF(2).",
      "Identify the standard network architectures utilizing CRC (Ethernet, 802.11, HDLC, USB)."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "IEEE 802.3 / IEEE 802.11 / ITU-T V.41",
      type: "Cyclic Error-Detecting Code",
      prerequisites: ["u2-intro-error-detection", "u2-redundancy-error-control"],
      relatedConcepts: ["u2-crc-working-principle", "u2-crc-generator-polynomial"],
      compareWith: ["u2-hamming-working-principle"],
      primaryUses: ["Ethernet Frame Check Sequence (FCS)", "Wi-Fi 802.11 MAC framing", "SATA / USB / CAN serial bus data integrity"]
    },
    imageUrl: "assets/images/unit2/topic1/crc-modulo2-division-flow.svg",
    imageCaption: "Figure 10.11: Cyclic Redundancy Check (CRC) Operational Pipeline.",
    sections: {
      overview: `
        <p>As presented by <em>Behrouz A. Forouzan (Chapter 10.4, pp. 321–323)</em>, <strong>Cyclic codes</strong> are a special subset of linear block codes that possess a unique mathematical attribute: <em>if a codeword is cyclically shifted (rotated), the resulting bit pattern is also a valid codeword</em>.</p>
        <p>The most famous and widely deployed category of cyclic codes in telecommunications is the <strong>Cyclic Redundancy Check (CRC)</strong>. CRC is utilized across virtually every standard networking protocol—including Ethernet (IEEE 802.3), Wi-Fi (IEEE 802.11), Token Ring, ATM, and HDLC—because it offers unmatched protection against burst errors and is extraordinarily cheap to implement in high-speed hardware using linear feedback shift registers (LFSR).</p>
      `,
      eli10: "Imagine you're sending a message written on a spinning bicycle wheel. If you rotate the wheel, the letters still follow the exact same grammatical rules! In math, CRC takes your data, treats it like a giant algebraic puzzle, and divides it by a special secret key. The leftover remainder is glued to your message. If even a tiny speck of mud smudges the message, the remainder won't match, and the receiver catches the error!",
      analogy: "A mathematical digital seal on a legal contract. An auditor divides the contract's unique numerical hash by a universal mathematical key. If the remainder is not exactly zero, the auditor knows someone altered a clause or injected counterfeit numbers.",
      howItWorks: `
        <ol class="list-decimal pl-5 space-y-2 text-xs">
          <li><strong>Polynomial Representation:</strong> A string of $k$ binary bits is represented as a polynomial $D(x)$ of degree $k-1$ with coefficients in $\\{0, 1\\}$. For example, <code>10011</code> is $x^4 + x + 1$.</li>
          <li><strong>Generator Agreement:</strong> The sender and receiver agree in advance on a fixed <strong>Generator Polynomial $G(x)$</strong> of degree $r$.</li>
          <li><strong>Zero Appending:</strong> The sender appends $r$ zeros to the dataword, equivalent to multiplying $D(x)$ by $x^r$.</li>
          <li><strong>Modulo-2 Division:</strong> The sender divides $(D(x) \\cdot x^r)$ by $G(x)$ using modulo-2 arithmetic (where addition and subtraction are identical to bitwise XOR).</li>
          <li><strong>Remainder as FCS:</strong> The resulting $r$-bit remainder $R(x)$ is the <em>Frame Check Sequence (FCS)</em>.</li>
          <li><strong>Codeword Assembly:</strong> The sender transmits $T(x) = (D(x) \\cdot x^r) \\oplus R(x)$.</li>
        </ol>
      `,
      diagram: `
+---------------------------------------------------------------------------------+
|                       CYCLIC REDUNDANCY CHECK ARCHITECTURE                      |
+---------------------------------------------------------------------------------+
|                                                                                 |
|   SENDER:                                                                       |
|   Dataword D(x) ----------> Append r zeros: D(x) * x^r                          |
|                                     |                                           |
|                                     v                                           |
|                           [ Modulo-2 Division ] <--- Generator G(x)             |
|                                     |                                           |
|                                     v                                           |
|                             Remainder R(x) (r bits FCS)                         |
|                                     |                                           |
|                                     v                                           |
|   Codeword Transmitted: T(x) = [ Dataword D(x) | FCS Remainder R(x) ]           |
|                                     |                                           |
|   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Physical Channel ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   |
|                                     |                                           |
|   RECEIVER:                         v                                           |
|   Received Vector: T'(x) = [ Received Data | Received FCS ]                     |
|                                     |                                           |
|                                     v                                           |
|                           [ Modulo-2 Division ] <--- Generator G(x)             |
|                                     |                                           |
|                         Syndrome Remainder == 0 ?                               |
|                            /                 \\                                  |
|                         [YES]               [NO]                                |
|                          |                    |                                 |
|                          v                    v                                 |
|                  Frame ACCEPTED!       Frame REJECTED! (Corrupted)              |
+---------------------------------------------------------------------------------+
      `,
      technicalDetails: `
        <p><strong>Why CRC Outperforms Checksums:</strong></p>
        <p>Standard arithmetic checksums (such as the 16-bit Internet Checksum) perform simple commutative addition. If bits swap places, or if one byte increases while another decreases by the same amount, the checksum evaluates to valid. In contrast, CRC uses <strong>polynomial division over $\\text{GF}(2)$</strong>:</p>
        <ul>
          <li>Positions matter: A bit flip at position $x^i$ affects all subsequent division steps.</li>
          <li>Guaranteed detection of all single-bit errors (if $G(x)$ contains at least two terms).</li>
          <li>Guaranteed detection of all double-bit errors (if $G(x)$ does not divide $x^k + 1$ for $k < \\text{frame length}$).</li>
          <li>Guaranteed detection of all odd numbers of errors (if $G(x)$ contains factor $x + 1$).</li>
          <li>Guaranteed detection of all burst errors of length $\\le r$ bits.</li>
        </ul>
      `,
      workedExamples: {
        level1: "<strong>Question:</strong> Convert the binary bit string <code>110101</code> into its algebraic polynomial representation.<br><br><strong>Solution:</strong><br>Number bit positions from right to left starting at 0:<br>Bit 5 = 1 $\\implies 1 \\times x^5$<br>Bit 4 = 1 $\\implies 1 \\times x^4$<br>Bit 3 = 0 $\\implies 0 \\times x^3$<br>Bit 2 = 1 $\\implies 1 \\times x^2$<br>Bit 1 = 0 $\\implies 0 \\times x^1$<br>Bit 0 = 1 $\\implies 1 \\times x^0 = 1$<br><br>Polynomial $D(x) = x^5 + x^4 + x^2 + 1$.",
        level2: "<strong>Problem:</strong> A generator polynomial is given as $G(x) = x^4 + x^3 + 1$. What is its binary divisor representation, its degree, and how many check bits will it produce?<br><br><strong>Solution:</strong><br>1. Polynomial terms: $x^4 (1) + x^3 (1) + x^2 (0) + x^1 (0) + x^0 (1)$.<br>Binary representation = <code>11001</code>.<br>2. Degree of polynomial is the highest power = $4$.<br>3. Check bits produced $r = \\text{degree} = 4$ bits.",
        level3: "<strong>Algebraic Proof:</strong> Prove that the transmitted codeword $T(x) = (D(x) \\cdot x^r) \\oplus R(x)$ is perfectly divisible by $G(x)$ with zero remainder.<br><br><strong>Proof:</strong><br>By definition of division: $(D(x) \\cdot x^r) = Q(x) \\cdot G(x) \\oplus R(x)$, where $Q(x)$ is the quotient and $R(x)$ is the remainder.<br>In modulo-2 arithmetic, addition and subtraction are both identical to XOR ($\\oplus$). Rearranging:<br>$(D(x) \\cdot x^r) \\oplus R(x) = Q(x) \\cdot G(x)$.<br>Since the left side is exactly our transmitted codeword $T(x)$, we have $T(x) = Q(x) \\cdot G(x)$.<br>Dividing $T(x)$ by $G(x)$ yields quotient $Q(x)$ and <strong>remainder 0</strong>! Hence, any uncorrupted frame leaves a remainder of zero at the receiver."
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages of CRC</th><th>Limitations of CRC</th></tr></thead>
          <tbody>
            <tr><td>Unmatched burst-error detection (catches 100% of bursts $\\le r$ bits).</td><td>Cannot correct errors locally; requires frame retransmission.</td></tr>
            <tr><td>Extremely efficient in hardware using shift registers and XOR gates.</td><td>Slightly more complex to compute in software than simple arithmetic checksum.</td></tr>
            <tr><td>Zero vulnerability to byte-swapping or bit-reversal errors.</td><td>Linear property means CRC is not cryptographically secure against intentional tampering.</td></tr>
          </tbody>
        </table>
      `,
      whereUsed: [
        "Ethernet (IEEE 802.3) MAC frames (CRC-32 FCS)",
        "Wi-Fi (IEEE 802.11) wireless frames (CRC-32)",
        "Serial ATA (SATA) hard drive and SSD data bus transfers",
        "Universal Serial Bus (USB) packet tokens (CRC-5) and data packets (CRC-16)"
      ],
      quiz: [
        {
          question: "What is the defining property of a cyclic code?",
          options: [
            "Any circular cyclic shift of a valid codeword produces another valid codeword.",
            "The data bits must alternate between 0 and 1.",
            "The sender and receiver change roles every second.",
            "Packets must travel in a physical ring topology."
          ],
          correct: 0,
          explanation: "In cyclic codes, rotating or cyclically shifting any valid codeword yields another valid codeword in the same codebook."
        },
        {
          question: "If the generator polynomial is of degree r, how many redundant FCS bits are appended to the dataword?",
          options: [
            "Exactly r bits",
            "r + 1 bits",
            "2^r bits",
            "r - 1 bits"
          ],
          correct: 0,
          explanation: "The remainder from dividing by a polynomial of degree r will have a maximum degree of r - 1, which represents exactly r binary check bits."
        },
        {
          question: "What mathematical arithmetic is used in CRC binary division?",
          options: [
            "Modulo-2 arithmetic (where addition and subtraction are identical to bitwise XOR with no carries or borrows).",
            "Standard base-10 long division.",
            "Floating-point matrix inversion.",
            "Signed two's complement integer arithmetic."
          ],
          correct: 0,
          explanation: "CRC uses modulo-2 arithmetic over GF(2), where operations are performed bit-by-bit using XOR without carrying or borrowing."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, Chapter 10.4 'Cyclic Codes', pp. 321–323.", url: "" },
        { cite: "IEEE Std 802.3-2022, 'Ethernet Standard for Information Technology', Section 3.2.9 'Frame Check Sequence (FCS) field'.", url: "" }
      ]
    }
  },

  "u2-crc-working-principle": {
    id: "u2-crc-working-principle",
    title: "CRC Working Principle",
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: "Intermediate",
    category: "datalink",
    difficulty: "Intermediate",
    readingTime: "20 min",
    standard: "Forouzan Ch. 10.4 / Tanenbaum Ch. 3.2",
    oneLiner: "The end-to-end mathematical mechanism of CRC encoding at the sender and syndrome validation at the receiver.",
    quickAnswer: "The working principle of CRC is founded on modulo-2 binary division. The sender appends $n$ zeros (where $n$ is the degree of generator polynomial $G$) to the dataword and divides the augmented string by $G$. The remainder is the CRC Frame Check Sequence (FCS), which replaces the zeros. The receiver divides the entire received frame by $G$; if the remainder is zero, the frame is verified and accepted.",
    whyItMatters: "Understanding the exact working principle of CRC demystifies how network cards validate gigabits of data per second with mathematically proven reliability.",
    prerequisitesList: [
      { concept: "Introduction to CRC", meaning: "Polynomial representation and cyclic properties." },
      { concept: "Modulo-2 Arithmetic", meaning: "Bitwise XOR division without carry/borrow." }
    ],
    learningObjectives: [
      "Trace the complete lifecycle of a frame through CRC generation, transmission, and verification.",
      "Understand why appending $n$ zeros prepares the dividend for remainder insertion.",
      "Differentiate between clean reception (remainder = 0) and corrupted reception (syndrome != 0).",
      "Analyze the hardware shift register (LFSR) architecture implementing CRC."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "IEEE 802.3 / ITU-T V.41",
      type: "Mathematical Working Principle",
      prerequisites: ["u2-crc-intro"],
      relatedConcepts: ["u2-crc-generator-polynomial", "u2-crc-binary-division"],
      compareWith: ["u2-hamming-working-principle"],
      primaryUses: ["Network Interface Card (NIC) FCS generation", "Frame rejection logic in Ethernet switches"]
    },
    imageUrl: "assets/images/unit2/topic1/crc-encoder-decoder.svg",
    imageCaption: "Figure 10.12: CRC Hardware Encoder/Decoder Architecture with Feedback Shift Registers.",
    sections: {
      overview: `
        <p>The operational mechanics of Cyclic Redundancy Check are governed by rigorous algebraic principles detailed in <em>Forouzan Chapter 10.4 (pp. 322–326)</em>. In CRC, the sender and receiver use a predetermined <strong>divisor</strong> (represented as a binary pattern or generator polynomial).</p>
        <p>The fundamental principle is that the sender modifies the message such that the transmitted frame becomes <strong>an exact multiple of the divisor</strong>. When an exact multiple is divided by the divisor at the receiver, the remainder must equal zero!</p>
      `,
      eli10: "Imagine you want to send a secret number to a friend. You agree on a secret divisor, say 7. Your message is 50. 50 divided by 7 leaves a remainder of 1. You subtract 1 (or add the difference) so your transmitted number is 49. When your friend divides 49 by 7, the remainder is 0! If noise changes 49 into 51, 51 divided by 7 leaves a remainder of 2, so your friend instantly shouts 'Error!'",
      analogy: "A puzzle box that only opens when turned with a key of exact geometric notches. If a single notch is bent or damaged in transit, the key will not turn smoothly in the lock (remainder != 0), and the box remains locked.",
      howItWorks: `
        <ol class="list-decimal pl-5 space-y-2 text-xs">
          <li><strong>Divisor Degree ($n$):</strong> Determine the degree $n$ of the generator polynomial $G(x)$. The divisor bit length is $n + 1$.</li>
          <li><strong>Appending Zeros:</strong> Append $n$ zero bits to the end of the $k$-bit dataword, forming an augmented dividend of $k + n$ bits.</li>
          <li><strong>Modulo-2 Division at Sender:</strong> Divide the augmented dividend by the $(n+1)$-bit divisor using bitwise XOR division. The division terminates when all bits have been processed. The resulting $n$-bit remainder is the <strong>CRC (or FCS)</strong>.</li>
          <li><strong>Frame Assembly:</strong> Replace the $n$ appended zeros with the $n$-bit remainder to form the final transmitted frame.</li>
          <li><strong>Modulo-2 Division at Receiver:</strong> The receiver divides the entire received frame by the exact same divisor.
            <br>• <strong>If Remainder == 0:</strong> No transmission error detected; frame is accepted.
            <br>• <strong>If Remainder != 0:</strong> An error occurred; frame is dropped and an error counter is incremented.
          </li>
        </ol>
      `,
      diagram: `
+---------------------------------------------------------------------------------+
|                         CRC SENDER & RECEIVER WORKING FLOW                      |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  [ SENDER SIDE ]                                                                |
|  Dataword D = 100100                 Divisor G = 1101 (degree n = 3)            |
|  Append 3 zeros: 100100 000                                                     |
|                                                                                 |
|                 100100 000 / 1101  ===>  Remainder = 001                        |
|                                                                                 |
|  Transmitted Frame T = [ Dataword | Remainder ] = 100100 001                    |
|                                                                                 |
|  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Physical Channel ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   |
|                                                                                 |
|  [ RECEIVER SIDE - CLEAN RECEPTION ]                                            |
|  Received Frame = 100100 001                                                    |
|                 100100 001 / 1101  ===>  Remainder = 000  [ ACCEPT ✓ ]          |
|                                                                                 |
|  [ RECEIVER SIDE - ERROR CASE (Bit 3 corrupted: 1 -> 0) ]                       |
|  Received Frame = 100000 001                                                    |
|                 100000 001 / 1101  ===>  Remainder = 110  [ REJECT ✗ ]          |
+---------------------------------------------------------------------------------+
      `,
      technicalDetails: `
        <p><strong>Hardware Implementation via Linear Feedback Shift Registers (LFSR):</strong></p>
        <p>In network silicon (such as Intel or Broadcom Ethernet NICs), CRC is not computed by software loops; it is calculated in a single clock cycle per bit using a <strong>Linear Feedback Shift Register (LFSR)</strong>:</p>
        <ul>
          <li>The register contains $n$ flip-flops ($R_0, R_1, \\dots, R_{n-1}$).</li>
          <li>XOR gates are placed at positions corresponding to non-zero coefficients of the generator polynomial $G(x)$.</li>
          <li>Incoming data bits are shifted in from the physical layer serially.</li>
          <li>When the last data bit is shifted in, the flip-flops contain the exact CRC remainder!</li>
        </ul>
      `,
      workedExamples: {
        level1: "<strong>Question:</strong> Why do we append exactly $n$ zeros (where $n$ is the degree of generator polynomial) to the dataword before dividing?<br><br><strong>Answer:</strong><br>Appending $n$ zeros shifts the dataword to the left by $n$ bit positions ($D(x) \\cdot x^n$). This creates an empty $n$-bit container at the end of the frame. When modulo-2 division is performed, the resulting remainder $R(x)$ has a degree of at most $n-1$, which fits perfectly into those $n$ slots without overwriting any user data bits.",
        level2: "<strong>Problem:</strong> Given Dataword = <code>1010</code> and Divisor = <code>1011</code> (degree 3). Show the augmented string and state the remainder size.<br><br><strong>Solution:</strong><br>1. Divisor length = 4 bits $\\implies$ degree $n = 3$.<br>2. Appended zeros = 3 zeros.<br>3. Augmented dividend = <code>1010000</code> (7 bits total).<br>4. Remainder will be exactly 3 bits long.",
        level3: "<strong>Syndrome Equivalence:</strong> Explain mathematically why the receiver can simply divide the whole received frame rather than dividing the data and comparing remainders.<br><br><strong>Analysis:</strong> Let transmitted frame $T(x) = D(x)x^n \\oplus R(x)$. In modulo-2, adding $R(x)$ is identical to subtracting $R(x)$. Since $D(x)x^n = Q(x)G(x) \\oplus R(x)$, adding $R(x)$ gives $T(x) = Q(x)G(x) \\oplus R(x) \\oplus R(x) = Q(x)G(x)$. Hence, $T(x)$ is a pure multiple of $G(x)$. Dividing $T(x)$ by $G(x)$ directly yields <strong>remainder 0</strong>. Dividing the entire frame avoids needing a separate comparator circuit in hardware."
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Working Principle Strengths</th><th>Hardware Considerations</th></tr></thead>
          <tbody>
            <tr><td>Zero comparator needed: receiver only tests if final shift register state is all zeros.</td><td>Bit transmission order (MSB-first vs LSB-first) must be strictly standardized.</td></tr>
            <tr><td>Operates at line rate with continuous streaming data.</td><td>Pre-conditioning (inverting initial register state) is needed to detect prepended zeros.</td></tr>
          </tbody>
        </table>
      `,
      whereUsed: [
        "Hardware Ethernet MAC controllers in silicon Network Interface Cards (NICs)",
        "Wi-Fi baseband modems (Qualcomm, Broadcom, Realtek)",
        "DOCSIS cable modems and DSL digital transceivers"
      ],
      quiz: [
        {
          question: "How does the receiver determine whether a frame received with CRC contains any errors?",
          options: [
            "It divides the entire received frame by the generator polynomial; if the remainder is zero, the frame is clean.",
            "It subtracts the FCS from the IP header.",
            "It sends the frame back to the sender for confirmation.",
            "It counts the number of 1s in the frame."
          ],
          correct: 0,
          explanation: "Because the sender replaces the appended zeros with the remainder, the transmitted frame is an exact multiple of the generator; dividing by G(x) yields remainder 0 if intact."
        },
        {
          question: "What physical digital circuit is used to calculate CRC at line rate in network hardware?",
          options: [
            "Linear Feedback Shift Register (LFSR) with XOR gates",
            "Floating-point arithmetic logic unit (ALU)",
            "Analog operational amplifier",
            "Software while-loop in Linux kernel"
          ],
          correct: 0,
          explanation: "An LFSR consisting of flip-flops and XOR gates computes modulo-2 division in real time as bits stream in from the physical transceiver."
        },
        {
          question: "If a divisor has 5 bits, what is its degree and how many zeros are appended to the dataword?",
          options: [
            "Degree is 4, and 4 zeros are appended.",
            "Degree is 5, and 5 zeros are appended.",
            "Degree is 4, and 5 zeros are appended.",
            "Degree is 3, and 3 zeros are appended."
          ],
          correct: 0,
          explanation: "A polynomial with 5 binary coefficients has highest power x^4, so its degree is 4, requiring 4 zeros to be appended."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, Chapter 10.4, pp. 322–326.", url: "" },
        { cite: "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Section 3.2.2.", url: "" }
      ]
    }
  },

  "u2-crc-generator-polynomial": {
    id: "u2-crc-generator-polynomial",
    title: "Generator Polynomial",
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: "Core",
    category: "datalink",
    difficulty: "Core",
    readingTime: "22 min",
    standard: "Forouzan Ch. 10.4 / Tanenbaum Ch. 3.2",
    oneLiner: "The mathematical divisor polynomial that governs the error detection strength, burst capability, and algebraic properties of a CRC code.",
    quickAnswer: "The Generator Polynomial $G(x)$ is the algebraic divisor that defines a CRC code. To provide robust error protection, a generator polynomial must satisfy four mathematical design rules: (1) It must have at least two terms to catch all single-bit errors, (2) The constant term $x^0$ must be 1 to catch errors that are multiples of $x$, (3) It must contain the factor $(x + 1)$ to catch all odd numbers of errors, and (4) Its degree must exceed the expected burst error length.",
    whyItMatters: "The error detection capability of CRC is not magic; it is strictly dictated by the mathematical properties and factorization of its generator polynomial. Choosing a flawed generator leaves entire classes of transmission errors completely undetected.",
    prerequisitesList: [
      { concept: "Introduction to CRC", meaning: "Polynomial representation of binary bit strings." },
      { concept: "CRC Working Principle", meaning: "Modulo-2 division mechanics." }
    ],
    learningObjectives: [
      "Analyze the algebraic conditions required for generator polynomials to catch single-bit, double-bit, odd, and burst errors.",
      "Convert standard generator polynomials between algebraic formula, binary string, and hexadecimal notation.",
      "Memorize and compare industry-standard polynomials (CRC-8, CRC-12, CRC-16, CRC-CCITT, CRC-32).",
      "Explain why CRC-32 detects 100% of burst errors up to 32 bits long."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "IEEE 802.3 / ITU-T V.41 / ANSI X3.28",
      type: "Mathematical Design Specification",
      prerequisites: ["u2-crc-working-principle"],
      relatedConcepts: ["u2-crc-binary-division", "u2-crc-numerical-problems"],
      compareWith: ["u2-hamming-distance"],
      primaryUses: ["Standard network protocol specification", "Industrial communication bus reliability"]
    },
    imageUrl: "assets/images/unit2/topic1/crc-generator-polynomials.svg",
    imageCaption: "Figure 10.13: Mathematical Properties and Standards Table of Industrial Generator Polynomials.",
    sections: {
      overview: `
        <p>In polynomial coding, the divisor is universally referred to as the <strong>Generator Polynomial $G(x)$</strong>. As <em>Forouzan emphasizes on page 326</em>: <strong>"The divisor in a cyclic code is normally called the generator polynomial or simply the generator."</strong></p>
        <p>A poorly chosen generator polynomial will fail to detect simple bit flips. Decades of algebraic coding research have established strict mathematical criteria that a generator polynomial must satisfy to guarantee maximum error detection.</p>
      `,
      eli10: "A generator polynomial is like a master security sieve. If you want a sieve that catches sand, pebbles, and twigs, the holes must be engineered with exact geometric shapes. A good generator polynomial has special mathematical factors that catch single bit flips, double bit flips, and long clusters of lightning-strike noise!",
      analogy: "A prime factorization lock: just as a number divisible by 2, 3, and 5 catches non-multiples easily, a generator polynomial that includes factors like $(x+1)$ guarantees that any frame with an odd number of broken bits will fail the division test 100% of the time.",
      howItWorks: `
        <p><strong>Mathematical Error Detection Guarantees (Forouzan Section 10.4):</strong></p>
        <ol class="list-decimal pl-5 space-y-2 text-xs">
          <li><strong>Single-Bit Errors:</strong> Let error vector be $E(x) = x^i$. If $G(x)$ has more than one term and the coefficient of $x^0$ is 1 (i.e. not divisible by $x$), $G(x)$ can never divide $x^i$. <strong>Result: 100% of single-bit errors are caught!</strong></li>
          <li><strong>Double-Bit Errors:</strong> Let error vector be $E(x) = x^i + x^j = x^j(x^{i-j} + 1)$ with $i > j$. If $G(x)$ does not divide $(x^k + 1)$ for any $k$ up to the maximum frame length, <strong>100% of double-bit errors are caught!</strong></li>
          <li><strong>Odd Number of Errors:</strong> If $G(x)$ contains $(x + 1)$ as a factor, it can never divide any polynomial with an odd number of terms. <strong>Result: 100% of all odd numbers of errors (1, 3, 5, 7, ...) are caught!</strong></li>
          <li><strong>Burst Errors of Length $L \\le r$:</strong> A burst error of length $L$ can be written as $E(x) = x^j \\cdot B(x)$ where degree of $B(x)$ is $L - 1$. If $L \\le r$, degree of $B(x) < r = \\text{degree}(G(x))$, so $G(x)$ can never divide $B(x)$. <strong>Result: 100% of all burst errors of length $\\le r$ bits are caught!</strong></li>
          <li><strong>Burst Errors of Length $L = r + 1$:</strong> Detected with probability $1 - (1/2)^{r-1}$ (for CRC-32: $99.99999995\\%$ detection).</li>
          <li><strong>Burst Errors of Length $L > r + 1$:</strong> Detected with probability $1 - (1/2)^r$ (for CRC-32: $99.99999997\\%$ detection).</li>
        </ol>
      `,
      diagram: `
+---------------------------------------------------------------------------------+
|               STANDARD INDUSTRY GENERATOR POLYNOMIALS (FOROUZAN CH. 10)         |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  1. CRC-8 (ATM Header Error Control):                                           |
|     G(x) = x^8 + x^2 + x + 1                         Divisor: 100000111         |
|                                                                                 |
|  2. CRC-10 (ATM AAL):                                                           |
|     G(x) = x^10 + x^9 + x^5 + x^4 + x + 1            Divisor: 11000110011       |
|                                                                                 |
|  3. CRC-12 (Used for 6-bit character streams):                                  |
|     G(x) = x^12 + x^11 + x^3 + x^2 + x + 1           Divisor: 1100000001111     |
|                                                                                 |
|  4. CRC-16-ANSI (IBM Bisync, USB, Modbus):                                      |
|     G(x) = x^16 + x^15 + x^2 + 1                     Divisor: 11000000000000101 |
|                                                                                 |
|  5. CRC-CCITT (ITU-T X.25, HDLC, Bluetooth):                                    |
|     G(x) = x^16 + x^12 + x^5 + 1                     Divisor: 10001000000100001 |
|                                                                                 |
|  6. CRC-32 (IEEE 802.3 Ethernet, IEEE 802.11 Wi-Fi, PNG, ZIP, Gzip):            |
|     G(x) = x^32 + x^26 + x^23 + x^22 + x^16 + x^12 + x^11 + x^10 +               |
|            x^8 + x^7 + x^5 + x^4 + x^2 + x + 1                                  |
|     Hex: 0x04C11DB7                                                             |
+---------------------------------------------------------------------------------+
      `,
      technicalDetails: `
        <p><strong>Industrial Polynomial Standards Table:</strong></p>
        <table class="wiki-table">
          <thead><tr><th>Standard Name</th><th>Degree ($r$)</th><th>Polynomial Formula</th><th>Application Domain</th></tr></thead>
          <tbody>
            <tr><td><strong>CRC-8</strong></td><td>8</td><td>$x^8 + x^2 + x + 1$</td><td>ATM Header Error Control (HEC), Dallas 1-Wire</td></tr>
            <tr><td><strong>CRC-12</strong></td><td>12</td><td>$x^{12} + x^{11} + x^3 + x^2 + x + 1$</td><td>6-bit character transmission systems</td></tr>
            <tr><td><strong>CRC-16-ANSI</strong></td><td>16</td><td>$x^{16} + x^{15} + x^2 + 1$</td><td>USB tokens, Modbus industrial automation, SD cards</td></tr>
            <tr><td><strong>CRC-CCITT</strong></td><td>16</td><td>$x^{16} + x^{12} + x^5 + 1$</td><td>HDLC, X.25, Bluetooth, Zigbee</td></tr>
            <tr><td><strong>CRC-32</strong></td><td>32</td><td>$x^{32} + x^{26} + x^{23} + x^{22} + x^{16} + x^{12} + x^{11} + x^{10} + x^8 + x^7 + x^5 + x^4 + x^2 + x + 1$</td><td>IEEE 802.3 Ethernet, IEEE 802.11 Wi-Fi, SATA, ZIP</td></tr>
          </tbody>
        </table>
      `,
      workedExamples: {
        level1: "<strong>Question:</strong> Convert the polynomial $G(x) = x^4 + x + 1$ into its binary bit string representation.<br><br><strong>Solution:</strong><br>Write powers from 4 down to 0:<br>• $x^4$ present $\\implies 1$<br>• $x^3$ absent $\\implies 0$<br>• $x^2$ absent $\\implies 0$<br>• $x^1$ present $\\implies 1$<br>• $x^0$ present $\\implies 1$<br>Binary string = <code>10011</code> (5 bits, degree 4).",
        level2: "<strong>Problem:</strong> Explain why the polynomial $G(x) = x^3 + x$ is an extremely poor choice for a CRC generator.<br><br><strong>Solution:</strong><br>1. Factor $G(x)$: $G(x) = x(x^2 + 1)$.<br>2. It has no constant term ($x^0$ coefficient is 0), meaning $x$ is a factor.<br>3. Any error pattern with a trailing zero (such as $E(x) = x$, representing an error in bit position 1) can be factored as $x \\cdot Q(x)$.<br>4. Because $G(x)$ has $x$ as a factor, it will divide $E(x)$, leaving remainder 0 and failing to detect simple single-bit errors!",
        level3: "<strong>Analysis of Factor $(x + 1)$:</strong> Prove that any generator polynomial having $(x + 1)$ as a factor catches all odd numbers of errors.<br><br><strong>Proof:</strong><br>In polynomial arithmetic over GF(2), substituting $x = 1$ into any polynomial evaluates to the parity of its terms modulo 2.<br>If an error polynomial $E(x)$ has an odd number of errors, it has an odd number of non-zero terms. Therefore: $E(1) = 1 + 1 + \\dots + 1 \\text{ (odd times)} = 1$.<br>However, if $G(x)$ has $(x + 1)$ as a factor, then $G(1) = (1 + 1) \\cdot Q(1) = 0 \\cdot Q(1) = 0$.<br>If $G(x)$ were to divide $E(x)$, we would have $E(x) = G(x) \\cdot K(x) \\implies E(1) = G(1) \\cdot K(1) = 0$. But $E(1) = 1$, which is a contradiction! Therefore, $G(x)$ can never divide $E(x)$. All odd errors are detected 100% of the time."
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Design Requirement</th><th>Mathematical Reason</th></tr></thead>
          <tbody>
            <tr><td>Must contain at least 2 terms.</td><td>Guarantees detection of all single-bit errors.</td></tr>
            <tr><td>Must not be divisible by $x$ ($x^0 = 1$).</td><td>Guarantees detection of errors shifted by powers of $x$.</td></tr>
            <tr><td>Must contain factor $(x + 1)$.</td><td>Guarantees detection of all odd-number bit errors.</td></tr>
            <tr><td>Degree $r$ must match line speed / MTU.</td><td>Ensures burst errors $\\le r$ bits are caught with 100% certainty.</td></tr>
          </tbody>
        </table>
      `,
      whereUsed: [
        "Ethernet Frame Check Sequence (CRC-32)",
        "Wi-Fi IEEE 802.11 FCS (CRC-32)",
        "High-Level Data Link Control (HDLC) and PPP (CRC-16 / CRC-CCITT)",
        "USB token and packet error control (CRC-5 and CRC-16)"
      ],
      quiz: [
        {
          question: "Why must a good generator polynomial contain the factor (x + 1)?",
          options: [
            "To guarantee the detection of all odd numbers of bit errors.",
            "To speed up the physical transmission rate.",
            "To make the polynomial divisible by 2.",
            "To allow backward compatibility with IPv4."
          ],
          correct: 0,
          explanation: "Any polynomial divisible by (x + 1) evaluates to 0 when x = 1, while polynomials with an odd number of errors evaluate to 1. Thus, G(x) can never divide an odd error polynomial."
        },
        {
          question: "What length of burst error is CRC-32 guaranteed to detect 100% of the time?",
          options: [
            "All burst errors up to and including 32 bits in length.",
            "All burst errors up to 16 bits only.",
            "All burst errors up to 64 bits.",
            "Only single-bit errors."
          ],
          correct: 0,
          explanation: "By mathematical theorem, a generator polynomial of degree r detects 100% of all burst errors of length L <= r. For CRC-32, r = 32."
        },
        {
          question: "What is the binary representation of the generator polynomial G(x) = x^3 + x^2 + 1?",
          options: [
            "1101",
            "1011",
            "1110",
            "1001"
          ],
          correct: 0,
          explanation: "Terms: x^3 (1), x^2 (1), x^1 (0), x^0 (1) -> 1101."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, Chapter 10.4 'Generator Polynomial', pp. 326–329.", url: "" },
        { cite: "W. Wesley Peterson and D. T. Brown, 'Cyclic Codes for Error Detection', Proceedings of the IRE, 1961.", url: "" }
      ]
    }
  },

  "u2-crc-binary-division": {
    id: "u2-crc-binary-division",
    title: "CRC Calculation Using Binary Division",
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: "Core",
    category: "datalink",
    difficulty: "Core",
    readingTime: "25 min",
    standard: "Forouzan Ch. 10.4 / University Exam Pattern",
    oneLiner: "The step-by-step arithmetic procedure for performing modulo-2 binary division without carries or borrows.",
    quickAnswer: "CRC calculation using binary division replaces standard arithmetic subtraction with bitwise XOR. If the leftmost bit of the current dividend is 1, the quotient bit is 1 and the divisor is XORed with the dividend; if the leftmost bit is 0, the quotient bit is 0 and zeros are XORed. The next bit is brought down, and the process repeats until all dividend bits are exhausted, yielding the remainder.",
    whyItMatters: "Modulo-2 binary division is the exact mathematical procedure executed by network cards and asked in computer networking exams. Confusing modulo-2 division with standard decimal/binary division is the #1 mistake students make.",
    prerequisitesList: [
      { concept: "Bitwise XOR Truth Table", meaning: "0^0=0, 0^1=1, 1^0=1, 1^1=0." },
      { concept: "CRC Working Principle", meaning: "Appending n zeros and extracting remainder." }
    ],
    learningObjectives: [
      "Master the rules of modulo-2 division (XOR subtraction without borrow).",
      "Perform manual step-by-step paper-and-pencil binary division for any dataword and divisor.",
      "Identify the quotient and extract the exact $n$-bit remainder (FCS).",
      "Assemble the final transmitted codeword and perform receiver verification."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "Modulo-2 Polynomial Arithmetic",
      type: "Algorithmic Arithmetic Procedure",
      prerequisites: ["u2-crc-working-principle"],
      relatedConcepts: ["u2-crc-numerical-problems", "u2-crc-generator-polynomial"],
      compareWith: ["u2-hamming-code-calculation"],
      primaryUses: ["Manual examination calculation", "Software CRC implementations", "Hardware microcode verification"]
    },
    imageUrl: "assets/images/unit2/topic1/crc-binary-division-stepwise.svg",
    imageCaption: "Figure 10.14: Complete Step-by-Step Modulo-2 Binary Division Algorithm.",
    sections: {
      overview: `
        <p>In standard arithmetic, division uses subtraction with borrowing. In <strong>modulo-2 arithmetic</strong> (the arithmetic of Galois Field $\\text{GF}(2)$), subtraction is performed bit-by-bit using <strong>XOR without borrowing</strong>. This single rule makes binary division immensely simpler and faster.</p>
        <div class="wiki-callout tip">
          <div class="callout-header"><i class="fa-solid fa-calculator text-amber-500 mr-1"></i> Two Rules of Modulo-2 Division (Forouzan p. 323)</div>
          <ol class="list-decimal pl-5 space-y-1 text-xs">
            <li><strong>Rule 1 (Leading bit is 1):</strong> If the leftmost bit of the current dividend chunk is <strong>1</strong>, the quotient bit is <strong>1</strong>. Align the divisor underneath and perform bitwise XOR.</li>
            <li><strong>Rule 2 (Leading bit is 0):</strong> If the leftmost bit of the current dividend chunk is <strong>0</strong>, the quotient bit is <strong>0</strong>. Align an all-zero divisor (<code>000...</code>) underneath and perform bitwise XOR.</li>
            <li>Bring down the next bit from the dividend. Repeat until all bits have been brought down.</li>
          </ol>
        </div>
      `,
      eli10: "Doing modulo-2 division is like playing a matching game. You look at the very first bit on the left. If it's a 1, you write '1' on top and XOR with your key. If it's a 0, you write '0' on top and XOR with all zeros. You never carry, you never borrow. When you run out of bits, whatever is left over at the bottom is your prize (the remainder)!",
      analogy: "A long-division conveyor belt in a factory: each package arriving on the belt is inspected. If the package has a red tag (1), a stamping machine punches it with the stencil. If it has a green tag (0), the machine skips it. The final items remaining on the belt are the leftover parts.",
      howItWorks: `
        <p><strong>Step-by-Step Execution Protocol:</strong></p>
        <ol class="list-decimal pl-5 space-y-2 text-xs">
          <li>Let dataword $D$ have length $k$ bits and divisor $G$ have length $m = n + 1$ bits (degree $n$).</li>
          <li>Append $n$ zeros to $D$ to form the dividend of length $k + n$.</li>
          <li>Take the first $m$ bits of the dividend.</li>
          <li>Inspect the leftmost bit:
            <br>• If 1: write 1 in quotient, XOR with $G$.
            <br>• If 0: write 0 in quotient, XOR with $m$ zeros.
          </li>
          <li>Discard the leading 0 produced by the XOR, bring down the next bit from the dividend to form a new $m$-bit operand.</li>
          <li>Repeat steps 4 and 5 until the last bit of the augmented dividend has been brought down and XORed.</li>
          <li>The final remaining $n$ bits constitute the <strong>CRC Remainder</strong>.</li>
        </ol>
      `,
      diagram: `
+---------------------------------------------------------------------------------+
|               COMPLETE STEP-BY-STEP MODULO-2 DIVISION BREAKDOWN                 |
|                   Dataword: 100100   |   Divisor: 1101 (degree 3)               |
+---------------------------------------------------------------------------------+
|                                                                                 |
|                        1 1 1 1 0 1   <--- Quotient                              |
|           +-----------------------                                              |
|   1 1 0 1 | 1 0 0 1 0 0 0 0 0        <--- Dividend (Dataword + 3 zeros)         |
|           | 1 1 0 1                  <--- Leading bit is 1: XOR Divisor         |
|           +--------                                                             |
|               1 0 0 0                <--- Remainder + bring down '0'            |
|               1 1 0 1                <--- Leading bit is 1: XOR Divisor         |
|               -------                                                           |
|                 1 0 1 0              <--- Remainder + bring down '0'            |
|                 1 1 0 1              <--- Leading bit is 1: XOR Divisor         |
|                 -------                                                           |
|                   1 1 1 0            <--- Remainder + bring down '0'            |
|                   1 1 0 1            <--- Leading bit is 1: XOR Divisor         |
|                   -------                                                       |
|                     0 1 1 0          <--- Leading bit is 0: XOR All Zeros       |
|                     0 0 0 0                                                     |
|                     -------                                                     |
|                       1 1 0 0        <--- Remainder + bring down '0' (LAST)     |
|                       1 1 0 1        <--- Leading bit is 1: XOR Divisor         |
|                       -------                                                   |
|                         0 0 1        <--- FINAL REMAINDER (FCS) = 001           |
|                                                                                 |
|   Transmitted Frame = 100100 001                                                |
+---------------------------------------------------------------------------------+
      `,
      technicalDetails: `
        <p><strong>XOR Truth Table Reference:</strong></p>
        <table class="wiki-table" style="max-width: 300px;">
          <thead><tr><th>Bit A</th><th>Bit B</th><th>A $\\oplus$ B (Modulo-2 Sum/Diff)</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0</td><td><strong>0</strong></td></tr>
            <tr><td>0</td><td>1</td><td><strong>1</strong></td></tr>
            <tr><td>1</td><td>0</td><td><strong>1</strong></td></tr>
            <tr><td>1</td><td>1</td><td><strong>0</strong> (No carry!)</td></tr>
          </tbody>
        </table>
        <p><strong>CRITICAL RULE:</strong> In modulo-2 division, $1 - 1 = 0$, $0 - 1 = 1$, $1 - 0 = 1$, and $0 - 0 = 0$. Never borrow from the next column!</p>
      `,
      workedExamples: {
        level1: "<strong>Question:</strong> Perform modulo-2 addition and subtraction for the two binary words: <code>1101</code> and <code>1011</code>.<br><br><strong>Solution:</strong><br>In modulo-2 arithmetic, addition and subtraction are identical to bitwise XOR:<br><code>  1 1 0 1</code><br><code>⊕ 1 0 1 1</code><br><code>---------</code><br><code>  0 1 1 0</code><br>Both $(1101 + 1011) \\pmod 2$ and $(1101 - 1011) \\pmod 2$ equal <code>0110</code>.",
        level2: "<strong>Problem:</strong> Divide the binary string <code>1011000</code> by <code>101</code> using modulo-2 division. Find the remainder.<br><br><strong>Solution:</strong><br>Divisor = <code>101</code> (length 3).<br>1. <code>101</code> XOR <code>101</code> $\\to$ <code>000</code>. Bring down <code>1</code> $\\to$ <code>001</code>.<br>2. Leading bit is 0: <code>001</code> XOR <code>000</code> $\\to$ <code>01</code>. Bring down <code>0</code> $\\to$ <code>010</code>.<br>3. Leading bit is 0: <code>010</code> XOR <code>000</code> $\\to$ <code>10</code>. Bring down <code>0</code> $\\to$ <code>100</code>.<br>4. Leading bit is 1: <code>100</code> XOR <code>101</code> $\\to$ <code>001</code>. Bring down <code>0</code> $\\to$ <code>010</code>.<br>5. Leading bit is 0: <code>010</code> XOR <code>000</code> $\\to$ <code>10</code>.<br>Final 2-bit remainder = <code>10</code>.",
        level3: "<strong>Exam Problem:</strong> Given Dataword = <code>110101</code> and Divisor = <code>1011</code>. Find the CRC remainder, the transmitted codeword, and demonstrate receiver verification.<br><br><strong>Solution:</strong><br>1. Divisor degree = 3. Append 3 zeros $\\implies$ <code>110101000</code>.<br>2. Division of <code>110101000</code> by <code>1011</code> yields Remainder = <code>011</code>.<br>3. Transmitted Codeword = <code>110101011</code>.<br>4. Receiver Verification: Divide <code>110101011</code> by <code>1011</code>.<br>All terms cancel out, leaving Remainder = <code>000</code>. Frame verified!"
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Arithmetic Property</th><th>Advantage in Hardware</th></tr></thead>
          <tbody>
            <tr><td>No borrow propagation across columns.</td><td>Eliminates ripple-carry delay; clock frequency can be gigahertz.</td></tr>
            <tr><td>Symmetric addition and subtraction.</td><td>Encoder and decoder use the exact same circuit topology.</td></tr>
          </tbody>
        </table>
      `,
      whereUsed: [
        "Software emulation of CRC in embedded Linux kernel drivers",
        "Hardware UART chips and SPI bus controller verification",
        "University Computer Networks laboratory coding assignments"
      ],
      quiz: [
        {
          question: "In modulo-2 division, what operation replaces arithmetic subtraction?",
          options: [
            "Bitwise XOR (Exclusive OR)",
            "Bitwise AND",
            "Integer multiplication",
            "Two's complement inversion"
          ],
          correct: 0,
          explanation: "In GF(2) modulo-2 arithmetic, subtraction is identical to addition and is executed via bitwise XOR without borrowing."
        },
        {
          question: "If the leftmost bit of the current dividend chunk is 0, what divisor is used for the XOR operation?",
          options: [
            "An all-zero divisor (000...)",
            "The standard generator divisor",
            "An all-ones divisor (111...)",
            "Division terminates immediately"
          ],
          correct: 0,
          explanation: "When the leading bit is 0, the quotient bit is 0 and an all-zero divisor is XORed, simply shifting to the next bit."
        },
        {
          question: "What is the size of the CRC remainder compared to the divisor?",
          options: [
            "The remainder is exactly 1 bit shorter than the divisor (equal to the degree of the generator polynomial).",
            "The remainder is the exact same length as the divisor.",
            "The remainder is 1 bit longer than the divisor.",
            "The remainder has the same length as the dataword."
          ],
          correct: 0,
          explanation: "If a divisor has m bits, its degree is n = m - 1. The remainder always has degree <= n - 1, which corresponds to exactly n bits."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, Chapter 10.4, pp. 323–325.", url: "" },
        { cite: "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3.", url: "" }
      ]
    }
  },

  "u2-crc-numerical-problems": {
    id: "u2-crc-numerical-problems",
    title: "CRC: Numerical Problems",
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: "Advanced",
    category: "datalink",
    difficulty: "Advanced",
    readingTime: "30 min",
    standard: "Forouzan Ch. 10.4 / University Exam Pattern",
    oneLiner: "Comprehensive step-by-step solved CRC numerical problems, binary divisions, and syndrome error detection verifications.",
    quickAnswer: "This numerical problem bank provides complete, step-by-step solved exam problems covering CRC generator encoding, polynomial modulo-2 division, Frame Check Sequence (FCS) calculation, transmitted codeword generation, receiver syndrome evaluation, and burst error detection verification.",
    whyItMatters: "CRC binary division problems are among the most frequently tested topics in university networking examinations, GATE, and technical job interviews. Mastering every step guarantees maximum marks.",
    prerequisitesList: [
      { concept: "CRC Calculation Using Binary Division", meaning: "Modulo-2 XOR long division algorithm." },
      { concept: "Generator Polynomial Properties", meaning: "Converting polynomials to binary divisors." }
    ],
    learningObjectives: [
      "Solve end-to-end CRC numerical problems with flawless modulo-2 arithmetic.",
      "Calculate 3-bit, 4-bit, and 5-bit CRC remainders for arbitrary datawords.",
      "Verify clean transmission at the receiver (syndrome = 0).",
      "Inject bit errors and calculate the exact non-zero remainder proving error detection."
    ],
    infobox: {
      layer: "Layer 2 (Data Link Layer)",
      standard: "Examination & Numerical Problem Bank",
      type: "Solved Numerical Problem Repository",
      prerequisites: ["u2-crc-binary-division", "u2-crc-generator-polynomial"],
      relatedConcepts: ["u2-hamming-numerical-problems", "u2-error-techniques"],
      compareWith: ["u2-hamming-code-calculation"],
      primaryUses: ["University semester examinations", "GATE exam preparation", "Algorithm testing"]
    },
    imageUrl: "assets/images/unit2/topic1/crc-numerical-error-syndrome.svg",
    imageCaption: "Figure 10.15: Solved Numerical Problem: Receiver Error Detection and Syndrome Verification.",
    sections: {
      overview: `
        <p>This section provides fully worked numerical solutions to classic university and competitive examination problems on Cyclic Redundancy Check (CRC), adhering to the exact step-by-step layout recommended in <em>Forouzan Chapter 10.4</em>.</p>
      `,
      eli10: "A complete step-by-step math workbook showing you every single XOR subtraction line-by-line so you never lose marks on a CRC exam question!",
      analogy: "A flight checklist before takeoff: verifying each division step row-by-row ensures 100% accuracy and zero arithmetic blunders.",
      howItWorks: `
        <p><strong>Standard 4-Step Exam Solution Template:</strong></p>
        <ol class="list-decimal pl-5 space-y-2 text-xs">
          <li><strong>Step 1: Identify Parameters:</strong> Write Dataword $D$, Generator $G(x)$, degree $n$, and divisor bit string.</li>
          <li><strong>Step 2: Append Zeros:</strong> Append $n$ zeros to dataword $D$.</li>
          <li><strong>Step 3: Long Division at Sender:</strong> Execute modulo-2 division row by row. Box the final remainder (FCS).</li>
          <li><strong>Step 4: Transmit & Verify:</strong> Form codeword $T = [D \\mid \\text{FCS}]$. Divide $T$ by divisor to prove remainder is 0. If testing an error, flip a bit and show non-zero syndrome.</li>
        </ol>
      `,
      diagram: `
+---------------------------------------------------------------------------------+
|               WORKED CRC PROBLEM: DATA = 1101011011, G(x) = x^4 + x + 1         |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  Dataword D = 1101011011 (10 bits)                                              |
|  Generator G(x) = x^4 + x + 1  --> Divisor = 10011 (degree n = 4)               |
|  Augmented Dividend = 1101011011 0000 (14 bits)                                 |
|                                                                                 |
|                        1100001010   <--- Quotient                               |
|            +-----------------------                                             |
|    10011   | 11010110110000                                                     |
|            | 10011                                                              |
|            +------                                                              |
|              10011                                                              |
|              10011                                                              |
|              -----                                                              |
|              00001                                                              |
|              00000                                                              |
|              -----                                                              |
|               00010                                                             |
|               00000                                                             |
|               -----                                                             |
|                00101                                                            |
|                00000                                                            |
|                -----                                                            |
|                 01011                                                           |
|                 00000                                                           |
|                 -----                                                           |
|                  10110                                                          |
|                  10011                                                          |
|                  -----                                                          |
|                   01010                                                         |
|                   00000                                                         |
|                   -----                                                         |
|                    10100                                                        |
|                    10011                                                        |
|                    -----                                                        |
|                     01110                                                       |
|                     00000                                                       |
|                     -----                                                       |
|                      1110   <--- 4-bit Remainder (FCS)                          |
|                                                                                 |
|  Codeword Transmitted: 1101011011 1110                                          |
+---------------------------------------------------------------------------------+
      `,
      technicalDetails: `
        <p><strong>Master Problem Repository:</strong></p>
        <p><strong>Problem 1 (Classic University Exam Question):</strong> A bit stream <code>1101011011</code> is transmitted using the standard CRC generator polynomial $G(x) = x^4 + x + 1$. Show the actual bit string transmitted. Suppose the 3rd bit from the left is inverted during transmission; show that the receiver detects this error.</p>
        <p><strong>Problem 2:</strong> A sender wants to transmit the message <code>100100</code> using generator polynomial $G(x) = x^3 + x^2 + 1$. Find the transmitted frame. Then show the receiver side division.</p>
        <p><strong>Problem 3:</strong> Message polynomial $M(x) = x^7 + x^5 + x^4 + x^2 + x$ is encoded with generator polynomial $G(x) = x^3 + x^2 + 1$. Compute the CRC remainder in polynomial form.</p>
      `,
      workedExamples: {
        level1: "<strong>Detailed Solution for Problem 1 (Part A: Encoding):</strong><br>1. Dataword = <code>1101011011</code> (10 bits).<br>2. Generator $G(x) = x^4 + x + 1 \\implies$ Divisor = <code>10011</code> (5 bits, degree $n = 4$).<br>3. Augmented Dividend: Append 4 zeros $\\implies$ <code>11010110110000</code>.<br>4. Division: Performing modulo-2 division of <code>11010110110000</code> by <code>10011</code> yields remainder <code>1110</code> (4 bits).<br>5. Transmitted Frame = <code>11010110111110</code>.",
        level2: "<strong>Detailed Solution for Problem 1 (Part B: Error Detection Verification):</strong><br>1. Transmitted: <code>11010110111110</code>.<br>2. 3rd bit from left flips from 0 to 1 $\\implies$ Received frame = <code>11110110111110</code>.<br>3. Receiver divides <code>11110110111110</code> by <code>10011</code>:<br>• <code>11110</code> $\\oplus$ <code>10011</code> = <code>1101</code>. Bring down <code>1</code> $\\to$ <code>11011</code>.<br>• <code>11011</code> $\\oplus$ <code>10011</code> = <code>1000</code>. Bring down <code>1</code> $\\to$ <code>10001</code>.<br>• Continue division across all 14 bits...<br>4. Final Remainder at Receiver = <code>1011</code> $\\ne 0000$!<br>5. <strong>Conclusion:</strong> Since remainder is non-zero (<code>1011</code>), the receiver detects the transmission error and discards the frame.",
        level3: "<strong>Detailed Solution for Problem 3 (Polynomial Division):</strong><br>1. Message $M(x) = x^7 + x^5 + x^4 + x^2 + x$. Binary: <code>10110110</code>.<br>2. Generator $G(x) = x^3 + x^2 + 1$. Binary: <code>1101</code> (degree 3).<br>3. Multiply $M(x)$ by $x^3$: $M(x) \\cdot x^3 = x^{10} + x^8 + x^7 + x^5 + x^4$.<br>Binary: <code>10110110000</code>.<br>4. Modulo-2 division of <code>10110110000</code> by <code>1101</code>:<br>Remainder = <code>100</code>.<br>5. Polynomial Remainder $R(x) = 1 \\cdot x^2 + 0 \\cdot x + 0 = \\mathbf{x^2}$.<br>Transmitted Polynomial $T(x) = x^{10} + x^8 + x^7 + x^5 + x^4 + x^2$."
      },
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Exam Tip</th><th>Common Pitfall to Avoid</th></tr></thead>
          <tbody>
            <tr><td>Always align the divisor under the leftmost '1' bit, never under a '0'.</td><td>Accidentally writing quotient bits into the remainder space.</td></tr>
            <tr><td>Count bits carefully: divisor of degree $n$ requires exactly $n$ zeros.</td><td>Forgetting that divisor length is degree + 1 (e.g. degree 4 divisor has 5 bits).</td></tr>
          </tbody>
        </table>
      `,
      whereUsed: [
        "University Computer Networks end-semester theory papers",
        "GATE Computer Science & Engineering examinations",
        "Technical interview coding challenges for networking engineers"
      ],
      quiz: [
        {
          question: "In Problem 1, what was the 4-bit CRC remainder obtained from dividing 11010110110000 by 10011?",
          options: [
            "1110",
            "0011",
            "1001",
            "0110"
          ],
          correct: 0,
          explanation: "The step-by-step modulo-2 division yields exactly 1110 as the final 4-bit remainder."
        },
        {
          question: "When a received frame contains an error, what does the receiver's CRC modulo-2 division produce?",
          options: [
            "A non-zero remainder (syndrome != 0).",
            "A remainder of exactly 0000.",
            "An arithmetic overflow interrupt.",
            "An all-ones vector."
          ],
          correct: 0,
          explanation: "Any corrupted frame fails to be an exact multiple of the generator polynomial, leaving a non-zero syndrome remainder that triggers rejection."
        },
        {
          question: "If a generator polynomial is G(x) = x^3 + 1, how many zeros are appended to the dataword?",
          options: [
            "3 zeros (since the degree of G(x) is 3)",
            "4 zeros",
            "2 zeros",
            "1 zero"
          ],
          correct: 0,
          explanation: "The degree of G(x) = x^3 + 1 is 3 (highest exponent is 3), so exactly 3 zeros are appended to the dataword."
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th/6th Edition, Chapter 10.4, pp. 323–326.", url: "" },
        { cite: "University Examination Solved Question Papers (Data Link Layer - Error Control).", url: "" }
      ]
    }
  }
};

module.exports = hammingAndCrcTopics;

