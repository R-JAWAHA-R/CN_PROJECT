const fs = require('fs');

const u2 = require('../js/topics_u2_syllabus.js');

const header = '// Unit 2 Comprehensive Syllabus Topics Repository\nvar TOPICS_U2_SYLLABUS = ' + JSON.stringify(u2, null, 2) + ';\n\n';

const footer = `if (typeof TOPICS_U2 !== 'undefined') {
  Object.assign(TOPICS_U2, TOPICS_U2_SYLLABUS);
}
if (typeof window !== 'undefined') {
  if (window.TOPICS_U2) {
    Object.assign(window.TOPICS_U2, TOPICS_U2_SYLLABUS);
  } else {
    window.TOPICS_U2 = Object.assign({}, TOPICS_U2_SYLLABUS);
  }
  window.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
}
if (typeof global !== 'undefined') {
  if (global.TOPICS_U2) {
    Object.assign(global.TOPICS_U2, TOPICS_U2_SYLLABUS);
  } else {
    global.TOPICS_U2 = Object.assign({}, TOPICS_U2_SYLLABUS);
  }
  global.TOPICS_U2_SYLLABUS = TOPICS_U2_SYLLABUS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TOPICS_U2_SYLLABUS;
}
`;

fs.writeFileSync('js/topics_u2_syllabus.js', header + footer, 'utf8');
console.log('Updated topics_u2_syllabus.js with universal global & window exports');

