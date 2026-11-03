/**
 * CHECKSUM GUARD — Interactive Educational 2D Simulation
 * Data Link Layer Checksum Calculation, Transmission, Error Injection & Verification
 * 
 * Modular Architecture:
 * - ChecksumSystem: Pure 1's complement arithmetic engine
 * - FrameSystem: Bit-level frame composition & management
 * - TransmissionSystem: 60 FPS HTML5 Canvas 2D packet animation arena
 * - GameState: Reactive state machine, score & gameplay loop
 * - Sender: Sender data input & step-by-step arithmetic UI
 * - Router: Router error decision & single-bit corruption flipper
 * - Receiver: Independent receiver 1's complement verification engine
 * - BitDisplay: Interactive bit rendering components
 * - CalculationPanel: Step-by-step math breakdowns
 */

(function (window) {
  'use strict';

  // ==========================================
  // 1. CHECKSUM SYSTEM (Pure Bitwise Math)
  // ==========================================
  const ChecksumSystem = {
    // Validates binary string
    isValidBinary: function (str, expectedLength = null) {
      if (!str || typeof str !== 'string') return false;
      const clean = str.trim();
      if (!/^[01]+$/.test(clean)) return false;
      if (expectedLength && clean.length !== expectedLength) return false;
      return true;
    },

    // Formats a number to binary string padded to wordSize
    toBinaryString: function (num, wordSize = 8) {
      return (num >>> 0).toString(2).padStart(wordSize, '0');
    },

    // 1's complement addition of two binary words with end-around carry
    addBinaryWords: function (binA, binB, wordSize = 8) {
      const valA = parseInt(binA, 2);
      const valB = parseInt(binB, 2);
      const rawSum = valA + valB;
      const rawBin = rawSum.toString(2);

      const maxWordVal = (1 << wordSize) - 1;
      let carryBit = 0;
      let finalSum = rawSum;
      let endAroundApplied = false;

      // Carry occurs if sum exceeds word size (e.g., > 255 for 8 bits)
      if (rawSum > maxWordVal) {
        carryBit = Math.floor(rawSum / (1 << wordSize));
        const baseSum = rawSum & maxWordVal;
        finalSum = baseSum + carryBit;
        endAroundApplied = true;

        // If secondary carry occurs
        if (finalSum > maxWordVal) {
          finalSum = (finalSum & maxWordVal) + 1;
        }
      }

      return {
        wordA: binA,
        wordB: binB,
        valA,
        valB,
        rawSum,
        rawBin,
        carryBit,
        endAroundApplied,
        finalSumVal: finalSum,
        finalSumBin: (finalSum >>> 0).toString(2).padStart(wordSize, '0')
      };
    },

    // 1's complement inversion (flip all bits)
    onesComplement: function (binStr) {
      return binStr.split('').map(b => (b === '1' ? '0' : '1')).join('');
    },

    // Complete Sender Checksum calculation for multiple words
    computeSenderChecksum: function (words, wordSize = 8) {
      if (!words || words.length === 0) {
        throw new Error("At least one binary word required.");
      }

      const steps = [];
      let currentBin = words[0];

      for (let i = 1; i < words.length; i++) {
        const nextBin = words[i];
        const addResult = this.addBinaryWords(currentBin, nextBin, wordSize);
        steps.push({
          stepIndex: i,
          operandA: currentBin,
          operandB: nextBin,
          rawSum: addResult.rawSum,
          rawBin: addResult.rawBin,
          carryBit: addResult.carryBit,
          endAroundApplied: addResult.endAroundApplied,
          intermediateSum: addResult.finalSumBin
        });
        currentBin = addResult.finalSumBin;
      }

      const finalSum = currentBin;
      const checksum = this.onesComplement(finalSum);

      return {
        words: [...words],
        wordSize,
        additionSteps: steps,
        finalSum,
        checksum,
        combinedFrameBits: [...words, checksum].join('')
      };
    },

    // Complete Receiver verification calculation (adds data words + received checksum)
    verifyReceiverChecksum: function (dataWords, receivedChecksum, wordSize = 8) {
      const allWords = [...dataWords, receivedChecksum];
      const steps = [];
      let currentBin = allWords[0];

      for (let i = 1; i < allWords.length; i++) {
        const nextBin = allWords[i];
        const isChecksumStep = (i === allWords.length - 1);
        const addResult = this.addBinaryWords(currentBin, nextBin, wordSize);
        steps.push({
          stepIndex: i,
          operandA: currentBin,
          operandB: nextBin,
          isChecksumStep,
          rawSum: addResult.rawSum,
          rawBin: addResult.rawBin,
          carryBit: addResult.carryBit,
          endAroundApplied: addResult.endAroundApplied,
          intermediateSum: addResult.finalSumBin
        });
        currentBin = addResult.finalSumBin;
      }

      const finalSum = currentBin;
      const invertedSum = this.onesComplement(finalSum);
      const expectedAllOnes = "1".repeat(wordSize);
      const isValid = (finalSum === expectedAllOnes);

      return {
        dataWords: [...dataWords],
        receivedChecksum,
        allWords,
        wordSize,
        verificationSteps: steps,
        finalSum,
        invertedSum,
        expectedAllOnes,
        isValid
      };
    }
  };

  // ==========================================
  // 2. AUDIO SYNTHESIZER (Retro Arcade Sound FX)
  // ==========================================
  const SoundSystem = {
    audioCtx: null,
    muted: false,

    init: function () {
      if (!this.audioCtx && (window.AudioContext || window.webkitAudioContext)) {
        try {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          this.audioCtx = new AudioContextClass();
        } catch (e) {
          // Audio not supported or blocked
        }
      }
    },

    playTone: function (freq, type, duration, gainVal = 0.08) {
      if (this.muted) return;
      this.init();
      if (!this.audioCtx) return;

      try {
        if (this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = type || 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
        gain.gain.setValueAtTime(gainVal, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + duration);
      } catch (e) {
        // Audio error ignored
      }
    },

    bitClick: function () {
      this.playTone(880, 'triangle', 0.05, 0.06);
    },

    transmitStart: function () {
      this.playTone(440, 'sine', 0.2, 0.08);
      setTimeout(() => this.playTone(660, 'sine', 0.25, 0.08), 120);
    },

    dockRouter: function () {
      this.playTone(520, 'square', 0.15, 0.05);
    },

    glitchAlert: function () {
      this.playTone(180, 'sawtooth', 0.2, 0.1);
      setTimeout(() => this.playTone(120, 'sawtooth', 0.3, 0.12), 80);
    },

    successChime: function () {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 'sine', 0.3, 0.08), idx * 100);
      });
    },

    rejectAlarm: function () {
      [300, 220, 160].forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 'sawtooth', 0.25, 0.09), idx * 120);
      });
    }
  };

  // ==========================================
  // 3. FRAME SYSTEM (Bit Container & Cloner)
  // ==========================================
  const FrameSystem = {
    // Assembles frame bits structure
    buildFrame: function (dataWords, checksum, wordSize = 8) {
      const bitObjects = [];
      let globalIndex = 0;

      // Data Words bits
      dataWords.forEach((word, wIdx) => {
        for (let bIdx = 0; bIdx < word.length; bIdx++) {
          bitObjects.push({
            globalIndex: globalIndex++,
            wordIndex: wIdx,
            wordType: 'data',
            bitIndex: bIdx,
            originalValue: word[bIdx],
            transmittedValue: word[bIdx],
            isFlipped: false
          });
        }
      });

      // Checksum bits
      for (let bIdx = 0; bIdx < checksum.length; bIdx++) {
        bitObjects.push({
          globalIndex: globalIndex++,
          wordIndex: dataWords.length,
          wordType: 'checksum',
          bitIndex: bIdx,
          originalValue: checksum[bIdx],
          transmittedValue: checksum[bIdx],
          isFlipped: false
        });
      }

      return {
        dataWords: [...dataWords],
        checksum,
        wordSize,
        bits: bitObjects,
        flippedBitIndex: null, // exactly 1 or null
        originalFrameString: [...dataWords, checksum].join('')
      };
    },

    // Flips a single bit (Option B) or clears flip (Option A)
    setFlippedBit: function (frameObj, targetIndex) {
      frameObj.bits.forEach((bit) => {
        if (targetIndex !== null && bit.globalIndex === targetIndex) {
          bit.isFlipped = true;
          bit.transmittedValue = bit.originalValue === '1' ? '0' : '1';
        } else {
          bit.isFlipped = false;
          bit.transmittedValue = bit.originalValue;
        }
      });
      frameObj.flippedBitIndex = targetIndex;
    },

    // Reconstructs transmitted words array and transmitted checksum
    getTransmittedComponents: function (frameObj) {
      const wordsCount = frameObj.dataWords.length;
      const wordSize = frameObj.wordSize;
      const resultWords = [];

      for (let w = 0; w < wordsCount; w++) {
        const start = w * wordSize;
        const end = start + wordSize;
        const wordBits = frameObj.bits.slice(start, end).map(b => b.transmittedValue).join('');
        resultWords.push(wordBits);
      }

      const chkStart = wordsCount * wordSize;
      const chkBits = frameObj.bits.slice(chkStart, chkStart + wordSize).map(b => b.transmittedValue).join('');

      return {
        transmittedDataWords: resultWords,
        transmittedChecksum: chkBits,
        fullTransmittedString: frameObj.bits.map(b => b.transmittedValue).join('')
      };
    }
  };

  // ==========================================
  // 4. TRANSMISSION SYSTEM (Canvas 2D Arena)
  // ==========================================
  const TransmissionSystem = {
    canvas: null,
    ctx: null,
    animFrameId: null,
    width: 800,
    height: 240,

    // Animation progress & state
    state: 'IDLE', // IDLE, SENDER_TO_ROUTER, AT_ROUTER, ROUTER_TO_RECEIVER, AT_RECEIVER
    progress: 0,   // 0.0 to 1.0 along current leg
    hasError: false,
    particles: [],

    init: function (canvasElement) {
      this.canvas = canvasElement;
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      this.startLoop();
    },

    resize: function () {
      if (!this.canvas) return;
      const rect = this.canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      this.width = Math.floor(rect.width) || 800;
      this.height = Math.floor(rect.height) || 240;
      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.ctx.scale(dpr, dpr);
    },

    startLoop: function () {
      const render = () => {
        this.update();
        this.draw();
        this.animFrameId = requestAnimationFrame(render);
      };
      if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
      this.animFrameId = requestAnimationFrame(render);
    },

    stopLoop: function () {
      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
        this.animFrameId = null;
      }
    },

    startSenderToRouter: function (onComplete) {
      this.state = 'SENDER_TO_ROUTER';
      this.progress = 0;
      this.hasError = false;
      SoundSystem.transmitStart();

      const startTime = performance.now();
      const duration = 2000; // ms

      const step = (now) => {
        if (this.state !== 'SENDER_TO_ROUTER') return;
        const elapsed = now - startTime;
        this.progress = Math.min(1.0, elapsed / duration);

        if (this.progress < 1.0) {
          requestAnimationFrame(step);
        } else {
          this.state = 'AT_ROUTER';
          SoundSystem.dockRouter();
          if (onComplete) onComplete();
        }
      };
      requestAnimationFrame(step);
    },

    startRouterToReceiver: function (hasCorruptedBit, onComplete) {
      this.state = 'ROUTER_TO_RECEIVER';
      this.progress = 0;
      this.hasError = hasCorruptedBit;

      if (hasCorruptedBit) {
        SoundSystem.glitchAlert();
      } else {
        SoundSystem.transmitStart();
      }

      const startTime = performance.now();
      const duration = 2000; // ms

      const step = (now) => {
        if (this.state !== 'ROUTER_TO_RECEIVER') return;
        const elapsed = now - startTime;
        this.progress = Math.min(1.0, elapsed / duration);

        if (this.progress < 1.0) {
          requestAnimationFrame(step);
        } else {
          this.state = 'AT_RECEIVER';
          if (onComplete) onComplete();
        }
      };
      requestAnimationFrame(step);
    },

    update: function () {
      // Spawn trail particles if packet is in flight
      if (this.state === 'SENDER_TO_ROUTER' || this.state === 'ROUTER_TO_RECEIVER') {
        const coords = this.getPacketPosition();
        if (coords) {
          const particleCount = this.hasError ? 4 : 2;
          for (let p = 0; p < particleCount; p++) {
            this.particles.push({
              x: coords.x + (Math.random() - 0.5) * 14,
              y: coords.y + (Math.random() - 0.5) * 14,
              vx: (Math.random() - 0.5) * 1.5 - (this.state.startsWith('SENDER') ? 1.5 : 1.5),
              vy: (Math.random() - 0.5) * 1.5,
              life: 1.0,
              decay: 0.03 + Math.random() * 0.03,
              size: 2 + Math.random() * 3,
              color: this.hasError ? (Math.random() > 0.4 ? '#ef4444' : '#f97316') : '#38bdf8'
            });
          }
        }
      }

      // Update particles
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const pt = this.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life -= pt.decay;
        if (pt.life <= 0) {
          this.particles.splice(i, 1);
        }
      }
    },

    getNodePositions: function () {
      const centerY = this.height / 2;
      const margin = Math.min(90, this.width * 0.15);
      const senderX = margin;
      const routerX = this.width / 2;
      const receiverX = this.width - margin;

      return {
        sender: { x: senderX, y: centerY, label: 'SENDER', color: '#0ea5e9', role: 'Tx Node' },
        router: { x: routerX, y: centerY, label: 'ROUTER', color: '#a855f7', role: 'Transit / Switch' },
        receiver: { x: receiverX, y: centerY, label: 'RECEIVER', color: '#10b981', role: 'Rx Node' }
      };
    },

    getPacketPosition: function () {
      const nodes = this.getNodePositions();
      if (this.state === 'SENDER_TO_ROUTER') {
        const start = nodes.sender.x;
        const end = nodes.router.x;
        return {
          x: start + (end - start) * this.progress,
          y: nodes.sender.y
        };
      } else if (this.state === 'ROUTER_TO_RECEIVER') {
        const start = nodes.router.x;
        const end = nodes.receiver.x;
        return {
          x: start + (end - start) * this.progress,
          y: nodes.router.y
        };
      } else if (this.state === 'AT_ROUTER') {
        return { x: nodes.router.x, y: nodes.router.y };
      } else if (this.state === 'AT_RECEIVER') {
        return { x: nodes.receiver.x, y: nodes.receiver.y };
      }
      return null;
    },

    draw: function () {
      const ctx = this.ctx;
      if (!ctx) return;
      const w = this.width;
      const h = this.height;

      // Dark background
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#070b14';
      ctx.fillRect(0, 0, w, h);

      // Subtle cyber grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const nodes = this.getNodePositions();

      // 1. Draw Transmission Cables / Pathways
      // Leg 1: Sender -> Router
      this.drawConduit(ctx, nodes.sender.x, nodes.sender.y, nodes.router.x, nodes.router.y, '#0284c7', this.state === 'SENDER_TO_ROUTER');
      // Leg 2: Router -> Receiver
      const leg2Color = this.hasError ? '#dc2626' : '#059669';
      this.drawConduit(ctx, nodes.router.x, nodes.router.y, nodes.receiver.x, nodes.receiver.y, leg2Color, this.state === 'ROUTER_TO_RECEIVER');

      // 2. Draw Particles
      this.particles.forEach(pt => {
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = Math.max(0, pt.life);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      // 3. Draw Nodes (Sender, Router, Receiver)
      this.drawNode(ctx, nodes.sender, this.state === 'IDLE' || this.state === 'SENDER_TO_ROUTER');
      this.drawNode(ctx, nodes.router, this.state === 'AT_ROUTER' || this.state === 'ROUTER_TO_RECEIVER');
      this.drawNode(ctx, nodes.receiver, this.state === 'AT_RECEIVER');

      // 4. Draw Traveling Data Packet
      const packetPos = this.getPacketPosition();
      if (packetPos) {
        this.drawPacket(ctx, packetPos.x, packetPos.y, this.hasError);
      }
    },

    drawConduit: function (ctx, x1, y1, x2, y2, baseColor, isActive) {
      // Background conduit groove
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.7)';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Core glowing optical line
      ctx.strokeStyle = baseColor;
      ctx.lineWidth = isActive ? 3 : 1.5;
      ctx.shadowColor = baseColor;
      ctx.shadowBlur = isActive ? 12 : 4;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset
    },

    drawNode: function (ctx, node, isHighlighted) {
      const radius = 32;

      // Outer radar pulse if active
      if (isHighlighted) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 8, 0, Math.PI * 2);
        ctx.strokeStyle = node.color;
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }

      // Outer circular frame
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = node.color;
      ctx.shadowColor = node.color;
      ctx.shadowBlur = isHighlighted ? 15 : 6;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Inner icon / monogram
      ctx.fillStyle = node.color;
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label[0], node.x, node.y - 2);

      // Node text label below
      ctx.fillStyle = '#f1f5f9';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText(node.label, node.x, node.y + radius + 16);

      // Node subtext
      ctx.fillStyle = '#64748b';
      ctx.font = '9px Inter, sans-serif';
      ctx.fillText(node.role, node.x, node.y + radius + 28);
    },

    drawPacket: function (ctx, x, y, isCorrupted) {
      const pW = 54;
      const pH = 26;
      const rx = x - pW / 2;
      const ry = y - pH / 2;

      // Packet body
      ctx.save();
      ctx.shadowColor = isCorrupted ? '#ef4444' : '#38bdf8';
      ctx.shadowBlur = 18;
      ctx.fillStyle = isCorrupted ? '#7f1d1d' : '#0369a1';
      ctx.strokeStyle = isCorrupted ? '#f87171' : '#38bdf8';
      ctx.lineWidth = 2;

      // Rounded rect
      ctx.beginPath();
      ctx.roundRect(rx, ry, pW, pH, 6);
      ctx.fill();
      ctx.stroke();

      // Glitch visual jitter on packet if corrupted
      if (isCorrupted && Math.random() > 0.4) {
        ctx.fillStyle = '#fee2e2';
        ctx.fillRect(rx + (Math.random() - 0.5) * 6, ry - 3, pW * 0.4, 3);
      }

      // Packet text
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(isCorrupted ? 'ERR:FRAME' : 'FRAME', x, y);
      ctx.restore();
    }
  };

  // ==========================================
  // 5. GAME STATE CONTROLLER
  // ==========================================
  const GameState = {
    currentPhase: 'SETUP', // SETUP, SENDER_CALC, SENDER_TO_ROUTER, ROUTER_CHOICE, ROUTER_TO_RECEIVER, VERIFYING, RESULTS
    wordSize: 8,
    dataWords: ['10011001', '11100010'], // default example from specification
    checksumResult: null,
    frame: null,
    receiverResult: null,

    // Statistics
    stats: {
      transmissionsCount: 0,
      cleanSuccessCount: 0,
      errorsDetectedCount: 0,
      score: 0,
      streak: 0
    },

    resetToSetup: function () {
      this.currentPhase = 'SETUP';
      this.checksumResult = null;
      this.frame = null;
      this.receiverResult = null;
      TransmissionSystem.state = 'IDLE';
      TransmissionSystem.hasError = false;
      TransmissionSystem.particles = [];
    }
  };

  // ==========================================
  // 6. BIT DISPLAY UTILITIES
  // ==========================================
  const BitDisplay = {
    renderFrameBits: function (frameObj, options = {}) {
      const { interactive = false, onBitClick = null } = options;
      const wordSize = frameObj.wordSize;
      const dataWordsCount = frameObj.dataWords.length;

      let html = `<div class="cg-bit-row">`;

      for (let w = 0; w < dataWordsCount; w++) {
        const start = w * wordSize;
        const end = start + wordSize;
        const bits = frameObj.bits.slice(start, end);

        html += `
          <div class="cg-word-group">
            <span class="absolute -top-3 left-2 px-1 text-[9px] font-bold text-sky-400 bg-slate-900 border border-sky-900 rounded">
              Word ${w + 1}
            </span>
            ${bits.map(b => this.renderSingleBit(b, interactive, onBitClick)).join('')}
          </div>
        `;
      }

      // Checksum Word Group
      const chkStart = dataWordsCount * wordSize;
      const chkBits = frameObj.bits.slice(chkStart, chkStart + wordSize);
      html += `
        <div class="cg-word-group checksum-group">
          <span class="absolute -top-3 left-2 px-1 text-[9px] font-bold text-purple-400 bg-slate-900 border border-purple-900 rounded">
            Checksum
          </span>
          ${chkBits.map(b => this.renderSingleBit(b, interactive, onBitClick)).join('')}
        </div>
      `;

      html += `</div>`;
      return html;
    },

    renderSingleBit: function (bit, interactive, onBitClick) {
      const classes = [
        'cg-bit-box',
        interactive ? 'interactive' : '',
        bit.isFlipped ? 'bit-flipped' : ''
      ].filter(Boolean).join(' ');

      const clickAttr = interactive
        ? `onclick="ChecksumGuardGame.handleBitClick(${bit.globalIndex})"`
        : '';

      return `
        <div class="${classes}" ${clickAttr} title="Bit index ${bit.globalIndex} (Word ${bit.wordType === 'checksum' ? 'Checksum' : bit.wordIndex + 1})">
          <span>${bit.transmittedValue}</span>
          <span class="cg-bit-index">${bit.globalIndex}</span>
        </div>
      `;
    }
  };

  // ==========================================
  // 7. CALCULATION PANEL UTILITIES
  // ==========================================
  const CalculationPanel = {
    renderSenderMath: function (calc) {
      if (!calc) return '';

      let stepsHtml = '';
      calc.additionSteps.forEach((s) => {
        stepsHtml += `
          <div class="cg-calc-step space-y-1">
            <div class="text-slate-400 text-xs font-semibold">// Addition Step ${s.stepIndex}</div>
            <div class="flex items-center space-x-2">
              <span class="text-slate-400 w-24">Operand A:</span>
              <span class="text-sky-300 font-bold">${s.operandA}</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-slate-400 w-24">+ Operand B:</span>
              <span class="text-sky-300 font-bold">${s.operandB}</span>
            </div>
            <div class="flex items-center space-x-2 border-t border-slate-700 pt-1">
              <span class="text-slate-400 w-24">Raw Binary Sum:</span>
              <span class="text-amber-300 font-bold">${s.rawBin}</span>
              ${s.carryBit > 0 ? `<span class="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/40 font-sans">Carry = 1 generated!</span>` : ''}
            </div>
            ${s.endAroundApplied ? `
              <div class="bg-slate-900/80 p-2 rounded border border-amber-500/30 text-xs mt-1 space-y-1">
                <div class="text-amber-400 font-bold flex items-center gap-1.5">
                  <i class="fa-solid fa-rotate-left"></i> End-Around Carry Step:
                </div>
                <div class="text-slate-300 pl-4">
                  <div>${s.rawBin.slice(-calc.wordSize)} (Truncated to ${calc.wordSize} bits)</div>
                  <div>+ ${s.carryBit.toString(2).padStart(calc.wordSize, '0')} (Carry wrapped around to LSB)</div>
                  <div class="border-t border-slate-700 text-emerald-400 font-bold pt-0.5">= ${s.intermediateSum}</div>
                </div>
              </div>
            ` : ''}
          </div>
        `;
      });

      return `
        <div class="cg-calc-box space-y-3">
          <div class="flex items-center justify-between pb-2 border-b border-slate-700">
            <span class="text-sky-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <i class="fa-solid fa-calculator"></i> Sender 1's Complement Arithmetic
            </span>
            <span class="text-[11px] text-slate-400">Word Size: ${calc.wordSize} Bits</span>
          </div>
          ${stepsHtml}
          <div class="pt-2 border-t border-slate-700 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-slate-300">Final Accumulated Sum:</span>
              <strong class="text-emerald-400 text-sm font-mono">${calc.finalSum}</strong>
            </div>
            <div class="flex items-center justify-between bg-purple-950/40 p-2.5 rounded border border-purple-500/40">
              <div>
                <div class="text-purple-300 font-bold text-xs">1's Complement Inversion (~Sum):</div>
                <div class="text-[11px] text-slate-400 font-sans">Every 0 flips to 1, and every 1 flips to 0.</div>
              </div>
              <strong class="text-purple-300 text-base font-mono bg-purple-900/60 px-2 py-0.5 rounded border border-purple-400/50">${calc.checksum}</strong>
            </div>
          </div>
        </div>
      `;
    },

    renderReceiverMath: function (verify) {
      if (!verify) return '';

      let stepsHtml = '';
      verify.verificationSteps.forEach((s) => {
        stepsHtml += `
          <div class="cg-calc-step space-y-1">
            <div class="text-slate-400 text-xs font-semibold">
              // Step ${s.stepIndex}: Adding ${s.isChecksumStep ? '<span class="text-purple-400 font-bold">Received Checksum</span>' : `Word ${s.stepIndex + 1}`}
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-slate-400 w-24">Acc Sum:</span>
              <span class="text-sky-300 font-bold">${s.operandA}</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-slate-400 w-24">+ ${s.isChecksumStep ? 'Checksum:' : 'Next Word:'}</span>
              <span class="${s.isChecksumStep ? 'text-purple-300' : 'text-sky-300'} font-bold">${s.operandB}</span>
            </div>
            <div class="flex items-center space-x-2 border-t border-slate-700 pt-1">
              <span class="text-slate-400 w-24">Sum:</span>
              <span class="text-amber-300 font-bold">${s.intermediateSum}</span>
            </div>
          </div>
        `;
      });

      return `
        <div class="cg-calc-box space-y-3">
          <div class="flex items-center justify-between pb-2 border-b border-slate-700">
            <span class="text-emerald-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <i class="fa-solid fa-shield-check"></i> Receiver Verification Arithmetic
            </span>
            <span class="text-[11px] text-slate-400">${verify.allWords.length} Words Summed</span>
          </div>
          ${stepsHtml}
          <div class="pt-2 border-t border-slate-700 space-y-2">
            <div class="flex items-center justify-between p-2 rounded ${verify.isValid ? 'bg-emerald-950/50 border border-emerald-500/40' : 'bg-red-950/50 border border-red-500/40'}">
              <div>
                <span class="text-xs font-bold ${verify.isValid ? 'text-emerald-300' : 'text-red-300'}">Total 1's Complement Sum:</span>
                <div class="text-[10px] text-slate-400 font-sans">Must equal ${verify.expectedAllOnes} (All 1s) for error-free delivery</div>
              </div>
              <strong class="text-base font-mono ${verify.isValid ? 'text-emerald-300' : 'text-red-300'}">${verify.finalSum}</strong>
            </div>
            <div class="flex items-center justify-between text-xs text-slate-400 px-1 font-sans">
              <span>Complement of Sum (Syndrome):</span>
              <span class="font-mono font-bold ${verify.isValid ? 'text-emerald-400' : 'text-red-400'}">${verify.invertedSum} ${verify.isValid ? '(Zero Syndrome)' : '(Non-Zero Syndrome)'}</span>
            </div>
          </div>
        </div>
      `;
    }
  };

  // ==========================================
  // 8. CHECKSUM GUARD GAME ENGINE & CONTROLLER
  // ==========================================
  const ChecksumGuardGame = {
    container: null,

    // Primary entry point called by App.loadView('checksum-guard')
    render: function (targetContainer) {
      this.container = targetContainer;
      this.renderGameShell();
      TransmissionSystem.init(document.getElementById('cg-canvas'));
      this.renderActiveStage();
    },

    // Renders the arcade shell container, HUD, and canvas
    renderGameShell: function () {
      if (!this.container) return;

      this.container.innerHTML = `
        <div class="max-w-5xl mx-auto space-y-4">
          <!-- Breadcrumb navigation -->
          <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <div class="flex items-center space-x-2">
              <button onclick="App.loadView('minigames')" class="hover:text-cyan-500 transition-colors flex items-center gap-1 font-semibold">
                <i class="fa-solid fa-arrow-left"></i> Mini Games Hub
              </button>
              <span>/</span>
              <span class="text-slate-800 dark:text-slate-200 font-bold">Checksum Guard</span>
            </div>
            <div class="flex items-center space-x-3">
              <span class="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded text-[11px] font-bold">
                Data Link Layer
              </span>
              <span class="text-slate-400 text-[11px]">RFC 1071 1's Complement</span>
            </div>
          </div>

          <!-- ARCADE GAME CONTAINER -->
          <div class="cg-wrapper">
            <!-- HUD TOP BAR -->
            <div class="cg-hud-header flex flex-wrap items-center justify-between gap-3">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 border border-cyan-400/40">
                  <i class="fa-solid fa-shield-halved text-lg"></i>
                </div>
                <div>
                  <div class="flex items-center space-x-2">
                    <h1 class="text-lg font-black tracking-tight text-white leading-none">CHECKSUM GUARD</h1>
                    <span class="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-extrabold px-1.5 py-0.5 rounded tracking-wider">
                      v2.0 ARCADE
                    </span>
                  </div>
                  <p class="text-[11px] text-cyan-300 font-medium">Secure the Transmission • 1's Complement Error Detection</p>
                </div>
              </div>

              <!-- ARCADE STATS & SOUND TOGGLE -->
              <div class="flex items-center space-x-2 sm:space-x-3 text-xs">
                <div class="cg-hud-badge border-cyan-500/30 text-cyan-300">
                  <i class="fa-solid fa-trophy text-amber-400"></i>
                  <span>SCORE: <strong id="cg-stat-score">${GameState.stats.score}</strong></span>
                </div>
                <div class="cg-hud-badge border-purple-500/30 text-purple-300 hidden sm:inline-flex">
                  <i class="fa-solid fa-bolt text-yellow-400"></i>
                  <span>STREAK: <strong id="cg-stat-streak">${GameState.stats.streak}x</strong></span>
                </div>
                <button onclick="ChecksumGuardGame.toggleMute()" id="cg-sound-btn" class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 transition-colors" title="Toggle Sound FX">
                  <i id="cg-sound-icon" class="fa-solid ${SoundSystem.muted ? 'fa-volume-xmark text-red-400' : 'fa-volume-high text-cyan-400'}"></i>
                </button>
                <button onclick="ChecksumGuardGame.resetGame()" class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 transition-colors" title="Reset Simulation">
                  <i class="fa-solid fa-rotate text-xs"></i>
                </button>
              </div>
            </div>

            <!-- 2D TRANSMISSION ARENA CANVAS -->
            <div class="cg-arena-container">
              <canvas id="cg-canvas" class="cg-arena-canvas"></canvas>
            </div>

            <!-- DYNAMIC STATUS & PHASE BAR -->
            <div id="cg-status-banner" class="cg-status-banner">
              <span id="cg-status-phase" class="flex items-center gap-2 text-cyan-400">
                <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>STEP 1: SENDER CONFIGURATION</span>
              </span>
              <span id="cg-status-hint" class="text-slate-400 text-xs hidden md:inline">
                Enter binary data words and calculate the 1's complement checksum.
              </span>
            </div>

            <!-- INTERACTIVE STAGE WORKSPACE PANEL -->
            <div id="cg-stage-container" class="cg-stage-panel">
              <!-- Dynamically populated based on GameState.currentPhase -->
            </div>
          </div>
        </div>
      `;
    },

    // Renders active UI based on GameState.currentPhase
    renderActiveStage: function () {
      const stageEl = document.getElementById('cg-stage-container');
      const phaseEl = document.getElementById('cg-status-phase');
      const hintEl = document.getElementById('cg-status-hint');
      if (!stageEl) return;

      switch (GameState.currentPhase) {
        case 'SETUP':
          phaseEl.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span><span>STAGE 1: SENDER DATA PREPARATION</span>`;
          hintEl.textContent = "Configure 8-bit binary words and execute 1's complement addition.";
          stageEl.innerHTML = this.renderSetupStage();
          break;

        case 'SENDER_CALC':
          phaseEl.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span><span>STAGE 1: SENDER CHECKSUM COMPUTED</span>`;
          hintEl.textContent = "Review step-by-step arithmetic and prepare the transmission frame.";
          stageEl.innerHTML = this.renderSenderCalcStage();
          break;

        case 'FRAME_PREPARED':
          phaseEl.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></span><span>STAGE 2: READY FOR TRANSMISSION</span>`;
          hintEl.textContent = "Frame assembled with data and checksum. Transmit to intermediate Router.";
          stageEl.innerHTML = this.renderFramePreparedStage();
          break;

        case 'ROUTER_CHOICE':
          phaseEl.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse"></span><span>STAGE 3: FRAME RECEIVED AT ROUTER</span>`;
          hintEl.textContent = "Pause at Router: Choose whether to introduce a transmission channel error.";
          stageEl.innerHTML = this.renderRouterChoiceStage();
          break;

        case 'ROUTER_ERROR_SELECTION':
          phaseEl.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse"></span><span>STAGE 3: SINGLE-BIT ERROR INJECTION</span>`;
          hintEl.textContent = "Click exactly ONE bit to corrupt it before forwarding to Receiver.";
          stageEl.innerHTML = this.renderRouterErrorSelectStage();
          break;

        case 'RESULTS':
          phaseEl.innerHTML = `<span class="w-2.5 h-2.5 rounded-full ${GameState.receiverResult?.isValid ? 'bg-emerald-400' : 'bg-red-400'} animate-pulse"></span><span>STAGE 4: RECEIVER VERIFICATION COMPLETE</span>`;
          hintEl.textContent = "Independent checksum verification evaluated. Review transmission telemetry.";
          stageEl.innerHTML = this.renderResultsStage();
          break;

        default:
          break;
      }
    },

    // STAGE 1: Data Input Form
    renderSetupStage: function () {
      const w1 = GameState.dataWords[0] || '10011001';
      const w2 = GameState.dataWords[1] || '11100010';

      return `
        <div class="space-y-5">
          <div>
            <h3 class="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <i class="fa-solid fa-server text-cyan-400"></i> Sender Station Configuration
            </h3>
            <p class="text-xs text-slate-400 mt-1">
              Enter binary data words. By default, standard 8-bit words are supported. The sender will compute the 1's complement sum and append the resulting checksum.
            </p>
          </div>

          <!-- Quick Presets -->
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-[10px] font-bold uppercase text-slate-400">Presets:</span>
            <button onclick="ChecksumGuardGame.loadPreset(['10011001', '11100010'])" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-mono text-cyan-300 transition-colors">
              Standard: 10011001 11100010
            </button>
            <button onclick="ChecksumGuardGame.loadPreset(['11110000', '11001100'])" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-mono text-cyan-300 transition-colors">
              Heavy Carries: 11110000 11001100
            </button>
            <button onclick="ChecksumGuardGame.loadPreset(['10101010', '01010101'])" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-mono text-cyan-300 transition-colors">
              Alternating: 10101010 01010101
            </button>
            <button onclick="ChecksumGuardGame.randomizeWords()" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-semibold text-slate-300 transition-colors">
              <i class="fa-solid fa-dice mr-1"></i> Randomize
            </button>
          </div>

          <!-- Inputs -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase text-slate-300 mb-1">
                Data Word 1 (8 Bits)
              </label>
              <input type="text" id="cg-input-word1" maxlength="8" value="${w1}" class="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-lg px-3.5 py-2.5 font-mono text-cyan-300 text-sm tracking-widest outline-none transition-colors" placeholder="e.g. 10011001">
              <span id="cg-err-word1" class="text-[11px] text-red-400 hidden mt-1 block">Must be exactly 8 binary bits (0 or 1)</span>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-slate-300 mb-1">
                Data Word 2 (8 Bits)
              </label>
              <input type="text" id="cg-input-word2" maxlength="8" value="${w2}" class="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-lg px-3.5 py-2.5 font-mono text-cyan-300 text-sm tracking-widest outline-none transition-colors" placeholder="e.g. 11100010">
              <span id="cg-err-word2" class="text-[11px] text-red-400 hidden mt-1 block">Must be exactly 8 binary bits (0 or 1)</span>
            </div>
          </div>

          <!-- Word Size Info Pill -->
          <div class="flex items-center justify-between text-xs text-slate-400 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-circle-info text-cyan-400"></i>
              <span>Word Size: <strong>8 Bits</strong> (Byte-oriented Data Link Checksum)</span>
            </div>
            <span class="text-emerald-400 font-mono font-bold">1's Complement Arithmetic</span>
          </div>

          <!-- Action Button -->
          <div class="pt-2">
            <button onclick="ChecksumGuardGame.handleCalculateChecksum()" class="cg-btn cg-btn-cyan w-full sm:w-auto">
              <i class="fa-solid fa-calculator"></i>
              <span>Calculate Checksum</span>
            </button>
          </div>
        </div>
      `;
    },

    // STAGE 1 (Calculated): Step-by-Step Calculation Screen
    renderSenderCalcStage: function () {
      const calc = GameState.checksumResult;
      if (!calc) return '';

      return `
        <div class="space-y-5">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 class="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <i class="fa-solid fa-list-check text-cyan-400"></i> Sender Checksum Calculation
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">
                Detailed 1's complement addition, carry generation, end-around carry and bit inversion.
              </p>
            </div>
            <button onclick="ChecksumGuardGame.editInputs()" class="text-xs text-cyan-400 hover:underline cursor-pointer">
              ← Edit Input Words
            </button>
          </div>

          <!-- Calculation Breakdown Box -->
          ${CalculationPanel.renderSenderMath(calc)}

          <!-- Frame Preview Header -->
          <div class="bg-slate-900/90 p-4 rounded-xl border border-sky-500/30 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-300">
                Calculated Checksum:
              </span>
              <span class="text-sm font-mono font-bold text-purple-300 bg-purple-950/70 border border-purple-500/50 px-2 py-0.5 rounded">
                ${calc.checksum}
              </span>
            </div>
            <p class="text-xs text-slate-400">
              The sender will now append this 8-bit checksum to the data words to assemble the complete Data Link frame.
            </p>
            <div class="pt-1">
              <button onclick="ChecksumGuardGame.handlePrepareFrame()" class="cg-btn cg-btn-emerald w-full sm:w-auto">
                <i class="fa-solid fa-box-archive"></i>
                <span>Prepare Frame for Transmission</span>
              </button>
            </div>
          </div>
        </div>
      `;
    },

    // STAGE 2: Frame Prepared Display
    renderFramePreparedStage: function () {
      const frame = GameState.frame;
      if (!frame) return '';

      return `
        <div class="space-y-5">
          <div>
            <h3 class="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <i class="fa-solid fa-layer-group text-sky-400"></i> Assembled Frame Display
            </h3>
            <p class="text-xs text-slate-400 mt-1">
              Data words and checksum are combined into a single ${frame.bits.length}-bit frame. Each bit is shown below:
            </p>
          </div>

          <!-- Bit Grid -->
          <div class="bg-slate-950/80 p-5 rounded-xl border border-sky-500/30 overflow-x-auto space-y-4">
            ${BitDisplay.renderFrameBits(frame, { interactive: false })}
            
            <div class="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <div class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded bg-slate-800 border border-sky-500/40"></span>
                <span>Data Words (${frame.dataWords.length * frame.wordSize} Bits)</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded bg-purple-900/60 border border-purple-500/60"></span>
                <span>Checksum (${frame.wordSize} Bits)</span>
              </div>
              <div class="ml-auto font-mono text-[11px] text-slate-400">
                Total Frame: <strong>${frame.bits.length} Bits</strong>
              </div>
            </div>
          </div>

          <!-- Transmission Launch Action -->
          <div class="flex items-center justify-between pt-2">
            <button onclick="ChecksumGuardGame.editInputs()" class="cg-btn cg-btn-secondary text-xs">
              ← Reconfigure
            </button>
            <button onclick="ChecksumGuardGame.handleTransmitToRouter()" id="cg-btn-transmit-router" class="cg-btn cg-btn-cyan">
              <i class="fa-solid fa-paper-plane"></i>
              <span>Transmit Frame to Router →</span>
            </button>
          </div>
        </div>
      `;
    },

    // STAGE 3: Router Decision Screen (Pause)
    renderRouterChoiceStage: function () {
      const frame = GameState.frame;
      if (!frame) return '';

      return `
        <div class="space-y-5">
          <div class="bg-purple-950/30 border border-purple-500/40 p-4 rounded-xl flex items-center space-x-3">
            <div class="w-10 h-10 rounded-lg bg-purple-900/80 text-purple-300 flex items-center justify-center text-lg border border-purple-400/50">
              <i class="fa-solid fa-router"></i>
            </div>
            <div>
              <div class="text-sm font-black uppercase text-purple-300">FRAME RECEIVED AT ROUTER</div>
              <p class="text-xs text-slate-300">
                Transmission paused. The frame is currently held in intermediate router memory.
              </p>
            </div>
          </div>

          <div class="text-center py-2 space-y-1">
            <h4 class="text-sm font-extrabold text-white uppercase tracking-wider">
              DO YOU WANT TO INTRODUCE A TRANSMISSION ERROR?
            </h4>
            <p class="text-xs text-slate-400">
              Test whether the receiver's checksum verification will accept or reject the transmission.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- OPTION A: NO ERROR -->
            <div class="bg-slate-900/80 hover:bg-slate-900 border border-slate-700 hover:border-emerald-500/60 p-4 rounded-xl space-y-3 transition-all flex flex-col justify-between group">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold uppercase text-emerald-400">OPTION A</span>
                  <span class="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40">Clean Channel</span>
                </div>
                <h5 class="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Forward Original Frame Unchanged
                </h5>
                <p class="text-xs text-slate-400 leading-relaxed">
                  The frame will traverse the physical medium without bit corruption. Checksum will match at receiver.
                </p>
              </div>
              <button onclick="ChecksumGuardGame.handleForwardNoError()" class="cg-btn cg-btn-emerald w-full mt-2">
                <i class="fa-solid fa-check"></i>
                <span>Forward With No Error</span>
              </button>
            </div>

            <!-- OPTION B: INTRODUCE SINGLE-BIT ERROR -->
            <div class="bg-slate-900/80 hover:bg-slate-900 border border-slate-700 hover:border-red-500/60 p-4 rounded-xl space-y-3 transition-all flex flex-col justify-between group">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold uppercase text-red-400">OPTION B</span>
                  <span class="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded border border-red-500/40">Inject Error</span>
                </div>
                <h5 class="text-sm font-bold text-white group-hover:text-red-300 transition-colors">
                  Introduce Single-Bit Error
                </h5>
                <p class="text-xs text-slate-400 leading-relaxed">
                  Interactive bit corruption: flip exactly one data or checksum bit to simulate noise or channel attenuation.
                </p>
              </div>
              <button onclick="ChecksumGuardGame.handleOpenBitFlipper()" class="cg-btn cg-btn-danger w-full mt-2">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span>Inject Bit Error →</span>
              </button>
            </div>
          </div>
        </div>
      `;
    },

    // STAGE 3 (Error Injection): Interactive Bit Grid
    renderRouterErrorSelectStage: function () {
      const frame = GameState.frame;
      if (!frame) return '';

      const flippedIdx = frame.flippedBitIndex;
      const originalComponents = FrameSystem.getTransmittedComponents(frame);

      return `
        <div class="space-y-5">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 class="text-sm font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
                <i class="fa-solid fa-bug"></i> Interactive Single-Bit Corruption
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">
                Click on any single bit below to flip its state ($0 \\rightarrow 1$ or $1 \\rightarrow 0$). Only 1 bit can be modified.
              </p>
            </div>
            <button onclick="ChecksumGuardGame.cancelErrorInjection()" class="text-xs text-slate-400 hover:text-white cursor-pointer">
              ← Cancel (No Error)
            </button>
          </div>

          <!-- Interactive Bit Grid -->
          <div class="bg-slate-950/90 p-5 rounded-xl border border-red-500/40 space-y-4">
            <div class="flex items-center justify-between text-xs text-slate-300 pb-1">
              <span class="font-bold flex items-center gap-1.5 text-amber-300">
                <i class="fa-solid fa-hand-pointer animate-bounce"></i> Click any bit to invert:
              </span>
              <span class="text-[11px] font-mono text-slate-400">
                Selected Bit: ${flippedIdx !== null ? `<strong class="text-red-400 font-bold">Bit #${flippedIdx}</strong>` : `<span class="italic text-slate-500">None</span>`}
              </span>
            </div>

            <div class="overflow-x-auto pb-2">
              ${BitDisplay.renderFrameBits(frame, { interactive: true })}
            </div>

            <!-- Original vs Transmitted Comparison Box -->
            <div class="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 space-y-2 text-xs font-mono">
              <div class="flex items-center space-x-2">
                <span class="text-slate-400 w-28 font-sans">Sender Original:</span>
                <span class="text-sky-300 font-bold tracking-wider">${frame.originalFrameString}</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-slate-400 w-28 font-sans">Transmitted Copy:</span>
                <span class="text-slate-200 tracking-wider">
                  ${frame.bits.map(b => b.isFlipped ? `<span class="text-red-400 font-extrabold bg-red-950 px-1 rounded underline">${b.transmittedValue}</span>` : b.transmittedValue).join('')}
                </span>
              </div>
              <div class="text-[11px] text-slate-400 font-sans pt-1 border-t border-slate-800">
                Rule: The sender's original frame remains strictly unchanged. Only the channel copy is modified.
              </div>
            </div>
          </div>

          <!-- Forward Button (Requires 1 bit flipped) -->
          <div class="flex items-center justify-between pt-2">
            <button onclick="ChecksumGuardGame.handleClearFlip()" class="cg-btn cg-btn-secondary text-xs">
              Reset Selection
            </button>
            <button onclick="ChecksumGuardGame.handleConfirmCorruptedForward()" id="cg-btn-forward-corrupted" class="cg-btn cg-btn-danger" ${flippedIdx === null ? 'disabled' : ''}>
              <i class="fa-solid fa-forward"></i>
              <span>Confirm & Forward Corrupted Frame →</span>
            </button>
          </div>
        </div>
      `;
    },

    // STAGE 4: Final Results Screen
    renderResultsStage: function () {
      const verify = GameState.receiverResult;
      const frame = GameState.frame;
      if (!verify || !frame) return '';

      const isSuccess = verify.isValid;
      const hadErrorInjected = (frame.flippedBitIndex !== null);

      return `
        <div class="space-y-6">
          <!-- VERDICT HERO BANNER -->
          <div class="p-5 rounded-xl border ${isSuccess ? 'bg-emerald-950/30 border-emerald-500/50' : 'bg-red-950/30 border-red-500/50'} flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 rounded-xl ${isSuccess ? 'bg-emerald-900/80 text-emerald-300 border-emerald-400' : 'bg-red-900/80 text-red-300 border-red-400'} border flex items-center justify-center text-2xl shadow-lg">
                <i class="fa-solid ${isSuccess ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
              </div>
              <div>
                <div class="flex items-center space-x-2">
                  <h3 class="text-base font-black uppercase tracking-wider ${isSuccess ? 'text-emerald-300' : 'text-red-400'}">
                    ${isSuccess ? 'CHECKSUM VERIFIED — FRAME ACCEPTED' : 'CHECKSUM MISMATCH — FRAME REJECTED'}
                  </h3>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded ${isSuccess ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-red-500/20 text-red-300 border border-red-500/40'}">
                    ${isSuccess ? 'PASS' : 'INTEGRITY FAIL'}
                  </span>
                </div>
                <p class="text-xs text-slate-300 mt-1">
                  ${isSuccess
                    ? "The 1's complement sum of all received words plus the checksum produced 11111111 (all 1s). The frame was successfully authenticated as intact."
                    : "The 1's complement sum did NOT equal 11111111. Transmission error was detected by the receiver, and the corrupted frame was discarded."
                  }
                </p>
              </div>
            </div>

            <!-- Score Award Pill -->
            <div class="text-right">
              <span class="text-[10px] text-slate-400 uppercase font-bold">Round Score</span>
              <div class="text-xl font-black font-mono ${isSuccess ? 'text-emerald-400' : 'text-amber-400'}">
                +${hadErrorInjected ? '150 PTS' : '100 PTS'}
              </div>
            </div>
          </div>

          <!-- TELEMETRY COMPARISON TABLE -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Frame Bit Comparison -->
            <div class="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 class="text-xs font-bold uppercase text-slate-300 flex items-center gap-1.5">
                <i class="fa-solid fa-code-compare text-sky-400"></i> Transmission Frame Telemetry
              </h4>
              <div class="space-y-2 text-xs font-mono">
                <div>
                  <div class="text-[11px] text-slate-400 font-sans">Sender Original Frame:</div>
                  <div class="text-sky-300 font-bold tracking-wider">${frame.originalFrameString}</div>
                </div>
                <div>
                  <div class="text-[11px] text-slate-400 font-sans">Receiver Ingested Frame:</div>
                  <div class="text-slate-200 tracking-wider">
                    ${frame.bits.map(b => b.isFlipped ? `<span class="text-red-400 font-extrabold bg-red-950 px-1 rounded underline">${b.transmittedValue}</span>` : b.transmittedValue).join('')}
                  </div>
                </div>
                <div class="pt-1 border-t border-slate-800 text-[11px] font-sans">
                  <span class="text-slate-400">Channel Noise Mode:</span>
                  <strong class="${hadErrorInjected ? 'text-red-400' : 'text-emerald-400'}">
                    ${hadErrorInjected ? `Single-Bit Inversion at Bit #${frame.flippedBitIndex}` : 'Clean Channel (0 Bit Errors)'}
                  </strong>
                </div>
              </div>
            </div>

            <!-- Verification Status -->
            <div class="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 class="text-xs font-bold uppercase text-slate-300 flex items-center gap-1.5">
                <i class="fa-solid fa-square-root-variable text-purple-400"></i> Receiver Arithmetic Result
              </h4>
              <div class="space-y-1.5 text-xs font-mono">
                <div class="flex justify-between">
                  <span class="text-slate-400 font-sans">1's Complement Sum:</span>
                  <span class="font-bold ${isSuccess ? 'text-emerald-400' : 'text-red-400'}">${verify.finalSum}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400 font-sans">Expected Verification Pattern:</span>
                  <span class="text-slate-300 font-bold">${verify.expectedAllOnes}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400 font-sans">Syndrome (~Sum):</span>
                  <span class="font-bold ${isSuccess ? 'text-emerald-400' : 'text-red-400'}">${verify.invertedSum}</span>
                </div>
                <div class="flex justify-between pt-1 border-t border-slate-800 font-sans">
                  <span class="text-slate-400">Data Link Decision:</span>
                  <strong class="${isSuccess ? 'text-emerald-400' : 'text-red-400'} uppercase">
                    ${isSuccess ? 'Frame Delivered to Layer 3' : 'Frame Dropped (Request Retransmit)'}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          <!-- Step-by-Step Receiver Math Display -->
          ${CalculationPanel.renderReceiverMath(verify)}

          <!-- Educational Insight Box -->
          <div class="bg-slate-900/90 p-4 rounded-xl border border-cyan-500/30 text-xs space-y-1.5">
            <div class="flex items-center space-x-2 text-cyan-300 font-bold uppercase">
              <i class="fa-solid fa-graduation-cap"></i>
              <span>Computer Networks Educational Insight</span>
            </div>
            <p class="text-slate-300 leading-relaxed font-sans">
              <strong>Key Principle:</strong> While this simulation highlights the corrupted bit in red for pedagogical demonstration, a real Data Link Layer receiver does <em>not</em> possess a copy of the original frame and <strong>cannot locate the exact corrupted bit index</strong> from the 1's complement checksum alone. It only detects that the cumulative sum is non-zero (contains zero bits) and consequently discards the entire frame.
            </p>
          </div>

          <!-- Navigation & Action Buttons -->
          <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
            <button onclick="App.loadView('minigames')" class="cg-btn cg-btn-secondary">
              <i class="fa-solid fa-gamepad"></i>
              <span>Return to Mini Games</span>
            </button>
            <div class="flex items-center space-x-2">
              <button onclick="ChecksumGuardGame.resetGame()" class="cg-btn cg-btn-cyan">
                <i class="fa-solid fa-rotate-right"></i>
                <span>Try Again (New Frame)</span>
              </button>
            </div>
          </div>
        </div>
      `;
    },

    // ==========================================
    // 9. EVENT HANDLERS & TRANSITIONS
    // ==========================================

    handleCalculateChecksum: function () {
      const inputW1 = document.getElementById('cg-input-word1');
      const inputW2 = document.getElementById('cg-input-word2');
      const errW1 = document.getElementById('cg-err-word1');
      const errW2 = document.getElementById('cg-err-word2');

      const val1 = inputW1 ? inputW1.value.trim() : '';
      const val2 = inputW2 ? inputW2.value.trim() : '';

      const valid1 = ChecksumSystem.isValidBinary(val1, 8);
      const valid2 = ChecksumSystem.isValidBinary(val2, 8);

      if (errW1) errW1.classList.toggle('hidden', valid1);
      if (errW2) errW2.classList.toggle('hidden', valid2);

      if (!valid1 || !valid2) return;

      GameState.dataWords = [val1, val2];
      try {
        GameState.checksumResult = ChecksumSystem.computeSenderChecksum(GameState.dataWords, 8);
        GameState.currentPhase = 'SENDER_CALC';
        SoundSystem.bitClick();
        this.renderActiveStage();
      } catch (err) {
        alert("Checksum calculation error: " + err.message);
      }
    },

    handlePrepareFrame: function () {
      if (!GameState.checksumResult) return;
      GameState.frame = FrameSystem.buildFrame(
        GameState.checksumResult.words,
        GameState.checksumResult.checksum,
        8
      );
      GameState.currentPhase = 'FRAME_PREPARED';
      SoundSystem.bitClick();
      this.renderActiveStage();
    },

    handleTransmitToRouter: function () {
      const btn = document.getElementById('cg-btn-transmit-router');
      if (btn) btn.disabled = true;

      TransmissionSystem.startSenderToRouter(() => {
        GameState.currentPhase = 'ROUTER_CHOICE';
        this.renderActiveStage();
      });
    },

    handleForwardNoError: function () {
      if (!GameState.frame) return;
      FrameSystem.setFlippedBit(GameState.frame, null);

      TransmissionSystem.startRouterToReceiver(false, () => {
        this.executeReceiverVerification();
      });
    },

    handleOpenBitFlipper: function () {
      GameState.currentPhase = 'ROUTER_ERROR_SELECTION';
      SoundSystem.bitClick();
      this.renderActiveStage();
    },

    cancelErrorInjection: function () {
      if (!GameState.frame) return;
      FrameSystem.setFlippedBit(GameState.frame, null);
      GameState.currentPhase = 'ROUTER_CHOICE';
      SoundSystem.bitClick();
      this.renderActiveStage();
    },

    handleBitClick: function (bitIndex) {
      if (!GameState.frame || GameState.currentPhase !== 'ROUTER_ERROR_SELECTION') return;

      SoundSystem.bitClick();
      // If clicked the currently flipped bit, toggle back off
      if (GameState.frame.flippedBitIndex === bitIndex) {
        FrameSystem.setFlippedBit(GameState.frame, null);
      } else {
        // Enforce strictly 1 flipped bit rule
        FrameSystem.setFlippedBit(GameState.frame, bitIndex);
      }
      this.renderActiveStage();
    },

    handleClearFlip: function () {
      if (!GameState.frame) return;
      FrameSystem.setFlippedBit(GameState.frame, null);
      SoundSystem.bitClick();
      this.renderActiveStage();
    },

    handleConfirmCorruptedForward: function () {
      if (!GameState.frame || GameState.frame.flippedBitIndex === null) return;

      TransmissionSystem.startRouterToReceiver(true, () => {
        this.executeReceiverVerification();
      });
    },

    executeReceiverVerification: function () {
      if (!GameState.frame) return;

      const components = FrameSystem.getTransmittedComponents(GameState.frame);
      const verify = ChecksumSystem.verifyReceiverChecksum(
        components.transmittedDataWords,
        components.transmittedChecksum,
        GameState.frame.wordSize
      );

      GameState.receiverResult = verify;
      GameState.currentPhase = 'RESULTS';

      // Update statistics
      GameState.stats.transmissionsCount++;
      if (verify.isValid) {
        GameState.stats.cleanSuccessCount++;
        GameState.stats.score += 100;
        GameState.stats.streak++;
        SoundSystem.successChime();
      } else {
        GameState.stats.errorsDetectedCount++;
        GameState.stats.score += 150;
        GameState.stats.streak++;
        SoundSystem.rejectAlarm();
      }

      this.updateHUDStats();
      this.renderActiveStage();
    },

    updateHUDStats: function () {
      const scoreEl = document.getElementById('cg-stat-score');
      const streakEl = document.getElementById('cg-stat-streak');
      if (scoreEl) scoreEl.textContent = GameState.stats.score;
      if (streakEl) streakEl.textContent = `${GameState.stats.streak}x`;
    },

    loadPreset: function (words) {
      GameState.dataWords = words;
      const in1 = document.getElementById('cg-input-word1');
      const in2 = document.getElementById('cg-input-word2');
      if (in1) in1.value = words[0];
      if (in2) in2.value = words[1];
      SoundSystem.bitClick();
    },

    randomizeWords: function () {
      const randomByte = () => Math.floor(Math.random() * 256).toString(2).padStart(8, '0');
      this.loadPreset([randomByte(), randomByte()]);
    },

    editInputs: function () {
      GameState.currentPhase = 'SETUP';
      TransmissionSystem.state = 'IDLE';
      this.renderActiveStage();
    },

    resetGame: function () {
      GameState.resetToSetup();
      this.renderActiveStage();
    },

    toggleMute: function () {
      SoundSystem.muted = !SoundSystem.muted;
      const icon = document.getElementById('cg-sound-icon');
      if (icon) {
        icon.className = `fa-solid ${SoundSystem.muted ? 'fa-volume-xmark text-red-400' : 'fa-volume-high text-cyan-400'}`;
      }
    }
  };

  // Expose to window for global invocation and routing
  window.ChecksumSystem = ChecksumSystem;
  window.FrameSystem = FrameSystem;
  window.TransmissionSystem = TransmissionSystem;
  window.GameState = GameState;
  window.BitDisplay = BitDisplay;
  window.CalculationPanel = CalculationPanel;
  window.ChecksumGuardGame = ChecksumGuardGame;

})(window);

