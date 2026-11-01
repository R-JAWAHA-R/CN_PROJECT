// scratch/apply_local_images_t1_t5.js
const fs = require('fs');
const path = require('path');

const IMAGE_MAPPING = {
  // === TOPIC 1: Data Link Layer Fundamentals ===
  'u2-dll-intro': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic1/osi-layer2-position.svg',
    caption: 'Figure 1.1: Data Link Layer position in the OSI Reference Model & PDU encapsulation flow.',
    secondary: 'assets/images/topic1/dll-node-to-node-delivery.svg',
    secondaryCaption: 'Figure 1.2: Hop-by-Hop Node-to-Node Delivery (Data Link) vs End-to-End (Transport).'
  },
  'u2-dll-osi-position': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic1/dll-position-between-layers.svg',
    caption: 'Figure 1.3: Data Link Layer position between Network Layer (Packets) and Physical Layer (Bits).',
    secondary: 'assets/images/topic1/osi-model-dll-highlight.svg',
    secondaryCaption: 'Figure 1.4: OSI 7-Layer Architecture highlighting Layer 2 services and PDU interfaces.'
  },
  'u2-dll-functions': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic1/dll-core-functions.svg',
    caption: 'Figure 1.5: The 6 Core Functions of the Data Link Layer (Framing, Addressing, Flow & Error Control).',
    secondary: 'assets/images/topic1/dll-functions-overview.svg',
    secondaryCaption: 'Figure 1.6: Functional breakdown of Data Link Layer responsibilities.'
  },
  'dll-design-issues': {
    file: 'topics_u2_extended.js',
    primary: 'assets/images/topic1/dll-design-issues-architecture.svg',
    caption: 'Figure 1.7: Major Design Issues of the Data Link Layer (Services, Framing, Flow, and Error Control).',
    secondary: 'assets/images/topic1/dll-design-issues.svg',
    secondaryCaption: 'Figure 1.8: System architecture of node-to-node design challenges.'
  },
  'u2-dll-services': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic1/dll-service-classes.svg',
    caption: 'Figure 1.9: Three Service Classes provided by DLL to the Network Layer.',
    secondary: 'assets/images/topic1/osi-layer2-position.svg',
    secondaryCaption: 'Figure 1.10: Service access points between Layer 2 and Layer 3.'
  },
  'framing': {
    file: 'topics_u2.js',
    primary: 'assets/images/topic1/framing-techniques.svg',
    caption: 'Figure 1.11: Four Classical Framing Techniques: Character Count, Byte Stuffing, Bit Stuffing, and Coding Violations.',
    secondary: 'assets/images/topic1/bit-stuffing-mechanism.svg',
    secondaryCaption: 'Figure 1.12: Bit Stuffing & Unstuffing trace (Zero-bit insertion after five consecutive 1s).'
  },
  'flow-control': {
    file: 'topics_u2.js',
    primary: 'assets/images/topic1/flow-control-models.svg',
    caption: 'Figure 1.13: Data Link Flow Control: Stop-and-Wait vs Sliding Window pipelined protocol.',
    secondary: 'assets/images/topic2/sliding-window-frame-sequence.svg',
    secondaryCaption: 'Figure 1.14: Sliding window sender and receiver buffer management.'
  },
  'u2-error-control': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic1/error-control-taxonomy.svg',
    caption: 'Figure 1.15: Error Control Taxonomy: Error Detection & ARQ Retransmission vs Forward Error Correction (FEC).',
    secondary: 'assets/images/topic1/bit-stuffing-mechanism.svg',
    secondaryCaption: 'Figure 1.16: Frame Check Sequence (FCS) protection in framed data.'
  },

  // === TOPIC 2: Data Link Layer Protocols ===
  'u2-dll-protocols-intro': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic2/dll-protocol-hierarchy.svg',
    caption: 'Figure 2.1: Taxonomy of Elementary Data Link Protocols for Noiseless and Noisy Channels.',
    secondary: 'assets/images/topic2/dll-protocols-taxonomy.svg',
    secondaryCaption: 'Figure 2.2: Protocol family tree (Simplex, Stop-and-Wait, GBN, Selective Repeat).'
  },
  'u2-protocol-classification': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic2/protocol-classification-chart.svg',
    caption: 'Figure 2.3: Architectural comparison chart: Noiseless vs Noisy Channel protocols.',
    secondary: 'assets/images/topic2/noiseless-vs-noisy-matrix.svg',
    secondaryCaption: 'Figure 2.4: Feature matrix comparing flow and error control across protocols.'
  },
  'simplex-protocol': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic2/simplex-protocol-timeline.svg',
    caption: 'Figure 2.5: Simplest Protocol (Utopia) sequence trace with infinite receiver buffer assumption.',
    secondary: 'assets/images/topic2/simplex-protocol-flow.svg',
    secondaryCaption: 'Figure 2.6: Unidirectional transmission flow without feedback.'
  },
  'stop-and-wait-noiseless': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic2/stop-and-wait-noiseless-timeline.svg',
    caption: 'Figure 2.7: Stop-and-Wait protocol sequence on a noiseless channel with flow-control ACKs.',
    secondary: 'assets/images/topic2/stop-and-wait-noiseless-flow.svg',
    secondaryCaption: 'Figure 2.8: Stop-and-Wait sender and receiver interaction flow.'
  },
  'stop-and-wait': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic2/stop-and-wait-arq-fsm.svg',
    caption: 'Figure 2.9: Stop-and-Wait ARQ state transitions: normal flow, lost frame timeout, and lost ACK duplicate filtering.',
    secondary: 'assets/images/topic2/arq-protocols-comparison-chart.svg',
    secondaryCaption: 'Figure 2.10: Channel utilization curve showing Stop-and-Wait efficiency 1 / (1 + 2a).'
  },
  'go-back-n': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic2/go-back-n-sliding-window.svg',
    caption: 'Figure 2.11: Go-Back-N ARQ sliding window buffer (S_w = 2^m - 1, R_w = 1) and cumulative ACK mechanics.',
    secondary: 'assets/images/topic2/go-back-n-error-recovery.svg',
    secondaryCaption: 'Figure 2.12: Go-Back-N error recovery sequence showing retransmission of full N-frame window.'
  },
  'selective-repeat': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic2/selective-repeat-windows.svg',
    caption: 'Figure 2.13: Selective Repeat ARQ symmetric sliding windows (S_w = R_w = 2^(m-1)) with independent buffering.',
    secondary: 'assets/images/topic2/selective-repeat-recovery.svg',
    secondaryCaption: 'Figure 2.14: Selective Repeat error recovery: Retransmission of damaged frame ONLY.'
  },
  'comparison-noiseless-noisy': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic2/noiseless-vs-noisy-matrix.svg',
    caption: 'Figure 2.15: Detailed comparison matrix: Noiseless vs Noisy Channel protocols.',
    secondary: 'assets/images/topic2/protocol-classification-chart.svg',
    secondaryCaption: 'Figure 2.16: Taxonomy of noiseless vs noisy ARQ protocol mechanisms.'
  },
  'comparison-arq-protocols': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic2/arq-protocols-comparison-chart.svg',
    caption: 'Figure 2.17: Comparative analysis of ARQ protocols: Window sizing, retransmission scope, and efficiency.',
    secondary: 'assets/images/topic2/sliding-window-frame-sequence.svg',
    secondaryCaption: 'Figure 2.18: Modulo-2^m circular sequence buffer mechanics.'
  },

  // === TOPIC 3: Medium Access Control (MAC) Sublayer ===
  'u2-mac-sublayer-intro': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic3/mac-sublayer-stack.svg',
    caption: 'Figure 3.1: IEEE 802 LAN architecture splitting Layer 2 into LLC (802.2) and MAC (802.3, 802.11) sublayers.',
    secondary: 'assets/images/topic3/mac-sublayer-position.svg',
    secondaryCaption: 'Figure 3.2: MAC sublayer position and role controlling access to physical media.'
  },
  'u2-need-for-mac-sublayer': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic3/need-for-mac-broadcast-medium.svg',
    caption: 'Figure 3.3: Shared broadcast channel showing collision chaos without MAC arbitration vs orderly coordination.',
    secondary: 'assets/images/topic3/need-for-mac-sublayer.svg',
    secondaryCaption: 'Figure 3.4: Collision resolution through MAC protocol coordination.'
  },
  'u2-mac-functions-responsibilities': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic3/mac-sublayer-responsibilities.svg',
    caption: 'Figure 3.5: Four core responsibilities of the MAC Sublayer: Delimiting, Contention, Addressing, and CRC-32.',
    secondary: 'assets/images/topic3/mac-frame-delimiting.svg',
    secondaryCaption: 'Figure 3.6: Standard IEEE 802.3 MAC frame structure and field delimitations.'
  },
  'channel-allocation': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic3/channel-allocation-problem.svg',
    caption: 'Figure 3.7: The Channel Allocation Problem: Static vs Dynamic channel allocation trade-offs.',
    secondary: 'assets/images/topic3/channel-allocation-overview.svg',
    secondaryCaption: 'Figure 3.8: Complete taxonomy of channel allocation strategies.'
  },
  'u2-fdma': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic3/fdma-spectral-allocation.svg',
    caption: 'Figure 3.9: Frequency Division Multiple Access (FDMA) showing dedicated frequency bands and guard bands.',
    secondary: 'assets/images/topic3/fdma-diagram.svg',
    secondaryCaption: 'Figure 3.10: Frequency vs time allocation grid in FDMA.'
  },
  'u2-tdma': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic3/tdma-time-slot-allocation.svg',
    caption: 'Figure 3.11: Time Division Multiple Access (TDMA) showing synchronized repeating time slots.',
    secondary: 'assets/images/topic3/tdma-diagram.svg',
    secondaryCaption: 'Figure 3.12: Time slot distribution across users in TDMA.'
  },
  'u2-dynamic-channel-allocation': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic3/static-vs-dynamic-performance.svg',
    caption: 'Figure 3.13: Queueing delay analysis of dynamic on-demand channel allocation vs static partitioning.',
    secondary: 'assets/images/topic3/dynamic-channel-allocation.svg',
    secondaryCaption: 'Figure 3.14: Contention-based dynamic access state logic.'
  },
  'u2-static-vs-dynamic-channel-allocation': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic3/static-vs-dynamic-performance.svg',
    caption: 'Figure 3.15: Delay vs Offered Load performance comparison: Static (FDM/TDM) vs Dynamic access.',
    secondary: 'assets/images/topic3/static-vs-dynamic-comparison.svg',
    secondaryCaption: 'Figure 3.16: Side-by-side trade-off comparison: Static vs Dynamic channel allocation.'
  },

  // === TOPIC 4: Multiple Access Protocols ===
  'u2-multiple-access-intro': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic4/multiple-access-categories.svg',
    caption: 'Figure 4.1: Master taxonomy of Multiple Access Protocols: Random Access, Controlled Access, and Channelization.',
    secondary: 'assets/images/topic4/multiple-access-taxonomy.svg',
    secondaryCaption: 'Figure 4.2: Classification tree of broadcast access protocols.'
  },
  'u2-random-access-protocols': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic4/multiple-access-comparison-radar.svg',
    caption: 'Figure 4.3: Comprehensive comparison of Random Access Protocols: ALOHA, CSMA, CSMA/CD, CSMA/CA.',
    secondary: 'assets/images/topic4/csma-persistence-comparison.svg',
    secondaryCaption: 'Figure 4.4: Persistence comparison: 1-Persistent, Non-Persistent, and p-Persistent CSMA.'
  },
  'u2-pure-aloha': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic4/pure-aloha-timeline-vulnerable-time.svg',
    caption: 'Figure 4.5: Pure ALOHA transmission timeline and Vulnerable Period (2 &times; T_fr).',
    secondary: 'assets/images/topic4/pure-aloha-throughput-curve.svg',
    secondaryCaption: 'Figure 4.6: Throughput curve S = G &bull; e^(-2G) peaking at 18.4% at G = 0.5.'
  },
  'u2-slotted-aloha': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic4/slotted-aloha-timeline-slots.svg',
    caption: 'Figure 4.7: Slotted ALOHA synchronized time slots and halved Vulnerable Window (1 &times; T_fr).',
    secondary: 'assets/images/topic4/pure-aloha-throughput-curve.svg',
    secondaryCaption: 'Figure 4.8: Throughput curve S = G &bull; e^(-G) peaking at 36.8% at G = 1.0.'
  },
  'u2-csma-1-persistent': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic4/csma-1-persistent-flowchart.svg',
    caption: 'Figure 4.9: 1-Persistent CSMA sensing logic flowchart and transmission rule.',
    secondary: 'assets/images/topic4/csma-persistence-comparison.svg',
    secondaryCaption: 'Figure 4.10: Carrier sense persistence algorithm comparison.'
  },
  'u2-csma-non-persistent': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic4/csma-persistence-comparison.svg',
    caption: 'Figure 4.11: Non-Persistent CSMA randomized backoff and carrier sensing flowchart.',
    secondary: 'assets/images/topic4/multiple-access-comparison-radar.svg',
    secondaryCaption: 'Figure 4.12: Random backoff performance metrics.'
  },
  'u2-csma-p-persistent': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic4/csma-persistence-comparison.svg',
    caption: 'Figure 4.13: p-Persistent CSMA slotted probabilistic branching (transmit with probability p).',
    secondary: 'assets/images/topic4/multiple-access-comparison-radar.svg',
    secondaryCaption: 'Figure 4.14: Probability distribution across contending stations.'
  },
  'u2-csma-cd': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic4/csma-cd-transceiver-collision.svg',
    caption: 'Figure 4.15: CSMA/CD collision window (2 &times; &tau;) and minimum frame size requirement (64 bytes).',
    secondary: 'assets/images/topic4/multiple-access-comparison-radar.svg',
    secondaryCaption: 'Figure 4.16: Wired Ethernet CSMA/CD vs other random access methods.'
  },
  'u2-csma-ca': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic4/csma-ca-wireless-hidden-station.svg',
    caption: 'Figure 4.17: CSMA/CA wireless protocol: Hidden station problem and RTS/CTS handshake with NAV reservation.',
    secondary: 'assets/images/topic4/multiple-access-comparison-radar.svg',
    secondaryCaption: 'Figure 4.18: Collision Avoidance protocol timings (DIFS, SIFS, RTS, CTS, ACK).'
  },
  'u2-comparison-multiple-access': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic4/multiple-access-comparison-radar.svg',
    caption: 'Figure 4.19: Master comparison matrix of throughput, sensing, and collision handling across all multiple access protocols.',
    secondary: 'assets/images/topic4/multiple-access-categories.svg',
    secondaryCaption: 'Figure 4.20: Master taxonomy of multiple access protocols.'
  },

  // === TOPIC 5: Collision-Free Protocols ===
  'u2-collision-free-intro': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic5/collision-free-necessity.svg',
    caption: 'Figure 5.1: Throughput collapse in random access under heavy load vs stability in collision-free protocols.',
    secondary: 'assets/images/topic5/collision-free-comparison-matrix.svg',
    secondaryCaption: 'Figure 5.2: Comparative analysis matrix of collision-free mechanisms.'
  },
  'u2-bit-map-protocol': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic5/bitmap-reservation-protocol.svg',
    caption: 'Figure 5.3: Bit-Map Protocol contention reservation period (N 1-bit slots) and ordered data frame transmission.',
    secondary: 'assets/images/topic5/collision-free-necessity.svg',
    secondaryCaption: 'Figure 5.4: Channel efficiency under heavy vs light load in Bit-Map protocol.'
  },
  'u2-binary-countdown-protocol': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic5/binary-countdown-protocol.svg',
    caption: 'Figure 5.5: Binary Countdown Protocol: Bit-by-bit wired-OR address arbitration (CAN bus standard).',
    secondary: 'assets/images/topic5/collision-free-comparison-matrix.svg',
    secondaryCaption: 'Figure 5.6: Overhead comparison: log_2(N) bits in Binary Countdown vs N bits in Bit-Map.'
  },
  'u2-token-passing-protocol': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic5/token-passing-ring-architecture.svg',
    caption: 'Figure 5.7: Token Ring architecture: Token circulation, frame capture, receiver copying, and token release.',
    secondary: 'assets/images/topic5/collision-free-comparison-matrix.svg',
    secondaryCaption: 'Figure 5.8: Bounded maximum rotation delay and fairness in Token Passing.'
  },
  'u2-collision-free-working-principles': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic5/bitmap-reservation-protocol.svg',
    caption: 'Figure 5.9: Working principles and execution traces of Bit-Map, Binary Countdown, and Token Passing.',
    secondary: 'assets/images/topic5/binary-countdown-protocol.svg',
    secondaryCaption: 'Figure 5.10: Bit-by-bit address arbitration trace in Binary Countdown.'
  },
  'u2-comparison-collision-free': {
    file: 'topics_u2_syllabus.js',
    primary: 'assets/images/topic5/collision-free-comparison-matrix.svg',
    caption: 'Figure 5.11: Comparative analysis matrix of Bit-Map, Binary Countdown, and Token Passing protocols.',
    secondary: 'assets/images/topic5/collision-free-necessity.svg',
    secondaryCaption: 'Figure 5.12: Load curves comparing collision-free throughput with contention collapse.'
  }
};

