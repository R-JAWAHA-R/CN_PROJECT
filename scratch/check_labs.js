const fs = require('fs');

const tp = fs.readFileSync('js/topicPages.js', 'utf8');

const matches = [...tp.matchAll(/if\s*\(\s*labKey\s*===\s*['"]([^'"]+)['"]\s*\)/g)].map(m => m[1]);
console.log('Interactive labs supported in getLabEmbedHtml:', matches);

// Check which topics define interactiveLabKey
const u1 = require('../js/topics_u1.js');
const u2 = require('../js/topics_u2.js');
const u2Ext = require('../js/topics_u2_extended.js');
const u3 = require('../js/topics_u3.js');
const u3Ext = require('../js/topics_u3_extended.js');
const u4 = require('../js/topics_u4.js');
const u5 = require('../js/topics_u5.js');

const repo = Object.assign({}, u1.TOPICS_U1 || u1, u2.TOPICS_U2 || u2, u2Ext.TOPICS_U2_EXT || u2Ext, u3.TOPICS_U3 || u3, u3Ext.TOPICS_U3_EXT || u3Ext, u4.TOPICS_U4 || u4, u5.TOPICS_U5 || u5);

const topicsWithLab = [];
Object.entries(repo).forEach(([id, t]) => {
    if (t.sections?.interactiveLabKey) {
        topicsWithLab.push({ id, title: t.title, labKey: t.sections.interactiveLabKey });
    }
});

console.log('\nTopics defining interactiveLabKey:', topicsWithLab);
