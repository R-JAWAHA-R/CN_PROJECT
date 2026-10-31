// topics_u2_syllabus.js - Master Academic Topic Content Repository for Unit 2
var TOPICS_U2_SYLLABUS = {
  "u2-dll-intro": {
    "id": "u2-dll-intro",
    "title": "Introduction to Data Link Layer",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Beginner",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Forouzan Ch. 11.1 / OSI Layer 2",
    "oneLiner": "The second layer of the OSI model providing reliable node-to-node frame delivery across directly connected network devices.",
    "quickAnswer": "The Data Link Layer is the second layer of the OSI model, situated between the Physical and Network layers. It organizes raw bitstreams into frames, handles physical addressing, error detection, flow control, and arbitrates access to shared media.",
    "whyItMatters": "The Physical Layer only transmits unstructured bits without boundaries or error checks. The Data Link Layer enables meaningful, controlled communication over individual links.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "\n    <p>The <strong>Data Link Layer</strong> is the second layer of the OSI reference model, located between the Physical Layer (Layer 1) and the Network Layer (Layer 3).</p>\n    <p>Its primary responsibility is to provide communication between two directly connected network devices by organizing raw bits received from the Physical Layer into meaningful units called <strong>frames</strong>. It ensures data is transferred across a physical link in an organized and controlled manner.</p>\n    <div class=\"wiki-img-box my-4 text-center\">\n      <img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/OSI_Model_v1.svg/600px-OSI_Model_v1.svg.png\" alt=\"OSI Reference Model\" class=\"mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain\" onerror=\"this.style.display='none'\">\n      <p class=\"text-xs text-gray-500 mt-1 italic\">Figure: Data Link Layer in the OSI 7-Layer Reference Model.</p>\n    </div>\n    <h4 class=\"font-bold text-sm my-2 text-gray-900 dark:text-white\">Example Transmission: Computer A to Computer B</h4>\n    <ol class=\"wiki-ordered-list\">\n      <li>The Network Layer provides an IP packet to the Data Link Layer.</li>\n      <li>The Data Link Layer organizes the packet into a frame by prepending a header and appending a trailer.</li>\n      <li>The frame is passed down to the Physical Layer.</li>\n      <li>The Physical Layer transmits the raw bits through the cable as electrical or optical signals.</li>\n      <li>The receiving Data Link Layer receives the bits and reconstructs the frame.</li>\n      <li>It checks the frame for errors and passes the decapsulated packet up to the Network Layer.</li>\n    </ol>",
      "eli10": "In simple words: The second layer of the OSI model providing reliable node-to-node frame delivery across directly connected network devices.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "howItWorks": "\n    <p>The Data Link Layer interacts with two neighboring layers:</p>\n    <ul class=\"wiki-bullet-list\">\n      <li><strong>Network Layer (Layer 3):</strong> Receives packets, encapsulates them into frames, and provides a uniform service interface.</li>\n      <li><strong>Physical Layer (Layer 1):</strong> Transmits frames as sequences of bits and receives incoming bitstreams from the physical medium.</li>\n    </ul>",
      "diagram": "",
      "technicalDetails": "\n    <p><strong>OSI Layers and Their Respective Data Units:</strong></p>\n    <table class=\"wiki-table\">\n      <thead><tr><th>Layer</th><th>Layer Name</th><th>Data Unit (PDU)</th><th>Main Responsibility</th></tr></thead>\n      <tbody>\n        <tr><td>7</td><td>Application</td><td>Data / Message</td><td>Network services for applications</td></tr>\n        <tr><td>6</td><td>Presentation</td><td>Data</td><td>Data representation and encryption</td></tr>\n        <tr><td>5</td><td>Session</td><td>Data</td><td>Session management and dialog control</td></tr>\n        <tr><td>4</td><td>Transport</td><td>Segment / Datagram</td><td>End-to-end data delivery (TCP/UDP)</td></tr>\n        <tr><td>3</td><td>Network</td><td>Packet</td><td>Host-to-host routing across networks</td></tr>\n        <tr class=\"bg-blue-50 dark:bg-blue-900/30 font-bold\"><td>2</td><td>Data Link</td><td>Frame</td><td>Node-to-node frame delivery across links</td></tr>\n        <tr><td>1</td><td>Physical</td><td>Bits</td><td>Transmission of raw physical signals</td></tr>\n      </tbody>\n    </table>",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Introduction to Data Link Layer?<br><br><strong>Answer:</strong> The Data Link Layer is the second layer of the OSI model, situated between the Physical and Network layers. It organizes raw bitstreams into frames, handles physical addressing, error detection, flow control, and arbitrates access to shared media.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Introduction to Data Link Layer?",
          "options": [
            "The Data Link Layer is the second layer of the OSI model, si...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: The Data Link Layer is the second layer of the OSI model, situated between the Physical and Network layers. It organizes raw bitstreams into frames, handles physical addressing, error detection, flow control, and arbitrates access to shared media."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg",
      "imageCaption": "Figure: Data Link Layer (OSI Layer 2) Position & Node-to-Node Delivery in the OSI Reference Model."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg",
    "imageCaption": "Figure: Data Link Layer (OSI Layer 2) Position & Node-to-Node Delivery in the OSI Reference Model."
  },
  "u2-dll-osi-position": {
    "id": "u2-dll-osi-position",
    "title": "Position in the OSI Model",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Beginner",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "ISO 7498-1 / OSI Architecture",
    "oneLiner": "Layer 2's role bridging hardware-level signal transmission and software-driven logical routing.",
    "quickAnswer": "The Data Link Layer is Layer 2 of the OSI model, located directly above the Physical Layer (Layer 1) and below the Network Layer (Layer 3). It translates physical bit pulses into logical frames.",
    "whyItMatters": "Properly distinguishing Layer 2 from Layer 1 and Layer 3 is crucial for designing network equipment like switches, NIC drivers, and understanding MAC vs IP addresses.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "\n    <p>The Data Link Layer occupies Layer 2 in the 7-layer OSI model. It acts as the mediator between the hardware-specific world of bits and signals and the logical, software-driven world of IP packets and internetwork routing.</p>\n    <div class=\"wiki-img-box my-4 text-center\">\n      <img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Frame_data_link_layer.svg/600px-Frame_data_link_layer.svg.png\" alt=\"Frame Data Link Layer\" class=\"mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain\" onerror=\"this.style.display='none'\">\n      <p class=\"text-xs text-gray-500 mt-1 italic\">Figure: Data Link Layer Frame encapsulation structure with Header, Payload, and Trailer.</p>\n    </div>",
      "eli10": "In simple words: Layer 2's role bridging hardware-level signal transmission and software-driven logical routing.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "howItWorks": "\n    <p><strong>Physical Layer vs Data Link Layer (PDF Section 8.1 Comparison):</strong></p>\n    <table class=\"wiki-table\">\n      <thead><tr><th>Feature</th><th>Physical Layer (Layer 1)</th><th>Data Link Layer (Layer 2)</th></tr></thead>\n      <tbody>\n        <tr><td><strong>Position</strong></td><td>Layer 1</td><td>Layer 2</td></tr>\n        <tr><td><strong>Data Unit</strong></td><td>Transmits raw bits</td><td>Transmits structured frames</td></tr>\n        <tr><td><strong>Scope of Operation</strong></td><td>Deals with electrical, optical, radio signals</td><td>Deals with frame organization and link control</td></tr>\n        <tr><td><strong>Service Provided</strong></td><td>Defines physical transmission characteristics</td><td>Provides reliable link services to Network Layer</td></tr>\n        <tr><td><strong>Concern</strong></td><td>Bit transmission over wire</td><td>Node-to-node frame delivery and flow/error control</td></tr>\n      </tbody>\n    </table>",
      "diagram": "",
      "technicalDetails": "\n    <p><strong>Comparison of Addresses (PDF Section 2.6):</strong></p>\n    <table class=\"wiki-table\">\n      <thead><tr><th>Attribute</th><th>Physical Address (MAC)</th><th>Logical Address (IP)</th></tr></thead>\n      <tbody>\n        <tr><td><strong>Layer</strong></td><td>Data Link Layer (Layer 2)</td><td>Network Layer (Layer 3)</td></tr>\n        <tr><td><strong>Scope</strong></td><td>Used for delivery over a local link</td><td>Used for communication across interconnected networks</td></tr>\n        <tr><td><strong>Format</strong></td><td>48-bit hex (e.g., <code>00:1A:2B:3C:4D:5E</code>)</td><td>32-bit (IPv4) or 128-bit (IPv6)</td></tr>\n      </tbody>\n    </table>",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Position in the OSI Model?<br><br><strong>Answer:</strong> The Data Link Layer is Layer 2 of the OSI model, located directly above the Physical Layer (Layer 1) and below the Network Layer (Layer 3). It translates physical bit pulses into logical frames.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Position in the OSI Model?",
          "options": [
            "The Data Link Layer is Layer 2 of the OSI model, located dir...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: The Data Link Layer is Layer 2 of the OSI model, located directly above the Physical Layer (Layer 1) and below the Network Layer (Layer 3). It translates physical bit pulses into logical frames."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg",
      "imageCaption": "Figure: Position of Data Link Layer between Physical (L1) and Network (L3) Layers."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg",
    "imageCaption": "Figure: Position of Data Link Layer between Physical (L1) and Network (L3) Layers."
  },
  "u2-dll-functions": {
    "id": "u2-dll-functions",
    "title": "Functions and Responsibilities of Data Link Layer",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Beginner",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Forouzan Ch. 11 / Tanenbaum Ch. 3",
    "oneLiner": "The 5 critical duties: Framing, Physical Addressing, Flow Control, Error Control, and Access Control.",
    "quickAnswer": "The Data Link Layer has 5 core responsibilities: (1) Framing (grouping bits into frames), (2) Physical Addressing (hardware MAC addresses), (3) Flow Control (preventing buffer overflow), (4) Error Control (detecting and recovering damaged frames), and (5) Access Control (arbitrating shared channels).",
    "whyItMatters": "These 5 functions represent the complete problem space solved by every Layer 2 protocol in existence.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "\n    <p>As detailed in Behrouz A. Forouzan's textbook (Chapter 11), the Data Link Layer is tasked with five critical functions:</p>\n    <ol class=\"wiki-ordered-list\">\n      <li><strong>Framing:</strong> Divides the stream of bits into manageable units called frames.</li>\n      <li><strong>Physical Addressing:</strong> Uses hardware addresses (MAC) to identify devices on a local link.</li>\n      <li><strong>Flow Control:</strong> Prevents a fast sender from overwhelming a slower receiver.</li>\n      <li><strong>Error Control:</strong> Helps detect damaged or lost frames and coordinates retransmission via ARQ.</li>\n      <li><strong>Access Control:</strong> Determines which device can use a shared communication medium at any given time.</li>\n    </ol>",
      "eli10": "In simple words: The 5 critical duties: Framing, Physical Addressing, Flow Control, Error Control, and Access Control.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "howItWorks": "\n    <p><strong>Framing vs Flow Control vs Error Control (PDF Section 8.2 Comparison):</strong></p>\n    <table class=\"wiki-table\">\n      <thead><tr><th>Feature</th><th>Framing</th><th>Flow Control</th><th>Error Control</th></tr></thead>\n      <tbody>\n        <tr><td><strong>Function</strong></td><td>Organizes bits into frames</td><td>Regulates transmission rate</td><td>Handles transmission errors</td></tr>\n        <tr><td><strong>Purpose</strong></td><td>Identifies frame boundaries</td><td>Prevents receiver overload</td><td>Helps detect and recover from errors</td></tr>\n        <tr><td><strong>Mechanisms</strong></td><td>Uses delimiters, length fields, or stuffing</td><td>Uses acknowledgements or window mechanisms</td><td>Uses detection codes (CRC), ACKs, timers, ARQ</td></tr>\n      </tbody>\n    </table>",
      "diagram": "",
      "technicalDetails": "\n    <p><strong>Summary of Design Issues (PDF Section 2.8):</strong></p>\n    <table class=\"wiki-table\">\n      <thead><tr><th>Design Issue</th><th>Purpose</th></tr></thead>\n      <tbody>\n        <tr><td>Service Interface</td><td>Provides well-defined services to the Network Layer</td></tr>\n        <tr><td>Framing</td><td>Divides continuous bit stream into frames</td></tr>\n        <tr><td>Flow Control</td><td>Prevents receiver buffer overload</td></tr>\n        <tr><td>Error Control</td><td>Detects and handles transmission errors</td></tr>\n        <tr><td>Physical Addressing</td><td>Identifies devices on a local link</td></tr>\n        <tr><td>Access Control</td><td>Controls the use of a shared medium</td></tr>\n      </tbody>\n    </table>",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Functions and Responsibilities of Data Link Layer?<br><br><strong>Answer:</strong> The Data Link Layer has 5 core responsibilities: (1) Framing (grouping bits into frames), (2) Physical Addressing (hardware MAC addresses), (3) Flow Control (preventing buffer overflow), (4) Error Control (detecting and recovering damaged frames), and (5) Access Control (arbitrating shared channels).",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Functions and Responsibilities of Data Link Layer?",
          "options": [
            "The Data Link Layer has 5 core responsibilities: (1) Framing...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: The Data Link Layer has 5 core responsibilities: (1) Framing (grouping bits into frames), (2) Physical Addressing (hardware MAC addresses), (3) Flow Control (preventing buffer overflow), (4) Error Control (detecting and recovering damaged frames), and (5) Access Control (arbitrating shared channels)."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg",
      "imageCaption": "Figure: 5 Core Functions of Data Link Layer: Framing, Physical Addressing, Flow Control, Error Control, and MAC."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg",
    "imageCaption": "Figure: 5 Core Functions of Data Link Layer: Framing, Physical Addressing, Flow Control, Error Control, and MAC."
  },
  "u2-dll-services": {
    "id": "u2-dll-services",
    "title": "Services Provided to the Network Layer",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Forouzan Ch. 11.1 / Tanenbaum Ch. 3.1",
    "oneLiner": "The three classic service models: Unacknowledged Connectionless, Acknowledged Connectionless, and Acknowledged Connection-Oriented.",
    "quickAnswer": "The Data Link Layer provides three classes of service: Unacknowledged Connectionless (fast, no ACKs, e.g., Ethernet), Acknowledged Connectionless (independent frames with ACKs, e.g., 802.11 Wi-Fi), and Acknowledged Connection-Oriented (established logical connection, guaranteed order, e.g., HDLC).",
    "whyItMatters": "Different transmission channels have different error rates. Matching the service class to the channel maximizes throughput while maintaining required reliability.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "\n    <p>The Data Link Layer provides three primary service models to the Network Layer (PDF Section 3):</p>\n    <div class=\"space-y-4 my-4\">\n      <div class=\"p-3 bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded\">\n        <strong>1. Unacknowledged Connectionless Service:</strong>\n        <p class=\"text-xs mt-1\">Sends independent frames without establishing a connection and without expecting acknowledgements. Lost frames are not recovered at Layer 2. Ideal for low-error media like Ethernet LANs.</p>\n      </div>\n      <div class=\"p-3 bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded\">\n        <strong>2. Acknowledged Connectionless Service:</strong>\n        <p class=\"text-xs mt-1\">Frames are sent independently, but each frame is acknowledged by the receiver. If an ACK does not arrive within a timeout, the frame is retransmitted. Used in wireless links (IEEE 802.11 Wi-Fi).</p>\n      </div>\n      <div class=\"p-3 bg-purple-50/50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded\">\n        <strong>3. Acknowledged Connection-Oriented Service:</strong>\n        <p class=\"text-xs mt-1\">Establishes a logical connection prior to data transfer. Consists of 3 phases: Connection Establishment, Data Transfer, and Connection Termination. Guaranteed ordered delivery.</p>\n      </div>\n    </div>",
      "eli10": "In simple words: The three classic service models: Unacknowledged Connectionless, Acknowledged Connectionless, and Acknowledged Connection-Oriented.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "howItWorks": "\n    <p><strong>Master Comparison Table (PDF Section 3.4):</strong></p>\n    <table class=\"wiki-table\">\n      <thead><tr><th>Feature</th><th>Unacknowledged Connectionless</th><th>Acknowledged Connectionless</th><th>Acknowledged Connection-Oriented</th></tr></thead>\n      <tbody>\n        <tr><td><strong>Connection Setup</strong></td><td>No</td><td>No</td><td>Yes</td></tr>\n        <tr><td><strong>Acknowledgement</strong></td><td>No</td><td>Yes</td><td>Yes</td></tr>\n        <tr><td><strong>Frame Recovery</strong></td><td>Not provided by this service</td><td>Yes (retransmissions)</td><td>Yes (retransmissions)</td></tr>\n        <tr><td><strong>Ordering</strong></td><td>Not guaranteed</td><td>Not generally guaranteed</td><td>Maintained strictly</td></tr>\n        <tr><td><strong>Complexity</strong></td><td>Low</td><td>Medium</td><td>High</td></tr>\n        <tr><td><strong>Overhead</strong></td><td>Low</td><td>Higher</td><td>Higher</td></tr>\n        <tr><td><strong>Typical Use</strong></td><td>Traditional Ethernet data frames</td><td>Wireless frame delivery (802.11)</td><td>Reliable link-oriented communication</td></tr>\n      </tbody>\n    </table>",
      "diagram": "",
      "technicalDetails": "\n    <p><strong>Important Distinction (PDF Section 3.4 Note):</strong></p>\n    <p class=\"text-xs\">These are Data Link Layer service categories. They must not be confused with the connection-oriented (TCP) and connectionless (UDP) services of the Transport Layer. Transport services operate end-to-end across multiple routers, whereas Data Link services operate strictly across a single hop.</p>",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Services Provided to the Network Layer?<br><br><strong>Answer:</strong> The Data Link Layer provides three classes of service: Unacknowledged Connectionless (fast, no ACKs, e.g., Ethernet), Acknowledged Connectionless (independent frames with ACKs, e.g., 802.11 Wi-Fi), and Acknowledged Connection-Oriented (established logical connection, guaranteed order, e.g., HDLC).",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Services Provided to the Network Layer?",
          "options": [
            "The Data Link Layer provides three classes of service: Unack...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: The Data Link Layer provides three classes of service: Unacknowledged Connectionless (fast, no ACKs, e.g., Ethernet), Acknowledged Connectionless (independent frames with ACKs, e.g., 802.11 Wi-Fi), and Acknowledged Connection-Oriented (established logical connection, guaranteed order, e.g., HDLC)."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg",
      "imageCaption": "Figure: Services Provided to the Network Layer: Unacknowledged Connectionless, Acknowledged Connectionless, and Connection-Oriented."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg",
    "imageCaption": "Figure: Services Provided to the Network Layer: Unacknowledged Connectionless, Acknowledged Connectionless, and Connection-Oriented."
  },
  "u2-error-control": {
    "id": "u2-error-control",
    "title": "Error Control in the Data Link Layer",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Forouzan Ch. 11.2 / Tanenbaum Ch. 3.4",
    "oneLiner": "Detecting and handling damaged, lost, or duplicated frames using CRC, ACKs, timers, and ARQ.",
    "quickAnswer": "Error control is a mechanism used by the Data Link Layer to detect and handle transmission errors that occur due to noise, attenuation, or interference. It utilizes error detection (e.g., CRC-32), positive ACKs, negative NAKs, retransmission timers, sequence numbers, and Automatic Repeat Request (ARQ).",
    "whyItMatters": "Without error control, bit errors caused by physical interference would corrupt user files, protocols, and application payloads undetected.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "\n    <p>Transmission errors occur when frames are damaged, lost, or duplicated during transit due to electrical noise, signal attenuation, or wireless interference. Error control ensures that the receiver obtains accurate, uncorrupted data (PDF Section 6).</p>\n    <div class=\"wiki-img-box my-4 text-center\">\n      <img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Stop-and-wait_ARQ.svg/500px-Stop-and-wait_ARQ.svg.png\" alt=\"Stop and wait ARQ\" class=\"mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain\" onerror=\"this.style.display='none'\">\n      <p class=\"text-xs text-gray-500 mt-1 italic\">Figure: Automatic Repeat Request (ARQ) retransmission mechanism on timeout.</p>\n    </div>",
      "eli10": "In simple words: Detecting and handling damaged, lost, or duplicated frames using CRC, ACKs, timers, and ARQ.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "howItWorks": "\n    <p><strong>Main Functions of Error Control:</strong></p>\n    <ol class=\"wiki-ordered-list\">\n      <li><strong>Error Detection:</strong> Receiver calculates Frame Check Sequence (CRC) to detect bit alterations.</li>\n      <li><strong>Acknowledgement (ACK):</strong> Receiver confirms successful receipt of error-free frames.</li>\n      <li><strong>Negative Acknowledgement (NAK):</strong> Informs sender that a received frame was damaged.</li>\n      <li><strong>Retransmission:</strong> Sender resends damaged or lost frames.</li>\n      <li><strong>Sequence Numbering:</strong> Identifies frames to detect duplicate or out-of-order deliveries.</li>\n      <li><strong>Timers:</strong> Sender detects missing ACKs when the timer expires.</li>\n    </ol>",
      "diagram": "",
      "technicalDetails": "\n    <p><strong>Flow Control vs Error Control (PDF Section 6.6):</strong></p>\n    <table class=\"wiki-table\">\n      <thead><tr><th>Feature</th><th>Flow Control</th><th>Error Control</th></tr></thead>\n      <tbody>\n        <tr><td><strong>Primary Duty</strong></td><td>Controls the rate of data transmission</td><td>Handles transmission errors</td></tr>\n        <tr><td><strong>Key Problem Solved</strong></td><td>Prevents receiver overload</td><td>Helps recover from damaged or lost frames</td></tr>\n        <tr><td><strong>Root Cause</strong></td><td>Manages sender and receiver speed differences</td><td>Manages frame delivery problems from noise/loss</td></tr>\n        <tr><td><strong>Key Methods</strong></td><td>Stop-and-Wait, Sliding Window</td><td>CRC-32, ARQ (Stop-and-Wait, GBN, SR)</td></tr>\n        <tr><td><strong>Focus</strong></td><td>Focuses on receiver capacity</td><td>Focuses on data correctness and recovery</td></tr>\n      </tbody>\n    </table>",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Error Control in the Data Link Layer?<br><br><strong>Answer:</strong> Error control is a mechanism used by the Data Link Layer to detect and handle transmission errors that occur due to noise, attenuation, or interference. It utilizes error detection (e.g., CRC-32), positive ACKs, negative NAKs, retransmission timers, sequence numbers, and Automatic Repeat Request (ARQ).",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Error Control in the Data Link Layer?",
          "options": [
            "Error control is a mechanism used by the Data Link Layer to ...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Error control is a mechanism used by the Data Link Layer to detect and handle transmission errors that occur due to noise, attenuation, or interference. It utilizes error detection (e.g., CRC-32), positive ACKs, negative NAKs, retransmission timers, sequence numbers, and Automatic Repeat Request (ARQ)."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/02/CRC8-gen.gif",
      "imageCaption": "Figure: Error Control via Cyclic Redundancy Check (CRC) Polynomial Division & ARQ Retransmission."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/02/CRC8-gen.gif",
    "imageCaption": "Figure: Error Control via Cyclic Redundancy Check (CRC) Polynomial Division & ARQ Retransmission."
  },
  "u2-dll-protocols-intro": {
    "id": "u2-dll-protocols-intro",
    "title": "Introduction to Data Link Layer Protocols",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "topicNumber": 2,
    "subtopicNumber": 1,
    "whyItMatters": "The Physical Layer only transmits an unstructured stream of bits with no flow control or error detection. Data Link Layer protocols establish the formal communication rules, framing, and reliability mechanisms necessary to transfer data error-free between directly connected nodes.",
    "prerequisitesList": [
      {
        "concept": "OSI Reference Model",
        "meaning": "Layer 2 positioning directly above the Physical Layer and below the Network Layer"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Frame transmission across a single physical link connecting two adjacent network devices"
      },
      {
        "concept": "Framing & Bitstreams",
        "meaning": "Packaging Network Layer packets with headers and trailers for physical signaling"
      }
    ],
    "learningObjectives": [
      "Define the formal purpose, scope, and operational responsibilities of Data Link Layer protocols.",
      "Identify the 6 critical transmission failure modes that necessitate link-layer protocol rules.",
      "Explain the 5 core assumptions outlined in Forouzan's protocol models.",
      "Understand the principles of flow control, error control, and the concept of bidirectional piggybacking."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1 / RFC 1661 (PPP)",
      "type": "Protocol Architectural Foundation",
      "prerequisites": [
        "u2-dll-intro",
        "framing"
      ],
      "relatedConcepts": [
        "u2-protocol-classification",
        "stop-and-wait",
        "go-back-n",
        "flow-control"
      ],
      "compareWith": [
        "comparison-noiseless-noisy"
      ],
      "primaryUses": [
        "Point-to-point links (PPP/HDLC), Ethernet LANs (IEEE 802.3), Wi-Fi (IEEE 802.11)"
      ]
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg",
    "imageCaption": "Figure: Position of Data Link Layer Protocols in the 7-Layer OSI Architecture (Behrouz A. Forouzan, Chapter 11).",
    "sections": {
      "overview": "\n      <p>A <strong>Data Link Layer Protocol</strong> is a formal set of specifications, timing rules, and procedural conventions that governs how data frames are transmitted, verified, and managed between two directly connected network stations.</p>\n      <p>According to <em>Behrouz A. Forouzan (Data Communications and Networking, 4th Edition, Chapter 11 – Data Link Control)</em>, the protocol defines how sender and receiver interact across a physical medium, how transmission rates are harmonized, and how channel imperfections such as noise, attenuation, and buffer overflow are handled systematically.</p>\n      \n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mt-4 mb-2\">The Six Essential Functions Defined by a DLL Protocol</h3>\n      <ol class=\"wiki-ordered-list\">\n        <li><strong>Frame Construction and Transmission:</strong> Specifying how packets from the Network Layer are encapsulated into frames with addressing headers and error-checking trailers (FCS).</li>\n        <li><strong>Frame Reception and Validation:</strong> Specifying how the receiver parses incoming signals, verifies frame boundaries, checks integrity, and extracts the payload.</li>\n        <li><strong>Flow Control:</strong> Regulating the transmission rate of the sender so that a fast transmitting station never overruns the buffer capacity of a slower receiving station.</li>\n        <li><strong>Acknowledgement Feedback:</strong> Establishing formal handshakes using positive control frames (ACK) or negative control frames (NAK) to report delivery status.</li>\n        <li><strong>Error Detection and Recovery:</strong> Identifying corrupted, lost, or truncated frames and coordinating retransmission via Automatic Repeat reQuest (ARQ).</li>\n        <li><strong>Duplicate Frame Identification:</strong> Employing sequence numbers to ensure that duplicate frames resulting from delayed or lost acknowledgements are recognized and safely discarded.</li>\n      </ol>\n    ",
      "eli10": "Imagine you are sending numbered letters to your friend across a windy bridge. A protocol is the exact set of rules you both agree to follow: how you write the address on the envelope, how fast you send them, how your friend writes back a postcard saying 'I received letter #1', and what to do if a letter blows away in the wind.",
      "analogy": "A Data Link Layer protocol is like the air traffic control protocol between an airport control tower and an approaching aircraft: before landing, strict radio call-and-response handshakes ensure no runway collisions occur and that commands are clearly acknowledged.",
      "howItWorks": "\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mb-2\">Why Data Link Layer Protocols are Required: 6 Failure Scenarios</h3>\n      <p>When two hardware devices communicate over a real physical medium, several unavoidable physical and architectural failures can occur:</p>\n      <ul class=\"wiki-bullet-list\">\n        <li><strong>Receiver Buffer Overrun:</strong> The sender transmits frames at high hardware clock speed, exceeding the receiver's software processing or storage capacity. Unprocessed frames are dropped silently.</li>\n        <li><strong>Frame Corruption / Bit Alteration:</strong> Thermal noise, electromagnetic interference, and signal attenuation alter 0s into 1s and vice versa.</li>\n        <li><strong>Complete Frame Loss:</strong> A severe noise burst destroys frame delimiters or intermediate network hardware drops the frame entirely.</li>\n        <li><strong>Lost Acknowledgements:</strong> The receiver successfully accepts the frame and dispatches an ACK, but the ACK is corrupted or lost in transit back to the sender.</li>\n        <li><strong>Duplicate Frame Reception:</strong> Due to a lost or delayed ACK, the sender assumes the original frame was lost and retransmits. Without sequence tracking, the receiver would deliver duplicate data to the application.</li>\n        <li><strong>Out-of-Order Delivery:</strong> Frames traversing multi-path channels or experiencing selective retransmission arrive out of sequence, requiring reordering before delivery to the Network Layer.</li>\n      </ul>\n\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mt-4 mb-2\">Five Fundamental Assumptions in Forouzan's Protocol Models</h3>\n      <p>To analyze link-layer protocols rigorously, Forouzan establishes five foundational architectural assumptions:</p>\n      <ol class=\"wiki-ordered-list\">\n        <li><strong>Unidirectional Data Flow:</strong> Data frames travel strictly in one direction from the transmitting station (sender) to the receiving station (receiver).</li>\n        <li><strong>Reverse Control Signaling:</strong> Control feedback frames (ACK and NAK) travel in the opposite direction from receiver to sender.</li>\n        <li><strong>Network Layer Service Interface:</strong> The sender obtains data packets on demand from its local Network Layer (Layer 3).</li>\n        <li><strong>Reliable Layer 3 Delivery:</strong> The receiver delivers verified, error-free, and in-sequence packets up to its local Network Layer.</li>\n        <li><strong>Concurrent State Machines:</strong> Both sender and receiver execute concurrent, event-driven algorithms responding to packet arrivals, frame timeouts, and physical signal interrupts.</li>\n      </ol>\n\n      <div class=\"wiki-callout note mt-4\">\n        <div class=\"callout-header font-bold text-blue-800 dark:text-blue-300\">💡 Modern Bidirectional Operation: Piggybacking</div>\n        <p class=\"text-xs text-gray-700 dark:text-gray-300 mt-1\">While theoretical models separate data and ACK paths, practical full-duplex protocols employ <strong>Piggybacking</strong>: when Station B has data to send back to Station A, it attaches (piggybacks) the ACK sequence number for Station A's received frame into the header of its own outgoing data frame, saving link bandwidth and reducing header overhead.</p>\n      </div>\n    ",
      "diagram": "",
      "technicalDetails": "\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mb-2\">Protocol Architecture & State Transitions</h3>\n      <p>A link layer protocol is formally represented as an event-driven Finite State Machine (FSM). The sender and receiver transition between distinct states based on internal events and external channel signals:</p>\n      <table class=\"wiki-table\">\n        <thead>\n          <tr>\n            <th>Protocol Component</th>\n            <th>Sender Responsibilities</th>\n            <th>Receiver Responsibilities</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><strong>State Transition</strong></td>\n            <td>Ready &rarr; Sending &rarr; Blocking / Waiting for ACK</td>\n            <td>Listening &rarr; Receiving &rarr; Checking CRC &rarr; Delivering &rarr; ACKing</td>\n          </tr>\n          <tr>\n            <td><strong>Buffer Management</strong></td>\n            <td>Maintains send window buffer for unacknowledged frames</td>\n            <td>Maintains receive window buffer for out-of-order frames</td>\n          </tr>\n          <tr>\n            <td><strong>Timer Management</strong></td>\n            <td>Starts retransmission timer upon transmitting frame; cancels timer upon valid ACK</td>\n            <td>Optional delayed-ACK timer to support piggybacking</td>\n          </tr>\n          <tr>\n            <td><strong>Header Fields</strong></td>\n            <td>Sequence Number ($S$), Frame Type, Destination MAC</td>\n            <td>Acknowledgement Number ($R$), Receive Window Size ($W_r$)</td>\n          </tr>\n        </tbody>\n      </table>\n    ",
      "workedExamples": {
        "level1": "<strong>Question:</strong> State the primary distinction between a physical layer transmission and a data link layer protocol.<br><br><strong>Answer:</strong> The physical layer is concerned solely with moving raw, uninterpreted electrical, optical, or radio bits over a transmission medium. It has no awareness of data structure, boundaries, errors, or recipient capacity. A Data Link Layer protocol organizes these raw bits into structured frames, provides physical addressing, regulates transmission rates through flow control, and ensures data reliability through error detection and retransmission.",
        "level2": "<strong>Scenario:</strong> Sender A transmits a data frame to Receiver B. B receives the frame correctly and sends an ACK. The ACK is destroyed by channel noise. Describe what occurs next under a standard ARQ protocol.<br><br><strong>Answer:</strong><br>1. Sender A started a retransmission timer when sending the frame.<br>2. Because the ACK was lost, A's timer expires (timeout occurs).<br>3. Sender A retransmits the exact same frame with the original sequence number (e.g., Frame 0).<br>4. Receiver B receives Frame 0 again. By inspecting the sequence number, B detects that Frame 0 is a duplicate.<br>5. Receiver B safely discards the duplicate frame to avoid corrupting upper-layer data.<br>6. Receiver B re-sends ACK 1 to unblock Sender A.",
        "level3": "<strong>Analysis:</strong> Why cannot a data link protocol rely solely on error detection without sequence numbers for reliable transmission?<br><br><strong>Answer:</strong> Error detection mechanisms (like CRC) only indicate whether an individual received frame is intact or corrupted. If an acknowledgement is lost in the reverse channel, the sender is forced to retransmit. Without sequence numbers, the receiver has no way to determine whether an arriving frame is a brand-new data packet or a retransmission of the packet it just processed. This leads to silent data duplication in application files."
      },
      "advantagesLimitations": "\n      <table class=\"wiki-table\">\n        <thead>\n          <tr>\n            <th>Protocol Mechanism</th>\n            <th>Major Advantages</th>\n            <th>Architectural Limitations / Overheads</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><strong>Framing & CRC</strong></td>\n            <td>Guarantees frame boundary detection and virtually 100% bit error detection.</td>\n            <td>Adds transmission overhead (preamble, headers, trailers, FCS bits).</td>\n          </tr>\n          <tr>\n            <td><strong>Flow Control</strong></td>\n            <td>Prevents buffer exhaustion and packet drops at slower receiver nodes.</td>\n            <td>Can throttle high-speed transmitters and introduce round-trip idle time.</td>\n          </tr>\n          <tr>\n            <td><strong>ARQ Retransmissions</strong></td>\n            <td>Transforms an unreliable physical link into a deterministic, reliable communication channel.</td>\n            <td>Requires buffer allocation, timer tracking, and wastes bandwidth upon error bursts.</td>\n          </tr>\n        </tbody>\n      </table>\n    ",
      "whereUsed": [
        "Point-to-Point Protocol (PPP - RFC 1661) used over leased lines and broadband links.",
        "High-Level Data Link Control (HDLC) standard for synchronous serial lines.",
        "IEEE 802.3 Ethernet MAC sublayer protocol governing local wired networks.",
        "IEEE 802.11 Wi-Fi MAC protocol with CSMA/CA and Link-Layer ARQ."
      ],
      "quiz": [
        {
          "question": "What is the primary function of sequence numbers in a Data Link Layer protocol?",
          "options": [
            "To allow the receiver to identify and discard duplicate frames caused by lost acknowledgements",
            "To encrypt the data payload for physical layer security",
            "To calculate the cyclic redundancy check (CRC) remainder",
            "To compress the frame payload and increase link speed"
          ],
          "correct": 0,
          "explanation": "Sequence numbers allow the receiver to distinguish between a new incoming frame and a duplicate retransmission caused by a lost or delayed acknowledgement."
        },
        {
          "question": "Under Forouzan's protocol models, what is the assumed direction of data frames and control frames?",
          "options": [
            "Data frames travel sender-to-receiver; control frames (ACK/NAK) travel receiver-to-sender",
            "Both data and control frames travel exclusively in both directions simultaneously",
            "Data frames travel receiver-to-sender; control frames travel sender-to-receiver",
            "Control frames are never transmitted across the physical medium"
          ],
          "correct": 0,
          "explanation": "Forouzan's elementary models assume unidirectional data frame flow from sender to receiver, with reverse control feedback (ACK/NAK) flowing from receiver to sender."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11 (Data Link Control), Section 11.4.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 5th Edition, Chapter 3 (The Data Link Layer).",
          "url": ""
        }
      ]
    }
  },
  "u2-protocol-classification": {
    "id": "u2-protocol-classification",
    "title": "Classification of Protocols",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "topicNumber": 2,
    "subtopicNumber": 2,
    "whyItMatters": "Classifying Data Link Layer protocols according to channel characteristics—noiseless vs. noisy—provides the fundamental conceptual framework required to understand why complex mechanisms like sequence numbers, sliding windows, and timers are necessary in real-world networking.",
    "prerequisitesList": [
      {
        "concept": "u2-dll-protocols-intro",
        "meaning": "Foundations and failure modes of link layer protocols"
      },
      {
        "concept": "Transmission Channels",
        "meaning": "Physical medium characteristics: ideal error-free channels vs. channels subject to noise, loss, and delay"
      }
    ],
    "learningObjectives": [
      "Differentiate between noiseless (ideal) and noisy (realistic) communication channels.",
      "Map the 5 standard Forouzan protocols into their respective channel categories.",
      "Understand why noiseless protocols serve as pedagogical stepping stones for noisy-channel ARQ protocols.",
      "Identify the specific control features introduced at each step of protocol evolution."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "Forouzan Academic Taxonomy (Ch. 11.4 & 11.5)",
      "type": "Protocol Classification Hierarchy",
      "prerequisites": [
        "u2-dll-protocols-intro"
      ],
      "relatedConcepts": [
        "simplex-protocol",
        "stop-and-wait-noiseless",
        "stop-and-wait",
        "go-back-n",
        "selective-repeat"
      ],
      "compareWith": [
        "comparison-noiseless-noisy"
      ],
      "primaryUses": [
        "Protocol design, performance modeling, communication theory education"
      ]
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Multiple_Access.png",
    "imageCaption": "Figure: Classification Taxonomy of Data Link Layer Protocols into Noiseless and Noisy Categories.",
    "sections": {
      "overview": "\n      <p>In his authoritative textbook <em>Data Communications and Networking (4th Edition, Chapter 11)</em>, <strong>Behrouz A. Forouzan</strong> classifies Data Link Layer protocols into two distinct categories based on the characteristics of the physical communication channel:</p>\n      \n      <div class=\"wiki-callout note my-4\">\n        <h4 class=\"font-bold text-gray-900 dark:text-white mb-2\">Forouzan's Protocol Classification Tree</h4>\n        <ul class=\"wiki-bullet-list\">\n          <li><strong>1. Protocols for Noiseless Channels (Ideal Channels):</strong>\n            <ul class=\"list-disc pl-5 mt-1 space-y-1\">\n              <li><strong>Simplest Protocol:</strong> No flow control, no error control.</li>\n              <li><strong>Stop-and-Wait Protocol:</strong> Flow control added (1-frame ACK), no error control.</li>\n            </ul>\n          </li>\n          <li><strong>2. Protocols for Noisy Channels (Realistic Channels):</strong>\n            <ul class=\"list-disc pl-5 mt-1 space-y-1\">\n              <li><strong>Stop-and-Wait ARQ:</strong> Flow control + error control (1-bit sequence numbers alternating 0/1, timers, retransmission).</li>\n              <li><strong>Go-Back-N ARQ:</strong> Pipelined sliding window ($W_s = 2^m - 1, W_r = 1$), cumulative ACKs, retransmits lost frame + all subsequent frames.</li>\n              <li><strong>Selective Repeat ARQ:</strong> Pipelined sliding window ($W_s = W_r = 2^{m-1}$), receiver buffering, retransmits only the damaged frame.</li>\n            </ul>\n          </li>\n        </ul>\n      </div>\n\n      <p>This progressive classification starts with an unattainable theoretical ideal (the noiseless channel) to isolate flow control mechanisms, then introduces channel noise and packet loss to demonstrate why sequence numbers, retransmission timers, and sliding windows are strictly required.</p>\n    ",
      "eli10": "Think of communication protocols like learning to drive. Noiseless protocols are like practicing on an empty test track with no other cars and perfect weather—you only focus on steering. Noisy protocols are like driving on a busy, rainy highway—you need windshield wipers, headlights, brakes, turn signals, and mirrors to handle real-world dangers.",
      "analogy": "Studying noiseless protocols before noisy protocols is like studying frictionless physics ($F=ma$) in high school before learning about air resistance and friction in advanced engineering.",
      "howItWorks": "\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mb-2\">Noiseless Channel vs. Noisy Channel Characteristics</h3>\n      \n      <h4 class=\"font-bold text-sm text-gray-900 dark:text-white mt-3\">1. Noiseless Channel Model (Ideal Assumption)</h4>\n      <p>A noiseless channel is an idealized communication channel in which transmission errors do not occur. For studying noiseless protocols, four fundamental assumptions are made:</p>\n      <ul class=\"wiki-bullet-list\">\n        <li>Every transmitted frame reaches the receiver without bit corruption.</li>\n        <li>Frames are never dropped, damaged, or lost in transit.</li>\n        <li>Frames are never duplicated by the channel.</li>\n        <li>Frames always arrive in the exact order in which they were transmitted.</li>\n      </ul>\n      <p class=\"text-xs text-gray-500 italic mt-1\">Note: In real physical environments, a truly noiseless channel does not exist; it is a conceptual model used to isolate flow control from error recovery.</p>\n\n      <h4 class=\"font-bold text-sm text-gray-900 dark:text-white mt-3\">2. Noisy Channel Model (Realistic Channel)</h4>\n      <p>A noisy channel reflects real-world physical transmission media (copper wire, fiber optic, wireless radio) where signal degradation and hardware limitations occur:</p>\n      <ul class=\"wiki-bullet-list\">\n        <li>Frames may be damaged: Noise alters bit values, causing CRC checksum verification to fail.</li>\n        <li>Frames may be lost: Severe noise obliterates frame delimiters, or intermediate router buffers overflow.</li>\n        <li>Acknowledgements may be lost: Return ACK/NAK control packets can be corrupted or dropped.</li>\n        <li>Frames may arrive out of order: Multi-path transmission or retransmissions can scramble sequential delivery.</li>\n      </ul>\n    ",
      "diagram": "",
      "technicalDetails": "\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mb-2\">Comparative Evolution Matrix of the Five Protocols</h3>\n      <table class=\"wiki-table\">\n        <thead>\n          <tr>\n            <th>Protocol</th>\n            <th>Channel Type</th>\n            <th>Flow Control?</th>\n            <th>Error Control?</th>\n            <th>Sequence Bits ($m$)</th>\n            <th>Sender Window ($W_s$)</th>\n            <th>Receiver Window ($W_r$)</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><strong>Simplest Protocol</strong></td>\n            <td>Noiseless</td>\n            <td>None</td>\n            <td>None</td>\n            <td>None</td>\n            <td>1</td>\n            <td>1</td>\n          </tr>\n          <tr>\n            <td><strong>Stop-and-Wait</strong></td>\n            <td>Noiseless</td>\n            <td>Yes (1-frame ACK)</td>\n            <td>None</td>\n            <td>None</td>\n            <td>1</td>\n            <td>1</td>\n          </tr>\n          <tr class=\"bg-blue-50 dark:bg-blue-900/30\">\n            <td><strong>Stop-and-Wait ARQ</strong></td>\n            <td>Noisy</td>\n            <td>Yes</td>\n            <td>Yes (Retransmission)</td>\n            <td>1 bit (0, 1)</td>\n            <td>1</td>\n            <td>1</td>\n          </tr>\n          <tr class=\"bg-emerald-50 dark:bg-emerald-900/30\">\n            <td><strong>Go-Back-N ARQ</strong></td>\n            <td>Noisy</td>\n            <td>Yes (Sliding window)</td>\n            <td>Yes (Cumulative)</td>\n            <td>$m$ bits</td>\n            <td>$2^m - 1$</td>\n            <td>1</td>\n          </tr>\n          <tr class=\"bg-purple-50 dark:bg-purple-900/30\">\n            <td><strong>Selective Repeat ARQ</strong></td>\n            <td>Noisy</td>\n            <td>Yes (Sliding window)</td>\n            <td>Yes (Selective)</td>\n            <td>$m$ bits</td>\n            <td>$2^{m-1}$</td>\n            <td>$2^{m-1}$</td>\n          </tr>\n        </tbody>\n      </table>\n    ",
      "workedExamples": {
        "level1": "<strong>Question:</strong> Why does the Stop-and-Wait protocol for noiseless channels not require sequence numbers?<br><br><strong>Answer:</strong> In an ideal noiseless channel, frames are never lost or corrupted, and acknowledgements are never lost. When the sender receives an ACK, it is guaranteed to acknowledge the one frame just sent. Duplicate frames can never arise, so sequence numbers are completely unnecessary.",
        "level2": "<strong>Analysis:</strong> Suppose an engineer deploys the Stop-and-Wait noiseless protocol on a real noisy microwave link. What catastrophic failure occurs if a single frame is corrupted?<br><br><strong>Answer:</strong> The receiver's CRC check detects corruption and discards the frame without sending an ACK. Because the noiseless protocol lacks a retransmission timer, the sender waits indefinitely for an ACK that will never arrive. The entire link enters a permanent deadlock.",
        "level3": "<strong>Design Evaluation:</strong> Under what conditions does Go-Back-N ARQ degrade severely compared to Selective Repeat ARQ?<br><br><strong>Answer:</strong> Go-Back-N ARQ degrades severely on high-bandwidth-delay product links (such as satellite communication) with a non-zero packet error rate. When one frame is lost, Go-Back-N forces the sender to discard and retransmit all $N-1$ subsequent frames that were already successfully received, clogging the channel with redundant transmissions."
      },
      "advantagesLimitations": "\n      <table class=\"wiki-table\">\n        <thead>\n          <tr>\n            <th>Category</th>\n            <th>Architectural Role</th>\n            <th>Primary Limitation</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><strong>Noiseless Protocols</strong></td>\n            <td>Isolates flow control algorithms and establishes theoretical transmission bounds.</td>\n            <td>Deadlocks instantly on real-world noisy physical media.</td>\n          </tr>\n          <tr>\n            <td><strong>Noisy ARQ Protocols</strong></td>\n            <td>Provides robust end-to-end reliability over imperfect physical links.</td>\n            <td>Incurs computational, buffering, timer, and protocol header overhead.</td>\n          </tr>\n        </tbody>\n      </table>\n    ",
      "whereUsed": [
        "Noiseless models: Network simulation benchmarks, theoretical channel capacity analysis.",
        "Noisy ARQ models: IEEE 802.11 Wi-Fi, DOCSIS cable modems, cellular LTE/5G RLC layer, TCP transport protocol."
      ],
      "quiz": [
        {
          "question": "Which of the following protocols provides flow control but NO error control?",
          "options": [
            "Stop-and-Wait Protocol (Noiseless)",
            "Simplest Protocol",
            "Stop-and-Wait ARQ",
            "Go-Back-N ARQ"
          ],
          "correct": 0,
          "explanation": "The Stop-and-Wait Protocol for noiseless channels adds a 1-frame acknowledgement for flow control, but has no timers or sequence numbers for error control."
        },
        {
          "question": "What is the receiver window size ($W_r$) in the Go-Back-N ARQ protocol?",
          "options": [
            "Exactly 1",
            "$2^m - 1$",
            "$2^{m-1}$",
            "Unlimited"
          ],
          "correct": 0,
          "explanation": "In Go-Back-N ARQ, the receiver window size is strictly 1. The receiver only accepts the next frame in sequential order and discards all out-of-order frames."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11, Section 11.4 & 11.5.",
          "url": ""
        }
      ]
    }
  },
  "stop-and-wait-noiseless": {
    "id": "stop-and-wait-noiseless",
    "title": "Stop-and-Wait Protocol",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "topicNumber": 2,
    "subtopicNumber": 4,
    "whyItMatters": "The Stop-and-Wait Protocol introduces the foundational concept of flow control. By forcing the sender to halt after each frame until an explicit acknowledgement is received, it solves the problem of receiver buffer overrun.",
    "prerequisitesList": [
      {
        "concept": "simplex-protocol",
        "meaning": "Simplest Protocol operation and its buffer flooding failure"
      },
      {
        "concept": "Flow Control",
        "meaning": "Techniques for matching sender transmission rate with receiver processing speed"
      }
    ],
    "learningObjectives": [
      "Explain why the Stop-and-Wait protocol is required to prevent receiver buffer overflow.",
      "Detail the 8-step operational workflow and communication exchange.",
      "Analyze the specific role of the Acknowledgement (ACK) frame.",
      "Compare the Stop-and-Wait Protocol directly with the Simplest Protocol."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "Forouzan Chapter 11.4 (Elementary Protocol 2)",
      "type": "Flow Control Noiseless Protocol",
      "prerequisites": [
        "simplex-protocol"
      ],
      "relatedConcepts": [
        "stop-and-wait",
        "flow-control",
        "acknowledgement"
      ],
      "compareWith": [
        "simplex-protocol",
        "stop-and-wait"
      ],
      "primaryUses": [
        "Paced hardware interfaces, low-speed microcontroller telemetry"
      ]
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/76/Stop_and_wait_arq.png",
    "imageCaption": "Figure: Stop-and-Wait Protocol Handshake: Transmit Frame -> Await ACK -> Transmit Next Frame.",
    "sections": {
      "overview": "\n      <p>The <strong>Stop-and-Wait Protocol</strong> is a noiseless-channel Data Link Layer protocol that incorporates <strong>flow control</strong> to prevent a fast sender from swamping a slow receiver with data.</p>\n      <p>In the Simplest Protocol, a major flaw is that if the sender transmits frames faster than the receiver can process them, the receiver's buffer overflows and frames are dropped. The Stop-and-Wait Protocol overcomes this vulnerability: the sender transmits exactly <strong>one frame</strong>, stops, and waits for an <strong>Acknowledgement (ACK)</strong> control frame from the receiver before transmitting the next frame.</p>\n      \n      <div class=\"wiki-callout note my-3\">\n        <h4 class=\"font-bold text-gray-900 dark:text-white mb-1\">Core Principle</h4>\n        <p class=\"text-xs text-gray-700 dark:text-gray-300\">The sender can have at most <strong>one unacknowledged frame</strong> outstanding on the communication link at any instant. Data frames and ACK frames alternate strictly across the channel.</p>\n      </div>\n    ",
      "eli10": "Imagine you are talking on a walkie-talkie. You say one sentence, then say 'Over', and release the button. You wait until your friend says 'Copy that, go ahead' before you speak your next sentence. This prevents you from talking over each other and ensures your friend understood you.",
      "analogy": "Like a teacher handing out quiz sheets one by one to a student: the teacher waits until the student takes the first sheet and says 'Ready' before handing over the second sheet.",
      "howItWorks": "\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mb-2\">The 8-Step Operational Workflow</h3>\n      <ol class=\"wiki-ordered-list\">\n        <li>The sender's Network Layer supplies a data packet to the Data Link Layer.</li>\n        <li>The sender's Data Link Layer encapsulates the packet into a frame.</li>\n        <li>The sender transmits the frame across the physical link to the receiver.</li>\n        <li><strong>Sender enters blocking wait state:</strong> The sender halts transmission and waits for receiver feedback.</li>\n        <li>The receiver accepts the frame, verifies frame integrity, and extracts the network packet.</li>\n        <li>The receiver delivers the packet up to its local Network Layer.</li>\n        <li>The receiver formats an Acknowledgement (ACK) frame and transmits it back to the sender.</li>\n        <li>Upon receiving the ACK, the sender unblocks, retrieves the next packet from its Network Layer, and repeats the cycle.</li>\n      </ol>\n\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mt-4 mb-2\">Role and Significance of the Acknowledgement (ACK)</h3>\n      <p>In the Stop-and-Wait Protocol, the ACK frame serves two vital operational functions:</p>\n      <ul class=\"wiki-bullet-list\">\n        <li><strong>Confirmation of Receipt:</strong> Informs the sender that the preceding frame was delivered safely to the receiver's Data Link Layer.</li>\n        <li><strong>Permission to Transmit (Flow Control Token):</strong> Serves as an explicit notification that the receiver has emptied its input buffer and is now ready to receive the subsequent frame.</li>\n      </ul>\n    ",
      "diagram": "",
      "technicalDetails": "\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mb-2\">Detailed Comparison: Simplest Protocol vs. Stop-and-Wait Protocol</h3>\n      <table class=\"wiki-table\">\n        <thead>\n          <tr>\n            <th>Comparison Parameter</th>\n            <th>Simplest Protocol</th>\n            <th>Stop-and-Wait Protocol</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><strong>Channel Assumption</strong></td>\n            <td>Ideal noiseless channel</td>\n            <td>Ideal noiseless channel</td>\n          </tr>\n          <tr>\n            <td><strong>Flow Control Mechanism</strong></td>\n            <td>None (Sender transmits continuously)</td>\n            <td>Stop-and-Wait (1-frame ACK handshake)</td>\n          </tr>\n          <tr>\n            <td><strong>Error Control Mechanism</strong></td>\n            <td>None</td>\n            <td>None (No sequence numbers, no timers)</td>\n          </tr>\n          <tr>\n            <td><strong>Receiver Overload Protection</strong></td>\n            <td>No protection; vulnerable to buffer flooding</td>\n            <td>Complete protection against buffer overflow</td>\n          </tr>\n          <tr>\n            <td><strong>Acknowledgement (ACK)</strong></td>\n            <td>Not used</td>\n            <td>Required for every transmitted frame</td>\n          </tr>\n          <tr>\n            <td><strong>Outstanding Frames Allowed</strong></td>\n            <td>Unlimited (Continuous transmission)</td>\n            <td>Exactly 1 frame</td>\n          </tr>\n          <tr>\n            <td><strong>Channel Utilization ($eta$)</strong></td>\n            <td>Theoretical 100%</td>\n            <td>Low ($eta = \frac{t_{\\text{tx}}}{t_{\\text{tx}} + 2 t_{\\text{prop}}}$)</td>\n          </tr>\n        </tbody>\n      </table>\n    ",
      "workedExamples": {
        "level1": "<strong>Question:</strong> Why is the Stop-and-Wait protocol still classified under noiseless channels even though it uses ACKs?<br><br><strong>Answer:</strong> The ACK in Stop-and-Wait is used exclusively for flow control (pacing the sender), not error control. The protocol has no retransmission timer and no sequence numbers. If a frame or ACK were lost on a noisy link, the protocol would deadlock permanently.",
        "level2": "<strong>Problem:</strong> A host transmits 1000-bit frames over a 1 Mbps link using Stop-and-Wait. The one-way propagation delay $t_{\\text{prop}}$ is 10 ms. Assume ACK transmission time is negligible. Calculate the channel efficiency $\\eta$.<br><br><strong>Answer:</strong><br>Frame transmission time: $t_{\\text{tx}} = \\frac{1000}{10^6} = 1\\text{ ms}$.<br>Total cycle time: $T = t_{\\text{tx}} + 2 \\cdot t_{\\text{prop}} = 1\\text{ ms} + 2(10\\text{ ms}) = 21\\text{ ms}$.<br>Efficiency: $\\eta = \\frac{t_{\\text{tx}}}{T} = \\frac{1}{21} \\approx 4.76\\%$.<br>Notice that over 95% of the channel capacity is wasted waiting for the ACK!",
        "level3": "<strong>Vulnerability Analysis:</strong> Explain the exact deadlock condition that occurs if Stop-and-Wait (noiseless) is deployed on a noisy channel.<br><br><strong>Answer:</strong> If channel noise corrupts a data frame, the receiver's hardware discards the bad bits and sends nothing. The sender has already stopped and entered its waiting state. Because there is no timeout mechanism, the sender waits forever for the ACK, and the receiver waits forever for the frame. Both machines remain frozen in their wait states."
      },
      "advantagesLimitations": "\n      <table class=\"wiki-table\">\n        <thead>\n          <tr>\n            <th>Aspect</th>\n            <th>Advantages</th>\n            <th>Limitations</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><strong>Buffer Management</strong></td>\n            <td>Receiver requires only a 1-frame buffer; overflow is physically impossible.</td>\n            <td>Extremely inefficient on \"long fat networks\" (high bandwidth-delay product).</td>\n          </tr>\n          <tr>\n            <td><strong>Implementation</strong></td>\n            <td>Simple 2-state logic without sequence counters or timers.</td>\n            <td>Cannot handle lost frames or lost ACKs; lacks error recovery.</td>\n          </tr>\n        </tbody>\n      </table>\n    ",
      "whereUsed": [
        "Low-speed microcontroller communication (UART/SPI) with restricted memory buffers.",
        "Legacy terminal-to-mainframe pacing protocols.",
        "Pedagogical foundation for Stop-and-Wait ARQ."
      ],
      "quiz": [
        {
          "question": "What is the primary problem solved by the Stop-and-Wait Protocol compared to the Simplest Protocol?",
          "options": [
            "Receiver buffer overflow caused by an over-speed sender",
            "Transmission bit errors caused by channel noise",
            "Packet duplication caused by lost acknowledgements",
            "Routing loops in intermediate packet switches"
          ],
          "correct": 0,
          "explanation": "Stop-and-Wait introduces flow control via a 1-frame acknowledgement handshake, guaranteeing that a fast sender never floods a slow receiver."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Section 11.4.2.",
          "url": ""
        }
      ]
    }
  },
  "comparison-noiseless-noisy": {
    "id": "comparison-noiseless-noisy",
    "title": "Comparison of Noiseless and Noisy Channel Protocols",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "topicNumber": 2,
    "subtopicNumber": 8,
    "whyItMatters": "Contrasting ideal noiseless channels with practical noisy channels crystallizes why modern network protocols must incorporate error detection, timers, sliding windows, and sequence tracking.",
    "prerequisitesList": [
      {
        "concept": "u2-protocol-classification",
        "meaning": "Taxonomy of channel types"
      },
      {
        "concept": "simplex-protocol",
        "meaning": "Simplest and Stop-and-Wait noiseless protocols"
      },
      {
        "concept": "stop-and-wait",
        "meaning": "Stop-and-Wait, Go-Back-N, and Selective Repeat ARQ"
      }
    ],
    "learningObjectives": [
      "Compare noiseless and noisy channel protocols across 8 core architectural dimensions.",
      "Explain why noiseless protocols cannot be deployed on real physical transmission links.",
      "Detail how ARQ transforms an inherently unreliable physical medium into a reliable logical connection."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "Forouzan Chapter 11.4 & 11.5 Comparative Synthesis",
      "type": "Architectural Comparison",
      "prerequisites": [
        "simplex-protocol",
        "stop-and-wait"
      ],
      "relatedConcepts": [
        "comparison-arq-protocols",
        "u2-protocol-classification"
      ],
      "compareWith": [
        "comparison-arq-protocols"
      ],
      "primaryUses": [
        "Curriculum synthesis, system architecture design, exam preparation"
      ]
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Sliding_Window_Protocol.svg",
    "imageCaption": "Figure: Master Protocol Architecture Comparison: Ideal Channels vs Realistic Channels with Error Control.",
    "sections": {
      "overview": "\n      <p>A rigorous comparative analysis between <strong>Protocols for Noiseless Channels</strong> and <strong>Protocols for Noisy Channels</strong> reveals the fundamental architectural trade-offs in Data Link Layer design.</p>\n      <p>While noiseless channel protocols (Simplest Protocol and Stop-and-Wait Protocol) assume an error-free world where bits are never corrupted or lost, noisy channel protocols (Stop-and-Wait ARQ, Go-Back-N ARQ, and Selective Repeat ARQ) introduce <strong>Automatic Repeat reQuest (ARQ)</strong> frameworks to guarantee error-free, duplicate-free, and sequential delivery over imperfect physical channels.</p>\n    ",
      "eli10": "Noiseless protocols are like writing messages on a classroom whiteboard where everyone can read them clearly without distortion. Noisy protocols are like trying to shout messages across a noisy stadium during a concert—you have to speak slowly, repeat words when someone yells 'What?!', and number your instructions so nothing gets confused.",
      "analogy": "Like the difference between moving money inside a bank vault (zero theft, trusted environment) versus transporting cash across a city in an armored truck with GPS tracking, armed guards, and security manifests.",
      "howItWorks": "\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mb-2\">Master 8-Dimension Architectural Comparison Matrix</h3>\n      <table class=\"wiki-table\">\n        <thead>\n          <tr>\n            <th>Dimension</th>\n            <th>Noiseless Channel Protocols</th>\n            <th>Noisy Channel Protocols (ARQ)</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><strong>1. Physical Channel Assumption</strong></td>\n            <td>Ideal channel: Zero bit errors, zero frame loss, zero propagation damage.</td>\n            <td>Realistic channel: Signal attenuation, thermal noise, frame drops, and lost ACKs.</td>\n          </tr>\n          <tr>\n            <td><strong>2. Error Detection Mechanism</strong></td>\n            <td>None. Assumes every received bit is 100% authentic.</td>\n            <td>Mandatory CRC (Cyclic Redundancy Check) or checksum trailer in every frame.</td>\n          </tr>\n          <tr>\n            <td><strong>3. Error Recovery Mechanism</strong></td>\n            <td>None. Corrupted or dropped frames result in permanent data loss or deadlock.</td>\n            <td>Automatic Repeat reQuest (ARQ): Retransmission driven by timers and NAKs.</td>\n          </tr>\n          <tr>\n            <td><strong>4. Flow Control Capabilities</strong></td>\n            <td>None in Simplest Protocol; 1-frame stop-and-wait in Stop-and-Wait Protocol.</td>\n            <td>Sliding window pipelining ($W_s = 1$ to $2^m - 1$) dynamically matching receiver capacity.</td>\n          </tr>\n          <tr>\n            <td><strong>5. Acknowledgement Feedback</strong></td>\n            <td>None in Simplest; simple positive ACK in Stop-and-Wait (used strictly for pacing).</td>\n            <td>Explicit ACK, Negative ACK (NAK), Cumulative ACK, and Selective ACK with sequence numbers.</td>\n          </tr>\n          <tr>\n            <td><strong>6. Sequence Numbering</strong></td>\n            <td>Not used. Frames carry no sequence identifier.</td>\n            <td>Mandatory $1$-bit or $m$-bit sequence numbers to prevent duplicate packet delivery.</td>\n          </tr>\n          <tr>\n            <td><strong>7. Retransmission Timers</strong></td>\n            <td>None. Sender maintains no software or hardware countdown timers.</td>\n            <td>Active retransmission timers to detect lost data frames and lost acknowledgements.</td>\n          </tr>\n          <tr>\n            <td><strong>8. Real-World Practicality</strong></td>\n            <td>Theoretical pedagogical models; deadlocks on real communication links.</td>\n            <td>Foundation of all real-world communications (Ethernet, Wi-Fi, HDLC, TCP).</td>\n          </tr>\n        </tbody>\n      </table>\n    ",
      "diagram": "",
      "technicalDetails": "\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mb-2\">Why Noiseless Protocols Fail on Real Links</h3>\n      <p>If a noiseless protocol (such as the Simplest Protocol or Stop-and-Wait) is executed on a real-world copper or wireless link, two catastrophic failure modes occur:</p>\n      <ol class=\"wiki-ordered-list\">\n        <li><strong>Silent Data Corruption / Loss:</strong> In the Simplest Protocol, bit errors go completely undetected because there is no CRC. Corrupted bits pass directly into the application, causing file corruption or program crashes.</li>\n        <li><strong>Permanent System Deadlock:</strong> In the Stop-and-Wait noiseless protocol, if a frame or ACK is destroyed by a noise burst, both sender and receiver enter an infinite wait state because neither device possesses a retransmission timer.</li>\n      </ol>\n    ",
      "workedExamples": {
        "level1": "<strong>Question:</strong> Name the 5 protocols discussed in Forouzan Chapter 11 and identify which category each belongs to.<br><br><strong>Answer:</strong><br>• Noiseless Channels: (1) Simplest Protocol, (2) Stop-and-Wait Protocol.<br>• Noisy Channels: (3) Stop-and-Wait ARQ, (4) Go-Back-N ARQ, (5) Selective Repeat ARQ.",
        "level2": "<strong>Problem:</strong> Explain how adding sequence numbers resolves the lost acknowledgement problem in noisy channels.<br><br><strong>Answer:</strong> When an ACK is lost, the sender retransmits the frame after timeout. The receiver checks the sequence number. If it sees the same sequence number as the previously delivered frame, it recognizes the frame as a duplicate, safely discards the payload, and retransmits the ACK. Upper layers never receive duplicate data.",
        "level3": "<strong>Analysis:</strong> Why is flow control present in both noiseless and noisy categories, but error control only present in noisy?<br><br><strong>Answer:</strong> Flow control is necessary even on an ideal error-free channel because the sender's CPU/clock speed may be faster than the receiver's processing speed, leading to buffer overflow. Error control, however, is designed specifically to detect and recover from physical transmission noise, which is absent by definition in a noiseless channel."
      },
      "advantagesLimitations": "\n      <table class=\"wiki-table\">\n        <thead>\n          <tr>\n            <th>Category</th>\n            <th>Key Advantage</th>\n            <th>Key Limitation</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><strong>Noiseless Models</strong></td>\n            <td>Exposes fundamental flow control mechanics with zero algorithmic complexity.</td>\n            <td>Completely unusable in practical network deployments.</td>\n          </tr>\n          <tr>\n            <td><strong>Noisy ARQ Models</strong></td>\n            <td>Transforms unreliable, lossy links into deterministic, highly reliable links.</td>\n            <td>Protocol headers, buffering, and retransmissions introduce overhead and latency.</td>\n          </tr>\n        </tbody>\n      </table>\n    ",
      "whereUsed": [
        "Noiseless protocols: Academic instructional baselines and simulation controls.",
        "Noisy ARQ protocols: Production network standards including IEEE 802.3, IEEE 802.11, HDLC, TCP."
      ],
      "quiz": [
        {
          "question": "What is the critical mechanism that prevents permanent protocol deadlock when a frame is lost on a noisy channel?",
          "options": [
            "Retransmission countdown timer at the sender",
            "Parity check bit in the header",
            "Piggybacking field in the trailer",
            "Sliding window pointer at the receiver"
          ],
          "correct": 0,
          "explanation": "The retransmission timer at the sender guarantees that if an expected ACK does not arrive within a bounded duration, timeout occurs and the frame is automatically resent, breaking any deadlock."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11, Sections 11.4 & 11.5.",
          "url": ""
        }
      ]
    }
  },
  "comparison-arq-protocols": {
    "id": "comparison-arq-protocols",
    "title": "Comparison of ARQ Protocols",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "topicNumber": 2,
    "subtopicNumber": 9,
    "whyItMatters": "Understanding the trade-offs between Stop-and-Wait ARQ, Go-Back-N ARQ, and Selective Repeat ARQ enables network engineers to select the optimal protocol for a given bandwidth-delay product and channel error rate.",
    "prerequisitesList": [
      {
        "concept": "stop-and-wait",
        "meaning": "Stop-and-Wait ARQ operation and formula"
      },
      {
        "concept": "go-back-n",
        "meaning": "Go-Back-N ARQ sliding window and cumulative ACKs"
      },
      {
        "concept": "selective-repeat",
        "meaning": "Selective Repeat ARQ out-of-order buffering"
      }
    ],
    "learningObjectives": [
      "Master the 10-parameter comparative matrix contrasting Stop-and-Wait, Go-Back-N, and Selective Repeat ARQ.",
      "Evaluate the 5-protocol master comparison table across all Data Link Layer protocols.",
      "Explain Piggybacking and how it optimizes bidirectional communication.",
      "Select the appropriate ARQ protocol based on bandwidth-delay product ($a$) and bit error rate ($P$)."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "Forouzan Chapter 11.5 / Kurose & Ross Chapter 3 / Tanenbaum Chapter 3",
      "type": "Master Comparative Protocol Synthesis",
      "prerequisites": [
        "stop-and-wait",
        "go-back-n",
        "selective-repeat"
      ],
      "relatedConcepts": [
        "sliding-window",
        "flow-control",
        "comparison-noiseless-noisy"
      ],
      "compareWith": [
        "stop-and-wait",
        "go-back-n",
        "selective-repeat"
      ],
      "primaryUses": [
        "Protocol stack engineering, satellite and wireless system optimization, GATE exam mastery"
      ]
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/54/Selective_repeat_transmit_window_example.png",
    "imageCaption": "Figure: Comparative Window Geometries: Stop-and-Wait ($W=1$), Go-Back-N ($W_s=2^m-1, W_r=1$), Selective Repeat ($W_s=W_r=2^{m-1}$).",
    "sections": {
      "overview": "\n      <p>Automatic Repeat reQuest (ARQ) protocols provide reliable, ordered, and error-free communication across noisy channels. The three canonical ARQ protocols—<strong>Stop-and-Wait ARQ</strong>, <strong>Go-Back-N ARQ</strong>, and <strong>Selective Repeat ARQ</strong>—represent a progression in design complexity and channel utilization.</p>\n      <p>According to <em>Behrouz A. Forouzan (Chapter 11, Section 11.5)</em>, each protocol addresses channel idle time and retransmission overhead through distinct window geometries, buffering strategies, and feedback mechanisms.</p>\n    ",
      "eli10": "Imagine three ways to deliver packages: (1) Stop-and-Wait: Deliver one box, wait for a signature, then walk back for the next. Very slow! (2) Go-Back-N: Carry 7 boxes at once; if box #2 is crushed, throw away boxes #3 to #7 and carry them all over again. (3) Selective Repeat: Carry 4 boxes; if box #2 is crushed, put boxes #3 and #4 on the customer's porch and run back to fetch ONLY a replacement box #2. Fast and smart!",
      "analogy": "Comparing freight logistics: Stop-and-Wait is a single courier bicycle; Go-Back-N is a freight train that stops and restarts the whole train if one container is damaged; Selective Repeat is an automated drone fleet where each drone operates independently.",
      "howItWorks": "\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mb-2\">Master 10-Parameter Comparative Matrix of ARQ Protocols</h3>\n      <table class=\"wiki-table\">\n        <thead>\n          <tr>\n            <th>Evaluation Parameter</th>\n            <th>Stop-and-Wait ARQ</th>\n            <th>Go-Back-N ARQ</th>\n            <th>Selective Repeat ARQ</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><strong>1. Sender Window Size ($W_s$)</strong></td>\n            <td>$W_s = 1$</td>\n            <td>$W_s = 2^m - 1$</td>\n            <td>$W_s = 2^{m-1}$</td>\n          </tr>\n          <tr>\n            <td><strong>2. Receiver Window Size ($W_r$)</strong></td>\n            <td>$W_r = 1$</td>\n            <td>$W_r = 1$</td>\n            <td>$W_r = 2^{m-1}$</td>\n          </tr>\n          <tr>\n            <td><strong>3. Sequence Number Bits ($m$)</strong></td>\n            <td>$m = 1$ bit (0 and 1)</td>\n            <td>$m \\ge 2$ bits ($2^m$ sequence numbers)</td>\n            <td>$m \\ge 2$ bits ($2^m$ sequence numbers)</td>\n          </tr>\n          <tr>\n            <td><strong>4. Acknowledgement Type</strong></td>\n            <td>Individual (ACK 0 or ACK 1)</td>\n            <td>Cumulative (ACK $n$ confirms all up to $n-1$)</td>\n            <td>Individual / Selective (ACK + NAK)</td>\n          </tr>\n          <tr>\n            <td><strong>5. Retransmission Timers</strong></td>\n            <td>1 timer</td>\n            <td>1 timer (for oldest unacknowledged frame)</td>\n            <td>Multiple timers (1 per outstanding frame)</td>\n          </tr>\n          <tr>\n            <td><strong>6. Receiver Buffering</strong></td>\n            <td>None (1 frame capacity)</td>\n            <td>None ($W_r = 1$; discards out-of-order)</td>\n            <td>Yes (Holds out-of-order frames in memory)</td>\n          </tr>\n          <tr>\n            <td><strong>7. Retransmission on Loss</strong></td>\n            <td>Retransmits 1 frame</td>\n            <td>Retransmits $N$ frames (lost + all subsequent)</td>\n            <td>Retransmits ONLY the damaged/lost frame</td>\n          </tr>\n          <tr>\n            <td><strong>8. Implementation Complexity</strong></td>\n            <td>Very Low</td>\n            <td>Moderate (Sender buffer only)</td>\n            <td>High (Sorting buffers & multi-timers)</td>\n          </tr>\n          <tr>\n            <td><strong>9. Bandwidth Efficiency ($eta$)</strong></td>\n            <td>Low: $\\frac{1}{1 + 2a}$</td>\n            <td>High if error rate is low: $\\frac{W_s}{1 + 2a}$</td>\n            <td>Highest on noisy channels: $(1-P) \\frac{W_s}{1 + 2a}$</td>\n          </tr>\n          <tr>\n            <td><strong>10. Real-World Applications</strong></td>\n            <td>TFTP, basic sensor links</td>\n            <td>HDLC, early TCP</td>\n            <td>Modern TCP (SACK), Wi-Fi (802.11 Block ACK)</td>\n          </tr>\n        </tbody>\n      </table>\n\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mt-6 mb-2\">Master 5-Protocol Summary Table (Forouzan Ch. 11)</h3>\n      <table class=\"wiki-table\">\n        <thead>\n          <tr>\n            <th>Protocol</th>\n            <th>Channel</th>\n            <th>Flow Control?</th>\n            <th>Error Control?</th>\n            <th>$W_s$</th>\n            <th>$W_r$</th>\n            <th>ACK Type</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><strong>Simplest Protocol</strong></td>\n            <td>Noiseless</td>\n            <td>No</td>\n            <td>No</td>\n            <td>1</td>\n            <td>1</td>\n            <td>None</td>\n          </tr>\n          <tr>\n            <td><strong>Stop-and-Wait</strong></td>\n            <td>Noiseless</td>\n            <td>Yes</td>\n            <td>No</td>\n            <td>1</td>\n            <td>1</td>\n            <td>Positive ACK</td>\n          </tr>\n          <tr class=\"bg-blue-50 dark:bg-blue-900/30\">\n            <td><strong>Stop-and-Wait ARQ</strong></td>\n            <td>Noisy</td>\n            <td>Yes</td>\n            <td>Yes</td>\n            <td>1</td>\n            <td>1</td>\n            <td>ACK 0 / ACK 1</td>\n          </tr>\n          <tr class=\"bg-emerald-50 dark:bg-emerald-900/30\">\n            <td><strong>Go-Back-N ARQ</strong></td>\n            <td>Noisy</td>\n            <td>Yes</td>\n            <td>Yes</td>\n            <td>$2^m - 1$</td>\n            <td>1</td>\n            <td>Cumulative ACK</td>\n          </tr>\n          <tr class=\"bg-purple-50 dark:bg-purple-900/30\">\n            <td><strong>Selective Repeat ARQ</strong></td>\n            <td>Noisy</td>\n            <td>Yes</td>\n            <td>Yes</td>\n            <td>$2^{m-1}$</td>\n            <td>$2^{m-1}$</td>\n            <td>Selective ACK + NAK</td>\n          </tr>\n        </tbody>\n      </table>\n    ",
      "diagram": "",
      "technicalDetails": "\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mb-2\">Piggybacking: Bidirectional Efficiency Optimization</h3>\n      <p>In theoretical models, data travels in one direction and ACKs in the other. In real-world full-duplex communication networks, data travels simultaneously in both directions between Station A and Station B.</p>\n      \n      <div class=\"wiki-callout note my-3\">\n        <h4 class=\"font-bold text-gray-900 dark:text-white mb-1\">Definition of Piggybacking (Forouzan Section 11.5.4)</h4>\n        <p class=\"text-xs text-gray-700 dark:text-gray-300\"><strong>Piggybacking</strong> is a technique where acknowledgement information for recently received frames is attached (piggybacked) into the header of an outgoing data frame traveling in the reverse direction, rather than transmitting a dedicated, standalone ACK control frame.</p>\n      </div>\n\n      <h4 class=\"font-bold text-sm text-gray-900 dark:text-white mt-3\">Advantages of Piggybacking:</h4>\n      <ul class=\"wiki-bullet-list\">\n        <li><strong>Reduces Header Overhead:</strong> Eliminates the need to send an entire 64-byte minimum frame just to convey a 2-byte ACK number.</li>\n        <li><strong>Saves Transmission Bandwidth:</strong> Leaves the physical medium free for substantive data payloads.</li>\n        <li><strong>Reduces Contention:</strong> On shared access networks (like Wi-Fi or Ethernet), fewer frames mean fewer channel access collisions.</li>\n      </ul>\n\n      <h4 class=\"font-bold text-sm text-gray-900 dark:text-white mt-3\">The Delayed ACK Timer Trade-Off:</h4>\n      <p class=\"text-xs text-gray-700 dark:text-gray-300\">If Station B does not have an immediate data frame ready to transmit back to Station A, it cannot wait indefinitely to piggyback the ACK, or Station A's retransmission timer will expire! Therefore, protocols use an <strong>ACK Delay Timer</strong> (typically 200–500 ms). If Station B generates outgoing data before the timer expires, it piggybacks the ACK; if the timer expires with no data ready, it dispatches a standalone ACK frame.</p>\n    ",
      "workedExamples": {
        "level1": "<strong>Question:</strong> For a sequence number field of 4 bits ($m = 4$), compare the sender window sizes for Go-Back-N ARQ and Selective Repeat ARQ.<br><br><strong>Answer:</strong><br>• Total sequence numbers: $2^4 = 16$ (0 to 15).<br>• Go-Back-N Sender Window: $W_s = 2^m - 1 = 2^4 - 1 = 15$.<br>• Selective Repeat Sender Window: $W_s = 2^{m-1} = 2^{4-1} = 2^3 = 8$.",
        "level2": "<strong>Problem:</strong> A 1 Gbps link with a round-trip propagation time of 40 ms carries 12,500-byte frames. Compare the required window size in Go-Back-N to achieve 100% link utilization vs. Stop-and-Wait.<br><br><strong>Answer:</strong><br>1. Frame transmission time: $t_{\\text{tx}} = \\frac{12500 \\times 8}{10^9} = 0.1\\text{ ms}$.<br>2. Total round-trip time: $RTT = 40\\text{ ms}$.<br>3. Parameter $a = \\frac{RTT/2}{t_{\\text{tx}}} = \\frac{20\\text{ ms}}{0.1\\text{ ms}} = 200$.<br>4. Stop-and-Wait efficiency: $\\eta = \\frac{1}{1 + 2(200)} = \\frac{1}{401} \\approx 0.25\\%$ (Throughput = 2.5 Mbps).<br>5. Go-Back-N required window for 100% utilization: $W_s \\ge 1 + 2a = 401$ frames.<br>Minimum sequence bits required: $2^m - 1 \\ge 401 \\implies 2^m \\ge 402 \\implies m = 9$ bits ($W_s = 511$).",
        "level3": "<strong>Engineering Decision:</strong> Under what channel conditions would you choose Go-Back-N over Selective Repeat, and vice versa?<br><br><strong>Answer:</strong><br>• Choose <strong>Go-Back-N</strong> when the physical link has very low error rates (e.g., local fiber optics) and receiver memory/CPU is strictly constrained (e.g., low-cost IoT microcontrollers).<br>• Choose <strong>Selective Repeat</strong> when the product of bandwidth and propagation delay is large (e.g., satellite, trans-oceanic cables) and the channel experiences intermittent bit errors or packet loss, because Go-Back-N's retransmission penalty would drastically collapse throughput."
      },
      "advantagesLimitations": "\n      <table class=\"wiki-table\">\n        <thead>\n          <tr>\n            <th>Protocol</th>\n            <th>Primary Strengths</th>\n            <th>Primary Weaknesses</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><strong>Stop-and-Wait ARQ</strong></td>\n            <td>Zero reordering, 1-frame buffer, simplest hardware implementation.</td>\n            <td>Dismal performance on high-latency links ($a \\gg 1$).</td>\n          </tr>\n          <tr>\n            <td><strong>Go-Back-N ARQ</strong></td>\n            <td>High throughput on clean links, simple receiver architecture ($W_r = 1$).</td>\n            <td>Wasteful retransmission of all subsequent frames when one frame is lost.</td>\n          </tr>\n          <tr>\n            <td><strong>Selective Repeat ARQ</strong></td>\n            <td>Optimal bandwidth efficiency, retransmits only corrupted frames.</td>\n            <td>Requires sorting buffers at receiver and multiple concurrent software timers at sender.</td>\n          </tr>\n        </tbody>\n      </table>\n    ",
      "whereUsed": [
        "Comparative analysis is heavily tested in GATE, UGC-NET, and university computer networking exams.",
        "Directly informs transport-layer protocol design in TCP (RFC 793, RFC 2018).",
        "Satellite link design and 5G New Radio (NR) protocol parameter tuning."
      ],
      "quiz": [
        {
          "question": "What is Piggybacking in Data Link Layer protocols?",
          "options": [
            "Attaching an acknowledgement to an outgoing data frame traveling in the reverse direction",
            "Encrypting multiple frames into a single physical packet",
            "Compressing header bits using variable-length Huffman codes",
            "Transmitting data over multiple physical wires concurrently"
          ],
          "correct": 0,
          "explanation": "Piggybacking is the technique of combining an ACK for a recently received frame into the header of an outgoing data frame, saving link bandwidth and reducing frame overhead."
        },
        {
          "question": "For a 5-bit sequence number field, what are the sender window sizes for Go-Back-N and Selective Repeat respectively?",
          "options": [
            "31 and 16",
            "32 and 16",
            "15 and 8",
            "31 and 31"
          ],
          "correct": 0,
          "explanation": "For $m = 5$: Go-Back-N sender window is $2^5 - 1 = 31$. Selective Repeat sender window is $2^{5-1} = 2^4 = 16$."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11, Section 11.5.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 5th Edition, Section 3.4 (Sliding Window Protocols).",
          "url": ""
        }
      ]
    }
  },
  "u2-mac-sublayer-intro": {
    "id": "u2-mac-sublayer-intro",
    "title": "Introduction to MAC Sublayer",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Beginner",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.3 / Tanenbaum Ch. 4",
    "oneLiner": "The lower sublayer of OSI Layer 2 responsible for managing access to shared multi-station transmission media.",
    "quickAnswer": "The Medium Access Control (MAC) sublayer is the lower portion of the Data Link Layer in IEEE 802 LAN architecture. It directly interfaces with the physical layer, provides physical addressing, and arbitrates access when multiple computers share a single transmission channel.",
    "whyItMatters": "Whenever a communication medium is shared (like Wi-Fi airwaves or classic coaxial cables), two simultaneous transmissions collide. The MAC sublayer prevents or resolves these collisions.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>In IEEE 802 LAN architectures, the Data Link Layer is partitioned into the <strong>Logical Link Control (LLC)</strong> sublayer above, and the <strong>Medium Access Control (MAC)</strong> sublayer below. The MAC sublayer determines which device has permission to transmit across a shared broadcast medium.</p>",
      "eli10": "In simple words: The lower sublayer of OSI Layer 2 responsible for managing access to shared multi-station transmission media.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Introduction to MAC Sublayer?<br><br><strong>Answer:</strong> The Medium Access Control (MAC) sublayer is the lower portion of the Data Link Layer in IEEE 802 LAN architecture. It directly interfaces with the physical layer, provides physical addressing, and arbitrates access when multiple computers share a single transmission channel.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Introduction to MAC Sublayer?",
          "options": [
            "The Medium Access Control (MAC) sublayer is the lower portio...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: The Medium Access Control (MAC) sublayer is the lower portion of the Data Link Layer in IEEE 802 LAN architecture. It directly interfaces with the physical layer, provides physical addressing, and arbitrates access when multiple computers share a single transmission channel."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Multiple_Access.png",
      "imageCaption": "Figure: IEEE 802 LAN Model: Division of Data Link Layer into LLC (802.2) and MAC (802.3/802.11) Sublayers."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Multiple_Access.png",
    "imageCaption": "Figure: IEEE 802 LAN Model: Division of Data Link Layer into LLC (802.2) and MAC (802.3/802.11) Sublayers."
  },
  "u2-need-for-mac-sublayer": {
    "id": "u2-need-for-mac-sublayer",
    "title": "Need for MAC Sublayer",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Beginner",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Tanenbaum Ch. 4.1",
    "oneLiner": "Why multiaccess broadcast links require coordinated medium access arbitration to avoid destructive collisions.",
    "quickAnswer": "In point-to-point links with only two dedicated endpoints, no contention exists. However, in broadcast networks where multiple stations share a single wire or radio channel, simultaneous transmissions interfere and garble signals. The MAC sublayer is needed to coordinate channel access.",
    "whyItMatters": "Without a MAC sublayer, shared channels like Ethernet and Wi-Fi would suffer constant packet collisions, rendering data transmission completely impossible.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>When multiple computers are attached to a shared broadcast channel, any station transmitting at the same time as another causes electromagnetic signals to overlap, garbling the data in a <strong>collision</strong>. The MAC sublayer implements arbitration protocols to prevent or recover from these collisions.</p>",
      "eli10": "In simple words: Why multiaccess broadcast links require coordinated medium access arbitration to avoid destructive collisions.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Need for MAC Sublayer?<br><br><strong>Answer:</strong> In point-to-point links with only two dedicated endpoints, no contention exists. However, in broadcast networks where multiple stations share a single wire or radio channel, simultaneous transmissions interfere and garble signals. The MAC sublayer is needed to coordinate channel access.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Need for MAC Sublayer?",
          "options": [
            "In point-to-point links with only two dedicated endpoints, n...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: In point-to-point links with only two dedicated endpoints, no contention exists. However, in broadcast networks where multiple stations share a single wire or radio channel, simultaneous transmissions interfere and garble signals. The MAC sublayer is needed to coordinate channel access."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Multiple_Access.png",
      "imageCaption": "Figure: Shared Broadcast Medium Arbitration: Why Broadcast Channels Require Medium Access Control."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Multiple_Access.png",
    "imageCaption": "Figure: Shared Broadcast Medium Arbitration: Why Broadcast Channels Require Medium Access Control."
  },
  "u2-mac-functions-responsibilities": {
    "id": "u2-mac-functions-responsibilities",
    "title": "Functions and Responsibilities of MAC Sublayer",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802 / Tanenbaum Ch. 4",
    "oneLiner": "Media arbitration, physical MAC addressing, frame delimiting, and error detection at the hardware layer.",
    "quickAnswer": "The MAC sublayer handles: (1) Medium access arbitration (ALOHA, CSMA/CD, CSMA/CA, token passing), (2) Physical MAC addressing (source & destination 48-bit addresses), (3) Frame assembly & disassembly (preamble, SFD, FCS), and (4) Frame check sequence error detection.",
    "whyItMatters": "The MAC sublayer represents the bridge where software protocols meet physical transceiver silicon.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>The MAC sublayer is responsible for physical frame encapsulation, appending 48-bit hardware MAC addresses, computing CRC-32 checksums, and executing channel allocation algorithms that dictate when the hardware transceiver is permitted to transmit.</p>",
      "eli10": "In simple words: Media arbitration, physical MAC addressing, frame delimiting, and error detection at the hardware layer.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Functions and Responsibilities of MAC Sublayer?<br><br><strong>Answer:</strong> The MAC sublayer handles: (1) Medium access arbitration (ALOHA, CSMA/CD, CSMA/CA, token passing), (2) Physical MAC addressing (source & destination 48-bit addresses), (3) Frame assembly & disassembly (preamble, SFD, FCS), and (4) Frame check sequence error detection.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Functions and Responsibilities of MAC Sublayer?",
          "options": [
            "The MAC sublayer handles: (1) Medium access arbitration (ALO...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: The MAC sublayer handles: (1) Medium access arbitration (ALOHA, CSMA/CD, CSMA/CA, token passing), (2) Physical MAC addressing (source & destination 48-bit addresses), (3) Frame assembly & disassembly (preamble, SFD, FCS), and (4) Frame check sequence error detection."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Multiple_Access.png",
      "imageCaption": "Figure: Functions of MAC Sublayer: Frame Delimitation, Addressing, Contention Resolution, and Error Detection."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Multiple_Access.png",
    "imageCaption": "Figure: Functions of MAC Sublayer: Frame Delimitation, Addressing, Contention Resolution, and Error Detection."
  },
  "u2-fdma": {
    "id": "u2-fdma",
    "title": "Frequency Division Multiple Access (FDMA)",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Forouzan Ch. 12 / Kurose & Ross Ch. 5",
    "oneLiner": "Static channel allocation dividing the total frequency band into dedicated, non-overlapping frequency sub-bands.",
    "quickAnswer": "FDMA is a channelization technique where the available transmission frequency band is divided into distinct frequency channels. Each station is allocated a dedicated frequency band for the entire duration of transmission, separated by guard bands to prevent crosstalk.",
    "whyItMatters": "FDMA is foundational in radio broadcasting, 1G analog cellular networks, satellite uplinks/downlinks, and cable TV networks.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>In <strong>Frequency Division Multiple Access (FDMA)</strong>, the total available frequency bandwidth is split into $N$ distinct frequency channels. Each communicating pair is assigned an exclusive channel, completely eliminating transmission collisions.</p>",
      "eli10": "In simple words: Static channel allocation dividing the total frequency band into dedicated, non-overlapping frequency sub-bands.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Frequency Division Multiple Access (FDMA)?<br><br><strong>Answer:</strong> FDMA is a channelization technique where the available transmission frequency band is divided into distinct frequency channels. Each station is allocated a dedicated frequency band for the entire duration of transmission, separated by guard bands to prevent crosstalk.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Frequency Division Multiple Access (FDMA)?",
          "options": [
            "FDMA is a channelization technique where the available trans...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: FDMA is a channelization technique where the available transmission frequency band is divided into distinct frequency channels. Each station is allocated a dedicated frequency band for the entire duration of transmission, separated by guard bands to prevent crosstalk."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/79/FDMA.PNG",
      "imageCaption": "Figure: Frequency Division Multiple Access (FDMA): Dedicated Frequency Bands with Guard Bands."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/79/FDMA.PNG",
    "imageCaption": "Figure: Frequency Division Multiple Access (FDMA): Dedicated Frequency Bands with Guard Bands."
  },
  "u2-tdma": {
    "id": "u2-tdma",
    "title": "Time Division Multiple Access (TDMA)",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Forouzan Ch. 12 / Tanenbaum Ch. 4",
    "oneLiner": "Static channel allocation where stations share the entire frequency band by taking turns in dedicated time slots.",
    "quickAnswer": "TDMA divides transmission time into discrete recurring frames, each composed of a fixed number of synchronized time slots. Each station is assigned an exclusive slot in every frame, transmitting at the full channel data rate during its slot.",
    "whyItMatters": "TDMA powered 2G GSM cellular telephony worldwide and remains essential in satellite communication and military tactical data links.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>In <strong>Time Division Multiple Access (TDMA)</strong>, all stations share the entire transmission frequency spectrum, but access is divided temporally into repeating round-robin time slots. Guard times between slots prevent clock drift interference.</p>",
      "eli10": "In simple words: Static channel allocation where stations share the entire frequency band by taking turns in dedicated time slots.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Time Division Multiple Access (TDMA)?<br><br><strong>Answer:</strong> TDMA divides transmission time into discrete recurring frames, each composed of a fixed number of synchronized time slots. Each station is assigned an exclusive slot in every frame, transmitting at the full channel data rate during its slot.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Time Division Multiple Access (TDMA)?",
          "options": [
            "TDMA divides transmission time into discrete recurring frame...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: TDMA divides transmission time into discrete recurring frames, each composed of a fixed number of synchronized time slots. Each station is assigned an exclusive slot in every frame, transmitting at the full channel data rate during its slot."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/29/Tdma.PNG",
      "imageCaption": "Figure: Time Division Multiple Access (TDMA): Time Slots Partitioned within a Repetitive Frame."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/29/Tdma.PNG",
    "imageCaption": "Figure: Time Division Multiple Access (TDMA): Time Slots Partitioned within a Repetitive Frame."
  },
  "u2-dynamic-channel-allocation": {
    "id": "u2-dynamic-channel-allocation",
    "title": "Dynamic Channel Allocation",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Tanenbaum Ch. 4.1",
    "oneLiner": "On-demand channel allocation algorithms where bandwidth is granted dynamically based on active station traffic.",
    "quickAnswer": "Dynamic Channel Allocation allocates channel capacity on demand as stations generate traffic. Unlike static allocation where idle channels waste bandwidth, dynamic allocation maximizes efficiency for bursty computer traffic through random access (CSMA) or reservation schemes.",
    "whyItMatters": "Computer data traffic is inherently bursty (peak-to-average ratio 100:1). Dynamic channel allocation is the foundation of modern Ethernet, Wi-Fi, and the Internet.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>Because computer network traffic consists of short bursts separated by long idle periods, pre-allocating static slots wastes over 90% of channel capacity. Dynamic channel allocation grants transmission rights dynamically as packets arrive.</p>",
      "eli10": "In simple words: On-demand channel allocation algorithms where bandwidth is granted dynamically based on active station traffic.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Dynamic Channel Allocation?<br><br><strong>Answer:</strong> Dynamic Channel Allocation allocates channel capacity on demand as stations generate traffic. Unlike static allocation where idle channels waste bandwidth, dynamic allocation maximizes efficiency for bursty computer traffic through random access (CSMA) or reservation schemes.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Dynamic Channel Allocation?",
          "options": [
            "Dynamic Channel Allocation allocates channel capacity on dem...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Dynamic Channel Allocation allocates channel capacity on demand as stations generate traffic. Unlike static allocation where idle channels waste bandwidth, dynamic allocation maximizes efficiency for bursty computer traffic through random access (CSMA) or reservation schemes."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Multiple_Access.png",
      "imageCaption": "Figure: Dynamic Channel Allocation in Contention-Based Networks with Bursty Traffic."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Multiple_Access.png",
    "imageCaption": "Figure: Dynamic Channel Allocation in Contention-Based Networks with Bursty Traffic."
  },
  "u2-static-vs-dynamic-channel-allocation": {
    "id": "u2-static-vs-dynamic-channel-allocation",
    "title": "Static vs Dynamic Channel Allocation",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Tanenbaum Ch. 4.1 / Forouzan Ch. 12",
    "oneLiner": "Detailed comparison between static FDM/TDM allocation and dynamic on-demand contention mechanisms.",
    "quickAnswer": "Static allocation (FDM/TDM) assigns fixed channels to stations regardless of activity, providing guaranteed throughput and zero collisions, but suffers severe delay and wasted bandwidth under bursty loads. Dynamic allocation shares the channel on demand, offering high efficiency for bursty traffic.",
    "whyItMatters": "Tanenbaum's classic queueing delay formula proves that dividing bandwidth into N subchannels multiplies queueing delay by N under bursty traffic: T_static = N * T_dynamic.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<table class=\"wiki-table\"><thead><tr><th>Feature</th><th>Static Allocation (FDM / TDM)</th><th>Dynamic Allocation (Contention / Reservation)</th></tr></thead><tbody><tr><td><strong>Bandwidth Assignment</strong></td><td>Fixed, permanent slices</td><td>On-demand, dynamic</td></tr><tr><td><strong>Suitability</strong></td><td>Continuous, predictable traffic (voice, video)</td><td>Bursty, intermittent traffic (web, email)</td></tr><tr><td><strong>Channel Utilization under Bursty Load</strong></td><td>Very low (idle slots wasted)</td><td>High (active stations utilize full channel)</td></tr><tr><td><strong>Collision Risk</strong></td><td>Zero (interference impossible)</td><td>Possible in random access; resolved by MAC</td></tr><tr><td><strong>Queueing Delay for N stations</strong></td><td>N times higher (T = 1 / (C/N - lambda))</td><td>Low at average load</td></tr></tbody></table>",
      "eli10": "In simple words: Detailed comparison between static FDM/TDM allocation and dynamic on-demand contention mechanisms.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Static vs Dynamic Channel Allocation?<br><br><strong>Answer:</strong> Static allocation (FDM/TDM) assigns fixed channels to stations regardless of activity, providing guaranteed throughput and zero collisions, but suffers severe delay and wasted bandwidth under bursty loads. Dynamic allocation shares the channel on demand, offering high efficiency for bursty traffic.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Static vs Dynamic Channel Allocation?",
          "options": [
            "Static allocation (FDM/TDM) assigns fixed channels to statio...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Static allocation (FDM/TDM) assigns fixed channels to stations regardless of activity, providing guaranteed throughput and zero collisions, but suffers severe delay and wasted bandwidth under bursty loads. Dynamic allocation shares the channel on demand, offering high efficiency for bursty traffic."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/79/FDMA.PNG",
      "imageCaption": "Figure: Static (FDMA/TDMA) vs. Dynamic Channel Allocation Efficiency and Delay Analysis."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/79/FDMA.PNG",
    "imageCaption": "Figure: Static (FDMA/TDMA) vs. Dynamic Channel Allocation Efficiency and Delay Analysis."
  },
  "u2-multiple-access-intro": {
    "id": "u2-multiple-access-intro",
    "title": "Introduction to Multiple Access Protocols",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Beginner",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Forouzan Ch. 12 / Tanenbaum Ch. 4.2",
    "oneLiner": "The spectrum of protocols used to coordinate transmissions over shared communication channels.",
    "quickAnswer": "Multiple Access Protocols are rules that govern how multiple network nodes share a common transmission medium. They are divided into three broad categories: Random Access Protocols, Controlled Access Protocols, and Channelization Protocols.",
    "whyItMatters": "Every local area network (Ethernet, Wi-Fi) and wireless cellular link relies on multiple access protocols to avoid channel chaos.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>Multiple Access Protocols are divided into 3 primary categories: <strong>Random Access</strong> (ALOHA, CSMA, CSMA/CD, CSMA/CA), <strong>Controlled Access</strong> (Reservation, Polling, Token Passing), and <strong>Channelization</strong> (FDMA, TDMA, CDMA).</p>",
      "eli10": "In simple words: The spectrum of protocols used to coordinate transmissions over shared communication channels.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Introduction to Multiple Access Protocols?<br><br><strong>Answer:</strong> Multiple Access Protocols are rules that govern how multiple network nodes share a common transmission medium. They are divided into three broad categories: Random Access Protocols, Controlled Access Protocols, and Channelization Protocols.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Introduction to Multiple Access Protocols?",
          "options": [
            "Multiple Access Protocols are rules that govern how multiple...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Multiple Access Protocols are rules that govern how multiple network nodes share a common transmission medium. They are divided into three broad categories: Random Access Protocols, Controlled Access Protocols, and Channelization Protocols."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Multiple_Access.png",
      "imageCaption": "Figure: Multiple Access Protocol Taxonomy: Random Access, Controlled Access, and Channelization."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Multiple_Access.png",
    "imageCaption": "Figure: Multiple Access Protocol Taxonomy: Random Access, Controlled Access, and Channelization."
  },
  "u2-random-access-protocols": {
    "id": "u2-random-access-protocols",
    "title": "Random Access Protocols",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Forouzan Ch. 12.1",
    "oneLiner": "Contention-based access methods where stations compete for the channel without central coordination.",
    "quickAnswer": "In Random Access (or contention) protocols, no station is superior to another, and no central controller exists. Any station with data can attempt to transmit. If two stations transmit simultaneously, a collision occurs, and both back off for random delays before retrying.",
    "whyItMatters": "Random access provides decentralized, highly scalable communication that requires no master node or expensive pre-coordination.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>In Random Access methods, stations contend for transmission time. The key challenges are detecting when a collision occurs and choosing a randomized backoff delay so stations do not repeatedly collide with one another.</p>",
      "eli10": "In simple words: Contention-based access methods where stations compete for the channel without central coordination.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Random Access Protocols?<br><br><strong>Answer:</strong> In Random Access (or contention) protocols, no station is superior to another, and no central controller exists. Any station with data can attempt to transmit. If two stations transmit simultaneously, a collision occurs, and both back off for random delays before retrying.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Random Access Protocols?",
          "options": [
            "In Random Access (or contention) protocols, no station is su...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: In Random Access (or contention) protocols, no station is superior to another, and no central controller exists. Any station with data can attempt to transmit. If two stations transmit simultaneously, a collision occurs, and both back off for random delays before retrying."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/3/35/Pure_ALOHA1.svg",
      "imageCaption": "Figure: Random Access Protocols: Unscheduled Station Transmissions with Contention Resolution."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/3/35/Pure_ALOHA1.svg",
    "imageCaption": "Figure: Random Access Protocols: Unscheduled Station Transmissions with Contention Resolution."
  },
  "u2-pure-aloha": {
    "id": "u2-pure-aloha",
    "title": "Pure ALOHA Protocol",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Tanenbaum Ch. 4.2.1 / Forouzan Ch. 12.1",
    "oneLiner": "The pioneering random access protocol developed at the University of Hawaii with maximum throughput of 18.4%.",
    "quickAnswer": "Pure ALOHA allows stations to transmit whenever they have data. If two or more transmissions overlap even by a single bit, a collision occurs and frames are destroyed. The vulnerable period is 2 * T_fr, yielding a maximum throughput S = 1 / (2e) ≈ 18.4% at G = 0.5.",
    "whyItMatters": "Developed in 1970 by Norman Abramson, ALOHA is the intellectual ancestor of Ethernet and all modern packet-radio networks.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>In <strong>Pure ALOHA</strong>, stations transmit frames at arbitrary moments. If no acknowledgement is received, the station assumes a collision occurred, waits a random backoff time, and retransmits.</p><div class=\"wiki-img-box my-4 text-center\"><img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Aloha_pure_slotted.svg/600px-Aloha_pure_slotted.svg.png\" alt=\"Pure and Slotted ALOHA throughput\" class=\"mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain\" onerror=\"this.style.display='none'\"><p class=\"text-xs text-gray-500 mt-1 italic\">Figure: Throughput curves for Pure ALOHA (18.4%) vs Slotted ALOHA (36.8%).</p></div><p>Formula: $S = G e^{-2G}$. Maximum throughput occurs when offered load $G = 0.5$, giving $S = 0.5 e^{-1} \\approx 0.184$ (18.4%).</p>",
      "eli10": "In simple words: The pioneering random access protocol developed at the University of Hawaii with maximum throughput of 18.4%.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Pure ALOHA Protocol?<br><br><strong>Answer:</strong> Pure ALOHA allows stations to transmit whenever they have data. If two or more transmissions overlap even by a single bit, a collision occurs and frames are destroyed. The vulnerable period is 2 * T_fr, yielding a maximum throughput S = 1 / (2e) ≈ 18.4% at G = 0.5.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Pure ALOHA Protocol?",
          "options": [
            "Pure ALOHA allows stations to transmit whenever they have da...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Pure ALOHA allows stations to transmit whenever they have data. If two or more transmissions overlap even by a single bit, a collision occurs and frames are destroyed. The vulnerable period is 2 * T_fr, yielding a maximum throughput S = 1 / (2e) ≈ 18.4% at G = 0.5."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/3/35/Pure_ALOHA1.svg",
      "imageCaption": "Figure: Pure ALOHA Frame Collisions and Maximum Theoretical Throughput of 18.4% (1/2e)."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/3/35/Pure_ALOHA1.svg",
    "imageCaption": "Figure: Pure ALOHA Frame Collisions and Maximum Theoretical Throughput of 18.4% (1/2e)."
  },
  "u2-slotted-aloha": {
    "id": "u2-slotted-aloha",
    "title": "Slotted ALOHA Protocol",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Tanenbaum Ch. 4.2.2 / Forouzan Ch. 12.1",
    "oneLiner": "Slotted time boundaries that halve the vulnerable period and double ALOHA throughput to 36.8%.",
    "quickAnswer": "Slotted ALOHA divides time into discrete synchronized slots equal to the frame transmission time (T_fr). Stations can only begin transmission at the beginning of a slot boundary. This reduces the vulnerable period from 2 * T_fr to T_fr, doubling maximum throughput to S = 1 / e ≈ 36.8% at G = 1.0.",
    "whyItMatters": "By introducing clock synchronization, Slotted ALOHA doubles channel utilization and forms the basis for modern cellular random access channels (RACH).",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>Roberts proposed <strong>Slotted ALOHA</strong> in 1972 to reduce collisions by forbidding transmissions in the middle of ongoing frames. A collision only occurs if two stations attempt to transmit in the exact same slot. Vulnerable time is $T_{fr}$, giving throughput $S = G e^{-G}$.</p>",
      "eli10": "In simple words: Slotted time boundaries that halve the vulnerable period and double ALOHA throughput to 36.8%.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Slotted ALOHA Protocol?<br><br><strong>Answer:</strong> Slotted ALOHA divides time into discrete synchronized slots equal to the frame transmission time (T_fr). Stations can only begin transmission at the beginning of a slot boundary. This reduces the vulnerable period from 2 * T_fr to T_fr, doubling maximum throughput to S = 1 / e ≈ 36.8% at G = 1.0.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Slotted ALOHA Protocol?",
          "options": [
            "Slotted ALOHA divides time into discrete synchronized slots ...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Slotted ALOHA divides time into discrete synchronized slots equal to the frame transmission time (T_fr). Stations can only begin transmission at the beginning of a slot boundary. This reduces the vulnerable period from 2 * T_fr to T_fr, doubling maximum throughput to S = 1 / e ≈ 36.8% at G = 1.0."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Slotted_ALOHA.svg",
      "imageCaption": "Figure: Slotted ALOHA Synchronized Discrete Slots and Maximum Theoretical Throughput of 36.8% (1/e)."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Slotted_ALOHA.svg",
    "imageCaption": "Figure: Slotted ALOHA Synchronized Discrete Slots and Maximum Theoretical Throughput of 36.8% (1/e)."
  },
  "u2-csma-1-persistent": {
    "id": "u2-csma-1-persistent",
    "title": "1-Persistent CSMA",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Tanenbaum Ch. 4.2.3",
    "oneLiner": "Listen before talk: if the channel is idle, transmit immediately with probability 1; if busy, wait until idle.",
    "quickAnswer": "In 1-Persistent CSMA, a station senses the channel before transmitting. If the channel is busy, the station continuously listens until it detects the channel becoming idle, then transmits immediately with probability p = 1. If two stations are waiting for the channel to clear, both transmit simultaneously, causing a guaranteed collision.",
    "whyItMatters": "1-Persistent CSMA is the foundation of classic IEEE 802.3 Ethernet MAC operation.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>In <strong>1-Persistent Carrier Sense Multiple Access</strong>, a station monitors the channel. As soon as the wire becomes idle, it transmits immediately. While this eliminates idle channel waste, it causes high collision rates when multiple stations queue packets while a long frame is on the wire.</p>",
      "eli10": "In simple words: Listen before talk: if the channel is idle, transmit immediately with probability 1; if busy, wait until idle.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of 1-Persistent CSMA?<br><br><strong>Answer:</strong> In 1-Persistent CSMA, a station senses the channel before transmitting. If the channel is busy, the station continuously listens until it detects the channel becoming idle, then transmits immediately with probability p = 1. If two stations are waiting for the channel to clear, both transmit simultaneously, causing a guaranteed collision.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of 1-Persistent CSMA?",
          "options": [
            "In 1-Persistent CSMA, a station senses the channel before tr...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: In 1-Persistent CSMA, a station senses the channel before transmitting. If the channel is busy, the station continuously listens until it detects the channel becoming idle, then transmits immediately with probability p = 1. If two stations are waiting for the channel to clear, both transmit simultaneously, causing a guaranteed collision."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/a/ab/1-persistent_CSMA%E2%81%84CD_collision.png",
      "imageCaption": "Figure: 1-Persistent CSMA: Transmit Immediately with Probability 1 when Channel Becomes Idle."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/a/ab/1-persistent_CSMA%E2%81%84CD_collision.png",
    "imageCaption": "Figure: 1-Persistent CSMA: Transmit Immediately with Probability 1 when Channel Becomes Idle."
  },
  "u2-csma-non-persistent": {
    "id": "u2-csma-non-persistent",
    "title": "Non-Persistent CSMA",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Tanenbaum Ch. 4.2.3",
    "oneLiner": "If the channel is busy, wait a random time before sensing again to reduce collision probability.",
    "quickAnswer": "In Non-Persistent CSMA, a station senses the channel. If idle, it transmits immediately. If busy, the station does NOT continuously listen; instead, it waits a random period of time before sensing the channel again. This drastically reduces collisions at the cost of higher channel idle delay.",
    "whyItMatters": "It demonstrates the classic networking trade-off between collision prevention and channel latency.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>Non-Persistent CSMA reduces collisions by preventing multiple waiting stations from simultaneously bursting onto the wire the moment an ongoing transmission finishes. However, the channel often sits idle while waiting stations count down their backoff timers.</p>",
      "eli10": "In simple words: If the channel is busy, wait a random time before sensing again to reduce collision probability.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Non-Persistent CSMA?<br><br><strong>Answer:</strong> In Non-Persistent CSMA, a station senses the channel. If idle, it transmits immediately. If busy, the station does NOT continuously listen; instead, it waits a random period of time before sensing the channel again. This drastically reduces collisions at the cost of higher channel idle delay.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Non-Persistent CSMA?",
          "options": [
            "In Non-Persistent CSMA, a station senses the channel. If idl...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: In Non-Persistent CSMA, a station senses the channel. If idle, it transmits immediately. If busy, the station does NOT continuously listen; instead, it waits a random period of time before sensing the channel again. This drastically reduces collisions at the cost of higher channel idle delay."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Carrier_Sense_Multiple_Access_with_Collision_Detection.png",
      "imageCaption": "Figure: Non-Persistent CSMA: Wait a Random Backoff Interval upon Detecting a Busy Medium."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Carrier_Sense_Multiple_Access_with_Collision_Detection.png",
    "imageCaption": "Figure: Non-Persistent CSMA: Wait a Random Backoff Interval upon Detecting a Busy Medium."
  },
  "u2-csma-p-persistent": {
    "id": "u2-csma-p-persistent",
    "title": "p-Persistent CSMA",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Tanenbaum Ch. 4.2.3 / Forouzan Ch. 12.1",
    "oneLiner": "Slotted channel sensing where an idle channel transmits with probability p and defers with probability 1-p.",
    "quickAnswer": "p-Persistent CSMA applies to slotted channels. When a station finds the channel idle, it transmits with probability p, and defers to the next time slot with probability 1-p. If that next slot is also idle, it repeats the process. If busy, it executes backoff. Tuned properly, p * N ≈ 1 ensures high throughput and low collision.",
    "whyItMatters": "p-Persistent CSMA balances aggressive transmission with collision deterrence and influenced IEEE 802.11 Wi-Fi backoff design.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>In <strong>p-Persistent CSMA</strong>, the parameter $p$ controls transmission aggressiveness. If $p$ is too high, collisions multiply; if $p$ is too low, slots are wasted idling.</p>",
      "eli10": "In simple words: Slotted channel sensing where an idle channel transmits with probability p and defers with probability 1-p.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of p-Persistent CSMA?<br><br><strong>Answer:</strong> p-Persistent CSMA applies to slotted channels. When a station finds the channel idle, it transmits with probability p, and defers to the next time slot with probability 1-p. If that next slot is also idle, it repeats the process. If busy, it executes backoff. Tuned properly, p * N ≈ 1 ensures high throughput and low collision.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of p-Persistent CSMA?",
          "options": [
            "p-Persistent CSMA applies to slotted channels. When a statio...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: p-Persistent CSMA applies to slotted channels. When a station finds the channel idle, it transmits with probability p, and defers to the next time slot with probability 1-p. If that next slot is also idle, it repeats the process. If busy, it executes backoff. Tuned properly, p * N ≈ 1 ensures high throughput and low collision."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Carrier_Sense_Multiple_Access_with_Collision_Detection.png",
      "imageCaption": "Figure: p-Persistent CSMA in Slotted Channels: Transmit with Probability p or Defer to Next Slot."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Carrier_Sense_Multiple_Access_with_Collision_Detection.png",
    "imageCaption": "Figure: p-Persistent CSMA in Slotted Channels: Transmit with Probability p or Defer to Next Slot."
  },
  "u2-csma-cd": {
    "id": "u2-csma-cd",
    "title": "CSMA with Collision Detection (CSMA/CD)",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.3 / Tanenbaum Ch. 4.2.4",
    "oneLiner": "Listen while transmitting: abort transmission immediately upon detecting collision and send a jam signal.",
    "quickAnswer": "CSMA/CD improves CSMA by having stations listen to the wire while transmitting. If the electrical signal voltage exceeds normal threshold (indicating collision), the station immediately aborts transmission, broadcasts a 48-bit jam signal to notify other stations, and executes binary exponential backoff.",
    "whyItMatters": "CSMA/CD is the defining innovation of Robert Metcalfe's Ethernet (IEEE 802.3), saving massive bandwidth by stopping collided frames early.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>In standard CSMA, when two stations collide, they continue transmitting their entire frames, wasting channel bandwidth. <strong>CSMA/CD</strong> halts transmission within microseconds of detecting a collision.</p><div class=\"wiki-img-box my-4 text-center\"><img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/CSMA_CD_flowchart.svg/500px-CSMA_CD_flowchart.svg.png\" alt=\"CSMA CD flowchart\" class=\"mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain\" onerror=\"this.style.display='none'\"><p class=\"text-xs text-gray-500 mt-1 italic\">Figure: CSMA/CD operational flowchart.</p></div><p>Key Condition: Transmission time must be at least twice the propagation delay: $T_{trans} \\ge 2 \\times T_{prop}$, establishing Ethernet's 64-byte minimum frame size.</p>",
      "eli10": "In simple words: Listen while transmitting: abort transmission immediately upon detecting collision and send a jam signal.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of CSMA with Collision Detection (CSMA/CD)?<br><br><strong>Answer:</strong> CSMA/CD improves CSMA by having stations listen to the wire while transmitting. If the electrical signal voltage exceeds normal threshold (indicating collision), the station immediately aborts transmission, broadcasts a 48-bit jam signal to notify other stations, and executes binary exponential backoff.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of CSMA with Collision Detection (CSMA/CD)?",
          "options": [
            "CSMA/CD improves CSMA by having stations listen to the wire ...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: CSMA/CD improves CSMA by having stations listen to the wire while transmitting. If the electrical signal voltage exceeds normal threshold (indicating collision), the station immediately aborts transmission, broadcasts a 48-bit jam signal to notify other stations, and executes binary exponential backoff."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Carrier_Sense_Multiple_Access_with_Collision_Detection.png",
      "imageCaption": "Figure: CSMA/CD Operational Flowchart: Listen While Talking, Collision Abort, Jam Signal, and Exponential Backoff."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Carrier_Sense_Multiple_Access_with_Collision_Detection.png",
    "imageCaption": "Figure: CSMA/CD Operational Flowchart: Listen While Talking, Collision Abort, Jam Signal, and Exponential Backoff."
  },
  "u2-csma-ca": {
    "id": "u2-csma-ca",
    "title": "CSMA with Collision Avoidance (CSMA/CA)",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.11 / Forouzan Ch. 12.1",
    "oneLiner": "Carrier sense with IFS timers, exponential backoff, and RTS/CTS handshake for wireless media.",
    "quickAnswer": "In wireless communication, stations cannot detect collisions while transmitting because their own signal swamps receiver circuitry. CSMA/CA avoids collisions proactively by sensing channel idle status for Interframe Spaces (DIFS/SIFS), running random backoff timers, and optionally exchanging RTS/CTS reservation frames.",
    "whyItMatters": "CSMA/CA is the MAC protocol that powers all Wi-Fi networks (IEEE 802.11a/b/g/n/ac/ax/be).",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>Because radios cannot transmit and listen on the exact same frequency simultaneously without burning their sensitive RF frontend, wireless networks use <strong>Collision Avoidance (CSMA/CA)</strong> rather than Collision Detection.</p>",
      "eli10": "In simple words: Carrier sense with IFS timers, exponential backoff, and RTS/CTS handshake for wireless media.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of CSMA with Collision Avoidance (CSMA/CA)?<br><br><strong>Answer:</strong> In wireless communication, stations cannot detect collisions while transmitting because their own signal swamps receiver circuitry. CSMA/CA avoids collisions proactively by sensing channel idle status for Interframe Spaces (DIFS/SIFS), running random backoff timers, and optionally exchanging RTS/CTS reservation frames.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of CSMA with Collision Avoidance (CSMA/CA)?",
          "options": [
            "In wireless communication, stations cannot detect collisions...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: In wireless communication, stations cannot detect collisions while transmitting because their own signal swamps receiver circuitry. CSMA/CA avoids collisions proactively by sensing channel idle status for Interframe Spaces (DIFS/SIFS), running random backoff timers, and optionally exchanging RTS/CTS reservation frames."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Csma_ca.svg",
      "imageCaption": "Figure: CSMA/CA Collision Avoidance Timing: DIFS, Contention Window Slots, SIFS, and ACK."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Csma_ca.svg",
    "imageCaption": "Figure: CSMA/CA Collision Avoidance Timing: DIFS, Contention Window Slots, SIFS, and ACK."
  },
  "u2-comparison-multiple-access": {
    "id": "u2-comparison-multiple-access",
    "title": "Comparison of Multiple Access Protocols",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Forouzan Ch. 12 / Tanenbaum Ch. 4",
    "oneLiner": "Master comparative analysis of ALOHA, CSMA, CSMA/CD, and CSMA/CA protocols.",
    "quickAnswer": "Pure ALOHA offers 18.4% throughput with zero carrier sensing. Slotted ALOHA doubles throughput to 36.8% via time slots. CSMA senses carrier before talking. CSMA/CD detects collisions while talking (wired Ethernet). CSMA/CA avoids collisions proactively via IFS and RTS/CTS (wireless Wi-Fi).",
    "whyItMatters": "Comparing these protocols synthesizes the history and mechanics of local area network technology.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<table class=\"wiki-table\"><thead><tr><th>Protocol</th><th>Carrier Sense?</th><th>Collision Detection?</th><th>Vulnerable Period</th><th>Max Throughput</th><th>Primary Technology</th></tr></thead><tbody><tr><td><strong>Pure ALOHA</strong></td><td>No</td><td>No</td><td>2 * T_fr</td><td>18.4% (at G=0.5)</td><td>Early satellite networks</td></tr><tr><td><strong>Slotted ALOHA</strong></td><td>No</td><td>No</td><td>T_fr</td><td>36.8% (at G=1.0)</td><td>Cellular RACH</td></tr><tr><td><strong>1-Persistent CSMA</strong></td><td>Yes</td><td>No</td><td>T_prop</td><td>~50%</td><td>Early local bus networks</td></tr><tr><td><strong>CSMA/CD</strong></td><td>Yes</td><td>Yes</td><td>2 * T_prop</td><td>> 80–90%</td><td>Classic Ethernet (802.3)</td></tr><tr><td><strong>CSMA/CA</strong></td><td>Yes</td><td>No (Avoids)</td><td>RTS/CTS / SIFS</td><td>~60–75%</td><td>Wireless LANs (802.11)</td></tr></tbody></table>",
      "eli10": "In simple words: Master comparative analysis of ALOHA, CSMA, CSMA/CD, and CSMA/CA protocols.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Comparison of Multiple Access Protocols?<br><br><strong>Answer:</strong> Pure ALOHA offers 18.4% throughput with zero carrier sensing. Slotted ALOHA doubles throughput to 36.8% via time slots. CSMA senses carrier before talking. CSMA/CD detects collisions while talking (wired Ethernet). CSMA/CA avoids collisions proactively via IFS and RTS/CTS (wireless Wi-Fi).",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Comparison of Multiple Access Protocols?",
          "options": [
            "Pure ALOHA offers 18.4% throughput with zero carrier sensing...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Pure ALOHA offers 18.4% throughput with zero carrier sensing. Slotted ALOHA doubles throughput to 36.8% via time slots. CSMA senses carrier before talking. CSMA/CD detects collisions while talking (wired Ethernet). CSMA/CA avoids collisions proactively via IFS and RTS/CTS (wireless Wi-Fi)."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Carrier_Sense_Multiple_Access_with_Collision_Detection.png",
      "imageCaption": "Figure: Comprehensive Comparison: ALOHA vs. CSMA vs. CSMA/CD vs. CSMA/CA."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Carrier_Sense_Multiple_Access_with_Collision_Detection.png",
    "imageCaption": "Figure: Comprehensive Comparison: ALOHA vs. CSMA vs. CSMA/CD vs. CSMA/CA."
  },
  "u2-collision-free-intro": {
    "id": "u2-collision-free-intro",
    "title": "Introduction to Collision-Free Protocols",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Tanenbaum Ch. 4.2.5",
    "oneLiner": "Protocols that resolve channel contention beforehand so data transmissions are 100% collision-free.",
    "quickAnswer": "Collision-free protocols resolve channel competition in a separate contention/reservation phase before data is transmitted. As a result, actual data frames never experience collisions, ensuring guaranteed channel utilization even under heavy network load.",
    "whyItMatters": "Under heavy load, contention protocols like ALOHA and CSMA suffer throughput collapse due to frequent collisions. Collision-free protocols remain stable and efficient.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>While contention protocols work well under light loads, their efficiency degrades when many stations compete simultaneously. Collision-free protocols resolve channel rights in advance using bit reservation, binary arbitration, or token circulation.</p>",
      "eli10": "In simple words: Protocols that resolve channel contention beforehand so data transmissions are 100% collision-free.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Introduction to Collision-Free Protocols?<br><br><strong>Answer:</strong> Collision-free protocols resolve channel competition in a separate contention/reservation phase before data is transmitted. As a result, actual data frames never experience collisions, ensuring guaranteed channel utilization even under heavy network load.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Introduction to Collision-Free Protocols?",
          "options": [
            "Collision-free protocols resolve channel competition in a se...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Collision-free protocols resolve channel competition in a separate contention/reservation phase before data is transmitted. As a result, actual data frames never experience collisions, ensuring guaranteed channel utilization even under heavy network load."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ]
    }
  },
  "u2-bit-map-protocol": {
    "id": "u2-bit-map-protocol",
    "title": "Bit-Map Protocol",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Tanenbaum Ch. 4.2.5",
    "oneLiner": "Reservation protocol where each contention period contains N bits for N stations to indicate transmission intent.",
    "quickAnswer": "In the basic bit-map protocol, each contention period consists of N 1-bit slots for N stations. If Station j wants to transmit, it transmits a 1 bit in slot j. After the contention period, stations that asserted a 1 transmit their frames in numerical order, completely collision-free.",
    "whyItMatters": "It illustrates pure reservation: channel overhead is exactly N bits per round, yielding efficiency d / (d + 1) at high load.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>In the <strong>Bit-Map Protocol</strong>, time is divided into a contention period and a data transmission period. Stations announce their intention to transmit by setting their corresponding bit in an $N$-bit reservation vector.</p>",
      "eli10": "In simple words: Reservation protocol where each contention period contains N bits for N stations to indicate transmission intent.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Bit-Map Protocol?<br><br><strong>Answer:</strong> In the basic bit-map protocol, each contention period consists of N 1-bit slots for N stations. If Station j wants to transmit, it transmits a 1 bit in slot j. After the contention period, stations that asserted a 1 transmit their frames in numerical order, completely collision-free.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Bit-Map Protocol?",
          "options": [
            "In the basic bit-map protocol, each contention period consis...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: In the basic bit-map protocol, each contention period consists of N 1-bit slots for N stations. If Station j wants to transmit, it transmits a 1 bit in slot j. After the contention period, stations that asserted a 1 transmit their frames in numerical order, completely collision-free."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ]
    }
  },
  "u2-binary-countdown-protocol": {
    "id": "u2-binary-countdown-protocol",
    "title": "Binary Countdown Protocol",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Tanenbaum Ch. 4.2.5",
    "oneLiner": "Address arbitration protocol where stations transmit address bits and drop out if a higher-priority bit is heard.",
    "quickAnswer": "Stations needing to transmit broadcast their binary station addresses bit by bit, starting with the most significant bit. The channel executes a bitwise boolean OR. If a station's address bit is 0 but it sees a 1 on the channel, it drops out. The station with the highest binary address wins the channel.",
    "whyItMatters": "Binary Countdown achieved channel efficiency d / (d + log2(N)) and inspired the Controller Area Network (CAN bus) used in modern automobiles.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>The <strong>Binary Countdown Protocol</strong> overcomes the $N$-bit overhead of the bit-map protocol by requiring only $\\log_2 N$ bits to arbitrate among $N$ stations.</p>",
      "eli10": "In simple words: Address arbitration protocol where stations transmit address bits and drop out if a higher-priority bit is heard.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Binary Countdown Protocol?<br><br><strong>Answer:</strong> Stations needing to transmit broadcast their binary station addresses bit by bit, starting with the most significant bit. The channel executes a bitwise boolean OR. If a station's address bit is 0 but it sees a 1 on the channel, it drops out. The station with the highest binary address wins the channel.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Binary Countdown Protocol?",
          "options": [
            "Stations needing to transmit broadcast their binary station ...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Stations needing to transmit broadcast their binary station addresses bit by bit, starting with the most significant bit. The channel executes a bitwise boolean OR. If a station's address bit is 0 but it sees a 1 on the channel, it drops out. The station with the highest binary address wins the channel."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Token_ring.svg",
      "imageCaption": "Figure: Binary Countdown Protocol: Bitwise Boolean OR Arbitration by Station Binary Priority Address."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Token_ring.svg",
    "imageCaption": "Figure: Binary Countdown Protocol: Bitwise Boolean OR Arbitration by Station Binary Priority Address."
  },
  "u2-token-passing-protocol": {
    "id": "u2-token-passing-protocol",
    "title": "Token Passing Protocol",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.5 / Tanenbaum Ch. 4.2",
    "oneLiner": "Deterministic ring access protocol where a special control frame (token) circulates among stations.",
    "quickAnswer": "In token passing protocols (e.g., Token Ring IEEE 802.5, Token Bus IEEE 802.4), a special small frame called a token circulates sequentially among stations. Only the station possessing the token is permitted to transmit. After transmitting, it passes the token to its successor.",
    "whyItMatters": "Token passing delivers deterministic maximum latency and guaranteed throughput, making it popular in industrial and avionics automation.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>In <strong>Token Ring</strong>, stations are connected in a logical ring. A station holds the token for a maximum Token Holding Time (THT), transmits its data, and then releases the token to the downstream neighbor.</p>",
      "eli10": "In simple words: Deterministic ring access protocol where a special control frame (token) circulates among stations.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Token Passing Protocol?<br><br><strong>Answer:</strong> In token passing protocols (e.g., Token Ring IEEE 802.5, Token Bus IEEE 802.4), a special small frame called a token circulates sequentially among stations. Only the station possessing the token is permitted to transmit. After transmitting, it passes the token to its successor.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Token Passing Protocol?",
          "options": [
            "In token passing protocols (e.g., Token Ring IEEE 802.5, Tok...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: In token passing protocols (e.g., Token Ring IEEE 802.5, Token Bus IEEE 802.4), a special small frame called a token circulates sequentially among stations. Only the station possessing the token is permitted to transmit. After transmitting, it passes the token to its successor."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Token_ring.svg",
      "imageCaption": "Figure: Token Passing Protocol: Circulating Control Token in Ring and Bus Topologies."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Token_ring.svg",
    "imageCaption": "Figure: Token Passing Protocol: Circulating Control Token in Ring and Bus Topologies."
  },
  "u2-collision-free-working-principles": {
    "id": "u2-collision-free-working-principles",
    "title": "Working Principles and Examples of Collision-Free Protocols",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Tanenbaum Ch. 4.2.5",
    "oneLiner": "Step-by-step traces of Bit-Map, Binary Countdown, and Token Ring under varying network load.",
    "quickAnswer": "Traces demonstrate: (1) Bit-Map: Stations 1, 3, 7 set bits 1, 3, 7 in an 8-bit contention vector; frames 1, 3, 7 transmit sequentially. (2) Binary Countdown: Stations 0010, 1001, 1010 compete; bit 3 eliminates 0010; bit 1 eliminates 1001; 1010 wins. (3) Token Ring: Token passes A -> B -> C -> D; C seizes token, sends data, regenerates token to D.",
    "whyItMatters": "Working through concrete examples solidifies understanding of arbitration without collisions.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>Detailed walkthroughs of arbitration sequences for Bit-Map, Binary Countdown, and Token Passing under light and heavy network traffic conditions.</p>",
      "eli10": "In simple words: Step-by-step traces of Bit-Map, Binary Countdown, and Token Ring under varying network load.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Working Principles and Examples of Collision-Free Protocols?<br><br><strong>Answer:</strong> Traces demonstrate: (1) Bit-Map: Stations 1, 3, 7 set bits 1, 3, 7 in an 8-bit contention vector; frames 1, 3, 7 transmit sequentially. (2) Binary Countdown: Stations 0010, 1001, 1010 compete; bit 3 eliminates 0010; bit 1 eliminates 1001; 1010 wins. (3) Token Ring: Token passes A -> B -> C -> D; C seizes token, sends data, regenerates token to D.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Working Principles and Examples of Collision-Free Protocols?",
          "options": [
            "Traces demonstrate: (1) Bit-Map: Stations 1, 3, 7 set bits 1...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Traces demonstrate: (1) Bit-Map: Stations 1, 3, 7 set bits 1, 3, 7 in an 8-bit contention vector; frames 1, 3, 7 transmit sequentially. (2) Binary Countdown: Stations 0010, 1001, 1010 compete; bit 3 eliminates 0010; bit 1 eliminates 1001; 1010 wins. (3) Token Ring: Token passes A -> B -> C -> D; C seizes token, sends data, regenerates token to D."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ]
    }
  },
  "u2-comparison-collision-free": {
    "id": "u2-comparison-collision-free",
    "title": "Comparison of Collision-Free Protocols",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Tanenbaum Ch. 4.2.5",
    "oneLiner": "Comparative matrix analyzing overhead, fairness, channel efficiency, and failure modes.",
    "quickAnswer": "Bit-Map requires N contention bits and favors lower-numbered stations. Binary Countdown requires log2(N) bits and favors higher-numbered stations unless modified. Token Passing requires no contention phase but suffers from token loss and ring break vulnerabilities.",
    "whyItMatters": "Reveals why modern switched Ethernet replaced both contention and collision-free shared media architectures.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<table class=\"wiki-table\"><thead><tr><th>Protocol</th><th>Contention Overhead</th><th>Station Priority Bias</th><th>Efficiency at High Load</th><th>Failure Mode</th></tr></thead><tbody><tr><td><strong>Bit-Map</strong></td><td>N bits per round</td><td>Low station numbers transmit first</td><td>d / (d + 1)</td><td>Single station cannot break ring</td></tr><tr><td><strong>Binary Countdown</strong></td><td>log2(N) bits per round</td><td>High address stations dominate</td><td>d / (d + log2 N)</td><td>Bus arbitration failure</td></tr><tr><td><strong>Token Ring</strong></td><td>Small token frame</td><td>Fair round-robin token rotation</td><td>Very high</td><td>Token loss, monitor station required</td></tr></tbody></table>",
      "eli10": "In simple words: Comparative matrix analyzing overhead, fairness, channel efficiency, and failure modes.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Comparison of Collision-Free Protocols?<br><br><strong>Answer:</strong> Bit-Map requires N contention bits and favors lower-numbered stations. Binary Countdown requires log2(N) bits and favors higher-numbered stations unless modified. Token Passing requires no contention phase but suffers from token loss and ring break vulnerabilities.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Comparison of Collision-Free Protocols?",
          "options": [
            "Bit-Map requires N contention bits and favors lower-numbered...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Bit-Map requires N contention bits and favors lower-numbered stations. Binary Countdown requires log2(N) bits and favors higher-numbered stations unless modified. Token Passing requires no contention phase but suffers from token loss and ring break vulnerabilities."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Token_ring.svg",
      "imageCaption": "Figure: Comparison of Collision-Free Protocols: Bit-Map vs. Binary Countdown vs. Token Passing."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Token_ring.svg",
    "imageCaption": "Figure: Comparison of Collision-Free Protocols: Bit-Map vs. Binary Countdown vs. Token Passing."
  },
  "u2-ethernet-architecture": {
    "id": "u2-ethernet-architecture",
    "title": "Ethernet Architecture",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.3 / Tanenbaum Ch. 4.3",
    "oneLiner": "From classic 10BASE5 coax bus topology to modern switched full-duplex star networks.",
    "quickAnswer": "Ethernet architecture evolved from shared medium bus topologies (10BASE5 Thicknet, 10BASE2 Thinnet) to star-wired hub topologies (10BASE-T) and finally to modern full-duplex switched networks with point-to-point twisted-pair or fiber links.",
    "whyItMatters": "Understanding Ethernet's architectural evolution explains why modern networks no longer experience CSMA/CD collisions while retaining 802.3 frame formats.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>Originally conceived by Bob Metcalfe at Xerox PARC in 1973, Ethernet revolutionized local area networking. Over 50 years, Ethernet shifted from a broadcast bus with vampire taps to multi-gigabit switched star topologies.</p>",
      "eli10": "In simple words: From classic 10BASE5 coax bus topology to modern switched full-duplex star networks.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Ethernet Architecture?<br><br><strong>Answer:</strong> Ethernet architecture evolved from shared medium bus topologies (10BASE5 Thicknet, 10BASE2 Thinnet) to star-wired hub topologies (10BASE-T) and finally to modern full-duplex switched networks with point-to-point twisted-pair or fiber links.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Ethernet Architecture?",
          "options": [
            "Ethernet architecture evolved from shared medium bus topolog...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Ethernet architecture evolved from shared medium bus topologies (10BASE5 Thicknet, 10BASE2 Thinnet) to star-wired hub topologies (10BASE-T) and finally to modern full-duplex switched networks with point-to-point twisted-pair or fiber links."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/13/Ethernet_Type_II_Frame_format.svg",
      "imageCaption": "Figure: Standard Ethernet Architecture: Physical Layer (PHY), Media Access Control (MAC), and LLC Sublayers."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/13/Ethernet_Type_II_Frame_format.svg",
    "imageCaption": "Figure: Standard Ethernet Architecture: Physical Layer (PHY), Media Access Control (MAC), and LLC Sublayers."
  },
  "u2-ethernet-frame-format": {
    "id": "u2-ethernet-frame-format",
    "title": "Ethernet Frame Format",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.3 / DIX Ethernet II",
    "oneLiner": "The 802.3 frame structure: Preamble, SFD, Destination/Source MAC, Type/Length, Data, and FCS.",
    "quickAnswer": "An Ethernet frame consists of: (1) 7-byte Preamble for clock sync, (2) 1-byte Start Frame Delimiter (SFD: 10101011), (3) 6-byte Destination MAC, (4) 6-byte Source MAC, (5) 2-byte EtherType / Length, (6) 46 to 1500-byte Data Payload, and (7) 4-byte CRC-32 Frame Check Sequence (FCS). Minimum frame size is 64 bytes.",
    "whyItMatters": "Every network engineer, packet analyzer (Wireshark), and network switch inspects this exact frame layout trillions of times per day.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<div class=\"wiki-img-box my-4 text-center\"><img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Ethernet_frame.svg/600px-Ethernet_frame.svg.png\" alt=\"Ethernet 802.3 Frame Format\" class=\"mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain\" onerror=\"this.style.display='none'\"><p class=\"text-xs text-gray-500 mt-1 italic\">Figure: Standard IEEE 802.3 Ethernet frame structure.</p></div><table class=\"wiki-table\"><thead><tr><th>Field</th><th>Size (Bytes)</th><th>Description</th></tr></thead><tbody><tr><td>Preamble</td><td>7</td><td>Alternating 10101010 bits for transceiver clock synchronization</td></tr><tr><td>SFD (Start Frame Delimiter)</td><td>1</td><td>Pattern 10101011 indicating the start of MAC addresses</td></tr><tr><td>Destination MAC</td><td>6</td><td>48-bit hardware address of receiving interface</td></tr><tr><td>Source MAC</td><td>6</td><td>48-bit hardware address of sending interface</td></tr><tr><td>Type / Length</td><td>2</td><td>Protocol type (e.g., 0x0800 for IPv4, 0x0806 for ARP)</td></tr><tr><td>Payload / Data</td><td>46–1500</td><td>Encapsulated Network Layer packet (padded to 46 bytes if shorter)</td></tr><tr><td>FCS (CRC-32)</td><td>4</td><td>Cyclic redundancy check for detecting bit corruption</td></tr></tbody></table>",
      "eli10": "In simple words: The 802.3 frame structure: Preamble, SFD, Destination/Source MAC, Type/Length, Data, and FCS.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Ethernet Frame Format?<br><br><strong>Answer:</strong> An Ethernet frame consists of: (1) 7-byte Preamble for clock sync, (2) 1-byte Start Frame Delimiter (SFD: 10101011), (3) 6-byte Destination MAC, (4) 6-byte Source MAC, (5) 2-byte EtherType / Length, (6) 46 to 1500-byte Data Payload, and (7) 4-byte CRC-32 Frame Check Sequence (FCS). Minimum frame size is 64 bytes.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Ethernet Frame Format?",
          "options": [
            "An Ethernet frame consists of: (1) 7-byte Preamble for clock...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: An Ethernet frame consists of: (1) 7-byte Preamble for clock sync, (2) 1-byte Start Frame Delimiter (SFD: 10101011), (3) 6-byte Destination MAC, (4) 6-byte Source MAC, (5) 2-byte EtherType / Length, (6) 46 to 1500-byte Data Payload, and (7) 4-byte CRC-32 Frame Check Sequence (FCS). Minimum frame size is 64 bytes."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/42/Ethernet_frame.svg",
      "imageCaption": "Figure: IEEE 802.3 Ethernet Frame Format: Preamble (7B), SFD (1B), Dst MAC (6B), Src MAC (6B), EtherType (2B), Data (46-1500B), FCS (4B)."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/42/Ethernet_frame.svg",
    "imageCaption": "Figure: IEEE 802.3 Ethernet Frame Format: Preamble (7B), SFD (1B), Dst MAC (6B), Src MAC (6B), EtherType (2B), Data (46-1500B), FCS (4B)."
  },
  "u2-ethernet-mac-protocol": {
    "id": "u2-ethernet-mac-protocol",
    "title": "Ethernet MAC Protocol",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.3",
    "oneLiner": "1-persistent CSMA/CD with truncated binary exponential backoff.",
    "quickAnswer": "The classic Ethernet MAC algorithm executes 1-persistent CSMA/CD. When a station has a frame to send, it senses the channel. If idle, it transmits immediately. If busy, it waits until idle. While transmitting, it monitors voltage for collisions; if a collision occurs, it sends a 48-bit jam signal and initiates backoff.",
    "whyItMatters": "It defines the exact mathematical rules governing half-duplex Ethernet transmission.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>The Ethernet MAC protocol combines carrier sensing, immediate transmission upon channel clearance, collision monitoring during frame output, and randomized exponential backoff.</p>",
      "eli10": "In simple words: 1-persistent CSMA/CD with truncated binary exponential backoff.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Ethernet MAC Protocol?<br><br><strong>Answer:</strong> The classic Ethernet MAC algorithm executes 1-persistent CSMA/CD. When a station has a frame to send, it senses the channel. If idle, it transmits immediately. If busy, it waits until idle. While transmitting, it monitors voltage for collisions; if a collision occurs, it sends a 48-bit jam signal and initiates backoff.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Ethernet MAC Protocol?",
          "options": [
            "The classic Ethernet MAC algorithm executes 1-persistent CSM...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: The classic Ethernet MAC algorithm executes 1-persistent CSMA/CD. When a station has a frame to send, it senses the channel. If idle, it transmits immediately. If busy, it waits until idle. While transmitting, it monitors voltage for collisions; if a collision occurs, it sends a 48-bit jam signal and initiates backoff."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/13/Ethernet_Type_II_Frame_format.svg",
      "imageCaption": "Figure: Ethernet MAC Protocol: Half-Duplex CSMA/CD vs. Full-Duplex Switched Operation."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/13/Ethernet_Type_II_Frame_format.svg",
    "imageCaption": "Figure: Ethernet MAC Protocol: Half-Duplex CSMA/CD vs. Full-Duplex Switched Operation."
  },
  "u2-ethernet-csma-cd-operation": {
    "id": "u2-ethernet-csma-cd-operation",
    "title": "CSMA/CD Operation in Ethernet",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.3",
    "oneLiner": "The physics of collision detection, slot time, and the 64-byte minimum frame size constraint.",
    "quickAnswer": "To guarantee collision detection before transmission ends, frame transmission time (T_trans) must be at least twice the end-to-end cable propagation delay (2 * T_prop). At 10 Mbps over 2.5 km, slot time is 51.2 microseconds, requiring a minimum frame size of 64 bytes (512 bits).",
    "whyItMatters": "This fundamental equation links physical wire speed, distance limitations, and packet size limits.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>Formula: $T_{trans} = \\frac{\\text{Frame Size}}{\\text{Bandwidth}} \\ge 2 \\times T_{prop} = \\frac{2 \\times \\text{Distance}}{v}$. If a frame were smaller than 64 bytes, a collision at the far end of the cable could arrive back after the sender had already finished transmitting, resulting in an undetected collision!</p>",
      "eli10": "In simple words: The physics of collision detection, slot time, and the 64-byte minimum frame size constraint.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of CSMA/CD Operation in Ethernet?<br><br><strong>Answer:</strong> To guarantee collision detection before transmission ends, frame transmission time (T_trans) must be at least twice the end-to-end cable propagation delay (2 * T_prop). At 10 Mbps over 2.5 km, slot time is 51.2 microseconds, requiring a minimum frame size of 64 bytes (512 bits).",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of CSMA/CD Operation in Ethernet?",
          "options": [
            "To guarantee collision detection before transmission ends, f...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: To guarantee collision detection before transmission ends, frame transmission time (T_trans) must be at least twice the end-to-end cable propagation delay (2 * T_prop). At 10 Mbps over 2.5 km, slot time is 51.2 microseconds, requiring a minimum frame size of 64 bytes (512 bits)."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ]
    }
  },
  "u2-binary-exponential-backoff": {
    "id": "u2-binary-exponential-backoff",
    "title": "Binary Exponential Backoff Algorithm",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.3 Section 4.2.3.2.5",
    "oneLiner": "Dynamic collision resolution algorithm doubling the contention window after each successive collision.",
    "quickAnswer": "After collision number i, a station chooses a random backoff integer k from range [0, 2^min(i, 10) - 1]. The station waits k * Slot Time (51.2 microseconds for 10 Mbps) before retrying. After 10 collisions, the window caps at 1023. After 16 consecutive collisions, transmission fails and an error is reported.",
    "whyItMatters": "Binary exponential backoff adapts automatically to network congestion: small delays under light load, wide dispersion under heavy load.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>After $i$ collisions, the sender draws $k$ uniformly at random from $[0, 2^{\\min(i, 10)} - 1]$ and waits $k \\times 51.2\\;\\mu\\text{s}$. If 16 collisions occur consecutively, the frame is aborted.</p>",
      "eli10": "In simple words: Dynamic collision resolution algorithm doubling the contention window after each successive collision.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Binary Exponential Backoff Algorithm?<br><br><strong>Answer:</strong> After collision number i, a station chooses a random backoff integer k from range [0, 2^min(i, 10) - 1]. The station waits k * Slot Time (51.2 microseconds for 10 Mbps) before retrying. After 10 collisions, the window caps at 1023. After 16 consecutive collisions, transmission fails and an error is reported.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Binary Exponential Backoff Algorithm?",
          "options": [
            "After collision number i, a station chooses a random backoff...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: After collision number i, a station chooses a random backoff integer k from range [0, 2^min(i, 10) - 1]. The station waits k * Slot Time (51.2 microseconds for 10 Mbps) before retrying. After 10 collisions, the window caps at 1023. After 16 consecutive collisions, transmission fails and an error is reported."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Carrier_Sense_Multiple_Access_with_Collision_Detection.png",
      "imageCaption": "Figure: Truncated Binary Exponential Backoff Algorithm: Waiting r * 51.2 µs with r chosen uniformly from [0, 2^k - 1]."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Carrier_Sense_Multiple_Access_with_Collision_Detection.png",
    "imageCaption": "Figure: Truncated Binary Exponential Backoff Algorithm: Waiting r * 51.2 µs with r chosen uniformly from [0, 2^k - 1]."
  },
  "u2-ethernet-types-evolution": {
    "id": "u2-ethernet-types-evolution",
    "title": "Ethernet Types and Evolution",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.3 Standards Family",
    "oneLiner": "Chronological progression from 10 Mbps Standard Ethernet to 400 Gbps cloud datacenter fabrics.",
    "quickAnswer": "Ethernet evolved through distinct speed generations: Standard Ethernet (10 Mbps, 10BASE-T), Fast Ethernet (100 Mbps, 100BASE-TX), Gigabit Ethernet (1 Gbps, 1000BASE-T), 10-Gigabit Ethernet (10 Gbps, 10GBASE-T / optical), and hyperscale 40G/100G/400G/800G Ethernet.",
    "whyItMatters": "Ethernet's ability to scale speed by a factor of 40,000x while preserving the exact same 802.3 frame format is one of computing's greatest triumphs.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<table class=\"wiki-table\"><thead><tr><th>Standard</th><th>Data Rate</th><th>Medium</th><th>Max Distance</th><th>Key Characteristic</th></tr></thead><tbody><tr><td>10BASE5</td><td>10 Mbps</td><td>Thick Coaxial Cable</td><td>500 m</td><td>Original bus topology with vampire taps</td></tr><tr><td>10BASE-T</td><td>10 Mbps</td><td>Cat3 Twisted Pair</td><td>100 m</td><td>Star topology with multiport hubs</td></tr><tr><td>100BASE-TX (Fast)</td><td>100 Mbps</td><td>Cat5 Twisted Pair</td><td>100 m</td><td>4B/5B encoding, full-duplex switches</td></tr><tr><td>1000BASE-T (Gigabit)</td><td>1 Gbps</td><td>Cat5e/6 Twisted Pair</td><td>100 m</td><td>4-pair PAM-5 transmission</td></tr><tr><td>10GBASE-T</td><td>10 Gbps</td><td>Cat6A Twisted Pair / Fiber</td><td>100 m / 10 km</td><td>Datacenter interconnects, no half-duplex</td></tr><tr><td>400GBASE-SR8</td><td>400 Gbps</td><td>Multi-mode Fiber</td><td>100 m</td><td>PAM4 optical modulation, cloud backbone</td></tr></tbody></table>",
      "eli10": "In simple words: Chronological progression from 10 Mbps Standard Ethernet to 400 Gbps cloud datacenter fabrics.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Ethernet Types and Evolution?<br><br><strong>Answer:</strong> Ethernet evolved through distinct speed generations: Standard Ethernet (10 Mbps, 10BASE-T), Fast Ethernet (100 Mbps, 100BASE-TX), Gigabit Ethernet (1 Gbps, 1000BASE-T), 10-Gigabit Ethernet (10 Gbps, 10GBASE-T / optical), and hyperscale 40G/100G/400G/800G Ethernet.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Ethernet Types and Evolution?",
          "options": [
            "Ethernet evolved through distinct speed generations: Standar...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Ethernet evolved through distinct speed generations: Standard Ethernet (10 Mbps, 10BASE-T), Fast Ethernet (100 Mbps, 100BASE-TX), Gigabit Ethernet (1 Gbps, 1000BASE-T), 10-Gigabit Ethernet (10 Gbps, 10GBASE-T / optical), and hyperscale 40G/100G/400G/800G Ethernet."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ]
    }
  },
  "u2-ethernet-advantages-limitations": {
    "id": "u2-ethernet-advantages-limitations",
    "title": "Advantages and Limitations of Ethernet",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.3",
    "oneLiner": "Analyzing Ethernet's dominance: low cost, high bandwidth, and plug-and-play vs non-deterministic latency.",
    "quickAnswer": "Advantages: ubiquity, extremely low silicon cost, massive bandwidth (up to 800 Gbps), plug-and-play auto-negotiation, backward compatibility. Limitations: non-deterministic latency under contention, 100m copper distance limit, broadcast storms in loop topologies without STP.",
    "whyItMatters": "Understanding trade-offs explains where Ethernet excels (enterprise/datacenter LANs) and where deterministic alternatives (CAN, TSN) are preferred.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>Ethernet dominates enterprise and home networking due to inexpensive cabling, high speeds, and simple switch installation, though industrial real-time applications require Time-Sensitive Networking (TSN) extensions to achieve deterministic delivery.</p>",
      "eli10": "In simple words: Analyzing Ethernet's dominance: low cost, high bandwidth, and plug-and-play vs non-deterministic latency.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Advantages and Limitations of Ethernet?<br><br><strong>Answer:</strong> Advantages: ubiquity, extremely low silicon cost, massive bandwidth (up to 800 Gbps), plug-and-play auto-negotiation, backward compatibility. Limitations: non-deterministic latency under contention, 100m copper distance limit, broadcast storms in loop topologies without STP.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Advantages and Limitations of Ethernet?",
          "options": [
            "Advantages: ubiquity, extremely low silicon cost, massive ba...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Advantages: ubiquity, extremely low silicon cost, massive bandwidth (up to 800 Gbps), plug-and-play auto-negotiation, backward compatibility. Limitations: non-deterministic latency under contention, 100m copper distance limit, broadcast storms in loop topologies without STP."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/13/Ethernet_Type_II_Frame_format.svg",
      "imageCaption": "Figure: Engineering Trade-Offs, High-Load Scalability, and Industry Dominance of Ethernet."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/13/Ethernet_Type_II_Frame_format.svg",
    "imageCaption": "Figure: Engineering Trade-Offs, High-Load Scalability, and Industry Dominance of Ethernet."
  },
  "u2-wireless-characteristics": {
    "id": "u2-wireless-characteristics",
    "title": "Characteristics of Wireless Communication",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Kurose & Ross Ch. 7 / Forouzan Ch. 14",
    "oneLiner": "Physical realities of radio transmission: attenuation, multipath fading, interference, and security risks.",
    "quickAnswer": "Wireless communication differs fundamentally from wired media due to: (1) Signal attenuation proportional to 1/d^2 or 1/d^4, (2) Multipath propagation causing self-interference and fading, (3) Electromagnetic interference from microwaves and Bluetooth, and (4) Broadcast radio propagation making eavesdropping trivial.",
    "whyItMatters": "These physical channel characteristics directly dictate why wireless MAC protocols must differ radically from wired Ethernet.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>Unlike guided copper or optical fiber where signals are tightly enclosed, wireless signals propagate through open air, suffering severe distance attenuation, reflections off walls (multipath fading), and shared radio interference.</p>",
      "eli10": "In simple words: Physical realities of radio transmission: attenuation, multipath fading, interference, and security risks.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Characteristics of Wireless Communication?<br><br><strong>Answer:</strong> Wireless communication differs fundamentally from wired media due to: (1) Signal attenuation proportional to 1/d^2 or 1/d^4, (2) Multipath propagation causing self-interference and fading, (3) Electromagnetic interference from microwaves and Bluetooth, and (4) Broadcast radio propagation making eavesdropping trivial.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Characteristics of Wireless Communication?",
          "options": [
            "Wireless communication differs fundamentally from wired medi...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Wireless communication differs fundamentally from wired media due to: (1) Signal attenuation proportional to 1/d^2 or 1/d^4, (2) Multipath propagation causing self-interference and fading, (3) Electromagnetic interference from microwaves and Bluetooth, and (4) Broadcast radio propagation making eavesdropping trivial."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ]
    }
  },
  "u2-wireless-lan-architecture": {
    "id": "u2-wireless-lan-architecture",
    "title": "Wireless LAN Architecture",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.11 Architecture",
    "oneLiner": "Basic Service Set (BSS), Extended Service Set (ESS), Access Points (AP), and Distribution System (DS).",
    "quickAnswer": "IEEE 802.11 defines two modes: (1) Infrastructure Mode: Mobile stations associate with a central Access Point (AP) in a Basic Service Set (BSS); multiple BSSs connect via a wired Distribution System (DS) into an Extended Service Set (ESS). (2) Ad-Hoc Mode (IBSS): Peer-to-peer communication without an AP.",
    "whyItMatters": "This architecture enables seamless wireless roaming across enterprise campuses while maintaining continuous IP connectivity.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>A <strong>Basic Service Set (BSS)</strong> consists of an Access Point and its associated wireless client stations. An <strong>Extended Service Set (ESS)</strong> connects multiple APs via an Ethernet Distribution System, sharing a single SSID.</p>",
      "eli10": "In simple words: Basic Service Set (BSS), Extended Service Set (ESS), Access Points (AP), and Distribution System (DS).",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Wireless LAN Architecture?<br><br><strong>Answer:</strong> IEEE 802.11 defines two modes: (1) Infrastructure Mode: Mobile stations associate with a central Access Point (AP) in a Basic Service Set (BSS); multiple BSSs connect via a wired Distribution System (DS) into an Extended Service Set (ESS). (2) Ad-Hoc Mode (IBSS): Peer-to-peer communication without an AP.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Wireless LAN Architecture?",
          "options": [
            "IEEE 802.11 defines two modes: (1) Infrastructure Mode: Mobi...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: IEEE 802.11 defines two modes: (1) Infrastructure Mode: Mobile stations associate with a central Access Point (AP) in a Basic Service Set (BSS); multiple BSSs connect via a wired Distribution System (DS) into an Extended Service Set (ESS). (2) Ad-Hoc Mode (IBSS): Peer-to-peer communication without an AP."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Wifi_hidden_station_problem.svg",
      "imageCaption": "Figure: Wireless LAN Architectural Components: Basic Service Set (BSS), Access Points (AP), and Extended Service Set (ESS)."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Wifi_hidden_station_problem.svg",
    "imageCaption": "Figure: Wireless LAN Architectural Components: Basic Service Set (BSS), Access Points (AP), and Extended Service Set (ESS)."
  },
  "u2-hidden-terminal-problem": {
    "id": "u2-hidden-terminal-problem",
    "title": "Hidden Terminal Problem",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.11 / Tanenbaum Ch. 4.4",
    "oneLiner": "Stations outside radio range of each other transmitting simultaneously to a common station, causing collisions.",
    "quickAnswer": "Station A and Station C are both within range of central Station B, but out of radio range of each other. When A transmits to B, C cannot sense A's signal and begins transmitting to B as well. The two transmissions collide destructively at Station B. Solved by the RTS/CTS reservation handshake.",
    "whyItMatters": "The hidden terminal problem is the single greatest cause of packet loss in unscheduled wireless networks.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<div class=\"wiki-img-box my-4 text-center\"><img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Hidden_terminal_problem.svg/500px-Hidden_terminal_problem.svg.png\" alt=\"Hidden Terminal Problem\" class=\"mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain\" onerror=\"this.style.display='none'\"><p class=\"text-xs text-gray-500 mt-1 italic\">Figure: Station A and Station C are hidden from each other, causing collisions at Station B.</p></div><p>Carrier sensing fails here because carrier sense checks whether the <em>transmitter's</em> neighborhood is clear, whereas collisions occur at the <em>receiver</em>!</p>",
      "eli10": "In simple words: Stations outside radio range of each other transmitting simultaneously to a common station, causing collisions.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Hidden Terminal Problem?<br><br><strong>Answer:</strong> Station A and Station C are both within range of central Station B, but out of radio range of each other. When A transmits to B, C cannot sense A's signal and begins transmitting to B as well. The two transmissions collide destructively at Station B. Solved by the RTS/CTS reservation handshake.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Hidden Terminal Problem?",
          "options": [
            "Station A and Station C are both within range of central Sta...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Station A and Station C are both within range of central Station B, but out of radio range of each other. When A transmits to B, C cannot sense A's signal and begins transmitting to B as well. The two transmissions collide destructively at Station B. Solved by the RTS/CTS reservation handshake."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Wifi_hidden_station_problem.svg",
      "imageCaption": "Figure: The Hidden Terminal Problem: Stations A and C cannot hear each other and collide simultaneously at Access Point B."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Wifi_hidden_station_problem.svg",
    "imageCaption": "Figure: The Hidden Terminal Problem: Stations A and C cannot hear each other and collide simultaneously at Access Point B."
  },
  "u2-exposed-terminal-problem": {
    "id": "u2-exposed-terminal-problem",
    "title": "Exposed Terminal Problem",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.11 / Tanenbaum Ch. 4.4",
    "oneLiner": "Stations unnecessarily deferring transmission because they falsely believe a collision would occur.",
    "quickAnswer": "Station B is transmitting to Station A. Station C wants to transmit to Station D. Station C senses B's transmission and needlessly defers transmitting, even though C transmitting to D would not interfere with B delivering data to A. This wastes channel capacity and lowers aggregate network throughput.",
    "whyItMatters": "Exposed stations illustrate how conservative carrier sensing reduces wireless network capacity.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<div class=\"wiki-img-box my-4 text-center\"><img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Exposed_terminal_problem.svg/500px-Exposed_terminal_problem.svg.png\" alt=\"Exposed Terminal Problem\" class=\"mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain\" onerror=\"this.style.display='none'\"><p class=\"text-xs text-gray-500 mt-1 italic\">Figure: Station C is exposed to Station B and unnecessarily defers transmitting to Station D.</p></div><p>RTS/CTS helps mitigate this by allowing C to hear B's RTS but NOT hearing A's CTS, signaling that C is free to transmit away from A.</p>",
      "eli10": "In simple words: Stations unnecessarily deferring transmission because they falsely believe a collision would occur.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Exposed Terminal Problem?<br><br><strong>Answer:</strong> Station B is transmitting to Station A. Station C wants to transmit to Station D. Station C senses B's transmission and needlessly defers transmitting, even though C transmitting to D would not interfere with B delivering data to A. This wastes channel capacity and lowers aggregate network throughput.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Exposed Terminal Problem?",
          "options": [
            "Station B is transmitting to Station A. Station C wants to t...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Station B is transmitting to Station A. Station C wants to transmit to Station D. Station C senses B's transmission and needlessly defers transmitting, even though C transmitting to D would not interfere with B delivering data to A. This wastes channel capacity and lowers aggregate network throughput."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/97/Exposed_terminal_problem.svg",
      "imageCaption": "Figure: The Exposed Terminal Problem: Station C is falsely prevented from transmitting to D because B is transmitting to A."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/97/Exposed_terminal_problem.svg",
    "imageCaption": "Figure: The Exposed Terminal Problem: Station C is falsely prevented from transmitting to D because B is transmitting to A."
  },
  "u2-wireless-multiple-access": {
    "id": "u2-wireless-multiple-access",
    "title": "Multiple Access in Wireless Networks",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Forouzan Ch. 14 / Kurose & Ross Ch. 7",
    "oneLiner": "Why wired CSMA/CD fails in radio environments and how MACA/MACAW adapted carrier sense for wireless.",
    "quickAnswer": "CSMA/CD cannot function over wireless radio because: (1) Radio transceivers transmitting at high power overwhelm their own sensitive receiving circuits (dynamic range up to 100 dB difference), and (2) Signal attenuation means a collision at a distant receiver may not be loud enough for the sender to hear.",
    "whyItMatters": "Explains the foundational physics driving wireless protocols to use Collision Avoidance rather than Collision Detection.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>A transmitter radiates high RF energy while incoming signals from distant nodes arrive at microvolt levels. Transmitting while listening to detect subtle collisions is economically and physically unfeasible in commercial Wi-Fi.</p>",
      "eli10": "In simple words: Why wired CSMA/CD fails in radio environments and how MACA/MACAW adapted carrier sense for wireless.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Multiple Access in Wireless Networks?<br><br><strong>Answer:</strong> CSMA/CD cannot function over wireless radio because: (1) Radio transceivers transmitting at high power overwhelm their own sensitive receiving circuits (dynamic range up to 100 dB difference), and (2) Signal attenuation means a collision at a distant receiver may not be loud enough for the sender to hear.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Multiple Access in Wireless Networks?",
          "options": [
            "CSMA/CD cannot function over wireless radio because: (1) Rad...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: CSMA/CD cannot function over wireless radio because: (1) Radio transceivers transmitting at high power overwhelm their own sensitive receiving circuits (dynamic range up to 100 dB difference), and (2) Signal attenuation means a collision at a distant receiver may not be loud enough for the sender to hear."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Csma_ca.svg",
      "imageCaption": "Figure: Multiple Access Challenges in Wireless Channels: Why CSMA/CD Fails and CSMA/CA is Required."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Csma_ca.svg",
    "imageCaption": "Figure: Multiple Access Challenges in Wireless Channels: Why CSMA/CD Fails and CSMA/CA is Required."
  },
  "u2-wireless-lan-access-methods": {
    "id": "u2-wireless-lan-access-methods",
    "title": "Wireless LAN Access Methods",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.11",
    "oneLiner": "Survey of access methods: Distributed Coordination Function (DCF) and Point Coordination Function (PCF).",
    "quickAnswer": "IEEE 802.11 provides two primary access methods: (1) DCF (Distributed Coordination Function): Contention-based access using CSMA/CA, mandatory in all Wi-Fi hardware. (2) PCF (Point Coordination Function): Contention-free, centralized polling-based access coordinated by the Access Point.",
    "whyItMatters": "Understanding DCF and PCF clarifies how Wi-Fi balances best-effort asynchronous web data with time-sensitive voice/video traffic.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>DCF provides decentralized access for general internet traffic, while PCF provides a centralized polling mechanism during contention-free repetition intervals.</p>",
      "eli10": "In simple words: Survey of access methods: Distributed Coordination Function (DCF) and Point Coordination Function (PCF).",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Wireless LAN Access Methods?<br><br><strong>Answer:</strong> IEEE 802.11 provides two primary access methods: (1) DCF (Distributed Coordination Function): Contention-based access using CSMA/CA, mandatory in all Wi-Fi hardware. (2) PCF (Point Coordination Function): Contention-free, centralized polling-based access coordinated by the Access Point.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Wireless LAN Access Methods?",
          "options": [
            "IEEE 802.11 provides two primary access methods: (1) DCF (Di...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: IEEE 802.11 provides two primary access methods: (1) DCF (Distributed Coordination Function): Contention-based access using CSMA/CA, mandatory in all Wi-Fi hardware. (2) PCF (Point Coordination Function): Contention-free, centralized polling-based access coordinated by the Access Point."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Csma_ca.svg",
      "imageCaption": "Figure: Wireless LAN Access Methods: DCF Contention Access vs. PCF Polling Contention-Free Access."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Csma_ca.svg",
    "imageCaption": "Figure: Wireless LAN Access Methods: DCF Contention Access vs. PCF Polling Contention-Free Access."
  },
  "u2-wireless-communication-challenges": {
    "id": "u2-wireless-communication-challenges",
    "title": "Challenges in Wireless Communication",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Tanenbaum Ch. 4.4",
    "oneLiner": "Overcoming battery constraints, dynamic topologies, multipath dispersion, and spectrum scarcity.",
    "quickAnswer": "Key challenges include: dynamic topology changes, roaming handoff delays, high bit-error rates (10^-3 vs 10^-12 in fiber), power/battery limitations, radio spectrum regulation, and security vulnerabilities over broadcast airwaves.",
    "whyItMatters": "Designing robust wireless systems requires solving complex trade-offs across physics, protocol state, and hardware power budgets.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>Wireless protocols require sophisticated modulation (OFDM/OFDMA), forward error correction, rate adaptation algorithms, and power-saving sleep cycles to operate reliably in noisy radio environments.</p>",
      "eli10": "In simple words: Overcoming battery constraints, dynamic topologies, multipath dispersion, and spectrum scarcity.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Challenges in Wireless Communication?<br><br><strong>Answer:</strong> Key challenges include: dynamic topology changes, roaming handoff delays, high bit-error rates (10^-3 vs 10^-12 in fiber), power/battery limitations, radio spectrum regulation, and security vulnerabilities over broadcast airwaves.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Challenges in Wireless Communication?",
          "options": [
            "Key challenges include: dynamic topology changes, roaming ha...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Key challenges include: dynamic topology changes, roaming handoff delays, high bit-error rates (10^-3 vs 10^-12 in fiber), power/battery limitations, radio spectrum regulation, and security vulnerabilities over broadcast airwaves."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/97/Exposed_terminal_problem.svg",
      "imageCaption": "Figure: Technical Challenges: Hidden/Exposed Nodes, Near-Far Problem, and Channel Multipath Fading."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/97/Exposed_terminal_problem.svg",
    "imageCaption": "Figure: Technical Challenges: Hidden/Exposed Nodes, Near-Far Problem, and Channel Multipath Fading."
  },
  "u2-ieee-802-11-architecture": {
    "id": "u2-ieee-802-11-architecture",
    "title": "IEEE 802.11 Architecture",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.11 Standard",
    "oneLiner": "The hierarchical architecture of Wi-Fi: Station (STA), BSS, AP, DS, ESS, and portal gateways.",
    "quickAnswer": "The IEEE 802.11 architecture organizes mobile stations (STAs) into Basic Service Sets (BSS). An infrastructure BSS contains an Access Point (AP). APs connect via a Distribution System (DS) to form an Extended Service Set (ESS). A Portal connects the 802.11 LAN to external wired networks (e.g., 802.3 Ethernet).",
    "whyItMatters": "This architecture is the blueprint for all home routers, campus Wi-Fi deployments, and cellular Wi-Fi offloading.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>IEEE 802.11 defines a modular cellular architecture where mobile stations can roam between APs within the same Extended Service Set (ESS) without losing their IP addresses or breaking active TCP connections.</p>",
      "eli10": "In simple words: The hierarchical architecture of Wi-Fi: Station (STA), BSS, AP, DS, ESS, and portal gateways.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of IEEE 802.11 Architecture?<br><br><strong>Answer:</strong> The IEEE 802.11 architecture organizes mobile stations (STAs) into Basic Service Sets (BSS). An infrastructure BSS contains an Access Point (AP). APs connect via a Distribution System (DS) to form an Extended Service Set (ESS). A Portal connects the 802.11 LAN to external wired networks (e.g., 802.3 Ethernet).",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of IEEE 802.11 Architecture?",
          "options": [
            "The IEEE 802.11 architecture organizes mobile stations (STAs...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: The IEEE 802.11 architecture organizes mobile stations (STAs) into Basic Service Sets (BSS). An infrastructure BSS contains an Access Point (AP). APs connect via a Distribution System (DS) to form an Extended Service Set (ESS). A Portal connects the 802.11 LAN to external wired networks (e.g., 802.3 Ethernet)."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/53/802.11_MAC_Frame.svg",
      "imageCaption": "Figure: IEEE 802.11 Architecture: Ad-hoc (IBSS) Mode vs. Infrastructure (BSS/ESS) Mode with Distribution System."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/53/802.11_MAC_Frame.svg",
    "imageCaption": "Figure: IEEE 802.11 Architecture: Ad-hoc (IBSS) Mode vs. Infrastructure (BSS/ESS) Mode with Distribution System."
  },
  "u2-ieee-802-11-dcf": {
    "id": "u2-ieee-802-11-dcf",
    "title": "Distributed Coordination Function (DCF)",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.11 Section 10.3",
    "oneLiner": "The fundamental contention-based CSMA/CA access mechanism mandatory in all 802.11 Wi-Fi stations.",
    "quickAnswer": "DCF uses CSMA/CA with binary exponential backoff. Before transmitting, a station senses the medium. If idle for a DIFS duration, it decrements its backoff counter. When the counter reaches zero, it transmits the frame. The receiver verifies CRC and responds with an ACK after a SIFS duration.",
    "whyItMatters": "Over 99% of all Wi-Fi traffic globally is transmitted using DCF.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>DCF provides distributed, peer-level contention access without requiring a central scheduler. Physical and virtual carrier sensing work together to prevent collisions.</p>",
      "eli10": "In simple words: The fundamental contention-based CSMA/CA access mechanism mandatory in all 802.11 Wi-Fi stations.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Distributed Coordination Function (DCF)?<br><br><strong>Answer:</strong> DCF uses CSMA/CA with binary exponential backoff. Before transmitting, a station senses the medium. If idle for a DIFS duration, it decrements its backoff counter. When the counter reaches zero, it transmits the frame. The receiver verifies CRC and responds with an ACK after a SIFS duration.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Distributed Coordination Function (DCF)?",
          "options": [
            "DCF uses CSMA/CA with binary exponential backoff. Before tra...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: DCF uses CSMA/CA with binary exponential backoff. Before transmitting, a station senses the medium. If idle for a DIFS duration, it decrements its backoff counter. When the counter reaches zero, it transmits the frame. The receiver verifies CRC and responds with an ACK after a SIFS duration."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Csma_ca.svg",
      "imageCaption": "Figure: Distributed Coordination Function (DCF): Asynchronous Best-Effort CSMA/CA Access."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Csma_ca.svg",
    "imageCaption": "Figure: Distributed Coordination Function (DCF): Asynchronous Best-Effort CSMA/CA Access."
  },
  "u2-ieee-802-11-pcf": {
    "id": "u2-ieee-802-11-pcf",
    "title": "Point Coordination Function (PCF)",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.11 Section 10.4",
    "oneLiner": "Centralized contention-free polling access coordinated by the Access Point for time-bounded traffic.",
    "quickAnswer": "PCF is an optional centralized polling mechanism where the AP acts as a Point Coordinator. During the Contention-Free Period (CFP), the AP polls registered stations one by one, granting guaranteed collision-free transmission slots suitable for real-time voice and video.",
    "whyItMatters": "PCF paved the way for modern 802.11e/ax Quality of Service (QoS) scheduled access mechanisms.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>In PCF, the Access Point uses a shorter interframe space (PIFS) than normal stations (DIFS), giving it preemptive priority to seize the medium and begin polling stations.</p>",
      "eli10": "In simple words: Centralized contention-free polling access coordinated by the Access Point for time-bounded traffic.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Point Coordination Function (PCF)?<br><br><strong>Answer:</strong> PCF is an optional centralized polling mechanism where the AP acts as a Point Coordinator. During the Contention-Free Period (CFP), the AP polls registered stations one by one, granting guaranteed collision-free transmission slots suitable for real-time voice and video.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Point Coordination Function (PCF)?",
          "options": [
            "PCF is an optional centralized polling mechanism where the A...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: PCF is an optional centralized polling mechanism where the AP acts as a Point Coordinator. During the Contention-Free Period (CFP), the AP polls registered stations one by one, granting guaranteed collision-free transmission slots suitable for real-time voice and video."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Csma_ca.svg",
      "imageCaption": "Figure: Point Coordination Function (PCF): Centralized Polling Mechanism for Real-Time Traffic."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Csma_ca.svg",
    "imageCaption": "Figure: Point Coordination Function (PCF): Centralized Polling Mechanism for Real-Time Traffic."
  },
  "u2-ieee-802-11-csma-ca": {
    "id": "u2-ieee-802-11-csma-ca",
    "title": "CSMA/CA in IEEE 802.11",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.11",
    "oneLiner": "Detailed mechanics of physical carrier sensing, backoff countdown, and random contention windows.",
    "quickAnswer": "In 802.11 CSMA/CA, a station selects a random backoff integer from [0, CW]. If the channel remains idle for a DIFS, the backoff timer counts down during idle slot times. If the channel becomes busy, the timer pauses and resumes after the channel is idle again for DIFS.",
    "whyItMatters": "Pausing backoff countdown rather than resetting preserves fairness among waiting stations.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>By freezing backoff timers when other stations transmit, stations that have already waited longer retain higher priority to transmit once the channel becomes free again.</p>",
      "eli10": "In simple words: Detailed mechanics of physical carrier sensing, backoff countdown, and random contention windows.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of CSMA/CA in IEEE 802.11?<br><br><strong>Answer:</strong> In 802.11 CSMA/CA, a station selects a random backoff integer from [0, CW]. If the channel remains idle for a DIFS, the backoff timer counts down during idle slot times. If the channel becomes busy, the timer pauses and resumes after the channel is idle again for DIFS.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of CSMA/CA in IEEE 802.11?",
          "options": [
            "In 802.11 CSMA/CA, a station selects a random backoff intege...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: In 802.11 CSMA/CA, a station selects a random backoff integer from [0, CW]. If the channel remains idle for a DIFS, the backoff timer counts down during idle slot times. If the channel becomes busy, the timer pauses and resumes after the channel is idle again for DIFS."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Csma_ca.svg",
      "imageCaption": "Figure: CSMA/CA Protocol in IEEE 802.11: Physical Carrier Sense + Virtual Carrier Sense."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Csma_ca.svg",
    "imageCaption": "Figure: CSMA/CA Protocol in IEEE 802.11: Physical Carrier Sense + Virtual Carrier Sense."
  },
  "u2-ieee-802-11-ifs": {
    "id": "u2-ieee-802-11-ifs",
    "title": "Interframe Spaces (IFS)",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.11",
    "oneLiner": "Priority arbitration through timed gaps: SIFS, PIFS, DIFS, and EIFS.",
    "quickAnswer": "IEEE 802.11 enforces priority by varying the time gap a station must wait before transmitting: (1) SIFS (Shortest IFS): Highest priority, used for ACKs, CTS, and data fragments. (2) PIFS (PCF IFS): Medium priority, used by AP for polling. (3) DIFS (DCF IFS): Standard priority for normal data frames. (4) EIFS (Extended IFS): Lowest priority, used after frame errors.",
    "whyItMatters": "Different IFS durations implement hardware-level priority without requiring packet header tags.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>Rule of thumb in 802.11: <strong>Shorter gap = Higher priority</strong>. Because an ACK only needs to wait SIFS, no other station waiting DIFS can interrupt or collide with the acknowledgement.</p>",
      "eli10": "In simple words: Priority arbitration through timed gaps: SIFS, PIFS, DIFS, and EIFS.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Interframe Spaces (IFS)?<br><br><strong>Answer:</strong> IEEE 802.11 enforces priority by varying the time gap a station must wait before transmitting: (1) SIFS (Shortest IFS): Highest priority, used for ACKs, CTS, and data fragments. (2) PIFS (PCF IFS): Medium priority, used by AP for polling. (3) DIFS (DCF IFS): Standard priority for normal data frames. (4) EIFS (Extended IFS): Lowest priority, used after frame errors.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Interframe Spaces (IFS)?",
          "options": [
            "IEEE 802.11 enforces priority by varying the time gap a stat...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: IEEE 802.11 enforces priority by varying the time gap a station must wait before transmitting: (1) SIFS (Shortest IFS): Highest priority, used for ACKs, CTS, and data fragments. (2) PIFS (PCF IFS): Medium priority, used by AP for polling. (3) DIFS (DCF IFS): Standard priority for normal data frames. (4) EIFS (Extended IFS): Lowest priority, used after frame errors."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Csma_ca.svg",
      "imageCaption": "Figure: Interframe Spaces Hierarchy: SIFS (Highest Priority) < PIFS < DIFS < EIFS."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Csma_ca.svg",
    "imageCaption": "Figure: Interframe Spaces Hierarchy: SIFS (Highest Priority) < PIFS < DIFS < EIFS."
  },
  "u2-rts-cts-mechanism": {
    "id": "u2-rts-cts-mechanism",
    "title": "RTS/CTS Mechanism",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.11 / Tanenbaum Ch. 4.4",
    "oneLiner": "4-way handshake (RTS-CTS-DATA-ACK) eliminating hidden terminal collisions.",
    "quickAnswer": "To transmit a large frame, a sender first broadcasts a short Request to Send (RTS) frame. The receiver replies with a Clear to Send (CTS) frame. All stations hearing the RTS or CTS read the duration field and remain silent for that time. The sender then transmits its data frame safely and receives an ACK.",
    "whyItMatters": "RTS and CTS frames are small (20 and 14 bytes), so collisions between RTS frames waste negligible bandwidth compared to colliding 1500-byte data frames.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<div class=\"wiki-img-box my-4 text-center\"><img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/802.11_RTS_CTS.svg/600px-802.11_RTS_CTS.svg.png\" alt=\"802.11 RTS CTS\" class=\"mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain\" onerror=\"this.style.display='none'\"><p class=\"text-xs text-gray-500 mt-1 italic\">Figure: The 4-way RTS/CTS/Data/ACK handshake reserving channel airtime.</p></div>",
      "eli10": "In simple words: 4-way handshake (RTS-CTS-DATA-ACK) eliminating hidden terminal collisions.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of RTS/CTS Mechanism?<br><br><strong>Answer:</strong> To transmit a large frame, a sender first broadcasts a short Request to Send (RTS) frame. The receiver replies with a Clear to Send (CTS) frame. All stations hearing the RTS or CTS read the duration field and remain silent for that time. The sender then transmits its data frame safely and receives an ACK.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of RTS/CTS Mechanism?",
          "options": [
            "To transmit a large frame, a sender first broadcasts a short...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: To transmit a large frame, a sender first broadcasts a short Request to Send (RTS) frame. The receiver replies with a Clear to Send (CTS) frame. All stations hearing the RTS or CTS read the duration field and remain silent for that time. The sender then transmits its data frame safely and receives an ACK."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/b/bb/RTS_CTS_FRTS_Schema.png",
      "imageCaption": "Figure: RTS/CTS 4-Way Handshake: Reserving Channel & Solving the Hidden Terminal Problem."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/b/bb/RTS_CTS_FRTS_Schema.png",
    "imageCaption": "Figure: RTS/CTS 4-Way Handshake: Reserving Channel & Solving the Hidden Terminal Problem."
  },
  "u2-network-allocation-vector": {
    "id": "u2-network-allocation-vector",
    "title": "Network Allocation Vector (NAV)",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.11",
    "oneLiner": "The virtual carrier sensing timer that tells stations how long the radio medium will remain occupied.",
    "quickAnswer": "The Network Allocation Vector (NAV) is an internal countdown timer maintained by every 802.11 station. When a station overhears any frame (RTS, CTS, or data), it extracts the Duration field and sets its NAV to that value. As long as NAV > 0, the station treats the medium as virtually busy without even checking physical RF energy.",
    "whyItMatters": "NAV virtual carrier sensing silences hidden stations that cannot physically hear the transmitter.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>Virtual carrier sensing via NAV ensures that stations out of physical range of the sender (but within range of the receiver) do not transmit during data and ACK exchange.</p>",
      "eli10": "In simple words: The virtual carrier sensing timer that tells stations how long the radio medium will remain occupied.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Network Allocation Vector (NAV)?<br><br><strong>Answer:</strong> The Network Allocation Vector (NAV) is an internal countdown timer maintained by every 802.11 station. When a station overhears any frame (RTS, CTS, or data), it extracts the Duration field and sets its NAV to that value. As long as NAV > 0, the station treats the medium as virtually busy without even checking physical RF energy.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Network Allocation Vector (NAV)?",
          "options": [
            "The Network Allocation Vector (NAV) is an internal countdown...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: The Network Allocation Vector (NAV) is an internal countdown timer maintained by every 802.11 station. When a station overhears any frame (RTS, CTS, or data), it extracts the Duration field and sets its NAV to that value. As long as NAV > 0, the station treats the medium as virtually busy without even checking physical RF energy."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/b/bb/RTS_CTS_FRTS_Schema.png",
      "imageCaption": "Figure: Network Allocation Vector (NAV): Virtual Carrier Sensing Countdown Timer in Station Hardware."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/b/bb/RTS_CTS_FRTS_Schema.png",
    "imageCaption": "Figure: Network Allocation Vector (NAV): Virtual Carrier Sensing Countdown Timer in Station Hardware."
  },
  "u2-ieee-802-11-frame-formats": {
    "id": "u2-ieee-802-11-frame-formats",
    "title": "IEEE 802.11 Frame Formats",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.11 Section 9",
    "oneLiner": "The 802.11 MAC frame layout: Frame Control, Duration/ID, 4 MAC addresses, Sequence Control, QoS, and FCS.",
    "quickAnswer": "An 802.11 frame contains: (1) 2-byte Frame Control (Type, Subtype, ToDS, FromDS, Retry, Power Mgmt), (2) 2-byte Duration/ID (sets NAV), (3) Four 6-byte MAC Address fields (Receiver, Transmitter, Destination, Source), (4) 2-byte Sequence Control, (5) 0-2312 byte Payload, and (6) 4-byte CRC-32 FCS.",
    "whyItMatters": "Having up to 4 MAC address fields allows frames to bridge seamlessly across wireless distribution systems between APs.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<table class=\"wiki-table\"><thead><tr><th>Field</th><th>Size (Bytes)</th><th>Purpose</th></tr></thead><tbody><tr><td>Frame Control</td><td>2</td><td>Protocol version, Type (Management, Control, Data), Subtype, ToDS, FromDS flags</td></tr><tr><td>Duration / ID</td><td>2</td><td>Airtime reservation duration in microseconds (sets overhearing stations' NAV)</td></tr><tr><td>Address 1</td><td>6</td><td>Receiver MAC address (the station or AP receiving the frame over air)</td></tr><tr><td>Address 2</td><td>6</td><td>Transmitter MAC address (the station or AP transmitting over air)</td></tr><tr><td>Address 3</td><td>6</td><td>Final destination or original source MAC address</td></tr><tr><td>Sequence Control</td><td>2</td><td>4-bit fragment number + 12-bit sequence number (for duplicate detection)</td></tr><tr><td>Address 4</td><td>6</td><td>Optional, used when frames travel wirelessly from AP to AP (WDS mesh)</td></tr><tr><td>FCS</td><td>4</td><td>32-bit CRC checksum</td></tr></tbody></table>",
      "eli10": "In simple words: The 802.11 MAC frame layout: Frame Control, Duration/ID, 4 MAC addresses, Sequence Control, QoS, and FCS.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of IEEE 802.11 Frame Formats?<br><br><strong>Answer:</strong> An 802.11 frame contains: (1) 2-byte Frame Control (Type, Subtype, ToDS, FromDS, Retry, Power Mgmt), (2) 2-byte Duration/ID (sets NAV), (3) Four 6-byte MAC Address fields (Receiver, Transmitter, Destination, Source), (4) 2-byte Sequence Control, (5) 0-2312 byte Payload, and (6) 4-byte CRC-32 FCS.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of IEEE 802.11 Frame Formats?",
          "options": [
            "An 802.11 frame contains: (1) 2-byte Frame Control (Type, Su...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: An 802.11 frame contains: (1) 2-byte Frame Control (Type, Subtype, ToDS, FromDS, Retry, Power Mgmt), (2) 2-byte Duration/ID (sets NAV), (3) Four 6-byte MAC Address fields (Receiver, Transmitter, Destination, Source), (4) 2-byte Sequence Control, (5) 0-2312 byte Payload, and (6) 4-byte CRC-32 FCS."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/53/802.11_MAC_Frame.svg",
      "imageCaption": "Figure: IEEE 802.11 MAC Frame Structure: Frame Control, Duration/ID, 4 MAC Addresses, Sequence Control, FCS."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/53/802.11_MAC_Frame.svg",
    "imageCaption": "Figure: IEEE 802.11 MAC Frame Structure: Frame Control, Duration/ID, 4 MAC Addresses, Sequence Control, FCS."
  },
  "u2-dcf-vs-pcf": {
    "id": "u2-dcf-vs-pcf",
    "title": "DCF vs PCF",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.11",
    "oneLiner": "Contrasting distributed contention CSMA/CA with centralized contention-free AP polling.",
    "quickAnswer": "DCF is distributed, contention-based, best-effort, uses DIFS/SIFS, and is supported by all Wi-Fi devices. PCF is centralized, contention-free, deterministic, coordinated by the AP using PIFS polling, but rarely implemented in commercial consumer hardware.",
    "whyItMatters": "Helps students understand why modern Wi-Fi evolved 802.11e EDCA rather than relying on legacy PCF.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<table class=\"wiki-table\"><thead><tr><th>Feature</th><th>Distributed Coordination Function (DCF)</th><th>Point Coordination Function (PCF)</th></tr></thead><tbody><tr><td><strong>Coordination Mode</strong></td><td>Decentralized, all stations equal</td><td>Centralized, AP coordinates</td></tr><tr><td><strong>Medium Access</strong></td><td>Contention-based (CSMA/CA)</td><td>Contention-free (Polling)</td></tr><tr><td><strong>Interframe Space</strong></td><td>DIFS / SIFS</td><td>PIFS / SIFS</td></tr><tr><td><strong>Implementation</strong></td><td>Mandatory in all 802.11 devices</td><td>Optional, rarely used</td></tr><tr><td><strong>Traffic Supported</strong></td><td>Best-effort asynchronous data</td><td>Time-sensitive voice / streaming</td></tr></tbody></table>",
      "eli10": "In simple words: Contrasting distributed contention CSMA/CA with centralized contention-free AP polling.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of DCF vs PCF?<br><br><strong>Answer:</strong> DCF is distributed, contention-based, best-effort, uses DIFS/SIFS, and is supported by all Wi-Fi devices. PCF is centralized, contention-free, deterministic, coordinated by the AP using PIFS polling, but rarely implemented in commercial consumer hardware.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of DCF vs PCF?",
          "options": [
            "DCF is distributed, contention-based, best-effort, uses DIFS...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: DCF is distributed, contention-based, best-effort, uses DIFS/SIFS, and is supported by all Wi-Fi devices. PCF is centralized, contention-free, deterministic, coordinated by the AP using PIFS polling, but rarely implemented in commercial consumer hardware."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Csma_ca.svg",
      "imageCaption": "Figure: Comparison of DCF (Distributed Contention) vs. PCF (Centralized Polling)."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Csma_ca.svg",
    "imageCaption": "Figure: Comparison of DCF (Distributed Contention) vs. PCF (Centralized Polling)."
  },
  "u2-bridges-overview": {
    "id": "u2-bridges-overview",
    "title": "Bridges in Data Link Layer",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.1D / Tanenbaum Ch. 4.7",
    "oneLiner": "Store-and-forward Layer 2 devices interconnecting separate LAN segments to isolate collision domains.",
    "quickAnswer": "A bridge is a Layer 2 networking device that connects multiple LAN segments. It inspects incoming frames' MAC addresses, operates in store-and-forward mode, regenerates clean signals, and separates collision domains while maintaining a single shared broadcast domain.",
    "whyItMatters": "Bridges replaced simple Layer 1 repeaters, ending the physical distance and station limits of early shared Ethernet.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>A bridge inspects the destination MAC address of incoming frames and selectively forwards them only to the segment where the destination host resides, preventing local traffic from clogging remote segments.</p>",
      "eli10": "In simple words: Store-and-forward Layer 2 devices interconnecting separate LAN segments to isolate collision domains.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Bridges in Data Link Layer?<br><br><strong>Answer:</strong> A bridge is a Layer 2 networking device that connects multiple LAN segments. It inspects incoming frames' MAC addresses, operates in store-and-forward mode, regenerates clean signals, and separates collision domains while maintaining a single shared broadcast domain.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Bridges in Data Link Layer?",
          "options": [
            "A bridge is a Layer 2 networking device that connects multip...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: A bridge is a Layer 2 networking device that connects multiple LAN segments. It inspects incoming frames' MAC addresses, operates in store-and-forward mode, regenerates clean signals, and separates collision domains while maintaining a single shared broadcast domain."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg",
      "imageCaption": "Figure: Network Bridges: Interconnecting Multiple LAN Segments at Layer 2."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg",
    "imageCaption": "Figure: Network Bridges: Interconnecting Multiple LAN Segments at Layer 2."
  },
  "u2-transparent-bridges": {
    "id": "u2-transparent-bridges",
    "title": "Transparent Bridges",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.1D",
    "oneLiner": "Plug-and-play bridges that operate completely invisibly without requiring station configuration.",
    "quickAnswer": "A transparent bridge is entirely invisible to connected stations. Computers simply send frames as if on a single giant cable, completely unaware that bridges are inspecting, filtering, and forwarding their packets. Defined by IEEE 802.1D with plug-and-play installation.",
    "whyItMatters": "Transparent operation made LAN expansion zero-configuration, accelerating Ethernet adoption across corporations.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>When an admin connects a transparent bridge into an existing network, no host reconfiguration, IP changes, or software updates are required. It immediately begins learning and filtering.</p>",
      "eli10": "In simple words: Plug-and-play bridges that operate completely invisibly without requiring station configuration.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Transparent Bridges?<br><br><strong>Answer:</strong> A transparent bridge is entirely invisible to connected stations. Computers simply send frames as if on a single giant cable, completely unaware that bridges are inspecting, filtering, and forwarding their packets. Defined by IEEE 802.1D with plug-and-play installation.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Transparent Bridges?",
          "options": [
            "A transparent bridge is entirely invisible to connected stat...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: A transparent bridge is entirely invisible to connected stations. Computers simply send frames as if on a single giant cable, completely unaware that bridges are inspecting, filtering, and forwarding their packets. Defined by IEEE 802.1D with plug-and-play installation."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg",
      "imageCaption": "Figure: Transparent Bridges (IEEE 802.1D): Plug-and-Play Operation Invisible to End Stations."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg",
    "imageCaption": "Figure: Transparent Bridges (IEEE 802.1D): Plug-and-Play Operation Invisible to End Stations."
  },
  "u2-learning-bridges": {
    "id": "u2-learning-bridges",
    "title": "Learning Bridges",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.1D Section 7",
    "oneLiner": "Bridges that automatically build and maintain their MAC address forwarding database by inspecting source addresses.",
    "quickAnswer": "A learning bridge builds its forwarding table (CAM table) dynamically through backward learning. By inspecting the source MAC address and incoming port of every arriving frame, the bridge records which host is reachable on which port.",
    "whyItMatters": "Eliminates manual forwarding table configuration and automatically adapts when laptops move to new switch ports.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<div class=\"wiki-img-box my-4 text-center\"><img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Network_bridge_operation.svg/600px-Network_bridge_operation.svg.png\" alt=\"Network Bridge Operation\" class=\"mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain\" onerror=\"this.style.display='none'\"><p class=\"text-xs text-gray-500 mt-1 italic\">Figure: Learning bridge inspecting frame source addresses to build its forwarding database.</p></div>",
      "eli10": "In simple words: Bridges that automatically build and maintain their MAC address forwarding database by inspecting source addresses.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Learning Bridges?<br><br><strong>Answer:</strong> A learning bridge builds its forwarding table (CAM table) dynamically through backward learning. By inspecting the source MAC address and incoming port of every arriving frame, the bridge records which host is reachable on which port.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Learning Bridges?",
          "options": [
            "A learning bridge builds its forwarding table (CAM table) dy...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: A learning bridge builds its forwarding table (CAM table) dynamically through backward learning. By inspecting the source MAC address and incoming port of every arriving frame, the bridge records which host is reachable on which port."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg",
      "imageCaption": "Figure: Self-Learning Bridges: Dynamic MAC Forwarding Database (FDB) Construction from Source Addresses."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg",
    "imageCaption": "Figure: Self-Learning Bridges: Dynamic MAC Forwarding Database (FDB) Construction from Source Addresses."
  },
  "u2-bridge-learning-process": {
    "id": "u2-bridge-learning-process",
    "title": "Bridge Learning Process",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.1D",
    "oneLiner": "Step-by-step mechanics of table updates, aging timers, and port mapping.",
    "quickAnswer": "When a frame enters Port X: (1) The bridge checks its table for the Source MAC. If not present, it adds (Source MAC, Port X, Timestamp). If present, it refreshes the timestamp. (2) An Aging Timer (default 300s) purges stale entries when hosts disconnect.",
    "whyItMatters": "The aging timer prevents forwarding frames to obsolete locations when a user disconnects or moves.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>The backward learning algorithm ensures the forwarding database reflects real-time host locations. The aging timer automatically purges devices that stop transmitting.</p>",
      "eli10": "In simple words: Step-by-step mechanics of table updates, aging timers, and port mapping.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Bridge Learning Process?<br><br><strong>Answer:</strong> When a frame enters Port X: (1) The bridge checks its table for the Source MAC. If not present, it adds (Source MAC, Port X, Timestamp). If present, it refreshes the timestamp. (2) An Aging Timer (default 300s) purges stale entries when hosts disconnect.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Bridge Learning Process?",
          "options": [
            "When a frame enters Port X: (1) The bridge checks its table ...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: When a frame enters Port X: (1) The bridge checks its table for the Source MAC. If not present, it adds (Source MAC, Port X, Timestamp). If present, it refreshes the timestamp. (2) An Aging Timer (default 300s) purges stale entries when hosts disconnect."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg",
      "imageCaption": "Figure: Step-by-Step Learning Process: Inspect Source MAC, Update Hash Table, Set Aging Timer."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg",
    "imageCaption": "Figure: Step-by-Step Learning Process: Inspect Source MAC, Update Hash Table, Set Aging Timer."
  },
  "u2-forwarding-and-filtering": {
    "id": "u2-forwarding-and-filtering",
    "title": "Forwarding and Filtering Decisions",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.1D",
    "oneLiner": "How a bridge decides whether to forward a frame across ports or silently drop it to conserve bandwidth.",
    "quickAnswer": "Upon receiving a frame on Port X with Destination MAC D: (1) If D is in the table on Port X, the frame is on the same segment -> FILTER (discard). (2) If D is in the table on Port Y (Y != X) -> FORWARD to Port Y only. (3) If D is unknown -> FLOOD to all ports except Port X.",
    "whyItMatters": "Filtering confines local conversations to local wires, dramatically multiplying effective network capacity.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>Filtering prevents local packets on Segment 1 from needlessly spilling onto Segment 2, isolating local collisions and freeing bandwidth for simultaneous remote transfers.</p>",
      "eli10": "In simple words: How a bridge decides whether to forward a frame across ports or silently drop it to conserve bandwidth.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Forwarding and Filtering Decisions?<br><br><strong>Answer:</strong> Upon receiving a frame on Port X with Destination MAC D: (1) If D is in the table on Port X, the frame is on the same segment -> FILTER (discard). (2) If D is in the table on Port Y (Y != X) -> FORWARD to Port Y only. (3) If D is unknown -> FLOOD to all ports except Port X.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Forwarding and Filtering Decisions?",
          "options": [
            "Upon receiving a frame on Port X with Destination MAC D: (1)...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Upon receiving a frame on Port X with Destination MAC D: (1) If D is in the table on Port X, the frame is on the same segment -> FILTER (discard). (2) If D is in the table on Port Y (Y != X) -> FORWARD to Port Y only. (3) If D is unknown -> FLOOD to all ports except Port X."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg",
      "imageCaption": "Figure: Forwarding and Filtering Rules: Filter if on Same Port; Forward if on Different Port."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg",
    "imageCaption": "Figure: Forwarding and Filtering Rules: Filter if on Same Port; Forward if on Different Port."
  },
  "u2-bridge-flooding": {
    "id": "u2-bridge-flooding",
    "title": "Flooding in Bridges",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.1D",
    "oneLiner": "Forwarding frames out of all ports except the arrival port when the destination MAC is unknown or broadcast.",
    "quickAnswer": "Flooding occurs when a bridge receives a frame whose destination MAC address is not yet in its forwarding database, or when the frame is addressed to the broadcast address (FF:FF:FF:FF:FF:FF). The frame is copied and transmitted out of every port except the port it arrived on.",
    "whyItMatters": "Flooding guarantees delivery even before a destination host has ever transmitted a packet.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>Flooding ensures that new or silent devices still receive traffic. Once the destination responds, the bridge learns its location and ceases flooding for that MAC.</p>",
      "eli10": "In simple words: Forwarding frames out of all ports except the arrival port when the destination MAC is unknown or broadcast.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Flooding in Bridges?<br><br><strong>Answer:</strong> Flooding occurs when a bridge receives a frame whose destination MAC address is not yet in its forwarding database, or when the frame is addressed to the broadcast address (FF:FF:FF:FF:FF:FF). The frame is copied and transmitted out of every port except the port it arrived on.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Flooding in Bridges?",
          "options": [
            "Flooding occurs when a bridge receives a frame whose destina...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Flooding occurs when a bridge receives a frame whose destination MAC address is not yet in its forwarding database, or when the frame is addressed to the broadcast address (FF:FF:FF:FF:FF:FF). The frame is copied and transmitted out of every port except the port it arrived on."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg",
      "imageCaption": "Figure: Bridge Flooding: Replicating Unicast Frames with Unknown Destination MACs to All Other Ports."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg",
    "imageCaption": "Figure: Bridge Flooding: Replicating Unicast Frames with Unknown Destination MACs to All Other Ports."
  },
  "u2-spanning-tree-protocol": {
    "id": "u2-spanning-tree-protocol",
    "title": "Spanning Tree Protocol (STP)",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.1D / Radia Perlman",
    "oneLiner": "Radia Perlman's algorithm breaking physical loops to eliminate catastrophic broadcast storms.",
    "quickAnswer": "If bridges are connected in physical loops for redundancy, flooded frames circulate endlessly, multiplying exponentially in a catastrophic broadcast storm. Radia Perlman's Spanning Tree Protocol (STP - IEEE 802.1D) elect a Root Bridge and selectively blocks redundant switch ports to maintain a loop-free logical tree.",
    "whyItMatters": "STP allows enterprise networks to build fault-tolerant redundant physical cabling without crashing from forwarding loops.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<div class=\"wiki-img-box my-4 text-center\"><img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Spanning_Tree_Protocol.svg/500px-Spanning_Tree_Protocol.svg.png\" alt=\"Spanning Tree Protocol\" class=\"mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain\" onerror=\"this.style.display='none'\"><p class=\"text-xs text-gray-500 mt-1 italic\">Figure: Spanning Tree Protocol electing root bridge and blocking redundant backup links.</p></div>",
      "eli10": "In simple words: Radia Perlman's algorithm breaking physical loops to eliminate catastrophic broadcast storms.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Spanning Tree Protocol (STP)?<br><br><strong>Answer:</strong> If bridges are connected in physical loops for redundancy, flooded frames circulate endlessly, multiplying exponentially in a catastrophic broadcast storm. Radia Perlman's Spanning Tree Protocol (STP - IEEE 802.1D) elect a Root Bridge and selectively blocks redundant switch ports to maintain a loop-free logical tree.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Spanning Tree Protocol (STP)?",
          "options": [
            "If bridges are connected in physical loops for redundancy, f...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: If bridges are connected in physical loops for redundancy, flooded frames circulate endlessly, multiplying exponentially in a catastrophic broadcast storm. Radia Perlman's Spanning Tree Protocol (STP - IEEE 802.1D) elect a Root Bridge and selectively blocks redundant switch ports to maintain a loop-free logical tree."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Spanning_tree_protocol_at_work_1.svg",
      "imageCaption": "Figure: IEEE 802.1D Spanning Tree Protocol (STP): Breaking Physical Loops and Preventing Broadcast Storms."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Spanning_tree_protocol_at_work_1.svg",
    "imageCaption": "Figure: IEEE 802.1D Spanning Tree Protocol (STP): Breaking Physical Loops and Preventing Broadcast Storms."
  },
  "u2-bridges-vs-switches": {
    "id": "u2-bridges-vs-switches",
    "title": "Bridges vs Switches",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "IEEE 802.1D / IEEE 802.3",
    "oneLiner": "Software-based 2-port bridges vs hardware ASIC multiport high-speed switches.",
    "quickAnswer": "A switch is fundamentally a multiport bridge implemented in specialized hardware (ASIC chips). Bridges typically had 2-4 ports and processed frames via software CPU interrupts. Switches offer 24-48+ ports, cut-through forwarding, dedicated full-duplex wire-speed bandwidth, and microsegmentation.",
    "whyItMatters": "Hardware switching enabled modern enterprise LANs to abandon half-duplex shared Ethernet entirely.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<table class=\"wiki-table\"><thead><tr><th>Feature</th><th>Legacy Bridge</th><th>Modern Switch</th></tr></thead><tbody><tr><td><strong>Hardware Architecture</strong></td><td>Software-driven CPU forwarding</td><td>Hardware ASIC / TCAM forwarding</td></tr><tr><td><strong>Port Density</strong></td><td>Few ports (typically 2 to 4)</td><td>High density (24, 48, 96+ ports)</td></tr><tr><td><strong>Forwarding Mode</strong></td><td>Store-and-forward only</td><td>Cut-through, Fragment-free, or Store-and-forward</td></tr><tr><td><strong>Collision Domains</strong></td><td>Few segments separated</td><td>Microsegmentation (each port is its own domain)</td></tr><tr><td><strong>Full Duplex Support</strong></td><td>Rare</td><td>Standard on all ports</td></tr></tbody></table>",
      "eli10": "In simple words: Software-based 2-port bridges vs hardware ASIC multiport high-speed switches.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Bridges vs Switches?<br><br><strong>Answer:</strong> A switch is fundamentally a multiport bridge implemented in specialized hardware (ASIC chips). Bridges typically had 2-4 ports and processed frames via software CPU interrupts. Switches offer 24-48+ ports, cut-through forwarding, dedicated full-duplex wire-speed bandwidth, and microsegmentation.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Bridges vs Switches?",
          "options": [
            "A switch is fundamentally a multiport bridge implemented in ...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: A switch is fundamentally a multiport bridge implemented in specialized hardware (ASIC chips). Bridges typically had 2-4 ports and processed frames via software CPU interrupts. Switches offer 24-48+ ports, cut-through forwarding, dedicated full-duplex wire-speed bandwidth, and microsegmentation."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg",
      "imageCaption": "Figure: Bridges (Software-Based, Few Ports) vs. Modern Switches (Hardware ASIC-Based, Many Ports)."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg",
    "imageCaption": "Figure: Bridges (Software-Based, Few Ports) vs. Modern Switches (Hardware ASIC-Based, Many Ports)."
  },
  "u2-networking-device-repeaters": {
    "id": "u2-networking-device-repeaters",
    "title": "Repeaters",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Beginner",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "OSI Layer 1 (Physical Layer)",
    "oneLiner": "Physical layer devices that regenerate and amplify electrical or optical signals to extend cable reach.",
    "quickAnswer": "A repeater operates at Layer 1 (Physical Layer). It receives attenuated, distorted electrical or optical signals from one cable segment, amplifies and reshapes them to restore pristine wave shape and voltage, and retransmits them onto the next segment. It does not inspect frames or filter traffic.",
    "whyItMatters": "Repeaters overcome the physical attenuation limits of copper cables (e.g., the 100m Ethernet limit).",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>A repeater operates at the bit level. It has no concept of frames, packets, MAC addresses, or IP addresses; it simply cleans and boosts physical signals.</p>",
      "eli10": "In simple words: Physical layer devices that regenerate and amplify electrical or optical signals to extend cable reach.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Repeaters?<br><br><strong>Answer:</strong> A repeater operates at Layer 1 (Physical Layer). It receives attenuated, distorted electrical or optical signals from one cable segment, amplifies and reshapes them to restore pristine wave shape and voltage, and retransmits them onto the next segment. It does not inspect frames or filter traffic.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Repeaters?",
          "options": [
            "A repeater operates at Layer 1 (Physical Layer). It receives...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: A repeater operates at Layer 1 (Physical Layer). It receives attenuated, distorted electrical or optical signals from one cable segment, amplifies and reshapes them to restore pristine wave shape and voltage, and retransmits them onto the next segment. It does not inspect frames or filter traffic."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Ethernet-broadcast-collision_%28hub%29.svg",
      "imageCaption": "Figure: Physical Layer Repeater (L1): Analog Signal Amplification, Regeneration, and Retiming."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Ethernet-broadcast-collision_%28hub%29.svg",
    "imageCaption": "Figure: Physical Layer Repeater (L1): Analog Signal Amplification, Regeneration, and Retiming."
  },
  "u2-networking-device-hubs": {
    "id": "u2-networking-device-hubs",
    "title": "Hubs",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Beginner",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "OSI Layer 1 (Multiport Repeater)",
    "oneLiner": "Multiport physical layer devices that blindly broadcast incoming bits to all connected ports.",
    "quickAnswer": "A hub is a multiport repeater operating at Layer 1. When an electrical signal arrives on one port, the hub regenerates it and broadcasts it out to ALL other ports simultaneously. All connected computers share a single collision domain and a single broadcast domain.",
    "whyItMatters": "Hubs enabled early star-topology 10BASE-T cabling before being completely replaced by switches.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>Because a hub blindly repeats bits to all ports, if two computers transmit at once, their signals collide inside the hub. Bandwidth is shared among all connected devices.</p>",
      "eli10": "In simple words: Multiport physical layer devices that blindly broadcast incoming bits to all connected ports.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Hubs?<br><br><strong>Answer:</strong> A hub is a multiport repeater operating at Layer 1. When an electrical signal arrives on one port, the hub regenerates it and broadcasts it out to ALL other ports simultaneously. All connected computers share a single collision domain and a single broadcast domain.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Hubs?",
          "options": [
            "A hub is a multiport repeater operating at Layer 1. When an ...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: A hub is a multiport repeater operating at Layer 1. When an electrical signal arrives on one port, the hub regenerates it and broadcasts it out to ALL other ports simultaneously. All connected computers share a single collision domain and a single broadcast domain."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Ethernet-broadcast-collision_%28hub%29.svg",
      "imageCaption": "Figure: Multiport Hub (L1): Electrical Signal Repeating: Single Collision Domain, Single Broadcast Domain."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Ethernet-broadcast-collision_%28hub%29.svg",
    "imageCaption": "Figure: Multiport Hub (L1): Electrical Signal Repeating: Single Collision Domain, Single Broadcast Domain."
  },
  "u2-networking-device-bridges": {
    "id": "u2-networking-device-bridges",
    "title": "Bridges",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Beginner",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "OSI Layer 2 (Data Link Layer)",
    "oneLiner": "Layer 2 devices that inspect MAC addresses to filter and forward frames between network segments.",
    "quickAnswer": "A bridge operates at Layer 2 (Data Link Layer). It inspects destination MAC addresses in frame headers, maintaining a forwarding table to isolate local traffic. It divides a network into separate collision domains while keeping a single broadcast domain.",
    "whyItMatters": "Bridges introduced intelligent address-based traffic filtering to local area networking.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>Bridges read frames, verify FCS checksums, and forward frames only across ports where the destination device actually resides.</p>",
      "eli10": "In simple words: Layer 2 devices that inspect MAC addresses to filter and forward frames between network segments.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Bridges?<br><br><strong>Answer:</strong> A bridge operates at Layer 2 (Data Link Layer). It inspects destination MAC addresses in frame headers, maintaining a forwarding table to isolate local traffic. It divides a network into separate collision domains while keeping a single broadcast domain.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Bridges?",
          "options": [
            "A bridge operates at Layer 2 (Data Link Layer). It inspects ...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: A bridge operates at Layer 2 (Data Link Layer). It inspects destination MAC addresses in frame headers, maintaining a forwarding table to isolate local traffic. It divides a network into separate collision domains while keeping a single broadcast domain."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg",
      "imageCaption": "Figure: Layer 2 Bridge: Separating Collision Domains while Maintaining a Single Broadcast Domain."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg",
    "imageCaption": "Figure: Layer 2 Bridge: Separating Collision Domains while Maintaining a Single Broadcast Domain."
  },
  "u2-networking-device-switches": {
    "id": "u2-networking-device-switches",
    "title": "Switches",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Beginner",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "OSI Layer 2 (Multiport Bridge)",
    "oneLiner": "High-performance Layer 2 devices providing dedicated full-duplex bandwidth per port via ASIC forwarding.",
    "quickAnswer": "A switch operates at Layer 2 (Data Link Layer) as a high-speed multiport bridge. It maintains a MAC address table in hardware (CAM/TCAM) and forwards frames directly from input port to destination port without disturbing other ports. Each switch port is an isolated collision domain.",
    "whyItMatters": "Switches form the backbone of modern enterprise LANs, Wi-Fi networks, and cloud datacenter fabrics.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>Switches provide dedicated collision-free communication to every attached computer, allowing simultaneous transmissions across different pairs of ports at full wire speed.</p>",
      "eli10": "In simple words: High-performance Layer 2 devices providing dedicated full-duplex bandwidth per port via ASIC forwarding.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Switches?<br><br><strong>Answer:</strong> A switch operates at Layer 2 (Data Link Layer) as a high-speed multiport bridge. It maintains a MAC address table in hardware (CAM/TCAM) and forwards frames directly from input port to destination port without disturbing other ports. Each switch port is an isolated collision domain.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Switches?",
          "options": [
            "A switch operates at Layer 2 (Data Link Layer) as a high-spe...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: A switch operates at Layer 2 (Data Link Layer) as a high-speed multiport bridge. It maintains a MAC address table in hardware (CAM/TCAM) and forwards frames directly from input port to destination port without disturbing other ports. Each switch port is an isolated collision domain."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg",
      "imageCaption": "Figure: Multiport Layer 2 Switch: Dedicated Collision Domain per Port with Full-Duplex Microsegmentation."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg",
    "imageCaption": "Figure: Multiport Layer 2 Switch: Dedicated Collision Domain per Port with Full-Duplex Microsegmentation."
  },
  "u2-networking-device-routers": {
    "id": "u2-networking-device-routers",
    "title": "Routers",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Beginner",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "OSI Layer 3 (Network Layer)",
    "oneLiner": "Layer 3 internetworking devices that forward packets between different IP subnets based on routing tables.",
    "quickAnswer": "A router operates at Layer 3 (Network Layer). It inspects destination IP addresses, looks up best paths in routing tables (built via OSPF, BGP, or static routes), and forwards packets between different subnets. Routers break up both collision domains and broadcast domains.",
    "whyItMatters": "Routers interconnect disparate network technologies (Ethernet, Wi-Fi, 5G, fiber) to form the global Internet.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>Unlike switches which operate within a single local subnet, routers connect entirely separate IP networks, making routing decisions based on IP prefixes.</p>",
      "eli10": "In simple words: Layer 3 internetworking devices that forward packets between different IP subnets based on routing tables.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Routers?<br><br><strong>Answer:</strong> A router operates at Layer 3 (Network Layer). It inspects destination IP addresses, looks up best paths in routing tables (built via OSPF, BGP, or static routes), and forwards packets between different subnets. Routers break up both collision domains and broadcast domains.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Routers?",
          "options": [
            "A router operates at Layer 3 (Network Layer). It inspects de...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: A router operates at Layer 3 (Network Layer). It inspects destination IP addresses, looks up best paths in routing tables (built via OSPF, BGP, or static routes), and forwards packets between different subnets. Routers break up both collision domains and broadcast domains."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e6/Router_on_a_stick.png",
      "imageCaption": "Figure: Layer 3 Router: Logical IP Addressing, Path Determination, and Broadcast Domain Separation."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e6/Router_on_a_stick.png",
    "imageCaption": "Figure: Layer 3 Router: Logical IP Addressing, Path Determination, and Broadcast Domain Separation."
  },
  "u2-networking-device-gateways": {
    "id": "u2-networking-device-gateways",
    "title": "Gateways",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "OSI Layer 4–7 (Application Layer)",
    "oneLiner": "Protocol translators interconnecting systems with completely different architecture and protocol stacks.",
    "quickAnswer": "A gateway operates across all upper OSI layers (Layers 4 to 7). Unlike routers which only route IP packets, a gateway translates between fundamentally different protocol architectures—such as converting between VoIP SIP telephony and analog PSTN, or translating email protocols.",
    "whyItMatters": "Gateways enable communication between completely incompatible network architectures.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>A gateway translates payloads, commands, and encoding formats across incompatible protocol stacks (e.g., an IoT Zigbee-to-IP cloud gateway).</p>",
      "eli10": "In simple words: Protocol translators interconnecting systems with completely different architecture and protocol stacks.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Gateways?<br><br><strong>Answer:</strong> A gateway operates across all upper OSI layers (Layers 4 to 7). Unlike routers which only route IP packets, a gateway translates between fundamentally different protocol architectures—such as converting between VoIP SIP telephony and analog PSTN, or translating email protocols.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Gateways?",
          "options": [
            "A gateway operates across all upper OSI layers (Layers 4 to ...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: A gateway operates across all upper OSI layers (Layers 4 to 7). Unlike routers which only route IP packets, a gateway translates between fundamentally different protocol architectures—such as converting between VoIP SIP telephony and analog PSTN, or translating email protocols."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e6/Router_on_a_stick.png",
      "imageCaption": "Figure: Protocol Gateway: Multi-Layer Translation between Incompatible Application and Transport Protocols."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e6/Router_on_a_stick.png",
    "imageCaption": "Figure: Protocol Gateway: Multi-Layer Translation between Incompatible Application and Transport Protocols."
  },
  "u2-device-working-principles": {
    "id": "u2-device-working-principles",
    "title": "Working Principles of Each Networking Device",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Tanenbaum Ch. 4.7 / Forouzan Ch. 15",
    "oneLiner": "Detailed analysis of packet inspection depth and forwarding engines across L1 through L7 devices.",
    "quickAnswer": "Repeaters/Hubs amplify bits at physical Layer 1 without buffering. Bridges/Switches inspect Layer 2 MAC addresses and verify CRC before forwarding. Routers strip Layer 2 frames, inspect Layer 3 IP headers, decrement TTL, and re-encapsulate into new link frames. Gateways translate Layer 4-7 payloads.",
    "whyItMatters": "Understanding packet inspection depth is the foundation of network architecture and security troubleshooting.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>A comprehensive walkthrough of the internal processing pipeline when a packet traverses a Repeater, Hub, Bridge, Switch, Router, and Gateway.</p>",
      "eli10": "In simple words: Detailed analysis of packet inspection depth and forwarding engines across L1 through L7 devices.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Working Principles of Each Networking Device?<br><br><strong>Answer:</strong> Repeaters/Hubs amplify bits at physical Layer 1 without buffering. Bridges/Switches inspect Layer 2 MAC addresses and verify CRC before forwarding. Routers strip Layer 2 frames, inspect Layer 3 IP headers, decrement TTL, and re-encapsulate into new link frames. Gateways translate Layer 4-7 payloads.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Working Principles of Each Networking Device?",
          "options": [
            "Repeaters/Hubs amplify bits at physical Layer 1 without buff...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Repeaters/Hubs amplify bits at physical Layer 1 without buffering. Bridges/Switches inspect Layer 2 MAC addresses and verify CRC before forwarding. Routers strip Layer 2 frames, inspect Layer 3 IP headers, decrement TTL, and re-encapsulate into new link frames. Gateways translate Layer 4-7 payloads."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Ethernet-broadcast-collision_%28hub%29.svg",
      "imageCaption": "Figure: Comparative Working Principles of Hubs, Switches, and Routers."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Ethernet-broadcast-collision_%28hub%29.svg",
    "imageCaption": "Figure: Comparative Working Principles of Hubs, Switches, and Routers."
  },
  "u2-comparison-networking-devices": {
    "id": "u2-comparison-networking-devices",
    "title": "Comparison of Networking Devices",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Tanenbaum Ch. 4.7 / Forouzan Ch. 15",
    "oneLiner": "Master comparison table comparing Repeaters, Hubs, Bridges, Switches, Routers, and Gateways.",
    "quickAnswer": "Master matrix contrasting operating OSI layers, PDU data units, addressing schemes, collision domain separation, and broadcast domain separation across all networking devices.",
    "whyItMatters": "Universally tested across all computer science semester exams, GATE, and network engineering interviews.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<table class=\"wiki-table\"><thead><tr><th>Device</th><th>OSI Layer</th><th>Data Unit</th><th>Addressing Used</th><th>Separates Collision Domains?</th><th>Separates Broadcast Domains?</th></tr></thead><tbody><tr><td><strong>Repeater</strong></td><td>Layer 1 (Physical)</td><td>Bits</td><td>None</td><td>No</td><td>No</td></tr><tr><td><strong>Hub</strong></td><td>Layer 1 (Physical)</td><td>Bits</td><td>None</td><td>No</td><td>No</td></tr><tr><td><strong>Bridge</strong></td><td>Layer 2 (Data Link)</td><td>Frames</td><td>MAC Address</td><td>Yes</td><td>No</td></tr><tr><td><strong>Switch</strong></td><td>Layer 2 (Data Link)</td><td>Frames</td><td>MAC Address</td><td>Yes (per port)</td><td>No (unless VLANs)</td></tr><tr><td><strong>Router</strong></td><td>Layer 3 (Network)</td><td>Packets</td><td>IP Address</td><td>Yes</td><td>Yes</td></tr><tr><td><strong>Gateway</strong></td><td>Layers 4–7 (App)</td><td>Messages</td><td>Protocol Specific</td><td>Yes</td><td>Yes</td></tr></tbody></table>",
      "eli10": "In simple words: Master comparison table comparing Repeaters, Hubs, Bridges, Switches, Routers, and Gateways.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Comparison of Networking Devices?<br><br><strong>Answer:</strong> Master matrix contrasting operating OSI layers, PDU data units, addressing schemes, collision domain separation, and broadcast domain separation across all networking devices.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Comparison of Networking Devices?",
          "options": [
            "Master matrix contrasting operating OSI layers, PDU data uni...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Master matrix contrasting operating OSI layers, PDU data units, addressing schemes, collision domain separation, and broadcast domain separation across all networking devices."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg",
      "imageCaption": "Figure: Comparison of Networking Devices: Operating Layer, Forwarding Decision, and Filtering Capabilities."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg",
    "imageCaption": "Figure: Comparison of Networking Devices: Operating Layer, Forwarding Decision, and Filtering Capabilities."
  },
  "u2-device-osi-layers": {
    "id": "u2-device-osi-layers",
    "title": "OSI Layers at Which Networking Devices Operate",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Beginner",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "ISO/IEC 7498-1",
    "oneLiner": "Clear visual mapping connecting physical hardware devices to their respective OSI layer levels.",
    "quickAnswer": "Layer 1 (Physical): Repeaters, Hubs, Transceivers. Layer 2 (Data Link): Bridges, Switches, Network Interface Cards (NICs). Layer 3 (Network): Routers, Layer 3 Switches. Layers 4–7 (Upper Layers): Application Gateways, Firewalls, Web Application Proxies.",
    "whyItMatters": "Anchors theoretical 7-layer OSI models to actual physical network hardware deployed in server rooms.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<div class=\"wiki-img-box my-4 text-center\"><img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Network_device_types.svg/600px-Network_device_types.svg.png\" alt=\"Network Device Types\" class=\"mx-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 max-h-80 object-contain\" onerror=\"this.style.display='none'\"><p class=\"text-xs text-gray-500 mt-1 italic\">Figure: Visual mapping of networking devices to their respective OSI operational layers.</p></div>",
      "eli10": "In simple words: Clear visual mapping connecting physical hardware devices to their respective OSI layer levels.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of OSI Layers at Which Networking Devices Operate?<br><br><strong>Answer:</strong> Layer 1 (Physical): Repeaters, Hubs, Transceivers. Layer 2 (Data Link): Bridges, Switches, Network Interface Cards (NICs). Layer 3 (Network): Routers, Layer 3 Switches. Layers 4–7 (Upper Layers): Application Gateways, Firewalls, Web Application Proxies.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of OSI Layers at Which Networking Devices Operate?",
          "options": [
            "Layer 1 (Physical): Repeaters, Hubs, Transceivers. Layer 2 (...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Layer 1 (Physical): Repeaters, Hubs, Transceivers. Layer 2 (Data Link): Bridges, Switches, Network Interface Cards (NICs). Layer 3 (Network): Routers, Layer 3 Switches. Layers 4–7 (Upper Layers): Application Gateways, Firewalls, Web Application Proxies."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg",
      "imageCaption": "Figure: OSI Model Layers at Which Networking Devices Operate (L1 Repeater/Hub, L2 Switch/Bridge, L3 Router, L7 Gateway)."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg",
    "imageCaption": "Figure: OSI Model Layers at Which Networking Devices Operate (L1 Repeater/Hub, L2 Switch/Bridge, L3 Router, L7 Gateway)."
  },
  "u2-definitions-terminology": {
    "id": "u2-definitions-terminology",
    "title": "Important Definitions and Terminology",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Beginner",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Forouzan Ch. 11 (PDF Section 9)",
    "oneLiner": "Comprehensive glossary of all core Layer 2 terminology defined in textbook and syllabus notes.",
    "quickAnswer": "Key terms from PDF: Frame (PDU of DLL), Framing (bitstream partitioning), Header (control bytes), Payload (user data), Trailer (error detection), Buffer (temporary storage), Flow Control (rate pacing), Error Control (ARQ recovery), MAC Address (48-bit local address), Byte/Bit Stuffing (delimiter escaping), FCS (CRC error check).",
    "whyItMatters": "Direct reference for rapid 2-mark university exam questions and technical viva preparation.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<table class=\"wiki-table\"><thead><tr><th>Term</th><th>Official Definition (PDF Section 9)</th></tr></thead><tbody><tr><td><strong>Data Link Layer</strong></td><td>Second layer of the OSI model responsible for node-to-node frame delivery.</td></tr><tr><td><strong>Frame</strong></td><td>The protocol data unit transmitted by the Data Link Layer.</td></tr><tr><td><strong>Framing</strong></td><td>Dividing a continuous bit stream into distinct, manageable blocks.</td></tr><tr><td><strong>Header</strong></td><td>Control information attached to the beginning of a frame (MACs, length).</td></tr><tr><td><strong>Payload</strong></td><td>The actual user data carried inside a frame from the Network Layer.</td></tr><tr><td><strong>Trailer</strong></td><td>Control information at the end of a frame containing error-detection codes (FCS).</td></tr><tr><td><strong>Buffer</strong></td><td>Temporary memory area used to store incoming data before it is processed.</td></tr><tr><td><strong>Flow Control</strong></td><td>Mechanism that regulates data transmission rate to prevent receiver buffer overflow.</td></tr><tr><td><strong>Error Control</strong></td><td>Procedures used to detect and recover from damaged, lost, or duplicated frames.</td></tr><tr><td><strong>ACK</strong></td><td>Positive acknowledgement confirming successful, error-free frame delivery.</td></tr><tr><td><strong>NAK</strong></td><td>Negative acknowledgement notifying sender that a frame was corrupted.</td></tr><tr><td><strong>ARQ</strong></td><td>Automatic Repeat Request: cooperative error recovery through retransmission.</td></tr><tr><td><strong>MAC Address</strong></td><td>48-bit hardware address uniquely identifying a network interface on a local link.</td></tr><tr><td><strong>Byte Stuffing</strong></td><td>Inserting escape bytes before flag delimiters appearing inside data payload.</td></tr><tr><td><strong>Bit Stuffing</strong></td><td>Inserting a 0 bit after every sequence of five consecutive 1 bits in data.</td></tr><tr><td><strong>Sequence Number</strong></td><td>Sequential integer identifying frames to detect duplicate and lost transmissions.</td></tr><tr><td><strong>FCS</strong></td><td>Frame Check Sequence: CRC remainder used by the receiver for error detection.</td></tr></tbody></table>",
      "eli10": "In simple words: Comprehensive glossary of all core Layer 2 terminology defined in textbook and syllabus notes.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Important Definitions and Terminology?<br><br><strong>Answer:</strong> Key terms from PDF: Frame (PDU of DLL), Framing (bitstream partitioning), Header (control bytes), Payload (user data), Trailer (error detection), Buffer (temporary storage), Flow Control (rate pacing), Error Control (ARQ recovery), MAC Address (48-bit local address), Byte/Bit Stuffing (delimiter escaping), FCS (CRC error check).",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Important Definitions and Terminology?",
          "options": [
            "Key terms from PDF: Frame (PDU of DLL), Framing (bitstream p...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Key terms from PDF: Frame (PDU of DLL), Framing (bitstream partitioning), Header (control bytes), Payload (user data), Trailer (error detection), Buffer (temporary storage), Flow Control (rate pacing), Error Control (ARQ recovery), MAC Address (48-bit local address), Byte/Bit Stuffing (delimiter escaping), FCS (CRC error check)."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg",
      "imageCaption": "Figure: Comprehensive Terminology Mindmap for Unit 2 Data Link Layer."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg",
    "imageCaption": "Figure: Comprehensive Terminology Mindmap for Unit 2 Data Link Layer."
  },
  "u2-important-diagrams": {
    "id": "u2-important-diagrams",
    "title": "Important Diagrams for Unit 2",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Syllabus Visual Archive",
    "oneLiner": "Visual revision gallery of all major diagrams across Data Link Layer topics.",
    "quickAnswer": "Gallery features: (1) OSI Model Layer 2 position, (2) General Frame Format (Header, Payload, Trailer), (3) Character Count, Byte Stuffing & Bit Stuffing, (4) Stop-and-Wait, Go-Back-N, and Selective Repeat timelines, (5) CSMA/CD flowchart, (6) Ethernet 802.3 Frame format, (7) Wi-Fi RTS/CTS, and (8) Bridge forwarding table learning.",
    "whyItMatters": "Examiners award maximum marks for accurate, well-labeled diagrams in semester examinations.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>A curated gallery of all essential Unit 2 diagrams with labels, timing annotations, and clear explanations for exam preparation.</p>",
      "eli10": "In simple words: Visual revision gallery of all major diagrams across Data Link Layer topics.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Important Diagrams for Unit 2?<br><br><strong>Answer:</strong> Gallery features: (1) OSI Model Layer 2 position, (2) General Frame Format (Header, Payload, Trailer), (3) Character Count, Byte Stuffing & Bit Stuffing, (4) Stop-and-Wait, Go-Back-N, and Selective Repeat timelines, (5) CSMA/CD flowchart, (6) Ethernet 802.3 Frame format, (7) Wi-Fi RTS/CTS, and (8) Bridge forwarding table learning.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Important Diagrams for Unit 2?",
          "options": [
            "Gallery features: (1) OSI Model Layer 2 position, (2) Genera...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Gallery features: (1) OSI Model Layer 2 position, (2) General Frame Format (Header, Payload, Trailer), (3) Character Count, Byte Stuffing & Bit Stuffing, (4) Stop-and-Wait, Go-Back-N, and Selective Repeat timelines, (5) CSMA/CD flowchart, (6) Ethernet 802.3 Frame format, (7) Wi-Fi RTS/CTS, and (8) Bridge forwarding table learning."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/42/Ethernet_frame.svg",
      "imageCaption": "Figure: Master Gallery of Core Architecture Diagrams: Framing, ARQ, MAC Sublayer, CSMA, Ethernet, Wi-Fi, and Switching.",
      "technicalDetails": "\n      <div class=\"space-y-6 my-4\">\n        <p class=\"text-sm text-gray-700 dark:text-gray-300\">\n          This comprehensive visual gallery synthesizes all high-yield architecture diagrams, timing traces, and protocol schemas across Unit 2 (Data Link Layer & MAC Sublayer) for high-impact university exam revision.\n        </p>\n        <div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n          \n            <div class=\"border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col justify-between\">\n              <div>\n                <h4 class=\"font-bold text-xs text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-1.5\">\n                  <i class=\"fa-solid fa-image text-blue-500 text-[10px]\"></i>\n                  <span>1. Data Link Layer in the OSI Reference Model</span>\n                </h4>\n                <div class=\"bg-slate-50 dark:bg-slate-950 p-2 rounded-lg flex items-center justify-center min-h-[180px]\">\n                  <img src=\"https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg\" \n                       alt=\"1. Data Link Layer in the OSI Reference Model\" \n                       loading=\"lazy\" \n                       referrerpolicy=\"no-referrer\"\n                       class=\"max-w-full h-auto max-h-[220px] object-contain rounded\"\n                       onerror=\"this.onerror=null; this.closest('div').innerHTML='<span class=\\'text-xs text-gray-400 font-mono\\'>[Diagram available in section schematic]</span>';\" />\n                </div>\n              </div>\n              <p class=\"text-[11px] text-gray-600 dark:text-gray-400 mt-2 leading-relaxed font-sans\">\n                Layer 2 position, encapsulation of Network Layer packets into frames, and physical bit transmission.\n              </p>\n            </div>\n          \n            <div class=\"border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col justify-between\">\n              <div>\n                <h4 class=\"font-bold text-xs text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-1.5\">\n                  <i class=\"fa-solid fa-image text-blue-500 text-[10px]\"></i>\n                  <span>2. Bit Stuffing & Frame Delimiting</span>\n                </h4>\n                <div class=\"bg-slate-50 dark:bg-slate-950 p-2 rounded-lg flex items-center justify-center min-h-[180px]\">\n                  <img src=\"https://upload.wikimedia.org/wikipedia/commons/5/55/Bit_stuffing.png\" \n                       alt=\"2. Bit Stuffing & Frame Delimiting\" \n                       loading=\"lazy\" \n                       referrerpolicy=\"no-referrer\"\n                       class=\"max-w-full h-auto max-h-[220px] object-contain rounded\"\n                       onerror=\"this.onerror=null; this.closest('div').innerHTML='<span class=\\'text-xs text-gray-400 font-mono\\'>[Diagram available in section schematic]</span>';\" />\n                </div>\n              </div>\n              <p class=\"text-[11px] text-gray-600 dark:text-gray-400 mt-2 leading-relaxed font-sans\">\n                Zero-bit insertion rule after five consecutive 1s to prevent flag pattern (01111110) collision in payload.\n              </p>\n            </div>\n          \n            <div class=\"border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col justify-between\">\n              <div>\n                <h4 class=\"font-bold text-xs text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-1.5\">\n                  <i class=\"fa-solid fa-image text-blue-500 text-[10px]\"></i>\n                  <span>3. Stop-and-Wait ARQ Protocol Sequence</span>\n                </h4>\n                <div class=\"bg-slate-50 dark:bg-slate-950 p-2 rounded-lg flex items-center justify-center min-h-[180px]\">\n                  <img src=\"https://upload.wikimedia.org/wikipedia/commons/7/76/Stop_and_wait_arq.png\" \n                       alt=\"3. Stop-and-Wait ARQ Protocol Sequence\" \n                       loading=\"lazy\" \n                       referrerpolicy=\"no-referrer\"\n                       class=\"max-w-full h-auto max-h-[220px] object-contain rounded\"\n                       onerror=\"this.onerror=null; this.closest('div').innerHTML='<span class=\\'text-xs text-gray-400 font-mono\\'>[Diagram available in section schematic]</span>';\" />\n                </div>\n              </div>\n              <p class=\"text-[11px] text-gray-600 dark:text-gray-400 mt-2 leading-relaxed font-sans\">\n                Alternating bit acknowledgment (ACK 0 / ACK 1), transmission timer, and timeout retransmission.\n              </p>\n            </div>\n          \n            <div class=\"border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col justify-between\">\n              <div>\n                <h4 class=\"font-bold text-xs text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-1.5\">\n                  <i class=\"fa-solid fa-image text-blue-500 text-[10px]\"></i>\n                  <span>4. Selective Repeat & Sliding Window Protocol</span>\n                </h4>\n                <div class=\"bg-slate-50 dark:bg-slate-950 p-2 rounded-lg flex items-center justify-center min-h-[180px]\">\n                  <img src=\"https://upload.wikimedia.org/wikipedia/commons/5/54/Selective_repeat_transmit_window_example.png\" \n                       alt=\"4. Selective Repeat & Sliding Window Protocol\" \n                       loading=\"lazy\" \n                       referrerpolicy=\"no-referrer\"\n                       class=\"max-w-full h-auto max-h-[220px] object-contain rounded\"\n                       onerror=\"this.onerror=null; this.closest('div').innerHTML='<span class=\\'text-xs text-gray-400 font-mono\\'>[Diagram available in section schematic]</span>';\" />\n                </div>\n              </div>\n              <p class=\"text-[11px] text-gray-600 dark:text-gray-400 mt-2 leading-relaxed font-sans\">\n                Sender window and receiver window buffering slots enabling independent retransmission.\n              </p>\n            </div>\n          \n            <div class=\"border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col justify-between\">\n              <div>\n                <h4 class=\"font-bold text-xs text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-1.5\">\n                  <i class=\"fa-solid fa-image text-blue-500 text-[10px]\"></i>\n                  <span>5. FDMA & TDMA Static Channel Allocation</span>\n                </h4>\n                <div class=\"bg-slate-50 dark:bg-slate-950 p-2 rounded-lg flex items-center justify-center min-h-[180px]\">\n                  <img src=\"https://upload.wikimedia.org/wikipedia/commons/7/79/FDMA.PNG\" \n                       alt=\"5. FDMA & TDMA Static Channel Allocation\" \n                       loading=\"lazy\" \n                       referrerpolicy=\"no-referrer\"\n                       class=\"max-w-full h-auto max-h-[220px] object-contain rounded\"\n                       onerror=\"this.onerror=null; this.closest('div').innerHTML='<span class=\\'text-xs text-gray-400 font-mono\\'>[Diagram available in section schematic]</span>';\" />\n                </div>\n              </div>\n              <p class=\"text-[11px] text-gray-600 dark:text-gray-400 mt-2 leading-relaxed font-sans\">\n                Frequency spectrum subdivision (FDMA) and time slot allocation (TDMA) for dedicated non-contention channels.\n              </p>\n            </div>\n          \n            <div class=\"border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col justify-between\">\n              <div>\n                <h4 class=\"font-bold text-xs text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-1.5\">\n                  <i class=\"fa-solid fa-image text-blue-500 text-[10px]\"></i>\n                  <span>6. Pure ALOHA Protocol & Vulnerable Time</span>\n                </h4>\n                <div class=\"bg-slate-50 dark:bg-slate-950 p-2 rounded-lg flex items-center justify-center min-h-[180px]\">\n                  <img src=\"https://upload.wikimedia.org/wikipedia/commons/3/35/Pure_ALOHA1.svg\" \n                       alt=\"6. Pure ALOHA Protocol & Vulnerable Time\" \n                       loading=\"lazy\" \n                       referrerpolicy=\"no-referrer\"\n                       class=\"max-w-full h-auto max-h-[220px] object-contain rounded\"\n                       onerror=\"this.onerror=null; this.closest('div').innerHTML='<span class=\\'text-xs text-gray-400 font-mono\\'>[Diagram available in section schematic]</span>';\" />\n                </div>\n              </div>\n              <p class=\"text-[11px] text-gray-600 dark:text-gray-400 mt-2 leading-relaxed font-sans\">\n                Vulnerable period of 2Tfr where overlapping packet transmissions result in collision (max throughput 18.4%).\n              </p>\n            </div>\n          \n            <div class=\"border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col justify-between\">\n              <div>\n                <h4 class=\"font-bold text-xs text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-1.5\">\n                  <i class=\"fa-solid fa-image text-blue-500 text-[10px]\"></i>\n                  <span>7. Slotted ALOHA Synchronized Discrete Slots</span>\n                </h4>\n                <div class=\"bg-slate-50 dark:bg-slate-950 p-2 rounded-lg flex items-center justify-center min-h-[180px]\">\n                  <img src=\"https://upload.wikimedia.org/wikipedia/commons/7/7a/Slotted_ALOHA.svg\" \n                       alt=\"7. Slotted ALOHA Synchronized Discrete Slots\" \n                       loading=\"lazy\" \n                       referrerpolicy=\"no-referrer\"\n                       class=\"max-w-full h-auto max-h-[220px] object-contain rounded\"\n                       onerror=\"this.onerror=null; this.closest('div').innerHTML='<span class=\\'text-xs text-gray-400 font-mono\\'>[Diagram available in section schematic]</span>';\" />\n                </div>\n              </div>\n              <p class=\"text-[11px] text-gray-600 dark:text-gray-400 mt-2 leading-relaxed font-sans\">\n                Discrete time slot boundaries halving vulnerable time to Tfr and doubling throughput to 36.8%.\n              </p>\n            </div>\n          \n            <div class=\"border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col justify-between\">\n              <div>\n                <h4 class=\"font-bold text-xs text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-1.5\">\n                  <i class=\"fa-solid fa-image text-blue-500 text-[10px]\"></i>\n                  <span>8. CSMA/CD Operation Flowchart</span>\n                </h4>\n                <div class=\"bg-slate-50 dark:bg-slate-950 p-2 rounded-lg flex items-center justify-center min-h-[180px]\">\n                  <img src=\"https://upload.wikimedia.org/wikipedia/commons/5/5b/Carrier_Sense_Multiple_Access_with_Collision_Detection.png\" \n                       alt=\"8. CSMA/CD Operation Flowchart\" \n                       loading=\"lazy\" \n                       referrerpolicy=\"no-referrer\"\n                       class=\"max-w-full h-auto max-h-[220px] object-contain rounded\"\n                       onerror=\"this.onerror=null; this.closest('div').innerHTML='<span class=\\'text-xs text-gray-400 font-mono\\'>[Diagram available in section schematic]</span>';\" />\n                </div>\n              </div>\n              <p class=\"text-[11px] text-gray-600 dark:text-gray-400 mt-2 leading-relaxed font-sans\">\n                Listen-while-talk carrier sensing, collision detection, 32-bit jam signal, and binary exponential backoff.\n              </p>\n            </div>\n          \n            <div class=\"border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col justify-between\">\n              <div>\n                <h4 class=\"font-bold text-xs text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-1.5\">\n                  <i class=\"fa-solid fa-image text-blue-500 text-[10px]\"></i>\n                  <span>9. CSMA/CA Collision Avoidance Timing Diagram</span>\n                </h4>\n                <div class=\"bg-slate-50 dark:bg-slate-950 p-2 rounded-lg flex items-center justify-center min-h-[180px]\">\n                  <img src=\"https://upload.wikimedia.org/wikipedia/commons/1/1d/Csma_ca.svg\" \n                       alt=\"9. CSMA/CA Collision Avoidance Timing Diagram\" \n                       loading=\"lazy\" \n                       referrerpolicy=\"no-referrer\"\n                       class=\"max-w-full h-auto max-h-[220px] object-contain rounded\"\n                       onerror=\"this.onerror=null; this.closest('div').innerHTML='<span class=\\'text-xs text-gray-400 font-mono\\'>[Diagram available in section schematic]</span>';\" />\n                </div>\n              </div>\n              <p class=\"text-[11px] text-gray-600 dark:text-gray-400 mt-2 leading-relaxed font-sans\">\n                Distributed Coordination Function (DCF): DIFS delay, slotted contention window backoff, SIFS, and ACK.\n              </p>\n            </div>\n          \n            <div class=\"border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col justify-between\">\n              <div>\n                <h4 class=\"font-bold text-xs text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-1.5\">\n                  <i class=\"fa-solid fa-image text-blue-500 text-[10px]\"></i>\n                  <span>10. Token Ring Collision-Free Protocol</span>\n                </h4>\n                <div class=\"bg-slate-50 dark:bg-slate-950 p-2 rounded-lg flex items-center justify-center min-h-[180px]\">\n                  <img src=\"https://upload.wikimedia.org/wikipedia/commons/c/cb/Token_ring.svg\" \n                       alt=\"10. Token Ring Collision-Free Protocol\" \n                       loading=\"lazy\" \n                       referrerpolicy=\"no-referrer\"\n                       class=\"max-w-full h-auto max-h-[220px] object-contain rounded\"\n                       onerror=\"this.onerror=null; this.closest('div').innerHTML='<span class=\\'text-xs text-gray-400 font-mono\\'>[Diagram available in section schematic]</span>';\" />\n                </div>\n              </div>\n              <p class=\"text-[11px] text-gray-600 dark:text-gray-400 mt-2 leading-relaxed font-sans\">\n                Deterministic token-passing ring topology avoiding contention and ensuring guaranteed channel access.\n              </p>\n            </div>\n          \n            <div class=\"border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col justify-between\">\n              <div>\n                <h4 class=\"font-bold text-xs text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-1.5\">\n                  <i class=\"fa-solid fa-image text-blue-500 text-[10px]\"></i>\n                  <span>11. IEEE 802.3 Ethernet Frame Format</span>\n                </h4>\n                <div class=\"bg-slate-50 dark:bg-slate-950 p-2 rounded-lg flex items-center justify-center min-h-[180px]\">\n                  <img src=\"https://upload.wikimedia.org/wikipedia/commons/4/42/Ethernet_frame.svg\" \n                       alt=\"11. IEEE 802.3 Ethernet Frame Format\" \n                       loading=\"lazy\" \n                       referrerpolicy=\"no-referrer\"\n                       class=\"max-w-full h-auto max-h-[220px] object-contain rounded\"\n                       onerror=\"this.onerror=null; this.closest('div').innerHTML='<span class=\\'text-xs text-gray-400 font-mono\\'>[Diagram available in section schematic]</span>';\" />\n                </div>\n              </div>\n              <p class=\"text-[11px] text-gray-600 dark:text-gray-400 mt-2 leading-relaxed font-sans\">\n                Preamble (7B), SFD (1B), Dest MAC (6B), Src MAC (6B), EtherType (2B), Data Payload (46–1500B), and 32-bit CRC FCS (4B).\n              </p>\n            </div>\n          \n            <div class=\"border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col justify-between\">\n              <div>\n                <h4 class=\"font-bold text-xs text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-1.5\">\n                  <i class=\"fa-solid fa-image text-blue-500 text-[10px]\"></i>\n                  <span>12. The Hidden Terminal Problem in Wireless Networks</span>\n                </h4>\n                <div class=\"bg-slate-50 dark:bg-slate-950 p-2 rounded-lg flex items-center justify-center min-h-[180px]\">\n                  <img src=\"https://upload.wikimedia.org/wikipedia/commons/2/2b/Wifi_hidden_station_problem.svg\" \n                       alt=\"12. The Hidden Terminal Problem in Wireless Networks\" \n                       loading=\"lazy\" \n                       referrerpolicy=\"no-referrer\"\n                       class=\"max-w-full h-auto max-h-[220px] object-contain rounded\"\n                       onerror=\"this.onerror=null; this.closest('div').innerHTML='<span class=\\'text-xs text-gray-400 font-mono\\'>[Diagram available in section schematic]</span>';\" />\n                </div>\n              </div>\n              <p class=\"text-[11px] text-gray-600 dark:text-gray-400 mt-2 leading-relaxed font-sans\">\n                Stations A and C out of sensing range transmit to B simultaneously, causing frame corruption at receiver B.\n              </p>\n            </div>\n          \n            <div class=\"border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col justify-between\">\n              <div>\n                <h4 class=\"font-bold text-xs text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-1.5\">\n                  <i class=\"fa-solid fa-image text-blue-500 text-[10px]\"></i>\n                  <span>13. The Exposed Terminal Problem in Wireless Networks</span>\n                </h4>\n                <div class=\"bg-slate-50 dark:bg-slate-950 p-2 rounded-lg flex items-center justify-center min-h-[180px]\">\n                  <img src=\"https://upload.wikimedia.org/wikipedia/commons/9/97/Exposed_terminal_problem.svg\" \n                       alt=\"13. The Exposed Terminal Problem in Wireless Networks\" \n                       loading=\"lazy\" \n                       referrerpolicy=\"no-referrer\"\n                       class=\"max-w-full h-auto max-h-[220px] object-contain rounded\"\n                       onerror=\"this.onerror=null; this.closest('div').innerHTML='<span class=\\'text-xs text-gray-400 font-mono\\'>[Diagram available in section schematic]</span>';\" />\n                </div>\n              </div>\n              <p class=\"text-[11px] text-gray-600 dark:text-gray-400 mt-2 leading-relaxed font-sans\">\n                Station C unnecessarily defers transmission to D because it overhears B transmitting to station A.\n              </p>\n            </div>\n          \n            <div class=\"border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col justify-between\">\n              <div>\n                <h4 class=\"font-bold text-xs text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-1.5\">\n                  <i class=\"fa-solid fa-image text-blue-500 text-[10px]\"></i>\n                  <span>14. IEEE 802.11 RTS/CTS Handshake with NAV</span>\n                </h4>\n                <div class=\"bg-slate-50 dark:bg-slate-950 p-2 rounded-lg flex items-center justify-center min-h-[180px]\">\n                  <img src=\"https://upload.wikimedia.org/wikipedia/commons/b/bb/RTS_CTS_FRTS_Schema.png\" \n                       alt=\"14. IEEE 802.11 RTS/CTS Handshake with NAV\" \n                       loading=\"lazy\" \n                       referrerpolicy=\"no-referrer\"\n                       class=\"max-w-full h-auto max-h-[220px] object-contain rounded\"\n                       onerror=\"this.onerror=null; this.closest('div').innerHTML='<span class=\\'text-xs text-gray-400 font-mono\\'>[Diagram available in section schematic]</span>';\" />\n                </div>\n              </div>\n              <p class=\"text-[11px] text-gray-600 dark:text-gray-400 mt-2 leading-relaxed font-sans\">\n                Virtual carrier sensing using Network Allocation Vector (NAV) to prevent hidden terminal collisions.\n              </p>\n            </div>\n          \n            <div class=\"border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col justify-between\">\n              <div>\n                <h4 class=\"font-bold text-xs text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-1.5\">\n                  <i class=\"fa-solid fa-image text-blue-500 text-[10px]\"></i>\n                  <span>15. IEEE 802.11 Wireless MAC Frame Format</span>\n                </h4>\n                <div class=\"bg-slate-50 dark:bg-slate-950 p-2 rounded-lg flex items-center justify-center min-h-[180px]\">\n                  <img src=\"https://upload.wikimedia.org/wikipedia/commons/5/53/802.11_MAC_Frame.svg\" \n                       alt=\"15. IEEE 802.11 Wireless MAC Frame Format\" \n                       loading=\"lazy\" \n                       referrerpolicy=\"no-referrer\"\n                       class=\"max-w-full h-auto max-h-[220px] object-contain rounded\"\n                       onerror=\"this.onerror=null; this.closest('div').innerHTML='<span class=\\'text-xs text-gray-400 font-mono\\'>[Diagram available in section schematic]</span>';\" />\n                </div>\n              </div>\n              <p class=\"text-[11px] text-gray-600 dark:text-gray-400 mt-2 leading-relaxed font-sans\">\n                Frame Control, Duration/ID, 4 MAC Address fields (RA, TA, DA, SA), Sequence Control, QoS, Payload, and FCS.\n              </p>\n            </div>\n          \n            <div class=\"border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col justify-between\">\n              <div>\n                <h4 class=\"font-bold text-xs text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-1.5\">\n                  <i class=\"fa-solid fa-image text-blue-500 text-[10px]\"></i>\n                  <span>16. Spanning Tree Protocol (STP - IEEE 802.1D)</span>\n                </h4>\n                <div class=\"bg-slate-50 dark:bg-slate-950 p-2 rounded-lg flex items-center justify-center min-h-[180px]\">\n                  <img src=\"https://upload.wikimedia.org/wikipedia/commons/d/d7/Spanning_tree_protocol_at_work_1.svg\" \n                       alt=\"16. Spanning Tree Protocol (STP - IEEE 802.1D)\" \n                       loading=\"lazy\" \n                       referrerpolicy=\"no-referrer\"\n                       class=\"max-w-full h-auto max-h-[220px] object-contain rounded\"\n                       onerror=\"this.onerror=null; this.closest('div').innerHTML='<span class=\\'text-xs text-gray-400 font-mono\\'>[Diagram available in section schematic]</span>';\" />\n                </div>\n              </div>\n              <p class=\"text-[11px] text-gray-600 dark:text-gray-400 mt-2 leading-relaxed font-sans\">\n                Root bridge election, designated ports, and loop blocking to prevent broadcast storms and bridging loops.\n              </p>\n            </div>\n          \n            <div class=\"border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col justify-between\">\n              <div>\n                <h4 class=\"font-bold text-xs text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-1.5\">\n                  <i class=\"fa-solid fa-image text-blue-500 text-[10px]\"></i>\n                  <span>17. Collision Domains vs. Broadcast Domains in Switches & Hubs</span>\n                </h4>\n                <div class=\"bg-slate-50 dark:bg-slate-950 p-2 rounded-lg flex items-center justify-center min-h-[180px]\">\n                  <img src=\"https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg\" \n                       alt=\"17. Collision Domains vs. Broadcast Domains in Switches & Hubs\" \n                       loading=\"lazy\" \n                       referrerpolicy=\"no-referrer\"\n                       class=\"max-w-full h-auto max-h-[220px] object-contain rounded\"\n                       onerror=\"this.onerror=null; this.closest('div').innerHTML='<span class=\\'text-xs text-gray-400 font-mono\\'>[Diagram available in section schematic]</span>';\" />\n                </div>\n              </div>\n              <p class=\"text-[11px] text-gray-600 dark:text-gray-400 mt-2 leading-relaxed font-sans\">\n                Switches provide a dedicated collision domain per port; routers separate broadcast domains.\n              </p>\n            </div>\n          \n            <div class=\"border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col justify-between\">\n              <div>\n                <h4 class=\"font-bold text-xs text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-1.5\">\n                  <i class=\"fa-solid fa-image text-blue-500 text-[10px]\"></i>\n                  <span>18. Hamming(7,4) Single Error-Correcting Code Architecture</span>\n                </h4>\n                <div class=\"bg-slate-50 dark:bg-slate-950 p-2 rounded-lg flex items-center justify-center min-h-[180px]\">\n                  <img src=\"https://upload.wikimedia.org/wikipedia/commons/b/b0/Hamming%287%2C4%29.svg\" \n                       alt=\"18. Hamming(7,4) Single Error-Correcting Code Architecture\" \n                       loading=\"lazy\" \n                       referrerpolicy=\"no-referrer\"\n                       class=\"max-w-full h-auto max-h-[220px] object-contain rounded\"\n                       onerror=\"this.onerror=null; this.closest('div').innerHTML='<span class=\\'text-xs text-gray-400 font-mono\\'>[Diagram available in section schematic]</span>';\" />\n                </div>\n              </div>\n              <p class=\"text-[11px] text-gray-600 dark:text-gray-400 mt-2 leading-relaxed font-sans\">\n                Venn diagram architecture of 4 data bits (d1-d4) protected by 3 overlapping parity circles (p1-p3).\n              </p>\n            </div>\n          \n        </div>\n      </div>\n    "
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/42/Ethernet_frame.svg",
    "imageCaption": "Figure: Master Gallery of Core Architecture Diagrams: Framing, ARQ, MAC Sublayer, CSMA, Ethernet, Wi-Fi, and Switching."
  },
  "u2-comparison-tables": {
    "id": "u2-comparison-tables",
    "title": "Master Comparison Tables for Unit 2",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Syllabus Comparison Suite",
    "oneLiner": "All textbook comparison tables consolidated for quick revision and exam distinction questions.",
    "quickAnswer": "Includes: Physical vs Data Link Layer (PDF 8.1), Framing vs Flow Control vs Error Control (PDF 8.2), Connectionless vs Connection-Oriented (PDF 8.3), Byte Stuffing vs Bit Stuffing (PDF 4.5), Flow Control vs Error Control (PDF 6.6), Pure vs Slotted ALOHA, Go-Back-N vs Selective Repeat, and Bridges vs Switches vs Routers.",
    "whyItMatters": "Comparison questions frequently appear as 5-mark and 10-mark questions in university exams.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>Consolidated comparison tables directly derived from Behrouz Forouzan Chapter 11 and syllabus notes for fast revision.</p>",
      "eli10": "In simple words: All textbook comparison tables consolidated for quick revision and exam distinction questions.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Master Comparison Tables for Unit 2?<br><br><strong>Answer:</strong> Includes: Physical vs Data Link Layer (PDF 8.1), Framing vs Flow Control vs Error Control (PDF 8.2), Connectionless vs Connection-Oriented (PDF 8.3), Byte Stuffing vs Bit Stuffing (PDF 4.5), Flow Control vs Error Control (PDF 6.6), Pure vs Slotted ALOHA, Go-Back-N vs Selective Repeat, and Bridges vs Switches vs Routers.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Master Comparison Tables for Unit 2?",
          "options": [
            "Includes: Physical vs Data Link Layer (PDF 8.1), Framing vs ...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Includes: Physical vs Data Link Layer (PDF 8.1), Framing vs Flow Control vs Error Control (PDF 8.2), Connectionless vs Connection-Oriented (PDF 8.3), Byte Stuffing vs Bit Stuffing (PDF 4.5), Flow Control vs Error Control (PDF 6.6), Pure vs Slotted ALOHA, Go-Back-N vs Selective Repeat, and Bridges vs Switches vs Routers."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg",
      "imageCaption": "Figure: Master Comparison Visual Guide: Bridges vs Switches, DCF vs PCF, FDMA vs TDMA, Pure vs Slotted ALOHA."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ethernet-broadcast-collision.svg",
    "imageCaption": "Figure: Master Comparison Visual Guide: Bridges vs Switches, DCF vs PCF, FDMA vs TDMA, Pure vs Slotted ALOHA."
  },
  "u2-numerical-problems": {
    "id": "u2-numerical-problems",
    "title": "Numerical Problems & Solutions for Unit 2",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Advanced",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "University & GATE Exam Archive",
    "oneLiner": "Step-by-step solved numerical problems on CSMA/CD minimum frame size, sliding window utilization, and ALOHA throughput.",
    "quickAnswer": "Features fully worked solutions for: (1) Minimum frame size in CSMA/CD: L_min = 2 * RTT * Bandwidth, (2) Sliding window efficiency: eta = N / (1 + 2a), (3) Pure & Slotted ALOHA maximum throughput and offered load, (4) Bit stuffing output string calculation, and (5) CRC division and codeword generation.",
    "whyItMatters": "Numerical questions test deep mathematical understanding and account for 20-30% of GATE network paper marks.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "\n    <p>This section provides comprehensive worked numerical problems covering sequence number arithmetic, window sizing, propagation-to-transmission ratios ($a$), and channel utilization efficiencies across all Data Link Layer protocols, directly aligned with <strong>Forouzan Chapter 11</strong> and university examination patterns.</p>\n    \n    <div class=\"space-y-6 my-6\">\n      <!-- Problem 1 -->\n      <div class=\"p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-200 dark:border-blue-900 shadow-sm\">\n        <h4 class=\"font-bold text-sm text-blue-700 dark:text-blue-400 mb-1\">Problem 1: Sequence Number Calculation ($m = 3$)</h4>\n        <p class=\"text-xs text-gray-700 dark:text-gray-300\"><strong>Question:</strong> A protocol uses a 3-bit sequence number. Find the total number of sequence numbers and list them.</p>\n        <div class=\"mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded font-mono text-xs text-gray-800 dark:text-gray-200\">\n          <p><strong>Formula:</strong> $N = 2^m$</p>\n          <p>Given: $m = 3$ bits</p>\n          <p>Calculation: $N = 2^3 = 8$ sequence numbers.</p>\n          <p class=\"text-emerald-600 dark:text-emerald-400 font-bold mt-1\">Answer: 8 sequence numbers. The valid range is {0, 1, 2, 3, 4, 5, 6, 7}.</p>\n        </div>\n      </div>\n\n      <!-- Problem 2 -->\n      <div class=\"p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-200 dark:border-blue-900 shadow-sm\">\n        <h4 class=\"font-bold text-sm text-blue-700 dark:text-blue-400 mb-1\">Problem 2: Go-Back-N Window Sizing ($m = 4$)</h4>\n        <p class=\"text-xs text-gray-700 dark:text-gray-300\"><strong>Question:</strong> A Go-Back-N ARQ protocol uses a 4-bit sequence number. Find the maximum sender window size and receiver window size.</p>\n        <div class=\"mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded font-mono text-xs text-gray-800 dark:text-gray-200\">\n          <p>Given: $m = 4$ bits</p>\n          <p>Sender Window: $W_s = 2^m - 1 = 2^4 - 1 = 16 - 1 = 15$</p>\n          <p>Receiver Window: $W_r = 1$ (always 1 in Go-Back-N)</p>\n          <p class=\"text-emerald-600 dark:text-emerald-400 font-bold mt-1\">Answer: Sender Window = 15 frames, Receiver Window = 1 frame.</p>\n        </div>\n      </div>\n\n      <!-- Problem 3 -->\n      <div class=\"p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-200 dark:border-blue-900 shadow-sm\">\n        <h4 class=\"font-bold text-sm text-blue-700 dark:text-blue-400 mb-1\">Problem 3: Selective Repeat Window Sizing ($m = 4$)</h4>\n        <p class=\"text-xs text-gray-700 dark:text-gray-300\"><strong>Question:</strong> A Selective Repeat ARQ protocol uses a 4-bit sequence number. Find the maximum sender and receiver window sizes.</p>\n        <div class=\"mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded font-mono text-xs text-gray-800 dark:text-gray-200\">\n          <p>Given: $m = 4$ bits</p>\n          <p>Sender Window: $W_s = 2^{m-1} = 2^{4-1} = 2^3 = 8$</p>\n          <p>Receiver Window: $W_r = 2^{m-1} = 2^{4-1} = 2^3 = 8$</p>\n          <p class=\"text-emerald-600 dark:text-emerald-400 font-bold mt-1\">Answer: Sender Window = 8 frames, Receiver Window = 8 frames.</p>\n        </div>\n      </div>\n\n      <!-- Problem 4 -->\n      <div class=\"p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-200 dark:border-blue-900 shadow-sm\">\n        <h4 class=\"font-bold text-sm text-blue-700 dark:text-blue-400 mb-1\">Problem 4: Window Comparison with $m = 3$</h4>\n        <p class=\"text-xs text-gray-700 dark:text-gray-300\"><strong>Question:</strong> If $m = 3$ bits, compare the maximum sender and receiver window sizes for Go-Back-N ARQ and Selective Repeat ARQ.</p>\n        <div class=\"mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded font-mono text-xs text-gray-800 dark:text-gray-200\">\n          <p>For Go-Back-N: $W_s = 2^3 - 1 = 7$, $W_r = 1$.</p>\n          <p>For Selective Repeat: $W_s = 2^{3-1} = 4$, $W_r = 2^{3-1} = 4$.</p>\n          <table class=\"wiki-table mt-2\">\n            <thead><tr><th>Protocol</th><th>Sender Window ($W_s$)</th><th>Receiver Window ($W_r$)</th></tr></thead>\n            <tbody>\n              <tr><td>Go-Back-N ARQ</td><td>7</td><td>1</td></tr>\n              <tr><td>Selective Repeat ARQ</td><td>4</td><td>4</td></tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n\n      <!-- Problem 5 -->\n      <div class=\"p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-200 dark:border-blue-900 shadow-sm\">\n        <h4 class=\"font-bold text-sm text-blue-700 dark:text-blue-400 mb-1\">Problem 5: Master ARQ Comparison ($m = 5$)</h4>\n        <p class=\"text-xs text-gray-700 dark:text-gray-300\"><strong>Question:</strong> A communication link uses a 5-bit sequence number ($m = 5$). Determine the sender and receiver window sizes across Stop-and-Wait ARQ, Go-Back-N ARQ, and Selective Repeat ARQ.</p>\n        <div class=\"mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded font-mono text-xs text-gray-800 dark:text-gray-200\">\n          <p>Total sequence numbers available: $2^5 = 32$ (numbered 0 to 31).</p>\n          <p>• <strong>Stop-and-Wait ARQ:</strong> $W_s = 1$, $W_r = 1$.</p>\n          <p>• <strong>Go-Back-N ARQ:</strong> $W_s = 2^5 - 1 = 31$, $W_r = 1$.</p>\n          <p>• <strong>Selective Repeat ARQ:</strong> $W_s = 2^{5-1} = 16$, $W_r = 2^{5-1} = 16$.</p>\n        </div>\n      </div>\n    </div>\n  ",
      "eli10": "In simple words: Step-by-step solved numerical problems on CSMA/CD minimum frame size, sliding window utilization, and ALOHA throughput.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Numerical Problems & Solutions for Unit 2?<br><br><strong>Answer:</strong> Features fully worked solutions for: (1) Minimum frame size in CSMA/CD: L_min = 2 * RTT * Bandwidth, (2) Sliding window efficiency: eta = N / (1 + 2a), (3) Pure & Slotted ALOHA maximum throughput and offered load, (4) Bit stuffing output string calculation, and (5) CRC division and codeword generation.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Numerical Problems & Solutions for Unit 2?",
          "options": [
            "Features fully worked solutions for: (1) Minimum frame size ...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Features fully worked solutions for: (1) Minimum frame size in CSMA/CD: L_min = 2 * RTT * Bandwidth, (2) Sliding window efficiency: eta = N / (1 + 2a), (3) Pure & Slotted ALOHA maximum throughput and offered load, (4) Bit stuffing output string calculation, and (5) CRC division and codeword generation."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Carrier_Sense_Multiple_Access_with_Collision_Detection.png",
      "imageCaption": "Figure: Mathematical & Formula Architecture: Throughput, Efficiency, Slot Time, and Vulnerable Period Calculations."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Carrier_Sense_Multiple_Access_with_Collision_Detection.png",
    "imageCaption": "Figure: Mathematical & Formula Architecture: Throughput, Efficiency, Slot Time, and Vulnerable Period Calculations."
  },
  "u2-protocol-examples": {
    "id": "u2-protocol-examples",
    "title": "Step-by-Step Protocol Examples",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Protocol Execution Traces",
    "oneLiner": "Detailed execution traces showing frame exchanges, timers, lost frame recovery, and sliding window advances.",
    "quickAnswer": "Detailed traces of: (1) Byte stuffing with FLAG and ESC, (2) HDLC bit stuffing on data 01111110, (3) Stop-and-Wait ARQ lost frame recovery, (4) Go-Back-N discarding out-of-order frames after lost ACK, (5) Selective Repeat selective retransmission and buffering, and (6) Transparent bridge table building across 4 segments.",
    "whyItMatters": "Walking through protocol traces builds intuitive mastery of state machines and edge cases.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>Visual chronological traces documenting exact sender and receiver state transitions during packet exchange and error recovery.</p>",
      "eli10": "In simple words: Detailed execution traces showing frame exchanges, timers, lost frame recovery, and sliding window advances.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Step-by-Step Protocol Examples?<br><br><strong>Answer:</strong> Detailed traces of: (1) Byte stuffing with FLAG and ESC, (2) HDLC bit stuffing on data 01111110, (3) Stop-and-Wait ARQ lost frame recovery, (4) Go-Back-N discarding out-of-order frames after lost ACK, (5) Selective Repeat selective retransmission and buffering, and (6) Transparent bridge table building across 4 segments.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Step-by-Step Protocol Examples?",
          "options": [
            "Detailed traces of: (1) Byte stuffing with FLAG and ESC, (2)...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Detailed traces of: (1) Byte stuffing with FLAG and ESC, (2) HDLC bit stuffing on data 01111110, (3) Stop-and-Wait ARQ lost frame recovery, (4) Go-Back-N discarding out-of-order frames after lost ACK, (5) Selective Repeat selective retransmission and buffering, and (6) Transparent bridge table building across 4 segments."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/df/Selective_repeat_space-time_diagram.png",
      "imageCaption": "Figure: Step-by-Step Protocol Sequence Traces and Frame Transmission Exchanges."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/df/Selective_repeat_space-time_diagram.png",
    "imageCaption": "Figure: Step-by-Step Protocol Sequence Traces and Frame Transmission Exchanges."
  },
  "u2-short-answer-questions": {
    "id": "u2-short-answer-questions",
    "title": "Short-Answer Questions (PDF Section 10)",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Beginner",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "University Exam Questions",
    "oneLiner": "The 12 short-answer questions straight from syllabus PDF Section 10 with concise model answers.",
    "quickAnswer": "Covers: 1. What is the Data Link Layer? 2. Position in OSI model? 3. Define framing. 4. What is a frame? 5. What is flow control? 6. What is error control? 7. Define byte stuffing. 8. Define bit stuffing. 9. What is ARQ? 10. What is a MAC address? 11. What is a buffer? 12. What is an acknowledgement?",
    "whyItMatters": "Direct answers to the exact questions listed in syllabus notes Section 10.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "\n    <p>Comprehensive repository of 15 university exam short-answer questions with concise model answers covering Data Link Layer protocols, flow control, and error recovery.</p>\n    <div class=\"space-y-4 my-6\">\n      <div class=\"p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700\">\n        <p class=\"font-bold text-xs text-gfg-green\">Q1. What is a Data Link Layer protocol?</p>\n        <p class=\"text-xs text-gray-700 dark:text-gray-300 mt-1\">A set of formal rules governing how data frames are transmitted, verified, and managed between two directly connected stations across a physical medium.</p>\n      </div>\n      <div class=\"p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700\">\n        <p class=\"font-bold text-xs text-gfg-green\">Q2. What is a noiseless channel?</p>\n        <p class=\"text-xs text-gray-700 dark:text-gray-300 mt-1\">An idealized theoretical communication channel in which frames are never damaged, corrupted, lost, or duplicated during transit.</p>\n      </div>\n      <div class=\"p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700\">\n        <p class=\"font-bold text-xs text-gfg-green\">Q3. What is a noisy channel?</p>\n        <p class=\"text-xs text-gray-700 dark:text-gray-300 mt-1\">A realistic physical communication channel subject to thermal noise, attenuation, and interference where frames and ACKs can be corrupted, lost, or delayed.</p>\n      </div>\n      <div class=\"p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700\">\n        <p class=\"font-bold text-xs text-gfg-green\">Q4. What is the Simplest Protocol?</p>\n        <p class=\"text-xs text-gray-700 dark:text-gray-300 mt-1\">An elementary unidirectional protocol for noiseless channels that provides neither flow control nor error control, assuming the receiver has infinite processing capacity.</p>\n      </div>\n      <div class=\"p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700\">\n        <p class=\"font-bold text-xs text-gfg-green\">Q5. What is the Stop-and-Wait Protocol?</p>\n        <p class=\"text-xs text-gray-700 dark:text-gray-300 mt-1\">A noiseless channel protocol where the sender transmits one frame and halts until an explicit acknowledgement (ACK) arrives, preventing receiver buffer overflow.</p>\n      </div>\n      <div class=\"p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700\">\n        <p class=\"font-bold text-xs text-gfg-green\">Q6. What does ARQ stand for and what is its purpose?</p>\n        <p class=\"text-xs text-gray-700 dark:text-gray-300 mt-1\">Automatic Repeat reQuest. It is an error-control mechanism that uses acknowledgements, sequence numbers, and retransmission timers to automatically resend lost or corrupted frames.</p>\n      </div>\n      <div class=\"p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700\">\n        <p class=\"font-bold text-xs text-gfg-green\">Q7. What is an Acknowledgement (ACK)?</p>\n        <p class=\"text-xs text-gray-700 dark:text-gray-300 mt-1\">A control frame dispatched by the receiver informing the sender that a data frame was received correctly or indicating the sequence number of the next frame expected.</p>\n      </div>\n      <div class=\"p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700\">\n        <p class=\"font-bold text-xs text-gfg-green\">Q8. What is a Negative Acknowledgement (NAK)?</p>\n        <p class=\"text-xs text-gray-700 dark:text-gray-300 mt-1\">A control frame sent by the receiver explicitly requesting the immediate retransmission of a specific missing or damaged frame without waiting for timer timeout.</p>\n      </div>\n      <div class=\"p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700\">\n        <p class=\"font-bold text-xs text-gfg-green\">Q9. Why are sequence numbers necessary in Stop-and-Wait ARQ?</p>\n        <p class=\"text-xs text-gray-700 dark:text-gray-300 mt-1\">To enable the receiver to recognize and safely discard duplicate frames resulting from lost or delayed acknowledgements.</p>\n      </div>\n      <div class=\"p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700\">\n        <p class=\"font-bold text-xs text-gfg-green\">Q10. What is pipelining in data communication?</p>\n        <p class=\"text-xs text-gray-700 dark:text-gray-300 mt-1\">The technique of transmitting multiple data frames before waiting for an acknowledgement, keeping the transmission channel full and maximizing throughput.</p>\n      </div>\n      <div class=\"p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700\">\n        <p class=\"font-bold text-xs text-gfg-green\">Q11. What is the sender window size in Go-Back-N ARQ?</p>\n        <p class=\"text-xs text-gray-700 dark:text-gray-300 mt-1\">$W_s = 2^m - 1$, where $m$ is the number of bits in the sequence number field.</p>\n      </div>\n      <div class=\"p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700\">\n        <p class=\"font-bold text-xs text-gfg-green\">Q12. What is the receiver window size in Go-Back-N ARQ?</p>\n        <p class=\"text-xs text-gray-700 dark:text-gray-300 mt-1\">$W_r = 1$. The receiver only ever accepts the single next-expected in-order frame.</p>\n      </div>\n      <div class=\"p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700\">\n        <p class=\"font-bold text-xs text-gfg-green\">Q13. What is the window size in Selective Repeat ARQ?</p>\n        <p class=\"text-xs text-gray-700 dark:text-gray-300 mt-1\">$W_s = W_r = 2^{m-1}$ (half of the total sequence number space).</p>\n      </div>\n      <div class=\"p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700\">\n        <p class=\"font-bold text-xs text-gfg-green\">Q14. What is a Cumulative Acknowledgement?</p>\n        <p class=\"text-xs text-gray-700 dark:text-gray-300 mt-1\">An ACK containing number $n$ that simultaneously confirms successful receipt of all frames up to sequence number $n-1$.</p>\n      </div>\n      <div class=\"p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700\">\n        <p class=\"font-bold text-xs text-gfg-green\">Q15. What is Piggybacking?</p>\n        <p class=\"text-xs text-gray-700 dark:text-gray-300 mt-1\">The technique of attaching acknowledgement numbers into the header of outgoing reverse data frames, conserving bandwidth and eliminating separate ACK frames.</p>\n      </div>\n    </div>\n  ",
      "eli10": "In simple words: The 12 short-answer questions straight from syllabus PDF Section 10 with concise model answers.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Short-Answer Questions (PDF Section 10)?<br><br><strong>Answer:</strong> Covers: 1. What is the Data Link Layer? 2. Position in OSI model? 3. Define framing. 4. What is a frame? 5. What is flow control? 6. What is error control? 7. Define byte stuffing. 8. Define bit stuffing. 9. What is ARQ? 10. What is a MAC address? 11. What is a buffer? 12. What is an acknowledgement?",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Short-Answer Questions (PDF Section 10)?",
          "options": [
            "Covers: 1. What is the Data Link Layer? 2. Position in OSI m...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Covers: 1. What is the Data Link Layer? 2. Position in OSI model? 3. Define framing. 4. What is a frame? 5. What is flow control? 6. What is error control? 7. Define byte stuffing. 8. Define bit stuffing. 9. What is ARQ? 10. What is a MAC address? 11. What is a buffer? 12. What is an acknowledgement?"
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg",
      "imageCaption": "Figure: Rapid Review Guide for Data Link Layer Exam Definitions and Concepts."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg",
    "imageCaption": "Figure: Rapid Review Guide for Data Link Layer Exam Definitions and Concepts."
  },
  "u2-long-answer-questions": {
    "id": "u2-long-answer-questions",
    "title": "Long-Answer Questions (PDF Section 10)",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "University Exam Questions",
    "oneLiner": "The 8 major essay questions from PDF Section 10 with structured headings and diagrams.",
    "quickAnswer": "Comprehensive answers to: 1. Functions and responsibilities of DLL. 2. Major design issues of DLL. 3. Three services provided to Network Layer. 4. Four framing methods with examples. 5. Flow control and its importance. 6. Error control and role of ARQ. 7. Differentiate flow control and error control. 8. Compare four framing methods.",
    "whyItMatters": "Model long-form answers providing structured outlines, bullet points, and tables to score maximum marks.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>Structured long-form answers for the 8 core examination essay questions specified in PDF Section 10.</p>",
      "eli10": "In simple words: The 8 major essay questions from PDF Section 10 with structured headings and diagrams.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Long-Answer Questions (PDF Section 10)?<br><br><strong>Answer:</strong> Comprehensive answers to: 1. Functions and responsibilities of DLL. 2. Major design issues of DLL. 3. Three services provided to Network Layer. 4. Four framing methods with examples. 5. Flow control and its importance. 6. Error control and role of ARQ. 7. Differentiate flow control and error control. 8. Compare four framing methods.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Long-Answer Questions (PDF Section 10)?",
          "options": [
            "Comprehensive answers to: 1. Functions and responsibilities ...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Comprehensive answers to: 1. Functions and responsibilities of DLL. 2. Major design issues of DLL. 3. Three services provided to Network Layer. 4. Four framing methods with examples. 5. Flow control and its importance. 6. Error control and role of ARQ. 7. Differentiate flow control and error control. 8. Compare four framing methods."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/13/Ethernet_Type_II_Frame_format.svg",
      "imageCaption": "Figure: Comprehensive Exam Solutions Guide for 10-Mark and 15-Mark University Questions."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/13/Ethernet_Type_II_Frame_format.svg",
    "imageCaption": "Figure: Comprehensive Exam Solutions Guide for 10-Mark and 15-Mark University Questions."
  },
  "u2-important-exam-questions": {
    "id": "u2-important-exam-questions",
    "title": "Important Exam Questions for Unit 2",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Anna Univ / VTU / JNTU / GATE Question Bank",
    "oneLiner": "High-yield recurring university examination questions with marking schemes and key points.",
    "quickAnswer": "Curated question bank categorized by marks (2 marks, 8 marks, 16 marks) covering DLL design issues, CRC calculation, sliding window protocols, CSMA/CD, Ethernet frame format, 802.11 RTS/CTS, and transparent bridges.",
    "whyItMatters": "Focuses revision on the exact questions that appear repeatedly across university examinations.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>Categorized question bank of past university exam questions with tips on how to structure answers for maximum points.</p>",
      "eli10": "In simple words: High-yield recurring university examination questions with marking schemes and key points.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Important Exam Questions for Unit 2?<br><br><strong>Answer:</strong> Curated question bank categorized by marks (2 marks, 8 marks, 16 marks) covering DLL design issues, CRC calculation, sliding window protocols, CSMA/CD, Ethernet frame format, 802.11 RTS/CTS, and transparent bridges.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Important Exam Questions for Unit 2?",
          "options": [
            "Curated question bank categorized by marks (2 marks, 8 marks...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Curated question bank categorized by marks (2 marks, 8 marks, 16 marks) covering DLL design issues, CRC calculation, sliding window protocols, CSMA/CD, Ethernet frame format, 802.11 RTS/CTS, and transparent bridges."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Spanning_tree_protocol_at_work_1.svg",
      "imageCaption": "Figure: High-Frequency University Exam Problem Sets and Analysis."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Spanning_tree_protocol_at_work_1.svg",
    "imageCaption": "Figure: High-Frequency University Exam Problem Sets and Analysis."
  },
  "u2-mcqs": {
    "id": "u2-mcqs",
    "title": "Multiple-Choice Questions (MCQs - PDF Section 10)",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Intermediate",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "PDF Section 10 Practice MCQs",
    "oneLiner": "Interactive 8-question knowledge check from syllabus PDF Section 10 plus extended competitive MCQs.",
    "quickAnswer": "Includes the 8 official MCQs from syllabus notes: 1. Layer responsible for framing? (DLL), 2. Data unit of DLL? (Frame), 3. Method inserting extra 0 after five 1s? (Bit stuffing), 4. Mechanism preventing receiver overload? (Flow control), 5. What ARQ stands for? (Automatic Repeat Request), 6. Service without ACKs? (Unacknowledged connectionless), 7. Part containing error detection? (Trailer), 8. What is a buffer? (Temporary memory area).",
    "whyItMatters": "Direct verification against the self-assessment test in the student's study material.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>Interactive quiz implementing the exact questions from PDF Section 10 with immediate validation and explanations.</p>",
      "eli10": "In simple words: Interactive 8-question knowledge check from syllabus PDF Section 10 plus extended competitive MCQs.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Multiple-Choice Questions (MCQs - PDF Section 10)?<br><br><strong>Answer:</strong> Includes the 8 official MCQs from syllabus notes: 1. Layer responsible for framing? (DLL), 2. Data unit of DLL? (Frame), 3. Method inserting extra 0 after five 1s? (Bit stuffing), 4. Mechanism preventing receiver overload? (Flow control), 5. What ARQ stands for? (Automatic Repeat Request), 6. Service without ACKs? (Unacknowledged connectionless), 7. Part containing error detection? (Trailer), 8. What is a buffer? (Temporary memory area).",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "Which protocol does not use flow control or error control?",
          "options": [
            "Simplest Protocol",
            "Stop-and-Wait Protocol",
            "Stop-and-Wait ARQ",
            "Go-Back-N ARQ"
          ],
          "correct": 0,
          "explanation": "The Simplest Protocol operates under the assumption of an ideal noiseless channel and infinite receiver capacity, using neither flow control nor error control."
        },
        {
          "question": "In the Stop-and-Wait Protocol (noiseless), the sender waits for an ACK before sending the next frame. What is the main purpose of this ACK?",
          "options": [
            "Flow control",
            "Error detection",
            "Error correction",
            "Routing"
          ],
          "correct": 0,
          "explanation": "In the noiseless Stop-and-Wait protocol, the ACK serves exclusively for flow control, pacing the sender to prevent receiver buffer overflow."
        },
        {
          "question": "In Stop-and-Wait ARQ, how many sequence numbers are used?",
          "options": [
            "2 (0 and 1)",
            "1",
            "4",
            "8"
          ],
          "correct": 0,
          "explanation": "Stop-and-Wait ARQ uses a 1-bit sequence number alternating between 0 and 1 ($2^1 = 2$ sequence numbers)."
        },
        {
          "question": "If a 3-bit sequence number is used in Go-Back-N ARQ, what is the maximum sender window size?",
          "options": [
            "7",
            "8",
            "4",
            "3"
          ],
          "correct": 0,
          "explanation": "$W_s = 2^m - 1 = 2^3 - 1 = 7$."
        },
        {
          "question": "If a 3-bit sequence number is used in Selective Repeat ARQ, what is the maximum sender window size?",
          "options": [
            "4",
            "7",
            "8",
            "3"
          ],
          "correct": 0,
          "explanation": "$W_s = 2^{m-1} = 2^{3-1} = 2^2 = 4$."
        },
        {
          "question": "In Go-Back-N ARQ, what is the receiver window size?",
          "options": [
            "1",
            "Equal to the sender window size",
            "$2^m - 1$",
            "$2^{m-1}$"
          ],
          "correct": 0,
          "explanation": "In Go-Back-N ARQ, the receiver window size is strictly 1, accepting only the single next in-order frame."
        },
        {
          "question": "Which protocol retransmits ONLY the missing or damaged frame?",
          "options": [
            "Selective Repeat ARQ",
            "Simplest Protocol",
            "Stop-and-Wait Protocol",
            "Go-Back-N ARQ"
          ],
          "correct": 0,
          "explanation": "Selective Repeat ARQ uses receiver buffering and selective retransmission to resend only the damaged or lost frame."
        },
        {
          "question": "What happens in Go-Back-N ARQ when Frame 2 is lost and Frames 3 and 4 arrive at the receiver?",
          "options": [
            "The receiver discards Frames 3 and 4 and waits for Frame 2",
            "The receiver accepts and buffers Frames 3 and 4",
            "The receiver requests only Frame 2 and delivers Frames 3 and 4 to the Network Layer",
            "The sender window size is doubled"
          ],
          "correct": 0,
          "explanation": "Because $W_r = 1$, the receiver in Go-Back-N rejects all out-of-order frames, discarding Frames 3 and 4 and re-sending ACK 2."
        },
        {
          "question": "What is piggybacking?",
          "options": [
            "Attaching an ACK to an outgoing data frame",
            "Sending two frames in one packet",
            "Retransmitting frames multiple times",
            "Using two communication channels at once"
          ],
          "correct": 0,
          "explanation": "Piggybacking is the technique of combining acknowledgement feedback with reverse outgoing data frames."
        },
        {
          "question": "In Go-Back-N ARQ, what does ACK 4 mean?",
          "options": [
            "Frames 0, 1, 2, and 3 have been received; receiver is waiting for Frame 4",
            "Frame 4 has been received correctly",
            "Only Frame 4 has been lost",
            "Frame 4 should be retransmitted immediately"
          ],
          "correct": 0,
          "explanation": "Cumulative ACK $n$ acknowledges all frames up to $n-1$. Therefore, ACK 4 confirms that Frames 0, 1, 2, and 3 have been accepted and the receiver expects Frame 4."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/53/802.11_MAC_Frame.svg",
      "imageCaption": "Figure: Practice Assessment Question Pool with Conceptual Verifications."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/53/802.11_MAC_Frame.svg",
    "imageCaption": "Figure: Practice Assessment Question Pool with Conceptual Verifications."
  },
  "u2-practice-test": {
    "id": "u2-practice-test",
    "title": "Unit 2 Comprehensive Practice Test",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "level": "Advanced",
    "category": "datalink",
    "difficulty": "Core",
    "readingTime": "15–20 min",
    "standard": "Semester Final Exam Simulation",
    "oneLiner": "Full 25-question comprehensive assessment covering all 11 topics of Unit 2 with timer and score report.",
    "quickAnswer": "Interactive timed exam simulation containing 25 balanced questions across DLL Fundamentals, Protocols, MAC Sublayer, Multiple Access, Collision-Free Protocols, Ethernet, Wireless LAN, 802.11, Switching, and Devices.",
    "whyItMatters": "Final readiness check to test comprehensive retention and exam timing before university finals.",
    "prerequisitesList": [
      {
        "concept": "OSI Layer 2",
        "meaning": "Data Link Layer framing and link control"
      },
      {
        "concept": "Node-to-Node Delivery",
        "meaning": "Transfer of frames across a single physical link"
      }
    ],
    "learningObjectives": [
      "Understand the theoretical foundations and protocol mechanisms.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802 / ISO 7498-1",
      "type": "Core Protocol Concept",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "framing",
        "mac-address",
        "error-detection"
      ],
      "compareWith": [],
      "primaryUses": [
        "Local Area Networks, Ethernet, Wi-Fi, Link Control"
      ]
    },
    "sections": {
      "overview": "<p>A comprehensive 25-question final practice examination covering all 11 topics of Unit 2: Data Link Layer.</p>",
      "eli10": "In simple words: Full 25-question comprehensive assessment covering all 11 topics of Unit 2 with timer and score report.",
      "analogy": "Think of this mechanism as an essential traffic rule ensuring data moves across physical wires without errors or collisions.",
      "diagram": "",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What is the core principle of Unit 2 Comprehensive Practice Test?<br><br><strong>Answer:</strong> Interactive timed exam simulation containing 25 balanced questions across DLL Fundamentals, Protocols, MAC Sublayer, Multiple Access, Collision-Free Protocols, Ethernet, Wireless LAN, 802.11, Switching, and Devices.",
        "level2": "<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.",
        "level3": "<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine."
      },
      "advantagesLimitations": "\n        <table class=\"wiki-table\">\n          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>\n          <tbody>\n            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>\n            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>\n          </tbody>\n        </table>",
      "whereUsed": [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      "quiz": [
        {
          "question": "What is the primary function of Unit 2 Comprehensive Practice Test?",
          "options": [
            "Interactive timed exam simulation containing 25 balanced que...",
            "Routing packets across the global Internet",
            "Resolving domain names to IP addresses",
            "Encrypting application payloads"
          ],
          "correct": 0,
          "explanation": "The primary role is: Interactive timed exam simulation containing 25 balanced questions across DLL Fundamentals, Protocols, MAC Sublayer, Multiple Access, Collision-Free Protocols, Ethernet, Wireless LAN, 802.11, Switching, and Devices."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.",
          "url": ""
        },
        {
          "cite": "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.",
          "url": ""
        }
      ],
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg",
      "imageCaption": "Figure: Timed Diagnostic Mastery Assessment for Unit 2 Data Link Layer."
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg",
    "imageCaption": "Figure: Timed Diagnostic Mastery Assessment for Unit 2 Data Link Layer."
  },
  "simplex-protocol": {
    "id": "simplex-protocol",
    "title": "Simplest Protocol",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "topicNumber": 2,
    "subtopicNumber": 3,
    "whyItMatters": "The Simplest Protocol serves as the absolute conceptual baseline of Data Link Layer communication, illustrating the minimal mechanisms needed to move frames when the channel is perfect and the receiver has infinite processing capacity.",
    "prerequisitesList": [
      {
        "concept": "u2-protocol-classification",
        "meaning": "Noiseless vs noisy channel assumptions"
      },
      {
        "concept": "Frame Encapsulation",
        "meaning": "Adding headers and trailers to Network Layer packets"
      }
    ],
    "learningObjectives": [
      "Define the Simplest Protocol and enumerate its 7 fundamental characteristics.",
      "Trace the 7-step operational procedure executed at the sender and receiver.",
      "Understand why receiver buffer overrun and transmission errors cause complete failure in this protocol.",
      "Evaluate the advantages and severe real-world limitations of unconstrained transmission."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "Forouzan Chapter 11.4 (Elementary Protocol 1)",
      "type": "Unidirectional Noiseless Protocol",
      "prerequisites": [
        "u2-dll-protocols-intro",
        "u2-protocol-classification"
      ],
      "relatedConcepts": [
        "stop-and-wait-noiseless",
        "flow-control",
        "framing"
      ],
      "compareWith": [
        "stop-and-wait-noiseless"
      ],
      "primaryUses": [
        "Theoretical baseline modeling, internal chip-to-chip FIFO buses"
      ]
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/76/Stop_and_wait_arq.png",
    "imageCaption": "Figure: Elementary Transmission Model without Acknowledgement Feedback (Behrouz A. Forouzan).",
    "sections": {
      "overview": "\n      <p>The <strong>Simplest Protocol</strong> (often called the <em>Utopian Simplex Protocol</em>) is the most basic Data Link Layer protocol possible. It provides unidirectional data frame transmission from a sender to a receiver over an ideal, noiseless communication channel without employing flow control or error control.</p>\n      <p>According to <em>Forouzan (Section 11.4.1)</em>, the protocol assumes that the receiving station has unlimited buffer storage capacity and infinite processing speed. As a result, the receiver is always instantly ready to accept incoming frames, and the sender can transmit at maximum link speed without ever checking on the receiver.</p>\n      \n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mt-4 mb-2\">The 7 Core Characteristics of the Simplest Protocol</h3>\n      <ul class=\"wiki-bullet-list\">\n        <li><strong>No Flow Control:</strong> The sender transmits at full physical wire speed; no rate throttling exists.</li>\n        <li><strong>No Error Control:</strong> Assumes zero bit errors, zero electrical noise, and zero packet drops.</li>\n        <li><strong>No Acknowledgements:</strong> The receiver never dispatches feedback or confirmation signals back to the sender.</li>\n        <li><strong>No Sequence Numbers:</strong> Every arriving frame is assumed to be a valid, unique, in-order packet.</li>\n        <li><strong>No Retransmission Mechanisms:</strong> The sender maintains no timers, no frame buffers, and no resend logic.</li>\n        <li><strong>Strictly Unidirectional:</strong> Data frames flow exclusively from Sender &rarr; Receiver; reverse channel is completely unused.</li>\n        <li><strong>Instantaneous Processing:</strong> The receiver immediately delivers accepted packets to its local Network Layer.</li>\n      </ul>\n    ",
      "eli10": "Imagine you are throwing baseballs into an enormous open barn. You never stop to look if anyone is catching them, you don't number the balls, and nobody yells back 'I got it!'. You just keep throwing as fast as you can, assuming the barn is infinitely large and the balls never get lost.",
      "analogy": "A radio broadcast station transmitting an FM audio signal to transistor radios: the radio station broadcasts continuously without knowing if anyone has their radio turned on, without numbering songs, and without receiving any confirmation from listeners.",
      "howItWorks": "\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mb-2\">7-Step Operational Procedure</h3>\n      <p>The execution cycle of the Simplest Protocol proceeds in seven uninterrupted steps:</p>\n      <ol class=\"wiki-ordered-list\">\n        <li>The Network Layer at the sender generates a packet and passes it to the Data Link Layer.</li>\n        <li>The sender's Data Link Layer encapsulates the packet into a frame by adding header and trailer delimiters.</li>\n        <li>The sender transmits the frame through the Physical Layer onto the communication medium.</li>\n        <li>The receiver's Physical Layer captures the incoming signal and passes the frame to its Data Link Layer.</li>\n        <li>The receiver's Data Link Layer extracts the network packet from the frame.</li>\n        <li>The receiver delivers the packet immediately to its local Network Layer.</li>\n        <li>The sender immediately accepts the next packet from its Network Layer and repeats the process without waiting.</li>\n      </ol>\n\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mt-4 mb-2\">Step-by-Step Transmission Trace</h3>\n      <div class=\"p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-mono space-y-1\">\n        <p class=\"text-blue-600 dark:text-blue-400 font-bold\">Sender &rarr; Receiver Event Sequence:</p>\n        <p>[t = 0] Sender creates Frame 0 &rarr; transmits on link</p>\n        <p>[t = 1] Receiver receives Frame 0 &rarr; extracts packet &rarr; delivers to Layer 3</p>\n        <p>[t = 2] Sender creates Frame 1 &rarr; transmits immediately (No ACK wait)</p>\n        <p>[t = 3] Receiver receives Frame 1 &rarr; extracts packet &rarr; delivers to Layer 3</p>\n        <p>[t = 4] Sender creates Frame 2 &rarr; transmits immediately</p>\n        <p class=\"text-emerald-600 dark:text-emerald-400 font-bold\">&rarr; Continuous frame transmission with zero handshaking overhead.</p>\n      </div>\n    ",
      "diagram": "",
      "technicalDetails": "\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mb-2\">Algorithmic Pseudo-code (Forouzan Model)</h3>\n      <div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n        <div class=\"p-3 rounded-lg bg-gray-900 text-gray-100 font-mono text-xs\">\n          <div class=\"text-emerald-400 font-bold mb-1\">// Sender Algorithm</div>\n          <div>while (true) {</div>\n          <div class=\"pl-4\">waitForEvent();</div>\n          <div class=\"pl-4\">getDataFromNetworkLayer(packet);</div>\n          <div class=\"pl-4\">makeFrame(frame, packet);</div>\n          <div class=\"pl-4\">sendFrame(frame);</div>\n          <div>}</div>\n        </div>\n        <div class=\"p-3 rounded-lg bg-gray-900 text-gray-100 font-mono text-xs\">\n          <div class=\"text-blue-400 font-bold mb-1\">// Receiver Algorithm</div>\n          <div>while (true) {</div>\n          <div class=\"pl-4\">waitForEvent();</div>\n          <div class=\"pl-4\">receiveFrame(frame);</div>\n          <div class=\"pl-4\">extractData(packet, frame);</div>\n          <div class=\"pl-4\">deliverDataToNetworkLayer(packet);</div>\n          <div>}</div>\n        </div>\n      </div>\n      <p class=\"text-xs text-gray-500 mt-2\">Notice that neither algorithm contains conditional branches (<code>if/else</code>), sequence variables, or timeout handlers. Both are pure infinite loops.</p>\n    ",
      "workedExamples": {
        "level1": "<strong>Question:</strong> State two real-world assumptions that make the Simplest Protocol impractical for real computer networks.<br><br><strong>Answer:</strong> 1. It assumes the channel is completely noiseless (zero bit flips or dropped frames). In reality, noise and attenuation are omnipresent. 2. It assumes the receiver can process incoming frames infinitely fast with unlimited buffer space. In reality, a fast sender will overwhelm a slower receiver's buffer, resulting in massive frame drops.",
        "level2": "<strong>Problem:</strong> A sender using the Simplest Protocol transmits 1000-byte frames over a 10 Mbps point-to-point link. The propagation delay is 10 ms. What is the theoretical maximum throughput?<br><br><strong>Answer:</strong> Since there is zero waiting time for acknowledgements, the sender transmits frames continuously back-to-back. Transmission time per frame $t_{\\text{tx}} = \\frac{1000 \\times 8}{10 \\times 10^6} = 0.8\\text{ ms}$. Throughput = 10 Mbps (100% link utilization), assuming zero errors.",
        "level3": "<strong>Edge Case Analysis:</strong> What happens in the Simplest Protocol if the receiver's CPU takes 5 ms to process a frame, but the sender injects frames every 1 ms?<br><br><strong>Answer:</strong> The sender generates frames 5 times faster than the receiver can extract and deliver them. The receiver's input queue will fill within milliseconds. Once the buffer is full, every subsequent incoming frame is silently dropped at the physical network interface. The sender never realizes data is being lost, resulting in total communication breakdown."
      },
      "advantagesLimitations": "\n      <table class=\"wiki-table\">\n        <thead>\n          <tr>\n            <th>Dimension</th>\n            <th>5 Key Advantages</th>\n            <th>5 Critical Disadvantages / Failures</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><strong>Simplicity</strong></td>\n            <td>Easiest protocol to implement in hardware.</td>\n            <td>Cannot detect or recover from transmission errors.</td>\n          </tr>\n          <tr>\n            <td><strong>Overhead</strong></td>\n            <td>Zero bandwidth wasted on ACK/NAK packets.</td>\n            <td>No sequence numbers to detect dropped frames.</td>\n          </tr>\n          <tr>\n            <td><strong>Processing</strong></td>\n            <td>Zero state tracking, zero timer management.</td>\n            <td>Vulnerable to receiver buffer overflow (flooding).</td>\n          </tr>\n          <tr>\n            <td><strong>Channel Utilization</strong></td>\n            <td>100% channel capacity dedicated to data payload.</td>\n            <td>Completely unusable on realistic physical networks.</td>\n          </tr>\n          <tr>\n            <td><strong>Memory Footprint</strong></td>\n            <td>Sender requires no retransmission buffer.</td>\n            <td>No flow regulation between asymmetric hardware devices.</td>\n          </tr>\n        </tbody>\n      </table>\n    ",
      "whereUsed": [
        "Internal hardware bus communications with guaranteed synchronous clocking.",
        "Dedicated point-to-point fiber interconnects with dedicated hardware FIFOs.",
        "Academic instructional baseline for computer networking curriculum."
      ],
      "quiz": [
        {
          "question": "Why does the Simplest Protocol NOT need a retransmission timer?",
          "options": [
            "Because it assumes an ideal noiseless channel where frames can never be lost or damaged",
            "Because timers are only used at the Transport Layer",
            "Because the receiver immediately sends a NAK if a frame is missing",
            "Because the frame header contains an automatic hardware recovery code"
          ],
          "correct": 0,
          "explanation": "The Simplest Protocol operates under the fundamental assumption of an ideal noiseless channel where frames are never lost, damaged, or delayed, making timers and retransmissions redundant."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Section 11.4.1.",
          "url": ""
        }
      ]
    }
  },
  "stop-and-wait": {
    "id": "stop-and-wait",
    "title": "Stop-and-Wait ARQ",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "topicNumber": 2,
    "subtopicNumber": 5,
    "whyItMatters": "Stop-and-Wait ARQ is the foundational error-control protocol for realistic noisy channels. It integrates sequence numbers, acknowledgements, and retransmission timers to guarantee reliable, in-order delivery without duplicates.",
    "prerequisitesList": [
      {
        "concept": "stop-and-wait-noiseless",
        "meaning": "1-frame flow control handshake"
      },
      {
        "concept": "Error Detection (CRC)",
        "meaning": "Using checksums/FCS to identify corrupted bits"
      },
      {
        "concept": "ARQ Concepts",
        "meaning": "Automatic Repeat reQuest using timers and retransmission"
      }
    ],
    "learningObjectives": [
      "Define Automatic Repeat reQuest (ARQ) and explain the role of timers and sequence numbers.",
      "Explain why a 1-bit sequence number (0 and 1, modulo 2) is strictly sufficient for Stop-and-Wait ARQ.",
      "Trace protocol recovery under Case 1 (Lost Frame), Case 2 (Lost ACK), and Case 3 (Delayed ACK).",
      "Calculate protocol throughput and channel efficiency using $\\eta = \\frac{1}{1 + 2a}$."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "Forouzan Chapter 11.5 / ISO HDLC / ITU-T V.42",
      "type": "Error & Flow Control Protocol (Noisy Channels)",
      "prerequisites": [
        "stop-and-wait-noiseless",
        "error-detection"
      ],
      "relatedConcepts": [
        "go-back-n",
        "selective-repeat",
        "flow-control",
        "crc"
      ],
      "compareWith": [
        "stop-and-wait-noiseless",
        "go-back-n",
        "selective-repeat"
      ],
      "primaryUses": [
        "TFTP (Trivial File Transfer Protocol), Bluetooth basic rate, deep-space telemetry"
      ]
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/76/Stop_and_wait_arq.png",
    "imageCaption": "Figure: Stop-and-Wait ARQ Normal Transmission and Retransmission on Timeout (Behrouz A. Forouzan, Chapter 11.5).",
    "sections": {
      "overview": "\n      <p><strong>Stop-and-Wait Automatic Repeat reQuest (Stop-and-Wait ARQ)</strong> is a data link layer protocol designed for <strong>noisy communication channels</strong> that provides both <strong>flow control</strong> and <strong>error control</strong>.</p>\n      <p>According to <em>Forouzan (Section 11.5.1)</em>, Stop-and-Wait ARQ enhances the basic Stop-and-Wait protocol by incorporating four critical reliability mechanisms:</p>\n      <ul class=\"wiki-bullet-list\">\n        <li><strong>Sequence Numbers:</strong> Data frames carry a 1-bit sequence number alternating between 0 and 1 ($S \\in \\{0, 1\\}$) using modulo-2 arithmetic.</li>\n        <li><strong>Acknowledgement Numbers:</strong> Control frames carry an acknowledgement number designating the <em>next expected frame</em> ($R \\in \\{0, 1\\}$). For example, ACK 1 confirms receipt of Frame 0 and announces readiness for Frame 1.</li>\n        <li><strong>Retransmission Timers:</strong> The sender starts a countdown timer immediately upon transmitting a frame. If an ACK does not arrive before the timer expires (timeout), the sender automatically retransmits the frame.</li>\n        <li><strong>Duplicate Discarding:</strong> If the receiver detects an incoming frame with a sequence number identical to the previously accepted frame, it silently discards the duplicate payload while repeating the ACK to unblock the sender.</li>\n      </ul>\n    ",
      "eli10": "Imagine you are mailing numbered envelopes (Envelope 0, then Envelope 1, then Envelope 0...) to a friend. You set a kitchen timer for 5 minutes every time you drop an envelope in the mailbox. If your friend sends back a postcard saying 'Got Envelope 0, now send 1', you turn off the timer and send Envelope 1. But if your timer dings and no postcard has arrived, you assume the mail truck crashed and you send a copy of Envelope 0 again!",
      "analogy": "Like a registered postal delivery where the delivery agent requires a signed confirmation receipt before returning to base. If the receipt is lost in transit, the post office tracks the delivery record so the recipient is never given two identical packages.",
      "howItWorks": "\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mb-2\">9-Step Operational Workflow</h3>\n      <ol class=\"wiki-ordered-list\">\n        <li>Sender fetches packet from Network Layer and sets Sequence Number $S = 0$.</li>\n        <li>Sender builds frame containing sequence number $S$ and calculates CRC trailer.</li>\n        <li>Sender starts its retransmission timer and transmits Frame $S$ across the link.</li>\n        <li>Sender pauses and waits for an incoming ACK or timeout event.</li>\n        <li>Receiver checks frame CRC. If intact and sequence matches expected number $R$ ($S == R$):\n          <ul class=\"list-disc pl-5 mt-1 space-y-0.5\">\n            <li>Receiver accepts frame and delivers packet to its Network Layer.</li>\n            <li>Receiver advances expected sequence number: $R = (R + 1) \\pmod 2$.</li>\n            <li>Receiver sends control frame $\\text{ACK } R$ back to the sender.</li>\n          </ul>\n        </li>\n        <li>Sender receives $\\text{ACK } R$. If $R == (S + 1) \\pmod 2$:\n          <ul class=\"list-disc pl-5 mt-1 space-y-0.5\">\n            <li>Sender stops and cancels the retransmission timer.</li>\n            <li>Sender updates $S = (S + 1) \\pmod 2$.</li>\n            <li>Sender fetches the next packet and repeats from Step 2.</li>\n          </ul>\n        </li>\n        <li><strong>Case 1 (Lost Data Frame):</strong> If the frame is lost or corrupted in transit, the receiver does nothing. The sender's timer expires. The sender retransmits Frame $S$, restarts the timer, and awaits ACK.</li>\n        <li><strong>Case 2 (Lost ACK / Duplicate Detection):</strong> Frame $S$ arrives safely, but the returning ACK is destroyed by channel noise. The sender's timer expires and retransmits Frame $S$. The receiver receives Frame $S$, sees $S \\neq R$ (sequence mismatch), discards the duplicate payload, and retransmits $\\text{ACK } R$ to satisfy the sender.</li>\n        <li><strong>Case 3 (Delayed ACK):</strong> An ACK is delayed past timeout. The sender retransmits, but the delayed ACK arrives later. Sequence numbering prevents the sender from getting out of sync.</li>\n      </ol>\n    ",
      "diagram": "",
      "technicalDetails": "\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mb-2\">Mathematical Performance & Efficiency Analysis</h3>\n      <p>Let:</p>\n      <ul class=\"wiki-bullet-list\">\n        <li>$t_{\\text{tx}} = \\frac{L}{B}$ be the frame transmission time ($L$ = frame length in bits, $B$ = bandwidth in bps).</li>\n        <li>$t_{\\text{prop}} = \\frac{d}{v}$ be the one-way propagation delay ($d$ = distance, $v$ = signal velocity).</li>\n        <li>$t_{\\text{ack}}$ be the transmission time of the small ACK frame (typically negligible, $\\approx 0$).</li>\n        <li>$t_{\\text{proc}}$ be the receiver processing time (typically negligible).</li>\n      </ul>\n      <p class=\"mt-2\">The total round-trip time required to transmit one frame successfully without errors is:</p>\n      <div class=\"p-3 my-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center\">\n        $$T_{\\text{total}} = t_{\\text{tx}} + 2 \\cdot t_{\\text{prop}} + t_{\\text{ack}} \\approx t_{\\text{tx}} + 2 \\cdot t_{\\text{prop}}$$\n      </div>\n      <p>The channel utilization or efficiency $\\eta$ is defined as the ratio of transmission time to total cycle time:</p>\n      <div class=\"p-3 my-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center\">\n        $$\\eta = \\frac{t_{\\text{tx}}}{t_{\\text{tx}} + 2 \\cdot t_{\\text{prop}}} = \\frac{1}{1 + 2 \\cdot \\left(\\frac{t_{\\text{prop}}}{t_{\\text{tx}}}\\right)} = \\frac{1}{1 + 2a}, \\quad \\text{where } a = \\frac{t_{\\text{prop}}}{t_{\\text{tx}}}$$\n      </div>\n      <p class=\"text-xs text-gray-600 dark:text-gray-400 mt-2\">When $a \\ll 1$ (short cable link), efficiency approaches 100%. When $a \\gg 1$ (satellite or long-distance WAN), efficiency plummets near 0%.</p>\n    ",
      "workedExamples": {
        "level1": "<strong>Question:</strong> Why are only two sequence numbers (0 and 1) required in Stop-and-Wait ARQ?<br><br><strong>Answer:</strong> In Stop-and-Wait ARQ, the sender can have at most one outstanding unacknowledged frame at any time. When a frame arrives at the receiver, the receiver only needs to distinguish between two possibilities: (1) Is this the new expected frame, or (2) Is this a retransmission of the previous frame whose ACK was lost? A single binary bit (0 or 1) toggles between these two states, making a 1-bit sequence number strictly sufficient.",
        "level2": "<strong>Problem:</strong> A satellite link has a bandwidth of 1 Mbps and a one-way propagation delay of 250 ms. If the frame size is 1000 bytes (8000 bits), calculate parameter $a$, the link efficiency $\\eta$, and the effective throughput.<br><br><strong>Answer:</strong><br>1. Transmission time: $t_{\\text{tx}} = \\frac{8000 \\text{ bits}}{10^6 \\text{ bps}} = 8\\text{ ms} = 0.008\\text{ s}$.<br>2. Parameter $a = \\frac{t_{\\text{prop}}}{t_{\\text{tx}}} = \\frac{250\\text{ ms}}{8\\text{ ms}} = 31.25$.<br>3. Efficiency: $\\eta = \\frac{1}{1 + 2a} = \\frac{1}{1 + 2(31.25)} = \\frac{1}{63.5} \\approx 0.0157 = 1.57\\%$.<br>4. Throughput: $\\text{Throughput} = \\eta \\times \\text{Bandwidth} = 0.0157 \\times 1\\text{ Mbps} \\approx 15.7\\text{ kbps}$.<br>Over 98.4% of the multi-million dollar satellite link is left empty!",
        "level3": "<strong>Edge Case Analysis:</strong> What happens if the sender's timeout duration is set shorter than the round-trip propagation time ($t_{\\text{timeout}} < 2 \\cdot t_{\\text{prop}}$)?<br><br><strong>Answer:</strong> Premature timeout occurs on every single frame. The sender will retransmit Frame 0 before the receiver's valid ACK 1 can return. The receiver will discard the duplicate and re-ACK, while the sender treats the delayed ACK 1 as an acknowledgement of the duplicate, creating an infinite cycle of spurious duplicate retransmissions that clogs the link."
      },
      "advantagesLimitations": "\n      <table class=\"wiki-table\">\n        <thead>\n          <tr>\n            <th>Aspect</th>\n            <th>Advantages</th>\n            <th>Disadvantages</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><strong>Simplicity & Buffers</strong></td>\n            <td>Requires minimal buffer space (1 frame at sender, 1 frame at receiver). Simple 1-bit logic.</td>\n            <td>Abysmal link utilization on high bandwidth-delay links ($a \\gg 1$).</td>\n          </tr>\n          <tr>\n            <td><strong>Reliability</strong></td>\n            <td>Guarantees 100% in-order delivery and eliminates all duplicate frames.</td>\n            <td>Idle channel time: the sender spends most of its time blocked waiting for ACKs.</td>\n          </tr>\n        </tbody>\n      </table>\n    ",
      "whereUsed": [
        "TFTP (Trivial File Transfer Protocol - RFC 1350) for booting network hardware.",
        "XMODEM file transfer protocol on legacy dial-up connections.",
        "Low-power wireless sensor networks (Zigbee / LoRaWAN) with constrained memory."
      ],
      "quiz": [
        {
          "question": "In Stop-and-Wait ARQ, if the sender receives ACK 0 after sending Frame 0, what does it mean?",
          "options": [
            "An error occurred: ACK 0 indicates the receiver is still expecting Frame 0 (meaning Frame 0 was lost or corrupt)",
            "Frame 0 was accepted and the sender can send Frame 1",
            "The channel has been closed by the receiver",
            "The sequence numbers need to be reset"
          ],
          "correct": 0,
          "explanation": "Stop-and-Wait ARQ uses the next-expected-frame convention. If Frame 0 was accepted, the receiver sends ACK 1. An ACK 0 indicates that the receiver is still expecting Frame 0, signaling that Frame 0 was lost or discarded."
        },
        {
          "question": "If parameter $a = t_{\\text{prop}} / t_{\\text{tx}} = 4$, what is the channel efficiency of Stop-and-Wait ARQ?",
          "options": [
            "11.1%",
            "20.0%",
            "50.0%",
            "100.0%"
          ],
          "correct": 0,
          "explanation": "$\\eta = \\frac{1}{1 + 2a} = \\frac{1}{1 + 2(4)} = \\frac{1}{9} \\approx 11.1\\%$."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Section 11.5.1.",
          "url": ""
        }
      ]
    }
  },
  "go-back-n": {
    "id": "go-back-n",
    "title": "Go-Back-N ARQ",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "topicNumber": 2,
    "subtopicNumber": 6,
    "whyItMatters": "Go-Back-N ARQ overcomes the massive idle time of Stop-and-Wait by pipelining up to N frames concurrently. It uses sliding windows and cumulative acknowledgements to maximize channel utilization while keeping receiver hardware simple.",
    "prerequisitesList": [
      {
        "concept": "stop-and-wait",
        "meaning": "Stop-and-Wait ARQ limitations and parameter a"
      },
      {
        "concept": "Sliding Window Concept",
        "meaning": "Pipelining frames using window boundaries and sequence number modulo arithmetic"
      }
    ],
    "learningObjectives": [
      "Explain the concept of pipelining and why it solves the channel efficiency bottleneck of Stop-and-Wait.",
      "Derive the sender window size $W_s = 2^m - 1$ and understand why $W_s$ cannot equal $2^m$.",
      "Trace Go-Back-N execution during normal transmission and during frame loss with subsequent frame discard.",
      "Explain cumulative acknowledgements and the 'go-back' retransmission penalty."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "Forouzan Chapter 11.5 / ISO 7776 (HDLC) / CCITT X.25",
      "type": "Pipelined Sliding Window Protocol",
      "prerequisites": [
        "stop-and-wait"
      ],
      "relatedConcepts": [
        "selective-repeat",
        "sliding-window",
        "comparison-arq-protocols"
      ],
      "compareWith": [
        "stop-and-wait",
        "selective-repeat"
      ],
      "primaryUses": [
        "HDLC Balanced mode, early TCP implementations, satellite data links"
      ]
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/54/Selective_repeat_transmit_window_example.png",
    "imageCaption": "Figure: Sliding Window Structure and Frame Pipelining in Go-Back-N ARQ (Behrouz A. Forouzan, Section 11.5.2).",
    "sections": {
      "overview": "\n      <p><strong>Go-Back-N Automatic Repeat reQuest (Go-Back-N ARQ)</strong> is a pipelined sliding-window protocol designed for noisy channels that dramatically improves channel efficiency by allowing the sender to transmit multiple data frames before pausing for an acknowledgement.</p>\n      <p>According to <em>Forouzan (Section 11.5.2)</em>, in Go-Back-N ARQ, if an uncorrupted sequence of frames is received, the receiver acknowledges them using <strong>cumulative acknowledgements</strong>. However, if a single frame is lost or damaged, the receiver <strong>discards all subsequent out-of-order frames</strong>, and the sender must 'go back' and retransmit the damaged frame and all outstanding frames that followed it.</p>\n      \n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mt-4 mb-2\">Window Size Constraints</h3>\n      <ul class=\"wiki-bullet-list\">\n        <li><strong>Sender Window Size ($W_s$):</strong> $W_s = 2^m - 1$, where $m$ is the number of bits in the sequence number field.</li>\n        <li><strong>Receiver Window Size ($W_r$):</strong> Strictly $W_r = 1$. The receiver only ever accepts the single next-expected frame in sequence.</li>\n      </ul>\n    ",
      "eli10": "Imagine you are throwing a stack of 7 numbered plates to your friend. Your friend only has space to catch Plate #1, then Plate #2, and so on. If Plate #2 shatters on the floor, your friend refuses to catch Plates #3, #4, or #5! Your friend just keeps shouting 'I still need Plate #2!'. So you have to stop, dig into your bag, and throw a replacement Plate #2, followed by re-throwing Plates #3, #4, and #5 all over again.",
      "analogy": "Like an assembly line inspection station: if Item #3 fails the QA test, the inspector rejects Item #3 and stops the entire batch, forcing the production line to reload and re-process Item #3 and all subsequent items behind it.",
      "howItWorks": "\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mb-2\">Why Window Size Must Be $W_s < 2^m$</h3>\n      <p>If $m$ bits are allocated for sequence numbering, there are $2^m$ distinct numbers ($0$ to $2^m - 1$). If the sender window were allowed to equal $2^m$, a catastrophic sequence ambiguity occurs:</p>\n      <div class=\"p-3 bg-amber-50 dark:bg-amber-950/60 border-l-4 border-amber-500 rounded-r text-xs space-y-1\">\n        <p class=\"font-bold text-amber-900 dark:text-amber-200\">The Wrap-Around Proof ($m = 2 \\implies 2^2 = 4$ sequence numbers: 0, 1, 2, 3):</p>\n        <p>1. Suppose $W_s = 4$. Sender transmits Frames 0, 1, 2, 3.</p>\n        <p>2. Receiver receives all 4 frames correctly. Receiver advances its expected frame pointer from 0 to 0 (wrap-around!).</p>\n        <p>3. Receiver transmits ACK 0 (requesting Frame 0 of the <em>next</em> batch).</p>\n        <p>4. <strong>The Failure:</strong> The ACK 0 is lost on the return path.</p>\n        <p>5. Sender timer expires. Sender retransmits the original Frame 0.</p>\n        <p>6. Receiver sees Frame 0 arrive. Since its expected pointer is 0, it mistakes this <em>old retransmitted Frame 0</em> as the <em>brand-new Frame 0</em> of the next cycle! Data duplication occurs undetected.</p>\n        <p class=\"font-bold text-emerald-700 dark:text-emerald-300\">Therefore, the maximum sender window must be $W_s = 2^m - 1$ to guarantee that the old window and the new window never overlap!</p>\n      </div>\n\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mt-4 mb-2\">Operational Workflow: Normal vs. Frame Loss Traces</h3>\n      <h4 class=\"font-bold text-xs text-gray-800 dark:text-gray-200 mt-2\">1. Normal Transmission ($W_s = 4$):</h4>\n      <p class=\"text-xs\">Sender transmits Frames 0, 1, 2, 3. Receiver receives Frame 0 &rarr; sends ACK 1. Receiver receives Frame 1 &rarr; sends ACK 2. As each ACK arrives, the sender window slides forward to transmit Frames 4, 5, etc.</p>\n\n      <h4 class=\"font-bold text-xs text-gray-800 dark:text-gray-200 mt-2\">2. Frame Loss Scenario:</h4>\n      <p class=\"text-xs\">Sender transmits Frames 0, 1, 2, 3. Frame 1 is lost or damaged. Receiver accepts Frame 0 (sends ACK 1). When Frame 2 arrives, receiver detects sequence mismatch ($2 \\neq 1$), <strong>discards Frame 2</strong>, and re-sends ACK 1. When Frame 3 arrives, receiver <strong>discards Frame 3</strong>, and re-sends ACK 1. The sender's timer for Frame 1 expires. Sender 'goes back' and retransmits Frames 1, 2, and 3!</p>\n    ",
      "diagram": "",
      "technicalDetails": "\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mb-2\">Mathematical Channel Efficiency Formula</h3>\n      <p>When window size $W_s$ is selected such that $W_s \\ge 1 + 2a$, the sender can transmit continuously without ever having to wait for an ACK under error-free conditions:</p>\n      <div class=\"p-3 my-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center\">\n        $$\\eta = \\begin{cases} \n          1 & \\text{if } W_s \\ge 1 + 2a \\\\\n          \\frac{W_s}{1 + 2a} & \\text{if } W_s < 1 + 2a \n        \\end{cases}$$\n      </div>\n      <p class=\"text-xs text-gray-600 dark:text-gray-400 mt-2\">If errors occur with frame error rate $P$, the actual throughput efficiency of Go-Back-N is given by:</p>\n      <div class=\"p-3 my-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center\">\n        $$\\eta_{\\text{GBN}} = \\frac{1 - P}{1 + (W_s - 1) P} \\cdot \\frac{W_s}{1 + 2a}$$\n      </div>\n    ",
      "workedExamples": {
        "level1": "<strong>Question:</strong> In a Go-Back-N ARQ system using a 3-bit sequence number, what is the maximum sender window size and receiver window size?<br><br><strong>Answer:</strong><br>Number of bits $m = 3$.<br>Total sequence numbers: $2^3 = 8$ (numbered 0, 1, 2, 3, 4, 5, 6, 7).<br>Maximum Sender Window: $W_s = 2^m - 1 = 2^3 - 1 = 7$.<br>Receiver Window: $W_r = 1$ (always 1 in Go-Back-N).",
        "level2": "<strong>Problem:</strong> A network uses Go-Back-N ARQ with $m = 4$. What are the valid sequence numbers? If the sender transmits Frames 0 through 14 and Frame 5 is lost, which frames must the sender retransmit?<br><br><strong>Answer:</strong><br>For $m = 4$, $W_s = 2^4 - 1 = 15$. Sequence numbers are 0 through 15.<br>Frames 0, 1, 2, 3, 4 are accepted by the receiver.<br>Frame 5 is lost. When Frames 6 through 14 arrive at the receiver, they are all out of order, so the receiver discards all of them.<br>When timeout occurs for Frame 5, the sender must 'go back to 5' and retransmit all 10 frames: <strong>Frames 5, 6, 7, 8, 9, 10, 11, 12, 13, and 14</strong>.",
        "level3": "<strong>Analysis:</strong> Explain the meaning of Cumulative Acknowledgement in Go-Back-N. If a sender receives ACK 7, which frames are acknowledged?<br><br><strong>Answer:</strong> Cumulative acknowledgement means a single ACK frame acknowledges all consecutively received frames up to a specified sequence number. Under Forouzan's next-expected convention, an <strong>ACK 7</strong> confirms that Frames 0, 1, 2, 3, 4, 5, and 6 have all been received safely and in order, and announces that the receiver is currently waiting for Frame 7."
      },
      "advantagesLimitations": "\n      <table class=\"wiki-table\">\n        <thead>\n          <tr>\n            <th>Aspect</th>\n            <th>Advantages</th>\n            <th>Disadvantages</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><strong>Channel Throughput</strong></td>\n            <td>Pipelining keeps the communication pipe filled, achieving up to 100% efficiency.</td>\n            <td>High retransmission penalty: discarding valid out-of-order frames wastes bandwidth on noisy links.</td>\n          </tr>\n          <tr>\n            <td><strong>Receiver Hardware</strong></td>\n            <td>Minimal memory footprint ($W_r = 1$); requires zero out-of-order buffer space.</td>\n            <td>Sender buffer must hold all $W_s$ frames until cumulative ACK arrives.</td>\n          </tr>\n        </tbody>\n      </table>\n    ",
      "whereUsed": [
        "HDLC (High-Level Data Link Control) asynchronous balanced mode (ABM).",
        "Early TCP Reno implementations (fallback on multiple packet drop).",
        "Satellite channels with low bit-error rates."
      ],
      "quiz": [
        {
          "question": "Why does the receiver in Go-Back-N ARQ discard out-of-order frames even if they are received without CRC errors?",
          "options": [
            "Because the receiver window size is strictly 1, meaning it has no buffer to store out-of-order frames",
            "Because out-of-order frames are automatically infected by channel noise",
            "Because the sender's timer cancels all out-of-order packets",
            "Because sequence numbers cannot be read if received out of order"
          ],
          "correct": 0,
          "explanation": "In Go-Back-N ARQ, the receiver window size is $W_r = 1$. The receiver lacks buffer memory to store out-of-sequence frames and simply discards them while re-sending the last cumulative ACK."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Section 11.5.2.",
          "url": ""
        }
      ]
    }
  },
  "selective-repeat": {
    "id": "selective-repeat",
    "title": "Selective Repeat ARQ",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "topicNumber": 2,
    "subtopicNumber": 7,
    "whyItMatters": "Selective Repeat ARQ provides the highest channel efficiency on noisy or long-delay links by retransmitting ONLY missing or damaged frames. It introduces receiver buffering and selective acknowledgements.",
    "prerequisitesList": [
      {
        "concept": "go-back-n",
        "meaning": "Pipelining, cumulative ACKs, and the out-of-order discard penalty"
      },
      {
        "concept": "Receiver Buffering",
        "meaning": "Storing and sorting out-of-order frames before delivering to Layer 3"
      }
    ],
    "learningObjectives": [
      "Explain why Selective Repeat ARQ is more efficient than Go-Back-N on noisy channels.",
      "Prove why the maximum window size for both sender and receiver must be $W_s = W_r = 2^{m-1}$.",
      "Describe the role of Negative Acknowledgements (NAKs) and independent retransmission timers.",
      "Trace protocol execution when an intermediate frame is lost while subsequent frames are buffered."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "Forouzan Chapter 11.5 / RFC 2018 (TCP SACK) / IEEE 802.11 Block ACK",
      "type": "Selective Retransmission Sliding Window Protocol",
      "prerequisites": [
        "go-back-n"
      ],
      "relatedConcepts": [
        "comparison-arq-protocols",
        "sliding-window"
      ],
      "compareWith": [
        "go-back-n",
        "stop-and-wait"
      ],
      "primaryUses": [
        "Modern TCP with Selective ACKs (SACK), Wi-Fi 802.11n/ac/ax, LTE/5G Cellular Radio"
      ]
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/df/Selective_repeat_space-time_diagram.png",
    "imageCaption": "Figure: Selective Repeat Space-Time Diagram: Out-of-Order Buffering and Retransmission of Lost Frame Only.",
    "sections": {
      "overview": "\n      <p><strong>Selective Repeat Automatic Repeat reQuest (Selective Repeat ARQ)</strong> is an advanced sliding-window protocol designed for noisy channels that optimizes bandwidth utilization by retransmitting <strong>only the specific frames that are lost or damaged</strong>.</p>\n      <p>Unlike Go-Back-N (which discards all subsequent frames after an error), the receiver in Selective Repeat maintains a multi-frame buffer ($W_r > 1$). When an out-of-order frame arrives intact, the receiver accepts and buffers it. It then sends a <strong>Negative Acknowledgement (NAK)</strong> or waits for timeout to request the missing frame. Once the missing frame arrives, the receiver reassembles the contiguous sequence and delivers it to the Network Layer.</p>\n      \n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mt-4 mb-2\">Window Size Constraints</h3>\n      <ul class=\"wiki-bullet-list\">\n        <li><strong>Sender Window Size ($W_s$):</strong> $W_s = 2^{m-1}$ (half of the total sequence number space).</li>\n        <li><strong>Receiver Window Size ($W_r$):</strong> $W_r = 2^{m-1}$ (equal to the sender window size).</li>\n      </ul>\n    ",
      "eli10": "Imagine you are assembling a Lego set with 8 numbered bags. You have Bags 1, 3, and 4, but Bag 2 went missing in shipping. Instead of throwing away Bags 3 and 4, you keep them neatly on your shelf, call customer service and say 'Please re-send ONLY Bag 2!'. When Bag 2 arrives, you build the whole set without wasting anything.",
      "analogy": "Like a smart download manager (e.g. BitTorrent or multi-part HTTP): if Chunk #4 fails its CRC checksum, the download manager redownloads only Chunk #4, keeping Chunks #1, #2, #3, #5, #6, and #7 safely in memory.",
      "howItWorks": "\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mb-2\">Mathematical Proof: Why Window Size Must Be $W \\le 2^{m-1}$</h3>\n      <p>The total sequence numbers available with $m$ bits is $2^m$. If $W_s + W_r > 2^m$, an overlap between the old window and the new window occurs. Since optimal flow balance requires $W_s = W_r = W$:</p>\n      <div class=\"p-3 my-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center\">\n        $$W_s + W_r \\le 2^m \\implies 2W \\le 2^m \\implies W \\le 2^{m-1}$$\n      </div>\n\n      <div class=\"p-3 bg-amber-50 dark:bg-amber-950/60 border-l-4 border-amber-500 rounded-r text-xs space-y-1\">\n        <p class=\"font-bold text-amber-900 dark:text-amber-200\">The Wrap-Around Proof ($m = 2 \\implies 2^2 = 4$ sequence numbers: 0, 1, 2, 3):</p>\n        <p>1. Suppose we mistakenly set $W_s = W_r = 3$ (which is greater than $2^{2-1} = 2$).</p>\n        <p>2. Sender window covers ${0, 1, 2}$. Sender transmits Frames 0, 1, 2.</p>\n        <p>3. Receiver receives all 3 frames correctly. Receiver window slides from ${0, 1, 2}$ to ${3, 0, 1}$.</p>\n        <p>4. Receiver sends ACKs, but all ACKs are destroyed by channel noise.</p>\n        <p>5. Sender timers expire. Sender retransmits original Frame 0.</p>\n        <p>6. <strong>The Catastrophic Overlap:</strong> The receiver's new window ${3, \\mathbf{0}, 1}$ contains sequence number 0! The receiver accepts this old Frame 0 as a brand-new frame of the next cycle. Undetected duplicate corruption occurs!</p>\n        <p class=\"font-bold text-emerald-700 dark:text-emerald-300\">Therefore, when $W_s = W_r = 2^{m-1} = 2$, the sender's old window ${0, 1}$ and the receiver's new window ${2, 3}$ share zero numbers in common!</p>\n      </div>\n\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mt-4 mb-2\">10-Step Operational Workflow (Loss Recovery Trace)</h3>\n      <ol class=\"wiki-ordered-list\">\n        <li>Sender window is $W_s = 4$ ($m = 3$). Sender transmits Frames 0, 1, 2, 3.</li>\n        <li>Each transmitted frame starts its own <strong>independent retransmission timer</strong>.</li>\n        <li>Frame 1 is corrupted or lost in transit. Frames 0, 2, and 3 reach the receiver safely.</li>\n        <li>Receiver receives Frame 0, delivers packet to Layer 3, advances receiver window, and sends ACK 1.</li>\n        <li>Receiver receives Frame 2 (out of order!). Receiver stores Frame 2 in its receive buffer and dispatches $\\text{NAK } 1$.</li>\n        <li>Receiver receives Frame 3 (out of order!). Receiver stores Frame 3 in its receive buffer.</li>\n        <li>Sender receives $\\text{NAK } 1$ (or timer for Frame 1 expires).</li>\n        <li><strong>Selective Retransmission:</strong> Sender retransmits <em>ONLY Frame 1</em>. Frames 2 and 3 are NOT retransmitted!</li>\n        <li>Receiver receives replacement Frame 1. It now has contiguous frames 1, 2, and 3 in memory.</li>\n        <li>Receiver delivers packets 1, 2, 3 in sequential order to Layer 3, and receiver window slides forward by 3 positions.</li>\n      </ol>\n    ",
      "diagram": "",
      "technicalDetails": "\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mb-2\">Efficiency Comparison under Channel Errors</h3>\n      <p>Under a frame error probability $P$, the effective channel efficiency $\\eta$ of Selective Repeat is given by:</p>\n      <div class=\"p-3 my-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center\">\n        $$\\eta_{\\text{SR}} = (1 - P) \\cdot \\frac{W_s}{1 + 2a}$$\n      </div>\n      <p class=\"text-xs text-gray-600 dark:text-gray-400 mt-2\">Notice that unlike Go-Back-N (where efficiency drops by a factor of $(W_s - 1)P$), Selective Repeat's throughput degrades strictly linearly with the error rate $(1 - P)$, making it vastly superior on lossy channels.</p>\n    ",
      "workedExamples": {
        "level1": "<strong>Question:</strong> What are the two primary hardware requirements that make Selective Repeat more complex than Go-Back-N?<br><br><strong>Answer:</strong> 1. Multi-frame receiver buffer memory and sorting logic to hold and reorder out-of-sequence frames before delivering them to the Network Layer. 2. Multiple concurrent retransmission timers at the sender (one for each outstanding unacknowledged frame), as opposed to Go-Back-N which requires only a single timer.",
        "level2": "<strong>Problem:</strong> A network uses Selective Repeat ARQ with a 4-bit sequence number ($m = 4$). Calculate: (a) The number of sequence numbers, (b) Maximum sender window size, (c) Maximum receiver window size.<br><br><strong>Answer:</strong><br>(a) Total sequence numbers: $2^m = 2^4 = 16$ (numbered 0 to 15).<br>(b) Maximum sender window: $W_s = 2^{m-1} = 2^{4-1} = 2^3 = 8$.<br>(c) Maximum receiver window: $W_r = 2^{m-1} = 8$.",
        "level3": "<strong>Analysis:</strong> Why does Selective Repeat use Negative Acknowledgements (NAKs) in addition to retransmission timers?<br><br><strong>Answer:</strong> A NAK provides immediate feedback to the sender as soon as an out-of-order frame arrives, informing the sender of the exact sequence number that was lost. This triggers an immediate selective retransmission without forcing the sender to wait for the retransmission timer to expire, significantly reducing recovery latency on long-delay links."
      },
      "advantagesLimitations": "\n      <table class=\"wiki-table\">\n        <thead>\n          <tr>\n            <th>Aspect</th>\n            <th>Advantages</th>\n            <th>Disadvantages</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><strong>Bandwidth Efficiency</strong></td>\n            <td>Zero redundant retransmissions. Retransmits only damaged frames, maximizing throughput.</td>\n            <td>High memory consumption at receiver for out-of-order buffering and sorting.</td>\n          </tr>\n          <tr>\n            <td><strong>Fault Tolerance</strong></td>\n            <td>Maintains high throughput even in high packet-loss environments.</td>\n            <td>Complex sender architecture requiring multiple simultaneous software timers.</td>\n          </tr>\n        </tbody>\n      </table>\n    ",
      "whereUsed": [
        "Modern Transmission Control Protocol with Selective ACKs (TCP SACK - RFC 2018).",
        "IEEE 802.11n/ac/ax Wi-Fi Block Acknowledgment mechanism.",
        "LTE and 5G cellular Radio Link Control (RLC) acknowledged mode (AM)."
      ],
      "quiz": [
        {
          "question": "For a 5-bit sequence number field, what is the maximum sender window size in Selective Repeat ARQ?",
          "options": [
            "16",
            "31",
            "32",
            "8"
          ],
          "correct": 0,
          "explanation": "For $m = 5$, $W_s = 2^{m-1} = 2^{5-1} = 2^4 = 16$."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Section 11.5.3.",
          "url": ""
        }
      ]
    }
  },
  "channel-allocation": {
    "id": "channel-allocation",
    "title": "Medium Access Control (MAC) & Channel Allocation",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "topicNumber": 3,
    "subtopicNumber": 0,
    "whyItMatters": "When multiple communicating nodes share a single transmission broadcast medium, uncoordinated transmissions cause packet collisions. Channel allocation techniques provide systematic access arbitration.",
    "prerequisitesList": [
      {
        "concept": "Data Link Layer Framing",
        "meaning": "Bit packaging and frame delimiting"
      },
      {
        "concept": "Broadcast Mediums",
        "meaning": "Shared wireless radio or multi-point coaxial cables"
      }
    ],
    "learningObjectives": [
      "Understand the channel allocation problem on broadcast links.",
      "Compare static allocation (FDMA/TDMA/CDMA) with dynamic multiple access protocols.",
      "Master the 5 key assumptions in multi-access systems."
    ],
    "infobox": {
      "layer": "Layer 2 (MAC Sublayer)",
      "standard": "IEEE 802 Local Area Networks",
      "type": "Sublayer Architecture Hub",
      "prerequisites": [
        "u2-dll-intro"
      ],
      "relatedConcepts": [
        "u2-mac-sublayer-intro",
        "u2-fdma",
        "u2-tdma"
      ],
      "compareWith": [
        "u2-static-vs-dynamic-channel-allocation"
      ],
      "primaryUses": [
        "Shared Ethernet, Wi-Fi radio arbitration, cellular frequency division"
      ]
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/79/FDMA.PNG",
    "imageCaption": "Figure: Medium Access Control & Frequency Division Channel Allocation (Behrouz A. Forouzan).",
    "sections": {
      "overview": "\n      <p>The <strong>Medium Access Control (MAC) Sublayer</strong> is the lower sublayer of the OSI Data Link Layer that arbitrates access to a shared broadcast transmission medium.</p>\n      <p>When multiple stations attempt to transmit simultaneously over a common wire or radio channel, their electrical or electromagnetic signals interfere with each other, corrupting all transmitted data in what is known as a <strong>packet collision</strong>. MAC protocols and channel allocation strategies provide deterministic rules to prevent or resolve collisions.</p>\n    ",
      "eli10": "Imagine 10 people in a dark room who all want to speak. If everyone talks at once, it's just noisy gibberish! Channel allocation is deciding either: give each person their own microphone pitch (FDMA), take 1-minute turns speaking (TDMA), or raise hands and back off if two people speak at the same time (CSMA).",
      "analogy": "Traffic lights and roundabouts at a busy multi-lane highway intersection managing which lane of cars is permitted to move.",
      "howItWorks": "\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mb-2\">Static vs. Dynamic Channel Allocation</h3>\n      <ul class=\"wiki-bullet-list\">\n        <li><strong>Static Channel Allocation:</strong> Divides total bandwidth permanently into dedicated channels (FDMA) or recurring time slots (TDMA). Excellent for continuous, predictable voice calls, but highly wasteful for bursty computer traffic.</li>\n        <li><strong>Dynamic Channel Allocation:</strong> Allocates the channel on demand as packets arrive using random access (ALOHA, CSMA/CD, CSMA/CA) or collision-free tokens.</li>\n      </ul>\n    ",
      "diagram": "",
      "technicalDetails": "\n      <p>Under static allocation, if $N$ users share a channel of bandwidth $B$, each receives $\\frac{B}{N}$. If only 1 user is transmitting, $(N-1)/N$ of the channel capacity is wasted. Dynamic random access dynamically grants the full bandwidth $B$ on demand.</p>\n    ",
      "workedExamples": {
        "level1": "<strong>Question:</strong> Why is static channel allocation inefficient for bursty computer data traffic?<br><br><strong>Answer:</strong> Computer traffic is bursty, meaning a node sends packets in brief bursts and remains idle for long periods. In static allocation, each station's pre-assigned frequency slot remains completely idle when that station has nothing to send, while active stations cannot exceed their fractional bandwidth share.",
        "level2": "<strong>Problem:</strong> Calculate the delay under static TDM vs. dynamic statistical multiplexing for $N=10$ bursty nodes.<br><br><strong>Answer:</strong> With static TDM, average queuing delay increases by a factor of $N=10$ because a packet must wait for its dedicated time slot even if all other 9 time slots are empty. Dynamic allocation serves packets immediately across all available capacity.",
        "level3": "<strong>Analysis:</strong> State the 5 classic assumptions in dynamic channel allocation modeling.<br><br><strong>Answer:</strong> 1. Station Model (independent stations generating Poisson traffic). 2. Single Channel (one shared broadcast link). 3. Collision Assumption (overlapping frames are corrupted). 4. Time Model (continuous time or slotted). 5. Carrier Sensing (stations can or cannot sense channel activity before transmitting)."
      },
      "advantagesLimitations": "\n      <table class=\"wiki-table\">\n        <thead><tr><th>Approach</th><th>Advantages</th><th>Limitations</th></tr></thead>\n        <tbody>\n          <tr><td>Static Allocation</td><td>Zero collisions, guaranteed bounded latency.</td><td>Inflexible, low throughput with bursty data.</td></tr>\n          <tr><td>Dynamic Allocation</td><td>High throughput, bandwidth allocated on demand.</td><td>Collision overhead at high traffic loads.</td></tr>\n        </tbody>\n      </table>\n    ",
      "whereUsed": [
        "Cellular radio networks (FDD/TDD)",
        "Cable modem DOCSIS systems",
        "Ethernet and Wi-Fi networks"
      ],
      "quiz": [
        {
          "question": "Which sublayer of the Data Link Layer is responsible for arbitrating access to shared transmission media?",
          "options": [
            "Medium Access Control (MAC) sublayer",
            "Logical Link Control (LLC) sublayer",
            "Network sublayer",
            "Physical sublayer"
          ],
          "correct": 0,
          "explanation": "The MAC sublayer coordinates station access to shared broadcast transmission media."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Ed., Chapter 12.",
          "url": ""
        }
      ]
    }
  },
  "wireless-lan-protocols": {
    "id": "wireless-lan-protocols",
    "title": "Wireless LAN Protocols",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "topicNumber": 7,
    "subtopicNumber": 0,
    "whyItMatters": "Wireless transmission channels present unique physical challenges—including signal attenuation, multipath fading, and radio range boundaries—that render wired collision detection impossible.",
    "prerequisitesList": [
      {
        "concept": "MAC Sublayer",
        "meaning": "Channel access arbitration"
      },
      {
        "concept": "Radio Waves",
        "meaning": "Electromagnetic broadcast propagation"
      }
    ],
    "learningObjectives": [
      "Analyze the fundamental characteristics of wireless communication links.",
      "Explain the Hidden Terminal Problem and Exposed Terminal Problem.",
      "Understand why CSMA/CD cannot function over wireless radio interfaces."
    ],
    "infobox": {
      "layer": "Layer 2 (Wireless MAC)",
      "standard": "IEEE 802.11 / Wi-Fi Alliance",
      "type": "Wireless MAC Architecture",
      "prerequisites": [
        "channel-allocation",
        "csma-protocols"
      ],
      "relatedConcepts": [
        "u2-hidden-terminal-problem",
        "u2-exposed-terminal-problem",
        "wifi-mac-sublayer"
      ],
      "compareWith": [
        "ethernet"
      ],
      "primaryUses": [
        "Wi-Fi home & enterprise networks, IoT wireless meshes"
      ]
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Wifi_hidden_station_problem.svg",
    "imageCaption": "Figure: Wireless LAN Transmission Boundaries and the Hidden Station Scenario.",
    "sections": {
      "overview": "\n      <p><strong>Wireless Local Area Network (WLAN) Protocols</strong> govern communication over omnidirectional radio waves rather than physical copper or fiber cables.</p>\n      <p>Because radio signals attenuate rapidly with distance (following inverse-square path loss $\\propto 1/d^2$ or higher), a transmitter's signal may be strong enough to reach an access point but undetectable by another station located on the opposite side of the cell. This gives rise to the classic <strong>Hidden Terminal Problem</strong> and <strong>Exposed Terminal Problem</strong>.</p>\n    ",
      "eli10": "Imagine you and a classmate are both trying to whisper a question to your teacher from opposite sides of a giant library hall. You can both reach the teacher's ears, but you can't hear each other whispering. If you both whisper at once, the teacher hears only noise!",
      "analogy": "Two drivers approaching an obscured blind intersection behind stone walls: neither driver can see the other, but both will crash in the middle without a signaling system.",
      "howItWorks": "\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mb-2\">Core Wireless Challenges</h3>\n      <ul class=\"wiki-bullet-list\">\n        <li><strong>Cannot Detect Collisions while Transmitting:</strong> A wireless station's local transmitter signal is thousands of times stronger than any incoming signal from distant nodes, blinding the receiver while transmitting. Hence CSMA/CD is impossible; wireless MUST use <strong>Collision Avoidance (CSMA/CA)</strong>.</li>\n        <li><strong>Hidden Terminal Problem:</strong> Station A transmits to B. Station C cannot hear A, assumes channel is idle, and also transmits to B, colliding at B.</li>\n        <li><strong>Exposed Terminal Problem:</strong> Station B transmits to A. Station C hears B and wrongly defers transmitting to D, even though C transmitting to D would not interfere with A receiving from B.</li>\n      </ul>\n    ",
      "diagram": "",
      "technicalDetails": "\n      <p>To eliminate hidden terminal collisions, wireless LANs employ the <strong>RTS/CTS (Request to Send / Clear to Send)</strong> 4-way handshake and set a virtual carrier sensing timer called the <strong>Network Allocation Vector (NAV)</strong>.</p>\n    ",
      "workedExamples": {
        "level1": "<strong>Question:</strong> Why can't wireless networks use CSMA/CD like Ethernet?<br><br><strong>Answer:</strong> In wireless, a station transmitting on its antenna overpowers its own receiver. To detect a collision, the station would need to hear a weak distant incoming signal while blasting out its own high-power radio signal, requiring an impossible dynamic range (over 100 dB difference).",
        "level2": "<strong>Problem:</strong> Explain how RTS/CTS solves the hidden terminal problem.<br><br><strong>Answer:</strong> Before sending data, Station A transmits a short Request-to-Send (RTS). Access Point B replies with a Clear-to-Send (CTS). Because Station C is within range of B, C hears the CTS and learns how long A's data transmission will take. C sets its NAV timer and remains silent, preventing a collision at B.",
        "level3": "<strong>Analysis:</strong> Contrast the impact of Hidden Terminals vs Exposed Terminals.<br><br><strong>Answer:</strong> Hidden terminals cause packet collisions and wasted transmission attempts. Exposed terminals cause unnecessary deferrals and wasted channel capacity."
      },
      "advantagesLimitations": "\n      <table class=\"wiki-table\">\n        <thead><tr><th>Aspect</th><th>Wireless LANs</th><th>Wired LANs (Ethernet)</th></tr></thead>\n        <tbody>\n          <tr><td>Collision Handling</td><td>Collision Avoidance (CSMA/CA + RTS/CTS)</td><td>Collision Detection (CSMA/CD) or Switched Full-Duplex</td></tr>\n          <tr><td>Physical Medium</td><td>Unbounded free space (Radio 2.4/5/6 GHz)</td><td>Bounded twisted pair or optical fiber</td></tr>\n        </tbody>\n      </table>\n    ",
      "whereUsed": [
        "IEEE 802.11a/b/g/n/ac/ax/be Wi-Fi",
        "Bluetooth Personal Area Networks",
        "Zigbee wireless sensor meshes"
      ],
      "quiz": [
        {
          "question": "Which mechanism allows nearby stations in a wireless LAN to reserve the channel and avoid hidden terminal collisions?",
          "options": [
            "RTS/CTS Handshake",
            "Preamble bit stuffing",
            "Binary exponential backoff",
            "Token ring rotation"
          ],
          "correct": 0,
          "explanation": "RTS/CTS establishes virtual carrier sensing (NAV) across all stations within range of either sender or receiver."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Ed., Chapter 14.",
          "url": ""
        }
      ]
    }
  },
  "wifi-mac-sublayer": {
    "id": "wifi-mac-sublayer",
    "title": "IEEE 802.11 MAC Sublayer Protocol",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "topicNumber": 8,
    "subtopicNumber": 0,
    "whyItMatters": "IEEE 802.11 Wi-Fi is the ubiquitous wireless standard globally. Its MAC architecture balances contention-based distributed access with centralized polling.",
    "prerequisitesList": [
      {
        "concept": "Wireless LAN Protocols",
        "meaning": "Hidden terminals and radio propagation"
      },
      {
        "concept": "CSMA/CA",
        "meaning": "Collision avoidance with interframe spaces"
      }
    ],
    "learningObjectives": [
      "Distinguish between Distributed Coordination Function (DCF) and Point Coordination Function (PCF).",
      "Explain the role of Interframe Spaces (SIFS, PIFS, DIFS).",
      "Trace the complete CSMA/CA handshake with RTS, CTS, Data, ACK, and NAV."
    ],
    "infobox": {
      "layer": "Layer 2 (MAC Sublayer)",
      "standard": "IEEE 802.11-2020 / Wi-Fi 6 & 7",
      "type": "Industry Wireless Protocol",
      "prerequisites": [
        "wireless-lan-protocols"
      ],
      "relatedConcepts": [
        "u2-ieee-802-11-dcf",
        "u2-ieee-802-11-pcf",
        "u2-rts-cts-mechanism"
      ],
      "compareWith": [
        "ethernet"
      ],
      "primaryUses": [
        "Wi-Fi routers, smartphones, laptops, IoT endpoints"
      ]
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/53/802.11_MAC_Frame.svg",
    "imageCaption": "Figure: Complete IEEE 802.11 MAC Frame Architecture showing 4 Address Fields and Frame Control (Behrouz A. Forouzan).",
    "sections": {
      "overview": "\n      <p>The <strong>IEEE 802.11 MAC Sublayer Protocol</strong> defines how Wi-Fi devices share radio channels. It operates two distinct coordination functions:</p>\n      <ul class=\"wiki-bullet-list\">\n        <li><strong>Distributed Coordination Function (DCF):</strong> Mandatory contention-based protocol using CSMA/CA with exponential backoff and optional RTS/CTS.</li>\n        <li><strong>Point Coordination Function (PCF):</strong> Optional centralized contention-free polling service managed by the Access Point (AP) for delay-sensitive traffic.</li>\n      </ul>\n    ",
      "eli10": "Wi-Fi DCF is like a dinner table where everyone waits for a brief pause before speaking, but rolls a secret die to wait a few seconds so two people don't talk at the exact same moment. PCF is like a dinner where the host points to each person in turn and asks 'Do you want to speak?'.",
      "analogy": "Like an orderly press conference where reporters either raise hands and wait for quiet pauses (DCF) or the press secretary calls on specific reporters one by one (PCF).",
      "howItWorks": "\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mb-2\">CSMA/CA Protocol Timeline & IFS</h3>\n      <p>Stations must observe rigorous Interframe Spaces (IFS) to prioritize traffic:</p>\n      <ul class=\"wiki-bullet-list\">\n        <li><strong>SIFS (Short IFS):</strong> Shortest wait; used for highest priority responses (ACK, CTS).</li>\n        <li><strong>PIFS (PCF IFS):</strong> Intermediate wait; used by Access Point during PCF polling.</li>\n        <li><strong>DIFS (DCF IFS):</strong> Longest mandatory quiet period before any station can begin contention backoff.</li>\n      </ul>\n    ",
      "diagram": "",
      "technicalDetails": "\n      <p>The 802.11 frame format includes 4 distinct address fields (Source MAC, Destination MAC, BSSID/AP MAC, and optional Ad-Hoc relay MAC), frame control flags, sequence control, and FCS trailer.</p>\n    ",
      "workedExamples": {
        "level1": "<strong>Question:</strong> Why is SIFS shorter than DIFS in 802.11?<br><br><strong>Answer:</strong> SIFS is assigned to ongoing handshakes (CTS and ACK). Because SIFS < DIFS, a station waiting to send an ACK transmits before any contending station can complete its DIFS wait, guaranteeing that active transactions are never interrupted by collisions.",
        "level2": "<strong>Problem:</strong> Trace the 802.11 RTS/CTS exchange.<br><br><strong>Answer:</strong> Sender senses channel idle for DIFS &rarr; transmits RTS with duration $D$ &rarr; Receiver waits SIFS &rarr; replies CTS with updated duration &rarr; Sender waits SIFS &rarr; transmits DATA &rarr; Receiver waits SIFS &rarr; transmits ACK. Surrounding stations set NAV timer to $D$ and remain silent.",
        "level3": "<strong>Analysis:</strong> Compare DCF vs. PCF.<br><br><strong>Answer:</strong> DCF is asynchronous, distributed, contention-based, and best effort. PCF is synchronous, centralized, contention-free, and suitable for real-time voice/video QoS."
      },
      "advantagesLimitations": "\n      <table class=\"wiki-table\">\n        <thead><tr><th>Function</th><th>Type</th><th>Primary Use</th></tr></thead>\n        <tbody>\n          <tr><td>DCF</td><td>Contention (CSMA/CA)</td><td>Standard data browsing, file downloads.</td></tr>\n          <tr><td>PCF</td><td>Contention-free (Polling)</td><td>VoIP, real-time streaming (rarely implemented).</td></tr>\n        </tbody>\n      </table>\n    ",
      "whereUsed": [
        "Wi-Fi 4 (802.11n), Wi-Fi 5 (802.11ac), Wi-Fi 6/6E (802.11ax), Wi-Fi 7 (802.11be)"
      ],
      "quiz": [
        {
          "question": "Which Interframe Space (IFS) is the shortest and has the highest transmission priority in IEEE 802.11?",
          "options": [
            "SIFS",
            "PIFS",
            "DIFS",
            "EIFS"
          ],
          "correct": 0,
          "explanation": "SIFS (Short Interframe Space) is the shortest IFS, reserved for high-priority ACKs and CTS frames."
        }
      ],
      "references": [
        {
          "cite": "IEEE Std 802.11-2020 / Behrouz A. Forouzan Chapter 14.",
          "url": ""
        }
      ]
    }
  },
  "dll-switching": {
    "id": "dll-switching",
    "title": "Data Link Layer Switching & Spanning Tree",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "topicNumber": 9,
    "subtopicNumber": 0,
    "whyItMatters": "Modern local networks rely on Layer 2 switches to break large collision domains into isolated micro-segments, while Spanning Tree Protocol (STP) eliminates catastrophic broadcast radiation loops.",
    "prerequisitesList": [
      {
        "concept": "MAC Addressing",
        "meaning": "48-bit hardware station addresses"
      },
      {
        "concept": "Ethernet Framing",
        "meaning": "Destination and source address fields"
      }
    ],
    "learningObjectives": [
      "Understand the operation of learning bridges and transparent switches.",
      "Explain the three bridge forwarding actions: Forward, Filter, Flood.",
      "Master the Spanning Tree Protocol (IEEE 802.1D) algorithm."
    ],
    "infobox": {
      "layer": "Layer 2 (Data Link Layer)",
      "standard": "IEEE 802.1D (STP) / IEEE 802.1w (RSTP)",
      "type": "Link Layer Switching Architecture",
      "prerequisites": [
        "ethernet",
        "mac-address"
      ],
      "relatedConcepts": [
        "u2-learning-bridges",
        "u2-spanning-tree-protocol",
        "vlan"
      ],
      "compareWith": [
        "u2-bridges-vs-switches"
      ],
      "primaryUses": [
        "Enterprise LAN switches, campus networks, datacenter switching fabrics"
      ]
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Spanning_tree_protocol_at_work_1.svg",
    "imageCaption": "Figure: Spanning Tree Protocol (STP) Active Topology Pruning Redundant Loops into a Tree.",
    "sections": {
      "overview": "\n      <p><strong>Data Link Layer Switching</strong> connects multiple LAN segments at Layer 2. A switch inspects incoming frames, inspects their MAC addresses, and forwards frames strictly to the designated output port rather than broadcasting them indiscriminately.</p>\n      <p>To operate autonomously, switches build an internal <strong>MAC Address Table (Forwarding Database)</strong> via backward learning, and execute the <strong>Spanning Tree Protocol (STP - IEEE 802.1D)</strong> to disable redundant physical loops that would cause broadcast radiation storms.</p>\n    ",
      "eli10": "Imagine a school receptionist. Whenever a student brings a note, the receptionist notes down what classroom that student came from. Soon, the receptionist knows exactly which door leads to which student, and can deliver notes directly without having to yell over the school intercom every time!",
      "analogy": "Like a smart postal sorting office sorting envelopes into specific postal delivery trucks rather than sending every letter to every city in the country.",
      "howItWorks": "\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mb-2\">The Three Switch Forwarding Actions</h3>\n      <ol class=\"wiki-ordered-list\">\n        <li><strong>Filtering:</strong> If the destination MAC is learned to be on the exact same port the frame arrived on, the frame is dropped (filtered).</li>\n        <li><strong>Forwarding:</strong> If the destination MAC is in the table on a different port, the frame is transmitted solely out that specific port.</li>\n        <li><strong>Flooding:</strong> If the destination MAC is unknown or is the broadcast address (FF:FF:FF:FF:FF:FF), the frame is transmitted out all ports except the arrival port.</li>\n      </ol>\n    ",
      "diagram": "",
      "technicalDetails": "\n      <p>STP elects a <strong>Root Bridge</strong> (lowest Bridge ID = Priority + MAC), computes shortest root paths, and places redundant ports into a <strong>Blocking State</strong>, preventing bridge loops while maintaining automatic failover redundancy.</p>\n    ",
      "workedExamples": {
        "level1": "<strong>Question:</strong> How does a transparent switch learn MAC addresses?<br><br><strong>Answer:</strong> By inspecting the <em>Source MAC address</em> of every arriving frame and recording the incoming physical port number and a timestamp in its MAC address table (CAM table).",
        "level2": "<strong>Problem:</strong> What is a broadcast storm and how does STP prevent it?<br><br><strong>Answer:</strong> When switches have physical loops, broadcast frames circulate infinitely in both directions, multiplying exponentially until switch CPUs crash and network bandwidth is 100% saturated. STP calculates a loop-free spanning tree and blocks redundant links.",
        "level3": "<strong>Analysis:</strong> Contrast a Bridge and a Switch.<br><br><strong>Answer:</strong> A traditional bridge is software-based with few ports (2 to 4). A modern switch is hardware-based using custom ASIC chips, provides high port density (24 to 48 ports), and performs wire-speed simultaneous parallel switching."
      },
      "advantagesLimitations": "\n      <table class=\"wiki-table\">\n        <thead><tr><th>Action</th><th>Condition</th><th>Outcome</th></tr></thead>\n        <tbody>\n          <tr><td>Forward</td><td>Destination MAC found in table on Port $Y$ ($Y \\neq X$)</td><td>Frame sent solely out Port $Y$.</td></tr>\n          <tr><td>Filter</td><td>Destination MAC found on Port $X$ (same port)</td><td>Frame dropped safely; no action needed.</td></tr>\n          <tr><td>Flood</td><td>Destination MAC unknown or Broadcast</td><td>Frame sent out all ports except arrival port.</td></tr>\n        </tbody>\n      </table>\n    ",
      "whereUsed": [
        "Cisco Catalyst switches",
        "Enterprise campus backbones",
        "Cloud datacenter Top-of-Rack (ToR) switches"
      ],
      "quiz": [
        {
          "question": "Which field in an Ethernet frame does a switch inspect to populate its MAC address forwarding table?",
          "options": [
            "Source MAC Address",
            "Destination MAC Address",
            "EtherType field",
            "FCS CRC trailer"
          ],
          "correct": 0,
          "explanation": "Switches perform backward learning by inspecting the Source MAC address of incoming frames."
        }
      ],
      "references": [
        {
          "cite": "IEEE Std 802.1D / Tanenbaum Chapter 4.8 / Forouzan Chapter 15.",
          "url": ""
        }
      ]
    }
  },
  "network-devices": {
    "id": "network-devices",
    "title": "Networking Devices & Operational Layers",
    "unit": "Unit 2 – Data Link Layer",
    "unitId": "unit2",
    "topicNumber": 10,
    "subtopicNumber": 0,
    "whyItMatters": "Understanding the exact OSI layer at which network hardware operates—Repeaters, Hubs, Bridges, Switches, Routers, and Gateways—is the single most foundational concept in networking engineering.",
    "prerequisitesList": [
      {
        "concept": "OSI 7-Layer Model",
        "meaning": "Physical, Data Link, Network, Transport, and Application layers"
      },
      {
        "concept": "Collision vs Broadcast Domains",
        "meaning": "Boundary management between network segments"
      }
    ],
    "learningObjectives": [
      "Identify the operational layer of Repeaters, Hubs, Bridges, Switches, Routers, and Gateways.",
      "Differentiate between collision domains and broadcast domains.",
      "Master the comparative device functionality matrix."
    ],
    "infobox": {
      "layer": "Layers 1, 2, 3 & 7",
      "standard": "IEEE 802 / IETF Internet Standards",
      "type": "Hardware Architecture Hub",
      "prerequisites": [
        "u2-dll-intro",
        "dll-switching"
      ],
      "relatedConcepts": [
        "u2-networking-device-repeaters",
        "u2-networking-device-switches",
        "u2-networking-device-routers"
      ],
      "compareWith": [
        "u2-comparison-networking-devices"
      ],
      "primaryUses": [
        "Campus cabling, routing topology design, CCNA certification"
      ]
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e6/Router_on_a_stick.png",
    "imageCaption": "Figure: Multi-Layer Networking Device Interconnection: Layer 2 Switches with Layer 3 Routers.",
    "sections": {
      "overview": "\n      <p>Networking devices connect communicating endpoints across physical, link, and network boundaries. Each device functions at a specific layer of the OSI reference model, dictating its intelligence, addressing scheme, and domain boundaries.</p>\n    ",
      "eli10": "Think of mail delivery: A Hub is a loudspeaker that echoes your voice down the hall (Layer 1). A Switch is an office clerk who passes envelopes to the right desk in the building (Layer 2). A Router is a delivery truck that drives letters across highways to other cities (Layer 3).",
      "analogy": "Graduating levels of diplomatic communication: physical wire cables &rarr; local town courier &rarr; interstate postal service &rarr; international embassy translator.",
      "howItWorks": "\n      <h3 class=\"text-base font-bold text-gray-900 dark:text-white mb-2\">Master Device & Layer Mapping Matrix</h3>\n      <table class=\"wiki-table\">\n        <thead>\n          <tr>\n            <th>Device</th>\n            <th>OSI Operating Layer</th>\n            <th>Data Unit</th>\n            <th>Addressing Used</th>\n            <th>Collision Domain</th>\n            <th>Broadcast Domain</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><strong>Repeater</strong></td>\n            <td>Layer 1 (Physical)</td>\n            <td>Bits</td>\n            <td>None</td>\n            <td>Extends 1 domain</td>\n            <td>1 domain</td>\n          </tr>\n          <tr>\n            <td><strong>Hub</strong></td>\n            <td>Layer 1 (Physical)</td>\n            <td>Bits</td>\n            <td>None</td>\n            <td>Single shared domain</td>\n            <td>1 domain</td>\n          </tr>\n          <tr>\n            <td><strong>Bridge</strong></td>\n            <td>Layer 2 (Data Link)</td>\n            <td>Frame</td>\n            <td>MAC Address</td>\n            <td>Separates domains per port</td>\n            <td>1 domain</td>\n          </tr>\n          <tr>\n            <td><strong>Switch</strong></td>\n            <td>Layer 2 (Data Link)</td>\n            <td>Frame</td>\n            <td>MAC Address</td>\n            <td>Separates domains per port</td>\n            <td>1 domain (unless VLANs)</td>\n          </tr>\n          <tr>\n            <td><strong>Router</strong></td>\n            <td>Layer 3 (Network)</td>\n            <td>Packet</td>\n            <td>IP Address</td>\n            <td>Separates domains per port</td>\n            <td>Separates domains per port</td>\n          </tr>\n          <tr>\n            <td><strong>Gateway</strong></td>\n            <td>Layers 4–7 (App)</td>\n            <td>Message</td>\n            <td>Protocol Specific</td>\n            <td>Isolated</td>\n            <td>Isolated</td>\n          </tr>\n        </tbody>\n      </table>\n    ",
      "diagram": "",
      "technicalDetails": "\n      <p>Collision domains are bounded by Layer 2 devices (Switches/Bridges) and Layer 3 devices (Routers). Broadcast domains are strictly bounded by Layer 3 devices (Routers) and Layer 2 VLAN boundaries.</p>\n    ",
      "workedExamples": {
        "level1": "<strong>Question:</strong> How many collision domains and broadcast domains does a 24-port Layer 2 switch have?<br><br><strong>Answer:</strong> A 24-port switch creates <strong>24 separate collision domains</strong> (1 per port) and <strong>1 single broadcast domain</strong>.",
        "level2": "<strong>Problem:</strong> How many collision domains and broadcast domains does a router with 4 Ethernet interfaces have?<br><br><strong>Answer:</strong> A router with 4 interfaces creates <strong>4 separate collision domains</strong> and <strong>4 separate broadcast domains</strong>.",
        "level3": "<strong>Analysis:</strong> Why does a Hub create a single collision domain whereas a Switch separates collision domains?<br><br><strong>Answer:</strong> A Hub is a dumb Layer 1 multiport repeater that electrically replicates incoming bits onto all other ports simultaneously. A Switch is a Layer 2 device that buffers frames in memory and switches them independently between ports, so stations on different ports can transmit concurrently without colliding."
      },
      "advantagesLimitations": "\n      <table class=\"wiki-table\">\n        <thead><tr><th>Device</th><th>Primary Function</th><th>Limitation</th></tr></thead>\n        <tbody>\n          <tr><td>Hub / Repeater</td><td>Signal regeneration and cabling fanout.</td><td>Shares collisions across all connected nodes.</td></tr>\n          <tr><td>Switch</td><td>High-speed micro-segmentation and frame forwarding.</td><td>Floods broadcasts across all ports.</td></tr>\n          <tr><td>Router</td><td>Logical IP path selection and network isolation.</td><td>Slower per-packet routing lookup than switching.</td></tr>\n        </tbody>\n      </table>\n    ",
      "whereUsed": [
        "Campus LAN infrastructure",
        "Home Wi-Fi gateway routers",
        "Internet Service Provider core routing backbones"
      ],
      "quiz": [
        {
          "question": "Which of the following networking devices breaks both collision domains AND broadcast domains?",
          "options": [
            "Router",
            "Switch",
            "Hub",
            "Repeater"
          ],
          "correct": 0,
          "explanation": "Routers operate at Layer 3 (Network Layer) and break both collision domains and broadcast domains at every interface."
        }
      ],
      "references": [
        {
          "cite": "Behrouz A. Forouzan, Data Communications and Networking, 4th Ed., Chapter 15.",
          "url": ""
        }
      ]
    }
  }
};

if (typeof window !== 'undefined') window.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
if (typeof global !== 'undefined') global.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
if (typeof module !== 'undefined' && module.exports) module.exports = TOPICS_U2_SYLLABUS;
