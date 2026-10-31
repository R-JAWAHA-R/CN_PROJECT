global.window = global;
const fs = require('fs');
eval(fs.readFileSync('js/unit2.js', 'utf8'));

function collectIds(items) {
  let ids = [];
  items.forEach(it => {
    if (it.items && it.items.length) {
      ids = ids.concat(collectIds(it.items));
    }
    if (it.id) {
      ids.push(it.id);
    }
  });
  return ids;
}

const allIds = collectIds(Unit2Module.hierarchy);
console.log('Total document/folder IDs in Unit2Module.hierarchy:', allIds.length);
const syllabus = require('../js/topics_u2_syllabus.js');
const missing = allIds.filter(id => !id.startsWith('topic-') && !id.startsWith('folder-') && !syllabus[id]);
console.log('Document IDs missing from syllabus:', missing);
