const fs = require('fs');

// Read syllabusModules from index.html to generate exhaustive TOPIC_CHAPTER_MAP
const indexHtml = fs.readFileSync('index.html', 'utf8');
const matchMod = indexHtml.match(/const syllabusModules = (\[[\s\S]*?\]);\s*let activeTopicId/);
if (!matchMod) {
  console.error('Could not parse syllabusModules from index.html');
  process.exit(1);
}
const syllabusModules = eval(matchMod[1]);

const fullChapterMap = {};

syllabusModules.forEach(mod => {
  if (mod.chapters && mod.chapters.length > 0) {
    mod.chapters.forEach(chap => {
      const title = chap.title || chap.shortTitle;
      const num = chap.number || 1;
      const subIds = chap.subtopicIds || [];
      subIds.forEach(id => {
        fullChapterMap[id] = { chapNum: num, chapTitle: title, unitId: mod.id, unit: mod.module };
      });
      if (chap.items) {
        chap.items.forEach(it => {
          if (it.items) {
            it.items.forEach(sub => {
              fullChapterMap[sub.id] = { chapNum: num, chapTitle: title, unitId: mod.id, unit: mod.module };
            });
          } else {
            fullChapterMap[it.id] = { chapNum: num, chapTitle: title, unitId: mod.id, unit: mod.module };
          }
        });
      }
    });
  } else {
    // Modules without chapters (unit4, unit5)
    (mod.topicIds || []).forEach((id, idx) => {
      let chapTitle = mod.module;
      let chapNum = 1;
      if (mod.id === 'unit4') {
        if (idx < 5) { chapNum = 1; chapTitle = 'Topic 1: Transport Protocols (UDP & TCP)'; }
        else { chapNum = 2; chapTitle = 'Topic 2: Connection Management & Flow Control'; }
      } else if (mod.id === 'unit5') {
        if (idx < 5) { chapNum = 1; chapTitle = 'Topic 1: DNS & Web Protocols'; }
        else if (idx < 9) { chapNum = 2; chapTitle = 'Topic 2: Electronic Mail Protocols'; }
        else { chapNum = 3; chapTitle = 'Topic 3: Network Security & Cryptography'; }
      }
      fullChapterMap[id] = { chapNum, chapTitle, unitId: mod.id, unit: mod.module };
    });
  }
});

// Also ensure all unit2 aliases and topics exist
const unit2Extras = {
  "byte-stuffing": { chapNum: 1, chapTitle: "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS", unitId: "unit2", unit: "Unit 2 – Data Link Layer" },
  "bit-stuffing": { chapNum: 1, chapTitle: "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS", unitId: "unit2", unit: "Unit 2 – Data Link Layer" },
  "error-detection": { chapNum: 1, chapTitle: "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS", unitId: "unit2", unit: "Unit 2 – Data Link Layer" },
  "parity": { chapNum: 1, chapTitle: "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS", unitId: "unit2", unit: "Unit 2 – Data Link Layer" },
  "checksum": { chapNum: 1, chapTitle: "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS", unitId: "unit2", unit: "Unit 2 – Data Link Layer" },
  "hamming-code": { chapNum: 1, chapTitle: "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS", unitId: "unit2", unit: "Unit 2 – Data Link Layer" },
  "crc": { chapNum: 1, chapTitle: "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS", unitId: "unit2", unit: "Unit 2 – Data Link Layer" },
  "sliding-window": { chapNum: 2, chapTitle: "TOPIC 2 – DATA LINK LAYER PROTOCOLS", unitId: "unit2", unit: "Unit 2 – Data Link Layer" },
  "aloha": { chapNum: 4, chapTitle: "TOPIC 4 – MULTIPLE ACCESS PROTOCOLS", unitId: "unit2", unit: "Unit 2 – Data Link Layer" },
  "csma-protocols": { chapNum: 4, chapTitle: "TOPIC 4 – MULTIPLE ACCESS PROTOCOLS", unitId: "unit2", unit: "Unit 2 – Data Link Layer" },
  "collision-free-protocols": { chapNum: 5, chapTitle: "TOPIC 5 – COLLISION-FREE PROTOCOLS", unitId: "unit2", unit: "Unit 2 – Data Link Layer" },
  "vlan": { chapNum: 9, chapTitle: "TOPIC 9 – DATA LINK LAYER SWITCHING", unitId: "unit2", unit: "Unit 2 – Data Link Layer" },
  "arp": { chapNum: 10, chapTitle: "TOPIC 10 – NETWORKING DEVICES", unitId: "unit2", unit: "Unit 2 – Data Link Layer" }
};
Object.assign(fullChapterMap, unit2Extras);

console.log('Total entries in exhaustive fullChapterMap:', Object.keys(fullChapterMap).length);

// 1. UPDATE js/topicPages.js
let tpCode = fs.readFileSync('js/topicPages.js', 'utf8');

