const fs = require('fs');
const assert = require('assert');

console.log("=== RUNNING CRC CHALLENGE QUALITY ASSURANCE SUITE ===");

// 1. Load CRC Challenge module in Node environment
const mockWindow = {};
const crcCode = fs.readFileSync('js/crcChallenge.js', 'utf8');
const runInContext = new Function('window', crcCode);
runInContext(mockWindow);

const { CRCMathEngine, CRCGameState } = mockWindow;

assert(CRCMathEngine, "CRCMathEngine must be defined");
assert(CRCGameState, "CRCGameState must be defined");

// Test 1: Binary validation
console.log("\n[Test 1] Binary Data & Generator Validation");
assert.strictEqual(CRCMathEngine.isValidBinary('1101'), true);
assert.strictEqual(CRCMathEngine.isValidBinary('101101'), true);
assert.strictEqual(CRCMathEngine.isValidBinary('1102'), false, "Reject non-binary");
assert.strictEqual(CRCMathEngine.isValidBinary(''), false, "Reject empty string");

const validGen = CRCMathEngine.validateGenerator('1011');
assert.strictEqual(validGen.isValid, true);
assert.strictEqual(validGen.degree, 3);

const invalidGenStart = CRCMathEngine.validateGenerator('0101');
assert.strictEqual(invalidGenStart.isValid, false, "Must reject generator not starting with 1");

const invalidGenEnd = CRCMathEngine.validateGenerator('1010');
assert.strictEqual(invalidGenEnd.isValid, false, "Must reject generator not ending with 1");

const invalidGenShort = CRCMathEngine.validateGenerator('1');
assert.strictEqual(invalidGenShort.isValid, false, "Must reject generator with length < 2");
console.log("✓ Binary and generator validation passed.");

// Test 2: Polynomial String Conversion
console.log("\n[Test 2] Algebraic Polynomial Representation");
assert.strictEqual(CRCMathEngine.getPolynomialString('1011'), 'x³ + x + 1');
assert.strictEqual(CRCMathEngine.getPolynomialString('1101'), 'x³ + x² + 1');
assert.strictEqual(CRCMathEngine.getPolynomialString('10011'), 'x⁴ + x + 1');
assert.strictEqual(CRCMathEngine.getPolynomialString('11001'), 'x⁴ + x³ + 1');
console.log("✓ Polynomial string conversion verified.");

// Test 3: Standard Specification Test Vector (Data = 1101, Generator = 1011)
console.log("\n[Test 3] Standard Spec Vector (Data: 1101, Generator: 1011)");
const specCrc = CRCMathEngine.calculateCRC('1101', '1011');
console.log("  Original Data:", specCrc.originalData);
console.log("  Appended Zeros:", specCrc.appendedZeros);
console.log("  Augmented Data:", specCrc.augmentedData);
console.log("  Calculated Remainder:", specCrc.remainder);
console.log("  Transmitted Frame:", specCrc.transmittedFrame);

assert.strictEqual(specCrc.generatorDegree, 3, "Degree must be 3");
assert.strictEqual(specCrc.appendedZeros, '000', "Must append 3 zeros");
assert.strictEqual(specCrc.augmentedData, '1101000', "Augmented dividend must be 1101000");
assert.strictEqual(specCrc.remainder, '001', "CRC remainder must be strictly 001");
assert.strictEqual(specCrc.transmittedFrame, '1101001', "Transmitted frame must be 1101001");
console.log("✓ Standard spec vector verified with 100% mathematical precision.");

// Test 4: Receiver Verification - Clean Transmission (No error)
console.log("\n[Test 4] Receiver Verification - Clean Transmission");
const cleanVerify = CRCMathEngine.verifyReceivedFrame(specCrc.transmittedFrame, '1011');
console.log("  Receiver remainder:", cleanVerify.remainder);
console.log("  Expected zeros:", cleanVerify.expectedZeros);
console.log("  Is frame valid:", cleanVerify.isValid);
assert.strictEqual(cleanVerify.remainder, '000', "Clean frame division must yield remainder 000");
assert.strictEqual(cleanVerify.isValid, true, "Clean frame must be accepted");
console.log("✓ Clean transmission verified (Accepted).");

// Test 5: Single-Bit Data Error
console.log("\n[Test 5] Single-Bit Data Error (Bit 3 inverted: 1101001 -> 1100001)");
const corruptDataFrame = CRCMathEngine.flipSelectedBit(specCrc.transmittedFrame, 3);
assert.strictEqual(corruptDataFrame, '1100001');
const corruptDataVerify = CRCMathEngine.verifyReceivedFrame(corruptDataFrame, '1011');
console.log("  Corrupt data remainder:", corruptDataVerify.remainder);
console.log("  Is frame valid:", corruptDataVerify.isValid);
assert.notStrictEqual(corruptDataVerify.remainder, '000', "Corrupted frame must yield non-zero remainder");
assert.strictEqual(corruptDataVerify.isValid, false, "Corrupted frame must be rejected");
console.log("✓ Single-bit data error detected and rejected.");

