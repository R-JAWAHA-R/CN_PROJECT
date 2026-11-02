const fs = require('fs');

let content = fs.readFileSync('js/app.js', 'utf8');

// 1. Smooth fade on topic transition
const target1 = `    const mainContainer = document.getElementById('main-content') || document.getElementById('main-content-container');\r\n    if (mainContainer) mainContainer.scrollTop = 0;\r\n    window.scrollTo({ top: 0, behavior: 'smooth' });\r\n\r\n    if (typeof trackTopicViewed === 'function') {`;
const replace1 = `    const mainContainer = document.getElementById('main-content') || document.getElementById('main-content-container');\r\n    if (mainContainer) {\r\n      mainContainer.scrollTop = 0;\r\n      mainContainer.classList.remove('animate-fade');\r\n      void mainContainer.offsetWidth;\r\n      mainContainer.classList.add('animate-fade');\r\n    }\r\n    window.scrollTo({ top: 0, behavior: 'smooth' });\r\n\r\n    if (typeof trackTopicViewed === 'function') {`;

if (content.includes(target1)) {
  content = content.replace(target1, replace1);
  console.log('Replaced target1');
} else {
  console.log('target1 not found');
}

// 2. Smooth fade on view transition
const target2 = `    const mainContainer = document.getElementById('main-content') || document.getElementById('main-content-container');\r\n    if (mainContainer) mainContainer.scrollTop = 0;\r\n    window.scrollTo({ top: 0, behavior: 'smooth' });\r\n\r\n    if (typeof updateTopicMetaCard === 'function') {`;
const replace2 = `    const mainContainer = document.getElementById('main-content') || document.getElementById('main-content-container');\r\n    if (mainContainer) {\r\n      mainContainer.scrollTop = 0;\r\n      mainContainer.classList.remove('animate-fade');\r\n      void mainContainer.offsetWidth;\r\n      mainContainer.classList.add('animate-fade');\r\n    }\r\n    window.scrollTo({ top: 0, behavior: 'smooth' });\r\n\r\n    if (typeof updateTopicMetaCard === 'function') {`;

if (content.includes(target2)) {
  content = content.replace(target2, replace2);
  console.log('Replaced target2');
} else {
  console.log('target2 not found');
}

// 3. Update Hero Banner branding to JABAK
content = content.replace('<!-- GeeksforGeeks Welcome Hero Banner -->', '<!-- Jabak Welcome Hero Banner -->');
content = content.replace('<span>GFG Portal</span>', '<span>Jabak Portal</span>');
content = content.replace('<h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Computer Networks Encyclopedia</h2>', '<h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">JABAK Computer Networks Encyclopedia</h2>');

fs.writeFileSync('js/app.js', content, 'utf8');
console.log('Successfully updated js/app.js');

