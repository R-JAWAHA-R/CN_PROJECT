const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const startIdx = html.indexOf('const syllabusModules = [');
const endIdx = html.indexOf('function renderSidebar');
const jsCode = html.slice(startIdx, endIdx);
const match = jsCode.match(/const syllabusModules = (\[[\s\S]*\]);/);
if (match) {
  const parsed = (new Function('return ' + match[1]))();
  const u2 = parsed.find(m => m.id === 'unit2');
  console.log('Unit 2 chapters in index.html:', u2.chapters.length);
  u2.chapters.forEach((c, idx) => {
    console.log('[' + (idx+1) + '] ' + c.id + ' - ' + c.title + ' (items: ' + (c.items ? c.items.length : 0) + ')');
    if (c.items) {
      c.items.forEach(it => {
        if (it.type === 'folder') {
          console.log('   ├── [FOLDER] ' + it.id + ' - ' + it.title + ' (' + (it.items ? it.items.length : 0) + ')');
          it.items.forEach(s => console.log('   │   └── ' + s.id + ' - ' + s.title));
        } else {
          console.log('   └── ' + it.id + ' - ' + it.title);
        }
      });
    }
  });
}

