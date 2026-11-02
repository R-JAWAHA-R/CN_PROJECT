const fs = require('fs');
let code = fs.readFileSync('js/topicPages.js', 'utf8');

// Fix: count-to-infinity closing brace
code = code.replace(
  /"count-to-infinity":\s*\{\s*"chapNum":\s*4,\s*"chapTitle":\s*"Topic 4 – Distance Vector and Link State Routing",\s*"unitId":\s*"unit3",\s*"unit":\s*"Unit 3: Network Layer"\s*\}\s*\},/,
  `"count-to-infinity": {
      "chapNum": 4,
      "chapTitle": "Topic 4 – Distance Vector and Link State Routing",
      "unitId": "unit3",
      "unit": "Unit 3: Network Layer"
  },`
);

fs.writeFileSync('js/topicPages.js', code, 'utf8');
console.log('Fixed syntax error in js/topicPages.js');

