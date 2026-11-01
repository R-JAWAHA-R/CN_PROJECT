const fs = require('fs');
const path = require('path');

global.window = global;
global.document = {
  querySelectorAll: () => [],
  getElementById: () => null
};

require('../js/cleanDiagramEngine.js');
require('../js/topics_u3.js');
require('../js/topics_u3_extended.js');
const { TopicPageEngine } = require('../js/topicPages.js');

console.log('Testing TopicPageEngine rendering for all Unit 3 subtopics with local assets...');

const testIds = [
  // Topic 1
  'ip-addressing', 'ipv4', 'subnetting', 'ipv6', 'ipv4-vs-ipv6',
  // Topic 2
  'internetworking', 'internetwork-routing', 'tunneling',
  // Topic 3
  'optimality-principle', 'dijkstra', 'flooding',
  // Topic 4
  'distance-vector', 'link-state-routing', 'routing-table-updates', 'comparison-dv-ls', 'count-to-infinity',
  // Topic 5
  'traffic-aware-routing', 'admission-control', 'traffic-throttling', 'load-shedding',
  // Aliases
  'ipv4-protocol', 'ipv6-protocol', 'routing-design-issues', 'shortest-path-algorithm', 'distance-vector-routing', 'congestion-control'
];

let successCount = 0;
let failCount = 0;

for (const id of testIds) {
  try {
    const container = { innerHTML: "" };
    TopicPageEngine.renderTopicPage(id, container);
    const html = container.innerHTML;

    if (!html || html.length < 500) {
      throw new Error(`Output too short (${html ? html.length : 0} bytes)`);
    }

    if (!html.includes('assets/images/unit3/')) {
      throw new Error(`Does not contain local asset path!`);
    }

    const imgMatches = html.match(/assets\/images\/unit3\/[a-zA-Z0-9_\-\/]+\.svg/g) || [];
    const uniqueImgs = [...new Set(imgMatches)];

    console.log(`✓ [PASSED] ${id.padEnd(26)} | HTML: ${html.length.toString().padStart(6)} chars | Local Images: ${uniqueImgs.length} (${uniqueImgs.map(x => path.basename(x)).join(', ')})`);
    successCount++;
  } catch (err) {
    console.error(`✗ [FAILED] ${id}:`, err.message);
    failCount++;
  }
}

console.log(`\n========================================`);
console.log(`Results: ${successCount} passed, ${failCount} failed.`);
if (failCount === 0) {
  console.log('ALL 26 UNIT 3 TOPICS & SUBTOPICS RENDERED FLAWLESSLY WITH LOCAL ASSETS!');
} else {
  process.exit(1);
}
