/**
 * Automated QA Test Suite for HAMMING HERO, CRC CHALLENGE & CHECKSUM GUARD
 */

const fs = require('fs');
const path = require('path');

// Mock window environment for loading the modular JS files
global.window = global;
global.document = {
  getElementById: () => null,
  querySelectorAll: () => []
};

// Load modules
require(path.join(__dirname, '..', 'js', 'checksumGuard.js'));
require(path.join(__dirname, '..', 'js', 'crcChallenge.js'));
require(path.join(__dirname, '..', 'js', 'hammingHero.js'));

let totalTests = 0;
let passedTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    console.error(`  ✗ FAIL: ${testName} - ${details}`);
    process.exitCode = 1;
  }
}

console.log('=== TEST SUITE 1: HAMMING (7,4) SPEC EXAMPLE (Data: "1011") ===');
{
  const data = '1011';
  const encoded = HammingMathEngine.encodeHamming(data, '7-4');
  
  assert(encoded.encodedBits === '0110011', 'Hamming(7,4) encodes "1011" -> "0110011"', `got: ${encoded.encodedBits}`);
  assert(encoded.parityDetails[0].value === 0, 'P1 value is 0 (covers pos 1, 3, 5, 7)');
  assert(encoded.parityDetails[1].value === 1, 'P2 value is 1 (covers pos 2, 3, 6, 7)');
  assert(encoded.parityDetails[2].value === 0, 'P4 value is 0 (covers pos 4, 5, 6, 7)');

  // Clean reception
  const cleanSyn = HammingMathEngine.calculateSyndrome('0110011', '7-4');
  assert(cleanSyn.hasError === false, 'Clean frame has no error');
  assert(cleanSyn.syndromeBinary === '000', 'Clean frame syndrome binary is "000"');
  assert(cleanSyn.syndromeDecimal === 0, 'Clean frame syndrome decimal is 0');
  
  const cleanCorr = HammingMathEngine.correctFrame('0110011', cleanSyn.errorPosition, '7-4');
  assert(cleanCorr.recoveredData === data, 'Recovered data matches "1011" exactly');
}

console.log('\n=== TEST SUITE 2: HAMMING (7,4) SINGLE-BIT CORRUPTION ACROSS ALL 7 POSITIONS ===');
{
  const data = '1011';
  const encodedStr = '0110011';

  for (let errorPos = 1; errorPos <= 7; errorPos++) {
    // Invert bit at errorPos
    const chars = encodedStr.split('');
    chars[errorPos - 1] = chars[errorPos - 1] === '1' ? '0' : '1';
    const corruptedFrame = chars.join('');

    const syn = HammingMathEngine.calculateSyndrome(corruptedFrame, '7-4');
    assert(syn.hasError === true, `Error detected when bit #${errorPos} corrupted`);
    assert(syn.errorPosition === errorPos, `Syndrome decimal points accurately to bit #${errorPos}`, `got: ${syn.errorPosition}`);
    assert(syn.syndromeDecimal === errorPos, `Syndrome decimal value equals ${errorPos}`);

    const corr = HammingMathEngine.correctFrame(corruptedFrame, syn.errorPosition, '7-4');
    assert(corr.wasCorrected === true, `Correction executed on bit #${errorPos}`);
    assert(corr.correctedFrame === encodedStr, `Codeword repaired back to "${encodedStr}"`);
    assert(corr.recoveredData === data, `Original data "${data}" 100% recovered from bit #${errorPos} error`);
  }
}

console.log('\n=== TEST SUITE 3: HAMMING (7,4) MULTIPLE DATA WORDS AND EXTREMES ===');
{
  const testWords = ['0000', '1111', '1010', '0101', '1100', '0011', '1001', '0110'];

  for (const word of testWords) {
    const enc = HammingMathEngine.encodeHamming(word, '7-4');
    // Test random bit flip
    for (let bitToFlip = 1; bitToFlip <= 7; bitToFlip++) {
      const chars = enc.encodedBits.split('');
      chars[bitToFlip - 1] = chars[bitToFlip - 1] === '1' ? '0' : '1';
      const noisy = chars.join('');

      const syn = HammingMathEngine.calculateSyndrome(noisy, '7-4');
      const corr = HammingMathEngine.correctFrame(noisy, syn.errorPosition, '7-4');

      assert(syn.errorPosition === bitToFlip, `Word "${word}" bit #${bitToFlip} localized`);
      assert(corr.recoveredData === word, `Word "${word}" recovered payload match`);
    }
  }
}

