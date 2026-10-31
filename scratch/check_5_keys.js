const syllabus = require('../js/topics_u2_syllabus.js');
const keys = [
  'channel-allocation',
  'wireless-lan-protocols',
  'wifi-mac-sublayer',
  'dll-switching',
  'network-devices'
];
keys.forEach(k => {
  console.log(k, 'in syllabus:', !!syllabus[k]);
});

