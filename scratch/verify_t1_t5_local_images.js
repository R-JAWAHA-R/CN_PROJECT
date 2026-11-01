// scratch/verify_t1_t5_local_images.js
const fs = require('fs');
const path = require('path');

global.window = global;
global.document = {
  querySelectorAll: () => [],
  getElementById: () => null
};

require('../js/cleanDiagramEngine.js');
require('../js/topics_u1.js');
require('../js/topics_u2.js');
require('../js/topics_u2_extended.js');
require('../js/topics_u2_syllabus.js');
const { TopicPageEngine, TOPIC_REPOSITORY } = require('../js/topicPages.js');
require('../js/unit2.js');

const topicsToCheck = [
  // Topic 1
  'u2-dll-intro','u2-dll-osi-position','u2-dll-functions','dll-design-issues','u2-dll-services','framing','flow-control','u2-error-control',
  // Topic 2
  'u2-dll-protocols-intro','u2-protocol-classification','simplex-protocol','stop-and-wait-noiseless','stop-and-wait','go-back-n','selective-repeat','comparison-noiseless-noisy','comparison-arq-protocols',
  // Topic 3
  'u2-mac-sublayer-intro','u2-need-for-mac-sublayer','u2-mac-functions-responsibilities','channel-allocation','u2-fdma','u2-tdma','u2-dynamic-channel-allocation','u2-static-vs-dynamic-channel-allocation',
  // Topic 4
  'u2-multiple-access-intro','u2-random-access-protocols','u2-pure-aloha','u2-slotted-aloha','u2-csma-1-persistent','u2-csma-non-persistent','u2-csma-p-persistent','u2-csma-cd','u2-csma-ca','u2-comparison-multiple-access',
  // Topic 5
  'u2-collision-free-intro','u2-bit-map-protocol','u2-binary-countdown-protocol','u2-token-passing-protocol','u2-collision-free-working-principles','u2-comparison-collision-free'
];

console.log(`=== AUDITING ${topicsToCheck.length} SUBTOPICS IN TOPICS 1 TO 5 ===\n`);

let passedCount = 0;
let failedCount = 0;

topicsToCheck.forEach((id, idx) => {
  const container = { innerHTML: "" };
  try {
    TopicPageEngine.renderTopicPage(id, container);
    const html = container.innerHTML;

    // 1. Extract all img tags
    const imgMatches = [];
    const re = /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/g;
    let m;
    while ((m = re.exec(html)) !== null) {
      imgMatches.push(m[1]);
    }

    // 2. Check if all images exist locally on disk
    let allLocalAndExist = true;
    let missingOrRemote = [];
    imgMatches.forEach(src => {
      if (src.startsWith('http://') || src.startsWith('https://')) {
        // remote
        allLocalAndExist = false;
        missingOrRemote.push(`REMOTE: ${src}`);
      } else {
        const localPath = path.join(__dirname, '..', src);
        if (!fs.existsSync(localPath)) {
          allLocalAndExist = false;
          missingOrRemote.push(`MISSING FILE: ${src}`);
        }
      }
    });

    // 3. ASCII check
    const hasAscii = html.includes('+--') || html.includes('|---') || html.includes('+===');

    if (imgMatches.length === 0) {
      console.error(`[FAIL] ${id}: No images found in rendered page!`);
      failedCount++;
    } else if (!allLocalAndExist) {
      console.error(`[FAIL] ${id}: Has invalid/remote images: ${missingOrRemote.join(', ')}`);
      failedCount++;
    } else if (hasAscii) {
      console.error(`[FAIL] ${id}: Contains ASCII box art!`);
      failedCount++;
    } else {
      console.log(`[PASS] (${idx + 1}/${topicsToCheck.length}) ${id}`);
      console.log(`       Images: ${imgMatches.length} local files | All exist on disk: YES | Zero ASCII: YES`);
      imgMatches.forEach(img => console.log(`         -> ${img}`));
      passedCount++;
    }
  } catch (err) {
    console.error(`[CRASH] ${id}: ${err.message}`);
    failedCount++;
  }
});

console.log(`\n=== SUMMARY ===`);
console.log(`Passed: ${passedCount} / ${topicsToCheck.length}`);
console.log(`Failed: ${failedCount} / ${topicsToCheck.length}`);

if (failedCount > 0) {
  process.exit(1);
} else {
  console.log(`\n🎉 ALL 41 SUBTOPICS IN TOPICS 1-5 HAVE VALID LOCAL ASSETS!`);
}
