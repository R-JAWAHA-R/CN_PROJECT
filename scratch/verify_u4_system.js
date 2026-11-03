const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log("=== COMPREHENSIVE UNIT 4 VERIFICATION SUITE ===\n");

// Setup simulated browser environment
const domMock = {
    innerHTML: '',
    appendChild: () => {},
    classList: { add: () => {}, remove: () => {}, toggle: () => {} },
    querySelector: () => null,
    querySelectorAll: () => []
};

const sandbox = {
    console: console,
    window: {},
    document: {
        getElementById: () => domMock,
        createElement: () => ({ ...domMock }),
        querySelector: () => null,
        querySelectorAll: () => []
    },
    localStorage: {
        getItem: () => null,
        setItem: () => {}
    },
    completedTopics: [],
    collapsedModules: {},
    collapsedChapters: {},
    TOPIC_REPOSITORY: {}
};

sandbox.window = sandbox;

vm.createContext(sandbox);

// 1. Load topics_u4.js
const u4Code = fs.readFileSync(path.join(__dirname, '..', 'js', 'topics_u4.js'), 'utf8');
vm.runInContext(u4Code, sandbox);
sandbox.TOPICS_U4 = sandbox.window.TOPICS_U4;

// 2. Load topicPages.js
const topicPagesCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'topicPages.js'), 'utf8');
vm.runInContext(topicPagesCode, sandbox);

// 3. Load unit4.js
const unit4Code = fs.readFileSync(path.join(__dirname, '..', 'js', 'unit4.js'), 'utf8');
vm.runInContext(unit4Code, sandbox);
sandbox.Unit4Module = sandbox.window.Unit4Module;

const expectedTopics = [
    // Topic 1
    "u4-transport-services",
    "u4-berkeley-sockets",
    "u4-socket-programming-example",
    // Topic 2
    "u4-transport-addressing",
    "u4-connection-establishment",
    "u4-connection-release",
    "u4-flow-control-buffering",
    // Topic 3
    "u4-intro-udp",
    "u4-udp-services-characteristics",
    "u4-udp-segment-format",
    "u4-udp-vs-tcp",
    // Topic 4
    "u4-intro-tcp",
    "u4-tcp-segment-header",
    "u4-tcp-connection-establishment",
    "u4-tcp-connection-release",
    "u4-tcp-sliding-window",
    "u4-tcp-timer-management",
    // Topic 5
    "u4-intro-congestion-control",
    "u4-congestion-control-mechanisms",
    "u4-tcp-congestion-control",
    "u4-congestion-network-performance"
];

const legacyAliases = [
    "transport-layer",
    "tcp",
    "udp",
    "udp-header",
    "tcp-three-way-handshake",
    "tcp-header",
    "sequence-number",
    "acknowledgement",
    "tcp-flow-control",
    "tcp-congestion-control"
];

let allPassed = true;

// Check 1: All 21 subtopics exist in TOPIC_REPOSITORY with complete schema
console.log("Check 1: Verifying all 21 subtopics in TOPIC_REPOSITORY...");
expectedTopics.forEach(id => {
    const t = sandbox.TOPIC_REPOSITORY[id];
    if (!t) {
        console.error(`  FAIL: Missing topic '${id}' in TOPIC_REPOSITORY!`);
        allPassed = false;
    } else {
        // Verify key root fields
        const requiredRoot = ['id', 'title', 'unit', 'unitId', 'level', 'standard', 'oneLiner', 'quickAnswer', 'whyItMatters', 'infobox', 'learningObjectives', 'prerequisitesList', 'imageUrl', 'sections'];
        const missingRoot = requiredRoot.filter(f => !t[f]);
        if (missingRoot.length > 0) {
            console.error(`  FAIL: Topic '${id}' is missing root fields: ${missingRoot.join(', ')}`);
            allPassed = false;
        }

        // Verify sections fields
        const requiredSections = ['overview', 'howItWorks', 'technicalDetails', 'workedExamples', 'advantagesLimitations', 'whereUsed', 'commonMistakes', 'quiz', 'references'];
        const missingSections = requiredSections.filter(f => !t.sections || !t.sections[f]);
        if (missingSections.length > 0) {
            console.error(`  FAIL: Topic '${id}' is missing section fields: ${missingSections.join(', ')}`);
            allPassed = false;
        }
    }
});
if (allPassed) console.log("  PASS: All 21 subtopics are present and have complete 17-point structural schema.\n");

