/**
 * CRC CHALLENGE — Interactive Educational 2D Simulation
 * Cyclic Redundancy Check (CRC) Polynomial Division, Network Transmission & Error Detection
 * 
 * Modular Architecture:
 * - CRCMathEngine: Pure modulo-2 binary arithmetic and long division engine
 * - CRCSoundSystem: Synthesized Web Audio API retro arcade sound effects
 * - CRCTransmissionSystem: 60 FPS HTML5 Canvas 2D network transmission arena
 * - CRCGameState: State machine, level progression (Levels 1-5), modes (Learning/Challenge), scoring
 * - CRCDivisionVisualizer: Aligned ASCII/HTML long division step visualizer
 * - CRCBitDisplay: Interactive bit grid for frame inspection and error injection
 * - CRCEducationalPanel: Comprehensive 9-topic educational reference
 * - CRCChallengeGame: Main game controller, HUD, stage renderers, event handlers
 */

(function (window) {
  'use strict';

  // ==========================================
  // 1. CRC MATH ENGINE (Pure Modulo-2 Arithmetic)
  // ==========================================
  const CRCMathEngine = {
    // Validates binary string
    isValidBinary: function (str, minLength = 1) {
      if (!str || typeof str !== 'string') return false;
      const clean = str.trim();
      if (clean.length < minLength) return false;
      return /^[01]+$/.test(clean);
    },

    // Validates generator polynomial: binary, >= 2 bits, begins with 1, ends with 1
    validateGenerator: function (genStr) {
      if (!this.isValidBinary(genStr, 2)) {
        return { isValid: false, error: "Generator must be a binary string with at least 2 bits." };
      }
      const clean = genStr.trim();
      if (clean[0] !== '1') {
        return { isValid: false, error: "Generator must begin with '1' (highest-degree term)." };
      }
      if (clean[clean.length - 1] !== '1') {
        return { isValid: false, error: "Generator must end with '1' (non-zero constant term)." };
      }
      return { isValid: true, generator: clean, degree: clean.length - 1 };
    },

    // Converts binary generator to algebraic polynomial string (e.g. 1011 -> x³ + x + 1)
    getPolynomialString: function (binStr) {
      if (!this.isValidBinary(binStr)) return binStr;
      const clean = binStr.trim();
      const degree = clean.length - 1;
      const terms = [];

      for (let i = 0; i < clean.length; i++) {
        if (clean[i] === '1') {
          const power = degree - i;
          if (power === 0) {
            terms.push('1');
          } else if (power === 1) {
            terms.push('x');
          } else {
            terms.push(`x${this.toSuperscript(power)}`);
          }
        }
      }
      return terms.length > 0 ? terms.join(' + ') : '0';
    },

    toSuperscript: function (num) {
      const map = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
      return num.toString().split('').map(d => map[d] || d).join('');
    },

    // Bitwise XOR of two equal-length binary strings
    xorStrings: function (strA, strB) {
      const len = Math.min(strA.length, strB.length);
      let res = '';
      for (let i = 0; i < len; i++) {
        res += (strA[i] === strB[i]) ? '0' : '1';
      }
      return res;
    },

    // Step-by-step Modulo-2 binary long division algorithm
    performModulo2Division: function (dividendStr, generatorStr) {
      const cleanDiv = dividendStr.trim();
      const cleanGen = generatorStr.trim();
      const genLen = cleanGen.length;
      const divLen = cleanDiv.length;
      const degree = genLen - 1;

      if (divLen < genLen) {
        throw new Error("Dividend length must be at least as long as generator polynomial.");
      }

      const steps = [];
      const current = cleanDiv.split('');
      const quotientBits = [];

      // Modulo-2 long division iteration
      for (let i = 0; i <= divLen - genLen; i++) {
        const leadBit = current[i];
        quotientBits.push(leadBit);

        if (leadBit === '1') {
          const sliceBefore = current.slice(i, i + genLen).join('');
          const xorResult = this.xorStrings(sliceBefore, cleanGen);

          // Apply XOR to current array
          for (let j = 0; j < genLen; j++) {
            current[i + j] = xorResult[j];
          }

          const partialDividend = current.join('');
          const nextBitPulled = (i + genLen < divLen) ? cleanDiv[i + genLen] : null;

          steps.push({
            stepIndex: steps.length + 1,
            shiftIndex: i,
            workingDividend: current.join(''),
            activeSlice: sliceBefore,
            generator: cleanGen,
            xorResult: xorResult,
            leadBit: '1',
            nextBitPulled: nextBitPulled,
            fullDividendSnapshot: current.join('')
          });
        } else {
          // Leading bit is 0: quotient bit is 0, no XOR reduction performed
          steps.push({
            stepIndex: steps.length + 1,
            shiftIndex: i,
            workingDividend: current.join(''),
            activeSlice: current.slice(i, i + genLen).join(''),
            generator: "0".repeat(genLen),
            xorResult: current.slice(i, i + genLen).join(''),
            leadBit: '0',
            nextBitPulled: (i + genLen < divLen) ? cleanDiv[i + genLen] : null,
            fullDividendSnapshot: current.join('')
          });
        }
      }

      // Remainder is strictly the last degree bits
      const remainder = current.slice(divLen - degree).join('');
      const quotient = quotientBits.join('');

      return {
        dividend: cleanDiv,
        generator: cleanGen,
        degree,
        steps,
        quotient,
        remainder,
        isZeroRemainder: remainder === "0".repeat(degree)
      };
    },

    // Sender CRC calculation: Appends degree zeros, divides, extracts remainder & frame
    calculateCRC: function (dataStr, generatorStr) {
      const cleanData = dataStr.trim();
      const val = this.validateGenerator(generatorStr);
      if (!val.isValid) throw new Error(val.error);

      const r = val.degree;
      const appendedZeros = "0".repeat(r);
      const augmentedData = cleanData + appendedZeros;
      const division = this.performModulo2Division(augmentedData, val.generator);
      const remainder = division.remainder;
      const transmittedFrame = cleanData + remainder;

      return {
        originalData: cleanData,
        generator: val.generator,
        generatorDegree: r,
        polynomialStr: this.getPolynomialString(val.generator),
        appendedZeros,
        augmentedData,
        division,
        remainder,
        transmittedFrame,
        totalFrameBits: transmittedFrame.length
      };
    },

    // Receiver CRC verification: Divides received frame by generator
    verifyReceivedFrame: function (receivedFrameStr, generatorStr) {
      const cleanFrame = receivedFrameStr.trim();
      const val = this.validateGenerator(generatorStr);
      if (!val.isValid) throw new Error(val.error);

      const division = this.performModulo2Division(cleanFrame, val.generator);
      const remainder = division.remainder;
      const expectedZeros = "0".repeat(val.degree);
      const isValid = (remainder === expectedZeros);

      return {
        receivedFrame: cleanFrame,
        generator: val.generator,
        generatorDegree: val.degree,
        polynomialStr: this.getPolynomialString(val.generator),
        division,
        remainder,
        expectedZeros,
        isValid
      };
    },

    // Flips a single bit at the given index
    flipSelectedBit: function (frameStr, index) {
      if (index < 0 || index >= frameStr.length) return frameStr;
      const arr = frameStr.split('');
      arr[index] = (arr[index] === '1') ? '0' : '1';
      return arr.join('');
    }
  };

  // ==========================================
  // 2. RETRO ARCADE AUDIO SYNTHESIZER
  // ==========================================
  const CRCSoundSystem = {
    audioCtx: null,
    muted: false,

    init: function () {
      if (!this.audioCtx && (window.AudioContext || window.webkitAudioContext)) {
        try {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          this.audioCtx = new AudioContextClass();
        } catch (e) {
          // Audio disabled or blocked
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

    click: function () {
      this.playTone(840, 'triangle', 0.04, 0.05);
    },

    xorChime: function () {
      this.playTone(600, 'sine', 0.1, 0.06);
      setTimeout(() => this.playTone(900, 'sine', 0.15, 0.06), 70);
    },

    transmitStart: function () {
      this.playTone(480, 'sine', 0.2, 0.07);
      setTimeout(() => this.playTone(720, 'sine', 0.22, 0.07), 110);
    },

    dockRouter: function () {
      this.playTone(550, 'square', 0.12, 0.05);
    },

    glitchAlert: function () {
      this.playTone(170, 'sawtooth', 0.2, 0.1);
      setTimeout(() => this.playTone(110, 'sawtooth', 0.25, 0.12), 80);
    },

    correctAnswer: function () {
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 'sine', 0.18, 0.07), idx * 80);
      });
    },

    wrongAnswer: function () {
      this.playTone(200, 'sawtooth', 0.2, 0.1);
      setTimeout(() => this.playTone(150, 'sawtooth', 0.25, 0.1), 100);
    },

    successFanfare: function () {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 'sine', 0.28, 0.08), idx * 90);
      });
    },

    errorAlarm: function () {
      [320, 240, 180].forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 'sawtooth', 0.22, 0.09), idx * 110);
      });
    }
  };

  // ==========================================
  // 3. TRANSMISSION SYSTEM (Canvas 2D Arena)
  // ==========================================
  const CRCTransmissionSystem = {
    canvas: null,
    ctx: null,
    animFrameId: null,
    width: 800,
    height: 230,

    state: 'IDLE', // IDLE, SENDER_TO_ROUTER, AT_ROUTER, ROUTER_TO_RECEIVER, AT_RECEIVER
    progress: 0,
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
      this.height = Math.floor(rect.height) || 230;
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
      CRCSoundSystem.transmitStart();

      const startTime = performance.now();
      const duration = 1900;

      const step = (now) => {
        if (this.state !== 'SENDER_TO_ROUTER') return;
        const elapsed = now - startTime;
        this.progress = Math.min(1.0, elapsed / duration);

        if (this.progress < 1.0) {
          requestAnimationFrame(step);
        } else {
          this.state = 'AT_ROUTER';
          CRCSoundSystem.dockRouter();
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
        CRCSoundSystem.glitchAlert();
      } else {
        CRCSoundSystem.transmitStart();
      }

      const startTime = performance.now();
      const duration = 1900;

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
      if (this.state === 'SENDER_TO_ROUTER' || this.state === 'ROUTER_TO_RECEIVER') {
        const coords = this.getPacketPosition();
        if (coords) {
          const count = this.hasError ? 4 : 2;
          for (let p = 0; p < count; p++) {
            this.particles.push({
              x: coords.x + (Math.random() - 0.5) * 12,
              y: coords.y + (Math.random() - 0.5) * 12,
              vx: (Math.random() - 0.5) * 1.5 - 1.5,
              vy: (Math.random() - 0.5) * 1.5,
              life: 1.0,
              decay: 0.035 + Math.random() * 0.03,
              size: 2 + Math.random() * 3,
              color: this.hasError ? (Math.random() > 0.4 ? '#ef4444' : '#f97316') : '#38bdf8'
            });
          }
        }
      }

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
        sender: { x: senderX, y: centerY, label: 'SENDER', color: '#0ea5e9', role: 'CRC Tx' },
        router: { x: routerX, y: centerY, label: 'ROUTER', color: '#a855f7', role: 'Channel Transit' },
        receiver: { x: receiverX, y: centerY, label: 'RECEIVER', color: '#10b981', role: 'CRC Rx' }
      };
    },

    getPacketPosition: function () {
      const nodes = this.getNodePositions();
      if (this.state === 'SENDER_TO_ROUTER') {
        const start = nodes.sender.x;
        const end = nodes.router.x;
        return { x: start + (end - start) * this.progress, y: nodes.sender.y };
      } else if (this.state === 'ROUTER_TO_RECEIVER') {
        const start = nodes.router.x;
        const end = nodes.receiver.x;
        return { x: start + (end - start) * this.progress, y: nodes.router.y };
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

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#060a14';
      ctx.fillRect(0, 0, w, h);

      // Cyber Grid
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.05)';
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

      // Optical links
      this.drawConduit(ctx, nodes.sender.x, nodes.sender.y, nodes.router.x, nodes.router.y, '#0284c7', this.state === 'SENDER_TO_ROUTER');
      const leg2Color = this.hasError ? '#dc2626' : '#059669';
      this.drawConduit(ctx, nodes.router.x, nodes.router.y, nodes.receiver.x, nodes.receiver.y, leg2Color, this.state === 'ROUTER_TO_RECEIVER');

      // Particles
      this.particles.forEach(pt => {
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = Math.max(0, pt.life);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      // Nodes
      this.drawNode(ctx, nodes.sender, this.state === 'IDLE' || this.state === 'SENDER_TO_ROUTER');
      this.drawNode(ctx, nodes.router, this.state === 'AT_ROUTER' || this.state === 'ROUTER_TO_RECEIVER');
      this.drawNode(ctx, nodes.receiver, this.state === 'AT_RECEIVER');

      // Packet
      const packetPos = this.getPacketPosition();
      if (packetPos) {
        this.drawPacket(ctx, packetPos.x, packetPos.y, this.hasError);
      }
    },

    drawConduit: function (ctx, x1, y1, x2, y2, baseColor, isActive) {
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.7)';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      ctx.strokeStyle = baseColor;
      ctx.lineWidth = isActive ? 3 : 1.5;
      ctx.shadowColor = baseColor;
      ctx.shadowBlur = isActive ? 12 : 4;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.shadowBlur = 0;
    },

    drawNode: function (ctx, node, isHighlighted) {
      const radius = 32;
      if (isHighlighted) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 8, 0, Math.PI * 2);
        ctx.strokeStyle = node.color;
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }

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

      ctx.fillStyle = node.color;
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label[0], node.x, node.y - 2);

      ctx.fillStyle = '#f1f5f9';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText(node.label, node.x, node.y + radius + 16);

      ctx.fillStyle = '#64748b';
      ctx.font = '9px Inter, sans-serif';
      ctx.fillText(node.role, node.x, node.y + radius + 28);
    },

    drawPacket: function (ctx, x, y, isCorrupted) {
      const pW = 60;
      const pH = 26;
      const rx = x - pW / 2;
      const ry = y - pH / 2;

      ctx.save();
      ctx.shadowColor = isCorrupted ? '#ef4444' : '#38bdf8';
      ctx.shadowBlur = 18;
      ctx.fillStyle = isCorrupted ? '#7f1d1d' : '#0369a1';
      ctx.strokeStyle = isCorrupted ? '#f87171' : '#38bdf8';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.roundRect(rx, ry, pW, pH, 6);
      ctx.fill();
      ctx.stroke();

      if (isCorrupted && Math.random() > 0.4) {
        ctx.fillStyle = '#fee2e2';
        ctx.fillRect(rx + (Math.random() - 0.5) * 6, ry - 3, pW * 0.4, 3);
      }

      ctx.shadowBlur = 0;
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(isCorrupted ? 'CRC:ERR' : 'CRC:DATA', x, y);
      ctx.restore();
    }
  };

  // ==========================================
  // 4. GAME STATE CONTROLLER
  // ==========================================
  const CRCGameState = {
    currentPhase: 'MAIN_MENU', // MAIN_MENU, INSTRUCTIONS, SENDER_INPUT, DIVISION_STEPPER, FRAME_GENERATION, ROUTER_DECISION, ERROR_INJECTION, RECEIVER_VERIFICATION, RESULTS
    gameMode: 'LEARNING',      // LEARNING (Guided) or CHALLENGE (Interactive XOR)
    currentLevel: 1,           // 1 to 5

    // Level Definitions
    levels: [
      { level: 1, title: 'CRC Beginner', desc: 'Modulo-2 & XOR fundamentals. Guided division with default 4-bit data & generator 1011.', defaultData: '1101', defaultGen: '1011' },
      { level: 2, title: 'Frame Builder', desc: 'Custom data entry, generator selection, remainder calculation & frame packing.', defaultData: '110010', defaultGen: '1101' },
      { level: 3, title: 'Transmission Trouble', desc: 'Simulate physical channel transit. Router error injection & receiver verification.', defaultData: '110101', defaultGen: '1011' },
      { level: 4, title: 'Network Defender', desc: 'Byte-length data payloads & higher-degree polynomials (x⁴ + x + 1). Interactive XOR Challenge.', defaultData: '11010110', defaultGen: '10011' },
      { level: 5, title: 'Final Challenge', desc: 'Master challenge mission with timed security verification & maximum score multiplier.', defaultData: '101011011', defaultGen: '11001' }
    ],

    // Active Data Payloads
    dataInput: '1101',
    generatorInput: '1011',
    crcResult: null,
    transmittedFrame: '',
    originalFrame: '',
    flippedBitIndex: null,
    receiverResult: null,

    // Step-by-Step Stepper State
    currentDivisionStep: 0,
    interactiveXorAttempt: '',
    xorFeedbackMessage: '',

    // Stats & Telemetry
    stats: {
      score: 0,
      streak: 0,
      correctXorCount: 0,
      incorrectXorCount: 0,
      transmissionsCount: 0,
      levelsCompleted: [false, false, false, false, false],
      sessionStartTime: Date.now()
    },

    resetSession: function () {
      this.currentPhase = 'SENDER_INPUT';
      this.crcResult = null;
      this.transmittedFrame = '';
      this.originalFrame = '';
      this.flippedBitIndex = null;
      this.receiverResult = null;
      this.currentDivisionStep = 0;
      this.interactiveXorAttempt = '';
      this.xorFeedbackMessage = '';
      CRCTransmissionSystem.state = 'IDLE';
      CRCTransmissionSystem.hasError = false;
    },

    setLevel: function (lvlNum) {
      if (lvlNum < 1 || lvlNum > 5) return;
      this.currentLevel = lvlNum;
      const lvlDef = this.levels[lvlNum - 1];
      this.dataInput = lvlDef.defaultData;
      this.generatorInput = lvlDef.defaultGen;
      this.resetSession();
    }
  };

  // ==========================================
  // 5. DIVISION VISUALIZER & FORMATTER
  // ==========================================
  const CRCDivisionVisualizer = {
    // Generates cleanly aligned ASCII/HTML modulo-2 long division table
    renderDivisionTable: function (divisionObj, options = {}) {
      const { highlightStep = null, showAll = true } = options;
      if (!divisionObj) return '';

      const { dividend, generator, steps, remainder, quotient } = divisionObj;
      const genLen = generator.length;
      const divLen = dividend.length;

      let html = `<div class="crc-division-box space-y-1 font-mono text-xs">`;

      // Header row: Generator | Dividend
      html += `
        <div class="crc-div-row text-slate-400 pb-1 border-b border-slate-700">
          <span class="text-purple-400 font-bold">${generator}</span> ) <span class="text-sky-300 font-bold">${dividend}</span> ( Quotient: <span class="text-emerald-400 font-bold">${quotient}</span>
        </div>
      `;

      // Render each division step
      const maxSteps = showAll ? steps.length : (highlightStep || steps.length);

      steps.slice(0, maxSteps).forEach((st, idx) => {
        const isCurrent = (highlightStep === idx + 1);
        const shift = st.shiftIndex;

        // Dividend / Working Slice row
        const workingStr = st.workingDividend;
        const indentSpaces = "&nbsp;".repeat(shift * 2);

        if (st.leadBit === '1') {
          html += `
            <div class="mt-2 ${isCurrent ? 'bg-sky-950/40 p-1 rounded border border-sky-500/30' : ''}">
              <div class="crc-div-row text-slate-300">
                <span class="w-12 text-slate-500 text-[10px]">Step ${st.stepIndex}:</span>
                <span>${"&nbsp;".repeat(shift * 2)}<strong class="text-sky-300">${st.activeSlice}</strong></span>
              </div>
              <div class="crc-div-row text-purple-400">
                <span class="w-12 text-slate-500 text-[10px]">XOR:</span>
                <span>${"&nbsp;".repeat(shift * 2)}<span class="font-bold">${st.generator}</span></span>
              </div>
              <div class="crc-div-divider ml-12"></div>
              <div class="crc-div-row text-emerald-400 font-bold">
                <span class="w-12 text-slate-500 text-[10px]">Result:</span>
                <span>${"&nbsp;".repeat(shift * 2)}${st.xorResult}</span>
                ${st.nextBitPulled !== null ? `<span class="text-amber-400 font-bold"> ← pull ${st.nextBitPulled}</span>` : ''}
              </div>
            </div>
          `;
        } else {
          // Lead bit 0
          html += `
            <div class="mt-1 opacity-70">
              <div class="crc-div-row text-slate-400">
                <span class="w-12 text-slate-500 text-[10px]">Step ${st.stepIndex}:</span>
                <span>${"&nbsp;".repeat(shift * 2)}<span>${st.activeSlice}</span> (Leading 0, shift to next bit)</span>
              </div>
            </div>
          `;
        }
      });

      // Final Remainder Row
      if (showAll || highlightStep === steps.length) {
        const rSpaces = "&nbsp;".repeat((divLen - generator.length + 1) * 2);
        html += `
          <div class="pt-3 border-t border-slate-700 mt-2 flex items-center justify-between">
            <span class="text-slate-400">Final CRC Remainder:</span>
            <strong class="text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40 text-sm font-bold">${remainder}</strong>
          </div>
        `;
      }

      html += `</div>`;
      return html;
    }
  };

  // ==========================================
  // 6. BIT DISPLAY UTILITIES
  // ==========================================
  const CRCBitDisplay = {
    renderFrameBits: function (frameStr, dataLen, options = {}) {
      const { interactive = false, flippedIndex = null } = options;
      const bits = frameStr.split('');
      const dataBits = bits.slice(0, dataLen);
      const crcBits = bits.slice(dataLen);

      let html = `<div class="crc-bit-row">`;

      // Data bits group
      html += `
        <div class="crc-word-group">
          <span class="absolute -top-3 left-2 px-1 text-[9px] font-bold text-sky-400 bg-slate-900 border border-sky-900 rounded">
            Data Bits (${dataLen}b)
          </span>
          ${dataBits.map((b, i) => this.renderSingleBit(b, i, interactive, i === flippedIndex)).join('')}
        </div>
      `;

      // CRC Remainder bits group
      html += `
        <div class="crc-word-group crc-group">
          <span class="absolute -top-3 left-2 px-1 text-[9px] font-bold text-purple-400 bg-slate-900 border border-purple-900 rounded">
            CRC Remainder (${crcBits.length}b)
          </span>
          ${crcBits.map((b, i) => {
            const globalIdx = dataLen + i;
            return this.renderSingleBit(b, globalIdx, interactive, globalIdx === flippedIndex);
          }).join('')}
        </div>
      `;

      html += `</div>`;
      return html;
    },

    renderSingleBit: function (val, globalIdx, interactive, isFlipped) {
      const classes = [
        'crc-bit-box',
        interactive ? 'interactive' : '',
        isFlipped ? 'bit-flipped' : ''
      ].filter(Boolean).join(' ');

      const clickAttr = interactive
        ? `onclick="CRCChallengeGame.handleBitClick(${globalIdx})"`
        : '';

      return `
        <div class="${classes}" ${clickAttr} title="Bit index ${globalIdx} (${isFlipped ? 'Corrupted' : 'Intact'})">
          <span>${val}</span>
          <span class="crc-bit-index">${globalIdx}</span>
        </div>
      `;
    }
  };

  // ==========================================
  // 7. EDUCATIONAL CONTENT REFERENCE
  // ==========================================
  const CRCEducationalPanel = {
    render: function () {
      const topics = [
        {
          title: "1. What is Cyclic Redundancy Check (CRC)?",
          content: "Cyclic Redundancy Check (CRC) is an authoritative, hardware-efficient error-detection code used extensively in the Data Link Layer (Ethernet IEEE 802.3, Wi-Fi 802.11, HDLC) and storage protocols. It treats binary data as polynomial coefficients and computes a remainder through modulo-2 binary division."
        },
        {
          title: "2. Why is CRC preferred over simple Checksums?",
          content: "Simple 1's complement checksums detect single-bit errors and word rearrangements, but can fail to catch burst errors or transposed bits. CRC provides mathematical guarantees against all single-bit errors, all double-bit errors, all odd-numbered errors (when G(x) has a factor of x+1), and burst errors up to the generator polynomial degree."
        },
        {
          title: "3. What is a Generator Polynomial G(x)?",
          content: "A generator polynomial G(x) is an agreed-upon divisor pattern known to both sender and receiver. For example, G = 1011 represents x³ + x + 1. The degree 'r' equals the length of G minus 1 (e.g., 4 bits - 1 = degree 3). The remainder will always be exactly 'r' bits long."
        },
        {
          title: "4. What is Modulo-2 Arithmetic?",
          content: "Modulo-2 arithmetic is binary arithmetic performed without borrows or carries. In this algebra, both binary addition and binary subtraction are completely identical to the bitwise exclusive-OR (XOR) operation: 0 ⊕ 0 = 0, 1 ⊕ 1 = 0, 1 ⊕ 0 = 1, 0 ⊕ 1 = 1."
        },
        {
          title: "5. Why does CRC use XOR?",
          content: "Because addition and subtraction in GF(2) (Galois Field of 2 elements) are equivalent to XOR. Eliminating the ripple carry propagation allows high-speed shift registers and linear-feedback shift registers (LFSR) in Ethernet hardware to calculate CRC at 100 Gbps speeds in silicon."
        },
        {
          title: "6. How is the CRC Remainder calculated?",
          content: "The sender appends 'r' zeros (where r is generator degree) to the original data payload D. It then performs modulo-2 binary long division dividing (D · 2ʳ) by G. The remainder R of exactly 'r' bits is the Frame Check Sequence (FCS)."
        },
        {
          title: "7. How is the Transmitted Frame generated?",
          content: "The sender concatenates the original data payload with the calculated CRC remainder: Transmitted Frame T = Data + Remainder. The original data bits remain entirely uncorrupted and intact in the front of the frame."
        },
        {
          title: "8. How does the Receiver detect errors?",
          content: "The receiver receives the complete frame and divides the entire received frame by the exact same generator G using modulo-2 long division. If the remainder is all zeros ('0'.repeat(r)), no errors were detected and the frame is accepted. If the remainder is non-zero (non-zero syndrome), an error occurred and the frame is discarded."
        },
        {
          title: "9. What are CRC's Limitations?",
          content: "CRC is strictly an error-detection code, not an error-correction code (unlike Hamming codes, it cannot locate which bit was corrupted). Furthermore, while CRC detects almost all real-world channel noise, if an error pattern E(x) is an exact polynomial multiple of G(x), the error will produce a zero remainder and go undetected."
        }
      ];

      return `
        <div class="space-y-3">
          <div class="flex items-center space-x-2 text-cyan-300 font-bold uppercase text-xs">
            <i class="fa-solid fa-graduation-cap"></i>
            <span>CRC Theory & Computer Networks Architecture Reference</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${topics.map((t, idx) => `
              <div class="crc-edu-card">
                <div class="crc-edu-header" onclick="this.nextElementSibling.classList.toggle('hidden')">
                  <span>${t.title}</span>
                  <i class="fa-solid fa-chevron-down text-xs text-slate-400"></i>
                </div>
                <div class="crc-edu-body ${idx > 1 ? 'hidden' : ''}">
                  ${t.content}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  };

  // ==========================================
  // 8. CRC CHALLENGE GAME ENGINE CONTROLLER
  // ==========================================
  const CRCChallengeGame = {
    container: null,

    // Primary entry point called by App.loadView('crc-challenge')
    render: function (targetContainer) {
      this.container = targetContainer;
      this.renderGameShell();
      CRCTransmissionSystem.init(document.getElementById('crc-canvas'));
      this.renderActiveStage();
    },

    renderGameShell: function () {
      if (!this.container) return;

      const lvl = CRCGameState.levels[CRCGameState.currentLevel - 1];

      this.container.innerHTML = `
        <div class="max-w-5xl mx-auto space-y-4">
          <!-- Breadcrumb navigation -->
          <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <div class="flex items-center space-x-2">
              <button onclick="App.loadView('minigames')" class="hover:text-cyan-500 transition-colors flex items-center gap-1 font-semibold">
                <i class="fa-solid fa-arrow-left"></i> Mini Games Hub
              </button>
              <span>/</span>
              <span class="text-slate-800 dark:text-slate-200 font-bold">CRC Challenge</span>
            </div>
            <div class="flex items-center space-x-3">
              <span class="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded text-[11px] font-bold">
                Data Link Layer
              </span>
              <span class="text-slate-400 text-[11px]">Modulo-2 Binary Division</span>
            </div>
          </div>

          <!-- ARCADE CONTAINER -->
          <div class="crc-wrapper">
            <!-- HUD TOP BAR -->
            <div class="crc-hud-header flex flex-wrap items-center justify-between gap-3">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 border border-cyan-400/40">
                  <i class="fa-solid fa-calculator text-lg"></i>
                </div>
                <div>
                  <div class="flex items-center space-x-2">
                    <h1 class="text-lg font-black tracking-tight text-white leading-none">CRC CHALLENGE</h1>
                    <span class="crc-level-badge">
                      LVL ${CRCGameState.currentLevel}: ${lvl.title}
                    </span>
                  </div>
                  <p class="text-[11px] text-cyan-300 font-medium">Detect the Error • Protect the Data • Modulo-2 Polynomial Division</p>
                </div>
              </div>

              <!-- HUD STATS, MODE SWITCH & AUDIO -->
              <div class="flex items-center space-x-2 sm:space-x-3 text-xs">
                <!-- Mode Switcher -->
                <div class="flex items-center bg-slate-900/80 p-0.5 rounded-lg border border-slate-700">
                  <button onclick="CRCChallengeGame.setMode('LEARNING')" class="crc-mode-tab ${CRCGameState.gameMode === 'LEARNING' ? 'active' : ''}">
                    Learning
                  </button>
                  <button onclick="CRCChallengeGame.setMode('CHALLENGE')" class="crc-mode-tab ${CRCGameState.gameMode === 'CHALLENGE' ? 'active' : ''}">
                    Challenge
                  </button>
                </div>

                <div class="px-2.5 py-1 rounded-full bg-slate-800 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                  <i class="fa-solid fa-trophy text-amber-400 mr-1"></i>
                  <span id="crc-hud-score">${CRCGameState.stats.score}</span>
                </div>

                <div class="px-2.5 py-1 rounded-full bg-slate-800 border border-purple-500/30 text-purple-300 text-xs font-bold hidden sm:inline-block">
                  <i class="fa-solid fa-bolt text-yellow-400 mr-1"></i>
                  <span id="crc-hud-streak">${CRCGameState.stats.streak}x</span>
                </div>

                <button onclick="CRCChallengeGame.toggleMute()" id="crc-sound-btn" class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 transition-colors" title="Toggle Sound FX">
                  <i id="crc-sound-icon" class="fa-solid ${CRCSoundSystem.muted ? 'fa-volume-xmark text-red-400' : 'fa-volume-high text-cyan-400'}"></i>
                </button>

                <button onclick="CRCChallengeGame.resetGame()" class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 transition-colors" title="Reset Session">
                  <i class="fa-solid fa-rotate text-xs"></i>
                </button>
              </div>
            </div>

            <!-- LEVEL PROGRESSION SELECTOR BAR -->
            <div class="bg-slate-950/90 border-b border-slate-800 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span class="text-slate-400 font-bold uppercase text-[10px]">Select Mission Level:</span>
              <div class="flex items-center space-x-1 sm:space-x-2">
                ${CRCGameState.levels.map(l => `
                  <button onclick="CRCChallengeGame.selectLevel(${l.level})" class="px-2.5 py-1 rounded text-xs font-bold transition-all ${CRCGameState.currentLevel === l.level ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-500/50' : 'bg-slate-800 hover:bg-slate-700 text-slate-400'}">
                    L${l.level}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- 2D TRANSMISSION ARENA CANVAS -->
            <div class="crc-arena-container">
              <canvas id="crc-canvas" class="crc-arena-canvas"></canvas>
            </div>

            <!-- STATUS PHASE BANNER -->
            <div class="crc-status-banner">
              <span id="crc-status-phase" class="flex items-center gap-2 text-cyan-400">
                <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>STEP 1: SENDER CONFIGURATION</span>
              </span>
              <span id="crc-status-hint" class="text-slate-400 text-xs hidden md:inline">
                Enter binary data and select a valid generator polynomial.
              </span>
            </div>

            <!-- DYNAMIC STAGE CONTAINER -->
            <div id="crc-stage-container" class="crc-stage-panel">
              <!-- Dynamically populated based on CRCGameState.currentPhase -->
            </div>
          </div>

          <!-- COMPACT EDUCATIONAL ACCORDION AT BOTTOM -->
          <div class="pt-2">
            ${CRCEducationalPanel.render()}
          </div>
        </div>
      `;
    },

    renderActiveStage: function () {
      const stageEl = document.getElementById('crc-stage-container');
      const phaseEl = document.getElementById('crc-status-phase');
      const hintEl = document.getElementById('crc-status-hint');
      if (!stageEl) return;

      switch (CRCGameState.currentPhase) {
        case 'MAIN_MENU':
        case 'SENDER_INPUT':
          phaseEl.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span><span>STAGE 1: SENDER DATA & GENERATOR SETUP</span>`;
          hintEl.textContent = "Specify the binary data word and generator divisor G(x).";
          stageEl.innerHTML = this.renderSenderInputStage();
          break;

        case 'DIVISION_STEPPER':
          phaseEl.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse"></span><span>STAGE 2: MODULO-2 BINARY LONG DIVISION</span>`;
          hintEl.textContent = CRCGameState.gameMode === 'CHALLENGE' ? "Interactive Challenge: Solve each XOR reduction step!" : "Review step-by-step polynomial division and remainder generation.";
          stageEl.innerHTML = this.renderDivisionStepperStage();
          break;

        case 'FRAME_GENERATION':
          phaseEl.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></span><span>STAGE 3: ASSEMBLE TRANSMITTED FRAME</span>`;
          hintEl.textContent = "Data and CRC remainder packed into complete frame. Launch network transmission.";
          stageEl.innerHTML = this.renderFrameGenerationStage();
          break;

        case 'ROUTER_DECISION':
          phaseEl.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span><span>STAGE 4: FRAME RECEIVED AT ROUTER</span>`;
          hintEl.textContent = "Transmission paused. Decide whether to introduce channel noise.";
          stageEl.innerHTML = this.renderRouterDecisionStage();
          break;

        case 'ERROR_INJECTION':
          phaseEl.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse"></span><span>STAGE 4: SINGLE-BIT ERROR INJECTION</span>`;
          hintEl.textContent = "Click any single data or CRC bit to flip its state before forwarding.";
          stageEl.innerHTML = this.renderErrorInjectionStage();
          break;

        case 'RESULTS':
          const isSuccess = CRCGameState.receiverResult?.isValid;
          phaseEl.innerHTML = `<span class="w-2.5 h-2.5 rounded-full ${isSuccess ? 'bg-emerald-400' : 'bg-red-400'} animate-pulse"></span><span>STAGE 5: RECEIVER VERIFICATION COMPLETE</span>`;
          hintEl.textContent = "Receiver-side division evaluated. Review verification telemetry.";
          stageEl.innerHTML = this.renderResultsStage();
          break;

        default:
          break;
      }
    },

    // STAGE 1: Sender Input Form
    renderSenderInputStage: function () {
      const dataVal = CRCGameState.dataInput || '1101';
      const genVal = CRCGameState.generatorInput || '1011';
      const polyStr = CRCMathEngine.getPolynomialString(genVal);

      return `
        <div class="space-y-5">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 class="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <i class="fa-solid fa-server text-cyan-400"></i> Sender Station Configuration
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">
                Configure your data message and select a generator polynomial $G(x)$. Modulo-2 arithmetic will calculate the Frame Check Sequence (FCS).
              </p>
            </div>
            <span class="crc-poly-pill" id="crc-poly-display">
              G(x) = ${polyStr}
            </span>
          </div>

          <!-- Presets -->
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-[10px] font-bold uppercase text-slate-400">Generator Presets:</span>
            <button onclick="CRCChallengeGame.loadPreset('1011', '1101')" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-mono text-cyan-300 transition-colors">
              Standard: 1011 (x³+x+1)
            </button>
            <button onclick="CRCChallengeGame.loadPreset('1101', '101101')" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-mono text-cyan-300 transition-colors">
              x³+x²+1 (1101)
            </button>
            <button onclick="CRCChallengeGame.loadPreset('10011', '11010110')" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-mono text-cyan-300 transition-colors">
              CRC-4: 10011 (x⁴+x+1)
            </button>
            <button onclick="CRCChallengeGame.loadPreset('11001', '11100010')" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-mono text-cyan-300 transition-colors">
              CRC-4: 11001 (x⁴+x³+1)
            </button>
          </div>

          <!-- Input Fields -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase text-slate-300 mb-1">
                Data Message Bits (D)
              </label>
              <input type="text" id="crc-input-data" value="${dataVal}" class="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-lg px-3.5 py-2.5 font-mono text-cyan-300 text-sm tracking-widest outline-none transition-colors" placeholder="e.g. 1101">
              <span id="crc-err-data" class="text-[11px] text-red-400 hidden mt-1 block">Binary digits (0 and 1) only, minimum 1 bit.</span>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-slate-300 mb-1">
                Generator Polynomial G(x)
              </label>
              <input type="text" id="crc-input-gen" oninput="CRCChallengeGame.handleGenInput(this.value)" value="${genVal}" class="w-full bg-slate-900 border border-slate-700 focus:border-purple-400 rounded-lg px-3.5 py-2.5 font-mono text-purple-300 text-sm tracking-widest outline-none transition-colors" placeholder="e.g. 1011">
              <span id="crc-err-gen" class="text-[11px] text-red-400 hidden mt-1 block">Must begin with 1, end with 1, and be binary.</span>
            </div>
          </div>

          <!-- Mathematical Specifications Preview Box -->
          <div class="bg-slate-900/70 p-3.5 rounded-lg border border-slate-800 space-y-2 text-xs font-mono">
            <div class="flex items-center justify-between">
              <span class="text-slate-400 font-sans">Generator Degree (r):</span>
              <strong class="text-purple-300" id="crc-degree-text">${genVal.length - 1}</strong>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-400 font-sans">Appended Zeros to Dividend:</span>
              <strong class="text-amber-300" id="crc-zeros-text">r = ${genVal.length - 1} zeros</strong>
            </div>
            <div class="flex items-center justify-between pt-1 border-t border-slate-800">
              <span class="text-slate-400 font-sans">Arithmetic Rule:</span>
              <span class="text-emerald-400 font-sans font-bold">Modulo-2 Division (XOR, No Borrows)</span>
            </div>
          </div>

          <div class="pt-2">
            <button onclick="CRCChallengeGame.handleComputeCRC()" class="crc-btn crc-btn-cyan w-full sm:w-auto">
              <i class="fa-solid fa-play"></i>
              <span>Start Modulo-2 Division →</span>
            </button>
          </div>
        </div>
      `;
    },

    // STAGE 2: Modulo-2 Binary Long Division Stepper
    renderDivisionStepperStage: function () {
      const calc = CRCGameState.crcResult;
      if (!calc) return '';

      const isChallenge = (CRCGameState.gameMode === 'CHALLENGE');
      const stepIdx = CRCGameState.currentDivisionStep;
      const totalSteps = calc.division.steps.length;
      const currentStepObj = calc.division.steps[stepIdx];

      return `
        <div class="space-y-5">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 class="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <i class="fa-solid fa-diagram-project text-cyan-400"></i> Modulo-2 Long Division Engine
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">
                Dividing augmented payload (${calc.augmentedData}) by generator G = ${calc.generator} (${calc.polynomialStr}).
              </p>
            </div>
            <div class="flex items-center space-x-2">
              <button onclick="CRCChallengeGame.skipToEndOfDivision()" class="text-xs text-cyan-400 hover:underline cursor-pointer">
                Show Full Solution →
              </button>
              <button onclick="CRCChallengeGame.editInputs()" class="text-xs text-slate-400 hover:text-white cursor-pointer ml-2">
                ← Reconfigure
              </button>
            </div>
          </div>

          <!-- Long Division Table Visualizer -->
          ${CRCDivisionVisualizer.renderDivisionTable(calc.division, { highlightStep: stepIdx + 1, showAll: false })}

          <!-- CHALLENGE MODE INTERACTION (If Active) -->
          ${isChallenge && stepIdx < totalSteps && currentStepObj.leadBit === '1' ? `
            <div class="crc-xor-interactive-box space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-amber-300 uppercase flex items-center gap-1.5">
                  <i class="fa-solid fa-brain"></i> Interactive XOR Challenge: Step ${stepIdx + 1} of ${totalSteps}
                </span>
                <span class="text-[11px] text-slate-400">What is ${currentStepObj.activeSlice} ⊕ ${currentStepObj.generator}?</span>
              </div>

              <div class="flex items-center space-x-2">
                <span class="text-xs text-slate-300">Enter XOR Result:</span>
                <input type="text" id="crc-xor-user-input" maxlength="${currentStepObj.generator.length}" class="bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-center text-sm font-bold px-3 py-1.5 rounded w-32 tracking-widest outline-none focus:border-cyan-400" placeholder="${"0".repeat(currentStepObj.generator.length)}">
                <button onclick="CRCChallengeGame.submitXorChallenge()" class="crc-btn crc-btn-emerald text-xs py-1.5 px-3">
                  Verify XOR
                </button>
              </div>
              <div id="crc-xor-feedback" class="text-xs ${CRCGameState.xorFeedbackMessage ? '' : 'hidden'}">
                ${CRCGameState.xorFeedbackMessage}
              </div>
            </div>
          ` : ''}

          <!-- Stepper Navigation Controls -->
          <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
            <span class="text-xs text-slate-400 font-mono">
              Step Progress: <strong>${Math.min(stepIdx + 1, totalSteps)}</strong> / ${totalSteps}
            </span>

            <div class="flex items-center space-x-2">
              ${stepIdx < totalSteps - 1 ? `
                <button onclick="CRCChallengeGame.nextDivisionStep()" class="crc-btn crc-btn-cyan">
                  <span>Next Division Step →</span>
                </button>
              ` : `
                <button onclick="CRCChallengeGame.completeDivisionAndProceed()" class="crc-btn crc-btn-emerald">
                  <i class="fa-solid fa-check"></i>
                  <span>Complete & Prepare Frame →</span>
                </button>
              `}
            </div>
          </div>
        </div>
      `;
    },

    // STAGE 3: Frame Generation Stage
    renderFrameGenerationStage: function () {
      const calc = CRCGameState.crcResult;
      if (!calc) return '';

      return `
        <div class="space-y-5">
          <div>
            <h3 class="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <i class="fa-solid fa-box-archive text-sky-400"></i> Frame Assembly Completed
            </h3>
            <p class="text-xs text-slate-400 mt-1">
              The ${calc.generatorDegree}-bit CRC remainder is appended to the original data payload.
            </p>
          </div>

          <!-- Bit Grid -->
          <div class="bg-slate-950/80 p-5 rounded-xl border border-sky-500/30 overflow-x-auto space-y-4">
            ${CRCBitDisplay.renderFrameBits(calc.transmittedFrame, calc.originalData.length, { interactive: false })}

            <div class="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <div class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded bg-slate-800 border border-sky-500/40"></span>
                <span>Original Data (${calc.originalData.length} Bits): <strong class="text-sky-300 font-mono">${calc.originalData}</strong></span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded bg-purple-900/60 border border-purple-500/60"></span>
                <span>CRC Remainder (${calc.remainder.length} Bits): <strong class="text-purple-300 font-mono">${calc.remainder}</strong></span>
              </div>
              <div class="ml-auto font-mono text-[11px] text-slate-400">
                Total Frame Length: <strong>${calc.totalFrameBits} Bits</strong>
              </div>
            </div>
          </div>

          <!-- Confirmation and Launch -->
          <div class="flex items-center justify-between pt-2">
            <button onclick="CRCChallengeGame.editInputs()" class="crc-btn crc-btn-secondary text-xs">
              ← Reconfigure
            </button>
            <button onclick="CRCChallengeGame.handleTransmitToRouter()" id="crc-btn-transmit-router" class="crc-btn crc-btn-cyan">
              <i class="fa-solid fa-paper-plane"></i>
              <span>Transmit Frame to Router →</span>
            </button>
          </div>
        </div>
      `;
    },

    // STAGE 4: Router Decision Screen (Pause)
    renderRouterDecisionStage: function () {
      const calc = CRCGameState.crcResult;
      if (!calc) return '';

      return `
        <div class="space-y-5">
          <div class="bg-purple-950/30 border border-purple-500/40 p-4 rounded-xl flex items-center space-x-3">
            <div class="w-10 h-10 rounded-lg bg-purple-900/80 text-purple-300 flex items-center justify-center text-lg border border-purple-400/50">
              <i class="fa-solid fa-router"></i>
            </div>
            <div>
              <div class="text-sm font-black uppercase text-purple-300">FRAME RECEIVED AT ROUTER</div>
              <p class="text-xs text-slate-300">
                Transmission paused in intermediate routing memory. Frame: <span class="font-mono text-cyan-300 font-bold">${CRCGameState.transmittedFrame}</span>
              </p>
            </div>
          </div>

          <div class="text-center py-2 space-y-1">
            <h4 class="text-sm font-extrabold text-white uppercase tracking-wider">
              DO YOU WANT TO INTRODUCE A TRANSMISSION ERROR?
            </h4>
            <p class="text-xs text-slate-400">
              Simulate electrical interference or signal attenuation along the physical medium.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- OPTION A: NO ERROR -->
            <div class="bg-slate-900/80 hover:bg-slate-900 border border-slate-700 hover:border-emerald-500/60 p-4 rounded-xl space-y-3 transition-all flex flex-col justify-between group">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold uppercase text-emerald-400">OPTION A</span>
                  <span class="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40">Clean Medium</span>
                </div>
                <h5 class="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Forward Original Frame Unchanged
                </h5>
                <p class="text-xs text-slate-400 leading-relaxed">
                  The frame will reach the receiver intact. Modulo-2 division will yield remainder 0.
                </p>
              </div>
              <button onclick="CRCChallengeGame.handleForwardNoError()" class="crc-btn crc-btn-emerald w-full mt-2">
                <i class="fa-solid fa-check"></i>
                <span>Forward With No Error</span>
              </button>
            </div>

            <!-- OPTION B: INTRODUCE SINGLE-BIT ERROR -->
            <div class="bg-slate-900/80 hover:bg-slate-900 border border-slate-700 hover:border-red-500/60 p-4 rounded-xl space-y-3 transition-all flex flex-col justify-between group">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold uppercase text-red-400">OPTION B</span>
                  <span class="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded border border-red-500/40">Inject Noise</span>
                </div>
                <h5 class="text-sm font-bold text-white group-hover:text-red-300 transition-colors">
                  Introduce Single-Bit Error
                </h5>
                <p class="text-xs text-slate-400 leading-relaxed">
                  Flip any single data bit or CRC remainder bit to test if the receiver detects corruption.
                </p>
              </div>
              <button onclick="CRCChallengeGame.handleOpenBitFlipper()" class="crc-btn crc-btn-danger w-full mt-2">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span>Inject Bit Error →</span>
              </button>
            </div>
          </div>
        </div>
      `;
    },

    // STAGE 4 (Error Injection): Interactive Bit Selector
    renderErrorInjectionStage: function () {
      const calc = CRCGameState.crcResult;
      if (!calc) return '';

      const flippedIdx = CRCGameState.flippedBitIndex;

      return `
        <div class="space-y-5">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 class="text-sm font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
                <i class="fa-solid fa-bug"></i> Interactive Single-Bit Corruption
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">
                Click on any single bit below to invert it ($0 \\rightarrow 1$ or $1 \\rightarrow 0$). Only exactly 1 bit can be modified.
              </p>
            </div>
            <button onclick="CRCChallengeGame.cancelErrorInjection()" class="text-xs text-slate-400 hover:text-white cursor-pointer">
              ← Cancel (No Error)
            </button>
          </div>

          <!-- Bit Grid -->
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
              ${CRCBitDisplay.renderFrameBits(CRCGameState.transmittedFrame, calc.originalData.length, { interactive: true, flippedIndex: flippedIdx })}
            </div>

            <!-- Comparison Box -->
            <div class="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 space-y-2 text-xs font-mono">
              <div class="flex items-center space-x-2">
                <span class="text-slate-400 w-28 font-sans">Sender Original:</span>
                <span class="text-sky-300 font-bold tracking-wider">${CRCGameState.originalFrame}</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-slate-400 w-28 font-sans">Transmitted Copy:</span>
                <span class="text-slate-200 tracking-wider">
                  ${CRCGameState.transmittedFrame.split('').map((b, idx) => idx === flippedIdx ? `<span class="text-red-400 font-extrabold bg-red-950 px-1 rounded underline">${b}</span>` : b).join('')}
                </span>
              </div>
              <div class="text-[11px] text-slate-400 font-sans pt-1 border-t border-slate-800">
                Rule: The sender's original frame remains unchanged. The router cannot recalculate or fix CRC.
              </div>
            </div>
          </div>

          <!-- Forward Action -->
          <div class="flex items-center justify-between pt-2">
            <button onclick="CRCChallengeGame.handleClearFlip()" class="crc-btn crc-btn-secondary text-xs">
              Reset Selection
            </button>
            <button onclick="CRCChallengeGame.handleConfirmCorruptedForward()" class="crc-btn crc-btn-danger" ${flippedIdx === null ? 'disabled' : ''}>
              <i class="fa-solid fa-forward"></i>
              <span>Confirm & Forward Corrupted Frame →</span>
            </button>
          </div>
        </div>
      `;
    },

    // STAGE 5: Receiver Results Screen
    renderResultsStage: function () {
      const verify = CRCGameState.receiverResult;
      const calc = CRCGameState.crcResult;
      if (!verify || !calc) return '';

      const isSuccess = verify.isValid;
      const hadErrorInjected = (CRCGameState.flippedBitIndex !== null);

      return `
        <div class="space-y-6">
          <!-- VERDICT HERO BANNER -->
          <div class="p-5 rounded-xl border ${isSuccess ? 'bg-emerald-950/30 border-emerald-500/50' : 'bg-red-950/30 border-red-500/50'} flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 rounded-xl ${isSuccess ? 'bg-emerald-900/80 text-emerald-300 border-emerald-400' : 'bg-red-900/80 text-red-300 border-red-400'} border flex items-center justify-center text-2xl shadow-lg">
                <i class="fa-solid ${isSuccess ? 'fa-shield-check' : 'fa-shield-halved'}"></i>
              </div>
              <div>
                <div class="flex items-center space-x-2">
                  <h3 class="text-base font-black uppercase tracking-wider ${isSuccess ? 'text-emerald-300' : 'text-red-400'}">
                    ${isSuccess ? 'NO ERROR DETECTED — FRAME ACCEPTED' : 'ERROR DETECTED — FRAME REJECTED'}
                  </h3>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded ${isSuccess ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-red-500/20 text-red-300 border border-red-500/40'}">
                    ${isSuccess ? 'ZERO REMAINDER' : 'NON-ZERO SYNDROME'}
                  </span>
                </div>
                <p class="text-xs text-slate-300 mt-1">
                  ${isSuccess
                    ? `Modulo-2 division of received frame produced remainder ${verify.remainder} (all zeros). Frame integrity verified.`
                    : `Modulo-2 division yielded non-zero syndrome ${verify.remainder}. Corrupted frame was safely discarded.`
                  }
                </p>
              </div>
            </div>

            <!-- Score Award Pill -->
            <div class="text-right">
              <span class="text-[10px] text-slate-400 uppercase font-bold">Points Awarded</span>
              <div class="text-xl font-black font-mono ${isSuccess ? 'text-emerald-400' : 'text-amber-400'}">
                +${hadErrorInjected ? '150 PTS' : '100 PTS'}
              </div>
            </div>
          </div>

          <!-- COMPARISON TELEMETRY TABLE -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 class="text-xs font-bold uppercase text-slate-300 flex items-center gap-1.5">
                <i class="fa-solid fa-code-compare text-sky-400"></i> Frame Comparison Telemetry
              </h4>
              <div class="space-y-2 text-xs font-mono">
                <div>
                  <div class="text-[11px] text-slate-400 font-sans">Sender Original Frame:</div>
                  <div class="text-sky-300 font-bold tracking-wider">${CRCGameState.originalFrame}</div>
                </div>
                <div>
                  <div class="text-[11px] text-slate-400 font-sans">Receiver Ingested Frame:</div>
                  <div class="text-slate-200 tracking-wider">
                    ${CRCGameState.transmittedFrame.split('').map((b, idx) => idx === CRCGameState.flippedBitIndex ? `<span class="text-red-400 font-extrabold bg-red-950 px-1 rounded underline">${b}</span>` : b).join('')}
                  </div>
                </div>
                <div class="pt-1 border-t border-slate-800 text-[11px] font-sans">
                  <span class="text-slate-400">Channel Condition:</span>
                  <strong class="${hadErrorInjected ? 'text-red-400' : 'text-emerald-400'}">
                    ${hadErrorInjected ? `1-Bit Corruption at Position #${CRCGameState.flippedBitIndex}` : 'Clean Transmission (0 Bit Flips)'}
                  </strong>
                </div>
              </div>
            </div>

            <div class="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 class="text-xs font-bold uppercase text-slate-300 flex items-center gap-1.5">
                <i class="fa-solid fa-square-root-variable text-purple-400"></i> Receiver Division Result
              </h4>
              <div class="space-y-1.5 text-xs font-mono">
                <div class="flex justify-between">
                  <span class="text-slate-400 font-sans">Generator G(x):</span>
                  <span class="font-bold text-purple-300">${verify.generator} (${verify.polynomialStr})</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400 font-sans">Receiver Remainder:</span>
                  <span class="font-bold ${isSuccess ? 'text-emerald-400' : 'text-red-400'}">${verify.remainder}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400 font-sans">Expected Syndrome:</span>
                  <span class="text-slate-300 font-bold">${verify.expectedZeros}</span>
                </div>
                <div class="flex justify-between pt-1 border-t border-slate-800 font-sans">
                  <span class="text-slate-400">Layer 2 Action:</span>
                  <strong class="${isSuccess ? 'text-emerald-400' : 'text-red-400'} uppercase">
                    ${isSuccess ? 'Payload Delivered to Network Layer' : 'Frame Dropped (Request ARQ Retransmit)'}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          <!-- Step-by-Step Receiver Modulo-2 Division Box -->
          <div class="space-y-2">
            <h4 class="text-xs font-bold uppercase text-slate-300 flex items-center gap-1.5">
              <i class="fa-solid fa-list-check text-cyan-400"></i> Receiver-Side Modulo-2 Division Steps
            </h4>
            ${CRCDivisionVisualizer.renderDivisionTable(verify.division, { showAll: true })}
          </div>

          <!-- Mathematical Guarantee Insight -->
          <div class="bg-slate-900/90 p-4 rounded-xl border border-cyan-500/30 text-xs space-y-1.5">
            <div class="flex items-center space-x-2 text-cyan-300 font-bold uppercase">
              <i class="fa-solid fa-graduation-cap"></i>
              <span>Crucial Networking Principle</span>
            </div>
            <p class="text-slate-300 leading-relaxed font-sans">
              <strong>Mathematical Explanation:</strong> A zero remainder mathematically signifies that no transmission error was detected. While CRC catches all single-bit, double-bit, and odd-numbered errors, it does <em>not</em> mathematically guarantee that the received frame is 100% identical to the original in the theoretical case where the error polynomial $E(x)$ happens to be an exact multiple of the generator $G(x)$.
            </p>
          </div>

          <!-- Navigation & Buttons -->
          <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
            <button onclick="App.loadView('minigames')" class="crc-btn crc-btn-secondary">
              <i class="fa-solid fa-gamepad"></i>
              <span>Back to Mini Games</span>
            </button>
            <div class="flex items-center space-x-2">
              <button onclick="CRCChallengeGame.resetGame()" class="crc-btn crc-btn-secondary">
                <i class="fa-solid fa-rotate-right"></i>
                <span>Play Again</span>
              </button>
              ${CRCGameState.currentLevel < 5 ? `
                <button onclick="CRCChallengeGame.nextLevel()" class="crc-btn crc-btn-emerald">
                  <i class="fa-solid fa-forward-step"></i>
                  <span>Next Level (L${CRCGameState.currentLevel + 1}) →</span>
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    },

    // ==========================================
    // 9. EVENT HANDLERS & LOGIC
    // ==========================================

    handleGenInput: function (val) {
      const polyDisplay = document.getElementById('crc-poly-display');
      const degText = document.getElementById('crc-degree-text');
      const zerosText = document.getElementById('crc-zeros-text');

      if (CRCMathEngine.isValidBinary(val, 2)) {
        const polyStr = CRCMathEngine.getPolynomialString(val);
        const r = val.length - 1;
        if (polyDisplay) polyDisplay.textContent = `G(x) = ${polyStr}`;
        if (degText) degText.textContent = r;
        if (zerosText) zerosText.textContent = `r = ${r} zeros`;
      }
    },

    loadPreset: function (gen, data) {
      CRCGameState.generatorInput = gen;
      CRCGameState.dataInput = data;
      const dataIn = document.getElementById('crc-input-data');
      const genIn = document.getElementById('crc-input-gen');
      if (dataIn) dataIn.value = data;
      if (genIn) genIn.value = gen;
      this.handleGenInput(gen);
      CRCSoundSystem.click();
    },

    handleComputeCRC: function () {
      const dataIn = document.getElementById('crc-input-data');
      const genIn = document.getElementById('crc-input-gen');
      const errData = document.getElementById('crc-err-data');
      const errGen = document.getElementById('crc-err-gen');

      const dataVal = dataIn ? dataIn.value.trim() : '';
      const genVal = genIn ? genIn.value.trim() : '';

      const validData = CRCMathEngine.isValidBinary(dataVal, 1);
      const valGen = CRCMathEngine.validateGenerator(genVal);

      if (errData) errData.classList.toggle('hidden', validData);
      if (errGen) {
        errGen.textContent = valGen.isValid ? '' : valGen.error;
        errGen.classList.toggle('hidden', valGen.isValid);
      }

      if (!validData || !valGen.isValid) return;

      CRCGameState.dataInput = dataVal;
      CRCGameState.generatorInput = genVal;

      try {
        CRCGameState.crcResult = CRCMathEngine.calculateCRC(dataVal, genVal);
        CRCGameState.transmittedFrame = CRCGameState.crcResult.transmittedFrame;
        CRCGameState.originalFrame = CRCGameState.crcResult.transmittedFrame;
        CRCGameState.flippedBitIndex = null;
        CRCGameState.currentDivisionStep = 0;
        CRCGameState.currentPhase = 'DIVISION_STEPPER';
        CRCSoundSystem.xorChime();
        this.renderActiveStage();
      } catch (err) {
        alert("CRC Calculation Error: " + err.message);
      }
    },

    nextDivisionStep: function () {
      if (!CRCGameState.crcResult) return;
      const totalSteps = CRCGameState.crcResult.division.steps.length;
      if (CRCGameState.currentDivisionStep < totalSteps - 1) {
        CRCGameState.currentDivisionStep++;
        CRCGameState.interactiveXorAttempt = '';
        CRCGameState.xorFeedbackMessage = '';
        CRCSoundSystem.xorChime();
        this.renderActiveStage();
      } else {
        this.completeDivisionAndProceed();
      }
    },

    skipToEndOfDivision: function () {
      if (!CRCGameState.crcResult) return;
      CRCGameState.currentDivisionStep = CRCGameState.crcResult.division.steps.length - 1;
      this.renderActiveStage();
    },

    completeDivisionAndProceed: function () {
      CRCGameState.currentPhase = 'FRAME_GENERATION';
      CRCSoundSystem.click();
      this.renderActiveStage();
    },

    submitXorChallenge: function () {
      const inputEl = document.getElementById('crc-xor-user-input');
      const feedbackEl = document.getElementById('crc-xor-feedback');
      if (!inputEl) return;

      const userVal = inputEl.value.trim();
      const calc = CRCGameState.crcResult;
      const stepObj = calc.division.steps[CRCGameState.currentDivisionStep];
      const correctXor = stepObj.xorResult;

      if (userVal === correctXor) {
        inputEl.className = "bg-slate-900 border text-emerald-400 font-mono text-center text-sm font-bold px-3 py-1.5 rounded w-32 tracking-widest outline-none correct";
        if (feedbackEl) {
          feedbackEl.className = "text-xs text-emerald-400 font-bold block";
          feedbackEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> Correct! +50 Points. Result: ${correctXor}`;
        }
        CRCGameState.stats.score += 50;
        CRCGameState.stats.streak++;
        CRCGameState.stats.correctXorCount++;
        CRCSoundSystem.correctAnswer();
        this.updateHUD();

        setTimeout(() => {
          this.nextDivisionStep();
        }, 600);
      } else {
        inputEl.className = "bg-slate-900 border text-red-400 font-mono text-center text-sm font-bold px-3 py-1.5 rounded w-32 tracking-widest outline-none incorrect";
        if (feedbackEl) {
          feedbackEl.className = "text-xs text-red-400 font-bold block";
          feedbackEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Incorrect. Hint: In XOR, matching bits give 0, different bits give 1. Try again!`;
        }
        CRCGameState.stats.incorrectXorCount++;
        CRCGameState.stats.streak = 0;
        CRCSoundSystem.wrongAnswer();
        this.updateHUD();
      }
    },

    handleTransmitToRouter: function () {
      const btn = document.getElementById('crc-btn-transmit-router');
      if (btn) btn.disabled = true;

      CRCTransmissionSystem.startSenderToRouter(() => {
        CRCGameState.currentPhase = 'ROUTER_DECISION';
        this.renderActiveStage();
      });
    },

    handleForwardNoError: function () {
      CRCGameState.flippedBitIndex = null;
      CRCGameState.transmittedFrame = CRCGameState.originalFrame;

      CRCTransmissionSystem.startRouterToReceiver(false, () => {
        this.executeReceiverVerification();
      });
    },

    handleOpenBitFlipper: function () {
      CRCGameState.currentPhase = 'ERROR_INJECTION';
      CRCSoundSystem.click();
      this.renderActiveStage();
    },

    cancelErrorInjection: function () {
      CRCGameState.flippedBitIndex = null;
      CRCGameState.transmittedFrame = CRCGameState.originalFrame;
      CRCGameState.currentPhase = 'ROUTER_DECISION';
      CRCSoundSystem.click();
      this.renderActiveStage();
    },

    handleBitClick: function (bitIndex) {
      if (CRCGameState.currentPhase !== 'ERROR_INJECTION') return;

      CRCSoundSystem.click();
      if (CRCGameState.flippedBitIndex === bitIndex) {
        CRCGameState.flippedBitIndex = null;
        CRCGameState.transmittedFrame = CRCGameState.originalFrame;
      } else {
        CRCGameState.flippedBitIndex = bitIndex;
        CRCGameState.transmittedFrame = CRCMathEngine.flipSelectedBit(CRCGameState.originalFrame, bitIndex);
      }
      this.renderActiveStage();
    },

    handleClearFlip: function () {
      CRCGameState.flippedBitIndex = null;
      CRCGameState.transmittedFrame = CRCGameState.originalFrame;
      CRCSoundSystem.click();
      this.renderActiveStage();
    },

    handleConfirmCorruptedForward: function () {
      if (CRCGameState.flippedBitIndex === null) return;

      CRCTransmissionSystem.startRouterToReceiver(true, () => {
        this.executeReceiverVerification();
      });
    },

    executeReceiverVerification: function () {
      const verify = CRCMathEngine.verifyReceivedFrame(
        CRCGameState.transmittedFrame,
        CRCGameState.generatorInput
      );

      CRCGameState.receiverResult = verify;
      CRCGameState.currentPhase = 'RESULTS';

      CRCGameState.stats.transmissionsCount++;
      if (verify.isValid) {
        CRCGameState.stats.score += 100;
        CRCGameState.stats.streak++;
        CRCGameState.stats.levelsCompleted[CRCGameState.currentLevel - 1] = true;
        CRCSoundSystem.successFanfare();
      } else {
        CRCGameState.stats.score += 150;
        CRCGameState.stats.streak++;
        CRCSoundSystem.errorAlarm();
      }

      this.updateHUD();
      this.renderActiveStage();
    },

    updateHUD: function () {
      const scoreEl = document.getElementById('crc-hud-score');
      const streakEl = document.getElementById('crc-hud-streak');
      if (scoreEl) scoreEl.textContent = CRCGameState.stats.score;
      if (streakEl) streakEl.textContent = `${CRCGameState.stats.streak}x`;
    },

    setMode: function (mode) {
      CRCGameState.gameMode = mode;
      CRCSoundSystem.click();
      this.render();
    },

    selectLevel: function (lvl) {
      CRCGameState.setLevel(lvl);
      CRCSoundSystem.click();
      this.render();
    },

    nextLevel: function () {
      if (CRCGameState.currentLevel < 5) {
        this.selectLevel(CRCGameState.currentLevel + 1);
      }
    },

    editInputs: function () {
      CRCGameState.currentPhase = 'SENDER_INPUT';
      CRCTransmissionSystem.state = 'IDLE';
      this.renderActiveStage();
    },

    resetGame: function () {
      CRCGameState.resetSession();
      this.renderActiveStage();
    },

    toggleMute: function () {
      CRCSoundSystem.muted = !CRCSoundSystem.muted;
      const icon = document.getElementById('crc-sound-icon');
      if (icon) {
        icon.className = `fa-solid ${CRCSoundSystem.muted ? 'fa-volume-xmark text-red-400' : 'fa-volume-high text-cyan-400'}`;
      }
    }
  };

  // Expose to window for global invocation and routing
  window.CRCMathEngine = CRCMathEngine;
  window.CRCSoundSystem = CRCSoundSystem;
  window.CRCTransmissionSystem = CRCTransmissionSystem;
  window.CRCGameState = CRCGameState;
  window.CRCDivisionVisualizer = CRCDivisionVisualizer;
  window.CRCBitDisplay = CRCBitDisplay;
  window.CRCEducationalPanel = CRCEducationalPanel;
  window.CRCChallengeGame = CRCChallengeGame;

})(window);

