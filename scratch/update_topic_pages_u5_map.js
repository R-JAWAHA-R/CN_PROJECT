const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'js', 'topicPages.js');
let content = fs.readFileSync(targetFile, 'utf8');

const targetBlockStart = '"application-layer": {';
const nextBlockStart = '"byte-stuffing": {';

const startIndex = content.indexOf(targetBlockStart);
const endIndex = content.indexOf(nextBlockStart);

if (startIndex === -1 || endIndex === -1) {
  console.error('Target blocks not found!', { startIndex, endIndex });
  process.exit(1);
}

const replacement = `"application-layer": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DNS, E-MAIL AND WWW",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "dns": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DNS, E-MAIL AND WWW",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "dns-records": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DNS, E-MAIL AND WWW",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "email-architecture": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DNS, E-MAIL AND WWW",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "www": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DNS, E-MAIL AND WWW",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "email-system": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DNS, E-MAIL AND WWW",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "smtp": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DNS, E-MAIL AND WWW",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "pop3": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DNS, E-MAIL AND WWW",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "imap": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DNS, E-MAIL AND WWW",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "http-intro": {
      "chapNum": 2,
      "chapTitle": "TOPIC 2 – HTTP (HYPERTEXT TRANSFER PROTOCOL)",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "http-architecture": {
      "chapNum": 2,
      "chapTitle": "TOPIC 2 – HTTP (HYPERTEXT TRANSFER PROTOCOL)",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "http-request-response": {
      "chapNum": 2,
      "chapTitle": "TOPIC 2 – HTTP (HYPERTEXT TRANSFER PROTOCOL)",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "http-working": {
      "chapNum": 2,
      "chapTitle": "TOPIC 2 – HTTP (HYPERTEXT TRANSFER PROTOCOL)",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "http": {
      "chapNum": 2,
      "chapTitle": "TOPIC 2 – HTTP (HYPERTEXT TRANSFER PROTOCOL)",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "https": {
      "chapNum": 2,
      "chapTitle": "TOPIC 2 – HTTP (HYPERTEXT TRANSFER PROTOCOL)",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "content-delivery": {
      "chapNum": 3,
      "chapTitle": "TOPIC 3 – CONTENT DELIVERY AND WEB ARCHITECTURE",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "server-farms": {
      "chapNum": 3,
      "chapTitle": "TOPIC 3 – CONTENT DELIVERY AND WEB ARCHITECTURE",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "web-proxies": {
      "chapNum": 3,
      "chapTitle": "TOPIC 3 – CONTENT DELIVERY AND WEB ARCHITECTURE",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "p2p-networks": {
      "chapNum": 4,
      "chapTitle": "TOPIC 4 – PEER-TO-PEER NETWORKS AND NETWORK PROTECTION",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "firewalls": {
      "chapNum": 4,
      "chapTitle": "TOPIC 4 – PEER-TO-PEER NETWORKS AND NETWORK PROTECTION",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "firewall": {
      "chapNum": 4,
      "chapTitle": "TOPIC 4 – PEER-TO-PEER NETWORKS AND NETWORK PROTECTION",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "ids": {
      "chapNum": 4,
      "chapTitle": "TOPIC 4 – PEER-TO-PEER NETWORKS AND NETWORK PROTECTION",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "ips": {
      "chapNum": 4,
      "chapTitle": "TOPIC 4 – PEER-TO-PEER NETWORKS AND NETWORK PROTECTION",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "intro-cryptography": {
      "chapNum": 5,
      "chapTitle": "TOPIC 5 – NETWORK SECURITY AND CRYPTOGRAPHY",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "substitution-ciphers": {
      "chapNum": 5,
      "chapTitle": "TOPIC 5 – NETWORK SECURITY AND CRYPTOGRAPHY",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "transposition-ciphers": {
      "chapNum": 5,
      "chapTitle": "TOPIC 5 – NETWORK SECURITY AND CRYPTOGRAPHY",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "symmetric-algorithms": {
      "chapNum": 5,
      "chapTitle": "TOPIC 5 – NETWORK SECURITY AND CRYPTOGRAPHY",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "public-key-algorithms": {
      "chapNum": 5,
      "chapTitle": "TOPIC 5 – NETWORK SECURITY AND CRYPTOGRAPHY",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "public-key-cryptography": {
      "chapNum": 5,
      "chapTitle": "TOPIC 5 – NETWORK SECURITY AND CRYPTOGRAPHY",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "rsa-algorithm": {
      "chapNum": 5,
      "chapTitle": "TOPIC 5 – NETWORK SECURITY AND CRYPTOGRAPHY",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "rsa": {
      "chapNum": 5,
      "chapTitle": "TOPIC 5 – NETWORK SECURITY AND CRYPTOGRAPHY",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "rsa-encryption": {
      "chapNum": 5,
      "chapTitle": "TOPIC 5 – NETWORK SECURITY AND CRYPTOGRAPHY",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "rsa-digital-signature": {
      "chapNum": 5,
      "chapTitle": "TOPIC 5 – NETWORK SECURITY AND CRYPTOGRAPHY",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },
  "rsa-padding": {
      "chapNum": 5,
      "chapTitle": "TOPIC 5 – NETWORK SECURITY AND CRYPTOGRAPHY",
      "unitId": "unit5",
      "unit": "Unit 5 – Application Layer"
  },\n  `;

const fullReplacement = content.slice(0, startIndex) + replacement + content.slice(endIndex);

fs.writeFileSync(targetFile, fullReplacement, 'utf8');
console.log('Successfully updated js/topicPages.js with the new Unit 5 TOPIC_CHAPTER_MAP entries.');