// Replace TOPIC_CHAPTER_MAP
const startMark = '// Master Pedagogical Hierarchy Mapping from Syllabus PDF\nconst TOPIC_CHAPTER_MAP = {';
const endMark = 'var TopicPageEngine = {';

const newChapterMapStr = '// Master Pedagogical Hierarchy Mapping from Syllabus PDF\nconst TOPIC_CHAPTER_MAP = ' + JSON.stringify(fullChapterMap, null, 2) + ';\n\n// Enrich TOPIC_REPOSITORY with Parent Topic information\nfor (const [id, t] of Object.entries(TOPIC_REPOSITORY)) {\n  const mapEntry = TOPIC_CHAPTER_MAP[id];\n  if (mapEntry) {\n    t.parentTopic = mapEntry.chapTitle;\n    t.topicTitle = mapEntry.chapTitle;\n    t.topicNumber = mapEntry.chapNum;\n    if (!t.unitId && mapEntry.unitId) t.unitId = mapEntry.unitId;\n    if (!t.unit && mapEntry.unit) t.unit = mapEntry.unit;\n  }\n}\n\n';

const sIdx = tpCode.indexOf(startMark);
const eIdx = tpCode.indexOf(endMark);

if (sIdx === -1 || eIdx === -1) {
  console.error('Could not locate TOPIC_CHAPTER_MAP replacement region in js/topicPages.js');
  process.exit(1);
}

tpCode = tpCode.substring(0, sIdx) + newChapterMapStr + tpCode.substring(eIdx);

// Now patch TopicPageEngine.renderTopicPage header & breadcrumb & infobox
// 1) Extract chapInfo and parentTopicTitle right after topic is retrieved
const hookTarget = 'topic.sections = topic.sections || {};';
const hookAddition = `
    topic.sections = topic.sections || {};

    // Resolve Parent Topic metadata
    const chapInfo = (typeof TOPIC_CHAPTER_MAP !== 'undefined' && TOPIC_CHAPTER_MAP[topic.id]) ? TOPIC_CHAPTER_MAP[topic.id] : null;
    const parentTopicTitle = (chapInfo && chapInfo.chapTitle) ? chapInfo.chapTitle : (topic.parentTopic || topic.topicTitle || '');
    const parentTopicNum = chapInfo ? chapInfo.chapNum : (topic.topicNumber || '');
`;

if (!tpCode.includes('const parentTopicTitle =')) {
  tpCode = tpCode.replace(hookTarget, hookAddition);
}

// 2) Patch wiki-breadcrumbs to guarantee parent topic is shown and clickable
const bcTarget = `<nav class="wiki-breadcrumbs">
          <a onclick="App.loadView('home')">Home</a>
          <span class="bc-sep">/</span>
          <a onclick="App.loadView('\${topic.unitId}')">\${topic.unit}</a>
          \${TOPIC_CHAPTER_MAP[topic.id] ? \`
            <span class="bc-sep">/</span>
            <span class="cursor-pointer text-blue-600 dark:text-blue-400 font-semibold hover:underline" onclick="App.loadView('\${topic.unitId}')">\${TOPIC_CHAPTER_MAP[topic.id].chapTitle}</span>
          \` : ''}
          <span class="bc-sep">/</span>
          <span class="bc-current">\${topic.title}</span>
        </nav>`;

const bcReplacement = `<nav class="wiki-breadcrumbs">
          <a onclick="App.loadView('home')">Home</a>
          <span class="bc-sep">/</span>
          <a onclick="App.loadView('\${topic.unitId}')">\${topic.unit}</a>
          \${parentTopicTitle ? \`
            <span class="bc-sep">/</span>
            <span class="cursor-pointer text-blue-600 dark:text-blue-400 font-semibold hover:underline" onclick="App.loadView('\${topic.unitId}')">\${parentTopicTitle}</span>
          \` : ''}
          <span class="bc-sep">/</span>
          <span class="bc-current">\${topic.title}</span>
        </nav>`;

tpCode = tpCode.replace(bcTarget, bcReplacement);

// 3) Patch wiki-header-meta to include Parent Topic Pill Badge and Context Bar
const metaTarget = `<div class="wiki-header-meta">
            <span class="wiki-badge-unit">\${topic.unit}</span>
            <span class="wiki-badge-level">\${topic.level}</span>`;

const metaReplacement = `<div class="wiki-header-meta">
            <span class="wiki-badge-unit">\${topic.unit}</span>
            \${parentTopicTitle ? \`
              <span class="wiki-badge-topic font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 px-2.5 py-0.5 rounded text-xs inline-flex items-center gap-1.5 shadow-sm">
                <i class="fa-solid fa-folder-open text-blue-500"></i> \${parentTopicTitle}
              </span>
            \` : ''}
            <span class="wiki-badge-level">\${topic.level}</span>`;

tpCode = tpCode.replace(metaTarget, metaReplacement);

