const fs = require('fs');
const assert = require('assert');

console.log("=== RUNNING CHECKSUM GUARD QUALITY ASSURANCE TESTS ===");

// 1. Load ChecksumGuard module in Node environment
const mockWindow = {};
const checksumCode = fs.readFileSync('js/checksumGuard.js', 'utf8');
const runInContext = new Function('window', checksumCode);
runInContext(mockWindow);

const { ChecksumSystem, FrameSystem } = mockWindow;

assert(ChecksumSystem, "ChecksumSystem must be defined");
assert(FrameSystem, "FrameSystem must be defined");

// Test 1: Binary validation
console.log("\n[Test 1] Binary input validation");
assert.strictEqual(ChecksumSystem.isValidBinary('10011001', 8), true);
assert.strictEqual(ChecksumSystem.isValidBinary('11100010', 8), true);
assert.strictEqual(ChecksumSystem.isValidBinary('1001', 8), false, "Must reject non-8-bit when expected length is 8");
assert.strictEqual(ChecksumSystem.isValidBinary('10012001', 8), false, "Must reject digits other than 0 and 1");
assert.strictEqual(ChecksumSystem.isValidBinary('', 8), false, "Must reject empty string");
console.log("✓ Binary input validation passed.");

// Test 2: Sender Checksum calculation on specification example
console.log("\n[Test 2 & 3] Checksum calculation & End-around carry (Spec Example)");
const specWords = ['10011001', '11100010'];
const senderCalc = ChecksumSystem.computeSenderChecksum(specWords, 8);

console.log("  Words:", specWords.join(' '));
console.log("  Raw sum bin:", senderCalc.additionSteps[0].rawBin);
console.log("  Carry bit:", senderCalc.additionSteps[0].carryBit);
console.log("  End-around applied:", senderCalc.additionSteps[0].endAroundApplied);
console.log("  Sum after end-around:", senderCalc.finalSum);
console.log("  1's complement checksum:", senderCalc.checksum);

assert.strictEqual(senderCalc.additionSteps[0].rawBin, '101111011', "Raw binary sum must be 9-bit 101111011");
assert.strictEqual(senderCalc.additionSteps[0].carryBit, 1, "Carry bit must be 1");
assert.strictEqual(senderCalc.additionSteps[0].endAroundApplied, true, "End-around carry must be triggered");
assert.strictEqual(senderCalc.finalSum, '01111100', "Sum after end-around carry must be 01111100");
assert.strictEqual(senderCalc.checksum, '10000011', "Final checksum must be 10000011");
console.log("✓ Specification checksum calculation verified perfectly!");

// Test 4: Frame preparation
console.log("\n[Test 4] Frame preparation");
const frame = FrameSystem.buildFrame(specWords, senderCalc.checksum, 8);
assert.strictEqual(frame.bits.length, 24, "Total frame bits must be 24 (8 + 8 + 8)");
assert.strictEqual(frame.originalFrameString, '100110011110001010000011');
assert.strictEqual(frame.bits.slice(0, 8).map(b => b.originalValue).join(''), '10011001');
assert.strictEqual(frame.bits.slice(8, 16).map(b => b.originalValue).join(''), '11100010');
assert.strictEqual(frame.bits.slice(16, 24).map(b => b.originalValue).join(''), '10000011');
console.log("✓ Frame preparation verified.");

// Test 5: Clean transmission (No error)
console.log("\n[Test 5] Receiver verification: Clean transmission");
const cleanComponents = FrameSystem.getTransmittedComponents(frame);
const cleanVerify = ChecksumSystem.verifyReceiverChecksum(
  cleanComponents.transmittedDataWords,
  cleanComponents.transmittedChecksum,
  8
);
console.log("  Clean sum:", cleanVerify.finalSum);
console.log("  Clean syndrome:", cleanVerify.invertedSum);
console.log("  Clean isValid:", cleanVerify.isValid);
assert.strictEqual(cleanVerify.finalSum, '11111111', "Sum must be all 1s for clean frame");
assert.strictEqual(cleanVerify.isValid, true, "Frame must be ACCEPTED");
console.log("✓ Clean transmission verified (Accepted).");

