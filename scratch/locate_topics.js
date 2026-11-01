// scratch/locate_topics.js
const fs = require('fs');

const files = ['topics_u2_syllabus.js', 'topics_u2.js', 'topics_u2_extended.js'];
const all = [
  // Topic 1
  'u2-dll-intro','u2-dll-osi-position','u2-dll-functions','dll-design-issues','u2-dll-services','framing','flow-control','u2-error-control',
  // Topic 2
  'u2-dll-protocols-intro','u2-protocol-classification','simplex-protocol','stop-and-wait-noiseless','stop-and-wait','go-back-n','selective-repeat','comparison-noiseless-noisy','comparison-arq-protocols',
  // Topic 3
  'u2-mac-sublayer-intro','u2-need-for-mac-sublayer','u2-mac-functions-responsibilities','channel-allocation','u2-fdma','u2-tdma','u2-dynamic-channel-allocation','u2-static-vs-dynamic-channel-allocation',
  // Topic 4
  'u2-multiple-access-intro','u2-random-access-protocols','u2-pure-aloha','u2-slotted-aloha','u2-csma-1-persistent','u2-csma-non-persistent','u2-csma-p-persistent','u2-csma-cd','u2-csma-ca','u2-comparison-multiple-access',
  // Topic 5
  'u2-collision-free-intro','u2-bit-map-protocol','u2-binary-countdown-protocol','u2-token-passing-protocol','u2-collision-free-working-principles','u2-comparison-collision-free'
];

all.forEach(id => {
  const found = [];
  files.forEach(f => {
    const c = fs.readFileSync('js/' + f, 'utf8');
    if (c.includes(`"${id}":`) || c.includes(`'${id}':`)) {
      found.push(f);
    }
  });
  console.log(`${id} => ${found.join(', ') || 'NONE'}`);
});
