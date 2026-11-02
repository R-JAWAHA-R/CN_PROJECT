const fs = require('fs');
global.window = global;
require('../js/conceptDatabase.js');
require('../js/topics_u2_syllabus.js');

const t = global.TOPICS_U2_SYLLABUS['u2-error-control'];
console.log('workedExamples is Array?', Array.isArray(t.sections.workedExamples));
console.log('workedExamples:', JSON.stringify(t.sections.workedExamples, null, 2));
console.log('references:', t.sections.references);