const EXTRA_TARGETS_FOR_TOPICS_U2 = ['stop-and-wait', 'go-back-n', 'selective-repeat'];

function createInlineFigure(imgSrc, caption) {
  // Use single quotes for HTML attributes to avoid breaking JSON string literal syntax
  const safeCaption = caption.replace(/'/g, '&#39;').replace(/"/g, '&quot;');
  return `\\n<figure class=\\'my-6 text-center\\'>\\n  <img src=\\'${imgSrc}\\' alt=\\'${safeCaption}\\' class=\\'mx-auto rounded-xl shadow-md border border-slate-200 dark:border-slate-700 max-w-full\\' style=\\'max-height: 440px;\\' />\\n  <figcaption class=\\'text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium\\'>${safeCaption}</figcaption>\\n</figure>\\n`;
}

// Group targets by file
const filesToProcess = {
  'topics_u2_syllabus.js': [],
  'topics_u2.js': [],
  'topics_u2_extended.js': []
};

Object.keys(IMAGE_MAPPING).forEach(id => {
  const info = IMAGE_MAPPING[id];
  filesToProcess[info.file].push({ id, ...info });
  if (EXTRA_TARGETS_FOR_TOPICS_U2.includes(id)) {
    filesToProcess['topics_u2.js'].push({ id, ...info });
  }
});

Object.keys(filesToProcess).forEach(filename => {
  const filePath = path.join(__dirname, '../js', filename);
  console.log(`Processing ${filename}...`);
  let code = fs.readFileSync(filePath, 'utf8');

  filesToProcess[filename].forEach(target => {
    const { id, primary, caption, secondary, secondaryCaption } = target;

    // Find the topic entry in the file
    let keyIdx = code.indexOf(`"${id}":`);
    if (keyIdx === -1) keyIdx = code.indexOf(`'${id}':`);
    if (keyIdx === -1) {
      console.warn(`[WARN] Could not find ${id} in ${filename}`);
      return;
    }

    // Find sections: or "sections":
    let sectionsIdx = code.indexOf('"sections":', keyIdx);
    if (sectionsIdx === -1) sectionsIdx = code.indexOf('sections:', keyIdx);
    if (sectionsIdx === -1) {
      console.warn(`[WARN] Could not find sections for ${id} in ${filename}`);
      return;
    }

    // 1. Update or Insert top-level imageUrl and imageCaption
    const topSlice = code.slice(keyIdx, sectionsIdx);
    if (topSlice.includes('"imageUrl":') || topSlice.includes("'imageUrl':") || topSlice.includes('imageUrl:')) {
      const re = /(["']?imageUrl["']?\s*:\s*)["'][^"']*["']/;
      code = code.slice(0, keyIdx) + topSlice.replace(re, `$1"${primary}"`) + code.slice(sectionsIdx);
    } else {
      const insertStr = `"imageUrl": "${primary}",\n    "imageCaption": "${caption}",\n    `;
      code = code.slice(0, sectionsIdx) + insertStr + code.slice(sectionsIdx);
    }

    // Refresh sectionsIdx
    let updatedSectionsIdx = code.indexOf('"sections":', keyIdx);
    if (updatedSectionsIdx === -1) updatedSectionsIdx = code.indexOf('sections:', keyIdx);

    // Overview update
    let overviewIdx = code.indexOf('"overview":', updatedSectionsIdx);
    if (overviewIdx === -1) overviewIdx = code.indexOf('overview:', updatedSectionsIdx);

    if (overviewIdx !== -1) {
      const endOverviewIdx = code.indexOf('",\n', overviewIdx);
      if (endOverviewIdx !== -1) {
        let overviewStr = code.slice(overviewIdx, endOverviewIdx);
        
        // Replace wikimedia images
        overviewStr = overviewStr.replace(/https:\/\/upload\.wikimedia\.org\/[^\s"'>]+/g, primary);

        // If secondary image not yet in overview, prepend or append it!
        if (!overviewStr.includes(secondary) && !overviewStr.includes(primary)) {
          const figureHtml = createInlineFigure(secondary, secondaryCaption);
          const firstP = overviewStr.indexOf('</p>');
          if (firstP !== -1) {
            overviewStr = overviewStr.slice(0, firstP + 4) + figureHtml + overviewStr.slice(firstP + 4);
          } else {
            overviewStr = overviewStr + figureHtml;
          }
        }

        code = code.slice(0, overviewIdx) + overviewStr + code.slice(endOverviewIdx);
      }
    }

    console.log(`  Updated ${id} with primary: ${primary}`);
  });

  fs.writeFileSync(filePath, code, 'utf8');
  console.log(`Saved ${filename} successfully!\n`);
});

console.log('ALL TOPICS 1-5 SUCCESSFULLY UPDATED WITH LOCAL ASSETS!');
