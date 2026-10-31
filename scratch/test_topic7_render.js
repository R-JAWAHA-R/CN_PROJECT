const fs = require('fs');

global.window = {};
let engineCode = fs.readFileSync('js/cleanDiagramEngine.js', 'utf8');
engineCode += '\nglobal.CleanDiagramEngine = window.CleanDiagramEngine || CleanDiagramEngine;';
eval(engineCode);

const syllabusCode = fs.readFileSync('js/topics_u2_syllabus.js', 'utf8');
const vm = require('vm');
const sandbox = { window: {}, TOPICS_U2_SYLLABUS: {} };
vm.createContext(sandbox);
vm.runInContext(syllabusCode, sandbox);

const t7Slugs = [
  "wireless-lan-protocols",
  "u2-wireless-characteristics",
  "u2-wireless-lan-architecture",
  "u2-hidden-terminal-problem",
  "u2-exposed-terminal-problem",
  "u2-wireless-multiple-access",
  "u2-wireless-lan-access-methods",
  "u2-wireless-communication-challenges"
];

console.log('=== VERIFYING TOPIC 7 SUBTOPICS ===');
let hasError = false;

t7Slugs.forEach((slug, idx) => {
  const topic = sandbox.TOPICS_U2_SYLLABUS[slug];
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
const sq = sandbox.TOPICS_U2_SYLLABUS['u2-short-answer-questions'];
const lq = sandbox.TOPICS_U2_SYLLABUS['u2-long-answer-questions'];
const mcqs = sandbox.TOPICS_U2_SYLLABUS['u2-mcqs'];

const sqMatches = sq.sections.overview.match(/Q\d+\./g) || [];
const lqMatches = lq.sections.overview.match(/Q\d+\./g) || [];
const mcqCount = mcqs.sections.quiz ? mcqs.sections.quiz.length : 0;

console.log(`Short-Answer Questions count: ${sqMatches.length} (Expected >= 77)`);
console.log(`Long-Answer Questions count: ${lqMatches.length} (Expected >= 23)`);
console.log(`Practice MCQs count: ${mcqCount} (Expected >= 70)`);

if (sqMatches.length < 77 || lqMatches.length < 23 || mcqCount < 70) {
  console.error('FAIL: Assessment question counts below expectations!');
  hasError = true;
} else {
  console.log('[PASS] Assessment questions fully verified!');
}

if (!hasError) {
  console.log('\n🎉 ALL CHECKS PASSED PERFECTLY FOR UNIT 2 TOPIC 7!');
} else {
  process.exit(1);
}

