const fs = require('fs');

// 1. UPDATE js/unit2.js
let u2Code = fs.readFileSync('js/unit2.js', 'utf8');

const targetUnit2 = '{ id: "u2-error-techniques", title: "Error Detection and Correction Techniques", type: "document", time: "22 min" }';
const replacementUnit2 = `{ id: "u2-error-techniques", title: "Error Detection and Correction Techniques", type: "document", time: "22 min" },
            { id: "u2-checksum", title: "Checksum (Error Detection & 1's Complement)", type: "document", time: "20 min" }`;

if (!u2Code.includes('"u2-checksum"')) {
  u2Code = u2Code.replace(targetUnit2, replacementUnit2);
  u2Code = u2Code.replace('badge: "23 Subtopics • 3 Folders",', 'badge: "24 Subtopics • 3 Folders",');
  fs.writeFileSync('js/unit2.js', u2Code, 'utf8');
  console.log('Successfully added u2-checksum to js/unit2.js');
} else {
  console.log('u2-checksum already in js/unit2.js');
}

// 2. UPDATE index.html
let html = fs.readFileSync('index.html', 'utf8');

const targetHtmlItem = '{ id: "u2-error-techniques", title: "Error Detection and Correction Techniques", type: "document" }';
const replacementHtmlItem = `{ id: "u2-error-techniques", title: "Error Detection and Correction Techniques", type: "document" },
                                    { id: "u2-checksum", title: "Checksum (Error Detection & 1's Complement)", type: "document" }`;

const targetHtmlSubId = '"u2-error-techniques",';
const replacementHtmlSubId = '"u2-error-techniques", "u2-checksum",';

if (!html.includes('id: "u2-checksum"')) {
  html = html.replace(targetHtmlItem, replacementHtmlItem);
  html = html.replace(targetHtmlSubId, replacementHtmlSubId);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('Successfully added u2-checksum to index.html');
} else {
  console.log('u2-checksum already in index.html');
}