// Test 6: Single-Bit CRC Remainder Error
console.log("\n[Test 6] Single-Bit CRC Error (Bit 6 inverted: 1101001 -> 1101000)");
const corruptCrcFrame = CRCMathEngine.flipSelectedBit(specCrc.transmittedFrame, 6);
assert.strictEqual(corruptCrcFrame, '1101000');
const corruptCrcVerify = CRCMathEngine.verifyReceivedFrame(corruptCrcFrame, '1011');
console.log("  Corrupt CRC remainder:", corruptCrcVerify.remainder);
console.log("  Is frame valid:", corruptCrcVerify.isValid);
assert.notStrictEqual(corruptCrcVerify.remainder, '000');
assert.strictEqual(corruptCrcVerify.isValid, false, "Corrupted CRC frame must be rejected");
console.log("✓ Single-bit CRC error detected and rejected.");

// Test 7: Alternative Higher-Degree Generator (CRC-4: 10011, Data: 11010110)
console.log("\n[Test 7] Higher-Degree Polynomial (Data: 11010110, Gen: 10011, Degree 4)");
const crc4Result = CRCMathEngine.calculateCRC('11010110', '10011');
console.log("  Augmented:", crc4Result.augmentedData);
console.log("  Remainder:", crc4Result.remainder);
console.log("  Transmitted Frame:", crc4Result.transmittedFrame);
assert.strictEqual(crc4Result.generatorDegree, 4);
assert.strictEqual(crc4Result.remainder.length, 4, "Remainder must have length equal to degree 4");

const crc4CleanVerify = CRCMathEngine.verifyReceivedFrame(crc4Result.transmittedFrame, '10011');
assert.strictEqual(crc4CleanVerify.remainder, '0000', "Must yield 0000 for clean frame");
assert.strictEqual(crc4CleanVerify.isValid, true);

// Test bit corruption on CRC-4
const crc4Corrupt = CRCMathEngine.flipSelectedBit(crc4Result.transmittedFrame, 2);
const crc4CorruptVerify = CRCMathEngine.verifyReceivedFrame(crc4Corrupt, '10011');
assert.strictEqual(crc4CorruptVerify.isValid, false, "Corrupted frame must be rejected");
console.log("✓ Higher-degree generator test vector verified.");

// Test 8: Game Levels Definition
console.log("\n[Test 8] Game Levels & Progression");
assert.strictEqual(CRCGameState.levels.length, 5, "Must define 5 progressive levels");
CRCGameState.setLevel(1);
assert.strictEqual(CRCGameState.currentLevel, 1);
assert.strictEqual(CRCGameState.dataInput, '1101');
assert.strictEqual(CRCGameState.generatorInput, '1011');
CRCGameState.setLevel(4);
assert.strictEqual(CRCGameState.currentLevel, 4);
assert.strictEqual(CRCGameState.generatorInput, '10011');
console.log("✓ 5 Progressive levels verified.");

// Test 9: HTML and App.js Integration
console.log("\n[Test 9] Integration in index.html and js/app.js");
const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('css/crcChallenge.css'), "Must link css/crcChallenge.css");
assert(indexHtml.includes("App.loadView('crc-challenge')"), "Must have CRC Challenge in sidebar");
assert(indexHtml.includes('js/crcChallenge.js'), "Must include js/crcChallenge.js script");

const appJs = fs.readFileSync('js/app.js', 'utf8');
assert(appJs.includes("viewName === 'crc-challenge'"), "App.js must handle crc-challenge route");
assert(appJs.includes("CRC CHALLENGE"), "Mini Games Hub must display CRC CHALLENGE card");
assert(appJs.includes("CHECKSUM GUARD"), "Mini Games Hub must still display CHECKSUM GUARD card");
console.log("✓ Index and App routing integration verified.");

// Test 10: Regression Check on Checksum Guard
console.log("\n[Test 10] Checksum Guard Regression Check");
const checksumCode = fs.readFileSync('js/checksumGuard.js', 'utf8');
const runChecksumInContext = new Function('window', checksumCode);
const mockChecksumWindow = {};
runChecksumInContext(mockChecksumWindow);
const { ChecksumSystem } = mockChecksumWindow;
const chkCalc = ChecksumSystem.computeSenderChecksum(['10011001', '11100010'], 8);
assert.strictEqual(chkCalc.checksum, '10000011', "Checksum Guard specification example must remain intact");
console.log("✓ Checksum Guard continues to work with zero regressions.");

console.log("\n=======================================================");
console.log(" ALL 10 CRC CHALLENGE QA TEST SUITES PASSED CLEANLY! ");
console.log("=======================================================");

