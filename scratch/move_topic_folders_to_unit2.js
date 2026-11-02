const fs = require('fs');
const path = require('path');

const baseImagesDir = path.join(__dirname, '..', 'assets', 'images');
const unit2Dir = path.join(baseImagesDir, 'unit2');

if (!fs.existsSync(unit2Dir)) {
  fs.mkdirSync(unit2Dir, { recursive: true });
  console.log('Created directory:', unit2Dir);
} else {
  console.log('Directory already exists:', unit2Dir);
}

// Find all topic* directories in assets/images
const entries = fs.readdirSync(baseImagesDir, { withFileTypes: true });
const topicDirs = entries
  .filter(d => d.isDirectory() && d.name.startsWith('topic'))
  .map(d => d.name);

console.log('Found topic directories to move:', topicDirs);

topicDirs.forEach(dirName => {
  const oldPath = path.join(baseImagesDir, dirName);
  const newPath = path.join(unit2Dir, dirName);
  if (fs.existsSync(newPath)) {
    console.log(`Destination already exists: ${newPath}, skipping or merging...`);
  } else {
    fs.renameSync(oldPath, newPath);
    console.log(`Moved: ${dirName} -> unit2/${dirName}`);
  }
});

// Update references in js/ files
const jsDir = path.join(__dirname, '..', 'js');
const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));

jsFiles.forEach(file => {
  const filePath = path.join(jsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let count = 0;

  // Replace assets/images/topic with assets/images/unit2/topic
  // Match assets/images/topic[0-9]+ to avoid duplicate unit2 if run multiple times
  const newContent = content.replace(/assets\/images\/topic(\d+)/g, (match, p1) => {
    count++;
    return `assets/images/unit2/topic${p1}`;
  });

  if (count > 0) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${count} image references in js/${file}`);
  }
});

// Update index.html if it has any
const indexPath = path.join(__dirname, '..', 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');
let indexCount = 0;
const newIndexContent = indexContent.replace(/assets\/images\/topic(\d+)/g, (match, p1) => {
  indexCount++;
  return `assets/images/unit2/topic${p1}`;
});
if (indexCount > 0) {
  fs.writeFileSync(indexPath, newIndexContent, 'utf8');
  console.log(`Updated ${indexCount} image references in index.html`);
}

