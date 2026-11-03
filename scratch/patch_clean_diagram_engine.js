const fs = require('fs');
const path = require('path');

// 1. UPDATE js/cleanDiagramEngine.js
const cdePath = path.join(__dirname, '..', 'js', 'cleanDiagramEngine.js');
let cdeCode = fs.readFileSync(cdePath, 'utf8');

const oldCdeDefault = `    // 13. Error Detection & Correction (CRC & Hamming)
    if (id === 'error-detection' || id === 'parity' || id === 'checksum' || id === 'hamming-code' || id === 'crc' || id === 'u2-error-control') {
      return this.renderErrorControlDiagram();
    }

    // Default: Clean Layer Encapsulation Flow
    return this.renderNodeToNodeDiagram(topic);
  },`;

const newCdeDefault = `    // 13. Error Detection & Correction (CRC, Hamming & Parity)
    if (id === 'error-detection' || id === 'parity' || id === 'checksum' || id === 'hamming-code' || id === 'crc' || id === 'u2-error-control' ||
        id === 'u2-intro-error-detection' || id === 'u2-intro-error-correction' || id === 'u2-redundancy-error-control' || id === 'u2-hamming-distance' ||
        id === 'u2-detection-vs-correction' || id === 'u2-error-techniques' || id === 'u2-hamming-working-principle' || id === 'u2-hamming-code-calculation' ||
        id === 'u2-hamming-detection-correction' || id === 'u2-hamming-numerical-problems' || id === 'u2-crc-intro' || id === 'u2-crc-working-principle' ||
        id === 'u2-crc-generator-polynomial' || id === 'u2-crc-binary-division' || id === 'u2-crc-numerical-problems' || id === 'u2-checksum') {
      return this.renderErrorControlDiagram();
    }

    // 14. Additional Simplex and Stop-and-Wait Variants
    if (id === 'u2-unrestricted-simplex' || id === 'u2-simplex-stop-and-wait' || id === 'u2-simplex-noisy-channels') {
      return this.renderStopAndWaitDiagram();
    }

    // 15. Additional Sliding Window Protocols
    if (id === 'u2-sliding-window-intro' || id === 'u2-sender-receiver-window' || id === 'u2-sliding-window-size' ||
        id === 'u2-sliding-window-working-principle' || id === 'u2-piggybacking' || id === 'u2-sliding-window-vs-stop-and-wait') {
      return this.renderSlidingWindowDiagram();
    }

    // 16. Additional Bridges & Switching Variants
    if (id === 'u2-bridges-purpose' || id === 'u2-bridges-network-segmentation' || id === 'u2-bridges-traffic-filtering' ||
        id === 'u2-bridges-connecting-lan-segments' || id === 'u2-bridges-advantages-limitations') {
      return this.renderSwitchingArchitectureDiagram();
    }

    // 17. Additional Network Layer & Routing Protocols
    if (id === 'network-layer' || id === 'forwarding' || id === 'sdn' || id === 'nat') {
      return this.renderInternetworkingDiagram(id);
    }
    if (id === 'routing') {
      return this.renderRoutingAlgorithmsDiagram(id);
    }
    if (id === 'ospf') {
      return this.renderLinkStateDiagram();
    }
    if (id === 'bgp') {
      return this.renderDistanceVectorDiagram();
    }

    // ONLY return Node-to-Node diagram for overarching Data Link Layer overview topics
    if (id === 'data-link-layer' || id === 'u2-dll-intro' || id === 'u2-dll-osi-position' || id === 'u2-dll-overview') {
      return this.renderNodeToNodeDiagram(topic);
    }

    // Default: Do not inject irrelevant L2 node-to-node diagrams into unrelated subtopics
    return '';
  },`;

function replaceNorm(str, target, repl) {
  const normStr = str.replace(/\r\n/g, '\n');
  const normTarget = target.replace(/\r\n/g, '\n');
  const normRepl = repl.replace(/\r\n/g, '\n');
  if (!normStr.includes(normTarget)) {
    throw new Error('Could not find target in file: ' + target.slice(0, 50));
  }
  return normStr.replace(normTarget, normRepl);
}

cdeCode = replaceNorm(cdeCode, oldCdeDefault, newCdeDefault);
fs.writeFileSync(cdePath, cdeCode, 'utf8');
console.log('Successfully updated js/cleanDiagramEngine.js!');

// 2. UPDATE js/topicPages.js Section 3
const tpPath = path.join(__dirname, '..', 'js', 'topicPages.js');
let tpCode = fs.readFileSync(tpPath, 'utf8');

