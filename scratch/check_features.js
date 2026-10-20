const fs = require('fs');

console.log('=== CHECKING ALL ADVERTISED FEATURES ===');

// Check interactive laboratories in index.html, app.js, topicPages.js
const app = fs.readFileSync('js/app.js', 'utf8');
const index = fs.readFileSync('index.html', 'utf8');

console.log('\n--- Virtual Labs in app.js ---');
const labMatches = [...app.matchAll(/case ['"](lab-[a-zA-Z0-9_-]+)['"]:/g)].map(m => m[1]);
console.log('Labs handled in app.js:', labMatches);

const labMethods = [...app.matchAll(/function\s+([a-zA-Z0-9_]*lab[a-zA-Z0-9_]*)\s*\(/gi)].map(m => m[1]);
console.log('Lab methods in app.js:', labMethods);

// Let's check comparison tools in comparisons.js
const comp = require('../js/comparisons.js');
console.log('\n--- Comparisons in comparisons.js ---');
console.log('Keys/Exports in comparisons.js:', Object.keys(comp));

// Check learning paths in learningPaths.js
const lp = require('../js/learningPaths.js');
console.log('\n--- Learning Paths in learningPaths.js ---');
console.log('Keys/Exports in learningPaths.js:', Object.keys(lp));
if (lp.LEARNING_PATHS) {
    console.log('Learning paths count:', lp.LEARNING_PATHS.length);
    lp.LEARNING_PATHS.forEach(p => console.log(`  - ${p.title} (${p.topics?.length} topics)`));
}

// Check knowledgeGraph.js
const kg = require('../js/knowledgeGraph.js');
console.log('\n--- Knowledge Graph in knowledgeGraph.js ---');
console.log('Keys/Exports in knowledgeGraph.js:', Object.keys(kg));

// Check resources.js
const res = require('../js/resources.js');
console.log('\n--- Resources in resources.js ---');
console.log('RESOURCE_DATA count:', res.RESOURCE_DATA ? res.RESOURCE_DATA.length : 'none');

// Check quizzes.js
const q = require('../js/quizzes.js');
console.log('\n--- Quizzes in quizzes.js ---');
console.log('QUIZ_QUESTIONS count:', q.QUIZ_QUESTIONS ? q.QUIZ_QUESTIONS.length : 'none');
