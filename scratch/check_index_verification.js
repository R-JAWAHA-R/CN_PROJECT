const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

console.log('Includes script js/topics_u2_additional.js?', html.includes('js/topics_u2_additional.js'));
console.log('Includes folder-error-detection-codes?', html.includes('folder-error-detection-codes'));
console.log('Includes folder-simplex-variations?', html.includes('folder-simplex-variations'));
console.log('Includes folder-sliding-window?', html.includes('folder-sliding-window'));
console.log('Includes folder-bridge-applications?', html.includes('folder-bridge-applications'));
console.log('Includes u2-bridges-advantages-limitations?', html.includes('u2-bridges-advantages-limitations'));

