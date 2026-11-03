// Script to compile all Unit 5 topics into js/topics_u5.js
const fs = require('fs');
const path = require('path');

const t1 = require('./builder_u5_t1.js');
const t2 = require('./builder_u5_t2.js');
const t3 = require('./builder_u5_t3.js');
const t4 = require('./builder_u5_t4.js');
const t5 = require('./builder_u5_t5.js');

const coreTopics = { ...t1, ...t2, ...t3, ...t4, ...t5 };

// Legacy aliases so old links, search entries, or quizzes continue to resolve
const aliasMap = {
  "application-layer": "dns",
  "dns-records": "dns",
  "http": "http-intro",
  "https": "http-architecture",
  "email-system": "email-architecture",
  "smtp": "email-architecture",
  "pop3": "email-architecture",
  "imap": "email-architecture",
  "firewall": "firewalls",
  "ips": "ids",
  "public-key-cryptography": "public-key-algorithms",
  "rsa": "rsa-algorithm",
  "rsa-encryption": "rsa-algorithm",
  "rsa-digital-signature": "rsa-algorithm",
  "rsa-padding": "rsa-algorithm"
};

const fullTopicsU5 = { ...coreTopics };

for (const [aliasKey, targetKey] of Object.entries(aliasMap)) {
  if (coreTopics[targetKey]) {
    // Clone target object but preserve alias id for routing
    const targetObj = coreTopics[targetKey];
    fullTopicsU5[aliasKey] = {
      ...targetObj,
      id: aliasKey,
      isAlias: true,
      canonicalId: targetKey
    };
  }
}

const headerComment = `// UNIT 5 – APPLICATION LAYER TOPICS REPOSITORY
// Built to exact 17-point schema with comprehensive technical rigor,
// McGraw-Hill Forouzan Networking textbook integration, numerical walkthroughs,
// and high-resolution SVG architecture diagrams.
// Contains exactly 5 main topics and 19 subtopics (+ backward-compatibility aliases).

`;

const fileContent = headerComment + "const TOPICS_U5 = " + JSON.stringify(fullTopicsU5, null, 2) + ";\n\n" +
  "if (typeof window !== 'undefined') window.TOPICS_U5 = TOPICS_U5;\n" +
  "if (typeof module !== 'undefined' && module.exports) module.exports = TOPICS_U5;\n";

const destPath = path.join(__dirname, '..', 'js', 'topics_u5.js');
fs.writeFileSync(destPath, fileContent, 'utf8');

console.log('Successfully compiled and wrote js/topics_u5.js');
console.log('Core 19 topics:', Object.keys(coreTopics).length);
console.log('Total keys with aliases:', Object.keys(fullTopicsU5).length);
console.log('File size:', (fileContent.length / 1024).toFixed(2), 'KB');

