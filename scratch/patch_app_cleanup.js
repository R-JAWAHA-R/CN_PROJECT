const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'app.js');
let code = fs.readFileSync(filePath, 'utf8');

const target = `  loadView: function (viewName, targetParam, updateHash = true) {
    App.activeView = viewName;`;

const replacement = `  loadView: function (viewName, targetParam, updateHash = true) {
    if (App.activeView === 'checksum-guard' && viewName !== 'checksum-guard') {
      if (typeof ChecksumGuardGame !== 'undefined' && typeof ChecksumGuardGame.cleanup === 'function') {
        ChecksumGuardGame.cleanup();
      }
    }
    App.activeView = viewName;`;

function replaceNormalized(str, search, repl) {
  const normStr = str.replace(/\r\n/g, '\n');
  const normSearch = search.replace(/\r\n/g, '\n');
  const normRepl = repl.replace(/\r\n/g, '\n');
  if (!normStr.includes(normSearch)) throw new Error('Search block not found in app.js');
  return normStr.replace(normSearch, normRepl);
}

code = replaceNormalized(code, target, replacement);
fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully added cleanup call in js/app.js');

