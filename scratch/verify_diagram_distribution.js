const fs = require('fs');
const path = require('path');
const vm = require('vm');

const sandbox = { window: {}, console: console };
sandbox.window = sandbox;
vm.createContext(sandbox);

// Load all topic repositories
['topics_u1.js', 'topics_u2.js', 'topics_u2_extended.js', 'topics_u2_syllabus.js', 'topics_u2_additional.js', 'topics_u3.js', 'topics_u3_extended.js', 'topics_u4.js', 'topics_u5.js'].forEach(f => {
  if (fs.existsSync('js/' + f)) {
    vm.runInContext(fs.readFileSync('js/' + f, 'utf8'), sandbox);
  }
});

vm.runInContext(fs.readFileSync('js/topicPages.js', 'utf8'), sandbox);
vm.runInContext(fs.readFileSync('js/cleanDiagramEngine.js', 'utf8'), sandbox);

const repo = sandbox.TOPIC_REPOSITORY;
const totalTopics = Object.keys(repo).length;
console.log(`Total topics in TOPIC_REPOSITORY: ${totalTopics}`);

let nodeToNodeCount = 0;
const nodeToNodeTopics = [];
const unitsSummary = {};

Object.keys(repo).forEach(id => {
  const t = repo[id];
  const u = t.unitId || t.unit || 'unknown';
  if (!unitsSummary[u]) {
    unitsSummary[u] = { total: 0, withImg: 0, nodeToNode: 0, specificCleanDiag: 0 };
  }
  unitsSummary[u].total++;

  if (t.imageUrl) {
    unitsSummary[u].withImg++;
    // Verify file exists on disk
    const imgFile = path.join(__dirname, '..', t.imageUrl);
    if (!fs.existsSync(imgFile)) {
      console.error(`  ERROR: Missing image file on disk: ${t.imageUrl} (topic ${id})`);
    }
  }

  const cleanDiag = sandbox.CleanDiagramEngine.getDiagramHtml(t);
  if (cleanDiag.includes('Data Link Layer: Node-to-Node Frame Delivery')) {
    nodeToNodeCount++;
    unitsSummary[u].nodeToNode++;
    nodeToNodeTopics.push({ id, title: t.title, unit: u });
  } else if (cleanDiag) {
    unitsSummary[u].specificCleanDiag++;
  }
});

console.log("\n--- Units Summary ---");
console.table(unitsSummary);

console.log(`\nTopics still receiving "Data Link Layer: Node-to-Node Frame Delivery": ${nodeToNodeCount}`);
nodeToNodeTopics.forEach(x => {
  console.log(`  - [${x.unit}] ${x.id}: ${x.title}`);
});

// Check if any subtopic in Unit 1, Unit 3, Unit 4, Unit 5 gets Node-to-Node
const badUnits = nodeToNodeTopics.filter(x => x.unit !== 'unit2' && x.unit !== 'Unit 2 – Data Link Layer' && x.unit !== 'Unit II: Data Link Layer & MAC Sublayer');
if (badUnits.length === 0) {
  console.log("\nSUCCESS: ZERO topics in Unit 1, Unit 3, Unit 4, or Unit 5 receive the L2 Node-to-Node diagram!");
} else {
  console.error("\nFAIL: Found unexpected topics receiving L2 Node-to-Node:", badUnits);
}

// Check that only overarching DLL overview topics in Unit 2 receive it
const validOverviewIds = ['data-link-layer', 'u2-dll-intro', 'u2-dll-osi-position', 'u2-dll-overview'];
const invalidU2Topics = nodeToNodeTopics.filter(x => !validOverviewIds.includes(x.id));
if (invalidU2Topics.length === 0) {
  console.log("SUCCESS: In Unit 2, ONLY the overarching Data Link Layer overview topics receive the Node-to-Node diagram!");
} else {
  console.error("FAIL: Unexpected Unit 2 subtopics still receiving Node-to-Node diagram:", invalidU2Topics);
}

