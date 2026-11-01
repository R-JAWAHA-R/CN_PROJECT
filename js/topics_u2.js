// Unit II Topics Database: Data Link Layer & Reliable Transfer
// Enhanced & Aligned with Tanenbaum & Wetherall (6th Ed.), Forouzan (6th Ed.), and Kurose & Ross
// Complete 17-Point Structural Article Architecture with 3-Level Progressive Examples & Multi-Question Quizzes

const TOPICS_U2 = {
  "framing": {
    "id": "framing",
    "title": "Framing in the Data Link Layer",
    "unit": "Unit II: Data Link Layer & MAC Sublayer",
    "unitId": "unit2",
    "level": "Beginner → Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "20–30 min",
    "standard": "IEEE 802.3 / ISO 13239 (HDLC) / RFC 1662 (PPP)",
    "oneLiner": "Organizing continuous physical bitstreams into discrete, identifiable frames with distinct boundaries.",
    "quickAnswer": "Framing encapsulates network-layer packets into data-link frames with identifiable start and end boundaries, headers, payloads, and error-checking trailers.",
    "whyItMatters": "The Physical Layer only transmits raw bit streams without context. Without reliable framing boundaries, a receiver cannot identify where one message ends and another begins, nor parse addresses or error checks.",
    "prerequisitesList": [
      {
        "concept": "Bit",
        "meaning": "A binary digit, value 0 or 1."
      },
      {
        "concept": "Byte",
        "meaning": "A unit of digital information consisting of 8 bits."
      },
      {
        "concept": "Packet",
        "meaning": "A unit of data produced and handled by Network Layer (OSI Layer 3)."
      },
      {
        "concept": "Frame",
        "meaning": "A unit of data organized and handled by Data Link Layer (OSI Layer 2)."
      },
      {
        "concept": "Header & Trailer",
        "meaning": "Protocol control metadata prepended and appended to payload data."
      }
    ],
    "learningObjectives": [
      "Define framing in simple and technical terms.",
      "Explain why raw physical bitstreams must be divided into discrete frames.",
      "Identify the common fields of a frame (header, payload, trailer).",
      "Describe and compare the four classic framing methods: character count, byte stuffing, bit stuffing, and physical-layer coding violations.",
      "Demonstrate byte stuffing and bit stuffing with worked examples.",
      "Distinguish a frame from a packet and from an unformatted stream of bits."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802.3, RFC 1662, ISO 13239",
      "type": "Frame Delineation & Encapsulation",
      "keyFormula": "\\text{Frame} = \\text{Flag} + \\text{Header} + \\text{Payload} + \\text{Trailer (FCS)} + \\text{Flag}",
      "prerequisites": [
        "packet",
        "encapsulation"
      ],
      "relatedConcepts": [
        "byte-stuffing",
        "bit-stuffing",
        "crc",
        "ethernet"
      ],
      "compareWith": [
        "packet"
      ],
      "primaryUses": [
        "Ethernet LANs, Point-to-Point Protocol (PPP), HDLC serial links, Wi-Fi 802.11"
      ]
    },
    "imageUrl": "assets/images/topic1/framing-techniques.svg",
    "imageCaption": "Figure 1.11: Four Classical Framing Techniques: Character Count, Byte Stuffing, Bit Stuffing, and Coding Violations.",
    "sections": {
      "overview": "the Data Link Layer function in which a continuous sequence of bits received from the Physical Layer is organized into protocol-defined <strong>frames</strong>. The protocol establishes exact rules allowing the receiver to recognize frame boundaries, interpret header metadata, and safely extract the payload for delivery to the Network Layer.",
      "eli10": "Imagine receiving a letter written as one unbroken string with no spaces or punctuation: <code>HELLOWORLDHOWAREYOUGOODMORNING</code>. You wouldn't know where one thought begins and another ends. Framing adds the \"spaces\", \"capital letters\", and \"periods\" to computer communication so devices know where each individual message starts and finishes.",
      "analogy": "Think of a courier delivery service. Parcels have defined physical box edges (frame boundaries), shipping address labels (headers), the actual items inside (payload), and a tamper-evident tape or inspection seal (trailer/FCS). Without the box edges, all items would be dumped into an unseparated heap on a conveyor belt.",
      "howItWorks": "\n        <ol class=\"wiki-ordered-list\">\n          <li><strong>Network Layer Hand-off:</strong> The Network Layer passes a packet (e.g., an IPv4 or IPv6 datagram) down to Layer 2.</li>\n          <li><strong>Frame Encapsulation:</strong> Layer 2 prepends link addressing and control metadata (Header) and appends an error-detection code (Trailer).</li>\n          <li><strong>Boundary Delineation:</strong> The protocol applies a framing technique (such as sentinel delimiter flags or length counters) so the physical receiver can lock onto boundaries.</li>\n          <li><strong>Physical Transmission:</strong> The framed bits are converted into physical signals (voltages, light pulses, or RF waves).</li>\n          <li><strong>Receiver Synchronization & Decapsulation:</strong> The receiver detects the opening boundary, extracts headers, validates the FCS trailer, strips framing overhead, and passes the clean packet up to Layer 3.</li>\n        </ol>",
      "diagram": "",
      "interactiveLabKey": "stuffing",
      "technicalDetails": "\n        <p>Networking theory classifies framing into four foundational techniques:</p>\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>1. Character Count (Length Field):</strong> The header contains an integer specifying total bytes in the frame. (Fatal flaw: single-bit noise corrupting the count destroys synchronization for all subsequent frames).</li>\n          <li><strong>2. Byte Stuffing (Character-Oriented):</strong> Delimited by flag bytes (e.g., <code>0x7E</code> in PPP). When payload data contains the flag byte, a special Escape byte (<code>0x7D</code>) is stuffed before it.</li>\n          <li><strong>3. Bit Stuffing (Bit-Oriented):</strong> Delimited by flag pattern <code>01111110</code> (HDLC). The transmitter automatically injects a <code>0</code> after every five consecutive <code>1</code>s in data.</li>\n          <li><strong>4. Physical-Layer Coding Violations:</strong> In Manchester or 4B/5B encoding, signals that violate valid data clocking (e.g., High-High or Low-Low) are used exclusively as delimiters without payload stuffing overhead.</li>\n        </ul>",
      "workedExamples": {
        "level1": "<strong>Problem:</strong> A frame carries 100 bytes of payload. Identify why a header and trailer are needed instead of just transmitting the 100 raw bytes.<br><br>\n<strong>Solution:</strong><br>\n1. Raw bytes on a wire lack destination/source hardware addressing (Layer 2 cannot route them across local links).<br>\n2. A trailer (FCS) is required so the receiver can mathematically verify if electrical noise altered any bit.<br>\n3. Without boundaries, the receiver cannot tell where this 100-byte block ends and the next begins.<br>\n<em>Concept Tested: Encapsulation & Boundary Delineation.</em>",
        "level2": "<strong>Problem:</strong> A simplified protocol uses Character Count framing. The first byte represents total frame size including the count byte itself. A sender transmits payload data bytes <code>A, B, C, D</code>.<br><br>\n<strong>Working:</strong><br>\n1. Total payload bytes = 4.<br>\n2. Total frame length = 1 count byte + 4 payload bytes = 5 bytes.<br>\n3. Resulting frame transmitted: <code>[5] [A] [B] [C] [D]</code>.<br>\n4. Receiver reads count <code>5</code>, consumes 5 bytes, and expects the next frame to begin immediately after.<br>\n<em>Weakness: If noise changes <code>5</code> to <code>9</code>, receiver consumes 4 bytes of the next frame, causing framing collapse!</em>",
        "level3": "<strong>Problem:</strong> A receiver identifies a frame boundary correctly and decapsulates the fields, but the FCS calculation yields a non-zero remainder. What conclusion should be drawn?<br><br>\n<strong>Analysis:</strong><br>\n1. Framing succeeded: The boundaries were recognized, so frame structure was recovered.<br>\n2. Error Detection failed: The payload or header bits were corrupted by channel noise in transit.<br>\n3. Crucial distinction: Correct framing guarantees structural demarcation, NOT data integrity! The receiver discards the corrupted frame.<br>\n<em>Concept Tested: Framing vs. Error Detection independence.</em>"
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Framing Method</th><th>Primary Advantage</th><th>Main Limitation / Vulnerability</th></tr></thead>\n          <tbody>\n            <tr><td>Character Count</td><td>Simple implementation, zero stuffing overhead</td><td>Catastrophic desynchronization if count byte is corrupted</td></tr>\n            <tr><td>Byte Stuffing</td><td>Works with arbitrary byte-oriented data</td><td>Variable escape overhead; receiver requires escape parsing</td></tr>\n            <tr><td>Bit Stuffing</td><td>Arbitrary bit-length payloads; robust hardware flags</td><td>Adds transmission bit overhead; requires shift-register logic</td></tr>\n            <tr><td>Coding Violations</td><td>Zero payload data overhead</td><td>Tied to physical line codes; not usable on all media</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet II (IEEE 802.3): Preamble (7B) + SFD (1B) + Header + FCS.",
        "Point-to-Point Protocol (PPP - RFC 1662): Byte stuffing with 0x7E flags and 0x7D escapes.",
        "High-Level Data Link Control (HDLC): Bit stuffing with 01111110 flags.",
        "IEEE 802.11 Wi-Fi: PLCP Preamble and Header delimit wireless Layer 2 frames."
      ],
      "commonMistakes": "\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>Confusing framing with error detection:</strong> Framing defines data unit boundaries; error detection tests whether bits were altered. A frame can have perfect boundaries and still be corrupted.</li>\n          <li><strong>Believing every protocol uses start and end bytes:</strong> Ethernet uses a start delimiter (SFD) and physical inter-frame gaps/length, not a trailing flag byte.</li>\n          <li><strong>Assuming stuffing changes the user's data:</strong> Stuffing only changes the <em>transmitted representation</em>. The receiver always removes stuffed bytes/bits before delivering payload to Layer 3.</li>\n        </ul>",
      "compareWith": {
        "title": "Byte Stuffing vs. Bit Stuffing",
        "note": "Byte stuffing operates on octet boundaries using escape characters, while bit stuffing inspects continuous bit patterns using hardware 5-ones detection."
      },
      "quiz": [
        {
          "question": "What is the primary purpose of framing in the Data Link Layer?",
          "options": [
            "To assign IP addresses to hosts",
            "To identify the boundaries of discrete data units",
            "To choose optimal routing paths between networks",
            "To encrypt application passwords"
          ],
          "correctIndex": 1,
          "explanation": "Framing transforms a continuous, unseparated stream of physical bits into identifiable frames with distinct start and end boundaries."
        },
        {
          "question": "Which framing method inserts an escape byte when a reserved delimiter occurs in payload?",
          "options": [
            "Bit stuffing",
            "Character count",
            "Byte stuffing",
            "Coding violation"
          ],
          "correctIndex": 2,
          "explanation": "Byte stuffing (character stuffing) inserts an escape byte (e.g. ESC or 0x7D) before reserved delimiter bytes appearing in user data."
        },
        {
          "question": "In standard HDLC bit stuffing, when does the transmitter insert a zero?",
          "options": [
            "After every two zeros",
            "After five consecutive ones",
            "At the beginning of every byte",
            "Whenever the packet terminates"
          ],
          "correctIndex": 1,
          "explanation": "To prevent the flag pattern (01111110) from accidentally appearing inside payload, a 0 is inserted after every sequence of five consecutive 1s."
        },
        {
          "question": "What is the primary danger of the character-count framing technique?",
          "options": [
            "It cannot carry binary payloads",
            "A single corrupted count byte desynchronizes subsequent frames",
            "It requires 50% bandwidth overhead",
            "It cannot operate over fiber optic cables"
          ],
          "correctIndex": 1,
          "explanation": "If noise flips even one bit in the length count, the receiver mislocates the boundary and misinterprets all future frames in the stream."
        },
        {
          "question": "Does correct frame boundary recognition guarantee that payload data is uncorrupted?",
          "options": [
            "Yes, always",
            "No, framing and error detection are separate functions",
            "Only in full-duplex Ethernet",
            "Only when byte stuffing is enabled"
          ],
          "correctIndex": 1,
          "explanation": "Framing merely locates where the frame begins and ends. An FCS (CRC) check must separately verify that payload bits were not flipped by noise."
        },
        {
          "question": "Which field in an Ethernet frame enables physical layer synchronization?",
          "options": [
            "Type / Length field",
            "7-byte Preamble and 1-byte SFD",
            "Frame Check Sequence",
            "Destination MAC address"
          ],
          "correctIndex": 1,
          "explanation": "The 7-byte preamble (alternating 10101010) and 1-byte SFD (10101011) allow receiver transceivers to lock onto the bit clock before reading the frame."
        }
      ],
      "references": [
        {
          "cite": "Tanenbaum, A. S., & Wetherall, D. J. Computer Networks (6th Ed.) - Chapter 3: The Data Link Layer.",
          "url": "https://www.pearson.com"
        },
        {
          "cite": "RFC 1662 - PPP in HDLC-like Framing, Internet Engineering Task Force.",
          "url": "https://www.rfc-editor.org/rfc/rfc1662"
        },
        {
          "cite": "IEEE 802.3-2022 - Standard for Ethernet, IEEE Computer Society.",
          "url": "https://standards.ieee.org"
        }
      ],
      "imageUrl": "assets/images/topic1/bit-stuffing-mechanism.svg",
      "imageCaption": "Figure: Framing Boundary Delineation & Bit Stuffing with 01111110 Flag Delimiters."
    },
    "prevTopicId": "dll-design-issues",
    "nextTopicId": "byte-stuffing",
    "imageUrl": "assets/images/topic1/bit-stuffing-mechanism.svg",
    "imageCaption": "Figure: Framing Boundary Delineation & Bit Stuffing with 01111110 Flag Delimiters."
  },
  "byte-stuffing": {
    "id": "byte-stuffing",
    "title": "Byte Stuffing (Character Stuffing)",
    "unit": "Unit II: Data Link Layer & MAC Sublayer",
    "unitId": "unit2",
    "level": "Beginner → Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "RFC 1662 (PPP) / ISO 3309",
    "oneLiner": "Escaping reserved delimiter flag bytes inside payload to preserve unambiguous frame boundaries.",
    "quickAnswer": "Byte stuffing marks frame boundaries with special FLAG bytes (0x7E) and prefixes any FLAG or ESC appearing inside payload with an escape byte (0x7D).",
    "whyItMatters": "If payload data (such as binary files, compiled executables, or images) naturally contains the byte pattern used as the frame delimiter, the receiver would prematurely terminate the frame without escaping.",
    "prerequisitesList": [
      {
        "concept": "Byte / Octet",
        "meaning": "An 8-bit binary value ranging from 0x00 to 0xFF."
      },
      {
        "concept": "Delimiter Flag",
        "meaning": "A reserved byte marking the start and end of a frame."
      },
      {
        "concept": "Escape Character",
        "meaning": "A reserved byte signaling that the next character is literal data."
      }
    ],
    "learningObjectives": [
      "Explain why byte stuffing is required in character-oriented protocols.",
      "Demonstrate escaping rules for both delimiter bytes and escape bytes.",
      "Explain the exact Point-to-Point Protocol (PPP RFC 1662) octet stuffing mechanism.",
      "Trace sender stuffing and receiver destuffing step-by-step."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "RFC 1662 (PPP), ISO 3309",
      "type": "Character-Oriented Framing",
      "keyFormula": "\\text{Payload: } [\\text{FLAG}] \\xrightarrow{\\text{stuff}} [\\text{ESC}] [\\text{FLAG}]",
      "prerequisites": [
        "framing"
      ],
      "relatedConcepts": [
        "bit-stuffing",
        "framing",
        "ppp"
      ],
      "compareWith": [
        "bit-stuffing"
      ],
      "primaryUses": [
        "Point-to-Point Protocol (PPP), Bisync, Serial communications"
      ]
    },
    "sections": {
      "overview": "a framing technique used in byte-oriented protocols where frame boundaries are delineated by reserved flag bytes. When reserved values occur naturally within user payload data, the transmitter inserts an <strong>escape byte (ESC)</strong> immediately preceding the reserved byte.",
      "eli10": "Imagine you tell your friend: \"Whenever I say the secret word 'STOP', it means my sentence is finished.\" But what if you need to say \"I saw a STOP sign\"? If you just said \"STOP\", your friend would think you stopped talking. So you agree on a rule: say \"LITERAL STOP\" when you mean the actual word! That's byte stuffing!",
      "analogy": "In programming languages like Python or JavaScript, strings use quote marks as boundaries (<code>\"hello\"</code>). To include a quote inside the string, you escape it with a backslash (<code>\"She said \\\"hello\\\"\"</code>). Byte stuffing does the exact same thing with network bytes!",
      "howItWorks": "\n        <ol class=\"wiki-ordered-list\">\n          <li><strong>Sender Boundary Flag:</strong> Transmits an opening delimiter byte (e.g., <code>FLAG = 0x7E</code>).</li>\n          <li><strong>Payload Scanning:</strong> Scans payload byte-by-byte.</li>\n          <li><strong>Flag Escaping:</strong> If a byte equals <code>FLAG</code>, sender emits <code>ESC (0x7D)</code> followed by the escaped representation.</li>\n          <li><strong>Escape Escaping:</strong> If a byte equals <code>ESC</code>, sender emits <code>ESC</code> followed by the escaped representation.</li>\n          <li><strong>Frame Termination:</strong> Transmits closing <code>FLAG = 0x7E</code>.</li>\n          <li><strong>Receiver Destuffing:</strong> Receiver strips <code>ESC</code>, treats the following byte as payload data, and recognizes unescaped <code>FLAG</code> as the true frame boundary.</li>\n        </ol>",
      "diagram": "",
      "interactiveLabKey": "stuffing",
      "technicalDetails": "\n        <p>In RFC 1662 (PPP in HDLC-like Framing):</p>\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>Flag Sequence:</strong> <code>0x7E</code> (binary <code>01111110</code>).</li>\n          <li><strong>Control Escape:</strong> <code>0x7D</code> (binary <code>01111101</code>).</li>\n          <li><strong>XOR 0x20 Transformation:</strong> When stuffing an octet, PPP inserts <code>0x7D</code> and XORs the original octet with <code>0x20</code> (inverting bit 5).</li>\n          <li><code>0x7E</code> is transmitted as <code>0x7D 0x5E</code> ($0x7E \\oplus 0x20 = 0x5E$).</li>\n          <li><code>0x7D</code> is transmitted as <code>0x7D 0x5D</code> ($0x7D \\oplus 0x20 = 0x5D$).</li>\n        </ul>",
      "workedExamples": {
        "level1": "<strong>Problem:</strong> A sender wants to transmit the payload: <code>X, FLAG, Y</code>. The protocol uses <code>FLAG</code> as delimiter and <code>ESC</code> as escape. Show the transmitted payload.<br><br>\n<strong>Solution:</strong><br>\n1. Identify reserved bytes: <code>FLAG</code> is reserved.<br>\n2. Prefix <code>FLAG</code> with <code>ESC</code>.<br>\n3. Transmitted payload: <code>X, ESC, FLAG, Y</code>.<br>\n4. The receiver strips <code>ESC</code> and recovers <code>X, FLAG, Y</code>.",
        "level2": "<strong>Problem:</strong> A payload contains: <code>A, ESC, B, FLAG, ESC, C</code>. Trace the stuffed stream.<br><br>\n<strong>Working:</strong><br>\n1. <code>A</code> &rarr; regular byte &rarr; <code>A</code><br>\n2. <code>ESC</code> &rarr; reserved escape byte &rarr; stuffed as <code>ESC, ESC</code><br>\n3. <code>B</code> &rarr; regular byte &rarr; <code>B</code><br>\n4. <code>FLAG</code> &rarr; reserved boundary &rarr; stuffed as <code>ESC, FLAG</code><br>\n5. <code>ESC</code> &rarr; reserved escape byte &rarr; stuffed as <code>ESC, ESC</code><br>\n6. <code>C</code> &rarr; regular byte &rarr; <code>C</code><br>\nFull Transmitted Payload: <code>A, ESC, ESC, B, ESC, FLAG, ESC, ESC, C</code>.",
        "level3": "<strong>Problem:</strong> In PPP (RFC 1662), explain why <code>0x7D</code> itself must be escaped, and calculate the transmission of <code>0x7D 0x7E</code>.<br><br>\n<strong>Analysis:</strong><br>\n1. If <code>ESC (0x7D)</code> were not escaped, a lone <code>0x7D</code> in data would cause the receiver to treat whatever follows as escaped, corrupting two bytes.<br>\n2. Applying PPP rules ($byte \\oplus 0x20$):<br>\n   - <code>0x7D</code> &rarr; <code>0x7D</code> followed by $0x7D \\oplus 0x20 = 0x5D$.<br>\n   - <code>0x7E</code> &rarr; <code>0x7D</code> followed by $0x7E \\oplus 0x20 = 0x5E$.<br>\n3. Transmitted stream: <code>0x7D 0x5D 0x7D 0x5E</code> (4 bytes for 2 original bytes)."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Detail</th></tr></thead>\n          <tbody>\n            <tr><td>Advantages</td><td>Transparent to user data; handles arbitrary binary files; natural for byte-based serial lines.</td></tr>\n            <tr><td>Disadvantages</td><td>Variable transmission overhead (worst-case doubles payload size if payload is all flags/escapes); processing latency per byte.</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Point-to-Point Protocol (PPP) over dial-up and cellular modems.",
        "Bisync (Binary Synchronous Communications) protocols using DLE (Data Link Escape).",
        "Modbus ASCII industrial telemetry protocols."
      ],
      "commonMistakes": "\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>Forgetting to escape the escape byte:</strong> If ESC is not escaped, the receiver misinterprets user data following it.</li>\n          <li><strong>Confusing byte stuffing with bit stuffing:</strong> Byte stuffing operates on 8-bit octets; bit stuffing operates on individual bits regardless of byte boundaries.</li>\n        </ul>",
      "quiz": [
        {
          "question": "Why must the ESC byte itself be escaped if it appears in user payload?",
          "options": [
            "To save bandwidth",
            "To prevent the receiver from treating the subsequent user byte as an escaped control code",
            "To satisfy IP routing tables",
            "It is optional and not strictly necessary"
          ],
          "correctIndex": 1,
          "explanation": "If a literal ESC in data were transmitted unescaped, the receiver would discard it and misinterpret the next byte as an escape sequence."
        },
        {
          "question": "In RFC 1662 PPP, how is the FLAG byte (0x7E) stuffed inside the payload?",
          "options": [
            "0x7E 0x7E",
            "0x7D 0x5E",
            "0x00 0x7E",
            "0xFF 0x7E"
          ],
          "correctIndex": 1,
          "explanation": "PPP escapes 0x7E by inserting 0x7D followed by 0x7E XOR 0x20, which equals 0x5E."
        },
        {
          "question": "What is the worst-case overhead of byte stuffing?",
          "options": [
            "0%",
            "10%",
            "100% (payload doubles in size)",
            "800%"
          ],
          "correctIndex": 2,
          "explanation": "In the extreme worst-case where every single byte in the payload is a FLAG or ESC, every byte requires an escape byte, doubling the payload size."
        }
      ],
      "references": [
        {
          "cite": "RFC 1662 - PPP in HDLC-like Framing, Internet Engineering Task Force.",
          "url": "https://www.rfc-editor.org/rfc/rfc1662"
        }
      ],
      "imageUrl": "assets/images/topic1/bit-stuffing-mechanism.svg",
      "imageCaption": "Figure: Byte Stuffing (Character-Oriented) vs. Bit Stuffing (Bit-Oriented) Delimiting."
    },
    "prevTopicId": "framing",
    "nextTopicId": "bit-stuffing",
    "imageUrl": "assets/images/topic1/bit-stuffing-mechanism.svg",
    "imageCaption": "Figure: Byte Stuffing (Character-Oriented) vs. Bit Stuffing (Bit-Oriented) Delimiting."
  },
  "bit-stuffing": {
    "id": "bit-stuffing",
    "title": "HDLC Bit Stuffing",
    "unit": "Unit II: Data Link Layer & MAC Sublayer",
    "unitId": "unit2",
    "level": "Beginner → Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "ISO 13239 (HDLC) / ITU-T X.25",
    "oneLiner": "Inserting a zero bit after five consecutive ones to guarantee unambiguous flag delimiters.",
    "quickAnswer": "Bit stuffing inserts a 0 after every five consecutive 1s in the data stream, preventing payload from accidentally matching the reserved 01111110 frame flag.",
    "whyItMatters": "Bit-oriented protocols operate on arbitrary streams of bits rather than fixed 8-bit bytes. Bit stuffing provides foolproof boundary detection regardless of character sets or word alignment.",
    "prerequisitesList": [
      {
        "concept": "Bit Stream",
        "meaning": "A continuous sequence of binary digits."
      },
      {
        "concept": "HDLC Flag",
        "meaning": "The 8-bit sentinel sequence 01111110 (six consecutive 1s)."
      }
    ],
    "learningObjectives": [
      "Understand the motivation for bit-level boundary preservation.",
      "State the HDLC rule for 5 consecutive ones.",
      "Execute bit stuffing on arbitrary binary streams.",
      "Execute receiver de-stuffing and identify flag/abort patterns."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "ISO 13239 (HDLC), ITU-T X.25",
      "type": "Bit-Oriented Framing",
      "keyFormula": "\\text{Data: } 11111 \\xrightarrow{\\text{stuff}} 11111\\mathbf{0}",
      "prerequisites": [
        "framing"
      ],
      "relatedConcepts": [
        "byte-stuffing",
        "framing",
        "ethernet"
      ],
      "compareWith": [
        "byte-stuffing"
      ],
      "primaryUses": [
        "HDLC serial backbones, SDLC, X.25, Frame Relay, CAN bus"
      ]
    },
    "sections": {
      "overview": "a bit-oriented framing mechanism in which the transmitter dynamically injects extra bits into the data stream to prevent the payload from accidentally containing the reserved frame delimiter pattern (<code>01111110</code>).",
      "eli10": "Imagine the rule is: six claps in a row means \"STOP THE SONG\". If a song naturally has six claps in a row, the music stops! To prevent that, whenever the drummer claps five times, they are forced to take a tiny breath (a zero) before clapping again. When you listen to the song, you simply ignore that forced breath!",
      "analogy": "Similar to traffic light sequences. If three amber flashes mean \"Emergency Evacuation\", a normal traffic controller is hardwired to never allow three consecutive amber flashes during routine cycle changes.",
      "howItWorks": "\n        <ol class=\"wiki-ordered-list\">\n          <li><strong>Sender Scans Bits:</strong> Transmits opening flag <code>01111110</code>, then scans payload bits sequentially.</li>\n          <li><strong>Counter Tracking:</strong> Maintains a counter of consecutive <code>1</code> bits.</li>\n          <li><strong>Stuffing Action:</strong> Whenever five consecutive <code>1</code> bits are transmitted, the sender automatically injects a <code>0</code> bit into the stream.</li>\n          <li><strong>Counter Reset:</strong> Counter resets to 0 after every injected zero or natural zero.</li>\n          <li><strong>Closing Flag:</strong> Transmits closing flag <code>01111110</code>.</li>\n          <li><strong>Receiver De-stuffing:</strong> Receiver counts consecutive <code>1</code>s. If five <code>1</code>s are followed by a <code>0</code>, the <code>0</code> is automatically stripped!</li>\n        </ol>",
      "diagram": "",
      "interactiveLabKey": "stuffing",
      "technicalDetails": "\n        <p>Receiver State Machine after receiving five consecutive 1s (<code>11111</code>):</p>\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>If 6th bit is 0:</strong> Stuffed bit! Discard the 0, resume normal payload processing.</li>\n          <li><strong>If 6th bit is 1 and 7th bit is 0 (01111110):</strong> Frame delimiter Flag! End of current frame.</li>\n          <li><strong>If 6th bit is 1 and 7th bit is 1 (01111111...):</strong> ABORT sequence! An error occurred or link was interrupted; discard frame.</li>\n        </ul>",
      "workedExamples": {
        "level1": "<strong>Problem:</strong> Apply bit stuffing to data: <code>01111110</code>.<br><br>\n<strong>Solution:</strong><br>\n1. Count consecutive 1s: bits 2, 3, 4, 5, 6 are five 1s.<br>\n2. After 5th one, insert a <code>0</code>.<br>\n3. Stuffed stream: <code>011111010</code>.<br>\n<em>Result: The exact flag pattern 01111110 can never appear in transmitted payload!</em>",
        "level2": "<strong>Problem:</strong> Apply bit stuffing to 12 consecutive ones: <code>111111111111</code>.<br><br>\n<strong>Working:</strong><br>\n1. First 5 ones: <code>11111</code> &rarr; insert <code>0</code> &rarr; <code>111110</code><br>\n2. Next 5 ones: <code>11111</code> &rarr; insert <code>0</code> &rarr; <code>111110</code><br>\n3. Remaining 2 ones: <code>11</code><br>\nOutput stream: <code>11111011111011</code> (Two stuffed zeros added).",
        "level3": "<strong>Problem:</strong> A receiver receives: <code>011111001111110</code>. Decode the payload and explain receiver decisions.<br><br>\n<strong>Analysis:</strong><br>\n1. Bits 2..6 are five 1s (<code>11111</code>).<br>\n2. Bit 7 is <code>0</code> &rarr; receiver identifies it as a stuffed bit and removes it.<br>\n3. Bits 8..13 are five 1s followed by a 1 and 0 (<code>01111110</code>) &rarr; recognized as Frame Delimiter FLAG!<br>\n4. Extracted Payload: <code>0111110</code>."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Advantages</th><th>Disadvantages</th></tr></thead>\n          <tbody>\n            <tr><td>Works at the raw bit level; completely transparent to arbitrary binary data; fixed low hardware complexity.</td><td>Transmission length varies dynamically depending on payload content; worst-case adds 20% overhead (for continuous 1s).</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "HDLC (High-Level Data Link Control) and SDLC.",
        "X.25 packet switching network link layer.",
        "Controller Area Network (CAN bus) in automotive electronics (stuffs after 5 identical bits)."
      ],
      "commonMistakes": "\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>Assuming a zero is only stuffed if the 6th bit is 1:</strong> INCORRECT! The sender unconditionally inserts a 0 after five 1s, even if the next natural bit was already 0 (producing <code>1111100</code>). Otherwise, the receiver could not distinguish stuffed zeros from natural zeros.</li>\n        </ul>",
      "quiz": [
        {
          "question": "When is a zero bit inserted during HDLC bit stuffing?",
          "options": [
            "Only when six 1s appear",
            "Unconditionally after any five consecutive 1s",
            "Only if the 6th bit is a 1",
            "At the end of every byte"
          ],
          "correctIndex": 1,
          "explanation": "The sender MUST insert a 0 after every five consecutive 1s regardless of what the next bit is, so the receiver can unambiguously strip it."
        },
        {
          "question": "What does a receiver conclude if it sees five 1s followed by a 1 and a 0 (01111110)?",
          "options": [
            "It is a transmission error",
            "It is an inserted bit to strip",
            "It is the End-of-Frame delimiter FLAG",
            "It is a parity failure"
          ],
          "correctIndex": 2,
          "explanation": "In HDLC, 01111110 is the reserved FLAG pattern indicating the frame boundary."
        },
        {
          "question": "If user payload is 01111100, what is the transmitted bit-stuffed stream?",
          "options": [
            "01111100",
            "011111000",
            "011111100",
            "01111000"
          ],
          "correctIndex": 1,
          "explanation": "After five 1s, a 0 is inserted, followed by the natural 0, yielding 011111[0]0."
        }
      ],
      "references": [
        {
          "cite": "ISO/IEC 13239:2002 - Information technology - Telecommunications and information exchange between systems - High-level data link control (HDLC) procedures.",
          "url": "https://www.iso.org"
        }
      ],
      "imageUrl": "assets/images/topic1/bit-stuffing-mechanism.svg",
      "imageCaption": "Figure: Bit Stuffing Rule: Zero-bit inserted after every 5 consecutive 1s in payload."
    },
    "prevTopicId": "byte-stuffing",
    "nextTopicId": "error-detection",
    "imageUrl": "assets/images/topic1/bit-stuffing-mechanism.svg",
    "imageCaption": "Figure: Bit Stuffing Rule: Zero-bit inserted after every 5 consecutive 1s in payload."
  },
  "error-detection": {
    "id": "error-detection",
    "title": "Error Detection and Correction",
    "unit": "Unit II: Data Link Layer & MAC Sublayer",
    "unitId": "unit2",
    "level": "Beginner → Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "25–35 min",
    "standard": "IEEE / ITU-T / Coding Theory",
    "oneLiner": "Techniques for identifying and repairing bit discrepancies caused by channel noise and interference.",
    "quickAnswer": "Error detection identifies that data was corrupted; error correction recovers the original bits without retransmission using structured mathematical redundancy.",
    "whyItMatters": "Electrical noise, thermal interference, wireless multipath fading, and hardware faults can flip bits during transmission. Without error control, corrupted packets would crash operating systems or falsify records.",
    "prerequisitesList": [
      {
        "concept": "Bit Error",
        "meaning": "A transmission discrepancy where sent 0 becomes 1 or sent 1 becomes 0."
      },
      {
        "concept": "Redundancy",
        "meaning": "Extra non-data bits added specifically to enable verification or reconstruction."
      },
      {
        "concept": "XOR (Exclusive OR)",
        "meaning": "Modulo-2 addition: outputs 1 if inputs differ, 0 if identical."
      }
    ],
    "learningObjectives": [
      "Define error detection and error correction.",
      "Distinguish single-bit errors from burst errors.",
      "Explain the fundamental role of redundancy and majority voting.",
      "Define Hamming distance ($d_{min}$) and prove its error detection/correction limits.",
      "Compare Forward Error Correction (FEC) against Automatic Repeat Request (ARQ)."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "Shannon Information Theory, IEEE 802.3",
      "type": "Channel Coding & Integrity",
      "keyFormula": "d_{\\min} \\ge 2t + 1 \\iff t = \\left\\lfloor \\frac{d_{\\min}-1}{2} \\right\\rfloor",
      "prerequisites": [
        "framing"
      ],
      "relatedConcepts": [
        "parity",
        "checksum",
        "crc",
        "hamming-code"
      ],
      "compareWith": [
        "flow-control"
      ],
      "primaryUses": [
        "Data link frames, ECC memory, deep-space telemetry, storage drives"
      ]
    },
    "sections": {
      "overview": "the suite of algorithmic and mathematical techniques used by communication systems to determine whether transmitted bits were altered in transit, and where possible, reconstruct the original uncorrupted dataword.",
      "eli10": "Imagine receiving a noisy voice message where someone says: \"Please send me one c-t.\" You know English words, so you deduce it's either \"cat\" or \"cot\". If they said \"Please send me one c-t that meows\", the extra context (\"meows\") lets you fix the error and know it was \"cat\"! That extra context is redundancy!",
      "analogy": "Error detection is like a bank teller noticing that a signature does not match the file card (they reject the check). Error correction is like having two security cameras, a fingerprint, and photo ID so the teller can prove who you are even if the signature is smudged.",
      "howItWorks": "\n        <ol class=\"wiki-ordered-list\">\n          <li><strong>Noise Ingestion:</strong> Channels induce random single-bit flips or prolonged burst noise.</li>\n          <li><strong>Redundant Encoding:</strong> Sender calculates check bits from raw data and appends them.</li>\n          <li><strong>Channel Transit:</strong> Codeword travels across physical medium; noise alters certain bits.</li>\n          <li><strong>Receiver Check:</strong> Receiver recalculates check bits over received stream.</li>\n          <li><strong>Detection vs Correction Decision:</strong>\n            <ul class=\"wiki-bullet-list\">\n              <li><em>Error Detection:</em> Check fails &rarr; frame is discarded; higher layer or ARQ retransmits.</li>\n              <li><em>Forward Error Correction (FEC):</em> Check fails &rarr; decoding algorithm locates flipped bit positions and inverts them back to original.</li>\n            </ul>\n          </li>\n        </ol>",
      "diagram": "",
      "interactiveLabKey": "hamming",
      "technicalDetails": "\n        <p><strong>Hamming Distance ($d_{\\min}$):</strong></p>\n        <p>The Hamming distance between two binary words is the number of bit positions in which they differ. For any block code with minimum distance $d_{\\min}$:</p>\n        <ul class=\"wiki-bullet-list\">\n          <li>To <strong>detect</strong> up to $e$ bit errors: $d_{\\min} \\ge e + 1 \\implies e = d_{\\min} - 1$.</li>\n          <li>To <strong>correct</strong> up to $t$ bit errors: $d_{\\min} \\ge 2t + 1 \\implies t = \\left\\lfloor \\frac{d_{\\min} - 1}{2} \\right\\rfloor$.</li>\n        </ul>\n        <p><strong>Error Types:</strong></p>\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>Single-bit error:</strong> Exactly one bit in a data unit changes (common in white Gaussian noise).</li>\n          <li><strong>Burst error:</strong> Two or more bits in a span change. The <em>burst length</em> is measured from the first corrupted bit to the last corrupted bit inclusive.</li>\n        </ul>",
      "workedExamples": {
        "level1": "<strong>Problem:</strong> Determine the Hamming distance between bit strings <code>101101</code> and <code>100001</code>.<br><br>\n<strong>Working:</strong><br>\nCompare position-by-position:<br>\nPos 1: 1 vs 1 (Same)<br>\nPos 2: 0 vs 0 (Same)<br>\nPos 3: 1 vs 0 (Different! 1)<br>\nPos 4: 1 vs 0 (Different! 2)<br>\nPos 5: 0 vs 0 (Same)<br>\nPos 6: 1 vs 1 (Same)<br>\nTotal differing bit positions = <strong>2</strong>. Hamming distance = 2.",
        "level2": "<strong>Problem:</strong> A channel code has a minimum Hamming distance $d_{\\min} = 5$. How many bit errors can it guarantee to detect, and how many can it correct?<br><br>\n<strong>Working:</strong><br>\n1. Error Detection capability: $e = d_{\\min} - 1 = 5 - 1 = \\mathbf{4\\text{ bit errors}}$.<br>\n2. Error Correction capability: $t = \\left\\lfloor \\frac{d_{\\min} - 1}{2} \\right\\rfloor = \\left\\lfloor \\frac{4}{2} \\right\\rfloor = \\mathbf{2\\text{ bit errors}}$.<br>\n<em>Conclusion: It can correct any pattern of 1 or 2 flipped bits, and detect up to 4 flipped bits.</em>",
        "level3": "<strong>Problem:</strong> A deep-space satellite link has a one-way propagation delay of 45 minutes. Contrast whether FEC or ARQ is appropriate.<br><br>\n<strong>Analysis:</strong><br>\n1. ARQ requires round-trip retransmission: $RTT = 2 \\times 45 = 90\\text{ minutes}$ per packet recovery!<br>\n2. FEC adds extra redundant check bits (e.g. Reed-Solomon or LDPC), allowing the receiver on Earth to correct bit flips immediately without waiting 90 minutes.<br>\n3. Therefore, FEC is essential on high-latency or simplex channels where feedback is impractical."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Approach</th><th>Mechanism</th><th>Primary Advantage</th><th>Main Limitation</th></tr></thead>\n          <tbody>\n            <tr><td>Forward Error Correction (FEC)</td><td>Sufficient redundancy to compute correct bits</td><td>Zero retransmission delay; works on simplex/satellite links</td><td>High bandwidth overhead; finite correction limit</td></tr>\n            <tr><td>Automatic Repeat Request (ARQ)</td><td>Error detection (CRC) + ACKs + Retransmission</td><td>Low overhead per clean frame; guarantees reliable delivery</td><td>Adds latency on noisy or high-RTT links</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "ECC RAM in servers (Single Error Correction, Double Error Detection).",
        "Deep-space communications (Voyager / Mars rovers use convolutional & Reed-Solomon FEC).",
        "Ethernet (CRC-32 error detection + discard; TCP handles recovery).",
        "Wi-Fi 802.11 (CRC-32 + link-layer ARQ retransmissions)."
      ],
      "commonMistakes": "\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>Assuming error detection repairs data:</strong> Detection only answers \"Did bits change?\". It cannot tell which bits were originally 1 or 0 without FEC.</li>\n          <li><strong>Assuming FEC can correct infinite errors:</strong> If error count exceeds code capacity $t$, miscorrection or silent failure occurs.</li>\n        </ul>",
      "quiz": [
        {
          "question": "If a block code has minimum Hamming distance d_min = 3, how many errors can it correct?",
          "options": [
            "3 errors",
            "2 errors",
            "1 error",
            "0 errors"
          ],
          "correctIndex": 2,
          "explanation": "t = floor((d_min - 1) / 2) = floor((3 - 1) / 2) = 1 single-bit error."
        },
        {
          "question": "What is the burst length if a 10-bit frame sent as 1101011010 is received as 1000010010?",
          "options": [
            "1 bit",
            "4 bits",
            "7 bits (from bit 2 to bit 8)",
            "10 bits"
          ],
          "correctIndex": 2,
          "explanation": "Burst error length is measured from the first corrupted bit (bit 2) to the last corrupted bit (bit 8) inclusive, spanning 7 bits."
        },
        {
          "question": "Why is FEC preferred over ARQ on deep-space and broadcast channels?",
          "options": [
            "FEC requires zero CPU processing",
            "Retransmission delay is prohibitively large or feedback channels do not exist",
            "FEC guarantees 100% security against hackers",
            "ARQ cannot detect CRC errors"
          ],
          "correctIndex": 1,
          "explanation": "On channels with enormous round-trip propagation delays (e.g. interplanetary probes) or one-way broadcast, waiting for retransmissions is impossible."
        }
      ],
      "references": [
        {
          "cite": "Hamming, R. W. (1950). Error detecting and error correcting codes. Bell System Technical Journal, 29(2), 147-160.",
          "url": "https://ieeexplore.ieee.org"
        },
        {
          "cite": "Tanenbaum, A. S., & Wetherall, D. J. Computer Networks (6th Ed.) - Section 3.2: Error-Correcting Codes.",
          "url": "https://www.pearson.com"
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/02/CRC8-gen.gif",
      "imageCaption": "Figure: Error Detection Techniques: Parity Check, Checksum, and Cyclic Redundancy Check (CRC)."
    },
    "prevTopicId": "bit-stuffing",
    "nextTopicId": "parity",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/02/CRC8-gen.gif",
    "imageCaption": "Figure: Error Detection Techniques: Parity Check, Checksum, and Cyclic Redundancy Check (CRC)."
  },
  "parity": {
    "id": "parity",
    "title": "Parity Checking (1D & 2D Parity)",
    "unit": "Unit II: Data Link Layer & MAC Sublayer",
    "unitId": "unit2",
    "level": "Beginner",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15 min",
    "standard": "ITU-T V.4 / ASCII Parity",
    "oneLiner": "Adding a single check bit to enforce an even or odd count of 1s in a data word.",
    "quickAnswer": "Even parity ensures the total number of 1s (including parity bit) is even; odd parity ensures the count is odd. Detects all odd numbers of bit errors.",
    "whyItMatters": "Parity is the simplest possible error detection mechanism, requiring only one redundant bit and simple XOR gate hardware.",
    "prerequisitesList": [
      {
        "concept": "Binary Weight",
        "meaning": "The count of '1' bits in a binary word."
      },
      {
        "concept": "Modulo-2 Arithmetic",
        "meaning": "Arithmetic without carry; equivalent to XOR."
      }
    ],
    "learningObjectives": [
      "Calculate even and odd parity bits for arbitrary binary words.",
      "Understand why parity detects odd numbers of bit flips and fails on even flips.",
      "Explain 2D parity (LRC + VRC) and how it detects and corrects single-bit errors."
    ],
    "infobox": {
      "layer": "Layer 2 / Physical / Hardware",
      "standard": "ASCII 7-bit + 1 parity bit",
      "type": "Simple Linear Parity",
      "keyFormula": "P_{\\text{even}} = d_1 \\oplus d_2 \\oplus \\dots \\oplus d_k",
      "prerequisites": [
        "error-detection"
      ],
      "relatedConcepts": [
        "checksum",
        "hamming-code",
        "crc"
      ],
      "compareWith": [
        "checksum"
      ],
      "primaryUses": [
        "Serial RS-232, memory buses, character terminals"
      ]
    },
    "sections": {
      "overview": "an elementary error-detection method that appends one redundant bit to a block of data bits such that the total number of <code>1</code> bits satisfies an agreed even or odd parity rule.",
      "eli10": "Think of a buddy system where people always enter a room in pairs. If an odd number of people walk in, the bouncer knows someone was left behind! Even parity makes sure the number of 1s is always an even number.",
      "analogy": "Counting coins: If you know you always keep an even number of dollar coins in your pocket, and you reach in and feel 3 coins, you instantly know one coin slipped through a hole in your pocket!",
      "howItWorks": "\n        <ol class=\"wiki-ordered-list\">\n          <li><strong>Count Ones:</strong> Sender counts the number of <code>1</code> bits in data word.</li>\n          <li><strong>Parity Bit Generation:</strong>\n            <ul class=\"wiki-bullet-list\">\n              <li><em>Even Parity:</em> If count of 1s is odd, set parity bit = 1; if already even, set parity bit = 0.</li>\n              <li><em>Odd Parity:</em> If count of 1s is even, set parity bit = 1; if already odd, set parity bit = 0.</li>\n            </ul>\n          </li>\n          <li><strong>Transmission:</strong> Transmit data + parity bit.</li>\n          <li><strong>Receiver Check:</strong> Receiver XORs all bits. In even parity, result must equal 0. If result is 1, parity error detected!</li>\n        </ol>",
      "diagram": "\nDataword:           1 0 1 1 0 0 1  (Contains four 1s -> already even)\nEven Parity Bit:    0\nTransmitted Word:   1 0 1 1 0 0 1 [0]  (Total 1s = 4 -> Even ✓)\n\nIf noise flips 1 bit:\nReceived Word:      1 0 1 0 0 0 1 [0]  (Total 1s = 3 -> ODD! ❌ ERROR DETECTED)",
      "interactiveLabKey": "hamming",
      "technicalDetails": "\n        <p><strong>Two-Dimensional (2D) Parity (LRC + VRC):</strong></p>\n        <p>Data bits are arranged in a table of $m$ rows and $k$ columns:</p>\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>Row Parity:</strong> Appended to each individual byte/row.</li>\n          <li><strong>Column Parity (LRC):</strong> A parity byte calculated across all columns.</li>\n          <li><strong>Single-bit correction:</strong> The row parity and column parity that fail intersect at the EXACT bit that flipped! That bit is inverted, correcting the error.</li>\n        </ul>",
      "workedExamples": {
        "level1": "<strong>Problem:</strong> Dataword is <code>1011001</code>. Calculate the even parity bit and the odd parity bit.<br><br>\n<strong>Solution:</strong><br>\nNumber of 1s = 4 (even).<br>\n- Even parity bit: <code>0</code> (so total stays 4). Transmitted: <code>10110010</code>.<br>\n- Odd parity bit: <code>1</code> (so total becomes 5). Transmitted: <code>10110011</code>.",
        "level2": "<strong>Problem:</strong> Transmitted codeword is <code>10110010</code> under even parity. Receiver gets <code>10100010</code>. Demonstrate parity checking.<br><br>\n<strong>Working:</strong><br>\nReceiver counts 1s: $1 + 0 + 1 + 0 + 0 + 0 + 1 + 0 = 3$.<br>\n3 is odd! Fails even parity check. Error detected at receiver!",
        "level3": "<strong>Problem:</strong> What happens if TWO bits flip in transit: sent <code>10110010</code>, received <code>10000010</code> (both bit 3 and bit 4 flipped from 1 to 0)?<br><br>\n<strong>Analysis:</strong><br>\nReceiver counts 1s: $1 + 0 + 0 + 0 + 0 + 0 + 1 + 0 = 2$.<br>\n2 is EVEN! The parity check passes! The 2-bit error went <strong>completely undetected</strong>.<br>\n<em>Fundamental limitation: Parity detects any odd number of errors ($1, 3, 5...$) but fails on any even number ($2, 4, 6...$).</em>"
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Advantages</th><th>Disadvantages</th></tr></thead>\n          <tbody>\n            <tr><td>Zero computational cost; single XOR gate implementation; single-bit overhead.</td><td>Fails completely on 2-bit flips; cannot locate which bit flipped in 1D; cannot correct errors.</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "ASCII characters in legacy RS-232 serial links (7 data bits + 1 parity bit).",
        "PCI and SCSI computer buses.",
        "Simple microcontroller register integrity checks."
      ],
      "commonMistakes": "\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>Thinking even parity means the data must have an even number of zeros:</strong> False! Even parity counts the number of <strong>1s</strong>.</li>\n        </ul>",
      "quiz": [
        {
          "question": "For the dataword 1101011, what is the even parity bit?",
          "options": [
            "0",
            "1",
            "Cannot be determined",
            "Both 0 and 1"
          ],
          "correctIndex": 1,
          "explanation": "There are five 1s (odd). To make the total count of 1s even, the even parity bit must be 1."
        },
        {
          "question": "What happens when an even number of bits flip in a word protected by a single parity bit?",
          "options": [
            "The parity check always detects it",
            "The parity check fails",
            "The parity check still passes and the error goes undetected",
            "The hardware automatically corrects both bits"
          ],
          "correctIndex": 2,
          "explanation": "Flipping an even number of bits leaves the odd/even count invariant, causing the parity check to falsely report clean data."
        }
      ],
      "references": [
        {
          "cite": "Tanenbaum & Wetherall, Computer Networks (6th Ed.) - Section 3.2.1.",
          "url": "https://www.pearson.com"
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Hamming%287%2C4%29.svg",
      "imageCaption": "Figure: Simple Parity & Two-Dimensional Parity Check Architecture."
    },
    "prevTopicId": "error-detection",
    "nextTopicId": "checksum",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Hamming%287%2C4%29.svg",
    "imageCaption": "Figure: Simple Parity & Two-Dimensional Parity Check Architecture."
  },
  "checksum": {
    "id": "checksum",
    "title": "Internet Checksum (RFC 1071)",
    "unit": "Unit II: Data Link Layer & MAC Sublayer",
    "unitId": "unit2",
    "level": "Beginner → Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "20 min",
    "standard": "RFC 1071 / RFC 791 / RFC 793",
    "oneLiner": "One's-complement 16-bit summation used to detect packet corruption across headers and payloads.",
    "quickAnswer": "The Internet Checksum divides data into 16-bit integers, sums them using one's-complement arithmetic with end-around carries, and inverts the result.",
    "whyItMatters": "Used in ubiquitous Internet protocols (IPv4 header, TCP, UDP). It is computationally lightweight on general-purpose CPUs compared to polynomial division.",
    "prerequisitesList": [
      {
        "concept": "One's Complement",
        "meaning": "Binary representation where negatives are formed by inverting all bits."
      },
      {
        "concept": "End-Around Carry",
        "meaning": "Adding overflow carry bits back into the least significant bit position."
      }
    ],
    "learningObjectives": [
      "Understand the RFC 1071 16-bit checksum algorithm.",
      "Perform one's-complement addition with carry wraparound.",
      "Verify checksum validation at the receiver.",
      "Understand why TCP/IP chose one's-complement checksums over CRC for software efficiency."
    ],
    "infobox": {
      "layer": "Layer 2 / 3 / 4 (IPv4, TCP, UDP)",
      "standard": "RFC 1071, RFC 791",
      "type": "Arithmetic Verification",
      "keyFormula": "\\text{Checksum} = \\sim \\left( \\sum_{i=1}^n W_i \\pmod{2^{16}-1} \\right)",
      "prerequisites": [
        "parity"
      ],
      "relatedConcepts": [
        "crc",
        "error-detection",
        "ipv4"
      ],
      "compareWith": [
        "crc"
      ],
      "primaryUses": [
        "IPv4 header, TCP pseudo-header & payload, UDP headers"
      ]
    },
    "sections": {
      "overview": "an error-detection value calculated by summing blocks of digital words using one's-complement arithmetic, transmitted alongside data so the receiver can recalculate and verify consistency.",
      "eli10": "Imagine you write down 5 numbers on a shopping list. At the bottom, you write the total sum. When your friend buys the items, they add up the 5 numbers themselves. If their total doesn't match yours, they know a number got smudged!",
      "analogy": "Balancing a bank ledger: You add all debits and credits. If the reconciled balance does not equal zero, a ledger entry error occurred.",
      "howItWorks": "\n        <ol class=\"wiki-ordered-list\">\n          <li><strong>16-Bit Word Division:</strong> Packet is divided into 16-bit integers (if length is odd, padded with a zero byte).</li>\n          <li><strong>One's-Complement Summation:</strong> Words are added together. Any carry bit out of bit 15 is wrapped around and added to bit 0 (end-around carry).</li>\n          <li><strong>Bitwise Inversion:</strong> The 16-bit sum is bitwise inverted (NOT operation). This becomes the checksum.</li>\n          <li><strong>Receiver Check:</strong> Receiver sums all 16-bit words including the received checksum. If no corruption occurred, the result is <code>0xFFFF</code> (all 1s), which inverted yields <code>0x0000</code>!</li>\n        </ol>",
      "diagram": "\nSender:\n  Word 1:    1100 0011 1010 0101\n+ Word 2:    0101 1010 0011 1100\n--------------------------------\nSum:         0001 1110 1110 0001  (with end-around carry)\nChecksum:    1110 0001 0001 1110  (~Sum: bitwise inverted)\nTransmit:    [Word 1] [Word 2] [Checksum]\n\nReceiver Sum:\n  Word 1 + Word 2 + Checksum = 1111 1111 1111 1111 (0xFFFF)\n  ~0xFFFF = 0x0000 ==> VALID! ✓",
      "interactiveLabKey": "crc",
      "technicalDetails": "\n        <p>Why One's-Complement was chosen in RFC 1071:</p>\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>Byte-Order Independence:</strong> The one's-complement sum produces the same checksum regardless of whether a machine is Little-Endian (x86) or Big-Endian (ARM/SPARC/Network byte order)!</li>\n          <li><strong>Speed:</strong> Can be computed with simple integer registers and accumulators without bit-by-bit hardware division.</li>\n          <li><strong>Weakness:</strong> Swapping the order of two 16-bit words, or incrementing one word while decrementing another, produces the exact same sum!</li>\n        </ul>",
      "workedExamples": {
        "level1": "<strong>Problem:</strong> Three 8-bit words are transmitted: <code>12, 23, 15</code>. Illustrate basic additive checksum logic.<br><br>\n<strong>Solution:</strong><br>\nSum = $12 + 23 + 15 = 50$. Checksum = $-50$.<br>\nReceiver adds $12 + 23 + 15 + (-50) = 0$. Since total is 0, transmission is validated.",
        "level2": "<strong>Problem:</strong> Add two 4-bit words in one's complement: <code>1100</code> and <code>1011</code>.<br><br>\n<strong>Working:</strong><br>\n1. Binary sum: $1100 + 1011 = 10111$ (5 bits &rarr; carry out of bit 4).<br>\n2. End-around carry: Add carry <code>1</code> to lowest bit: $0111 + 1 = 1000$.<br>\n3. Checksum: Invert bits of <code>1000</code> &rarr; <code>0111</code>.",
        "level3": "<strong>Problem:</strong> Show how the Internet Checksum can fail to detect a burst error that flips complementary bits.<br><br>\n<strong>Analysis:</strong><br>\nIf bit position $k$ in Word A flips $0 \to 1$ ($+2^k$) and bit position $k$ in Word B flips $1 \to 0$ ($-2^k$), their sum remains completely unchanged!<br>\nThe receiver recalculates the identical sum and checksum, silently accepting corrupted data. This is why Layer 2 relies on CRC rather than checksums."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Advantages</th><th>Disadvantages</th></tr></thead>\n          <tbody>\n            <tr><td>Extremely fast in software; byte-order independent; standard across TCP and IP.</td><td>Significantly weaker than CRC; cannot detect word reordering or compensating errors; zero correction ability.</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "IPv4 Header (RFC 791).",
        "TCP Protocol Header (RFC 793) covering header, payload, and pseudo-header.",
        "UDP Protocol Header (RFC 768)."
      ],
      "commonMistakes": "\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>Forgetting the end-around carry:</strong> Ordinary binary addition drops carries. One's-complement MUST wrap the carry back into the lowest bit.</li>\n        </ul>",
      "quiz": [
        {
          "question": "What mathematical property makes one's-complement addition byte-order independent?",
          "options": [
            "Modulo-2 XOR equivalence",
            "The sum of high bytes and low bytes can be accumulated in parallel regardless of endianness",
            "It only operates on single bits",
            "It uses prime numbers"
          ],
          "correctIndex": 1,
          "explanation": "In one's-complement arithmetic, byte-swapping words before summation produces the exact byte-swapped sum, allowing Little-Endian and Big-Endian CPUs to compute it interchangeably."
        },
        {
          "question": "When a receiver calculates the one's-complement sum of data words and the received checksum, what result indicates zero detected errors?",
          "options": [
            "0x0000",
            "0xFFFF (all 1s)",
            "0x1234",
            "Any negative integer"
          ],
          "correctIndex": 1,
          "explanation": "Because the checksum is the one's-complement negation of the sum, adding the sum to its negation yields all 1s (0xFFFF), which inverts to 0x0000."
        }
      ],
      "references": [
        {
          "cite": "RFC 1071 - Computing the Internet Checksum, Braden, Borman, & Partridge.",
          "url": "https://www.rfc-editor.org/rfc/rfc1071"
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/02/CRC8-gen.gif",
      "imageCaption": "Figure: Internet Checksum 16-bit 1's Complement Addition Architecture."
    },
    "prevTopicId": "parity",
    "nextTopicId": "hamming-code",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/02/CRC8-gen.gif",
    "imageCaption": "Figure: Internet Checksum 16-bit 1's Complement Addition Architecture."
  },
  "hamming-code": {
    "id": "hamming-code",
    "title": "Hamming Code (Error Detection & Correction)",
    "unit": "Unit II: Data Link Layer & MAC Sublayer",
    "unitId": "unit2",
    "level": "Beginner → Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "25–35 min",
    "standard": "Richard Hamming (1950) / IEEE Coding Theory",
    "oneLiner": "Forward error-correcting code using strategically placed parity bits to locate and fix single-bit errors.",
    "quickAnswer": "Hamming (7,4) adds 3 parity bits at power-of-two positions (1, 2, 4) to 4 data bits. The receiver calculates syndrome bits s₄s₂s₁; its decimal value points directly to the corrupted bit position.",
    "whyItMatters": "Simple parity tells you that an error exists, but not WHERE. Hamming Code is the foundational technique that pinpoints the exact bit index and repairs it on the fly without retransmission.",
    "prerequisitesList": [
      {
        "concept": "Parity Bit",
        "meaning": "A check bit enforcing even parity across a selected subset of bits."
      },
      {
        "concept": "Powers of Two",
        "meaning": "Bit positions 1, 2, 4, 8, 16... reserved exclusively for check bits."
      },
      {
        "concept": "Syndrome",
        "meaning": "The binary value produced by parity checks whose decimal value identifies the error position."
      }
    ],
    "learningObjectives": [
      "Explain how redundant parity bits help locate bit errors.",
      "Calculate the required number of parity bits using $2^r \\ge m + r + 1$.",
      "Construct a Hamming (7,4) codeword for any 4-bit dataword.",
      "Decode a received codeword, calculate its syndrome, and correct single-bit errors.",
      "Explain the purpose of extended Hamming codes and SECDED."
    ],
    "infobox": {
      "layer": "Layer 2 / Hardware / ECC Memory",
      "standard": "Bell Labs (R.W. Hamming), IEEE",
      "type": "Linear Block Error-Correcting Code",
      "keyFormula": "2^r \\ge m + r + 1, \\quad s = H \\cdot r^T \\pmod 2",
      "prerequisites": [
        "error-detection",
        "parity"
      ],
      "relatedConcepts": [
        "crc",
        "parity",
        "flow-control"
      ],
      "compareWith": [
        "crc"
      ],
      "primaryUses": [
        "ECC server memory, satellite links, RAID-2, CPU cache"
      ]
    },
    "sections": {
      "overview": "a family of linear error-correcting codes that places parity bits at powers-of-two positions to detect and automatically correct single-bit errors in transmitted codewords.",
      "eli10": "Imagine 7 friends standing in line numbered 1 to 7. Three friends are \"detectives\" standing at spots 1, 2, and 4. Each detective monitors a specific group of friends. If one friend tells a lie, the detectives compare notes, and the combination of who noticed a lie points directly to the exact spot number of the liar!",
      "analogy": "Triangulating a smartphone with GPS satellites: One satellite tells you distance from one point, but three overlapping satellite signals pinpoint your exact coordinate on Earth. Three overlapping parity checks pinpoint the exact corrupted bit index.",
      "howItWorks": "\n        <ol class=\"wiki-ordered-list\">\n          <li><strong>Parity Bit Formula:</strong> For $m$ data bits, calculate minimum $r$ parity bits such that $2^r \\ge m + r + 1$. For $m = 4$, $r = 3$ ($2^3 = 8 \\ge 4 + 3 + 1$).</li>\n          <li><strong>Position Assignment:</strong> Parity bits occupy powers-of-two: Pos 1 ($P_1$), Pos 2 ($P_2$), Pos 4 ($P_4$). Data bits fill remaining spots: Pos 3 ($D_1$), Pos 5 ($D_2$), Pos 6 ($D_3$), Pos 7 ($D_4$).</li>\n          <li><strong>Parity Groups:</strong>\n            <ul class=\"wiki-bullet-list\">\n              <li>$P_1$ checks positions with LSB=1: <strong>1, 3, 5, 7</strong> ($P_1 = D_1 \\oplus D_2 \\oplus D_4$).</li>\n              <li>$P_2$ checks positions with 2nd bit=1: <strong>2, 3, 6, 7</strong> ($P_2 = D_1 \\oplus D_3 \\oplus D_4$).</li>\n              <li>$P_4$ checks positions with 3rd bit=1: <strong>4, 5, 6, 7</strong> ($P_4 = D_2 \\oplus D_3 \\oplus D_4$).</li>\n            </ul>\n          </li>\n          <li><strong>Codeword Assembly:</strong> Transmit 7-bit vector $[P_1, P_2, D_1, P_4, D_2, D_3, D_4]$.</li>\n          <li><strong>Receiver Syndrome Calculation:</strong>\n            Receiver recalculates parity checks:\n            $s_1 = b_1 \\oplus b_3 \\oplus b_5 \\oplus b_7$,\n            $s_2 = b_2 \\oplus b_3 \\oplus b_6 \\oplus b_7$,\n            $s_4 = b_4 \\oplus b_5 \\oplus b_6 \\oplus b_7$.\n          </li>\n          <li><strong>Bit Correction:</strong> Syndrome $S = s_4 s_2 s_1$. If $S = 0$, valid! If $S > 0$, bit at position $S$ is flipped back!</li>\n        </ol>",
      "diagram": "\nPosition:    1     2     3     4     5     6     7\nBit:        P1    P2    D1    P4    D2    D3    D4\nBinary:    001   010   011   100   101   110   111\n\nP1 (xx1):    X           X           X           X    (checks 1, 3, 5, 7)\nP2 (x1x):          X     X                 X     X    (checks 2, 3, 6, 7)\nP4 (1xx):                      X     X     X     X    (checks 4, 5, 6, 7)\n\nSyndrome Binary:  [s4] [s2] [s1]  ==> Decimal value = Corrupted Bit Position!",
      "interactiveLabKey": "hamming",
      "technicalDetails": "\n        <p><strong>Minimum Distance & SECDED:</strong></p>\n        <p>Standard Hamming (7,4) has minimum Hamming distance $d_{\\min} = 3$. It guarantees:</p>\n        <ul class=\"wiki-bullet-list\">\n          <li>Single-Error Correction (SEC): Corrects any 1-bit error.</li>\n          <li>Double-Error Detection (DED): Detects 2-bit errors IF not attempting correction.</li>\n        </ul>\n        <p><strong>Extended Hamming (8,4) (SECDED):</strong></p>\n        <p>Adds an overall 8th parity bit ($P_8$) covering the entire 7-bit codeword. $d_{\\min}$ increases to 4. Decoding rules:</p>\n        <ul class=\"wiki-bullet-list\">\n          <li>Syndrome $= 0$, Overall parity passes: <strong>No error</strong>.</li>\n          <li>Syndrome $\\neq 0$, Overall parity fails: <strong>Single-bit error</strong> &rarr; Correct it!</li>\n          <li>Syndrome $\\neq 0$, Overall parity passes: <strong>Double-bit error</strong> &rarr; Detect and halt, do NOT miscorrect!</li>\n          <li>Syndrome $= 0$, Overall parity fails: Error in overall parity bit itself.</li>\n        </ul>",
      "workedExamples": {
        "level1": "<strong>Problem:</strong> Determine minimum parity bits required for 4 data bits ($m = 4$).<br><br>\n<strong>Working:</strong><br>\nUse formula $2^r \\ge m + r + 1$:<br>\n- Try $r = 2$: $2^2 = 4 \\not\\ge 4 + 2 + 1 = 7$ (Insufficient)<br>\n- Try $r = 3$: $2^3 = 8 \\ge 4 + 3 + 1 = 8$ (Satisfied ✓)<br>\nTherefore, 4 data bits require <strong>3 parity bits</strong>, resulting in a 7-bit codeword.",
        "level2": "<strong>Problem:</strong> Encode dataword <code>1011</code> using Hamming (7,4) with even parity.<br><br>\n<strong>Working:</strong><br>\n1. Assign data bits: $D_1 = 1$ (pos 3), $D_2 = 0$ (pos 5), $D_3 = 1$ (pos 6), $D_4 = 1$ (pos 7).<br>\n2. Calculate $P_1$ (checks 1, 3, 5, 7): $D_1(1) + D_2(0) + D_4(1) = 2$ ones (even) &rarr; $P_1 = 0$.<br>\n3. Calculate $P_2$ (checks 2, 3, 6, 7): $D_1(1) + D_3(1) + D_4(1) = 3$ ones (odd) &rarr; $P_2 = 1$.<br>\n4. Calculate $P_4$ (checks 4, 5, 6, 7): $D_2(0) + D_3(1) + D_4(1) = 2$ ones (even) &rarr; $P_4 = 0$.<br>\n5. Final Codeword: $[P_1, P_2, D_1, P_4, D_2, D_3, D_4] = \\mathbf{0110011}$.",
        "level3": "<strong>Problem:</strong> A receiver receives codeword <code>0110001</code>. Show the exact syndrome calculation and repair the error.<br><br>\n<strong>Analysis:</strong><br>\nReceived bits: $b_1=0, b_2=1, b_3=1, b_4=0, b_5=0, b_6=0, b_7=1$.<br>\n1. Check $P_1$ (1, 3, 5, 7): $0 \\oplus 1 \\oplus 0 \\oplus 1 = 0$ &rarr; $s_1 = 0$<br>\n2. Check $P_2$ (2, 3, 6, 7): $1 \\oplus 1 \\oplus 0 \\oplus 1 = 1$ &rarr; $s_2 = 1$<br>\n3. Check $P_4$ (4, 5, 6, 7): $0 \\oplus 0 \\oplus 0 \\oplus 1 = 1$ &rarr; $s_4 = 1$<br>\n4. Syndrome $S = s_4 s_2 s_1 = 110_2 = 6_{10}$.<br>\n5. Bit position 6 is erroneous! Receiver flips bit 6: $0 \\to 1$.<br>\n6. Corrected Codeword: <code>0110011</code>. Extracted data: <code>1011</code> (Restored!)."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Advantages</th><th>Disadvantages</th></tr></thead>\n          <tbody>\n            <tr><td>Corrects single-bit errors locally with zero retransmission delay; predictable syndrome mapping; highly efficient for small word lengths.</td><td>Cannot reliably correct 2-bit errors in basic form; risk of miscorrection if multi-bit error occurs without SECDED; high parity overhead on large packets.</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "ECC (Error-Correcting Code) DIMMs in enterprise servers.",
        "SRAM and DRAM hardware memory controllers.",
        "Embedded flash memory storage.",
        "Space communication links."
      ],
      "commonMistakes": "\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>Placing parity bits at the end:</strong> Parity bits must occupy positions $1, 2, 4, 8...$ so each bit's position binary representation uniquely maps to syndrome checks!</li>\n          <li><strong>Assuming syndrome decimal value is a data bit index:</strong> The syndrome identifies the <em>codeword position</em> (1 to 7), not the payload data bit index.</li>\n        </ul>",
      "quiz": [
        {
          "question": "Where are parity bits placed in the standard Hamming (7,4) codeword layout?",
          "options": [
            "Positions 1, 2, and 4",
            "Positions 3, 5, and 7",
            "Only at the end (Positions 5, 6, 7)",
            "Positions 1, 3, and 5"
          ],
          "correctIndex": 0,
          "explanation": "Parity bits occupy bit positions that are powers of two (2^0 = 1, 2^1 = 2, 2^2 = 4)."
        },
        {
          "question": "How many data bits and parity bits does a Hamming (7,4) code contain?",
          "options": [
            "7 data, 4 parity",
            "4 data, 3 parity",
            "3 data, 4 parity",
            "4 data, 7 parity"
          ],
          "correctIndex": 1,
          "explanation": "In (n, k) notation, n=7 is total codeword bits and k=4 is data bits. Parity bits r = 7 - 4 = 3."
        },
        {
          "question": "What is the meaning of a syndrome calculation result of s₄s₂s₁ = 101₂?",
          "options": [
            "No error occurred",
            "Bit position 5 in the codeword is corrupted",
            "Bit position 6 in the codeword is corrupted",
            "The entire frame must be aborted"
          ],
          "correctIndex": 1,
          "explanation": "101 in binary equals decimal 5 (4 + 0 + 1 = 5), pointing directly to position 5 as the erroneous bit."
        },
        {
          "question": "What does SECDED stand for?",
          "options": [
            "Single-Error Correction, Double-Error Detection",
            "Standard Ethernet Code Data Encoding",
            "Simple Error Check, Double Error Correction",
            "Synchronous Error Control, Digital Electronic Device"
          ],
          "correctIndex": 0,
          "explanation": "SECDED stands for Single-Error Correction, Double-Error Detection, implemented by adding an overall 8th parity bit to Hamming (7,4)."
        },
        {
          "question": "Why is blindly correcting a non-zero syndrome risky if two bits were corrupted in standard Hamming (7,4)?",
          "options": [
            "The syndrome will always equal zero",
            "The syndrome of 2 errors can mimic a valid single-error syndrome, leading to miscorrecting a 3rd innocent bit",
            "The parity bits are destroyed",
            "It causes an infinite loop"
          ],
          "correctIndex": 1,
          "explanation": "Multiple errors XOR their position syndromes together, which may point to a third valid position. Without an overall SECDED bit, the receiver flips an innocent bit, worsening the error!"
        }
      ],
      "references": [
        {
          "cite": "Hamming, R. W. (1950). Error detecting and error correcting codes. Bell System Technical Journal, 29(2), 147-160.",
          "url": "https://ieeexplore.ieee.org"
        },
        {
          "cite": "Tanenbaum & Wetherall, Computer Networks (6th Ed.) - Section 3.2.2.",
          "url": "https://www.pearson.com"
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Hamming%287%2C4%29.svg",
      "imageCaption": "Figure: Hamming(7,4) Single Error Correction, Double Error Detection (SECDED) Venn Diagram."
    },
    "prevTopicId": "checksum",
    "nextTopicId": "crc",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Hamming%287%2C4%29.svg",
    "imageCaption": "Figure: Hamming(7,4) Single Error Correction, Double Error Detection (SECDED) Venn Diagram."
  },
  "crc": {
    "id": "crc",
    "title": "Cyclic Redundancy Check (CRC)",
    "unit": "Unit II: Data Link Layer & MAC Sublayer",
    "unitId": "unit2",
    "level": "Beginner → Advanced",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "30–40 min",
    "standard": "IEEE 802.3 (CRC-32) / ITU-T CRC-16 / ISO-HDLC",
    "oneLiner": "Polynomial-based binary modulo-2 division generating high-strength error detection check sequences.",
    "quickAnswer": "CRC treats data as a polynomial over GF(2), appends r zeros, divides by a generator polynomial using XOR, and appends the r-bit remainder to form a codeword that is perfectly divisible by the generator.",
    "whyItMatters": "CRC is the undisputed industry standard for link-layer error detection (Ethernet FCS, Wi-Fi, SATA). It detects 100% of single-bit errors, 100% of burst errors up to generator degree r, and over 99.999% of longer bursts.",
    "prerequisitesList": [
      {
        "concept": "Modulo-2 Arithmetic",
        "meaning": "Binary arithmetic where addition and subtraction are both XOR, with no carries or borrows."
      },
      {
        "concept": "Polynomial Representation",
        "meaning": "Treating bit strings as polynomial coefficients (e.g. 1011 = x³ + x + 1)."
      },
      {
        "concept": "Frame Check Sequence (FCS)",
        "meaning": "The 4-byte trailer field in Ethernet frames carrying the CRC-32 remainder."
      }
    ],
    "learningObjectives": [
      "Understand modulo-2 arithmetic and binary XOR division.",
      "Convert binary generators into algebraic polynomials and determine degree $r$.",
      "Calculate CRC remainder bits by hand and verify received codewords.",
      "Explain the exact burst-error detection guarantees of degree-$r$ polynomials.",
      "Distinguish CRC error detection from error correction and cryptographic security."
    ],
    "infobox": {
      "layer": "Layer 2 (Ethernet FCS, Wi-Fi)",
      "standard": "IEEE 802.3, ITU-T V.41, ISO 3309",
      "type": "Cyclic Redundancy Checksum",
      "keyFormula": "T(x) = D(x) \\cdot x^r + R(x), \\quad R(x) = [D(x) \\cdot x^r] \\bmod G(x)",
      "prerequisites": [
        "error-detection",
        "parity"
      ],
      "relatedConcepts": [
        "framing",
        "ethernet",
        "hamming-code"
      ],
      "compareWith": [
        "checksum"
      ],
      "primaryUses": [
        "Ethernet Frame Check Sequence (FCS), Wi-Fi, SATA/NVMe, ZIP/GZIP, PNG"
      ]
    },
    "sections": {
      "overview": "an error-detection technique in which a sender performs polynomial division over the Galois Field $\\text{GF}(2)$ on data bits using an agreed generator polynomial, appending the resulting remainder to the data before transmission.",
      "eli10": "Imagine you have a number like 23 and a secret rule number 5. You divide 23 by 5, which leaves a remainder of 3. You send the number and the remainder. When your friend gets the number, they divide by 5 too. If their remainder isn't 3, someone changed the number on the way! CRC does this with binary computer bits!",
      "analogy": "Numbered tamper seals on cargo containers: The seal number is cryptographically linked to the manifest contents. If any item is removed or substituted, the manifest math breaks. (Note: CRC protects against random channel noise, not malicious forgery).",
      "howItWorks": "\n        <ol class=\"wiki-ordered-list\">\n          <li><strong>Generator Agreement:</strong> Sender and receiver agree on a generator polynomial $G(x)$ of degree $r$ (having $r + 1$ bits, starting with 1).</li>\n          <li><strong>Zero Padding:</strong> Sender appends $r$ zero bits to the original dataword.</li>\n          <li><strong>Modulo-2 XOR Division:</strong> Divide padded stream by $G(x)$ using XOR operations. (Whenever leading bit is 1, XOR with generator; if 0, shift to next bit).</li>\n          <li><strong>Codeword Formation:</strong> The $r$-bit remainder is appended to the original dataword (replacing the $r$ zeros).</li>\n          <li><strong>Receiver Verification:</strong> Receiver divides complete received codeword by $G(x)$. If remainder is all zeros, no error detected! If remainder is non-zero, frame was corrupted!</li>\n        </ol>",
      "diagram": "",
      "interactiveLabKey": "crc",
      "technicalDetails": "\n        <p><strong>Burst Error Detection Capabilities:</strong></p>\n        <p>A properly constructed CRC polynomial of degree $r$ guarantees detection of:</p>\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>100% of single-bit errors</strong> (provided $G(x)$ has more than one term).</li>\n          <li><strong>100% of double-bit errors</strong> (provided $G(x)$ does not divide $x^k + 1$ for $k$ up to frame length).</li>\n          <li><strong>100% of odd numbers of errors</strong> (provided $G(x)$ has $(x + 1)$ as a factor).</li>\n          <li><strong>100% of burst errors of length $\\le r$</strong>.</li>\n          <li>A fraction $1 - 2^{-(r-1)}$ of bursts of length $r + 1$.</li>\n          <li>A fraction $1 - 2^{-r}$ of longer bursts ($> 99.99999997\\%$ detection for 32-bit CRC-32).</li>\n        </ul>\n        <p><strong>Standard CRC Polynomials:</strong></p>\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>CRC-8-ATM:</strong> $x^8 + x^2 + x + 1$ (ATM headers).</li>\n          <li><strong>CRC-16-IBM:</strong> $x^{16} + x^{15} + x^2 + 1$ (Modbus, USB).</li>\n          <li><strong>CRC-CCITT:</strong> $x^{16} + x^{12} + x^5 + 1$ (X.25, HDLC, Bluetooth).</li>\n          <li><strong>CRC-32 (IEEE 802.3):</strong> $x^{32} + x^{26} + x^{23} + x^{22} + x^{16} + x^{12} + x^{11} + x^{10} + x^8 + x^7 + x^5 + x^4 + x^2 + x + 1$ (Ethernet, Wi-Fi, PNG, ZIP).</li>\n        </ul>",
      "workedExamples": {
        "level1": "<strong>Problem:</strong> Express generator polynomial $G(x) = x^3 + x + 1$ as a binary bit pattern, and state its degree and CRC width.<br><br>\n<strong>Solution:</strong><br>\n- $x^3$ is present &rarr; bit 3 = 1<br>\n- $x^2$ is absent &rarr; bit 2 = 0<br>\n- $x^1$ is present &rarr; bit 1 = 1<br>\n- $x^0$ (constant 1) is present &rarr; bit 0 = 1<br>\nBinary pattern: <code>1011</code>. Degree $r = 3$. CRC remainder width = 3 bits.",
        "level2": "<strong>Problem:</strong> Given Dataword = <code>1101</code> and Generator = <code>1011</code>, calculate the transmitted codeword step-by-step.<br><br>\n<strong>Working:</strong><br>\n1. Degree $r = 3$ &rarr; append 3 zeros to data: <code>1101000</code>.<br>\n2. Modulo-2 division:<br>\n   <code>1101000</code><br>\n   <code>1011</code> (XOR)<br>\n   <code>-----</code><br>\n   <code>01100</code> &rarr; shift & align: <code>1100</code> XOR <code>1011</code> = <code>0111</code><br>\n   Bring down 0 &rarr; <code>1110</code> XOR <code>1011</code> = <code>0101</code><br>\n   Bring down 0 &rarr; <code>1010</code> XOR <code>1011</code> = <code>0001</code><br>\n3. Final 3-bit remainder: <code>001</code>.<br>\n4. Codeword = Data + Remainder = <strong>1101001</strong>.",
        "level3": "<strong>Problem:</strong> A receiver receives <code>1101001</code>. Show verification. Then simulate an error where bit 4 flips to 0 (received as <code>1100001</code>) and prove error detection.<br><br>\n<strong>Analysis:</strong><br>\n1. Clean Codeword <code>1101001</code> divided by <code>1011</code>:<br>\n   Division yields Remainder = <code>000</code> &rarr; Verified correct!<br>\n2. Corrupted Codeword <code>1100001</code> divided by <code>1011</code>:<br>\n   <code>1100001</code> XOR <code>1011</code> = <code>0111001</code><br>\n   <code>1110</code> XOR <code>1011</code> = <code>010101</code><br>\n   <code>1010</code> XOR <code>1011</code> = <code>00011</code> &rarr; Remainder = <strong>011</strong> (Non-zero!).<br>\n3. Remainder $\\neq 0$ &rarr; Receiver rejects the frame! Error successfully detected."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Advantages</th><th>Disadvantages</th></tr></thead>\n          <tbody>\n            <tr><td>Exceptional burst error detection; compact overhead (4 bytes for 1500-byte frame); implemented in ultra-fast shift-register hardware.</td><td>Does not locate or correct bit errors; deliberate data manipulation can forge valid CRC (not cryptographic).</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet Frame Check Sequence (FCS - 32-bit CRC).",
        "IEEE 802.11 Wi-Fi frames.",
        "SATA hard drive and NVMe storage interfaces.",
        "ZIP, GZIP, and PNG file container checksums."
      ],
      "commonMistakes": "\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>Using ordinary subtraction with borrows:</strong> Modulo-2 arithmetic NEVER uses borrows. $0 - 1 = 1$, and $1 - 1 = 0$ (identical to XOR).</li>\n          <li><strong>Confusing CRC with encryption:</strong> An attacker can tamper with a packet and simply recalculate the CRC. Use HMAC or digital signatures for security.</li>\n          <li><strong>Appending $r+1$ zeros instead of $r$:</strong> For an $(r+1)$-bit generator, append exactly $r$ zeros (equal to degree of polynomial).</li>\n        </ul>",
      "quiz": [
        {
          "question": "If a generator polynomial has degree 4, how many zeros are appended to the dataword before division?",
          "options": [
            "2",
            "3",
            "4",
            "5"
          ],
          "correctIndex": 2,
          "explanation": "The sender appends r zeros where r is the degree of the generator polynomial (a degree-4 polynomial has 5 bits and requires 4 zeros)."
        },
        {
          "question": "Which operation is used in modulo-2 polynomial division instead of decimal subtraction?",
          "options": [
            "Bitwise AND",
            "Exclusive OR (XOR)",
            "Bitwise OR",
            "Two's complement inversion"
          ],
          "correctIndex": 1,
          "explanation": "In GF(2) polynomial arithmetic, both addition and subtraction are performed using the XOR operation without carries or borrows."
        },
        {
          "question": "What does a non-zero remainder indicate during receiver CRC verification?",
          "options": [
            "The frame is guaranteed error-free",
            "A transmission error was detected in the frame",
            "The frame must be forwarded immediately",
            "The encryption key was verified"
          ],
          "correctIndex": 1,
          "explanation": "A non-zero remainder proves that the received sequence is not a valid codeword of the generator, indicating one or more bits were corrupted."
        },
        {
          "question": "Does CRC-32 in Ethernet automatically correct corrupted bits?",
          "options": [
            "Yes, always",
            "Yes, if the frame is under 64 bytes",
            "No, Ethernet discards corrupted frames without repairing them",
            "Only if full-duplex is enabled"
          ],
          "correctIndex": 2,
          "explanation": "CRC is strictly an error-detection code. When an FCS error occurs, Ethernet drops the frame; recovery must be performed by higher-layer protocols like TCP."
        },
        {
          "question": "Does a zero remainder absolutely guarantee that no error occurred?",
          "options": [
            "Yes, with 100% mathematical certainty",
            "No, certain rare error patterns can form another valid codeword and go undetected",
            "Only on fiber optics",
            "Yes, for any polynomial"
          ],
          "correctIndex": 1,
          "explanation": "If channel noise alters the transmitted codeword into an exact multiple of the generator polynomial, the remainder will be zero, resulting in an undetected error."
        }
      ],
      "references": [
        {
          "cite": "Williams, R. N. (1993). A Painless Guide to CRC Error Detection Algorithms.",
          "url": "https://www.ross.net/crc/painless9701.txt"
        },
        {
          "cite": "IEEE 802.3-2022 - Section 3.2.9: Frame Check Sequence (FCS) field.",
          "url": "https://standards.ieee.org"
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/02/CRC8-gen.gif",
      "imageCaption": "Figure: Cyclic Redundancy Check (CRC) Polynomial Division Hardware Architecture with Linear Feedback Shift Registers."
    },
    "prevTopicId": "hamming-code",
    "nextTopicId": "flow-control",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/02/CRC8-gen.gif",
    "imageCaption": "Figure: Cyclic Redundancy Check (CRC) Polynomial Division Hardware Architecture with Linear Feedback Shift Registers."
  },
  "flow-control": {
    "id": "flow-control",
    "title": "Flow Control & Channel Utilization",
    "unit": "Unit II: Data Link Layer & MAC Sublayer",
    "unitId": "unit2",
    "level": "Beginner → Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "20 min",
    "standard": "IEEE 802.3x / RFC 793",
    "oneLiner": "Regulating transmission pacing to prevent a fast sender from drowning a slow receiver's buffers.",
    "quickAnswer": "Flow control matches transmission rate to receiver processing capacity using feedback mechanisms (Stop-and-Wait or Sliding Windows), preventing buffer overflow.",
    "whyItMatters": "If a gigabit server sends packets at full wire speed to an embedded IoT sensor, the receiver's memory buffers fill within milliseconds, causing massive packet drops unless flow control throttles the sender.",
    "prerequisitesList": [
      {
        "concept": "Buffer",
        "meaning": "Memory queue storing incoming frames before processing."
      },
      {
        "concept": "Round-Trip Time (RTT)",
        "meaning": "Time taken for a frame to travel to receiver and its ACK to return."
      }
    ],
    "learningObjectives": [
      "Distinguish Flow Control (protecting receiver) from Congestion Control (protecting network).",
      "Calculate channel propagation-to-transmission ratio $a = T_p / T_f$.",
      "Explain how receiver buffer constraints limit protocol efficiency."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link) & Layer 4 (Transport)",
      "standard": "IEEE 802.3x PAUSE frames, TCP Window",
      "type": "Traffic Pacing & Buffer Protection",
      "keyFormula": "a = \\frac{T_p}{T_f}, \\quad U = \\frac{1}{1 + 2a}",
      "prerequisites": [
        "framing"
      ],
      "relatedConcepts": [
        "stop-and-wait",
        "sliding-window",
        "go-back-n"
      ],
      "compareWith": [
        "congestion-control"
      ],
      "primaryUses": [
        "Ethernet PAUSE frames (802.3x), TCP Sliding Window, serial XON/XOFF"
      ]
    },
    "imageUrl": "assets/images/topic1/flow-control-models.svg",
    "imageCaption": "Figure 1.13: Data Link Flow Control: Stop-and-Wait vs Sliding Window pipelined protocol.",
    "sections": {
      "overview": "the set of mechanisms that regulates the amount or rate of unacknowledged data a sender may transmit, matching transmission speed to the receiving station's memory and processing capacity.",
      "eli10": "Imagine pouring water from a big bucket into a tiny drinking glass. If you pour as fast as you can, water spills all over the table. You must slow down and pour only as fast as the glass can take it. Flow control is the valve on the bucket!",
      "analogy": "A speaker giving a lecture: If the speaker talks at 300 words per minute while students can only take notes at 60 words per minute, the students drop behind and miss crucial sentences unless they raise their hand to say \"Please pause!\"",
      "howItWorks": "\n        <ol class=\"wiki-ordered-list\">\n          <li><strong>Buffer Ingestion:</strong> Receiver stores arriving frames in a FIFO hardware/software queue.</li>\n          <li><strong>Processing Consumption:</strong> Host CPU pulls frames from the buffer to pass to Layer 3.</li>\n          <li><strong>Capacity Discrepancy:</strong> If arrival rate ($R_{in}$) > consumption rate ($R_{proc}$), buffer backlog grows by $(R_{in} - R_{proc})$ frames/sec.</li>\n          <li><strong>Flow Feedback:</strong> Protocol intervenes:\n            <ul class=\"wiki-bullet-list\">\n              <li><em>Stop-and-Wait:</em> Sender transmits 1 frame, must halt until ACK confirms receiver emptied its slot.</li>\n              <li><em>Sliding Window:</em> Receiver advertises available buffer window size $W$; sender transmits up to $W$ frames.</li>\n              <li><em>PAUSE Frame (Ethernet 802.3x):</em> Receiver sends Layer 2 PAUSE frame telling switch/sender to halt transmission for $N$ slot times.</li>\n            </ul>\n          </li>\n        </ol>",
      "diagram": "",
      "interactiveLabKey": "sliding-window",
      "technicalDetails": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Feature</th><th>Flow Control</th><th>Congestion Control</th></tr></thead>\n          <tbody>\n            <tr><td>Target Protected</td><td><strong>The Receiver</strong> (end-station memory buffer)</td><td><strong>The Subnet / Routers</strong> (network link capacity)</td></tr>\n            <tr><td>Cause of Issue</td><td>Fast sender paired with slow/busy receiver</td><td>Too many competing hosts injecting traffic into intermediate links</td></tr>\n            <tr><td>Feedback Mechanism</td><td>Explicit receiver ACKs, Window limits, PAUSE frames</td><td>Packet loss, delay increases, ECN flags (Explicit Congestion Notification)</td></tr>\n          </tbody>\n        </table>",
      "workedExamples": {
        "level1": "<strong>Problem:</strong> A sender generates 100 frames/sec while receiver processes 60 frames/sec. How fast does receiver backlog accumulate?<br><br>\n<strong>Solution:</strong><br>\n$\\text{Backlog Growth} = 100 - 60 = \\mathbf{40\\text{ frames/second}}$.<br>\nAfter 5 seconds without flow control, excess buffer backlog = $40 \\times 5 = 200\\text{ frames}$, leading to packet drops.",
        "level2": "<strong>Problem:</strong> A link has transmission time $T_f = 1$ ms and propagation delay $T_p = 9$ ms. Calculate the ratio $a$ and Stop-and-Wait utilization.<br><br>\n<strong>Working:</strong><br>\n$a = \\frac{T_p}{T_f} = \\frac{9}{1} = 9$.<br>\n$U = \\frac{1}{1 + 2a} = \\frac{1}{1 + 2(9)} = \\frac{1}{19} \\approx \\mathbf{5.26\\%}$.",
        "level3": "<strong>Problem:</strong> Explain how sliding windows overcome the low utilization of Stop-and-Wait when $a = 9$.<br><br>\n<strong>Analysis:</strong><br>\nTo reach 100% utilization, sender must keep frames in flight during entire RTT: $W \\ge 1 + 2a = 1 + 18 = 19\\text{ frames}$.<br>\nIf sender window $W = 19$, utilization $U = \\min(1, 19/19) = 100\\%$."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Advantages</th><th>Disadvantages</th></tr></thead>\n          <tbody>\n            <tr><td>Prevents buffer exhaustion and frame drops; ensures orderly data intake.</td><td>Can throttle sender below link speed if receiver is slow; requires feedback signaling overhead.</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet Flow Control (IEEE 802.3x PAUSE frames).",
        "TCP Receiver Advertised Window (rwnd).",
        "HDLC Receiver Ready (RR) and Receiver Not Ready (RNR) supervisory frames."
      ],
      "commonMistakes": "\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>Confusing flow control with congestion control:</strong> Flow control is end-to-end between sender and receiver. Congestion control is network-wide to protect intermediate switches/routers.</li>\n        </ul>",
      "quiz": [
        {
          "question": "What is the primary purpose of flow control?",
          "options": [
            "To choose the shortest route between routers",
            "To prevent a fast sender from overwhelming a receiver's buffers",
            "To encrypt user data",
            "To increase physical wire voltage"
          ],
          "correctIndex": 1,
          "explanation": "Flow control paces transmission to match the processing and storage capacity of the receiving device."
        },
        {
          "question": "What is the key difference between flow control and congestion control?",
          "options": [
            "They are identical",
            "Flow control protects the receiver; congestion control protects intermediate network resources",
            "Flow control is Layer 3; congestion control is Layer 1",
            "Flow control detects bit errors"
          ],
          "correctIndex": 1,
          "explanation": "Flow control prevents receiver buffer overrun; congestion control prevents network infrastructure collapse."
        }
      ],
      "references": [
        {
          "cite": "Tanenbaum & Wetherall, Computer Networks (6th Ed.) - Section 3.1.2.",
          "url": "https://www.pearson.com"
        }
      ],
      "imageUrl": "assets/images/topic1/flow-control-models.svg",
      "imageCaption": "Figure: Flow Control Mechanism: Preventing Fast Sender from Overwhelming Slow Receiver."
    },
    "prevTopicId": "crc",
    "nextTopicId": "simplex-protocol",
    "imageUrl": "assets/images/topic1/flow-control-models.svg",
    "imageCaption": "Figure: Flow Control Mechanism: Preventing Fast Sender from Overwhelming Slow Receiver."
  },
  "stop-and-wait": {
    "id": "stop-and-wait",
    "title": "Stop-and-Wait ARQ",
    "unit": "Unit II: Data Link Layer & MAC Sublayer",
    "unitId": "unit2",
    "level": "Beginner → Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "25 min",
    "standard": "Tanenbaum Protocol 3 / Forouzan / HDLC",
    "oneLiner": "Transmitting one frame at a time, requiring an acknowledgment and timer before proceeding.",
    "quickAnswer": "Stop-and-Wait ARQ sends 1 frame, starts a timer, and waits for an ACK. If the ACK arrives, it sends the next frame; if the timer expires, it retransmits.",
    "whyItMatters": "It is the simplest reliable transmission protocol. It introduces sequence numbers (0 and 1) to distinguish new frames from duplicates caused by lost acknowledgments.",
    "prerequisitesList": [
      {
        "concept": "ACK (Acknowledgment)",
        "meaning": "A control message confirming successful reception of a frame."
      },
      {
        "concept": "Retransmission Timer",
        "meaning": "A countdown timer triggering frame resending if no ACK arrives."
      },
      {
        "concept": "1-Bit Sequence Number",
        "meaning": "Alternating sequence numbers 0 and 1."
      }
    ],
    "learningObjectives": [
      "Explain the basic operation of Stop-and-Wait ARQ.",
      "Understand why sequence numbers are mandatory (lost ACK scenario).",
      "Calculate round-trip cycle time and channel efficiency $U = \\frac{1}{1+2a}$."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "HDLC NRM, Kermit, TFTP (RFC 1350)",
      "type": "Reliable ARQ Protocol",
      "keyFormula": "U = \\frac{1}{1 + 2a}, \\quad a = \\frac{T_p}{T_f}",
      "prerequisites": [
        "flow-control"
      ],
      "relatedConcepts": [
        "sliding-window",
        "go-back-n",
        "selective-repeat"
      ],
      "compareWith": [
        "sliding-window"
      ],
      "primaryUses": [
        "TFTP, simple embedded RF links, legacy serial modems"
      ]
    },
    "imageUrl": "assets/images/topic2/stop-and-wait-arq-fsm.svg",
    "imageCaption": "Figure 2.9: Stop-and-Wait ARQ state transitions: normal flow, lost frame timeout, and lost ACK duplicate filtering.",
    "sections": {
      "overview": "a fundamental Automatic Repeat reQuest (ARQ) protocol in which the sender transmits a single frame and waits for an acknowledgment from the receiver before dispatching the subsequent frame.",
      "eli10": "Imagine playing catch with someone, but you are only allowed to throw the second ball after they shout: \"I caught ball #1!\" If you wait too long and don't hear them shout, you assume the ball landed in the bushes and throw a backup ball.",
      "analogy": "Ordering food through a drive-thru window: The worker gives you your burger, waits for you to hand them payment, and only then starts handing you the drinks. One item at a time.",
      "howItWorks": "\n        <ol class=\"wiki-ordered-list\">\n          <li><strong>Send Frame 0:</strong> Sender transmits Frame with Sequence No <code>0</code> and starts a countdown timer.</li>\n          <li><strong>Receiver Check:</strong> Receiver validates CRC. If clean and expected (Seq 0), accepts data and returns <code>ACK 1</code> (convention: \"I expect Frame 1 next\").</li>\n          <li><strong>Advance Sequence:</strong> Sender receives <code>ACK 1</code>, cancels timer, and dispatches Frame <code>1</code>.</li>\n          <li><strong>Lost Frame Recovery:</strong> If Frame 0 is lost in transit, sender timer expires &rarr; sender retransmits Frame 0.</li>\n          <li><strong>Lost ACK Recovery:</strong> If Frame 0 arrives but <code>ACK 1</code> is lost, sender times out & retransmits Frame 0. Receiver detects duplicate (already got Seq 0), discards payload, and re-sends <code>ACK 1</code>!</li>\n        </ol>",
      "diagram": "",
      "interactiveLabKey": "sliding-window",
      "technicalDetails": "\n        <p><strong>Channel Utilization Derivation:</strong></p>\n        <p>Total time spent per successful frame transmission cycle:</p>\n        $$T_{\\text{cycle}} = T_f + 2T_p + T_a + T_{\\text{proc}}$$\n        <p>Assuming $T_a$ (ACK transmission time) and $T_{\\text{proc}}$ are negligible:</p>\n        $$U = \\frac{T_f}{T_f + 2T_p} = \\frac{1}{1 + 2(T_p / T_f)} = \\frac{1}{1 + 2a}$$\n        <p>When propagation delay is significant (e.g. satellite or high-speed fiber), $a \\gg 1$, driving utilization down to near zero.</p>",
      "workedExamples": {
        "level1": "<strong>Problem:</strong> Why is a 1-bit sequence number (0 and 1) necessary in Stop-and-Wait ARQ?<br><br>\n<strong>Solution:</strong><br>\nWithout sequence numbers, if an ACK is lost, the sender retransmits. The receiver has no way of knowing whether the arriving frame is a new message with identical content or a duplicate of the previous frame. With sequence numbers, it recognizes duplicate Seq 0 and discards it.",
        "level2": "<strong>Problem:</strong> Frame size = 1000 bits, Channel bandwidth = 1 Mbps. One-way propagation delay $T_p = 25$ ms. Find channel utilization $U$.<br><br>\n<strong>Working:</strong><br>\n1. $T_f = \\frac{1000\\text{ bits}}{10^6\\text{ bps}} = 1\\text{ ms}$.<br>\n2. $a = \\frac{T_p}{T_f} = \\frac{25\\text{ ms}}{1\\text{ ms}} = 25$.<br>\n3. $U = \\frac{1}{1 + 2(25)} = \\frac{1}{51} \\approx \\mathbf{1.96\\%}$!",
        "level3": "<strong>Problem:</strong> In the scenario above, what minimum window size $W$ is needed under pipelined sliding windows to reach 100% utilization?<br><br>\n<strong>Analysis:</strong><br>\n$W \\ge 1 + 2a = 1 + 2(25) = \\mathbf{51\\text{ frames}}$. Stop-and-Wait is fundamentally throttled by a window of 1."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Advantages</th><th>Disadvantages</th></tr></thead>\n          <tbody>\n            <tr><td>Simplest logic; requires only 1 buffer slot at receiver; 1-bit sequence number space.</td><td>Terrible channel utilization on long-delay links; link sits idle for entire RTT after every frame.</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "TFTP (Trivial File Transfer Protocol - RFC 1350).",
        "Legacy Xmodem file transfer protocol.",
        "Low-power wireless sensors."
      ],
      "commonMistakes": "\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>Assuming sequence numbers can be omitted if frames are never lost:</strong> Even if data frames are never lost, an ACK can be lost, causing duplicate delivery unless sequence numbers are present.</li>\n        </ul>",
      "quiz": [
        {
          "question": "How many bits are required for the sequence number in Stop-and-Wait ARQ under standard assumptions?",
          "options": [
            "1 bit (alternating 0 and 1)",
            "4 bits",
            "16 bits",
            "32 bits"
          ],
          "correctIndex": 0,
          "explanation": "Because there is only at most one outstanding data frame in flight, a single alternating bit (0 and 1) is sufficient to distinguish a new frame from a duplicate."
        },
        {
          "question": "If an ACK is lost in Stop-and-Wait ARQ, what happens?",
          "options": [
            "The link shuts down permanently",
            "The sender timer expires, sender retransmits frame, and receiver discards duplicate payload",
            "The receiver crashes",
            "The network layer inverts the frame"
          ],
          "correctIndex": 1,
          "explanation": "The sender times out and retransmits; the receiver uses the sequence number to identify the duplicate, discards the payload, and re-sends the ACK."
        }
      ],
      "references": [
        {
          "cite": "Tanenbaum & Wetherall, Computer Networks (6th Ed.) - Section 3.3.3.",
          "url": "https://www.pearson.com"
        }
      ],
      "imageUrl": "assets/images/topic1/flow-control-models.svg",
      "imageCaption": "Figure: Stop-and-Wait ARQ on Noisy Channels: Timer, Retransmission, and Alternating 0/1 ACKs."
    },
    "prevTopicId": "simplex-protocol",
    "nextTopicId": "sliding-window",
    "imageUrl": "assets/images/topic1/flow-control-models.svg",
    "imageCaption": "Figure: Stop-and-Wait ARQ on Noisy Channels: Timer, Retransmission, and Alternating 0/1 ACKs."
  },
  "sliding-window": {
    "id": "sliding-window",
    "title": "Sliding Window Protocols",
    "unit": "Unit II: Data Link Layer & MAC Sublayer",
    "unitId": "unit2",
    "level": "Beginner → Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "25–35 min",
    "standard": "IEEE / ISO 13239 / RFC 793",
    "oneLiner": "Pipelining multiple unacknowledged frames in flight to maximize channel throughput.",
    "quickAnswer": "Sliding window protocols allow a sender to transmit up to W frames before receiving an acknowledgment, sliding the allowed sequence window forward as ACKs arrive.",
    "whyItMatters": "Stop-and-Wait leaves gigabit channels idle 95%+ of the time. Sliding windows allow data transmission and acknowledgment processing to overlap continuously, maximizing bandwidth-delay product utilization.",
    "prerequisitesList": [
      {
        "concept": "Pipelining",
        "meaning": "Transmitting multiple frames without waiting for individual acknowledgments."
      },
      {
        "concept": "Sequence Number Space",
        "meaning": "A finite set of integers 0 to 2^k - 1 identifying frames."
      }
    ],
    "learningObjectives": [
      "Explain the sliding window concept and window movement dynamics.",
      "Calculate pipelined utilization $U = \\min(1, \\frac{W}{1+2a})$.",
      "Identify optimal window size to achieve 100% channel utilization."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link) & Layer 4 (Transport TCP)",
      "standard": "HDLC, IEEE 802.2, RFC 793",
      "type": "Pipelined ARQ Protocol",
      "keyFormula": "U = \\min\\left(1, \\frac{W}{1 + 2a}\\right), \\quad W_{\\text{opt}} = 1 + 2a",
      "prerequisites": [
        "stop-and-wait"
      ],
      "relatedConcepts": [
        "go-back-n",
        "selective-repeat",
        "flow-control"
      ],
      "compareWith": [
        "stop-and-wait"
      ],
      "primaryUses": [
        "Modern Ethernet links, TCP protocol, HDLC, satellite networks"
      ]
    },
    "sections": {
      "overview": "a family of full-duplex, bidirectional communication protocols in which the transmitter maintains a bounded range of consecutive sequence numbers that it is authorized to send before receiving an acknowledgment.",
      "eli10": "Instead of throwing one snowball and waiting for your friend to say \"Ready\" before throwing another, you are allowed to have 4 snowballs flying through the air at the same time! As soon as the first snowball hits, you pick up a fresh snowball and throw it!",
      "analogy": "An assembly line conveyor belt: Products move continuously down the line one after another. You don't wait for the first car to drive off the lot before putting the second chassis onto the belt.",
      "howItWorks": "\n        <ol class=\"wiki-ordered-list\">\n          <li><strong>Sending Window Initialization:</strong> Sender has a window $[0, W-1]$ of permitted frame sequence numbers.</li>\n          <li><strong>Continuous Transmission:</strong> Sender transmits frames 0, 1, 2... up to $W-1$ without pausing.</li>\n          <li><strong>Window Sliding:</strong> When ACK for frame 0 arrives, the trailing edge of the sending window moves forward: window becomes $[1, W]$. Frame $W$ is now eligible for transmission!</li>\n          <li><strong>Receiver Window:</strong> Receiver maintains an acceptable sequence range. Frames falling inside are accepted; frames outside are discarded.</li>\n          <li><strong>Pipelining Payoff:</strong> Frames travel through the wire while previous ACKs return, eliminating idle channel dead time.</li>\n        </ol>",
      "diagram": "",
      "interactiveLabKey": "sliding-window",
      "technicalDetails": "\n        <p><strong>Throughput and Utilization Formula:</strong></p>\n        $$U = \\min\\left(1, \\frac{W}{1 + 2a}\\right), \\quad \\text{where } a = \\frac{T_p}{T_f}$$\n        <p>If $W \\ge 1 + 2a$, utilization reaches theoretical maximum $100\\%$.</p>\n        <p><strong>Two Classic Sliding Window Implementations:</strong></p>\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>Go-Back-N (GBN):</strong> Receiver window $W_r = 1$. Discards out-of-order frames. On loss, retransmits all $N$ unacknowledged frames.</li>\n          <li><strong>Selective Repeat (SR):</strong> Receiver window $W_r > 1$. Buffers out-of-order frames. Retransmits ONLY the damaged frame.</li>\n        </ul>",
      "workedExamples": {
        "level1": "<strong>Problem:</strong> Window size $W = 4$. Frames 0, 1, 2, 3 are transmitted. What happens when ACK 0 and ACK 1 are received?<br><br>\n<strong>Solution:</strong><br>\nThe sender window advances by 2 positions. The new valid transmission window is $[2, 3, 4, 5]$. Sender immediately transmits frames 4 and 5.",
        "level2": "<strong>Problem:</strong> A 1 Gbps satellite link has $T_p = 250$ ms and frame size = 10,000 bits. Compare Stop-and-Wait utilization against Sliding Window with $W = 10,000$.<br><br>\n<strong>Working:</strong><br>\n1. $T_f = \\frac{10^4}{10^9} = 0.01\\text{ ms} = 10\\text{ µs}$.<br>\n2. $a = \\frac{250\\text{ ms}}{0.01\\text{ ms}} = 25,000$.<br>\n3. Stop-and-Wait ($W=1$): $U = \\frac{1}{1 + 2(25000)} = \\frac{1}{50001} \\approx 0.002\\%$.<br>\n4. Sliding Window ($W=10,000$): $U = \\frac{10000}{50001} \\approx \\mathbf{20\\%}$ (10,000x throughput boost!).",
        "level3": "<strong>Problem:</strong> Why can we not increase window size $W$ to infinity?<br><br>\n<strong>Analysis:</strong><br>\n1. Finite sequence number field: If sequence numbers wrap around, old duplicates cannot be distinguished from new frames.<br>\n2. Receiver memory buffer limits: Fast sender will exhaust receiver RAM.<br>\n3. Network congestion: Massive bursts will overflow intermediate router queues."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Advantages</th><th>Disadvantages</th></tr></thead>\n          <tbody>\n            <tr><td>Enormous throughput improvement; continuous link utilization; overlaps processing and propagation.</td><td>Requires sequence numbers; more complex sender/receiver state machines; buffer management required.</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "TCP (Transmission Control Protocol - Sliding Window flow control).",
        "HDLC / SDLC LAPB.",
        "IEEE 802.11 Block ACK mechanism."
      ],
      "commonMistakes": "\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>Assuming sliding window is only a Layer 2 protocol:</strong> The concept is universal; it operates identically at Layer 2 (frames) and Layer 4 (TCP bytes).</li>\n        </ul>",
      "quiz": [
        {
          "question": "What is the primary advantage of a sliding window protocol over Stop-and-Wait?",
          "options": [
            "It eliminates the need for sequence numbers",
            "It allows multiple frames to be in flight, dramatically improving throughput on high-delay links",
            "It encrypts frames automatically",
            "It prevents all transmission errors"
          ],
          "correctIndex": 1,
          "explanation": "Sliding window protocols pipeline transmissions, keeping the communication pipe full while waiting for acknowledgments."
        },
        {
          "question": "What condition must window size W satisfy to achieve 100% theoretical utilization on an error-free channel?",
          "options": [
            "W >= 1 + 2a",
            "W = 1",
            "W <= a",
            "W = 0"
          ],
          "correctIndex": 0,
          "explanation": "When W >= 1 + 2a (where a = Tp / Tf), the sender can continuously transmit frames for the full duration of a round-trip time without running out of window space."
        }
      ],
      "references": [
        {
          "cite": "Kurose, J. F., & Ross, K. W. Computer Networking: A Top-Down Approach (8th Ed.) - Chapter 3.4.",
          "url": "https://www.pearson.com"
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/54/Selective_repeat_transmit_window_example.png",
      "imageCaption": "Figure: General Sliding Window Protocol Architecture: Send Window, Receive Window, and Buffer Slots."
    },
    "prevTopicId": "stop-and-wait",
    "nextTopicId": "go-back-n",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/54/Selective_repeat_transmit_window_example.png",
    "imageCaption": "Figure: General Sliding Window Protocol Architecture: Send Window, Receive Window, and Buffer Slots."
  },
  "go-back-n": {
    "id": "go-back-n",
    "title": "Go-Back-N ARQ",
    "unit": "Unit II: Data Link Layer & MAC Sublayer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "25 min",
    "standard": "Tanenbaum Protocol 5 / Forouzan",
    "oneLiner": "Sliding window protocol where receiver accepts only sequential frames and sender retransmits from the lost frame onward.",
    "quickAnswer": "Go-Back-N uses a sender window W_s <= 2^k - 1 and receiver window W_r = 1. Out-of-order frames are discarded; on timeout, the sender goes back and retransmits all unacknowledged frames.",
    "whyItMatters": "GBN is simple because the receiver requires ZERO buffering for out-of-order frames, but it suffers from wasteful retransmissions if channel error rates are high.",
    "prerequisitesList": [
      {
        "concept": "Cumulative ACK",
        "meaning": "ACK n confirms that all frames up to n have been received correctly."
      },
      {
        "concept": "Receiver Window = 1",
        "meaning": "Receiver only accepts the exact next sequential frame number."
      }
    ],
    "learningObjectives": [
      "Explain the operational rules of Go-Back-N ARQ.",
      "Prove the maximum window size condition $W_s \\le 2^k - 1$.",
      "Trace GBN behavior during frame loss and ACK loss.",
      "Identify the performance drawback of discarding out-of-order frames."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link) & Layer 4 (Transport)",
      "standard": "HDLC REJ, ISO 7776",
      "type": "Pipelined ARQ Protocol",
      "keyFormula": "W_s \\le 2^k - 1, \\quad W_r = 1",
      "prerequisites": [
        "sliding-window"
      ],
      "relatedConcepts": [
        "selective-repeat",
        "stop-and-wait"
      ],
      "compareWith": [
        "selective-repeat"
      ],
      "primaryUses": [
        "HDLC, legacy satellite links, basic reliable transport"
      ]
    },
    "imageUrl": "assets/images/topic2/go-back-n-sliding-window.svg",
    "imageCaption": "Figure 2.11: Go-Back-N ARQ sliding window buffer (S_w = 2^m - 1, R_w = 1) and cumulative ACK mechanics.",
    "sections": {
      "overview": "a sliding window ARQ protocol in which the sender may transmit multiple frames up to window size $N$, but the receiver accepts strictly the single next expected frame in sequential order, discarding any out-of-order arrivals.",
      "eli10": "Imagine you are baking a cake following steps 1, 2, 3, 4, and 5. If step 2 is dropped and you only get step 3 and 4, you refuse to read steps 3 and 4! You throw them away and yell: \"Give me step 2!\" When step 2 finally arrives, the chef must re-read steps 2, 3, 4, and 5 all over again!",
      "analogy": "Numbering pages in a manuscript: An editor demands pages in strict numerical order. If page 3 is missing, they throw pages 4 and 5 in the shredder and demand the author resend everything from page 3 onward.",
      "howItWorks": "\n        <ol class=\"wiki-ordered-list\">\n          <li><strong>Pipelined Sending:</strong> Sender sends window $[0, 1, 2, 3]$. Starts timer for oldest unACKed frame (Frame 0).</li>\n          <li><strong>Sequential Receiver:</strong> Receiver tracks variable <code>expected_frame = 0</code>.</li>\n          <li><strong>Frame Loss Event:</strong> Frame 1 is lost due to noise.</li>\n          <li><strong>Discarding Out-of-Order:</strong> Frames 2 and 3 arrive safely, but receiver expects 1. Receiver discards Frames 2 and 3 and sends duplicate <code>ACK 0</code>!</li>\n          <li><strong>Timeout & Go Back:</strong> Timer for Frame 1 expires. Sender \"goes back\" and retransmits <strong>ALL</strong> outstanding frames: $[1, 2, 3]$!</li>\n        </ol>",
      "diagram": "",
      "interactiveLabKey": "sliding-window",
      "technicalDetails": "\n        <p><strong>Proof of Window Size $W_s \\le 2^k - 1$:</strong></p>\n        <p>If a sequence number field has $k$ bits, the sequence number space is $2^k$.</p>\n        <p>If sender window $W_s = 2^k$ were allowed (e.g., $k=2 \\implies W_s = 4$, sequence numbers $0, 1, 2, 3$):</p>\n        <ol class=\"wiki-ordered-list\">\n          <li>Sender sends frames $0, 1, 2, 3$.</li>\n          <li>Receiver accepts all 4 frames and advances its expected sequence back to $0$.</li>\n          <li>If all 4 ACKs are lost in transit, sender times out and retransmits Frame 0.</li>\n          <li>Receiver sees Frame 0, but CANNOT TELL if it is a retransmission of old Frame 0 or brand-new Frame 0 from the next cycle!</li>\n        </ol>\n        <p>To prevent this ambiguity, $W_s$ must never exceed $2^k - 1$.</p>",
      "workedExamples": {
        "level1": "<strong>Problem:</strong> In a GBN system with 3-bit sequence numbers ($k = 3$), what is the maximum sender window size?<br><br>\n<strong>Solution:</strong><br>\nSequence space = $2^3 = 8$ (numbers 0 to 7).<br>\nMaximum window size $W_s = 2^k - 1 = 8 - 1 = \\mathbf{7\\text{ frames}}$.",
        "level2": "<strong>Problem:</strong> Sender transmits frames 0, 1, 2, 3, 4. Frame 2 is damaged. What frames does the receiver accept, and what frames does sender retransmit?<br><br>\n<strong>Working:</strong><br>\n- Receiver accepts: Frames 0 and 1.<br>\n- Receiver discards: Frames 3 and 4 (out of order).<br>\n- Sender retransmits on timeout: <strong>Frames 2, 3, 4</strong> (goes back to 2).",
        "level3": "<strong>Problem:</strong> Why does GBN efficiency collapse on error-prone channels with large bandwidth-delay products?<br><br>\n<strong>Analysis:</strong><br>\nEvery single lost frame causes the retransmission of an entire window of $W$ frames, even though $W-1$ of those frames arrived perfectly at the receiver. On high-speed fiber or wireless links, this wastes massive channel capacity on redundant retransmissions."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Advantages</th><th>Disadvantages</th></tr></thead>\n          <tbody>\n            <tr><td>Simple receiver logic; zero buffer memory needed at receiver; cumulative ACKs tolerate lost ACKs.</td><td>Wasteful retransmissions; high penalty on noisy links; out-of-order frames discarded.</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "HDLC and SDLC protocols.",
        "Early ARPANET link protocols.",
        "Basis for TCP Reno loss recovery mechanisms."
      ],
      "commonMistakes": "\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>Thinking receiver buffers out-of-order frames in GBN:</strong> False! GBN receiver window is strictly 1; all out-of-order frames are immediately discarded.</li>\n        </ul>",
      "quiz": [
        {
          "question": "With 3-bit sequence numbers, what is the maximum conventional Go-Back-N sender window size?",
          "options": [
            "8",
            "7",
            "4",
            "3"
          ],
          "correctIndex": 1,
          "explanation": "W_s <= 2^k - 1 = 2^3 - 1 = 7. A window of 8 would cause catastrophic ambiguity if all ACKs were lost."
        },
        {
          "question": "What does a Go-Back-N receiver do when it receives an undamaged out-of-order frame?",
          "options": [
            "Buffers it in memory",
            "Discards it and re-sends ACK for the last in-order frame",
            "Passes it immediately to network layer",
            "Corrects it using Hamming code"
          ],
          "correctIndex": 1,
          "explanation": "In basic Go-Back-N, the receiver has a window size of 1 and discards all out-of-order frames."
        }
      ],
      "references": [
        {
          "cite": "Tanenbaum & Wetherall, Computer Networks (6th Ed.) - Section 3.4.1.",
          "url": "https://www.pearson.com"
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/54/Selective_repeat_transmit_window_example.png",
      "imageCaption": "Figure: Go-Back-N ARQ: Sliding Window of Size 2^m - 1 with Cumulative Acknowledgment."
    },
    "prevTopicId": "sliding-window",
    "nextTopicId": "selective-repeat",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/54/Selective_repeat_transmit_window_example.png",
    "imageCaption": "Figure: Go-Back-N ARQ: Sliding Window of Size 2^m - 1 with Cumulative Acknowledgment."
  },
  "selective-repeat": {
    "id": "selective-repeat",
    "title": "Selective Repeat ARQ",
    "unit": "Unit II: Data Link Layer & MAC Sublayer",
    "unitId": "unit2",
    "level": "Intermediate → Advanced",
    "category": "datalink",
    "difficulty": "Advanced",
    "readingTime": "25 min",
    "standard": "Tanenbaum Protocol 6 / RFC 2018 (TCP SACK)",
    "oneLiner": "Retransmitting strictly damaged frames while buffering out-of-order arrivals at the receiver.",
    "quickAnswer": "Selective Repeat ARQ uses sender and receiver windows W_s = W_r <= 2^(k-1). The receiver buffers out-of-order frames, and the sender retransmits only the specific lost frames.",
    "whyItMatters": "Unlike Go-Back-N, Selective Repeat never discards correctly received frames. It provides optimal bandwidth efficiency on noisy, high-latency links.",
    "prerequisitesList": [
      {
        "concept": "Receiver Buffering",
        "meaning": "Memory queues at the receiver holding out-of-order frames until gaps are filled."
      },
      {
        "concept": "Selective ACK / NAK",
        "meaning": "Control messages acknowledging individual frame numbers."
      }
    ],
    "learningObjectives": [
      "Explain how Selective Repeat buffers out-of-order frames.",
      "Prove the maximum window size condition $W_s = W_r \\le 2^{k-1}$.",
      "Compare Go-Back-N and Selective Repeat in buffer complexity vs channel efficiency."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link) & Layer 4 (TCP SACK)",
      "standard": "RFC 2018 (TCP SACK), HDLC SREJ",
      "type": "Optimal Pipelined ARQ",
      "keyFormula": "W_s = W_r \\le 2^{k-1}",
      "prerequisites": [
        "go-back-n"
      ],
      "relatedConcepts": [
        "sliding-window",
        "stop-and-wait"
      ],
      "compareWith": [
        "go-back-n"
      ],
      "primaryUses": [
        "TCP Selective Acknowledgment (SACK), Wi-Fi Block ACK, satellite links"
      ]
    },
    "imageUrl": "assets/images/topic2/selective-repeat-windows.svg",
    "imageCaption": "Figure 2.13: Selective Repeat ARQ symmetric sliding windows (S_w = R_w = 2^(m-1)) with independent buffering.",
    "sections": {
      "overview": "an advanced sliding window ARQ protocol in which the receiver accepts and buffers correctly received frames even when preceding frames are missing, allowing the sender to retransmit only the specific frames that were lost or corrupted.",
      "eli10": "Imagine receiving pages 1, 3, and 4 of a story. Instead of throwing pages 3 and 4 in the trash like Go-Back-N, you put them neatly on your desk and just say: \"Hey, page 2 was missing, please re-send only page 2!\" When page 2 arrives, you read 1, 2, 3, and 4 in order!",
      "analogy": "Assembling a jigsaw puzzle: If you can't find piece #15 right now, you don't throw away pieces #16 and #17 that you already found. You hold onto them until piece #15 turns up!",
      "howItWorks": "\n        <ol class=\"wiki-ordered-list\">\n          <li><strong>Sender Dispatches Window:</strong> Sender transmits $[F_0, F_1, F_2, F_3]$. Maintains individual timer for each frame.</li>\n          <li><strong>Frame Loss:</strong> Frame 1 is lost in transit.</li>\n          <li><strong>Out-of-Order Buffering:</strong> Frames 2 and 3 arrive safely. Receiver buffers $F_2$ and $F_3$ in memory and returns individual ACKs ($ACK_2, ACK_3$).</li>\n          <li><strong>Selective Retransmission:</strong> Timer expires on $F_1$ only. Sender retransmits <strong>ONLY Frame 1</strong>!</li>\n          <li><strong>Reassembly & Delivery:</strong> Receiver receives retransmitted $F_1$, reassembles sequence $[F_0, F_1, F_2, F_3]$ in order, and delivers all 4 frames to the Network Layer!</li>\n        </ol>",
      "diagram": "",
      "interactiveLabKey": "sliding-window",
      "technicalDetails": "\n        <p><strong>Proof of Window Size $W_s = W_r \\le 2^{k-1}$:</strong></p>\n        <p>If $k = 3$ bits, sequence number space is $2^3 = 8$ (values 0..7). Maximum window size is $2^{3-1} = 4$.</p>\n        <p>If window size was $5$ (greater than half the sequence space):</p>\n        <ol class=\"wiki-ordered-list\">\n          <li>Sender sends frames $0, 1, 2, 3, 4$.</li>\n          <li>Receiver receives all 5 frames, advances its window to $[5, 6, 7, 0, 1]$.</li>\n          <li>All ACKs are lost. Sender times out and retransmits Frame 0.</li>\n          <li>Receiver window $[5, 6, 7, 0, 1]$ contains $0$! Receiver treats old Frame 0 as brand-new Frame 0 from the next cycle! Catastrophic duplicate data injection!</li>\n        </ol>\n        <p>Thus, $W_s$ and $W_r$ must be $\\le 2^{k-1}$.</p>",
      "workedExamples": {
        "level1": "<strong>Problem:</strong> With 3 sequence-number bits ($k=3$), compare the maximum sender window for Go-Back-N vs. Selective Repeat.<br><br>\n<strong>Solution:</strong><br>\n- Go-Back-N: $W_s = 2^k - 1 = 8 - 1 = \\mathbf{7}$.<br>\n- Selective Repeat: $W_s = 2^{k-1} = 2^2 = \\mathbf{4}$.",
        "level2": "<strong>Problem:</strong> In a Selective Repeat session with $W=4$, frames 0, 1, 2, 3 are sent. Frame 1 is lost. Trace receiver buffer states.<br><br>\n<strong>Working:</strong><br>\n- Arrival F0: in-order &rarr; delivered to Layer 3. Window slides to $[1, 2, 3, 4]$.<br>\n- Arrival F2: out-of-order &rarr; stored in buffer slot 2. ACK 2 sent.<br>\n- Arrival F3: out-of-order &rarr; stored in buffer slot 3. ACK 3 sent.<br>\n- Retransmitted F1 arrives: slot 1 filled &rarr; deliver F1, F2, F3 together! Window slides to $[4, 5, 6, 7]$.",
        "level3": "<strong>Problem:</strong> When is Selective Repeat worth the added implementation complexity over Go-Back-N?<br><br>\n<strong>Analysis:</strong><br>\nSelective Repeat is worth the cost on links with high bandwidth-delay products and moderate-to-high bit error rates (e.g., satellite links, wireless networks). In such environments, GBN wastes enormous throughput retransmitting already-received frames, whereas SR retransmits strictly the missing packets."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Advantages</th><th>Disadvantages</th></tr></thead>\n          <tbody>\n            <tr><td>Optimal channel utilization; no duplicate retransmissions; handles high error rates gracefully.</td><td>Requires substantial receiver memory buffers; complex sequence tracking; smaller max window ($2^{k-1}$).</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "TCP SACK (Selective Acknowledgment - RFC 2018).",
        "Wi-Fi IEEE 802.11 Block ACK.",
        "Satellite broadband links (Starlink, DVB-RCS2)."
      ],
      "commonMistakes": "\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>Assuming window size can be $2^k - 1$:</strong> That is Go-Back-N! In Selective Repeat, both sender and receiver windows must be $\\le 2^{k-1}$.</li>\n        </ul>",
      "quiz": [
        {
          "question": "With 3 sequence-number bits (k = 3), what is the maximum conventional Selective Repeat window size?",
          "options": [
            "8",
            "7",
            "4",
            "2"
          ],
          "correctIndex": 2,
          "explanation": "In Selective Repeat, W_s = W_r <= 2^(k-1) = 2^(3-1) = 4."
        },
        {
          "question": "What happens to out-of-order frames in Selective Repeat?",
          "options": [
            "They are discarded immediately",
            "They are buffered at the receiver until missing frames arrive",
            "They trigger an immediate link reset",
            "They are decrypted and forwarded"
          ],
          "correctIndex": 1,
          "explanation": "The receiver window accepts and buffers valid out-of-order frames, awaiting the retransmission of only the missing frame."
        }
      ],
      "references": [
        {
          "cite": "RFC 2018 - TCP Selective Acknowledgment Options.",
          "url": "https://www.rfc-editor.org/rfc/rfc2018"
        },
        {
          "cite": "Tanenbaum & Wetherall, Computer Networks (6th Ed.) - Section 3.4.2.",
          "url": "https://www.pearson.com"
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/df/Selective_repeat_space-time_diagram.png",
      "imageCaption": "Figure: Selective Repeat ARQ: Independent Retransmission Timeline with Receiver Buffer Slots."
    },
    "prevTopicId": "go-back-n",
    "nextTopicId": "channel-allocation",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/df/Selective_repeat_space-time_diagram.png",
    "imageCaption": "Figure: Selective Repeat ARQ: Independent Retransmission Timeline with Receiver Buffer Slots."
  },
  "ethernet": {
    "id": "ethernet",
    "title": "Ethernet MAC Sublayer Protocol (IEEE 802.3)",
    "unit": "Unit II: Data Link Layer & MAC Sublayer",
    "unitId": "unit2",
    "level": "Beginner → Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "30 min",
    "standard": "IEEE 802.3 / DIX Ethernet II",
    "oneLiner": "The ubiquitous wired LAN standard governing frame formats, MAC addressing, and link switching.",
    "quickAnswer": "IEEE 802.3 defines the Ethernet MAC frame: 64 to 1518 bytes with 6-byte source and destination MAC addresses, Type/Length, payload (46-1500B), and a 4-byte CRC-32 FCS trailer.",
    "whyItMatters": "Ethernet forms the physical and data-link backbone of virtually all enterprise, campus, and data center local area networks across the world.",
    "prerequisitesList": [
      {
        "concept": "MAC Address",
        "meaning": "48-bit hardware link-layer identifier."
      },
      {
        "concept": "FCS (CRC-32)",
        "meaning": "4-byte Frame Check Sequence detecting transmission errors."
      },
      {
        "concept": "Full-Duplex",
        "meaning": "Independent simultaneous transmission and reception over dedicated twisted-pair/fiber links."
      }
    ],
    "learningObjectives": [
      "Describe the structure and fields of the IEEE 802.3 / Ethernet II frame.",
      "Calculate minimum and maximum Ethernet frame sizes.",
      "Explain why the 64-byte minimum frame size was required in traditional shared Ethernet.",
      "Contrast classic shared-medium Ethernet (CSMA/CD) with modern switched Ethernet."
    ],
    "infobox": {
      "layer": "Layer 2 (MAC Sublayer) & Layer 1",
      "standard": "IEEE 802.3-2022",
      "type": "Wired Local Area Network (LAN)",
      "keyFormula": "\\text{Min Frame} = 6 + 6 + 2 + 46 + 4 = 64\\text{ Bytes}",
      "prerequisites": [
        "framing",
        "mac-address"
      ],
      "relatedConcepts": [
        "mac-address",
        "arp",
        "vlan",
        "csma-protocols"
      ],
      "compareWith": [
        "wifi-mac-sublayer"
      ],
      "primaryUses": [
        "Campus LANs, Data center fabrics, Home routers, Industrial Ethernet"
      ]
    },
    "sections": {
      "overview": "the foundational technology for wired Local Area Networks (LANs) defined primarily by the IEEE 802.3 family of standards, operating across Layer 1 (Physical) and Layer 2 (Data Link MAC sublayer).",
      "eli10": "Ethernet is the digital shipping container of the Internet. Just like real shipping containers have standard sizes, locking corners, and sender/receiver serial numbers painted on the door, Ethernet frames package your computer's data into standard boxes that switches can pass from room to room.",
      "analogy": "A registered postal envelope: It has the destination address on the front, your return address on the back, a stamp indicating type of mail, the letter inside, and a wax seal on the flap that proves the letter wasn't tampered with.",
      "howItWorks": "\n        <ol class=\"wiki-ordered-list\">\n          <li><strong>Preamble & SFD:</strong> Transceiver transmits 7 bytes of <code>10101010</code> to sync receiver clock, followed by 1 byte SFD (<code>10101011</code>).</li>\n          <li><strong>Addressing:</strong> Encapsulates 6-byte Destination MAC and 6-byte Source MAC.</li>\n          <li><strong>Type/Length:</strong> 2-byte field. If $ge 0x0600$, it is EtherType (e.g. <code>0x0800</code> for IPv4, <code>0x86DD</code> for IPv6). If $le 1500$, it is IEEE 802.3 length.</li>\n          <li><strong>Payload & Padding:</strong> IP packet (46 to 1500 bytes). If packet is smaller than 46 bytes, padding zeros are appended to reach minimum 64 bytes.</li>\n          <li><strong>FCS Trailer:</strong> Appends 4-byte CRC-32 checksum.</li>\n          <li><strong>Switch Forwarding:</strong> Modern Layer 2 switches read Destination MAC, look up egress port in their MAC address table, and forward frame without collisions.</li>\n        </ol>",
      "diagram": "",
      "interactiveLabKey": "frame-explorer",
      "technicalDetails": "\n        <p><strong>Minimum Frame Size Math:</strong></p>\n        $$6\\text{ (Dst)} + 6\\text{ (Src)} + 2\\text{ (Type)} + 46\\text{ (Min Data)} + 4\\text{ (FCS)} = \\mathbf{64\\text{ Bytes (512 bits)}}$$\n        <p><strong>Why 64 Bytes was Mandatory:</strong> In classic half-duplex CSMA/CD, the frame transmission time had to exceed the round-trip propagation time across the maximum collision domain ($2\\tau$). At 10 Mbps over 2.5 km of coax with repeaters, $2\\tau \\approx 51.2\\text{ µs} = 512\\text{ bit times} = 64\\text{ bytes}$. If a frame was shorter, a transmitter could finish sending before hearing a collision, failing to detect data loss!</p>\n        <p><strong>Modern Full-Duplex Ethernet:</strong> Modern switched Ethernet uses separate transmit and receive wire pairs/fiber strands. Collisions CANNOT occur during normal operation, so CSMA/CD is disabled, though the 64-byte minimum frame size is retained for compatibility.</p>",
      "workedExamples": {
        "level1": "<strong>Problem:</strong> An application generates an IP packet of only 20 bytes. What does the Ethernet MAC layer do?<br><br>\n<strong>Solution:</strong><br>\nThe minimum Ethernet payload is 46 bytes. The MAC sublayer automatically appends <strong>26 bytes of zero padding</strong> to bring the payload to 46 bytes, ensuring the total frame size reaches the required 64 bytes.",
        "level2": "<strong>Problem:</strong> Calculate the maximum standard Ethernet frame size (excluding preamble and SFD).<br><br>\n<strong>Working:</strong><br>\n$\\text{Max Frame} = 6\\text{ (Dst)} + 6\\text{ (Src)} + 2\\text{ (Type)} + 1500\\text{ (Max MTU)} + 4\\text{ (FCS)} = \\mathbf{1518\\text{ Bytes}}$.<br>\n*(Note: If IEEE 802.1Q VLAN tag is present, add 4 bytes &rarr; 1522 Bytes).*",
        "level3": "<strong>Problem:</strong> True or False: A modern full-duplex Gigabit Ethernet switch port uses CSMA/CD collision detection.<br><br>\n<strong>Analysis:</strong><br>\n<strong>FALSE!</strong> Full-duplex connections provide dedicated point-to-point links between host NIC and switch port. Transmit and receive paths are physically isolated; collisions are physically impossible. CSMA/CD is completely disabled on full-duplex links."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Advantages</th><th>Disadvantages</th></tr></thead>\n          <tbody>\n            <tr><td>Massive bandwidth scaling (10 Mbps to 800 Gbps); low hardware cost; robust plug-and-play switching; backward compatible frame layout.</td><td>Distance limited without fiber; broadcast storms can flood domain; unmanaged switches provide no loop protection without STP.</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "IEEE 802.3ab (1000BASE-T Gigabit Ethernet over Cat5e/Cat6).",
        "IEEE 802.3ae (10GBASE-SR/LR 10 Gbps optical Ethernet in data centers).",
        "Industrial automation (EtherCAT, PROFINET)."
      ],
      "commonMistakes": "\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>Believing Preamble and SFD are part of the 64-byte frame size:</strong> The preamble and SFD precede the frame on the wire and are NOT counted in the 64–1518 byte count.</li>\n          <li><strong>Confusing CSMA/CD with modern Ethernet:</strong> CSMA/CD is a legacy mechanism for shared coaxial/hub networks; modern switched Ethernet is collision-free.</li>\n        </ul>",
      "quiz": [
        {
          "question": "What is the minimum standard Ethernet frame size (excluding preamble and SFD)?",
          "options": [
            "46 bytes",
            "64 bytes",
            "128 bytes",
            "1518 bytes"
          ],
          "correctIndex": 1,
          "explanation": "6 (Dst MAC) + 6 (Src MAC) + 2 (Type) + 46 (Min Data) + 4 (FCS) = 64 bytes."
        },
        {
          "question": "What is the size of the Ethernet FCS (Frame Check Sequence) field?",
          "options": [
            "2 bytes",
            "4 bytes (32 bits)",
            "6 bytes",
            "8 bytes"
          ],
          "correctIndex": 1,
          "explanation": "The FCS is a 4-byte (32-bit) field containing the CRC-32 polynomial remainder."
        },
        {
          "question": "Why was a minimum frame size strictly required in traditional shared Ethernet?",
          "options": [
            "To fit inside computer RAM",
            "To ensure a transmitting station was still transmitting when a collision returned, enabling CSMA/CD collision detection",
            "To save cable bandwidth",
            "To prevent overheating of repeaters"
          ],
          "correctIndex": 1,
          "explanation": "If a frame finished transmitting before the collision signal propagated back across the cable, the transmitter would fail to detect the collision."
        },
        {
          "question": "Which EtherType value denotes an encapsulated IPv4 packet?",
          "options": [
            "0x0800",
            "0x86DD",
            "0x0806",
            "0xFFFF"
          ],
          "correctIndex": 0,
          "explanation": "0x0800 identifies IPv4, 0x86DD identifies IPv6, and 0x0806 identifies ARP."
        }
      ],
      "references": [
        {
          "cite": "IEEE Std 802.3-2022 - IEEE Standard for Ethernet.",
          "url": "https://standards.ieee.org"
        },
        {
          "cite": "Tanenbaum & Wetherall, Computer Networks (6th Ed.) - Chapter 4.3: Ethernet.",
          "url": "https://www.pearson.com"
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/13/Ethernet_Type_II_Frame_format.svg",
      "imageCaption": "Figure: Ethernet IEEE 802.3 Architecture, 10BASE-T/100BASE-TX Topology, and CSMA/CD Medium Access."
    },
    "prevTopicId": "collision-free-protocols",
    "nextTopicId": "mac-address",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/13/Ethernet_Type_II_Frame_format.svg",
    "imageCaption": "Figure: Ethernet IEEE 802.3 Architecture, 10BASE-T/100BASE-TX Topology, and CSMA/CD Medium Access."
  },
  "mac-address": {
    "id": "mac-address",
    "title": "Ethernet MAC Addressing & Learning",
    "unit": "Unit II: Data Link Layer & MAC Sublayer",
    "unitId": "unit2",
    "level": "Beginner → Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "20 min",
    "standard": "IEEE 802 (EUI-48)",
    "oneLiner": "48-bit hardware link-layer addressing and switch MAC address learning mechanisms.",
    "quickAnswer": "A MAC address is a 48-bit (6-byte) physical identifier burned into a NIC (OUI + vendor ID). Switches inspect source MACs to learn which device connects to which port.",
    "whyItMatters": "IP addresses route packets across the global Internet, but MAC addresses deliver frames across the physical local wire between directly connected interfaces and switches.",
    "prerequisitesList": [
      {
        "concept": "Hexadecimal",
        "meaning": "Base-16 numbering system (0-9, A-F) where each digit represents 4 bits."
      },
      {
        "concept": "Layer 2 Switch",
        "meaning": "A multi-port network bridge that forwards frames based on destination MAC addresses."
      }
    ],
    "learningObjectives": [
      "Explain the 48-bit structure of an IEEE EUI-48 MAC address.",
      "Distinguish Unicast, Multicast, and Broadcast MAC addresses.",
      "Trace the switch MAC address learning and forwarding algorithm.",
      "Compare MAC addresses (Layer 2) against IP addresses (Layer 3)."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 EUI-48",
      "type": "Physical Hardware Addressing",
      "keyFormula": "\\text{MAC} = 6\\text{ Bytes} = 48\\text{ Bits} \\quad (\\text{OUI: 24b} + \\text{NIC: 24b})",
      "prerequisites": [
        "ethernet"
      ],
      "relatedConcepts": [
        "arp",
        "ethernet",
        "vlan",
        "dll-switching"
      ],
      "compareWith": [
        "ip-addressing"
      ],
      "primaryUses": [
        "Local Ethernet delivery, Wi-Fi association, switch forwarding tables"
      ]
    },
    "sections": {
      "overview": "the link-layer addressing system standardized by IEEE that uniquely identifies a network interface card (NIC) on a local physical network segment.",
      "eli10": "Your Social Security Number or Aadhaar card never changes no matter where you move (that's your MAC address!). Your mailing address changes every time you rent a new apartment (that's your IP address!). Mail carriers deliver across the city using postal codes, but the package is handed to your personal hands using your name!",
      "analogy": "Device serial numbers: A computer monitor has a serial number engraved at the factory. An office receptionist maintains a clipboard listing which desk has which monitor serial number (that's a switch MAC table!).",
      "howItWorks": "\n        <ol class=\"wiki-ordered-list\">\n          <li><strong>Address Format:</strong> 48 bits, written as 6 pairs of hexadecimal digits: <code>00:1A:2B:3C:4D:5E</code>.</li>\n          <li><strong>OUI (Organizationally Unique Identifier):</strong> First 24 bits identify the hardware manufacturer (Cisco, Apple, Intel) assigned by IEEE.</li>\n          <li><strong>Device Identifier:</strong> Remaining 24 bits are assigned by the manufacturer uniquely to that chip.</li>\n          <li><strong>Switch Learning:</strong> When Frame arrives on Port 1 with Source MAC <code>A</code>, switch records <code>MAC A &rarr; Port 1</code> in its Forwarding Database (FDB).</li>\n          <li><strong>Switch Forwarding Decision:</strong>\n            <ul class=\"wiki-bullet-list\">\n              <li><em>Destination Known:</em> If Dest MAC is in table on Port 2, forward frame ONLY out Port 2 (Filtering).</li>\n              <li><em>Destination Unknown / Broadcast:</em> Flood frame out all ports except the arrival port!</li>\n            </ul>\n          </li>\n        </ol>",
      "diagram": "",
      "interactiveLabKey": "frame-explorer",
      "technicalDetails": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Feature</th><th>MAC Address (Layer 2)</th><th>IP Address (Layer 3)</th></tr></thead>\n          <tbody>\n            <tr><td>OSI Layer</td><td>Data Link Layer (Layer 2)</td><td>Network Layer (Layer 3)</td></tr>\n            <tr><td>Length & Format</td><td>48 Bits (6 Bytes), Hexadecimal</td><td>IPv4: 32b, IPv6: 128b, Dotted Decimal</td></tr>\n            <tr><td>Scope</td><td>Local link segment delivery</td><td>End-to-end global internetwork routing</td></tr>\n            <tr><td>Changes Across Hops?</td><td><strong>YES!</strong> Rewritten at every routed hop</td><td><strong>NO!</strong> Stays constant end-to-end (except NAT)</td></tr>\n          </tbody>\n        </table>",
      "workedExamples": {
        "level1": "<strong>Problem:</strong> Identify whether <code>01:00:5E:00:00:01</code> is a unicast, multicast, or broadcast MAC address.<br><br>\n<strong>Solution:</strong><br>\nInspect the first byte: <code>01</code> in binary is <code>0000 0001</code>.<br>\nBit 0 (the least significant bit of the first byte) is <strong>1</strong>.<br>\nUnder IEEE rules, if bit 0 is 1, it is a <strong>Multicast MAC address</strong> (specifically IPv4 Multicast mapping).",
        "level2": "<strong>Problem:</strong> A switch receives a frame on Port 1 from Host A (MAC: <code>00:11:..:AA</code>) destined to Host B (MAC: <code>00:22:..:BB</code>). The switch table currently has no entries. Trace switch actions.<br><br>\n<strong>Working:</strong><br>\n1. Learning step: Switch inspects Source MAC and records: <code>MAC A &rarr; Port 1</code>.<br>\n2. Forwarding lookup: Switch searches table for Dest MAC B. Not found (Unknown Unicast).<br>\n3. Action: Switch <strong>floods</strong> the frame out Port 2, Port 3, Port 4 (all ports except Port 1).<br>\n4. Host B replies: Switch learns <code>MAC B &rarr; Port 2</code>. Future frames between A and B are now filtered directly!",
        "level3": "<strong>Problem:</strong> A router receives an Ethernet frame on Interface eth0 and forwards the packet out eth1 to the next-hop router. What happens to the MAC addresses?<br><br>\n<strong>Analysis:</strong><br>\nThe router strips the incoming Ethernet header. It inspects the IP destination, looks up its routing table, and creates a <strong>brand-new Layer 2 frame</strong> on eth1.<br>\n- Source MAC becomes router's eth1 MAC.<br>\n- Destination MAC becomes next-hop router's MAC.<br>\n- The IP addresses inside the payload remain completely unchanged!"
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Advantages</th><th>Disadvantages</th></tr></thead>\n          <tbody>\n            <tr><td>Globally unique out of the box; enables zero-configuration plug-and-play Ethernet switching.</td><td>Flat address space (cannot be aggregated into subnets like IP); vulnerable to MAC spoofing and ARP poisoning.</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Network Interface Cards (NICs), Wi-Fi chips, Bluetooth transceivers.",
        "Ethernet switches for MAC forwarding tables (CAM tables).",
        "DHCP static IP reservations and 802.1X Port Security."
      ],
      "commonMistakes": "\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>Believing MAC addresses route across the Internet:</strong> Routers strip MAC addresses at every hop; only IP addresses route across networks.</li>\n        </ul>",
      "quiz": [
        {
          "question": "How many bits are in a conventional Ethernet MAC address?",
          "options": [
            "16 bits",
            "32 bits",
            "48 bits (6 bytes)",
            "128 bits"
          ],
          "correctIndex": 2,
          "explanation": "Ethernet MAC addresses are standardized as 48-bit (6-byte) EUI-48 identifiers."
        },
        {
          "question": "What is the universal Layer 2 Ethernet broadcast MAC address?",
          "options": [
            "00:00:00:00:00:00",
            "255.255.255.255",
            "FF:FF:FF:FF:FF:FF",
            "01:00:5E:00:00:00"
          ],
          "correctIndex": 2,
          "explanation": "FF:FF:FF:FF:FF:FF has all 48 bits set to 1, targeting all devices in the local broadcast domain."
        },
        {
          "question": "How does a Layer 2 switch learn which MAC address belongs to which port?",
          "options": [
            "It queries DNS servers",
            "It inspects the Source MAC address of arriving frames",
            "It inspects the Destination IP address",
            "It broadcasts ARP queries every second"
          ],
          "correctIndex": 1,
          "explanation": "Switches dynamically learn by recording the Source MAC address of incoming frames and associating it with the arrival port."
        }
      ],
      "references": [
        {
          "cite": "IEEE Guidelines for 48-Bit Global Identifier (EUI-48).",
          "url": "https://standards.ieee.org"
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/42/Ethernet_frame.svg",
      "imageCaption": "Figure: 48-bit Ethernet MAC Address Structure: 24-bit OUI (IEEE Assigned) + 24-bit NIC Serial Identifier."
    },
    "prevTopicId": "ethernet",
    "nextTopicId": "wireless-lan-protocols",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/42/Ethernet_frame.svg",
    "imageCaption": "Figure: 48-bit Ethernet MAC Address Structure: 24-bit OUI (IEEE Assigned) + 24-bit NIC Serial Identifier."
  },
  "arp": {
    "id": "arp",
    "title": "Address Resolution Protocol (ARP)",
    "unit": "Unit II: Data Link Layer & MAC Sublayer",
    "unitId": "unit2",
    "level": "Beginner → Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15 min",
    "standard": "RFC 826",
    "oneLiner": "Resolving known 32-bit IP addresses to unknown 48-bit physical MAC addresses on local broadcast links.",
    "quickAnswer": "ARP sends a broadcast query ('Who has IP X? Tell IP Y') to which the target device replies with a unicast message containing its 48-bit MAC address.",
    "whyItMatters": "To send an IP datagram over Ethernet, the host MUST know the destination's Layer 2 MAC address. ARP is the glue linking Layer 3 logical IP addressing to Layer 2 physical hardware.",
    "prerequisitesList": [
      {
        "concept": "IP Address",
        "meaning": "Layer 3 logical address (e.g. 192.168.1.1)."
      },
      {
        "concept": "MAC Address",
        "meaning": "Layer 2 hardware address."
      },
      {
        "concept": "Broadcast",
        "meaning": "Transmitting a frame to all devices on the LAN segment."
      }
    ],
    "learningObjectives": [
      "Explain why ARP is required before Ethernet transmission can occur.",
      "Differentiate ARP Request (Broadcast) from ARP Reply (Unicast).",
      "Explain the ARP Cache and ARP Cache Poisoning security vulnerability."
    ],
    "infobox": {
      "layer": "Layer 2 / 2.5 (Glue between Layer 2 and 3)",
      "standard": "RFC 826 (STD 37)",
      "type": "Address Translation Protocol",
      "keyFormula": "\\text{ARP Request (Broadcast)} \\implies \\text{ARP Reply (Unicast)}",
      "prerequisites": [
        "mac-address",
        "ethernet"
      ],
      "relatedConcepts": [
        "ethernet",
        "vlan",
        "ipv4"
      ],
      "compareWith": [
        "dns"
      ],
      "primaryUses": [
        "Local IPv4 network delivery, default gateway resolution"
      ]
    },
    "sections": {
      "overview": "the network protocol used to map an Internet Protocol version 4 (IPv4) address to the corresponding physical Media Access Control (MAC) address recognized on a local area network.",
      "eli10": "Imagine walking into a large classroom where you know someone's name is \"Alice\" (her IP address), but you don't know what she looks like (her MAC address). You shout out loud to the whole room: \"Who is Alice?\" (ARP Request Broadcast). Alice stands up and says directly to you: \"I am Alice, here I am!\" (ARP Reply Unicast).",
      "analogy": "Directory assistance: You have the person's name and need their physical home street address on the local block.",
      "howItWorks": "\n        <ol class=\"wiki-ordered-list\">\n          <li><strong>Cache Lookup:</strong> Sender checks local memory (<code>arp -a</code> table). If entry exists, frames are dispatched immediately.</li>\n          <li><strong>ARP Request (Broadcast):</strong> If not cached, sender builds an ARP Request packet encapsulated in an Ethernet frame destined to <code>FF:FF:FF:FF:FF:FF</code>.</li>\n          <li><strong>Local Flooding:</strong> Switch floods the broadcast frame to all stations on the VLAN.</li>\n          <li><strong>Target Recognition:</strong> Only the host matching the requested IP processes the request; all other hosts discard it.</li>\n          <li><strong>ARP Reply (Unicast):</strong> Target host replies directly to sender's MAC address with its own MAC address.</li>\n          <li><strong>Cache Update:</strong> Sender stores the mapping in its ARP Cache (typically aged out after 2–20 minutes).</li>\n        </ol>",
      "diagram": "",
      "interactiveLabKey": "frame-explorer",
      "technicalDetails": "\n        <p><strong>Security Weakness - ARP Spoofing / Poisoning:</strong></p>\n        <p>ARP is completely stateless and has zero authentication! A malicious host can send unsolicited (gratuitous) ARP replies claiming: <em>\"192.168.1.1 (Default Gateway) is at my MAC address!\"</em></p>\n        <p>The victim overwrites its ARP cache and routes all Internet traffic through the attacker (Man-in-the-Middle attack). Protection: <strong>Dynamic ARP Inspection (DAI)</strong> and 802.1X snooping on managed switches.</p>",
      "workedExamples": {
        "level1": "<strong>Problem:</strong> Why is an ARP Request sent as a broadcast, while an ARP Reply is sent as a unicast?<br><br>\n<strong>Solution:</strong><br>\nThe sender does not know which host holds the target IP, nor its MAC address, so it must query everyone via broadcast. The target host, however, learned the sender's MAC address from the request packet itself, so its reply can be addressed directly to the sender via unicast.",
        "level2": "<strong>Problem:</strong> Host A wants to communicate with Google server <code>8.8.8.8</code>. Does Host A send an ARP request for <code>8.8.8.8</code>?<br><br>\n<strong>Working:</strong><br>\n<strong>NO!</strong> 8.8.8.8 is on a remote subnet. Host A inspects its routing table and determines that traffic must go through the <strong>Default Gateway (e.g. 192.168.1.1)</strong>.<br>\nHost A sends an ARP request for the Default Gateway's IP address (192.168.1.1) to find the router's local MAC address!",
        "level3": "<strong>Problem:</strong> Explain why IPv6 does not use ARP.<br><br>\n<strong>Analysis:</strong><br>\nIPv6 replaced ARP with <strong>Neighbor Discovery Protocol (NDP)</strong> over ICMPv6. NDP uses efficient multicast (Solicited-Node Multicast) instead of noisy broadcast flooding, preventing network-wide host CPU interruptions."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Advantages</th><th>Disadvantages</th></tr></thead>\n          <tbody>\n            <tr><td>Zero manual configuration; seamless integration between Layer 2 and Layer 3; self-healing cache.</td><td>Broadcast traffic consumes airtime/bandwidth; vulnerable to ARP spoofing and MITM attacks.</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Every IPv4-connected device (Windows, Linux, macOS, iOS, Android).",
        "Layer 3 switches and default gateway routers."
      ],
      "commonMistakes": "\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>Thinking ARP resolves domain names to IP addresses:</strong> Domain names are resolved to IPs by <strong>DNS</strong> (Application Layer). ARP resolves IPs to MAC addresses (Link Layer).</li>\n        </ul>",
      "quiz": [
        {
          "question": "What type of transmission is an ARP Request?",
          "options": [
            "Unicast",
            "Broadcast (FF:FF:FF:FF:FF:FF)",
            "Multicast",
            "Anycast"
          ],
          "correctIndex": 1,
          "explanation": "Because the sender does not know the target's MAC address, it broadcasts the query to all hosts on the local subnet."
        },
        {
          "question": "When sending packets to an external Internet server (e.g. 8.8.8.8), whose MAC address does the sender look up via ARP?",
          "options": [
            "Google's server MAC",
            "The Default Gateway router's MAC",
            "The ISP's central DNS MAC",
            "No MAC address is needed"
          ],
          "correctIndex": 1,
          "explanation": "For off-subnet traffic, the host uses ARP to resolve the local Default Gateway router's MAC address."
        }
      ],
      "references": [
        {
          "cite": "RFC 826 - An Ethernet Address Resolution Protocol (STD 37).",
          "url": "https://www.rfc-editor.org/rfc/rfc826"
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/42/Ethernet_frame.svg",
      "imageCaption": "Figure: Address Resolution Protocol (ARP): Resolving 32-bit IP Addresses to 48-bit MAC Hardware Addresses."
    },
    "prevTopicId": "network-devices",
    "nextTopicId": "vlan",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/42/Ethernet_frame.svg",
    "imageCaption": "Figure: Address Resolution Protocol (ARP): Resolving 32-bit IP Addresses to 48-bit MAC Hardware Addresses."
  },
  "vlan": {
    "id": "vlan",
    "title": "Virtual LANs (IEEE 802.1Q)",
    "unit": "Unit II: Data Link Layer & MAC Sublayer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "20 min",
    "standard": "IEEE 802.1Q",
    "oneLiner": "Logically segmenting physical switches into isolated broadcast domains.",
    "quickAnswer": "A VLAN logically divides a single physical switch into multiple isolated broadcast domains using 4-byte 802.1Q tags containing a 12-bit VLAN ID (1 to 4094).",
    "whyItMatters": "Without VLANs, broadcast traffic and security breaches affect an entire building. VLANs allow network administrators to isolate Finance, Engineering, and Guest Wi-Fi on the same physical cables.",
    "prerequisitesList": [
      {
        "concept": "Broadcast Domain",
        "meaning": "The set of all devices that receive broadcast frames initiated by any member."
      },
      {
        "concept": "Trunk Port",
        "meaning": "A switch port carrying traffic for multiple VLANs using 802.1Q tags."
      }
    ],
    "learningObjectives": [
      "Define Virtual LANs and explain broadcast isolation benefits.",
      "Identify the 4-byte IEEE 802.1Q tag fields (TPID, PCP, DEI, VID).",
      "Differentiate Access Ports (untagged) from Trunk Ports (tagged).",
      "Explain Inter-VLAN routing (Router-on-a-Stick / Layer 3 switches)."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802.1Q-2018",
      "type": "Logical Network Segmentation",
      "keyFormula": "\\text{VLAN Tag} = 4\\text{ Bytes (TPID: 2B} + \\text{TCI: 2B [VID: 12 bits]})",
      "prerequisites": [
        "ethernet",
        "mac-address"
      ],
      "relatedConcepts": [
        "ethernet",
        "dll-switching",
        "arp"
      ],
      "compareWith": [
        "subnetting"
      ],
      "primaryUses": [
        "Enterprise campus networks, data center isolation, ISP QinQ"
      ]
    },
    "sections": {
      "overview": "a technology that partitions a physical local area network into multiple logical broadcast domains at Layer 2, isolating traffic without requiring physically separated cabling.",
      "eli10": "Imagine a big school building. Instead of building three separate school buildings for Elementary, Middle, and High School students, everyone uses the same building, but they wear colored wristbands: Red, Blue, and Green. Red students are forbidden from talking to Green students without a principal (router) introducing them!",
      "analogy": "Office cubicles vs separate private offices: Physical walls are expensive. VLANs act like soundproof cubicle dividers within a single open-floor office.",
      "howItWorks": "\n        <ol class=\"wiki-ordered-list\">\n          <li><strong>Access Ports:</strong> Connect to end hosts (PCs, printers). Frames inside hosts have NO tags. When entering the switch, the port assigns a configured VLAN ID.</li>\n          <li><strong>Trunk Ports:</strong> Connect switch-to-switch or switch-to-router. Inserts a 4-byte 802.1Q tag into the Ethernet header.</li>\n          <li><strong>802.1Q Tag:</strong> Contains TPID (<code>0x8100</code>) and a 12-bit VLAN Identifier (VID) supporting IDs $1$ to $4094$.</li>\n          <li><strong>Broadcast Isolation:</strong> Broadcasts from VLAN 10 NEVER leak into VLAN 20.</li>\n          <li><strong>Inter-VLAN Routing:</strong> Traffic between different VLANs must pass through a Layer 3 device (Router or Layer 3 Switch).</li>\n        </ol>",
      "diagram": "",
      "interactiveLabKey": "frame-explorer",
      "technicalDetails": "\n        <p><strong>IEEE 802.1Q Tag Structure (4 Bytes):</strong></p>\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>Tag Protocol Identifier (TPID - 2 Bytes):</strong> Fixed value <code>0x8100</code> identifying the frame as 802.1Q tagged.</li>\n          <li><strong>Priority Code Point (PCP - 3 bits):</strong> 802.1p Quality of Service (QoS) class (0 to 7).</li>\n          <li><strong>Drop Eligible Indicator (DEI - 1 bit):</strong> Can be set to drop frame first during congestion.</li>\n          <li><strong>VLAN Identifier (VID - 12 bits):</strong> Identifies the VLAN ($2^{12} = 4096$ values; $0$ and $4095$ reserved; usable range $1$ to $4094$).</li>\n        </ul>",
      "workedExamples": {
        "level1": "<strong>Problem:</strong> PC 1 on VLAN 10 broadcasts an ARP request. Can PC 2 on VLAN 20 connected to the exact same switch hear this broadcast?<br><br>\n<strong>Solution:</strong><br>\n<strong>NO!</strong> A VLAN defines a Layer 2 broadcast boundary. The switch strictly drops or filters the broadcast from exiting any port assigned to VLAN 20.",
        "level2": "<strong>Problem:</strong> Calculate how many unique VLAN IDs can be represented in standard IEEE 802.1Q.<br><br>\n<strong>Working:</strong><br>\nThe VID field is 12 bits long.<br>\n$2^{12} = 4096$ total values.<br>\nVID 0 (priority only) and VID 4095 (reserved) are reserved.<br>\nUsable range: <strong>1 to 4094</strong> (Total 4,094 usable VLANs).",
        "level3": "<strong>Problem:</strong> How does Host A on VLAN 10 send a packet to Host B on VLAN 20?<br><br>\n<strong>Analysis:</strong><br>\nHost A realizes Host B is on a different subnet. Host A sends the frame to its Default Gateway (a router or Layer 3 switch). The router inspects the Layer 3 IP header, validates routing permissions, rewrites the Layer 2 header for VLAN 20, and dispatches the frame into VLAN 20."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Advantages</th><th>Disadvantages</th></tr></thead>\n          <tbody>\n            <tr><td>Shrinks broadcast domains; tight security isolation; flexible departmental moves without recabling.</td><td>Requires Layer 3 routing for inter-VLAN communication; misconfigurations can lead to VLAN hopping attacks.</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Corporate office networks (separating Voice VoIP, Management, Staff, and Guests).",
        "Data centers (isolating multi-tenant virtual machines).",
        "Carrier Ethernet metro networks (802.1ad QinQ double-tagging)."
      ],
      "commonMistakes": "\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>Confusing Access Ports with Trunk Ports:</strong> Access ports carry untagged frames for one VLAN. Trunk ports carry tagged frames for multiple VLANs between switches.</li>\n        </ul>",
      "quiz": [
        {
          "question": "How many bits are in the IEEE 802.1Q VLAN Identifier (VID) field?",
          "options": [
            "8 bits",
            "12 bits",
            "16 bits",
            "32 bits"
          ],
          "correctIndex": 1,
          "explanation": "The VID field is 12 bits, allowing up to 4094 usable VLANs (2^12 = 4096 minus reserved 0 and 4095)."
        },
        {
          "question": "What is the primary role of an 802.1Q Trunk port?",
          "options": [
            "To connect directly to a single printer",
            "To carry traffic for multiple VLANs between switches using 802.1Q tags",
            "To boost physical wire voltage",
            "To assign DHCP addresses"
          ],
          "correctIndex": 1,
          "explanation": "Trunk ports multiplex frames from multiple VLANs over a single physical link by adding 4-byte 802.1Q tags."
        }
      ],
      "references": [
        {
          "cite": "IEEE Std 802.1Q-2018 - Bridges and Bridged Networks.",
          "url": "https://standards.ieee.org"
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg",
      "imageCaption": "Figure: Virtual LANs (IEEE 802.1Q): Logical Network Segmentation within Physical Switches."
    },
    "prevTopicId": "arp",
    "nextTopicId": "network-layer",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg",
    "imageCaption": "Figure: Virtual LANs (IEEE 802.1Q): Logical Network Segmentation within Physical Switches."
  }
};

if (typeof window !== 'undefined') {
  window.TOPICS_U2 = TOPICS_U2;
}

if (typeof global !== 'undefined') global.TOPICS_U2 = TOPICS_U2;
if (typeof module !== 'undefined' && module.exports) module.exports = TOPICS_U2;
