const fs = require('fs');

global.window = {};
let engineCode = fs.readFileSync('js/cleanDiagramEngine.js', 'utf8');
engineCode += '\nglobal.CleanDiagramEngine = window.CleanDiagramEngine || CleanDiagramEngine;';
eval(engineCode);

const syllabus = require('../js/topics_u2_syllabus.js');

const t8Slugs = [
  "wifi-mac-sublayer",
  "u2-ieee-802-11-architecture",
  "u2-ieee-802-11-dcf",
  "u2-ieee-802-11-pcf",
  "u2-ieee-802-11-csma-ca",
  "u2-ieee-802-11-ifs",
  "u2-rts-cts-mechanism",
  "u2-network-allocation-vector",
  "u2-ieee-802-11-frame-formats",
  "u2-dcf-vs-pcf"
];

console.log('=== VERIFYING TOPIC 8 SUBTOPICS ===');
let hasError = false;

t8Slugs.forEach((slug, idx) => {
  const topic = syllabus[slug];
  if (!topic) {
    console.error(`FAIL: Slug "${slug}" not found in TOPICS_U2_SYLLABUS!`);
    hasError = true;
    return;
  }

  const diagramHtml = CleanDiagramEngine.getDiagramHtml(topic);
  if (!diagramHtml || diagramHtml.length < 50) {
    console.error(`FAIL: Slug "${slug}" produced empty or tiny diagram HTML!`);
    hasError = true;
  }

  const combinedContent = (topic.sections.overview || '') +
                          (topic.sections.howItWorks || '') +
                          (topic.sections.technicalDetails || '') +
                          diagramHtml;

  if (/\+[-=]{4,}\+/.test(combinedContent)) {
    console.error(`FAIL: ASCII art (+----+ or +====+) detected in slug "${slug}"!`);
    hasError = true;
  }

  console.log(`[PASS] Subtopic ${idx + 1}: "${topic.title}" (${slug})`);
  console.log(`       Overview length: ${topic.sections.overview.length} chars | Diagram length: ${diagramHtml.length} chars`);
  console.log(`       Image: ${topic.sections.imageUrl ? 'YES' : 'NO'} | Caption: ${topic.sections.imageCaption ? 'YES' : 'NO'}`);
});

console.log('\n=== VERIFYING TOPIC 11 REVISION & ASSESSMENT ENRICHMENT ===');
const np = syllabus['u2-numerical-problems'];
const sq = syllabus['u2-short-answer-questions'];
const lq = syllabus['u2-long-answer-questions'];
const mcqs = syllabus['u2-mcqs'];

const npMatches = np.sections.overview.match(/Problem \d+:/g) || [];
const sqMatches = sq.sections.overview.match(/Q\d+\./g) || [];
const lqMatches = lq.sections.overview.match(/Q\d+\./g) || [];
const mcqCount = mcqs.sections.quiz ? mcqs.sections.quiz.length : 0;

console.log(`Numerical Problems count: ${npMatches.length} (Expected >= 27)`);
console.log(`Short-Answer Questions count: ${sqMatches.length} (Expected >= 92)`);
console.log(`Long-Answer Questions count: ${lqMatches.length} (Expected >= 31)`);
console.log(`Practice MCQs count: ${mcqCount} (Expected >= 85)`);

if (npMatches.length < 27 || sqMatches.length < 92 || lqMatches.length < 31 || mcqCount < 85) {
  console.error('FAIL: Assessment question counts below expectations!');
  hasError = true;
} else {
  console.log('[PASS] Assessment questions fully verified!');
}

if (!hasError) {
  console.log('\n🎉 ALL CHECKS PASSED PERFECTLY FOR UNIT 2 TOPIC 8!');
} else {
  process.exit(1);
}
