// test_topic10_render.js
global.window = global;
global.document = {
  querySelectorAll: () => [],
  getElementById: () => null
};

require('../js/cleanDiagramEngine.js');
const { TopicPageEngine, TOPIC_REPOSITORY } = require('../js/topicPages.js');
require('../js/topics_u1.js');
require('../js/topics_u2.js');
require('../js/topics_u2_extended.js');
require('../js/topics_u2_syllabus.js');

const t10_subtopics = [
  { id: "network-devices", title: "Introduction to Networking Devices" },
  { id: "u2-networking-device-repeaters", title: "Repeaters" },
  { id: "u2-networking-device-hubs", title: "Hubs" },
  { id: "u2-networking-device-bridges", title: "Bridges" },
  { id: "u2-networking-device-switches", title: "Switches" },
  { id: "u2-networking-device-routers", title: "Routers" },
  { id: "u2-networking-device-gateways", title: "Gateways" },
  { id: "u2-device-working-principles", title: "Working Principles of Each Networking Device" },
  { id: "u2-comparison-networking-devices", title: "Comparison of Networking Devices" },
  { id: "u2-device-osi-layers", title: "OSI Layers at Which Networking Devices Operate" }
];

console.log("=== VERIFYING TOPIC 10 SUBTOPICS ===");
let allPassed = true;

t10_subtopics.forEach((sub, idx) => {
  const container = { innerHTML: "" };
  try {
    TopicPageEngine.renderTopicPage(sub.id, container);
    const html = container.innerHTML;
    const hasAscii = html.includes('+--') || html.includes('|---') || html.includes('+===');
    const hasImg = html.includes('<img src=');
    const hasCleanCard = html.includes('clean-diagram-card');

    if (html.length < 5000 || hasAscii || !hasImg || !hasCleanCard) {
      console.error(`[FAIL] ${sub.id}: len=${html.length}, ascii=${hasAscii}, img=${hasImg}, clean=${hasCleanCard}`);
      allPassed = false;
    } else {
      console.log(`[PASS] Subtopic ${idx + 1}: "${sub.title}" (${sub.id})`);
      console.log(`       Length: ${html.length} chars | Clean Diagram: YES | Image: YES | Zero ASCII: YES`);
    }
  } catch (e) {
    console.error(`[CRASH] ${sub.id}: ${e.message}`);
    allPassed = false;
  }
});

console.log("\n=== VERIFYING TOPIC 11 REVISION & ASSESSMENT ENRICHMENT ===");
const u2 = TOPIC_REPOSITORY;
const shortText = u2['u2-short-answer-questions'].sections.overview;
const longText = u2['u2-long-answer-questions'].sections.overview;
const mcqCount = u2['u2-mcqs'].sections.quiz.length;
const numOverview = u2['u2-numerical-problems'].sections.overview;
const numProblems = [...new Set(numOverview.match(/Problem\s+\d+/g))].length;

const hasQ103 = shortText.includes('Q103. Define a repeater.');
const hasQ112 = shortText.includes('Q112. What is the function of a default gateway?');
const hasQ38 = longText.includes('Q38. Explain the working principles');
const hasQ41 = longText.includes('Q41. Explain the roles of networking devices');

console.log(`Short-Answer Questions Q103-Q112 present: ${hasQ103 && hasQ112}`);
console.log(`Long-Answer Questions Q38-Q41 present: ${hasQ38 && hasQ41}`);
console.log(`Practice MCQs total count: ${mcqCount} (Expected >= 115)`);
console.log(`Worked Numerical Problems: ${numProblems} (Expected >= 36)`);

if (!allPassed || !hasQ103 || !hasQ112 || !hasQ38 || !hasQ41 || mcqCount < 115 || numProblems < 36) {
  console.error("❌ SOME CHECKS FAILED!");
  process.exit(1);
} else {
  console.log("\n🎉 ALL CHECKS PASSED PERFECTLY FOR UNIT 2 TOPIC 10 & REVISION ASSESSMENTS!");
}
