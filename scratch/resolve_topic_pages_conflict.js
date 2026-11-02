const fs = require('fs');

const content = fs.readFileSync('js/topicPages.js', 'utf8');

const headMarker = '<<<<<<< HEAD';
const midMarker = '=======';
const endMarker = '>>>>>>> origin/main';

const headIdx = content.indexOf(headMarker);
const midIdx = content.indexOf(midMarker);
const endIdx = content.indexOf(endMarker);

const headSection = content.substring(headIdx + headMarker.length, midIdx).trim();
const mainSection = content.substring(midIdx + midMarker.length, endIdx).trim();

const headObj = eval('({' + headSection + '})');
const mainObj = eval('({' + mainSection + '})');

const merged = { ...headObj };

// Merge in all Unit 3 topics from mainObj with unitId and unit
for (const [k, v] of Object.entries(mainObj)) {
  // If it's a Unit 3 topic from mainObj
  if (v.chapTitle && v.chapTitle.includes('Topic') && (
    v.chapTitle.includes('IP Addresses') ||
    v.chapTitle.includes('Internetworking') ||
    v.chapTitle.includes('Routing Algorithms') ||
    v.chapTitle.includes('Distance Vector') ||
    v.chapTitle.includes('Congestion Control')
  )) {
    merged[k] = {
      chapNum: v.chapNum,
      chapTitle: v.chapTitle,
      unitId: 'unit3',
      unit: 'Unit 3: Network Layer'
    };
  } else if (!merged[k]) {
    merged[k] = v;
  }
}

console.log('Total merged topics:', Object.keys(merged).length);

// Generate formatted code
const entries = Object.entries(merged).map(([key, val]) => {
  return `  "${key}": ${JSON.stringify(val, null, 4).replace(/\n/g, '\n  ')}`;
});

const mergedMapCode = 'const TOPIC_CHAPTER_MAP = {\n' + entries.join(',\n') + '\n};';

const beforeConflict = content.substring(0, content.lastIndexOf('const TOPIC_CHAPTER_MAP =', headIdx));
const afterConflict = content.substring(endIdx + endMarker.length);

// Let's remove any trailing `};\n` directly after endMarker if present
let cleanAfter = afterConflict;
if (cleanAfter.trim().startsWith('};')) {
  cleanAfter = cleanAfter.replace(/^\s*};\s*/, '\n');
}

const finalContent = beforeConflict + mergedMapCode + cleanAfter;

fs.writeFileSync('js/topicPages.js', finalContent, 'utf8');
console.log('Successfully resolved conflict in js/topicPages.js!');

