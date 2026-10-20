const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Parse syllabusModules from index.html
const startIdx = indexHtml.indexOf('const syllabusModules = [');
const endIdx = indexHtml.indexOf('let activeTopicId =');
const syllabusCode = indexHtml.slice(startIdx, endIdx);
let syllabusModules;
eval(syllabusCode.replace('const syllabusModules =', 'syllabusModules ='));

console.log('=== SYLLABUS TOPIC AUDIT ===');
const allSyllabusTopics = [];
syllabusModules.forEach(mod => {
    let ids = [];
    if (mod.topicIds) ids = mod.topicIds;
    else if (mod.chapters) {
        mod.chapters.forEach(ch => {
            if (ch.subtopicIds) ids.push(...ch.subtopicIds);
        });
    }
    console.log(`\n${mod.id} (${mod.module}): ${ids.length} topics`);
    console.log(ids);
    allSyllabusTopics.push(...ids);
});

console.log(`\nTotal syllabus topics: ${allSyllabusTopics.length}`);

// Check topic availability in TOPIC_REPOSITORY (after loading all topic scripts)
const u1 = require('../js/topics_u1.js');
const u2 = require('../js/topics_u2.js');
const u2Ext = require('../js/topics_u2_extended.js');
const u3 = require('../js/topics_u3.js');
const u3Ext = require('../js/topics_u3_extended.js');
const u4 = require('../js/topics_u4.js');
const u5 = require('../js/topics_u5.js');

const repo = Object.assign(
    {},
    u1.TOPICS_U1 || u1,
    u2.TOPICS_U2 || u2,
    u2Ext.TOPICS_U2_EXT || u2Ext,
    u3.TOPICS_U3 || u3,
    u3Ext.TOPICS_U3_EXT || u3Ext,
    u4.TOPICS_U4 || u4,
    u5.TOPICS_U5 || u5
);

console.log(`\nTotal unique keys in combined TOPIC_REPOSITORY: ${Object.keys(repo).length}`);

const missingInRepo = allSyllabusTopics.filter(id => !repo[id]);
console.log('Syllabus topics missing in TOPIC_REPOSITORY:', missingInRepo);

const unusedInRepo = Object.keys(repo).filter(id => !allSyllabusTopics.includes(id));
console.log('Topic repository keys NOT in syllabus:', unusedInRepo);

// Check if any syllabus topic has empty or broken sections
const brokenSections = [];
allSyllabusTopics.forEach(id => {
    const t = repo[id];
    if (t) {
        if (!t.title) brokenSections.push({ id, reason: 'Missing title' });
        if (!t.sections) brokenSections.push({ id, reason: 'Missing sections' });
    }
});
console.log('Broken syllabus topics:', brokenSections);
