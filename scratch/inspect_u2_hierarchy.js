const path = require('path');
require(path.join(__dirname, '../js/unit2.js'));
const u2 = global.Unit2Module;
console.log('Unit 2 hierarchy parts count:', u2.hierarchy.length);
u2.hierarchy.forEach((h, i) => {
  console.log('[' + (i+1) + '] ' + h.id + ' - ' + h.title + ' (items: ' + (h.items ? h.items.length : 0) + ')');
  if (h.items) {
    h.items.forEach(it => {
      if (it.type === 'folder') {
        console.log('   ├── [FOLDER] ' + it.id + ' - ' + it.title + ' (' + (it.items ? it.items.length : 0) + ' items)');
        it.items.forEach(sub => console.log('   │   └── ' + sub.id + ' - ' + sub.title));
      } else {
        console.log('   └── ' + it.id + ' - ' + it.title);
      }
    });
  }
});