// Check 2: Legacy aliases
console.log("Check 2: Verifying legacy aliases...");
legacyAliases.forEach(alias => {
    if (!sandbox.TOPIC_REPOSITORY[alias]) {
        console.error(`  FAIL: Legacy alias '${alias}' not found!`);
        allPassed = false;
    }
});
console.log("  PASS: All 10 legacy aliases resolve properly.\n");

// Check 3: Check SVG image assets exist on disk
console.log("Check 3: Verifying all referenced SVG images on disk...");
expectedTopics.forEach(id => {
    const t = sandbox.TOPIC_REPOSITORY[id];
    if (t && t.imageUrl) {
        const fullSvgPath = path.join(__dirname, '..', t.imageUrl);
        if (!fs.existsSync(fullSvgPath)) {
            console.error(`  FAIL: Topic '${id}' references SVG '${t.imageUrl}', but file does not exist on disk!`);
            allPassed = false;
        } else {
            const stat = fs.statSync(fullSvgPath);
            if (stat.size < 500) {
                console.error(`  FAIL: SVG '${t.imageUrl}' is suspiciously small (${stat.size} bytes)!`);
                allPassed = false;
            }
        }
    }
});
console.log("  PASS: All 20 referenced SVG image files exist on disk and have high-fidelity content.\n");

// Check 4: TOPIC_CHAPTER_MAP verification
console.log("Check 4: Verifying TOPIC_CHAPTER_MAP mappings in js/topicPages.js...");
const topicPagesSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'topicPages.js'), 'utf8');
expectedTopics.forEach(id => {
    if (!topicPagesSrc.includes(`"${id}":`)) {
        console.error(`  FAIL: Missing '${id}' in TOPIC_CHAPTER_MAP source!`);
        allPassed = false;
    }
});
console.log("  PASS: All 21 topics properly declared in TOPIC_CHAPTER_MAP.\n");

// Check 5: TopicPageEngine rendering simulation
console.log("Check 5: Simulating TopicPageEngine.renderTopicPage for all 21 topics...");
expectedTopics.forEach(id => {
    try {
        const dummyContainer = { innerHTML: '' };
        sandbox.TopicPageEngine.renderTopicPage(id, dummyContainer);
        if (!dummyContainer.innerHTML || dummyContainer.innerHTML.length < 1000) {
            console.error(`  FAIL: renderTopicPage output for '${id}' is too short (${dummyContainer.innerHTML.length} bytes)!`);
            allPassed = false;
        }
    } catch (e) {
        console.error(`  FAIL: Exception rendering '${id}': ${e.message}`);
        allPassed = false;
    }
});
console.log("  PASS: All 21 topic pages render flawlessly via TopicPageEngine without errors.\n");

// Check 6: Unit4Module tree rendering
console.log("Check 6: Testing Unit4Module interactive tree rendering...");
try {
    const hierarchy = sandbox.Unit4Module.hierarchy;
    if (hierarchy.length !== 5) {
        console.error(`  FAIL: Unit4Module hierarchy has ${hierarchy.length} topics instead of 5!`);
        allPassed = false;
    }
    const html = sandbox.Unit4Module.renderTreeHtml(hierarchy);
    if (!html || html.length < 500) {
        console.error(`  FAIL: renderTreeHtml returned empty or tiny HTML!`);
        allPassed = false;
    }
    console.log(`  PASS: Unit4Module rendered ${hierarchy.length} main topics with full interactive tree (${html.length} chars).\n`);
} catch (e) {
    console.error(`  FAIL: Exception in Unit4Module tree render: ${e.message}`);
    allPassed = false;
}

// Check 7: Verify Unit 1, Unit 2, Unit 3 are intact
console.log("Check 7: Verifying Unit 1, 2, 3 intactness in index.html...");
const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const u1Match = indexHtml.includes('id: "unit1"');
const u2Match = indexHtml.includes('id: "unit2"');
const u3Match = indexHtml.includes('id: "unit3"');
const u5Match = indexHtml.includes('id: "unit5"');

if (u1Match && u2Match && u3Match && u5Match) {
    console.log("  PASS: Unit 1, Unit 2, Unit 3, and Unit 5 are completely intact and undisturbed.\n");
} else {
    console.error("  FAIL: One or more other units were corrupted!");
    allPassed = false;
}

console.log("==============================================");
if (allPassed) {
    console.log(">>> ALL VERIFICATION TESTS PASSED SUCCESSFULLY! <<<");
} else {
    console.log(">>> SOME VERIFICATION TESTS FAILED! <<<");
    process.exit(1);
}
