const fs = require('fs');
let css = fs.readFileSync('css/components.css', 'utf8');

const additions = `
/* ==========================================================================
   Unit 2 Interactive Expandable Folder Tree Hierarchy Styling
   ========================================================================== */

.unit2-folder-node {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.unit2-folder-header {
  transition: background-color 0.2s ease, color 0.2s ease;
}

.unit2-folder-header:hover {
  background-color: rgba(2, 132, 199, 0.08);
}

.dark .unit2-folder-header:hover {
  background-color: rgba(56, 189, 248, 0.12);
}

.folder-children {
  animation: folderSlideDown 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top;
}

@keyframes folderSlideDown {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.unit2-doc-item {
  transition: all 0.18s ease;
}

.unit2-doc-item:hover {
  transform: translateX(3px);
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
`;

if (!css.includes('unit2-folder-node')) {
  css += '\r\n' + additions;
  fs.writeFileSync('css/components.css', css, 'utf8');
  console.log('Appended tree styles to css/components.css');
} else {
  console.log('Styles already present in css/components.css');
}

