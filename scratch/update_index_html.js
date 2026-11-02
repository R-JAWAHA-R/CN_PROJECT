const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// --- 1. PART 1 UPDATE IN index.html ---
const p1Addition = `,
                            {
                                id: "folder-error-detection-codes",
                                title: "Error Detection and Correction Codes",
                                type: "folder",
                                items: [
                                    { id: "u2-intro-error-detection", title: "Introduction to Error Detection", type: "document" },
                                    { id: "u2-intro-error-correction", title: "Introduction to Error Correction", type: "document" },
                                    { id: "u2-redundancy-error-control", title: "Redundancy and Error Control", type: "document" },
                                    { id: "u2-hamming-distance", title: "Hamming Distance", type: "document" },
                                    { id: "u2-detection-vs-correction", title: "Error Detection vs Error Correction", type: "document" },
                                    { id: "u2-error-techniques", title: "Error Detection and Correction Techniques", type: "document" }
                                ]
                            },
                            {
                                id: "folder-hamming-code",
                                title: "Hamming Code",
                                type: "folder",
                                items: [
                                    { id: "u2-hamming-working-principle", title: "Working Principle", type: "document" },
                                    { id: "u2-hamming-code-calculation", title: "Hamming Code Calculation", type: "document" },
                                    { id: "u2-hamming-detection-correction", title: "Error Detection and Correction Using Hamming Code", type: "document" },
                                    { id: "u2-hamming-numerical-problems", title: "Numerical Problems", type: "document" }
                                ]
                            },
                            {
                                id: "folder-crc",
                                title: "Cyclic Redundancy Check (CRC)",
                                type: "folder",
                                items: [
                                    { id: "u2-crc-intro", title: "Introduction to CRC", type: "document" },
                                    { id: "u2-crc-working-principle", title: "CRC Working Principle", type: "document" },
                                    { id: "u2-crc-generator-polynomial", title: "Generator Polynomial", type: "document" },
                                    { id: "u2-crc-binary-division", title: "CRC Calculation Using Binary Division", type: "document" },
                                    { id: "u2-crc-numerical-problems", title: "CRC Numerical Problems", type: "document" }
                                ]
                            }`;

const p1SubtopicIdsAddition = `,
                            "u2-intro-error-detection", "u2-intro-error-correction", "u2-redundancy-error-control",
                            "u2-hamming-distance", "u2-detection-vs-correction", "u2-error-techniques",
                            "u2-hamming-working-principle", "u2-hamming-code-calculation", "u2-hamming-detection-correction",
                            "u2-hamming-numerical-problems", "u2-crc-intro", "u2-crc-working-principle",
                            "u2-crc-generator-polynomial", "u2-crc-binary-division", "u2-crc-numerical-problems"`;

// --- 2. PART 2 UPDATE IN index.html ---
const p2SimplexAddition = `,
                            {
                                id: "folder-simplex-variations",
                                title: "Simplex Protocol and Its Variations",
                                type: "folder",
                                items: [
                                    { id: "u2-unrestricted-simplex", title: "Unrestricted Simplex Protocol", type: "document" },
                                    { id: "u2-simplex-stop-and-wait", title: "Simplex Stop-and-Wait Protocol", type: "document" },
                                    { id: "u2-simplex-noisy-channels", title: "Simplex Protocol for Noisy Channels", type: "document" }
                                ]
                            }`;

const p2SlidingAddition = `,
                            {
                                id: "folder-sliding-window",
                                title: "Sliding Window Protocols",
                                type: "folder",
                                items: [
                                    { id: "u2-sliding-window-intro", title: "Introduction to Sliding Window Protocol", type: "document" },
                                    { id: "u2-sender-receiver-window", title: "Sender Window and Receiver Window", type: "document" },
                                    { id: "u2-sliding-window-size", title: "Window Size", type: "document" },
                                    { id: "u2-sliding-window-working-principle", title: "Working Principle", type: "document" },
                                    { id: "u2-piggybacking", title: "Piggybacking", type: "document" },
                                    { id: "u2-sliding-window-vs-stop-and-wait", title: "Sliding Window vs Stop-and-Wait", type: "document" }
                                ]
                            }`;

const p2SubtopicIdsAddition = `,
                            "u2-unrestricted-simplex", "u2-simplex-stop-and-wait", "u2-simplex-noisy-channels",
                            "u2-sliding-window-intro", "u2-sender-receiver-window", "u2-sliding-window-size",
                            "u2-sliding-window-working-principle", "u2-piggybacking", "u2-sliding-window-vs-stop-and-wait"`;

// --- 3. PART 9 UPDATE IN index.html ---
const p9Addition = `,
                            {
                                id: "folder-bridge-applications",
                                title: "Uses and Applications of Bridges",
                                type: "folder",
                                items: [
                                    { id: "u2-bridges-purpose", title: "Purpose of Bridges", type: "document" },
                                    { id: "u2-bridges-network-segmentation", title: "Network Segmentation", type: "document" },
                                    { id: "u2-bridges-traffic-filtering", title: "Traffic Filtering", type: "document" },
                                    { id: "u2-bridges-connecting-lan-segments", title: "Connecting LAN Segments", type: "document" },
                                    { id: "u2-bridges-advantages-limitations", title: "Advantages and Limitations of Bridges", type: "document" }
                                ]
                            }`;

