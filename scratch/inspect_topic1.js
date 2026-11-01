global.window = global;
global.document = { querySelectorAll: () => [], getElementById: () => null };
require('../js/cleanDiagramEngine.js');
require('../js/topics_u1.js');
require('../js/topics_u2.js');
require('../js/topics_u2_extended.js');
require('../js/topics_u2_syllabus.js');
const { TopicPageEngine } = require('../js/topicPages.js');

const t1_keys = [
  "u2-dll-intro",
  "u2-dll-osi-position",
  "u2-dll-functions",
  "u2-dll-services",
  "u2-framing",
  "u2-flow-control",
  "u2-error-control",
  "u2-dll-design-issues"
];

t1_keys.forEach(k => {
  const container = { innerHTML: "" };
  TopicPageEngine.renderTopicPage(k, container);
  const s = container.innerHTML;
  const hasAscii = s.includes('+--') || s.includes('|---') || s.includes('+===');
  const hasImg = s.includes('<img');
  const hasCleanCard = s.includes('clean-diagram-card');
  console.log(k, "hasAscii:", hasAscii, "hasImg:", hasImg, "hasCleanCard:", hasCleanCard);
  
  // Find where diagram is
  const idx = s.indexOf('id="sec-diagram"');
  if (idx !== -1) {
    const section = s.slice(idx, idx + 1200);
    console.log("--- Section snippet for " + k + " ---");
    console.log(section.slice(0, 400));
  }
});

