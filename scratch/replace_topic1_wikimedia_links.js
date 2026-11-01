// scratch/replace_topic1_wikimedia_links.js
const fs = require('fs');
const path = require('path');

// 1. In topics_u2_syllabus.js
const sylPath = path.join(__dirname, '../js/topics_u2_syllabus.js');
let syl = fs.readFileSync(sylPath, 'utf8');

// Replace remaining wikimedia images in u2-dll-intro, u2-dll-osi-position, u2-dll-functions, u2-dll-services, u2-error-control
syl = syl.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/8\/8d\/OSI_Model_v1\.svg\/600px-OSI_Model_v1\.svg\.png/g, 'assets/images/topic1/osi-layer2-position.svg');
syl = syl.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/8\/8d\/OSI_Model_v1\.svg/g, 'assets/images/topic1/osi-layer2-position.svg');
syl = syl.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/3\/3b\/Frame_data_link_layer\.svg\/600px-Frame_data_link_layer\.svg\.png/g, 'assets/images/topic1/dll-position-between-layers.svg');
syl = syl.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/c\/c9\/Stop-and-wait_ARQ\.svg\/500px-Stop-and-wait_ARQ\.svg\.png/g, 'assets/images/topic1/error-control-taxonomy.svg');
syl = syl.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/0\/02\/CRC8-gen\.gif/g, 'assets/images/topic1/error-control-taxonomy.svg');

fs.writeFileSync(sylPath, syl, 'utf8');
console.log('Cleaned topics_u2_syllabus.js');

// 2. In topics_u2.js
const u2Path = path.join(__dirname, '../js/topics_u2.js');
let u2 = fs.readFileSync(u2Path, 'utf8');

u2 = u2.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/5\/55\/Bit_stuffing\.png/g, 'assets/images/topic1/bit-stuffing-mechanism.svg');
u2 = u2.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/7\/76\/Stop_and_wait_arq\.png/g, 'assets/images/topic1/flow-control-models.svg');

fs.writeFileSync(u2Path, u2, 'utf8');
console.log('Cleaned topics_u2.js');
