const fs = require('fs');
const syllabus = require('../js/topics_u2_syllabus.js');

let np = syllabus['u2-numerical-problems'];
np.sections.overview = np.sections.overview.replace(/Numerical (\d+):/g, 'Problem $1:');

const outContent = `// topics_u2_syllabus.js - Master Academic Topic Content Repository for Unit 2
// Cleaned: All ASCII symbol art removed. Integrated complete Topic 2, Topic 3, Topic 4, Topic 5, Topic 6, Topic 7, & Topic 8 content.
var TOPICS_U2_SYLLABUS = ${JSON.stringify(syllabus, null, 2)};

if (typeof window !== 'undefined') window.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
if (typeof global !== 'undefined') global.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
if (typeof module !== 'undefined' && module.exports) module.exports = TOPICS_U2_SYLLABUS;
`;
fs.writeFileSync('js/topics_u2_syllabus.js', outContent, 'utf8');
console.log('Renamed to Problem 23-27 successfully!');