const oldTpSection3 = `            <!-- SECTION 3: ARCHITECTURE DIAGRAM -->
            <section class="wiki-section" id="sec-diagram">
              <h2 class="wiki-section-heading">3. Architecture Diagram & Visual Schematic</h2>
              <div class="wiki-section-body space-y-4">
                \${(() => {
                  const resolvedImgUrl = topic.imageUrl || topic.image?.url || topic.sections?.imageUrl || topic.sections?.image?.url;
                  const resolvedImgCaption = topic.imageCaption || topic.image?.caption || topic.sections?.imageCaption || topic.sections?.image?.caption;
                  if (!resolvedImgUrl) return '';
                  return \`
                  <div class="wiki-img-container mb-4 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm p-4 flex flex-col items-center transition-all hover:shadow-md">
                    <div class="w-full flex items-center justify-between pb-2 mb-2 border-b border-gray-100 dark:border-gray-800 text-[10px] text-gray-500 font-mono">
                      <span class="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
                        <i class="fa-solid fa-network-wired"></i> Architecture Illustration
                      </span>
                      <a href="\${resolvedImgUrl}" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-blue-500 flex items-center gap-1 transition-colors" title="Open full resolution in new tab">
                        <span>Full Res</span>
                        <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
                      </a>
                    </div>
                    <div class="relative w-full flex items-center justify-center p-3 bg-slate-50/70 dark:bg-slate-950/50 rounded-lg overflow-hidden group">
                      <img src="\${resolvedImgUrl}" 
                           alt="\${topic.title} Architecture Diagram" 
                           loading="lazy" 
                           referrerpolicy="no-referrer"
                           class="max-w-full h-auto max-h-[460px] object-contain rounded cursor-pointer transition-transform duration-300 group-hover:scale-[1.01]"
                           onclick="window.open('\${resolvedImgUrl}', '_blank')"
                           onerror="this.onerror=null; this.closest('.wiki-img-container').classList.add('hidden');" />
                    </div>
                    \${resolvedImgCaption ? \`
                      <p class="text-xs text-gray-600 dark:text-gray-300 text-center mt-3 font-medium flex items-center justify-center gap-1.5 px-3">
                        <i class="fa-solid fa-circle-info text-blue-500 text-[11px] shrink-0"></i>
                        <span>\${resolvedImgCaption}</span>
                      </p>
                    \` : ''}
                  </div>
                  \`;
                })()}

                <!-- Clean Modern Architecture Diagram (Replaces ASCII/symbols art) -->
                \${(typeof CleanDiagramEngine !== 'undefined' ? CleanDiagramEngine.getDiagramHtml(topic) : (typeof window !== 'undefined' && window.CleanDiagramEngine ? window.CleanDiagramEngine.getDiagramHtml(topic) : ''))}
              </div>
            </section>`;

const newTpSection3 = `            <!-- SECTION 3: ARCHITECTURE DIAGRAM -->
            <section class="wiki-section" id="sec-diagram">
              <h2 class="wiki-section-heading">3. Architecture Diagram & Visual Schematic</h2>
              <div class="wiki-section-body space-y-4">
                \${(() => {
                  const resolvedImgUrl = topic.imageUrl || topic.image?.url || topic.sections?.imageUrl || topic.sections?.image?.url;
                  const resolvedImgCaption = topic.imageCaption || topic.image?.caption || topic.sections?.imageCaption || topic.sections?.image?.caption;
                  
                  let html = '';
                  if (resolvedImgUrl) {
                    html += \`
                    <div class="wiki-img-container mb-4 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm p-4 flex flex-col items-center transition-all hover:shadow-md">
                      <div class="w-full flex items-center justify-between pb-2 mb-2 border-b border-gray-100 dark:border-gray-800 text-[10px] text-gray-500 font-mono">
                        <span class="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
                          <i class="fa-solid fa-network-wired"></i> Architecture Illustration
                        </span>
                        <a href="\${resolvedImgUrl}" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-blue-500 flex items-center gap-1 transition-colors" title="Open full resolution in new tab">
                          <span>Full Res</span>
                          <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
                        </a>
                      </div>
                      <div class="relative w-full flex items-center justify-center p-3 bg-slate-50/70 dark:bg-slate-950/50 rounded-lg overflow-hidden group">
                        <img src="\${resolvedImgUrl}" 
                             alt="\${topic.title} Architecture Diagram" 
                             loading="lazy" 
                             referrerpolicy="no-referrer"
                             class="max-w-full h-auto max-h-[460px] object-contain rounded cursor-pointer transition-transform duration-300 group-hover:scale-[1.01]"
                             onclick="window.open('\${resolvedImgUrl}', '_blank')"
                             onerror="this.onerror=null; this.closest('.wiki-img-container').classList.add('hidden');" />
                      </div>
                      \${resolvedImgCaption ? \`
                        <p class="text-xs text-gray-600 dark:text-gray-300 text-center mt-3 font-medium flex items-center justify-center gap-1.5 px-3">
                          <i class="fa-solid fa-circle-info text-blue-500 text-[11px] shrink-0"></i>
                          <span>\${resolvedImgCaption}</span>
                        </p>
                      \` : ''}
                    </div>
                    \`;
                  }

                  const cleanDiag = (typeof CleanDiagramEngine !== 'undefined' ? CleanDiagramEngine.getDiagramHtml(topic) : (typeof window !== 'undefined' && window.CleanDiagramEngine ? window.CleanDiagramEngine.getDiagramHtml(topic) : ''));
                  
                  // Only append clean diagram if it's non-empty AND not a redundant Node-to-Node diagram
                  if (cleanDiag) {
                    const isNodeToNode = cleanDiag.includes('Node-to-Node Frame Delivery');
                    if (resolvedImgUrl && isNodeToNode) {
                      // Suppress redundant generic node-to-node diagram when a dedicated architectural image already exists
                    } else {
                      html += cleanDiag;
                    }
                  }

                  return html;
                })()}
              </div>
            </section>`;

tpCode = replaceNorm(tpCode, oldTpSection3, newTpSection3);
fs.writeFileSync(tpPath, tpCode, 'utf8');
console.log('Successfully updated js/topicPages.js!');

