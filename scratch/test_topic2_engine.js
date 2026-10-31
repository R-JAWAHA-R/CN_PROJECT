const fs = require('fs');

// Mock window and global
global.window = global;
require('../js/cleanDiagramEngine.js');
const topicsSyllabus = require('../js/topics_u2_syllabus.js');

const topic2Keys = [
  "u2-dll-protocols-intro",
  "u2-protocol-classification",
  "simplex-protocol",
  "stop-and-wait-noiseless",
  "stop-and-wait",
  "go-back-n",
  "selective-repeat",
  "comparison-noiseless-noisy",
  "comparison-arq-protocols"
];

console.log("Testing CleanDiagramEngine for Topic 2 subtopics:");
topic2Keys.forEach(key => {
  const t = topicsSyllabus[key];
  if (!t) {
    console.log(`[MISSING] ${key}`);
    return;
  }
  const html = CleanDiagramEngine.getDiagramHtml(t);
  const hasAscii = html.includes('+--') || html.includes('|---');
  console.log(`[OK] ${key} -> HTML len: ${html.length}, clean: ${!hasAscii}, title: "${t.title}"`);
});

