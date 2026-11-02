const fs = require('fs');
let c = fs.readFileSync('js/topics_u2.js', 'utf8');
const target = 'if (typeof module !== "undefined" && module.exports) {\n  module.exports = TOPICS_U2;\n}';
const rep = 'if (typeof window !== "undefined") window.TOPICS_U2 = TOPICS_U2;\nif (typeof global !== "undefined") global.TOPICS_U2 = TOPICS_U2;\nif (typeof module !== "undefined" && module.exports) {\n  module.exports = TOPICS_U2;\n}';
c = c.replace(target, rep);
fs.writeFileSync('js/topics_u2.js', c, 'utf8');
console.log('topics_u2.js updated with global and window exports');

