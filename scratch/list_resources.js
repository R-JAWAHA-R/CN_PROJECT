const fs = require('fs');
const resources = require('../js/resources.js');

console.log('Total resources:', resources.length);
resources.forEach((r, idx) => {
    console.log(`${idx + 1}. [id: ${r.id}] ${r.title} (${r.units?.join(', ')}) - ${r.type}`);
});
