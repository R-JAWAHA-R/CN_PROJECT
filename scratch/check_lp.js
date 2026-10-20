const lp = require('../js/learningPaths.js');
const u1 = require('../js/topics_u1.js');
const u2 = require('../js/topics_u2.js');
const u2Ext = require('../js/topics_u2_extended.js');
const u3 = require('../js/topics_u3.js');
const u3Ext = require('../js/topics_u3_extended.js');
const u4 = require('../js/topics_u4.js');
const u5 = require('../js/topics_u5.js');

const repo = Object.assign({}, u1.TOPICS_U1 || u1, u2.TOPICS_U2 || u2, u2Ext.TOPICS_U2_EXT || u2Ext, u3.TOPICS_U3 || u3, u3Ext.TOPICS_U3_EXT || u3Ext, u4.TOPICS_U4 || u4, u5.TOPICS_U5 || u5);

lp.LEARNING_PATHS.forEach(p => {
    console.log(`Checking path: ${p.title}`);
    p.steps.forEach(s => {
        if (!repo[s.conceptId]) {
            console.log(`  MISSING TOPIC ID: "${s.conceptId}" in step "${s.name}"`);
        }
    });
});
