const fs = require('fs');
global.window = global;
require('../js/conceptDatabase.js');
require('../js/topics_u2_syllabus.js');

const t = global.TOPICS_U2_SYLLABUS['u2-error-control'];
console.log('Keys of u2-error-control:', Object.keys(t));
console.log('Title:', t.title);
console.log('Summary:', t.oneLiner);
console.log('Sections length:', (t.sections||[]).length);
console.log('Worked examples length:', (t.workedExamples||[]).length);
console.log('Practice questions:', (t.practiceQuestions||[]).length);