// Test 6: Single-bit data error injection
console.log("\n[Test 6] Single-bit data error injection (Bit 4 flipped)");
// Flip bit 4 in Word 1: 10011001 -> 10010001
FrameSystem.setFlippedBit(frame, 4);
assert.strictEqual(frame.flippedBitIndex, 4);
assert.strictEqual(frame.bits[4].isFlipped, true);
assert.strictEqual(frame.bits[4].transmittedValue, '0');
assert.strictEqual(frame.bits[4].originalValue, '1', "Original frame bit must remain strictly unchanged");

const dataErrComponents = FrameSystem.getTransmittedComponents(frame);
assert.strictEqual(dataErrComponents.transmittedDataWords[0], '10010001', "Word 1 must have flipped bit");
assert.strictEqual(dataErrComponents.transmittedDataWords[1], '11100010', "Word 2 must be unchanged");
assert.strictEqual(dataErrComponents.transmittedChecksum, '10000011', "Checksum must be unchanged");

const dataErrVerify = ChecksumSystem.verifyReceiverChecksum(
  dataErrComponents.transmittedDataWords,
  dataErrComponents.transmittedChecksum,
  8
);
console.log("  Corrupted sum:", dataErrVerify.finalSum);
console.log("  Corrupted isValid:", dataErrVerify.isValid);
assert.notStrictEqual(dataErrVerify.finalSum, '11111111', "Sum must NOT be all 1s when bit is flipped");
assert.strictEqual(dataErrVerify.isValid, false, "Corrupted frame must be REJECTED");
console.log("✓ Single-bit data error detected and rejected.");

// Test 7: Single-bit checksum error injection
console.log("\n[Test 7] Single-bit checksum error injection (Bit 16 flipped)");
// Reset and flip bit 16 (first bit of checksum: 10000011 -> 00000011)
FrameSystem.setFlippedBit(frame, 16);
assert.strictEqual(frame.flippedBitIndex, 16);
assert.strictEqual(frame.bits[16].transmittedValue, '0');

const chkErrComponents = FrameSystem.getTransmittedComponents(frame);
assert.strictEqual(chkErrComponents.transmittedDataWords[0], '10011001', "Word 1 must be clean");
assert.strictEqual(chkErrComponents.transmittedChecksum, '00000011', "Checksum must be flipped");

const chkErrVerify = ChecksumSystem.verifyReceiverChecksum(
  chkErrComponents.transmittedDataWords,
  chkErrComponents.transmittedChecksum,
  8
);
console.log("  Checksum corrupted sum:", chkErrVerify.finalSum);
console.log("  Checksum corrupted isValid:", chkErrVerify.isValid);
assert.notStrictEqual(chkErrVerify.finalSum, '11111111');
assert.strictEqual(chkErrVerify.isValid, false, "Frame with corrupted checksum must be REJECTED");
console.log("✓ Single-bit checksum error detected and rejected.");

// Test 8: Index.html integrity check
console.log("\n[Test 8] Index.html integration checks");
const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('css/checksumGuard.css'), "Must link css/checksumGuard.css");
assert(indexHtml.includes("App.loadView('minigames')"), "Must have Mini Games button in nav");
assert(indexHtml.includes("MINI GAMES"), "Must have MINI GAMES category in tools sidebar");
assert(indexHtml.includes("Checksum Guard"), "Must have Checksum Guard item in tools sidebar");
assert(indexHtml.includes('js/checksumGuard.js'), "Must include js/checksumGuard.js script");
console.log("✓ Index.html integration checks passed.");

// Test 9: App.js routing integrity check
console.log("\n[Test 9] App.js routing and method checks");
const appJs = fs.readFileSync('js/app.js', 'utf8');
assert(appJs.includes("viewName === 'minigames'"), "App.js must handle minigames view");
assert(appJs.includes("viewName === 'checksum-guard'"), "App.js must handle checksum-guard view");
assert(appJs.includes("renderMiniGamesHub"), "App.js must define renderMiniGamesHub");
assert(appJs.includes("renderHomeDashboard"), "Existing route renderHomeDashboard must be intact");
assert(appJs.includes("renderInteractiveLabsHub"), "Existing route renderInteractiveLabsHub must be intact");
assert(appJs.includes("renderResourcesHub"), "Existing route renderResourcesHub must be intact");
console.log("✓ App.js routing checks passed.");

console.log("\n=======================================================");
console.log(" ALL 9 SUITES / 18 CRITICAL QA VERIFICATIONS PASSED! ");
console.log("=======================================================");