const p9SubtopicIdsAddition = `,
                            "u2-bridges-purpose", "u2-bridges-network-segmentation", "u2-bridges-traffic-filtering",
                            "u2-bridges-connecting-lan-segments", "u2-bridges-advantages-limitations"`;

// Apply Part 1 in index.html
const p1Target = /(\{\s*id:\s*"u2-error-control",\s*title:\s*"Error Control",\s*type:\s*"document"\s*\})\s*\]\s*,\s*subtopicIds:\s*\[([\s\S]*?"u2-error-control")\s*\]/m;
const p1Match = html.match(p1Target);
if (p1Match && !html.includes('folder-error-detection-codes')) {
  const replacement = p1Match[1] + p1Addition + '\n                        ],\n                        subtopicIds: [' + p1Match[2] + p1SubtopicIdsAddition + '\n                        ]';
  html = html.replace(p1Match[0], replacement);
  console.log('Part 1 updated in index.html');
} else {
  console.log('Part 1 target match check:', !!p1Match, 'already included:', html.includes('folder-error-detection-codes'));
}

// Apply Part 2 in index.html
const p2Target = /(\{\s*id:\s*"u2-protocol-classification",\s*title:\s*"Classification of Protocols",\s*type:\s*"document"\s*\})/m;
const p2Match = html.match(p2Target);
if (p2Match && !html.includes('folder-simplex-variations')) {
  html = html.replace(p2Match[0], p2Match[0] + p2SimplexAddition);
  console.log('Part 2 simplex added in index.html');
}

const p2SlidingTarget = /(\{\s*id:\s*"comparison-noiseless-noisy",\s*title:\s*"Comparison of Noiseless and Noisy Channel Protocols",\s*type:\s*"document"\s*\})/m;
const p2SlidingMatch = html.match(p2SlidingTarget);
if (p2SlidingMatch && !html.includes('folder-sliding-window')) {
  html = html.replace(p2SlidingMatch[0], p2SlidingAddition.slice(1) + ',\n                            ' + p2SlidingMatch[0]);
  console.log('Part 2 sliding window added in index.html');
}

// Add subtopicIds to Part 2
const p2SubIdsTarget = /(subtopicIds:\s*\[[\s\S]*?"comparison-arq-protocols")\s*\]/m;
const p2SubIdsMatch = html.match(p2SubIdsTarget);
if (p2SubIdsMatch && !html.includes('"u2-unrestricted-simplex"')) {
  html = html.replace(p2SubIdsMatch[0], p2SubIdsMatch[1] + p2SubtopicIdsAddition + '\n                        ]');
  console.log('Part 2 subtopicIds updated in index.html');
}

// Apply Part 9 in index.html
const p9Target = /(\{\s*id:\s*"u2-bridges-vs-switches",\s*title:\s*"Bridges vs Switches",\s*type:\s*"document"\s*\})\s*\]\s*,\s*subtopicIds:\s*\[([\s\S]*?"u2-bridges-vs-switches")\s*\]/m;
const p9Match = html.match(p9Target);
if (p9Match && !html.includes('folder-bridge-applications')) {
  const replacement = p9Match[1] + p9Addition + '\n                        ],\n                        subtopicIds: [' + p9Match[2] + p9SubtopicIdsAddition + '\n                        ]';
  html = html.replace(p9Match[0], replacement);
  console.log('Part 9 updated in index.html');
} else {
  console.log('Part 9 match check:', !!p9Match, 'already included:', html.includes('folder-bridge-applications'));
}

// Append 29 new IDs to top-level unit2 topicIds list in index.html
const newIdsArray = [
  "u2-intro-error-detection", "u2-intro-error-correction", "u2-redundancy-error-control",
  "u2-hamming-distance", "u2-detection-vs-correction", "u2-error-techniques",
  "u2-hamming-working-principle", "u2-hamming-code-calculation", "u2-hamming-detection-correction",
  "u2-hamming-numerical-problems", "u2-crc-intro", "u2-crc-working-principle",
  "u2-crc-generator-polynomial", "u2-crc-binary-division", "u2-crc-numerical-problems",
  "u2-unrestricted-simplex", "u2-simplex-stop-and-wait", "u2-simplex-noisy-channels",
  "u2-sliding-window-intro", "u2-sender-receiver-window", "u2-sliding-window-size",
  "u2-sliding-window-working-principle", "u2-piggybacking", "u2-sliding-window-vs-stop-and-wait",
  "u2-bridges-purpose", "u2-bridges-network-segmentation", "u2-bridges-traffic-filtering",
  "u2-bridges-connecting-lan-segments", "u2-bridges-advantages-limitations"
];

const topicIdsTarget = /("vlan"\s*\]\s*\}\s*,\s*\{\s*id:\s*"unit3")/m;
const topicIdsMatch = html.match(topicIdsTarget);
if (topicIdsMatch && !html.includes('"u2-bridges-advantages-limitations"')) {
  const formattedNewIds = newIdsArray.map(id => `                    "${id}"`).join(',\n');
  const replacement = ',\n' + formattedNewIds + '\n                ]\n            },\n            {\n                id: "unit3"';
  html = html.replace(topicIdsMatch[0], replacement);
  console.log('Top-level topicIds updated in index.html');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html update complete!');

