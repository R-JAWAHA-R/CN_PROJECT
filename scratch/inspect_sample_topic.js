const fs = require('fs');
global.window = global;
require('../js/topics_u2_syllabus.js');

const keys = Object.keys(global.TOPICS_U2_SYLLABUS || {});
const sampleKey = keys[0]; // e.g. 'u2-dll-intro'
const sample = global.TOPICS_U2_SYLLABUS[sampleKey];

console.log('Sample key:', sampleKey);
console.log('Top-level keys in sample:', Object.keys(sample));
console.log('Infobox keys:', Object.keys(sample.infobox || {}));
console.log('Sections keys:', Object.keys(sample.sections || {}));
console.log('Sample properties preview:');
console.log('- id:', sample.id);
console.log('- title:', sample.title);
console.log('- unit:', sample.unit);
console.log('- unitId:', sample.unitId);
console.log('- level:', sample.level);
console.log('- difficulty:', sample.difficulty);
console.log('- readingTime:', sample.readingTime);
console.log('- standard:', sample.standard);
console.log('- oneLiner:', sample.oneLiner);
console.log('- parentTopic:', sample.parentTopic);
console.log('- nextTopicId:', sample.nextTopicId);
console.log('- prevTopicId:', sample.prevTopicId);
console.log('- imageUrl:', sample.imageUrl);

