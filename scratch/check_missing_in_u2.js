const u2 = require('../js/topics_u2.js');
const missing = [
  'dll-design-issues',
  'framing',
  'flow-control',
  'channel-allocation',
  'ethernet',
  'mac-address',
  'wireless-lan-protocols',
  'wifi-mac-sublayer',
  'dll-switching',
  'network-devices'
];
missing.forEach(id => {
  console.log(id, 'in topics_u2:', !!u2[id]);
});

