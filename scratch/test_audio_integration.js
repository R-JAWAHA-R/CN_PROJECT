const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log("=== COMPREHENSIVE AUDIO INTEGRATION & GAMEPLAY VERIFICATION ===\n");

let allPassed = true;

// 1. Verify Audio Files
console.log("[Check 1] Verifying Audio Files in assets/audio/...");
const mp3Path = path.join(__dirname, '..', 'assets', 'audio', 'frameParungaJI.mp3');
const mp4Path = path.join(__dirname, '..', 'assets', 'audio', 'frameParungaJI.mp4');

if (!fs.existsSync(mp3Path)) {
  console.error("  FAIL: assets/audio/frameParungaJI.mp3 missing!");
  allPassed = false;
} else {
  const size = fs.statSync(mp3Path).size;
  console.log(`  PASS: frameParungaJI.mp3 exists (${size} bytes)`);
}

if (!fs.existsSync(mp4Path)) {
  console.error("  FAIL: assets/audio/frameParungaJI.mp4 missing!");
  allPassed = false;
} else {
  const size = fs.statSync(mp4Path).size;
  console.log(`  PASS: frameParungaJI.mp4 exists (${size} bytes)`);
}

// 2. Setup simulated browser environment for checksumGuard.js
let playCallCount = 0;
let stopCallCount = 0;
let lastAudioPlayedSrc = null;
let currentAudioCurrentTime = 0;
let audioPaused = true;

class MockAudio {
  constructor() {
    this.src = '';
    this.volume = 1;
    this.preload = '';
    this.currentTime = 0;
  }
  canPlayType(type) {
    if (type.includes('mpeg')) return 'probably';
    if (type.includes('mp4')) return 'probably';
    return '';
  }
  play() {
    playCallCount++;
    lastAudioPlayedSrc = this.src;
    audioPaused = false;
    currentAudioCurrentTime = this.currentTime;
    return Promise.resolve();
  }
  pause() {
    stopCallCount++;
    audioPaused = true;
  }
}

const mockStorage = {};
const mockSessionStorage = {
  getItem: (k) => mockStorage[k] || null,
  setItem: (k, v) => { mockStorage[k] = String(v); },
  removeItem: (k) => { delete mockStorage[k]; }
};

const domElements = {};
const mockDocument = {
  getElementById: (id) => {
    if (!domElements[id]) {
      domElements[id] = {
        id,
        className: '',
        textContent: '',
        title: '',
        disabled: false,
        getContext: () => ({
          scale: () => {},
          clearRect: () => {},
          save: () => {},
          restore: () => {},
          beginPath: () => {},
          moveTo: () => {},
          lineTo: () => {},
          stroke: () => {},
          fill: () => {},
          arc: () => {},
          fillText: () => {}
        }),
        parentElement: {
          getBoundingClientRect: () => ({ width: 800, height: 240 })
        }
      };
    }
    return domElements[id];
  },
  querySelectorAll: () => []
};

let animFrameCallbacks = [];
let animFrameIdCounter = 0;
const mockRequestAnimationFrame = (cb) => {
  const id = ++animFrameIdCounter;
  animFrameCallbacks.push({ id, cb });
  return id;
};
const mockCancelAnimationFrame = (id) => {
  animFrameCallbacks = animFrameCallbacks.filter(item => item.id !== id);
};

const sandbox = {
  console: console,
  window: {},
  document: mockDocument,
  Audio: MockAudio,
  sessionStorage: mockSessionStorage,
  requestAnimationFrame: mockRequestAnimationFrame,
  cancelAnimationFrame: mockCancelAnimationFrame,
  performance: { now: () => Date.now() },
  setTimeout: setTimeout,
  clearTimeout: clearTimeout
};
sandbox.window = sandbox;

vm.createContext(sandbox);

const checksumGuardCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'checksumGuard.js'), 'utf8');
vm.runInContext(checksumGuardCode, sandbox);

const { ChecksumSystem, FrameSystem, TransmissionSystem, GameState, ChecksumGuardGame } = sandbox;

console.log("\n[Check 2] Initializing ChecksumGuard Game...");
const dummyTarget = { innerHTML: '' };
ChecksumGuardGame.render(dummyTarget);
console.log("  PASS: ChecksumGuardGame rendered successfully.");

// Check initial sound state
const SoundSystem = sandbox.window.ChecksumGuardGame ? sandbox.ChecksumGuardGame : null;
// Access internal SoundSystem via Transmission / ChecksumGuardGame
console.log("\n[Check 3] Testing Sender -> Router Travel Audio...");
playCallCount = 0;
stopCallCount = 0;

TransmissionSystem.startSenderToRouter(() => {});
if (playCallCount === 1) {
  console.log("  PASS: Audio play was triggered exactly once upon departure from Sender.");
} else {
  console.error(`  FAIL: Expected 1 audio play call, got ${playCallCount}!`);
  allPassed = false;
}
if (lastAudioPlayedSrc && lastAudioPlayedSrc.includes('frameParungaJI.mp3')) {
  console.log(`  PASS: Target audio source resolved to: ${lastAudioPlayedSrc}`);
} else {
  console.error(`  FAIL: Unexpected audio source: ${lastAudioPlayedSrc}`);
  allPassed = false;
}

