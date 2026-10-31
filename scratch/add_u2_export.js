const fs = require('fs');
let code = fs.readFileSync('js/topics_u2.js', 'utf8');
if (!code.includes('module.exports = TOPICS_U2')) {
  code += `\nif (typeof global !== 'undefined') global.TOPICS_U2 = TOPICS_U2;\nif (typeof module !== 'undefined' && module.exports) module.exports = TOPICS_U2;\n`;
  fs.writeFileSync('js/topics_u2.js', code, 'utf8');
  console.log('Added Node exports to js/topics_u2.js');
}

