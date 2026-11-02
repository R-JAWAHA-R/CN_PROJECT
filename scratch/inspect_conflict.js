const fs = require('fs');
const content = fs.readFileSync('js/topicPages.js', 'utf8');

const headMarker = '<<<<<<< HEAD';
const midMarker = '=======';
const endMarker = '>>>>>>> origin/main';

const headIdx = content.indexOf(headMarker);
const midIdx = content.indexOf(midMarker);
const endIdx = content.indexOf(endMarker);

console.log('Markers found at:', { headIdx, midIdx, endIdx });

const headSection = content.substring(headIdx + headMarker.length, midIdx).trim();
const mainSection = content.substring(midIdx + midMarker.length, endIdx).trim();

// Parse objects
const headObj = eval('({' + headSection + '})');
const mainObj = eval('({' + mainSection + '})');

console.log('headObj key count:', Object.keys(headObj).length);
console.log('mainObj key count:', Object.keys(mainObj).length);

const keysInMainNotHead = Object.keys(mainObj).filter(k => !headObj[k]);
console.log('Keys in main not in head:', keysInMainNotHead);

