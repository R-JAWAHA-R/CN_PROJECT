const fs = require('fs');

let code = fs.readFileSync('js/topicPages.js', 'utf8');

const targetStr = `    const prevTopic = topic.prevTopicId ? TOPIC_REPOSITORY[topic.prevTopicId] : null;
    const nextTopic = topic.nextTopicId ? TOPIC_REPOSITORY[topic.nextTopicId] : null;
    const isCompleted = typeof completedTopics !== 'undefined' && Array.isArray(completedTopics) && completedTopics.includes(topicId);

    // Build Infobox Prerequisites & Related Links
    const prereqLinks = (topic.infobox.prerequisites || []).map(pId => {
      const p = TOPIC_REPOSITORY[pId];
      if (p) return \`<a class="wiki-link" onclick="App.loadTopic('\${p.id}')">\${p.title}</a>\`;
      return pId;
    }).join(", ");

    const relatedLinks = (topic.infobox.relatedConcepts || []).map(rId => {
      const r = TOPIC_REPOSITORY[rId];
      if (r) return \`<a class="wiki-link" onclick="App.loadTopic('\${r.id}')">\${r.title}</a>\`;
      return rId;
    }).join(", ");

    const compareLinks = (topic.infobox.compareWith || []).map(cKey => {
      if (typeof COMPARISONS_DATA !== 'undefined' && COMPARISONS_DATA[cKey]) {
        return \`<a class="wiki-link" onclick="App.loadComparison('\${cKey}')">\${COMPARISONS_DATA[cKey].title}</a>\`;
      }
      return cKey;
    }).join(", ");

    const primaryUsesList = (topic.infobox.primaryUses || []).map(u => \`<li>\${u}</li>\`).join("");
    const whereUsedList = (topic.sections.whereUsed || []).map(u => \`<li>✨ \${u}</li>\`).join("");

    const referencesList = (topic.sections.references || []).map((ref, idx) => \`
      <li class="ref-item">
        <span class="ref-num">[\${idx + 1}]</span>
        <span class="ref-text">\${ref.cite}</span>
        \${ref.url ? \`<a href="\${ref.url}" target="_blank" class="ref-link">Source ↗</a>\` : ''}
      </li>
    \`).join("");`;

const replacementStr = `    // Defensive normalization to prevent crashes if any property is missing or formatted differently
    topic.infobox = topic.infobox || {
      layer: topic.layer || "Layer 2 (Data Link Layer)",
      standard: topic.standard || "IEEE Standard",
      type: "Protocol / Standard",
      prerequisites: [],
      relatedConcepts: [],
      compareWith: [],
      primaryUses: []
    };
    topic.sections = topic.sections || {};

    const prevTopic = topic.prevTopicId ? TOPIC_REPOSITORY[topic.prevTopicId] : null;
    const nextTopic = topic.nextTopicId ? TOPIC_REPOSITORY[topic.nextTopicId] : null;
    const isCompleted = typeof completedTopics !== 'undefined' && Array.isArray(completedTopics) && completedTopics.includes(topicId);

    // Build Infobox Prerequisites & Related Links
    const prereqLinks = (topic.infobox.prerequisites || []).map(pId => {
      const p = TOPIC_REPOSITORY[pId];
      if (p) return \`<a class="wiki-link" onclick="App.loadTopic('\${p.id}')">\${p.title}</a>\`;
      return pId;
    }).join(", ");

    const relatedLinks = (topic.infobox.relatedConcepts || []).map(rId => {
      const r = TOPIC_REPOSITORY[rId];
      if (r) return \`<a class="wiki-link" onclick="App.loadTopic('\${r.id}')">\${r.title}</a>\`;
      return rId;
    }).join(", ");

    const compareLinks = (topic.infobox.compareWith || []).map(cKey => {
      if (typeof COMPARISONS_DATA !== 'undefined' && COMPARISONS_DATA[cKey]) {
        return \`<a class="wiki-link" onclick="App.loadComparison('\${cKey}')">\${COMPARISONS_DATA[cKey].title}</a>\`;
      }
      return cKey;
    }).join(", ");

    const primaryUsesList = (topic.infobox.primaryUses || []).map(u => \`<li>\${u}</li>\`).join("");
    
    const whereUsedList = Array.isArray(topic.sections.whereUsed)
      ? topic.sections.whereUsed.map(u => \`<li>✨ \${u}</li>\`).join("")
      : (topic.sections.whereUsed ? \`<li>✨ \${topic.sections.whereUsed}</li>\` : "");

    const referencesList = Array.isArray(topic.sections.references)
      ? topic.sections.references.map((ref, idx) => \`
        <li class="ref-item">
          <span class="ref-num">[\${idx + 1}]</span>
          <span class="ref-text">\${ref.cite || ref}</span>
          \${ref.url ? \`<a href="\${ref.url}" target="_blank" class="ref-link">Source ↗</a>\` : ''}
        </li>
      \`).join("")
      : (topic.sections.references ? \`<li class="ref-item"><span class="ref-text">\${topic.sections.references}</span></li>\` : "");`;

if (!code.includes(targetStr)) {
  console.error("Target string not found in topicPages.js");
  process.exit(1);
}

code = code.replace(targetStr, replacementStr);

