const fs = require('fs');
global.window = {};
require('../js/topics_u4.js');
console.log('TOPICS_U4 keys:', Object.keys(global.TOPICS_U4 || window.TOPICS_U4 || {}));

