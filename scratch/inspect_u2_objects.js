global.window = global;
require('../js/topics_u2.js');
require('../js/topics_u2_extended.js');
require('../js/topics_u2_syllabus.js');

console.log('TOPICS_U2 keys:', Object.keys(global.TOPICS_U2 || {}));
console.log('TOPICS_U2_EXT keys:', Object.keys(global.TOPICS_U2_EXT || {}));
console.log('TOPICS_U2_SYLLABUS keys count:', Object.keys(global.TOPICS_U2_SYLLABUS || {}).length);
console.log('Sample TOPICS_U2_SYLLABUS keys:', Object.keys(global.TOPICS_U2_SYLLABUS || {}).slice(0, 15));

