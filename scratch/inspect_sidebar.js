const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const app = fs.readFileSync('js/app.js', 'utf8');

// search for sidebar rendering
console.log('Searching for renderSidebar or similar...');
const sidebarMatches = html.match(/function renderSidebar[\s\S]*?\{/);
console.log('In index.html:', sidebarMatches);
const appMatches = app.match(/renderSidebar|renderMenu|buildTree/g);
console.log('In app.js:', appMatches);

