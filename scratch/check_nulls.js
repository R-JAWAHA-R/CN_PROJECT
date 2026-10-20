const fs = require('fs');

['index.html', 'js/app.js', 'js/topicPages.js', 'js/quizzes.js', 'js/learningPaths.js', 'js/knowledgeGraph.js'].forEach(file => {
    const code = fs.readFileSync(file, 'utf8');
    const lines = code.split('\n');
    lines.forEach((l, i) => {
        const m = l.match(/document\.getElementById\(['"]([^'"]+)['"]\)\.(classList|style|innerHTML|value|innerText|textContent)/);
        if (m) {
            console.log(`${file}:${i + 1} unsafe dereference of element "${m[1]}"`);
        }
    });
});
