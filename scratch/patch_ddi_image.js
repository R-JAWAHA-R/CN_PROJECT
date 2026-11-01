// scratch/patch_ddi_image.js
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../js/topics_u2_extended.js');
let code = fs.readFileSync(filePath, 'utf8');

const targetUrl = 'url: "https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg",';
const newUrl = 'url: "assets/images/topic1/dll-design-issues-architecture.svg",';

if (code.includes(targetUrl)) {
  code = code.replace(targetUrl, newUrl);
  fs.writeFileSync(filePath, code, 'utf8');
  console.log('Successfully updated dll-design-issues in topics_u2_extended.js!');
} else {
  console.log('Target URL not found or already replaced.');
}
