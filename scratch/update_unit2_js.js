const fs = require('fs');

let code = fs.readFileSync('js/unit2.js', 'utf8');

// --- PART 1 ADDITIONS ---
const p1Addition = `,
        {
          id: "folder-error-detection-codes",
          title: "Error Detection and Correction Codes",
          type: "folder",
          desc: "Principles of error detection, correction, redundancy, Hamming distance, and coding techniques",
          items: [
            { id: "u2-intro-error-detection", title: "Introduction to Error Detection", type: "document", time: "15 min" },
            { id: "u2-intro-error-correction", title: "Introduction to Error Correction", type: "document", time: "15 min" },
            { id: "u2-redundancy-error-control", title: "Redundancy and Error Control", type: "document", time: "18 min" },
            { id: "u2-hamming-distance", title: "Hamming Distance", type: "document", time: "20 min" },
            { id: "u2-detection-vs-correction", title: "Error Detection vs Error Correction", type: "document", time: "18 min" },
            { id: "u2-error-techniques", title: "Error Detection and Correction Techniques", type: "document", time: "22 min" }
          ]
        },
        {
          id: "folder-hamming-code",
          title: "Hamming Code",
          type: "folder",
          desc: "Linear single-error correcting codes, bit layout, parity calculations, and syndrome decoding",
          items: [
            { id: "u2-hamming-working-principle", title: "Working Principle", type: "document", time: "18 min" },
            { id: "u2-hamming-code-calculation", title: "Hamming Code Calculation", type: "document", time: "25 min" },
            { id: "u2-hamming-detection-correction", title: "Error Detection and Correction Using Hamming Code", type: "document", time: "25 min" },
            { id: "u2-hamming-numerical-problems", title: "Numerical Problems", type: "document", time: "30 min" }
          ]
        },
        {
          id: "folder-crc",
          title: "Cyclic Redundancy Check (CRC)",
          type: "folder",
          desc: "Cyclic codes, generator polynomials, modulo-2 binary division, and FCS verification",
          items: [
            { id: "u2-crc-intro", title: "Introduction to CRC", type: "document", time: "15 min" },
            { id: "u2-crc-working-principle", title: "CRC Working Principle", type: "document", time: "20 min" },
            { id: "u2-crc-generator-polynomial", title: "Generator Polynomial", type: "document", time: "22 min" },
            { id: "u2-crc-binary-division", title: "CRC Calculation Using Binary Division", type: "document", time: "25 min" },
            { id: "u2-crc-numerical-problems", title: "CRC Numerical Problems", type: "document", time: "30 min" }
          ]
        }`;

// Target Part 1 insertion point
const p1Target = /\{ id: "u2-error-control", title: "Error Control", type: "document", time: "25 min" \}/;
if (code.match(p1Target) && !code.includes('folder-error-detection-codes')) {
  code = code.replace(p1Target, '{ id: "u2-error-control", title: "Error Control", type: "document", time: "25 min" }' + p1Addition);
  // Update badge
  code = code.replace('badge: "8 Subtopics",', 'badge: "23 Subtopics • 3 Folders",');
  console.log('Part 1 updated in unit2.js');
}

// --- PART 2 ADDITIONS ---
const p2SimplexAddition = `
        {
          id: "folder-simplex-variations",
          title: "Simplex Protocol and Its Variations",
          type: "folder",
          desc: "Unrestricted Simplex, Simplex Stop-and-Wait, and Stop-and-Wait for Noisy Channels",
          items: [
            { id: "u2-unrestricted-simplex", title: "Unrestricted Simplex Protocol", type: "document", time: "15 min" },
            { id: "u2-simplex-stop-and-wait", title: "Simplex Stop-and-Wait Protocol", type: "document", time: "18 min" },
            { id: "u2-simplex-noisy-channels", title: "Simplex Protocol for Noisy Channels", type: "document", time: "25 min" }
          ]
        },`;

const p2SlidingAddition = `
        {
          id: "folder-sliding-window",
          title: "Sliding Window Protocols",
          type: "folder",
          desc: "Sender and receiver window frames, window sizing, dynamic movement, and piggybacking",
          items: [
            { id: "u2-sliding-window-intro", title: "Introduction to Sliding Window Protocol", type: "document", time: "18 min" },
            { id: "u2-sender-receiver-window", title: "Sender Window and Receiver Window", type: "document", time: "22 min" },
            { id: "u2-sliding-window-size", title: "Window Size", type: "document", time: "18 min" },
            { id: "u2-sliding-window-working-principle", title: "Working Principle", type: "document", time: "25 min" },
            { id: "u2-piggybacking", title: "Piggybacking", type: "document", time: "15 min" },
            { id: "u2-sliding-window-vs-stop-and-wait", title: "Sliding Window vs Stop-and-Wait", type: "document", time: "20 min" }
          ]
        },`;

const p2SimplexTarget = /\{ id: "u2-protocol-classification", title: "Classification of Protocols", type: "document", time: "15 min" \},/;
if (code.match(p2SimplexTarget) && !code.includes('folder-simplex-variations')) {
  code = code.replace(p2SimplexTarget, '{ id: "u2-protocol-classification", title: "Classification of Protocols", type: "document", time: "15 min" },' + p2SimplexAddition);
  console.log('Part 2 simplex added in unit2.js');
}

const p2SlidingTarget = /\{ id: "comparison-noiseless-noisy", title: "Comparison of Noiseless and Noisy Channel Protocols"/;
if (code.match(p2SlidingTarget) && !code.includes('folder-sliding-window')) {
  code = code.replace(p2SlidingTarget, p2SlidingAddition.trim() + '\n        { id: "comparison-noiseless-noisy", title: "Comparison of Noiseless and Noisy Channel Protocols"');
  code = code.replace('badge: "9 Subtopics • 2 Folders",', 'badge: "18 Subtopics • 4 Folders",');
  console.log('Part 2 sliding window added in unit2.js');
}

// --- PART 9 ADDITIONS ---
const p9Addition = `,
        {
          id: "folder-bridge-applications",
          title: "Uses and Applications of Bridges",
          type: "folder",
          desc: "Purpose, collision domain segmentation, traffic filtering, LAN interconnection, and trade-offs",
          items: [
            { id: "u2-bridges-purpose", title: "Purpose of Bridges", type: "document", time: "15 min" },
            { id: "u2-bridges-network-segmentation", title: "Network Segmentation", type: "document", time: "18 min" },
            { id: "u2-bridges-traffic-filtering", title: "Traffic Filtering", type: "document", time: "18 min" },
            { id: "u2-bridges-connecting-lan-segments", title: "Connecting LAN Segments", type: "document", time: "20 min" },
            { id: "u2-bridges-advantages-limitations", title: "Advantages and Limitations of Bridges", type: "document", time: "18 min" }
          ]
        }`;

const p9Target = /\{ id: "u2-bridges-vs-switches", title: "Bridges vs Switches", type: "document", time: "20 min" \}/;
if (code.match(p9Target) && !code.includes('folder-bridge-applications')) {
  code = code.replace(p9Target, '{ id: "u2-bridges-vs-switches", title: "Bridges vs Switches", type: "document", time: "20 min" }' + p9Addition);
  code = code.replace('badge: "9 Subtopics",', 'badge: "14 Subtopics • 1 Folder",');
  console.log('Part 9 updated in unit2.js');
}

fs.writeFileSync('js/unit2.js', code, 'utf8');
console.log('js/unit2.js update finished!');

