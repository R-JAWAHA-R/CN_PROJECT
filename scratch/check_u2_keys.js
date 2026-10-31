const u2 = require('../js/topics_u2.js');
const keys = [
  'channel-allocation',
  'wireless-lan-protocols',
  'wifi-mac-sublayer',
  'dll-switching',
  'network-devices'
];
keys.forEach(k => {
  console.log(k, 'in topics_u2:', !!u2[k]);
});

