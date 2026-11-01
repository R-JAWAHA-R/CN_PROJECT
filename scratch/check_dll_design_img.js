global.window = global;
global.document = { querySelectorAll: () => [], getElementById: () => null };
require('../js/cleanDiagramEngine.js');
require('../js/topics_u1.js');
require('../js/topics_u2.js');
require('../js/topics_u2_extended.js');
require('../js/topics_u2_syllabus.js');
const { TopicPageEngine } = require('../js/topicPages.js');

const topic = global.TOPIC_REPOSITORY['dll-design-issues'];
console.log('topic.image:', topic.image);
console.log('topic.architectureDiagram:', !!topic.architectureDiagram);
