const fs = require('fs');
global.window = global;
require('../js/conceptDatabase.js');
require('../js/topics_u2_syllabus.js');

const t = global.TOPICS_U2_SYLLABUS['u2-error-control'];
console.log('--- SECTIONS KEYS ---');
console.log(Object.keys(t.sections));

console.log('--- OVERVIEW SNIPPET ---');
console.log(String(t.sections.overview).slice(0, 200));

console.log('--- TECHNICAL DETAILS SNIPPET ---');
console.log(String(t.sections.technicalDetails).slice(0, 200));

console.log('--- WORKED EXAMPLES SNIPPET ---');
console.log(String(t.sections.workedExamples).slice(0, 200));

console.log('--- QUIZ SNIPPET ---');
console.log(JSON.stringify(t.sections.quiz, null, 2).slice(0, 300));

