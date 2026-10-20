const fs = require('fs');
const path = require('path');

console.log('=== EXTENDED AUDIT ===');

// Load all topic files
function safeRequire(filePath) {
    const code = fs.readFileSync(filePath, 'utf8');
    const exports = {};
    const module = { exports };
    const window = {};
    const context = { window, module, exports, console };
    try {
        const vm = require('vm');
        vm.runInNewContext(code, context);
        return { ...window, ...module.exports, ...exports, globalScope: context };
    } catch (e) {
        console.error(`Error loading ${filePath}:`, e.message);
        return {};
    }
}

const u1 = safeRequire('js/topics_u1.js');
const u2 = safeRequire('js/topics_u2.js');
const u2Ext = safeRequire('js/topics_u2_extended.js');
const u3 = safeRequire('js/topics_u3.js');
const u3Ext = safeRequire('js/topics_u3_extended.js');
const u4 = safeRequire('js/topics_u4.js');
const u5 = safeRequire('js/topics_u5.js');
const topicPages = safeRequire('js/topicPages.js');

const objU1 = u1.TOPICS_U1 || u1.globalScope?.TOPICS_U1 || {};
const objU2 = u2.TOPICS_U2 || u2.globalScope?.TOPICS_U2 || {};
const objU2Ext = u2Ext.TOPICS_U2_EXT || u2Ext.globalScope?.TOPICS_U2_EXT || {};
const objU3 = u3.TOPICS_U3 || u3.globalScope?.TOPICS_U3 || {};
const objU3Ext = u3Ext.TOPICS_U3_EXT || u3Ext.globalScope?.TOPICS_U3_EXT || {};
const objU4 = u4.TOPICS_U4 || u4.globalScope?.TOPICS_U4 || {};
const objU5 = u5.TOPICS_U5 || u5.globalScope?.TOPICS_U5 || {};

console.log('TOPICS_U1 keys count:', Object.keys(objU1).length);
console.log('TOPICS_U2 keys count:', Object.keys(objU2).length);
console.log('TOPICS_U2_EXT keys count:', Object.keys(objU2Ext).length);
console.log('TOPICS_U3 keys count:', Object.keys(objU3).length);
console.log('TOPICS_U3_EXT keys count:', Object.keys(objU3Ext).length);
console.log('TOPICS_U4 keys count:', Object.keys(objU4).length);
console.log('TOPICS_U5 keys count:', Object.keys(objU5).length);

// Check merge in topicPages.js
console.log('\n--- Checking topicPages.js merge and collisions ---');
// Let's see how topicPages combines topics:
const tpCode = fs.readFileSync('js/topicPages.js', 'utf8');
const mergeLines = tpCode.split('\n').filter(l => l.includes('Object.assign') || l.includes('TOPICS_') || l.includes('TOPIC_PAGES'));
console.log('topicPages merge lines:', mergeLines.slice(0, 10));

// Check overlap between TOPICS_U3 and TOPICS_U3_EXT
const u3Keys = Object.keys(objU3);
const u3ExtKeys = Object.keys(objU3Ext);
const u3Overlap = u3Keys.filter(k => u3ExtKeys.includes(k));
console.log('\nu3Keys:', u3Keys);
console.log('u3ExtKeys:', u3ExtKeys);
console.log('Overlap between U3 and U3_EXT:', u3Overlap);

// Check if u3Ext has repeated keys in its source code:
const u3ExtRaw = fs.readFileSync('js/topics_u3_extended.js', 'utf8');
const topKeyMatches = [...u3ExtRaw.matchAll(/\n\s*["']?([a-zA-Z0-9_-]+)["']?\s*:\s*\{/g)].map(m => m[1]);
console.log('\ntopKeyMatches count:', topKeyMatches.length);
const keyCountMap = {};
topKeyMatches.forEach(k => { keyCountMap[k] = (keyCountMap[k] || 0) + 1; });
const actualDupes = Object.entries(keyCountMap).filter(([k, count]) => count > 1 && !['infobox', 'sections', 'compareWith', 'practice'].includes(k));
console.log('Repeated topic keys in topics_u3_extended.js source:', actualDupes);

