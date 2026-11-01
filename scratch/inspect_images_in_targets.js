// scratch/inspect_images_in_targets.js
const fs = require('fs');

function inspectKey(file, key) {
  const content = fs.readFileSync('js/' + file, 'utf8');
  const idx = content.indexOf(`"${key}":`);
  if (idx === -1) {
    console.log(file, key, 'NOT FOUND');
    return;
  }
  const slice = content.slice(idx, idx + 2000);
  const imgUrlMatch = slice.match(/imageUrl["']?\s*:\s*["']([^"']*)["']/);
  const imgCapMatch = slice.match(/imageCaption["']?\s*:\s*["']([^"']*)["']/);
  console.log(file, key, ':');
  console.log('  imageUrl:', imgUrlMatch ? imgUrlMatch[1] : 'NONE');
  console.log('  imageCaption:', imgCapMatch ? imgCapMatch[1] : 'NONE');
}

inspectKey('topics_u2.js', 'framing');
inspectKey('topics_u2.js', 'flow-control');
inspectKey('topics_u2_extended.js', 'dll-design-issues');
inspectKey('topics_u2_syllabus.js', 'u2-dll-intro');
inspectKey('topics_u2_syllabus.js', 'stop-and-wait');
inspectKey('topics_u2_syllabus.js', 'u2-pure-aloha');
inspectKey('topics_u2_syllabus.js', 'u2-bit-map-protocol');
