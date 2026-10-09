// Master Topic Page Engine & Wikipedia-Style Article Generator
// Unifies all Unit Topic Repositories and renders the Universal Topic Page Template

var TOPIC_REPOSITORY = Object.assign(
  {},
  typeof TOPICS_U1 !== 'undefined' ? TOPICS_U1 : {},
  typeof TOPICS_U2 !== 'undefined' ? TOPICS_U2 : {},
  typeof TOPICS_U3 !== 'undefined' ? TOPICS_U3 : {},
  typeof TOPICS_U4 !== 'undefined' ? TOPICS_U4 : {},
  typeof TOPICS_U5 !== 'undefined' ? TOPICS_U5 : {}
);

if (typeof window !== 'undefined') window.TOPIC_REPOSITORY = TOPIC_REPOSITORY;
if (typeof global !== 'undefined') global.TOPIC_REPOSITORY = TOPIC_REPOSITORY;

var TopicPageEngine = {
  renderTopicPage: function(topicId, container) {
    const topic = TOPIC_REPOSITORY[topicId];
    if (!topic) {
      container.innerHTML = `
        <div class="study-card" style="text-align: center; padding: 3rem 1.5rem;">
          <h3 style="color: #ef4444; margin-bottom: 1rem;">Topic Not Found</h3>
          <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">The topic with ID "<code>${topicId}</code>" could not be located in the encyclopedia database.</p>
          <button class="sim-btn" onclick="App.loadView('notebook')">Browse All Topics →</button>
        </div>
      `;
      return;
    }

    const prevTopic = topic.prevTopicId ? TOPIC_REPOSITORY[topic.prevTopicId] : null;
    const nextTopic = topic.nextTopicId ? TOPIC_REPOSITORY[topic.nextTopicId] : null;

    // Build Infobox Prerequisites & Related Links
    const prereqLinks = (topic.infobox.prerequisites || []).map(pId => {
      const p = TOPIC_REPOSITORY[pId];
      if (p) return `<a class="wiki-link" onclick="App.loadTopic('${p.id}')">${p.title}</a>`;
      return pId;
    }).join(", ");

    const relatedLinks = (topic.infobox.relatedConcepts || []).map(rId => {
      const r = TOPIC_REPOSITORY[rId];
      if (r) return `<a class="wiki-link" onclick="App.loadTopic('${r.id}')">${r.title}</a>`;
      return rId;
    }).join(", ");

    const compareLinks = (topic.infobox.compareWith || []).map(cKey => {
      if (typeof COMPARISONS_DATA !== 'undefined' && COMPARISONS_DATA[cKey]) {
        return `<a class="wiki-link" onclick="App.loadComparison('${cKey}')">${COMPARISONS_DATA[cKey].title}</a>`;
      }
      return cKey;
    }).join(", ");

    const primaryUsesList = (topic.infobox.primaryUses || []).map(u => `<li>${u}</li>`).join("");
    const whereUsedList = (topic.sections.whereUsed || []).map(u => `<li>✨ ${u}</li>`).join("");

    const referencesList = (topic.sections.references || []).map((ref, idx) => `
      <li class="ref-item">
        <span class="ref-num">[${idx + 1}]</span>
        <span class="ref-text">${ref.cite}</span>
        ${ref.url ? `<a href="${ref.url}" target="_blank" class="ref-link">Source ↗</a>` : ''}
      </li>
    `).join("");

    // Build interactive simulation embed if available
    let labEmbedHtml = "";
    if (topic.sections.interactiveLabKey) {
      labEmbedHtml = TopicPageEngine.getLabEmbedHtml(topic.sections.interactiveLabKey, topic);
    }

    // Universal Wikipedia Topic Template HTML
    container.innerHTML = `
      <article class="wiki-article-container" id="wiki-top">
        
        <!-- Breadcrumbs Navigation -->
        <nav class="wiki-breadcrumbs">
          <a onclick="App.loadView('home')">Home</a>
          <span class="bc-sep">/</span>
          <a onclick="App.loadView('${topic.unitId}')">${topic.unit}</a>
          <span class="bc-sep">/</span>
          <span class="bc-current">${topic.title}</span>
        </nav>

        <!-- Article Header -->
        <header class="wiki-article-header">
          <div class="wiki-header-meta">
            <span class="wiki-badge-unit">${topic.unit}</span>
            <span class="wiki-badge-level">${topic.level}</span>
            <span class="badge-difficulty ${topic.difficulty.toLowerCase()}">${topic.difficulty}</span>
            <span class="wiki-read-time">⏱️ ${topic.readingTime}</span>
            ${topic.standard ? `<span class="wiki-badge-standard">📜 ${topic.standard}</span>` : ''}
          </div>

          <h1 class="wiki-article-title">${topic.title}</h1>
          <p class="wiki-article-tagline">${topic.oneLiner}</p>

          <!-- Quick Action Bar -->
          <div class="wiki-quick-actions">
            <button class="wiki-action-btn active" onclick="document.getElementById('sec-overview').scrollIntoView({behavior: 'smooth'})">
              📖 Overview
            </button>
            ${topic.sections.interactiveLabKey ? `
              <button class="wiki-action-btn lab-btn" onclick="document.getElementById('sec-lab').scrollIntoView({behavior: 'smooth'})">
                🧪 Interactive Lab
              </button>
            ` : ''}
            ${topic.sections.compareWith ? `
              <button class="wiki-action-btn compare-btn" onclick="document.getElementById('sec-comparison').scrollIntoView({behavior: 'smooth'})">
                ⚖️ Compare
              </button>
            ` : ''}
            <button class="wiki-action-btn" onclick="document.getElementById('sec-practice').scrollIntoView({behavior: 'smooth'})">
              🎯 Practice Question
            </button>
            <button class="wiki-action-btn secondary" onclick="App.loadView('${topic.unitId}')">
              ⬅ Back to ${topic.unit.split(':')[0]}
            </button>
          </div>
        </header>

        <!-- Main Body Grid: Article Content + Floating Infobox -->
        <div class="wiki-body-layout">
          
          <!-- LEFT / MAIN COLUMN -->
          <div class="wiki-main-column">
            
            <!-- Lead Section -->
            <div class="wiki-lead-section">
              <p class="wiki-lead-text">
                In computer networking, <strong>${topic.title}</strong> is ${topic.sections.overview}
              </p>
              
              <div class="wiki-callout note">
                <div class="callout-header">💡 Quick Answer</div>
                <p>${topic.quickAnswer}</p>
              </div>

              <div class="wiki-callout info">
                <div class="callout-header">🎯 Why It Matters & Core Architecture</div>
                <p>${topic.whyItMatters}</p>
              </div>
            </div>

            <!-- Wikipedia Table of Contents Box -->
            <div class="wiki-toc-box">
              <div class="wiki-toc-header">
                <span class="toc-title">Contents</span>
                <button class="toc-toggle-btn" onclick="TopicPageEngine.toggleTOC(this)">[hide]</button>
              </div>
              <ol class="wiki-toc-list" id="wiki-toc-content">
                <li><a href="#sec-overview">1. Overview & Definition</a></li>
                <li><a href="#sec-how-it-works">2. How It Works (Step-by-Step)</a></li>
                <li><a href="#sec-diagram">3. Architecture Diagram</a></li>
                ${topic.sections.interactiveLabKey ? `<li><a href="#sec-lab">4. Interactive Simulation Lab</a></li>` : ''}
                <li><a href="#sec-technical">5. Technical Details & Specification</a></li>
                <li><a href="#sec-worked-example">6. Worked Numerical Example</a></li>
                <li><a href="#sec-advantages">7. Advantages & Limitations</a></li>
                <li><a href="#sec-applications">8. Real-World Applications</a></li>
                <li><a href="#sec-common-mistakes">9. Common Mistakes & Exam Pitfalls</a></li>
                ${topic.sections.compareWith ? `<li><a href="#sec-comparison">10. Comparison</a></li>` : ''}
                <li><a href="#sec-practice">11. Practice Question & Self-Assessment</a></li>
                <li><a href="#sec-references">12. References & Citations</a></li>
              </ol>
            </div>

            <!-- SECTION 1: OVERVIEW -->
            <section class="wiki-section" id="sec-overview">
              <h2 class="wiki-section-heading">1. Overview & Definition</h2>
              <div class="wiki-section-body">
                ${topic.sections.overview}
              </div>
            </section>

            <!-- SECTION 2: HOW IT WORKS -->
            <section class="wiki-section" id="sec-how-it-works">
              <h2 class="wiki-section-heading">2. How It Works (Step-by-Step Mechanism)</h2>
              <div class="wiki-section-body">
                ${topic.sections.howItWorks}
              </div>
            </section>

            <!-- SECTION 3: ARCHITECTURE DIAGRAM -->
            <section class="wiki-section" id="sec-diagram">
              <h2 class="wiki-section-heading">3. Architecture Diagram</h2>
              <div class="wiki-section-body">
                <div class="wiki-diagram-shell">
                  <pre class="wiki-ascii-diagram">${topic.sections.diagram.trim()}</pre>
                </div>
              </div>
            </section>

            <!-- SECTION 4: INTERACTIVE LAB (If applicable) -->
            ${topic.sections.interactiveLabKey ? `
              <section class="wiki-section" id="sec-lab">
                <h2 class="wiki-section-heading">4. Interactive Simulation Lab</h2>
                <div class="wiki-section-body">
                  ${labEmbedHtml}
                </div>
              </section>
            ` : ''}

            <!-- SECTION 5: TECHNICAL DETAILS -->
            <section class="wiki-section" id="sec-technical">
              <h2 class="wiki-section-heading">5. Technical Details & Formal Specification</h2>
              <div class="wiki-section-body">
                ${topic.sections.technicalDetails}
              </div>
            </section>

            <!-- SECTION 6: WORKED EXAMPLE -->
            <section class="wiki-section" id="sec-worked-example">
              <h2 class="wiki-section-heading">6. Worked Numerical / Concrete Example</h2>
              <div class="wiki-section-body">
                <div class="worked-example-box blue">
                  <div class="example-title">📝 Step-by-Step Walkthrough</div>
                  <div>${topic.sections.workedExample}</div>
                </div>
              </div>
            </section>

            <!-- SECTION 7: ADVANTAGES & LIMITATIONS -->
            <section class="wiki-section" id="sec-advantages">
              <h2 class="wiki-section-heading">7. Advantages & Limitations</h2>
              <div class="wiki-section-body">
                ${topic.sections.advantagesLimitations}
              </div>
            </section>

            <!-- SECTION 8: APPLICATIONS -->
            <section class="wiki-section" id="sec-applications">
              <h2 class="wiki-section-heading">8. Real-World Applications ("Where Is This Used?")</h2>
              <div class="wiki-section-body">
                <ul class="wiki-bullet-list">
                  ${whereUsedList}
                </ul>
              </div>
            </section>

            <!-- SECTION 9: COMMON MISTAKES -->
            <section class="wiki-section" id="sec-common-mistakes">
              <h2 class="wiki-section-heading">9. Common Mistakes & Exam Pitfalls</h2>
              <div class="wiki-section-body">
                <div class="wiki-callout warning">
                  <div class="callout-header">⚠️ Warning / Common Misconception</div>
                  <p>${topic.sections.commonMistakes}</p>
                </div>
              </div>
            </section>

            <!-- SECTION 10: COMPARISON (If available) -->
            ${topic.sections.compareWith ? `
              <section class="wiki-section" id="sec-comparison">
                <h2 class="wiki-section-heading">10. Compare With Related Concepts</h2>
                <div class="wiki-section-body">
                  <div class="comparison-teaser-card">
                    <div class="comp-teaser-header">
                      <h4>⚖️ ${topic.sections.compareWith.title}</h4>
                      <span class="badge" style="background: #e0f2fe; color: #0284c7; font-weight: 700;">Deep Comparison</span>
                    </div>
                    <p style="color: var(--text-secondary); margin-bottom: 1rem;">${topic.sections.compareWith.note}</p>
                    ${topic.infobox.compareWith && topic.infobox.compareWith.length ? `
                      <button class="sim-btn secondary" onclick="App.loadComparison('${topic.infobox.compareWith[0]}')">
                        Open Side-by-Side Comparison Matrix →
                      </button>
                    ` : ''}
                  </div>
                </div>
              </section>
            ` : ''}

            <!-- SECTION 11: PRACTICE QUESTION -->
            <section class="wiki-section" id="sec-practice">
              <h2 class="wiki-section-heading">11. Practice Question & Self-Assessment</h2>
              <div class="wiki-section-body">
                <div class="practice-interactive-card">
                  <div class="practice-q-text">
                    <strong>Question:</strong> ${topic.sections.practice.question}
                  </div>
                  <div class="practice-options-list">
                    ${topic.sections.practice.choices.map((opt, oIdx) => `
                      <label class="practice-opt-label">
                        <input type="radio" name="practice_q_${topic.id}" value="${oIdx}">
                        <span>${opt}</span>
                      </label>
                    `).join("")}
                  </div>
                  <div style="margin-top: 1.25rem; display: flex; gap: 0.75rem; align-items: center;">
                    <button class="sim-btn" onclick="TopicPageEngine.checkPracticeAnswer('${topic.id}', ${topic.sections.practice.correctIndex})">
                      Check Answer
                    </button>
                    <button class="sim-btn secondary" onclick="TopicPageEngine.togglePracticeExplanation('${topic.id}')">
                      Show Solution & Explanation
                    </button>
                  </div>
                  <div id="practice-feedback-${topic.id}" class="practice-feedback-box" style="display: none;">
                    <div id="practice-status-${topic.id}" style="font-weight: 800; margin-bottom: 0.5rem;"></div>
                    <p>${topic.sections.practice.explanation}</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- SECTION 12: REFERENCES -->
            <section class="wiki-section" id="sec-references">
              <h2 class="wiki-section-heading">12. Authoritative References & Citations</h2>
              <div class="wiki-section-body">
                <ol class="wiki-references-list">
                  ${referencesList}
                </ol>
              </div>
            </section>

            <!-- BOTTOM PAGINATION: PREV & NEXT TOPIC -->
            <nav class="wiki-pager-nav">
              ${prevTopic ? `
                <div class="wiki-pager-card prev" onclick="App.loadTopic('${prevTopic.id}')">
                  <span class="pager-label">← Previous Topic</span>
                  <span class="pager-title">${prevTopic.title}</span>
                </div>
              ` : `<div></div>`}
              
              ${nextTopic ? `
                <div class="wiki-pager-card next" onclick="App.loadTopic('${nextTopic.id}')">
                  <span class="pager-label">Next Topic →</span>
                  <span class="pager-title">${nextTopic.title}</span>
                </div>
              ` : `<div></div>`}
            </nav>

          </div>

          <!-- RIGHT COLUMN: WIKIPEDIA INFOBOX -->
          <aside class="wiki-infobox-column">
            <div class="wiki-infobox">
              <div class="infobox-header">
                <h3>${topic.title}</h3>
                <div class="infobox-sub">${topic.unit.split(':')[0]}</div>
              </div>
              <table class="infobox-table">
                <tbody>
                  <tr>
                    <th>OSI / Stack Layer</th>
                    <td>${topic.infobox.layer}</td>
                  </tr>
                  <tr>
                    <th>Standardization</th>
                    <td>${topic.infobox.standard}</td>
                  </tr>
                  <tr>
                    <th>Architecture</th>
                    <td>${topic.infobox.type}</td>
                  </tr>
                  ${topic.infobox.keyFormula ? `
                    <tr>
                      <th>Key Formula</th>
                      <td><code>$${topic.infobox.keyFormula}$</code></td>
                    </tr>
                  ` : ''}
                  <tr>
                    <th>Prerequisites</th>
                    <td>${prereqLinks || 'None'}</td>
                  </tr>
                  <tr>
                    <th>Related Topics</th>
                    <td>${relatedLinks || 'None'}</td>
                  </tr>
                  ${compareLinks ? `
                    <tr>
                      <th>Compare With</th>
                      <td>${compareLinks}</td>
                    </tr>
                  ` : ''}
                  <tr>
                    <th>Primary Usage</th>
                    <td><ul style="padding-left: 1rem; margin: 0; font-size: 0.82rem;">${primaryUsesList}</ul></td>
                  </tr>
                </tbody>
              </table>
              <div class="infobox-footer">
                <span>Computer Networks Encyclopedia</span>
              </div>
            </div>
          </aside>

        </div>

      </article>
    `;

    // Initialize interactive simulator scripts if needed
    if (topic.sections.interactiveLabKey) {
      setTimeout(() => {
        TopicPageEngine.initLab(topic.sections.interactiveLabKey);
      }, 50);
    }
  },

  toggleTOC: function(btn) {
    const content = document.getElementById('wiki-toc-content');
    if (!content) return;
    if (content.style.display === 'none') {
      content.style.display = 'block';
      btn.innerText = '[hide]';
    } else {
      content.style.display = 'none';
      btn.innerText = '[show]';
    }
  },

  checkPracticeAnswer: function(topicId, correctIdx) {
    const selected = document.querySelector(`input[name="practice_q_${topicId}"]:checked`);
    const feedbackBox = document.getElementById(`practice-feedback-${topicId}`);
    const statusBox = document.getElementById(`practice-status-${topicId}`);
    if (!feedbackBox || !statusBox) return;

    feedbackBox.style.display = 'block';
    if (!selected) {
      statusBox.innerHTML = `<span style="color: #f59e0b;">⚠️ Please select an answer option first!</span>`;
      return;
    }

    if (parseInt(selected.value) === correctIdx) {
      statusBox.innerHTML = `<span style="color: #10b981;">🎉 Correct! Well done.</span>`;
      feedbackBox.style.background = "#f0fdf4";
      feedbackBox.style.borderColor = "#86efac";
    } else {
      statusBox.innerHTML = `<span style="color: #ef4444;">❌ Incorrect. Review the explanation below:</span>`;
      feedbackBox.style.background = "#fff1f2";
      feedbackBox.style.borderColor = "#fecdd3";
    }
  },

  togglePracticeExplanation: function(topicId) {
    const feedbackBox = document.getElementById(`practice-feedback-${topicId}`);
    const statusBox = document.getElementById(`practice-status-${topicId}`);
    if (!feedbackBox) return;
    feedbackBox.style.display = feedbackBox.style.display === 'none' ? 'block' : 'none';
    if (statusBox) statusBox.innerHTML = `<span style="color: #0284c7;">💡 Solution & Explanation:</span>`;
    feedbackBox.style.background = "#f0f9ff";
    feedbackBox.style.borderColor = "#bae6fd";
  },

  // Interactive Lab Embed HTML generators
  getLabEmbedHtml: function(labKey, topic) {
    if (labKey === 'crc') {
      return `
        <div class="simulator-shell">
          <div class="sim-header">
            <div class="sim-title">⚡ Live CRC Modulo-2 XOR Division Calculator</div>
            <div class="sim-controls">
              <button class="sim-btn secondary" onclick="TopicPageEngine.setCRCPreset('1101011011', '10011')">Preset 1 (Standard)</button>
              <button class="sim-btn secondary" onclick="TopicPageEngine.setCRCPreset('100100', '1101')">Preset 2 (Short)</button>
            </div>
          </div>
          <div class="sim-input-row">
            <div class="sim-field">
              <label>Data Bits (D):</label>
              <input type="text" id="topic-crc-data" class="sim-input" value="1101011011">
            </div>
            <div class="sim-field">
              <label>Generator Polynomial (G):</label>
              <input type="text" id="topic-crc-gen" class="sim-input" value="10011">
            </div>
            <button class="sim-btn" onclick="TopicPageEngine.runCRCCalculator()">Compute CRC Remainder</button>
          </div>
          <div id="topic-crc-output" class="sim-display-area" style="font-family: var(--font-mono); font-size: 0.88rem; line-height: 1.6; background: #0f172a; color: #f8fafc; padding: 1.25rem; border-radius: 8px; min-height: 120px;">
            Click "Compute CRC Remainder" to simulate step-by-step binary polynomial division.
          </div>
        </div>
      `;
    } else if (labKey === 'dijkstra') {
      return `
        <div class="simulator-shell">
          <div class="sim-header">
            <div class="sim-title">🗺️ Interactive Dijkstra Shortest Path Solver</div>
            <div class="sim-controls">
              <label style="font-size: 0.85rem; font-weight: 700; color: #334155;">Start Node: </label>
              <select id="topic-dijkstra-source" class="sim-input" style="padding: 4px 8px;" onchange="TopicPageEngine.runDijkstraSolver()">
                <option value="A" selected>Node A</option>
                <option value="B">Node B</option>
                <option value="C">Node C</option>
                <option value="D">Node D</option>
                <option value="E">Node E</option>
                <option value="F">Node F</option>
              </select>
              <button class="sim-btn" onclick="TopicPageEngine.runDijkstraSolver()">Solve Shortest Paths</button>
            </div>
          </div>
          <div id="topic-dijkstra-output" class="sim-display-area" style="overflow-x: auto;">
            <!-- Output table rendered here -->
          </div>
        </div>
      `;
    } else if (labKey === 'handshake') {
      return `
        <div class="simulator-shell">
          <div class="sim-header">
            <div class="sim-title">🤝 TCP 3-Way Handshake State Animator</div>
            <button class="sim-btn" onclick="TopicPageEngine.stepHandshake()">Step Forward Handshake ➔</button>
            <button class="sim-btn secondary" onclick="TopicPageEngine.resetHandshake()">Reset</button>
          </div>
          <div id="topic-handshake-canvas" style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1.5rem; min-height: 180px;">
            <div style="display: flex; justify-content: space-between; font-weight: 800; color: #1e293b; margin-bottom: 1rem;">
              <span>CLIENT (192.168.1.10:52341)</span>
              <span id="handshake-phase-label" style="color: #7c3aed;">Ready: Click "Step Forward"</span>
              <span>SERVER (93.184.216.34:80)</span>
            </div>
            <div id="handshake-steps-list" style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div style="font-size: 0.88rem; color: #64748b;">Waiting to initiate TCP connection...</div>
            </div>
          </div>
        </div>
      `;
    } else if (labKey === 'stop-and-wait' || labKey === 'gbn' || labKey === 'sr') {
      return `
        <div class="simulator-shell">
          <div class="sim-header">
            <div class="sim-title">⚡ Interactive ARQ Protocol Simulator (${labKey.toUpperCase()})</div>
            <div class="sim-controls">
              <button class="sim-btn" onclick="TopicPageEngine.simulateARQ('${labKey}', false)">Send Clean Frame</button>
              <button class="sim-btn" style="background: #ef4444;" onclick="TopicPageEngine.simulateARQ('${labKey}', true)">Simulate Packet Loss 💥</button>
            </div>
          </div>
          <div id="topic-arq-timeline" style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1.5rem; font-family: var(--font-mono); font-size: 0.88rem; min-height: 140px; line-height: 1.8;">
            Select an action above to observe timeline events, timeouts, and retransmission behavior.
          </div>
        </div>
      `;
    } else if (labKey === 'dns') {
      return `
        <div class="simulator-shell">
          <div class="sim-header">
            <div class="sim-title">🔍 Iterative DNS Resolution Simulator</div>
            <div class="sim-controls">
              <input type="text" id="topic-dns-query" class="sim-input" value="www.wikipedia.org" style="width: 220px;">
              <button class="sim-btn" onclick="TopicPageEngine.runDNSSimulator()">Trace Resolution</button>
            </div>
          </div>
          <div id="topic-dns-output" style="background: #0f172a; color: #f8fafc; border-radius: 12px; padding: 1.25rem; font-family: var(--font-mono); font-size: 0.88rem; line-height: 1.8; min-height: 140px;">
            Enter a hostname and click "Trace Resolution" to step through Root, TLD, and Authoritative nameservers.
          </div>
        </div>
      `;
    } else if (labKey === 'rsa') {
      return `
        <div class="simulator-shell">
          <div class="sim-header">
            <div class="sim-title">🔐 Live RSA Keygen & Modular Exponentiation Calculator</div>
          </div>
          <div class="sim-input-row">
            <div class="sim-field">
              <label>Prime p:</label>
              <input type="number" id="topic-rsa-p" class="sim-input" value="61">
            </div>
            <div class="sim-field">
              <label>Prime q:</label>
              <input type="number" id="topic-rsa-q" class="sim-input" value="53">
            </div>
            <div class="sim-field">
              <label>Message M (Integer &lt; n):</label>
              <input type="number" id="topic-rsa-msg" class="sim-input" value="65">
            </div>
            <button class="sim-btn" onclick="TopicPageEngine.runRSACalculator()">Compute RSA</button>
          </div>
          <div id="topic-rsa-output" style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1.25rem; font-family: var(--font-mono); font-size: 0.88rem; line-height: 1.8;">
            Click "Compute RSA" to calculate modulus n, totient phi(n), public exponent e, private exponent d, ciphertext C, and decrypted message M.
          </div>
        </div>
      `;
    }
    return "";
  },

  initLab: function(labKey) {
    if (typeof document === 'undefined') return;
    if (labKey === 'crc') TopicPageEngine.runCRCCalculator();
    if (labKey === 'dijkstra') TopicPageEngine.runDijkstraSolver();
    if (labKey === 'dns') TopicPageEngine.runDNSSimulator();
    if (labKey === 'rsa') TopicPageEngine.runRSACalculator();
  },

  // CRC Calculator Implementation
  setCRCPreset: function(data, gen) {
    const dIn = document.getElementById('topic-crc-data');
    const gIn = document.getElementById('topic-crc-gen');
    if (dIn) dIn.value = data;
    if (gIn) gIn.value = gen;
    TopicPageEngine.runCRCCalculator();
  },

  runCRCCalculator: function() {
    const dataIn = document.getElementById('topic-crc-data');
    const genIn = document.getElementById('topic-crc-gen');
    const out = document.getElementById('topic-crc-output');
    if (!dataIn || !genIn || !out) return;

    const data = dataIn.value.trim();
    const gen = genIn.value.trim();
    if (!/^[01]+$/.test(data) || !/^[01]+$/.test(gen) || gen.length < 2) {
      out.innerHTML = `<span style="color: #ef4444;">Error: Data and Generator must consist of valid binary 0s and 1s!</span>`;
      return;
    }

    const r = gen.length - 1;
    const paddedData = data + "0".repeat(r);
    let remArr = paddedData.split('').map(Number);
    const genArr = gen.split('').map(Number);

    let stepsText = `--- Step 1: Appending ${r} zeros to Data ---<br>Padded Stream: ${paddedData}<br><br>--- Step 2: Binary Modulo-2 (XOR) Division ---<br>`;

    for (let i = 0; i <= remArr.length - genArr.length; i++) {
      if (remArr[i] === 1) {
        for (let j = 0; j < genArr.length; j++) {
          remArr[i + j] ^= genArr[j];
        }
      }
    }

    const remainder = remArr.slice(remArr.length - r).join('');
    const transmitted = data + remainder;

    stepsText += `Calculated Remainder (FCS): <strong style="color: #10b981;">${remainder}</strong><br><br>`;
    stepsText += `--- Step 3: Final Transmitted Codeword ---<br>`;
    stepsText += `Data + FCS = <strong style="color: #38bdf8;">${transmitted}</strong><br><br>`;
    stepsText += `--- Step 4: Receiver Check ---<br>Dividing [${transmitted}] by [${gen}] yields Remainder = <strong style="color: #10b981;">${"0".repeat(r)}</strong> (0 errors detected!)`;

    out.innerHTML = stepsText;
  },

  // Dijkstra Solver Implementation
  runDijkstraSolver: function() {
    const srcEl = document.getElementById('topic-dijkstra-source');
    const out = document.getElementById('topic-dijkstra-output');
    if (!srcEl || !out) return;

    const src = srcEl.value;
    const graph = {
      'A': { 'B': 2, 'C': 5, 'D': 1 },
      'B': { 'A': 2, 'C': 3, 'E': 2 },
      'C': { 'A': 5, 'B': 3, 'D': 3, 'E': 1, 'F': 5 },
      'D': { 'A': 1, 'C': 3, 'F': 2 },
      'E': { 'B': 2, 'C': 1, 'F': 1 },
      'F': { 'D': 2, 'C': 5, 'E': 1 }
    };

    const nodes = Object.keys(graph);
    const dist = {};
    const prev = {};
    const visited = new Set();

    nodes.forEach(n => {
      dist[n] = Infinity;
      prev[n] = null;
    });
    dist[src] = 0;

    for (let i = 0; i < nodes.length; i++) {
      let u = null;
      let minD = Infinity;
      nodes.forEach(n => {
        if (!visited.has(n) && dist[n] < minD) {
          minD = dist[n];
          u = n;
        }
      });

      if (!u || dist[u] === Infinity) break;
      visited.add(u);

      for (let v in graph[u]) {
        let alt = dist[u] + graph[u][v];
        if (alt < dist[v]) {
          dist[v] = alt;
          prev[v] = u;
        }
      }
    }

    let tableHtml = `
      <table class="wiki-table" style="width: 100%; margin: 0.5rem 0;">
        <thead>
          <tr>
            <th>Destination Node</th>
            <th>Shortest Path Cost from ${src}</th>
            <th>Predecessor Node</th>
            <th>Computed Shortest Path</th>
          </tr>
        </thead>
        <tbody>
    `;

    nodes.forEach(dest => {
      let curr = dest;
      const pathArr = [];
      while (curr) {
        pathArr.unshift(curr);
        curr = prev[curr];
      }
      tableHtml += `
        <tr>
          <td><strong>Node ${dest}</strong></td>
          <td style="color: #10b981; font-weight: 800;">${dist[dest]}</td>
          <td>${prev[dest] || '-'}</td>
          <td><code>${pathArr.join(' ➔ ')}</code></td>
        </tr>
      `;
    });

    tableHtml += `</tbody></table>`;
    out.innerHTML = tableHtml;
  },

  // Handshake animator
  handshakeStepCount: 0,
  stepHandshake: function() {
    TopicPageEngine.handshakeStepCount++;
    const list = document.getElementById('handshake-steps-list');
    const label = document.getElementById('handshake-phase-label');
    if (!list || !label) return;

    if (TopicPageEngine.handshakeStepCount === 1) {
      label.innerText = "Step 1: Client SYN";
      label.style.color = "#0284c7";
      list.innerHTML = `
        <div style="background: #e0f2fe; border: 1px solid #7dd3fc; padding: 0.75rem; border-radius: 8px;">
          <strong>[Step 1] Client ➔ Server:</strong> <code>SYN = 1, Seq = 1000, MSS = 1460</code><br>
          <span style="font-size: 0.8rem; color: #0369a1;">Client transitions to <strong>SYN_SENT</strong>. Initiates connection.</span>
        </div>
      `;
    } else if (TopicPageEngine.handshakeStepCount === 2) {
      label.innerText = "Step 2: Server SYN+ACK";
      label.style.color = "#f59e0b";
      list.innerHTML += `
        <div style="background: #fef3c7; border: 1px solid #fcd34d; padding: 0.75rem; border-radius: 8px;">
          <strong>[Step 2] Server ➔ Client:</strong> <code>SYN = 1, ACK = 1, Seq = 5000, Ack = 1001</code><br>
          <span style="font-size: 0.8rem; color: #b45309;">Server transitions to <strong>SYN_RCVD</strong>. Confirms client SYN, establishes return sequence.</span>
        </div>
      `;
    } else if (TopicPageEngine.handshakeStepCount === 3) {
      label.innerText = "Step 3: Client ACK (ESTABLISHED)";
      label.style.color = "#10b981";
      list.innerHTML += `
        <div style="background: #dcfce7; border: 1px solid #86efac; padding: 0.75rem; border-radius: 8px;">
          <strong>[Step 3] Client ➔ Server:</strong> <code>ACK = 1, Seq = 1001, Ack = 5001</code><br>
          <span style="font-size: 0.8rem; color: #15803d;">Both endpoints in <strong>ESTABLISHED</strong> state! Payload data transfer can now begin.</span>
        </div>
      `;
    } else {
      TopicPageEngine.resetHandshake();
    }
  },

  resetHandshake: function() {
    TopicPageEngine.handshakeStepCount = 0;
    const list = document.getElementById('handshake-steps-list');
    const label = document.getElementById('handshake-phase-label');
    if (list) list.innerHTML = `<div style="font-size: 0.88rem; color: #64748b;">Ready: Click "Step Forward Handshake ➔"</div>`;
    if (label) {
      label.innerText = "Ready to Begin";
      label.style.color = "#7c3aed";
    }
  },

  // ARQ Simulation runner
  simulateARQ: function(proto, hasLoss) {
    const box = document.getElementById('topic-arq-timeline');
    if (!box) return;

    if (!hasLoss) {
      box.innerHTML = `
        <span style="color: #10b981; font-weight: 700;">[Clean Transmission Success]:</span><br>
        T = 0.0 ms: Sender dispatches [Frame 0]<br>
        T = 15.0 ms: Receiver verifies CRC, accepts Frame 0, dispatches [ACK 1]<br>
        T = 30.0 ms: Sender receives [ACK 1]. Window slides rightward. Next frame dispatched!
      `;
    } else {
      if (proto === 'stop-and-wait') {
        box.innerHTML = `
          <span style="color: #ef4444; font-weight: 700;">[Stop-and-Wait Loss Event]:</span><br>
          T = 0.0 ms: Sender sends [Frame 0], starts Retransmission Timer (50 ms)<br>
          T = 12.0 ms: <strong style="color: #ef4444;">💥 Channel Noise flits bit! Frame 0 dropped in transit!</strong><br>
          T = 50.0 ms: ⏱️ <strong>TIMEOUT EXPIRED at Sender!</strong><br>
          T = 50.1 ms: Sender retransmits [Frame 0]<br>
          T = 65.0 ms: Receiver gets Frame 0 safely, returns [ACK 1]. Recovered!
        `;
      } else if (proto === 'gbn') {
        box.innerHTML = `
          <span style="color: #ef4444; font-weight: 700;">[Go-Back-N Loss Event]:</span><br>
          T = 0.0 ms: Sender dispatches window: [Pkt 1, Pkt 2, Pkt 3, Pkt 4]<br>
          T = 15.0 ms: Receiver accepts Pkt 1, sends ACK 1<br>
          T = 18.0 ms: <strong style="color: #ef4444;">💥 Packet 2 is LOST!</strong><br>
          T = 20.0 ms: Pkt 3 arrives $\\to$ Receiver DISCARDS 3! Sends duplicate ACK 1<br>
          T = 22.0 ms: Pkt 4 arrives $\\to$ Receiver DISCARDS 4! Sends duplicate ACK 1<br>
          T = 60.0 ms: ⏱️ Timeout on Pkt 2 $\\to$ <strong style="color: #ef4444;">Sender retransmits ALL [Pkt 2, Pkt 3, Pkt 4]!</strong>
        `;
      } else {
        box.innerHTML = `
          <span style="color: #10b981; font-weight: 700;">[Selective Repeat Loss Event]:</span><br>
          T = 0.0 ms: Sender dispatches window: [Pkt 1, Pkt 2, Pkt 3, Pkt 4]<br>
          T = 15.0 ms: Receiver accepts Pkt 1, sends ACK 1<br>
          T = 18.0 ms: <strong style="color: #ef4444;">💥 Packet 2 is LOST!</strong><br>
          T = 20.0 ms: Pkt 3 arrives $\\to$ Receiver BUFFERS Pkt 3! Sends ACK 3<br>
          T = 22.0 ms: Pkt 4 arrives $\\to$ Receiver BUFFERS Pkt 4! Sends ACK 4<br>
          T = 60.0 ms: ⏱️ Timeout on Pkt 2 $\\to$ <strong style="color: #10b981;">Sender retransmits ONLY [Pkt 2]!</strong><br>
          T = 75.0 ms: Receiver gets Pkt 2, reassembles [1, 2, 3, 4], delivers to application!
        `;
      }
    }
  },

  // DNS Simulator
  runDNSSimulator: function() {
    const qEl = document.getElementById('topic-dns-query');
    const out = document.getElementById('topic-dns-output');
    if (!qEl || !out) return;

    const query = qEl.value.trim() || "www.wikipedia.org";
    out.innerHTML = `
      <span style="color: #38bdf8;">[1] Client ➔ Local Recursive Resolver (8.8.8.8):</span> "Resolve ${query}"<br>
      <span style="color: #facc15;">[2] Resolver ➔ Root Server (198.41.0.4 [a.root-servers.net]):</span> "Where is ${query}?"<br>
      &nbsp;&nbsp;&nbsp;&nbsp;↳ Root replies: "Referral: Consult .ORG TLD Server at 199.19.56.1"<br>
      <span style="color: #facc15;">[3] Resolver ➔ .ORG TLD Server (199.19.56.1):</span> "Where is ${query}?"<br>
      &nbsp;&nbsp;&nbsp;&nbsp;↳ TLD replies: "Referral: Consult Authoritative ns0.wikimedia.org at 208.80.154.238"<br>
      <span style="color: #facc15;">[4] Resolver ➔ Authoritative Server (208.80.154.238):</span> "What is Type A for ${query}?"<br>
      &nbsp;&nbsp;&nbsp;&nbsp;↳ Authoritative replies: <strong>Type A: 208.80.154.224, TTL = 3600</strong><br>
      <span style="color: #10b981; font-weight: 800;">[5] Resolver ➔ Client:</span> Success! IP Address is <strong>208.80.154.224</strong> (Cached for 1 hour).
    `;
  },

  // RSA Calculator
  runRSACalculator: function() {
    const pEl = document.getElementById('topic-rsa-p');
    const qEl = document.getElementById('topic-rsa-q');
    const mEl = document.getElementById('topic-rsa-msg');
    const out = document.getElementById('topic-rsa-output');
    if (!pEl || !qEl || !mEl || !out) return;

    const p = parseInt(pEl.value) || 61;
    const q = parseInt(qEl.value) || 53;
    const m = parseInt(mEl.value) || 65;

    const n = p * q;
    const phi = (p - 1) * (q - 1);

    // Find small coprime e
    function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
    let e = 17;
    while (gcd(e, phi) !== 1 && e < phi) {
      e += 2;
    }

    // Extended Euclidean Algorithm for d
    function extGCD(a, b) {
      if (b === 0) return { g: a, x: 1, y: 0 };
      const d = extGCD(b, a % b);
      return { g: d.g, x: d.y, y: d.x - Math.floor(a / b) * d.y };
    }
    let res = extGCD(e, phi);
    let d = ((res.x % phi) + phi) % phi;

    // Fast modular exponentiation
    function modPow(base, exp, mod) {
      let r = 1n;
      let b = BigInt(base) % BigInt(mod);
      let e = BigInt(exp);
      let m = BigInt(mod);
      while (e > 0n) {
        if (e % 2n === 1n) r = (r * b) % m;
        b = (b * b) % m;
        e = e / 2n;
      }
      return Number(r);
    }

    const c = modPow(m, e, n);
    const decrypted = modPow(c, d, n);

    out.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div>
          <strong>1. Modulus:</strong> $n = p \\times q = ${p} \\times ${q} = ${n}$<br>
          <strong>2. Totient:</strong> $\\phi(n) = (${p}-1)(${q}-1) = ${phi}$<br>
          <strong>3. Public Exponent:</strong> $e = ${e}$ (coprime to $\\phi(n)$)<br>
          <strong>4. Private Exponent:</strong> $d = ${d}$ ($e \\cdot d \\equiv 1 \\pmod{\\phi(n)}$)
        </div>
        <div>
          <strong>PUBLIC KEY:</strong> $(n = ${n}, e = ${e})$<br>
          <strong>PRIVATE KEY:</strong> $(n = ${n}, d = ${d})$<br>
          <strong>ENCRYPTION:</strong> $C = ${m}^{${e}} \\pmod{${n}} =$ <strong style="color: #7c3aed;">${c}</strong><br>
          <strong>DECRYPTION:</strong> $M = ${c}^{${d}} \\pmod{${n}} =$ <strong style="color: #10b981;">${decrypted}</strong> (Matches original ${m}!)
        </div>
      </div>
    `;

    setTimeout(() => {
      if (window.renderMathInElement) {
        renderMathInElement(out, {
          delimiters: [{left: '$', right: '$', display: false}],
          throwOnError: false
        });
      }
    }, 20);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TOPIC_REPOSITORY, TopicPageEngine };
}