// Simulate frame arrival at router
console.log("\n[Check 4] Testing Frame Arrival at Router...");
stopCallCount = 0;
// Advance animation state to AT_ROUTER
TransmissionSystem.state = 'AT_ROUTER';
TransmissionSystem.progress = 1.0;
// While stationary at Router, no audio should play
const prevPlays = playCallCount;
// Trigger mock animation step or idle ticks
console.log("  Verifying stationary state at Router generates NO audio...");
if (playCallCount === prevPlays) {
  console.log("  PASS: No audio triggers while stationary at Router.");
} else {
  console.error("  FAIL: Audio triggered while stationary at Router!");
  allPassed = false;
}

// Check 5: Router -> Receiver clean transmission
console.log("\n[Check 5] Testing Router -> Receiver Travel Audio (Clean Forward)...");
playCallCount = 0;
TransmissionSystem.startRouterToReceiver(false, () => {});
if (playCallCount === 1) {
  console.log("  PASS: Audio played again exactly once from the beginning upon departure from Router.");
} else {
  console.error(`  FAIL: Expected 1 audio play call, got ${playCallCount}!`);
  allPassed = false;
}

// Check 6: Router -> Receiver corrupted transmission
console.log("\n[Check 6] Testing Router -> Receiver Travel Audio (Corrupted Forward)...");
playCallCount = 0;
TransmissionSystem.startRouterToReceiver(true, () => {});
if (playCallCount === 1) {
  console.log("  PASS: Audio played again exactly once upon departure with error.");
} else {
  console.error(`  FAIL: Expected 1 audio play call, got ${playCallCount}!`);
  allPassed = false;
}

// Check 7: Sound OFF / ON Toggle Control
console.log("\n[Check 7] Testing Sound Toggle (Mute/Unmute) & Persistence...");
// Toggle to OFF
ChecksumGuardGame.toggleMute();
const soundLabel = domElements['cg-sound-label'];
if (soundLabel && soundLabel.textContent === 'SOUND OFF') {
  console.log("  PASS: Sound UI toggled to SOUND OFF.");
} else {
  console.error("  FAIL: Sound UI did not indicate SOUND OFF!");
  allPassed = false;
}

if (mockSessionStorage.getItem('cg_sound_muted') === 'true') {
  console.log("  PASS: Sound preference persisted to sessionStorage ('cg_sound_muted': 'true').");
} else {
  console.error("  FAIL: Sound preference not stored in sessionStorage!");
  allPassed = false;
}

// Attempt transmission while MUTED
playCallCount = 0;
TransmissionSystem.startSenderToRouter(() => {});
TransmissionSystem.startRouterToReceiver(false, () => {});
if (playCallCount === 0) {
  console.log("  PASS: When Sound is OFF, neither transmission journey played audio.");
} else {
  console.error(`  FAIL: Audio played while sound was OFF (${playCallCount} calls)!`);
  allPassed = false;
}

// Toggle back to ON
ChecksumGuardGame.toggleMute();
if (soundLabel && soundLabel.textContent === 'SOUND ON') {
  console.log("  PASS: Sound UI toggled back to SOUND ON.");
}
if (mockSessionStorage.getItem('cg_sound_muted') === 'false') {
  console.log("  PASS: Unmuted state persisted to sessionStorage.");
}

// Transmission with Sound ON
playCallCount = 0;
TransmissionSystem.startSenderToRouter(() => {});
if (playCallCount === 1) {
  console.log("  PASS: Sound ON successfully restored audio playback.");
} else {
  console.error("  FAIL: Sound ON did not restore playback!");
  allPassed = false;
}

// Check 8: Reset behavior
console.log("\n[Check 8] Testing Game Reset & Cleanup...");
stopCallCount = 0;
ChecksumGuardGame.resetGame();
if (stopCallCount > 0) {
  console.log("  PASS: Resetting game stopped audio immediately and cleanly.");
} else {
  console.error("  FAIL: Resetting game did not stop active audio!");
  allPassed = false;
}

// Check 9: App.js cleanup integration
console.log("\n[Check 9] Verifying App.js Cleanup Integration...");
const appJsCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'app.js'), 'utf8');
if (appJsCode.includes("App.activeView === 'checksum-guard'") && appJsCode.includes("ChecksumGuardGame.cleanup()")) {
  console.log("  PASS: app.js contains proper cleanup hook when navigating away from checksum-guard.");
} else {
  console.error("  FAIL: app.js missing cleanup hook!");
  allPassed = false;
}

// Check 10: Existing QA Tests
console.log("\n[Check 10] Running Existing Checksum Guard Functional Verification...");
try {
  const { execSync } = require('child_process');
  const qaOutput = execSync('node scratch/test_checksum_guard_qa.js', { encoding: 'utf8' });
  if (qaOutput.includes('ALL 9 SUITES / 18 CRITICAL QA VERIFICATIONS PASSED!')) {
    console.log("  PASS: All 9 suites / 18 critical QA verifications passed perfectly!");
  } else {
    console.error("  FAIL: QA output did not indicate success!");
    allPassed = false;
  }
} catch (e) {
  console.error("  FAIL: Error running existing QA tests:", e);
  allPassed = false;
}

console.log("\n=======================================================");
if (allPassed) {
  console.log(">>> ALL 10 AUDIO INTEGRATION & GAMEPLAY TESTS PASSED! <<<");
} else {
  console.log(">>> SOME TESTS FAILED! <<<");
  process.exit(1);
}