// 4) Add Topic Context Bar above article title
const titleTarget = `<h1 class="wiki-article-title">\${topic.title}</h1>`;
const titleReplacement = `\${parentTopicTitle ? \`
            <div class="wiki-parent-topic-context-bar flex items-center gap-2 mt-2 mb-1">
              <span class="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/40 px-2.5 py-1 rounded border border-blue-200 dark:border-blue-900 flex items-center gap-1.5 shadow-sm">
                <i class="fa-solid fa-layer-group text-blue-500"></i> Part of: \${parentTopicTitle}
              </span>
            </div>
          \` : ''}
          <h1 class="wiki-article-title">\${topic.title}</h1>`;

tpCode = tpCode.replace(titleTarget, titleReplacement);

// 5) Patch infobox-header and infobox-table
const infoHeaderTarget = `<div class="infobox-header">
                <h3>\${topic.title}</h3>
                <div class="infobox-sub">\${topic.unit.split(':')[0]}</div>
              </div>
              <table class="infobox-table">
                <tbody>
                  <tr>
                    <th>OSI / Stack Layer</th>`;

const infoHeaderReplacement = `<div class="infobox-header">
                \${parentTopicTitle ? \`<div class="infobox-parent-topic text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1 flex items-center justify-center gap-1.5"><i class="fa-solid fa-folder text-blue-500"></i> \${parentTopicTitle}</div>\` : ''}
                <h3>\${topic.title}</h3>
                <div class="infobox-sub">\${topic.unit.split(':')[0]}</div>
              </div>
              <table class="infobox-table">
                <tbody>
                  \${parentTopicTitle ? \`
                    <tr>
                      <th>Parent Topic</th>
                      <td><strong class="text-blue-700 dark:text-blue-300">\${parentTopicTitle}</strong></td>
                    </tr>
                  \` : ''}
                  <tr>
                    <th>OSI / Stack Layer</th>`;

tpCode = tpCode.replace(infoHeaderTarget, infoHeaderReplacement);

fs.writeFileSync('js/topicPages.js', tpCode, 'utf8');
console.log('Successfully updated js/topicPages.js');

// 2. UPDATE index.html
let idxCode = fs.readFileSync('index.html', 'utf8');

// Add Parent Topic row to facts-card-body if not present
if (!idxCode.includes('id="meta-topic"')) {
  const factsTarget = '<div id="facts-card-body" class="space-y-1.5">';
  const factsReplacement = `<div id="facts-card-body" class="space-y-1.5">
                    <div class="flex justify-between py-1 border-b border-gray-100 dark:border-gray-700">
                        <span class="text-gray-500">Parent Topic:</span>
                        <span id="meta-topic" class="font-semibold text-blue-600 dark:text-blue-400 truncate max-w-[140px] text-right" title="">-</span>
                    </div>`;
  idxCode = idxCode.replace(factsTarget, factsReplacement);
}

// Update updateTopicMetaCard in index.html to populate meta-topic
const updateTarget = `card.classList.remove('hidden');
                document.getElementById('meta-layer').textContent = (topic.infobox && topic.infobox.layer) ? topic.infobox.layer.split('(')[0] : 'General';`;

const updateReplacement = `card.classList.remove('hidden');
                const chap = (typeof TOPIC_CHAPTER_MAP !== 'undefined' && TOPIC_CHAPTER_MAP[topicId]) ? TOPIC_CHAPTER_MAP[topicId] : null;
                const parentTitle = chap ? chap.chapTitle : (topic.parentTopic || topic.topicTitle || 'General');
                const topicEl = document.getElementById('meta-topic');
                if (topicEl) {
                    topicEl.textContent = parentTitle;
                    topicEl.title = parentTitle;
                }
                document.getElementById('meta-layer').textContent = (topic.infobox && topic.infobox.layer) ? topic.infobox.layer.split('(')[0] : 'General';`;

idxCode = idxCode.replace(updateTarget, updateReplacement);

fs.writeFileSync('index.html', idxCode, 'utf8');
console.log('Successfully updated index.html');

// 3. UPDATE js/unit2.js
let u2Code = fs.readFileSync('js/unit2.js', 'utf8');

// In Unit2Module cards, ensure each subtopic card displays its parent topic badge
const u2CardTarget = `<div class="flex justify-between items-center mb-1.5">
                        <span class="text-[10px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                          <i class="fa-solid fa-file-lines"></i> Lesson
                        </span>`;

const u2CardReplacement = `<div class="flex justify-between items-center mb-1.5">
                        <span class="text-[10px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                          <i class="fa-solid fa-file-lines"></i> Lesson
                        </span>
                        <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300">\${topic.shortTitle.split(' – ')[0]}</span>`;

u2Code = u2Code.replace(u2CardTarget, u2CardReplacement);

fs.writeFileSync('js/unit2.js', u2Code, 'utf8');
console.log('Successfully updated js/unit2.js');

