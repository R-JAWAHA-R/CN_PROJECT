// scratch/generate_topic_svgs.js
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../assets/images');
const dirs = ['topic1', 'topic2', 'topic3', 'topic4', 'topic5'];
dirs.forEach(d => {
  const full = path.join(baseDir, d);
  if (!fs.existsSync(full)) fs.mkdirSync(full, { recursive: true });
});

console.log('Target directories ready.');
