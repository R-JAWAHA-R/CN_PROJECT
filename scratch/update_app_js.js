const fs = require('fs');
let appJs = fs.readFileSync('js/app.js', 'utf8');

// Update Unit 2 card in home dashboard
appJs = appJs.replace(
  '<span class="text-[11px] text-gray-500">27 Articles</span>',
  '<span class="text-[11px] text-gray-500">11 Topics • 83 Lessons</span>'
);

appJs = appJs.replace(
  '<h4 class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-gfg-green transition-colors">Data Link Layer &amp; MAC</h4>',
  '<h4 class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-gfg-green transition-colors">Unit 2 – Data Link Layer</h4>'
);

// Update Unit II Directory on home dashboard
const oldDirRegex = /<!-- UNIT II DIRECTORY -->[\s\S]*?<!-- UNIT III DIRECTORY -->/;
const newDirHtml = `<!-- UNIT II DIRECTORY -->
        <div class="study-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3 style="color: #0284c7; font-size: 1.25rem; font-weight: 800; margin: 0;">
              Unit 2 – Data Link Layer
            </h3>
            <span class="badge" style="background: #e0f2fe; color: #0284c7; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">11 Topics</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.45rem;">
            <button class="topic-nav-btn" onclick="App.loadTopic('u2-dll-intro')">Topic 1 – Data Link Layer Fundamentals →</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('u2-dll-protocols-intro')">Topic 2 – Data Link Layer Protocols →</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('u2-mac-sublayer-intro')">Topic 3 – Medium Access Control (MAC) Sublayer →</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('u2-multiple-access-intro')">Topic 4 – Multiple Access Protocols →</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('u2-collision-free-intro')">Topic 5 – Collision-Free Protocols →</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('ethernet')">Topic 6 – Ethernet MAC Sublayer Protocol →</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('wireless-lan-protocols')">Topic 7 – Wireless LAN Protocols →</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('wifi-mac-sublayer')">Topic 8 – IEEE 802.11 MAC Sublayer Protocol →</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('dll-switching')">Topic 9 – Data Link Layer Switching →</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('network-devices')">Topic 10 – Networking Devices →</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('u2-definitions-terminology')">Topic 11 – Revision and Assessment →</button>
          </div>
        </div>

        <!-- UNIT III DIRECTORY -->`;

if (oldDirRegex.test(appJs)) {
  appJs = appJs.replace(oldDirRegex, newDirHtml);
  fs.writeFileSync('js/app.js', appJs, 'utf8');
  console.log("Successfully updated js/app.js!");
} else {
  console.error("Could not find Unit II directory regex in js/app.js");
}

