const fs = require('fs');
const path = require('path');

const topics = {};

// Helper to create topic
function addTopic(id, data) {
  topics[id] = {
    id: id,
    title: data.title,
    unit: "Unit 2 – Data Link Layer",
    unitId: "unit2",
    level: data.level || "Intermediate",
    category: "datalink",
    difficulty: data.difficulty || "Core",
    readingTime: data.readingTime || "15–25 min",
    standard: data.standard || "Forouzan / Tanenbaum Layer 2",
    oneLiner: data.oneLiner,
    quickAnswer: data.quickAnswer,
    whyItMatters: data.whyItMatters,
    prerequisitesList: data.prerequisitesList || [
      { concept: "OSI Layer 2", meaning: "Data Link Layer framing and link control" },
      { concept: "Node-to-Node Delivery", meaning: "Transfer of frames across a single hop" }
    ],
    learningObjectives: data.learningObjectives || [
      "Understand the theoretical foundations and protocol mechanics.",
      "Analyze the operational workflow with step-by-step traces.",
      "Evaluate performance trade-offs, advantages, and limitations."
    ],
    infobox: Object.assign({
      layer: "Layer 2 (Data Link Layer)",
      standard: "IEEE 802 / ISO 7498-1",
      type: "Core Protocol Concept",
      prerequisites: ["u2-dll-intro"],
      relatedConcepts: ["framing", "mac-address", "error-detection"],
      compareWith: [],
      primaryUses: ["Local Area Networks, Ethernet, Wi-Fi, Link Control"]
    }, data.infobox || {}),
    sections: {
      overview: data.overview,
      eli10: data.eli10 || `In simple words: ${data.oneLiner}`,
      analogy: data.analogy || `Think of this mechanism as a coordinator ensuring items are passed accurately across a physical boundary.`,
      howItWorks: data.howItWorks,
      diagram: data.diagram || `+-----------------------------------------+\n|      DATA LINK LAYER OPERATION          |\n+-----------------------------------------+`,
      technicalDetails: data.technicalDetails,
      workedExamples: data.workedExamples || {
        level1: `<strong>Question:</strong> What is the core principle of ${data.title}?<br><br><strong>Answer:</strong> ${data.quickAnswer}`,
        level2: `<strong>Analysis:</strong> Trace the protocol sequence during typical transmission conditions to observe how control signals and data frames interact.`,
        level3: `<strong>Edge Case:</strong> What happens if an error or collision occurs? The protocol detects the anomaly and executes its recovery or backoff routine.`
      },
      advantagesLimitations: data.advantagesLimitations || `
        <table class="wiki-table">
          <thead><tr><th>Aspect</th><th>Key Advantage</th><th>Trade-Off / Limitation</th></tr></thead>
          <tbody>
            <tr><td><strong>Efficiency</strong></td><td>Optimized for local link performance</td><td>Adds header and control overhead</td></tr>
            <tr><td><strong>Reliability</strong></td><td>Ensures bounded delivery behavior</td><td>Requires state tracking at communicating nodes</td></tr>
          </tbody>
        </table>`,
      whereUsed: data.whereUsed || [
        "Ethernet (IEEE 802.3) switches and network adapters.",
        "Wi-Fi (IEEE 802.11) wireless access points and clients.",
        "Data link protocol implementations in router operating systems."
      ],
      quiz: data.quiz || [
        {
          question: `What is the primary function of ${data.title}?`,
          options: [data.quickAnswer.slice(0, 60) + "...", "Routing packets across the global Internet", "Resolving domain names to IP addresses", "Encrypting application payloads"],
          correct: 0,
          explanation: `The primary role is: ${data.quickAnswer}`
        }
      ],
      references: [
        { cite: "Behrouz A. Forouzan, Data Communications and Networking, 4th Edition, Chapter 11–12.", url: "" },
        { cite: "Andrew S. Tanenbaum & David J. Wetherall, Computer Networks, 6th Edition, Chapter 3–4.", url: "" }
      ]
    }
  };
}

console.log("Script template initialized");