console.log('\n=== TEST SUITE 4: HAMMING (12,8) 8-BIT BYTE ENCODING AND CORRECTION ===');
{
  const data8 = '10110010'; // 8-bit data
  const enc8 = HammingMathEngine.encodeHamming(data8, '12-8');

  assert(enc8.encodedBits.length === 12, 'Hamming(12,8) total bits is 12');
  assert(enc8.parityDetails.length === 4, 'Hamming(12,8) has 4 parity bits (P1, P2, P4, P8)');

  // Verify all 12 single bit flip positions
  for (let pos = 1; pos <= 12; pos++) {
    const chars = enc8.encodedBits.split('');
    chars[pos - 1] = chars[pos - 1] === '1' ? '0' : '1';
    const corrupted12 = chars.join('');

    const syn = HammingMathEngine.calculateSyndrome(corrupted12, '12-8');
    assert(syn.errorPosition === pos, `Hamming(12,8) error at pos #${pos} accurately diagnosed`);

    const corr = HammingMathEngine.correctFrame(corrupted12, syn.errorPosition, '12-8');
    assert(corr.recoveredData === data8, `Hamming(12,8) recovered data "${data8}" matches`);
  }
}

console.log('\n=== TEST SUITE 5: INPUT VALIDATION & ERROR GUARDS ===');
{
  assert(HammingMathEngine.isValidBinary('1011', 4) === true, '"1011" is valid 4-bit binary');
  assert(HammingMathEngine.isValidBinary('101', 4) === false, '"101" rejected for 4-bit requirement');
  assert(HammingMathEngine.isValidBinary('1021', 4) === false, '"1021" rejected (non-binary character)');
  assert(HammingMathEngine.isValidBinary('', 4) === false, 'Empty string rejected');
  assert(HammingMathEngine.isValidBinary(null, 4) === false, 'Null rejected');

  try {
    HammingMathEngine.encodeHamming('101', '7-4');
    assert(false, 'Should throw error on invalid length for 7-4');
  } catch (e) {
    assert(true, 'Correctly throws exception on invalid input length');
  }
}

console.log('\n=== TEST SUITE 6: PREVIOUS GAMES NON-REGRESSION (CHECKSUM & CRC) ===');
{
  // Checksum Guard
  const specWords = ['10011001', '11100010'];
  const senderCalc = ChecksumSystem.computeSenderChecksum(specWords, 8);
  assert(senderCalc.checksum === '10000011', 'Checksum Guard computes spec checksum 10000011');
  const rxValid = ChecksumSystem.verifyReceiverChecksum(specWords, senderCalc.checksum, 8);
  assert(rxValid.isValid === true, 'Checksum Guard: valid reception verified without error');

  // CRC Challenge
  const specCrc = CRCMathEngine.calculateCRC('1101', '1011');
  assert(specCrc.remainder === '001', 'CRC Challenge: remainder is 001');
  assert(specCrc.transmittedFrame === '1101001', 'CRC Challenge: transmitted frame is 1101001');
  const cleanVerify = CRCMathEngine.verifyReceivedFrame(specCrc.transmittedFrame, '1011');
  assert(cleanVerify.isValid === true, 'CRC Challenge: clean frame verifies with 0 remainder');
}

console.log(`\n========================================`);
console.log(`RESULTS: ${passedTests} / ${totalTests} tests passed.`);
console.log(`========================================`);

if (passedTests === totalTests) {
  console.log('ALL QA UNIT AND INTEGRATION TESTS PASSED!');
} else {
  console.error('SOME QA TESTS FAILED!');
  process.exit(1);
}
