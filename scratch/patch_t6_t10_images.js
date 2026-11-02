const fs = require('fs');

const imageMap = {
  // Topic 6
  "ethernet": "assets/images/topic6/ethernet-architecture-overview.svg",
  "u2-ethernet-architecture": "assets/images/topic6/ethernet-layers-architecture.svg",
  "mac-address": "assets/images/topic6/mac-address-format-structure.svg",
  "u2-ethernet-frame-format": "assets/images/topic6/ieee-802-3-frame-format.svg",
  "u2-ethernet-mac-protocol": "assets/images/topic6/ethernet-mac-protocol-flowchart.svg",
  "u2-ethernet-csma-cd-operation": "assets/images/topic6/ethernet-csma-cd-collision-window.svg",
  "u2-binary-exponential-backoff": "assets/images/topic6/binary-exponential-backoff-algorithm.svg",
  "u2-ethernet-types-evolution": "assets/images/topic6/ethernet-types-evolution-timeline.svg",
  "u2-ethernet-advantages-limitations": "assets/images/topic6/ethernet-advantages-limitations-matrix.svg",

  // Topic 7
  "wireless-lan-protocols": "assets/images/topic7/wlan-infrastructure-architecture.svg",
  "u2-wireless-characteristics": "assets/images/topic7/wireless-channel-characteristics.svg",
  "u2-wireless-lan-architecture": "assets/images/topic7/wlan-bss-ess-topology.svg",
  "u2-hidden-terminal-problem": "assets/images/topic7/hidden-terminal-problem-scenario.svg",
  "u2-exposed-terminal-problem": "assets/images/topic7/exposed-terminal-problem-scenario.svg",
  "u2-wireless-multiple-access": "assets/images/topic7/wireless-multiple-access-comparison.svg",
  "u2-wireless-lan-access-methods": "assets/images/topic7/wlan-access-methods-dcf-pcf.svg",
  "u2-wireless-communication-challenges": "assets/images/topic7/wireless-communication-challenges.svg",

  // Topic 8
  "wifi-mac-sublayer": "assets/images/topic8/ieee-802-11-mac-sublayer-stack.svg",
  "u2-ieee-802-11-architecture": "assets/images/topic8/ieee-802-11-bss-ess-ds.svg",
  "u2-ieee-802-11-dcf": "assets/images/topic8/dcf-timing-diagram-cw.svg",
  "u2-ieee-802-11-pcf": "assets/images/topic8/pcf-superframe-structure.svg",
  "u2-ieee-802-11-csma-ca": "assets/images/topic8/csma-ca-detailed-flowchart.svg",
  "u2-ieee-802-11-ifs": "assets/images/topic8/interframe-spaces-hierarchy.svg",
  "u2-rts-cts-mechanism": "assets/images/topic8/rts-cts-virtual-carrier-sensing.svg",
  "u2-network-allocation-vector": "assets/images/topic8/network-allocation-vector-timeline.svg",
  "u2-ieee-802-11-frame-formats": "assets/images/topic8/ieee-802-11-frame-format-detailed.svg",
  "u2-dcf-vs-pcf": "assets/images/topic8/dcf-vs-pcf-architectural-comparison.svg",

  // Topic 9
  "dll-switching": "assets/images/topic9/dll-switching-collision-broadcast-domains.svg",
  "u2-bridges-overview": "assets/images/topic9/transparent-bridge-dual-port-topology.svg",
  "u2-transparent-bridges": "assets/images/topic9/transparent-bridge-plug-and-play.svg",
  "u2-learning-bridges": "assets/images/topic9/learning-bridge-forwarding-table.svg",
  "u2-bridge-learning-process": "assets/images/topic9/bridge-backward-learning-step-by-step.svg",
  "u2-forwarding-and-filtering": "assets/images/topic9/forwarding-filtering-flowchart.svg",
  "u2-bridge-flooding": "assets/images/topic9/bridge-flooding-and-broadcast-storm.svg",
  "u2-spanning-tree-protocol": "assets/images/topic9/spanning-tree-protocol-stp-topology.svg",
  "u2-bridges-vs-switches": "assets/images/topic9/bridges-vs-switches-comparison.svg",
  "vlan": "assets/images/topic9/vlan-802-1q-tagging-trunking.svg",

  // Topic 10
  "network-devices": "assets/images/topic10/networking-devices-5-layer-hierarchy.svg",
  "u2-networking-device-repeaters": "assets/images/topic10/repeater-signal-regeneration.svg",
  "u2-networking-device-hubs": "assets/images/topic10/hub-shared-collision-domain.svg",
  "u2-networking-device-bridges": "assets/images/topic10/bridge-two-collision-domains.svg",
  "u2-networking-device-switches": "assets/images/topic10/switch-microsegmentation-full-duplex.svg",
  "u2-networking-device-routers": "assets/images/topic10/router-broadcast-domain-segmentation.svg",
  "u2-networking-device-gateways": "assets/images/topic10/gateway-protocol-translation.svg",
  "u2-device-working-principles": "assets/images/topic10/device-working-principles-matrix.svg",
  "u2-comparison-networking-devices": "assets/images/topic10/comparison-networking-devices-topology.svg",
  "u2-device-osi-layers": "assets/images/topic10/networking-devices-osi-mapping.svg",
  "arp": "assets/images/topic10/arp-request-broadcast-reply-unicast.svg"
};

// 1. Patch topics_u2_syllabus.js
let u2SyllabusContent = fs.readFileSync('js/topics_u2_syllabus.js', 'utf8');
const u2Syllabus = require('../js/topics_u2_syllabus.js');

let patchedCount = 0;
for (const [id, localPath] of Object.entries(imageMap)) {
  if (u2Syllabus[id]) {
    u2Syllabus[id].imageUrl = localPath;
    patchedCount++;
  }
}

const header = '// Unit 2 Comprehensive Syllabus Topics Repository\n';
const footer = '\nif (typeof module !== "undefined" && module.exports) {\n  module.exports = TOPICS_U2_SYLLABUS;\n}\n';
const newCode = header + 'var TOPICS_U2_SYLLABUS = ' + JSON.stringify(u2Syllabus, null, 2) + ';' + footer;
fs.writeFileSync('js/topics_u2_syllabus.js', newCode, 'utf8');
console.log('Patched topics_u2_syllabus.js with', patchedCount, 'local images');

// 2. Patch topics_u2.js if any of these IDs exist
let u2BaseContent = fs.readFileSync('js/topics_u2.js', 'utf8');
let u2Base = require('../js/topics_u2.js');
let patchedBase = 0;
for (const [id, localPath] of Object.entries(imageMap)) {
  if (u2Base[id]) {
    u2Base[id].imageUrl = localPath;
    if (u2Base[id].image) u2Base[id].image.url = localPath;
    patchedBase++;
  }
}
const baseHeader = '// Unit 2: Data Link Layer Topics\n';
const baseFooter = '\nif (typeof module !== "undefined" && module.exports) {\n  module.exports = TOPICS_U2;\n}\n';
fs.writeFileSync('js/topics_u2.js', baseHeader + 'var TOPICS_U2 = ' + JSON.stringify(u2Base, null, 2) + ';' + baseFooter, 'utf8');
console.log('Patched topics_u2.js with', patchedBase, 'local images');

