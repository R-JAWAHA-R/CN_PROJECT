const fs = require('fs');
let code = fs.readFileSync('js/cleanDiagramEngine.js', 'utf8');
code = code.replace(/auto-correction!<\/p>\s*<\/div>\s*<\/div>\s*<\/div>\s*`;\s*}\s*\n\s*\/\/\s*3b\./g, function(match) {
  return match.replace(/};\s*$/, '},\n');
});
// Or more directly:
code = code.replace(/for auto-correction!<\/p>\s*<\/div>\s*<\/div>\s*<\/div>\s*`;\s*}/, function(match) {
  return match + ',';
});
fs.writeFileSync('js/cleanDiagramEngine.js', code, 'utf8');
console.log("Fixed comma in cleanDiagramEngine.js");