// Also update workedExamples handling
const targetWorkedExamples = `    // Build Worked Examples: either 3-Level Progressive or Single
    let workedExamplesHtml = "";
    if (topic.sections.workedExamples) {
      const we = topic.sections.workedExamples;
      workedExamplesHtml = \`
        <div class="progressive-examples-wrapper">
          <div class="flex space-x-2 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
            <button id="tab-btn-lvl1-\${topic.id}" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-600 text-white shadow-sm transition-all" onclick="TopicPageEngine.switchExampleLevel('\${topic.id}', 'lvl1')">
              Level 1: Beginner (Understand)
            </button>
            <button id="tab-btn-lvl2-\${topic.id}" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-all" onclick="TopicPageEngine.switchExampleLevel('\${topic.id}', 'lvl2')">
              Level 2: Intermediate (Apply)
            </button>
            <button id="tab-btn-lvl3-\${topic.id}" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-all" onclick="TopicPageEngine.switchExampleLevel('\${topic.id}', 'lvl3')">
              Level 3: Advanced (Analyze)
            </button>
          </div>
          
          <div id="tab-content-lvl1-\${topic.id}" class="worked-example-box blue">
            <div class="example-title">🌱 Level 1: Conceptual Understanding</div>
            <div class="text-xs leading-relaxed">\${we.level1}</div>
          </div>

          <div id="tab-content-lvl2-\${topic.id}" class="worked-example-box green hidden">
            <div class="example-title">⚙️ Level 2: Numerical Calculation & Step-by-Step Working</div>
            <div class="text-xs leading-relaxed">\${we.level2}</div>
          </div>

          <div id="tab-content-lvl3-\${topic.id}" class="worked-example-box purple hidden">
            <div class="example-title">🔬 Level 3: Protocol Analysis & Failure Recovery</div>
            <div class="text-xs leading-relaxed">\${we.level3}</div>
          </div>
        </div>
      \`;
    } else if (topic.sections.workedExample) {
      workedExamplesHtml = \`
        <div class="worked-example-box blue">
          <div class="example-title">📝 Step-by-Step Walkthrough</div>
          <div class="text-xs leading-relaxed">\${topic.sections.workedExample}</div>
        </div>
      \`;
    }`;

const replacementWorkedExamples = `    // Build Worked Examples: Array, 3-Level Progressive, or Single
    let workedExamplesHtml = "";
    if (topic.sections.workedExamples) {
      const we = topic.sections.workedExamples;
      if (Array.isArray(we)) {
        workedExamplesHtml = we.map((ex, idx) => \`
          <div class="worked-example-box blue mb-4 p-4 rounded-xl border border-blue-200 dark:border-blue-900 bg-white dark:bg-gray-800 shadow-sm">
            <div class="example-title font-bold text-sm text-blue-700 dark:text-blue-400 mb-2 flex items-center justify-between">
              <span>\${ex.title || \`Worked Example \${idx + 1}\`}</span>
              \${ex.difficulty ? \`<span class="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">\${ex.difficulty}</span>\` : ''}
            </div>
            \${ex.problem ? \`<div class="p-3 bg-blue-50/60 dark:bg-blue-950/30 rounded-lg text-xs mb-3 text-slate-800 dark:text-slate-200"><strong>Problem:</strong> \${ex.problem}</div>\` : ''}
            <div class="text-xs leading-relaxed text-slate-700 dark:text-slate-300">\${ex.solution || ex.content || ''}</div>
          </div>
        \`).join("");
      } else if (we.level1) {
        workedExamplesHtml = \`
          <div class="progressive-examples-wrapper">
            <div class="flex space-x-2 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              <button id="tab-btn-lvl1-\${topic.id}" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-600 text-white shadow-sm transition-all" onclick="TopicPageEngine.switchExampleLevel('\${topic.id}', 'lvl1')">
                Level 1: Beginner (Understand)
              </button>
              <button id="tab-btn-lvl2-\${topic.id}" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-all" onclick="TopicPageEngine.switchExampleLevel('\${topic.id}', 'lvl2')">
                Level 2: Intermediate (Apply)
              </button>
              <button id="tab-btn-lvl3-\${topic.id}" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-all" onclick="TopicPageEngine.switchExampleLevel('\${topic.id}', 'lvl3')">
                Level 3: Advanced (Analyze)
              </button>
            </div>
            
            <div id="tab-content-lvl1-\${topic.id}" class="worked-example-box blue">
              <div class="example-title">🌱 Level 1: Conceptual Understanding</div>
              <div class="text-xs leading-relaxed">\${we.level1}</div>
            </div>

            <div id="tab-content-lvl2-\${topic.id}" class="worked-example-box green hidden">
              <div class="example-title">⚙️ Level 2: Numerical Calculation & Step-by-Step Working</div>
              <div class="text-xs leading-relaxed">\${we.level2 || ''}</div>
            </div>

            <div id="tab-content-lvl3-\${topic.id}" class="worked-example-box purple hidden">
              <div class="example-title">🔬 Level 3: Protocol Analysis & Failure Recovery</div>
              <div class="text-xs leading-relaxed">\${we.level3 || ''}</div>
            </div>
          </div>
        \`;
      }
    } else if (topic.sections.workedExample) {
      workedExamplesHtml = \`
        <div class="worked-example-box blue">
          <div class="example-title">📝 Step-by-Step Walkthrough</div>
          <div class="text-xs leading-relaxed">\${topic.sections.workedExample}</div>
        </div>
      \`;
    }`;

if (!code.includes(targetWorkedExamples)) {
  console.error("targetWorkedExamples not found in topicPages.js");
  process.exit(1);
}

code = code.replace(targetWorkedExamples, replacementWorkedExamples);

fs.writeFileSync('js/topicPages.js', code, 'utf8');
console.log('Successfully patched topicPages.js with complete defensive guards!');

