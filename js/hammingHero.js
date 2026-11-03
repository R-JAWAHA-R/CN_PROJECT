/**
 * HAMMING HERO — The Error Correction Challenge
 * Dedicated Interactive Educational Simulation for Hamming Code (7,4) and (12,8)
 * 
 * Architecture:
 * - HammingMathEngine: Pure dynamic parity and syndrome calculator (no hardcoded values)
 * - HammingSoundSystem: Synthesized Web Audio API retro arcade sound effects
 * - HammingTransmissionSystem: 60 FPS HTML5 Canvas 2D transmission arena (Sender -> Router -> Receiver)
 * - HammingGameState: State machine, level progression, scoring, XP, and phase control
 * - HammingBitDisplay: Visual bit-token grid with color coding and error/correction animations
 * - HammingEducationalPanel: Comprehensive 10-topic reference guide with KaTeX math
 * - HammingHeroGame: Main controller, HUD, stage renderers, event dispatchers
 */

(function (window) {
  'use strict';

  // ==========================================
  // 1. HAMMING MATH ENGINE
  // ==========================================
  const HammingMathEngine = {
    // Validates binary string of specified length
    isValidBinary: function (str, expectedLength = null) {
      if (!str || typeof str !== 'string') return false;
      const clean = str.trim();
      if (!/^[01]+$/.test(clean)) return false;
      if (expectedLength !== null && clean.length !== expectedLength) return false;
      return true;
    },

    // Checks if a 1-based number is a power of 2
    isPowerOfTwo: function (n) {
      return n > 0 && (n & (n - 1)) === 0;
    },

    // Returns layout metadata for a given mode ('7-4' or '12-8')
    getLayout: function (mode = '7-4') {
      if (mode === '12-8') {
        const totalBits = 12;
        const dataBitsCount = 8;
        const parityBitsCount = 4;
        const slots = [];
        let dataIndex = 1;
        let parityIndex = 0; // 0 -> 2^0=1, 1 -> 2^1=2, 2 -> 2^2=4, 3 -> 2^3=8

        for (let pos = 1; pos <= totalBits; pos++) {
          if (this.isPowerOfTwo(pos)) {
            slots.push({
              pos: pos,
              isParity: true,
              name: `P${pos}`,
              mask: pos,
              pow: Math.log2(pos)
            });
            parityIndex++;
          } else {
            slots.push({
              pos: pos,
              isParity: false,
              name: `D${dataIndex}`,
              dataIndex: dataIndex
            });
            dataIndex++;
          }
        }
        return {
          mode: '12-8',
          name: 'Hamming (12,8)',
          totalBits: totalBits,
          dataBitsCount: dataBitsCount,
          parityBitsCount: parityBitsCount,
          slots: slots,
          parityPositions: [1, 2, 4, 8],
          dataPositions: [3, 5, 6, 7, 9, 10, 11, 12]
        };
      }

      // Default: Hamming (7,4)
      const totalBits = 7;
      const dataBitsCount = 4;
      const parityBitsCount = 3;
      const slots = [];
      let dataIndex = 1;

      for (let pos = 1; pos <= totalBits; pos++) {
        if (this.isPowerOfTwo(pos)) {
          slots.push({
            pos: pos,
            isParity: true,
            name: `P${pos}`,
            mask: pos,
            pow: Math.log2(pos)
          });
        } else {
          slots.push({
            pos: pos,
            isParity: false,
            name: `D${dataIndex}`,
            dataIndex: dataIndex
          });
          dataIndex++;
        }
      }
      return {
        mode: '7-4',
        name: 'Hamming (7,4)',
        totalBits: totalBits,
        dataBitsCount: dataBitsCount,
        parityBitsCount: parityBitsCount,
        slots: slots,
        parityPositions: [1, 2, 4],
        dataPositions: [3, 5, 6, 7]
      };
    },

    // Encodes arbitrary valid binary data string into a Hamming frame
    encodeHamming: function (dataStr, mode = '7-4') {
      const cleanData = dataStr.trim();
      const layout = this.getLayout(mode);

      if (cleanData.length !== layout.dataBitsCount || !/^[01]+$/.test(cleanData)) {
        throw new Error(`Data string must be exactly ${layout.dataBitsCount} binary bits for ${layout.name}.`);
      }

      // 1-based frame array
      const frame = new Array(layout.totalBits + 1).fill(0);

      // Place data bits into their designated positions
      for (let i = 0; i < layout.dataPositions.length; i++) {
        const pos = layout.dataPositions[i];
        frame[pos] = parseInt(cleanData[i], 10);
      }

      // Calculate parity bits using even parity
      const parityDetails = [];
      for (let p = 0; p < layout.parityPositions.length; p++) {
        const pPos = layout.parityPositions[p];
        const coveredDataPositions = [];
        let xorSum = 0;

        for (let i = 0; i < layout.dataPositions.length; i++) {
          const dPos = layout.dataPositions[i];
          // Check if bit at pPos is involved (i.e. dPos & pPos != 0)
          if ((dPos & pPos) !== 0) {
            coveredDataPositions.push({
              pos: dPos,
              name: `D${layout.slots[dPos - 1].dataIndex}`,
              value: frame[dPos]
            });
            xorSum ^= frame[dPos];
          }
        }

        frame[pPos] = xorSum;

        const exprParts = coveredDataPositions.map(d => `${d.name} (${d.value})`);
        const xorExpr = exprParts.join(' ⊕ ') + ` = ${xorSum}`;

        parityDetails.push({
          name: `P${pPos}`,
          pos: pPos,
          coveredDataPositions: coveredDataPositions,
          value: xorSum,
          xorExpr: xorExpr
        });
      }

      // Convert frame array (1..totalBits) into binary string
      let encodedStr = '';
      const bitObjects = [];
      for (let pos = 1; pos <= layout.totalBits; pos++) {
        const slot = layout.slots[pos - 1];
        encodedStr += frame[pos].toString();
        bitObjects.push({
          pos: pos,
          name: slot.name,
          isParity: slot.isParity,
          value: frame[pos]
        });
      }

      return {
        dataInput: cleanData,
        encodedBits: encodedStr,
        bitObjects: bitObjects,
        parityDetails: parityDetails,
        layout: layout
      };
    },

    // Calculates syndrome and identifies any error position
    calculateSyndrome: function (receivedFrameStr, mode = '7-4') {
      const cleanFrame = receivedFrameStr.trim();
      const layout = this.getLayout(mode);

      if (cleanFrame.length !== layout.totalBits || !/^[01]+$/.test(cleanFrame)) {
        throw new Error(`Received frame must be exactly ${layout.totalBits} binary bits.`);
      }

      // 1-based frame array
      const frame = new Array(layout.totalBits + 1).fill(0);
      for (let pos = 1; pos <= layout.totalBits; pos++) {
        frame[pos] = parseInt(cleanFrame[pos - 1], 10);
      }

      // Calculate each syndrome bit: S_k = XOR of all bits in positions where pos & pPos != 0
      const syndromeDetails = [];
      let syndromeDecimal = 0;
      let syndromeBinaryParts = [];

      for (let p = 0; p < layout.parityPositions.length; p++) {
        const pPos = layout.parityPositions[p];
        const coveredPositions = [];
        let xorSum = 0;

        for (let pos = 1; pos <= layout.totalBits; pos++) {
          if ((pos & pPos) !== 0) {
            coveredPositions.push({
              pos: pos,
              name: layout.slots[pos - 1].name,
              value: frame[pos]
            });
            xorSum ^= frame[pos];
          }
        }

        if (xorSum === 1) {
          syndromeDecimal += pPos;
        }

        const exprParts = coveredPositions.map(c => `b${c.pos} (${c.value})`);
        const xorExpr = exprParts.join(' ⊕ ') + ` = ${xorSum}`;

        syndromeDetails.push({
          name: `S${pPos}`,
          pos: pPos,
          coveredPositions: coveredPositions,
          value: xorSum,
          xorExpr: xorExpr
        });
      }

      // Format syndrome binary from most significant parity position to least
      // For (7,4): S4 S2 S1
      // For (12,8): S8 S4 S2 S1
      for (let p = layout.parityPositions.length - 1; p >= 0; p--) {
        const s = syndromeDetails[p];
        syndromeBinaryParts.push(s.value.toString());
      }
      const syndromeBinary = syndromeBinaryParts.join('');

      const hasError = syndromeDecimal > 0;
      let errorSlot = null;
      if (hasError && syndromeDecimal <= layout.totalBits) {
        errorSlot = layout.slots[syndromeDecimal - 1];
      }

      return {
        receivedFrame: cleanFrame,
        syndromeBinary: syndromeBinary,
        syndromeDecimal: syndromeDecimal,
        hasError: hasError,
        errorPosition: hasError ? syndromeDecimal : 0,
        errorSlot: errorSlot,
        syndromeDetails: syndromeDetails,
        layout: layout
      };
    },

    // Corrects frame if error position is valid, and extracts original data payload
    correctFrame: function (receivedFrameStr, errorPosition = 0, mode = '7-4') {
      const cleanFrame = receivedFrameStr.trim();
      const layout = this.getLayout(mode);
      const frameChars = cleanFrame.split('');

      let wasCorrected = false;
      if (errorPosition >= 1 && errorPosition <= layout.totalBits) {
        // Invert bit at errorPosition (1-based index -> 0-based index is errorPosition - 1)
        const currentBit = frameChars[errorPosition - 1];
        frameChars[errorPosition - 1] = currentBit === '1' ? '0' : '1';
        wasCorrected = true;
      }

      const correctedFrameStr = frameChars.join('');

      // Extract data bits from data positions
      let recoveredData = '';
      const extractedBits = [];
      for (let i = 0; i < layout.dataPositions.length; i++) {
        const pos = layout.dataPositions[i];
        const bitVal = correctedFrameStr[pos - 1];
        recoveredData += bitVal;
        extractedBits.push({
          pos: pos,
          name: `D${i + 1}`,
          value: parseInt(bitVal, 10)
        });
      }

      return {
        originalReceived: cleanFrame,
        correctedFrame: correctedFrameStr,
        wasCorrected: wasCorrected,
        errorPosition: errorPosition,
        recoveredData: recoveredData,
        extractedBits: extractedBits,
        layout: layout
      };
    }
  };

  // ==========================================
  // 2. HAMMING SOUND SYSTEM (Web Audio API)
  // ==========================================
  const HammingSoundSystem = {
    audioCtx: null,
    muted: false,

    init: function () {
      if (!this.audioCtx && (window.AudioContext || window.webkitAudioContext)) {
        try {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          this.audioCtx = new AudioContextClass();
        } catch (e) {
          // AudioContext disabled or blocked by policy
        }
      }
    },

    resume: function () {
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    },

    playTone: function (freq, type = 'sine', duration = 0.1, gainVal = 0.1) {
      if (this.muted) return;
      this.init();
      if (!this.audioCtx) return;
      this.resume();

      try {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        gain.gain.setValueAtTime(gainVal, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + duration);
      } catch (err) {
        // Fallback gracefully on audio errors
      }
    },

    click: function () {
      this.playTone(600, 'square', 0.05, 0.04);
    },

    encode: function () {
      this.playTone(440, 'sine', 0.08, 0.08);
      setTimeout(() => this.playTone(660, 'sine', 0.1, 0.08), 80);
      setTimeout(() => this.playTone(880, 'sine', 0.12, 0.08), 160);
    },

    transmit: function () {
      this.playTone(320, 'triangle', 0.15, 0.06);
    },

    glitch: function () {
      this.playTone(180, 'sawtooth', 0.12, 0.12);
      setTimeout(() => this.playTone(120, 'sawtooth', 0.18, 0.15), 100);
    },

    verifySuccess: function () {
      this.playTone(523.25, 'sine', 0.1, 0.08); // C5
      setTimeout(() => this.playTone(659.25, 'sine', 0.12, 0.08), 90); // E5
      setTimeout(() => this.playTone(783.99, 'sine', 0.2, 0.09), 180); // G5
    },

    correctHero: function () {
      // Triumphant error correction fanfare
      this.playTone(440, 'triangle', 0.1, 0.08);
      setTimeout(() => this.playTone(554.37, 'triangle', 0.1, 0.08), 80);
      setTimeout(() => this.playTone(659.25, 'triangle', 0.12, 0.09), 160);
      setTimeout(() => this.playTone(880, 'triangle', 0.25, 0.12), 240);
    },

    levelUp: function () {
      this.playTone(400, 'sine', 0.08, 0.08);
      setTimeout(() => this.playTone(500, 'sine', 0.08, 0.08), 70);
      setTimeout(() => this.playTone(600, 'sine', 0.08, 0.08), 140);
      setTimeout(() => this.playTone(800, 'sine', 0.2, 0.12), 210);
    }
  };

  // ==========================================
  // 3. HAMMING TRANSMISSION SYSTEM (Canvas 2D)
  // ==========================================
  const HammingTransmissionSystem = {
    canvas: null,
    ctx: null,
    animationId: null,
    width: 800,
    height: 230,
    state: 'IDLE', // 'IDLE', 'SENDER_TO_ROUTER', 'ROUTER_PAUSED', 'ROUTER_TO_RECEIVER', 'RECEIVER_LANDED'
    progress: 0,
    speed: 0.016,
    packetBits: '',
    hasError: false,
    particles: [],

    init: function (canvasElement) {
      if (!canvasElement) return;
      this.canvas = canvasElement;
      this.ctx = canvasElement.getContext('2d');
      this.resize();
      this.particles = [];
      this.startLoop();
    },

    resize: function () {
      if (!this.canvas) return;
      const rect = this.canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      this.width = rect.width || 800;
      this.height = 230;

      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.canvas.style.width = this.width + 'px';
      this.canvas.style.height = this.height + 'px';

      if (this.ctx) {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(dpr, dpr);
      }
    },

    startLoop: function () {
      if (this.animationId) cancelAnimationFrame(this.animationId);
      const loop = () => {
        this.update();
        this.render();
        this.animationId = requestAnimationFrame(loop);
      };
      this.animationId = requestAnimationFrame(loop);
    },

    stopLoop: function () {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
    },

    spawnParticle: function (x, y, color = '#38bdf8') {
      this.particles.push({
        x: x + (Math.random() - 0.5) * 15,
        y: y + (Math.random() - 0.5) * 15,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2 + 1,
        alpha: 0.8,
        color: color
      });
      if (this.particles.length > 50) this.particles.shift();
    },

    update: function () {
      // Update particles
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;
        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
        }
      }

      // State progression
      if (this.state === 'SENDER_TO_ROUTER') {
        this.progress += this.speed;
        if (this.progress >= 0.5) {
          this.progress = 0.5;
          this.state = 'ROUTER_PAUSED';
          HammingHeroGame.onRouterReached();
        }
      } else if (this.state === 'ROUTER_TO_RECEIVER') {
        this.progress += this.speed;
        if (this.progress >= 1.0) {
          this.progress = 1.0;
          this.state = 'RECEIVER_LANDED';
          HammingHeroGame.onReceiverReached();
        }
      }
    },

    render: function () {
      if (!this.ctx) return;
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;

      ctx.clearRect(0, 0, w, h);

      // 1. Cyber Grid Background
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
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

      // 2. Node Positions
      const senderX = 90;
      const routerX = w / 2;
      const receiverX = w - 90;
      const centerY = h / 2 - 5;

      // 3. Transmission Cable
      // Leg 1: Sender -> Router
      ctx.beginPath();
      ctx.moveTo(senderX, centerY);
      ctx.lineTo(routerX, centerY);
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Leg 2: Router -> Receiver
      ctx.beginPath();
      ctx.moveTo(routerX, centerY);
      ctx.lineTo(receiverX, centerY);
      ctx.strokeStyle = this.hasError ? '#ef4444' : '#10b981';
      ctx.lineWidth = 4;
      ctx.shadowColor = this.hasError ? '#ef4444' : '#10b981';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw particle trails
      for (let p of this.particles) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 4. Moving Data Packet
      if (this.state === 'SENDER_TO_ROUTER' || this.state === 'ROUTER_PAUSED' || this.state === 'ROUTER_TO_RECEIVER') {
        let currentX = senderX + (receiverX - senderX) * this.progress;
        let currentY = centerY;

        // Spawn particles
        const trailColor = this.progress > 0.5 && this.hasError ? '#ef4444' : '#38bdf8';
        this.spawnParticle(currentX, currentY, trailColor);

        // Draw packet badge
        ctx.save();
        ctx.shadowColor = this.hasError && this.progress >= 0.5 ? 'rgba(239, 68, 68, 0.9)' : 'rgba(56, 189, 248, 0.9)';
        ctx.shadowBlur = 14;

        ctx.fillStyle = this.hasError && this.progress >= 0.5 ? '#7f1d1d' : '#0369a1';
        ctx.strokeStyle = this.hasError && this.progress >= 0.5 ? '#f87171' : '#38bdf8';
        ctx.lineWidth = 2;

        const pWidth = 84;
        const pHeight = 28;
        ctx.beginPath();
        ctx.roundRect(currentX - pWidth / 2, currentY - pHeight / 2, pWidth, pHeight, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const displayLabel = this.packetBits.length > 7 ? `${this.packetBits.substring(0, 7)}…` : this.packetBits;
        ctx.fillText(displayLabel, currentX, currentY);
        ctx.restore();
      }

      // 5. Draw 3 Network Nodes
      this.drawNode(senderX, centerY, 'Sender', '#0ea5e9', 'fa-server', 'TX Host');
      this.drawNode(routerX, centerY, 'Router', '#a855f7', 'fa-router', this.state === 'ROUTER_PAUSED' ? 'Noise Point' : 'Channel');
      this.drawNode(receiverX, centerY, 'Receiver', '#10b981', 'fa-shield-halved', 'RX Host');
    },

    drawNode: function (x, y, title, color, iconClass, sublabel) {
      const ctx = this.ctx;

      // Glow circle
      ctx.save();
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.arc(x, y, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Node Title & Sublabel
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(title, x, y + 42);

      ctx.fillStyle = color;
      ctx.font = '9px "Fira Code", monospace';
      ctx.fillText(sublabel, x, y + 56);
    }
  };

  // ==========================================
  // 4. HAMMING GAME STATE
  // ==========================================
  const HammingGameState = {
    mode: '7-4', // '7-4' or '12-8'
    gameType: 'challenge', // 'challenge' or 'sandbox'
    currentLevel: 1,
    maxLevel: 5,
    score: 0,
    streak: 0,
    currentPhase: 'SENDER_INPUT', 
    // Phases: 'SENDER_INPUT', 'PARITY_CALC', 'FRAME_PREP', 'TRANSMIT_TO_ROUTER', 'ROUTER_PAUSE', 'TRANSMIT_TO_RECEIVER', 'RECEIVER_SYNDROME', 'CORRECTION', 'RESULTS'

    // Active transmission telemetry
    inputData: '1011',
    encodedData: '',
    encodedBitObjects: [],
    parityDetails: [],

    // Noise injection at router
    errorInjected: false,
    corruptedBitPos: 0, // 1-based index (0 if clean)
    transmittedFrame: '',

    // Receiver telemetry
    syndromeResult: null,
    correctionResult: null,

    // Challenge Level Presets
    levels: [
      {
        level: 1,
        title: 'Level 1: Clean Transmission',
        description: 'Encode 4-bit data "1011" into Hamming (7,4). Transmit clean with zero noise and verify syndrome 000.',
        mode: '7-4',
        presetData: '1011',
        allowError: true,
        recommendedChoice: 'clean',
        targetScore: 100
      },
      {
        level: 2,
        title: 'Level 2: Parity Bit Sabotage',
        description: 'Encode "1100". Introduce a 1-bit noise error at Parity Bit P2 (pos 2). Observe syndrome 010 (pos 2) and verify data integrity.',
        mode: '7-4',
        presetData: '1100',
        allowError: true,
        recommendedChoice: 'error',
        forcedErrorPos: 2,
        targetScore: 150
      },
      {
        level: 3,
        title: 'Level 3: Data Bit Corruption',
        description: 'Encode "1010". Flip Data Bit D2 (pos 5). Observe syndrome 101 (pos 5), auto-correct the corrupted bit, and recover original data.',
        mode: '7-4',
        presetData: '1010',
        allowError: true,
        recommendedChoice: 'error',
        forcedErrorPos: 5,
        targetScore: 200
      },
      {
        level: 4,
        title: 'Level 4: Blind Noise Defense',
        description: 'Encode custom or randomized 4-bit frame. Inject noise into an arbitrary bit and let the syndrome pinpoint and repair it.',
        mode: '7-4',
        presetData: '1101',
        allowError: true,
        targetScore: 250
      },
      {
        level: 5,
        title: 'Level 5: Master Byte (Hamming 12,8)',
        description: 'Graduate to 8-bit byte encoding with 4 parity bits (P1, P2, P4, P8). Defeat 12-bit noise using 4-bit syndrome S8 S4 S2 S1.',
        mode: '12-8',
        presetData: '10110010',
        allowError: true,
        targetScore: 350
      }
    ],

    setLevel: function (lvl) {
      if (lvl < 1) lvl = 1;
      if (lvl > this.maxLevel) lvl = this.maxLevel;
      this.currentLevel = lvl;
      const cfg = this.levels[lvl - 1];
      this.mode = cfg.mode;
      this.inputData = cfg.presetData;
      this.resetRound();
    },

    resetRound: function () {
      this.currentPhase = 'SENDER_INPUT';
      this.encodedData = '';
      this.encodedBitObjects = [];
      this.parityDetails = [];
      this.errorInjected = false;
      this.corruptedBitPos = 0;
      this.transmittedFrame = '';
      this.syndromeResult = null;
      this.correctionResult = null;
      HammingTransmissionSystem.state = 'IDLE';
      HammingTransmissionSystem.progress = 0;
      HammingTransmissionSystem.hasError = false;
    },

    resetSession: function () {
      this.score = 0;
      this.streak = 0;
      this.setLevel(1);
    }
  };

  // ==========================================
  // 5. HAMMING BIT DISPLAY (HTML Helper)
  // ==========================================
  const HammingBitDisplay = {
    renderBitsRow: function (bitObjects, options = {}) {
      const {
        interactive = false,
        activeCorruptedPos = 0,
        activeCorrectedPos = 0,
        onClickHandlerName = 'HammingHeroGame.onBitClicked'
      } = options;

      let html = '<div class="hamming-bit-row">';

      for (let i = 0; i < bitObjects.length; i++) {
        const bit = bitObjects[i];
        const isCorrupted = activeCorruptedPos === bit.pos;
        const isCorrected = activeCorrectedPos === bit.pos;

        let boxClass = 'hamming-bit-box';
        if (isCorrupted) {
          boxClass += ' bit-corrupted';
        } else if (isCorrected) {
          boxClass += ' bit-corrected';
        } else if (bit.isParity) {
          boxClass += ' bit-parity';
        } else {
          boxClass += ' bit-data';
        }

        if (interactive) {
          boxClass += ' interactive';
        }

        const clickAttr = interactive ? `onclick="${onClickHandlerName}(${bit.pos})"` : '';
        const nameBadgeClass = bit.isParity ? 'badge-parity' : 'badge-data';

        html += `
          <div class="hamming-bit-slot">
            <span class="hamming-bit-pos-badge">#${bit.pos}</span>
            <div class="${boxClass}" ${clickAttr} title="Position #${bit.pos} — ${bit.name}">
              ${bit.value}
            </div>
            <span class="hamming-bit-name-badge ${nameBadgeClass}">${bit.name}</span>
          </div>
        `;
      }

      html += '</div>';
      return html;
    }
  };

  // ==========================================
  // 6. HAMMING EDUCATIONAL PANEL (10 Topics)
  // ==========================================
  const HammingEducationalPanel = {
    topics: [
      {
        id: 'ecc-vs-detection',
        title: '1. Error Detection vs Error Correction (ECC)',
        content: `
          <p>Traditional error detection schemes such as <strong>Parity Checks</strong>, <strong>Checksums</strong>, and <strong>CRC</strong> can tell a receiver that data arrived corrupted, but they cannot pinpoint <em>which</em> bit is wrong. Consequently, the receiver must discard the frame and request a retransmission (ARQ).</p>
          <p class="mt-2"><strong>Forward Error Correction (FEC)</strong>, pioneered by Hamming code, embeds sufficient algebraic redundancy so that the receiver can both <strong>detect</strong> the corruption and mathematically <strong>correct</strong> it in real time without contacting the sender.</p>
        `
      },
      {
        id: 'hamming-history',
        title: '2. Richard Hamming & Bell Labs 1950',
        content: `
          <p>In the late 1940s, mathematician <strong>Richard W. Hamming</strong> was working at Bell Telephone Laboratories on punch-card electromechanical computers. Punch card readers frequently failed on weekends, causing the computer to stop and dump memory.</p>
          <p class="mt-2">Frustrated by wasted time, Hamming stated: <em>"Damn it, if the machine can detect that there's an error, why can't it locate where the error is and fix it?"</em> This led to his foundational 1950 paper <em>Error Detecting and Error Correcting Codes</em>.</p>
        `
      },
      {
        id: 'hamming-distance',
        title: '3. Hamming Distance & Detection vs Correction Bound',
        content: `
          <p>The <strong>Hamming Distance</strong> $d(c_1, c_2)$ between two binary codewords is the number of bit positions in which they differ. The minimum distance $d_{min}$ of a code determines its error capabilities:</p>
          <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>To <strong>detect</strong> up to $s$ errors: $d_{min} \\ge s + 1$</li>
            <li>To <strong>correct</strong> up to $t$ errors: $d_{min} \\ge 2t + 1$</li>
          </ul>
          <p class="mt-2">Standard Hamming (7,4) has $d_{min} = 3$. Therefore it can detect up to 2 single-bit errors or reliably correct <strong>1 single-bit error</strong>.</p>
        `
      },
      {
        id: 'parity-placement',
        title: '4. Parity Bit Placement ($2^k$ Powers of 2)',
        content: `
          <p>Hamming codes use <strong>1-based bit indexing</strong>. Parity check bits are strategically assigned to bit positions that are powers of two:</p>
          <div class="p-2 bg-slate-900 rounded font-mono text-cyan-400 my-2">
            Positions: 1 ($2^0$), 2 ($2^1$), 4 ($2^2$), 8 ($2^3$), 16 ($2^4$)...
          </div>
          <p>Because each power of 2 has exactly <strong>one set bit</strong> in its binary position index ($1 = 001_2, 2 = 010_2, 4 = 100_2$), each parity bit serves as an independent coordinate basis vector!</p>
        `
      },
      {
        id: 'data-placement',
        title: '5. Data Bit Placement (Remaining Non-Power Positions)',
        content: `
          <p>Data bits occupy all remaining 1-based bit positions that are <strong>not</strong> powers of two:</p>
          <div class="p-2 bg-slate-900 rounded font-mono text-purple-300 my-2">
            Hamming (7,4): Pos 3 (D1), Pos 5 (D2), Pos 6 (D3), Pos 7 (D4)<br>
            Hamming (12,8): Pos 3 (D1), 5 (D2), 6 (D3), 7 (D4), 9 (D5), 10 (D6), 11 (D7), 12 (D8)
          </div>
          <p>Total codeword length $n = k + r$, where $k$ is number of data bits and $r$ is number of parity bits satisfying $2^r \\ge k + r + 1$.</p>
        `
      },
      {
        id: 'xor-parity-calc',
        title: '6. Even Parity XOR Equations for Hamming (7,4)',
        content: `
          <p>In even parity, each parity bit is chosen such that the total number of 1s in its monitored group is even (Modulo-2 XOR sum equals 0):</p>
          <ul class="list-disc pl-5 mt-2 space-y-1 font-mono text-xs">
            <li><strong>P1</strong> covers positions with bit 0 set: {1, 3, 5, 7} &rarr; $P_1 = D_1 \\oplus D_2 \\oplus D_4$</li>
            <li><strong>P2</strong> covers positions with bit 1 set: {2, 3, 6, 7} &rarr; $P_2 = D_1 \\oplus D_3 \\oplus D_4$</li>
            <li><strong>P4</strong> covers positions with bit 2 set: {4, 5, 6, 7} &rarr; $P_4 = D_2 \\oplus D_3 \\oplus D_4$</li>
          </ul>
        `
      },
      {
        id: 'coverage-matrix',
        title: '7. Binary Bit Representation & Coverage Matrix',
        content: `
          <p>Why do these specific positions get checked by each parity bit? Examine the 3-bit binary representation of each position 1 to 7:</p>
          <div class="overflow-x-auto my-2">
            <table class="w-full text-left text-xs font-mono border border-slate-700">
              <thead class="bg-slate-800 text-cyan-300">
                <tr><th class="p-1 border border-slate-700">Pos</th><th class="p-1 border border-slate-700">Binary</th><th class="p-1 border border-slate-700">Role</th><th class="p-1 border border-slate-700">Covered By</th></tr>
              </thead>
              <tbody class="text-slate-300">
                <tr><td class="p-1 border border-slate-700">1</td><td class="p-1 border border-slate-700">001</td><td class="p-1 border border-slate-700">P1</td><td class="p-1 border border-slate-700">P1</td></tr>
                <tr><td class="p-1 border border-slate-700">2</td><td class="p-1 border border-slate-700">010</td><td class="p-1 border border-slate-700">P2</td><td class="p-1 border border-slate-700">P2</td></tr>
                <tr><td class="p-1 border border-slate-700">3</td><td class="p-1 border border-slate-700">011</td><td class="p-1 border border-slate-700">D1</td><td class="p-1 border border-slate-700">P1, P2</td></tr>
                <tr><td class="p-1 border border-slate-700">4</td><td class="p-1 border border-slate-700">100</td><td class="p-1 border border-slate-700">P4</td><td class="p-1 border border-slate-700">P4</td></tr>
                <tr><td class="p-1 border border-slate-700">5</td><td class="p-1 border border-slate-700">101</td><td class="p-1 border border-slate-700">D2</td><td class="p-1 border border-slate-700">P1, P4</td></tr>
                <tr><td class="p-1 border border-slate-700">6</td><td class="p-1 border border-slate-700">110</td><td class="p-1 border border-slate-700">D3</td><td class="p-1 border border-slate-700">P2, P4</td></tr>
                <tr><td class="p-1 border border-slate-700">7</td><td class="p-1 border border-slate-700">111</td><td class="p-1 border border-slate-700">D4</td><td class="p-1 border border-slate-700">P1, P2, P4</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        id: 'syndrome-decoding',
        title: '8. Receiver Syndrome Calculation ($S_4 S_2 S_1$)',
        content: `
          <p>At the receiver, syndrome bits are independently evaluated over the incoming frame:</p>
          <ul class="list-disc pl-5 mt-2 space-y-1 font-mono text-xs">
            <li>$S_1 = b_1 \\oplus b_3 \\oplus b_5 \\oplus b_7$</li>
            <li>$S_2 = b_2 \\oplus b_3 \\oplus b_6 \\oplus b_7$</li>
            <li>$S_4 = b_4 \\oplus b_5 \\oplus b_6 \\oplus b_7$</li>
          </ul>
          <p class="mt-2">Syndrome word $S = (S_4 S_2 S_1)_2$. If $S = 000_2$, no single-bit error occurred. If $S > 0$, the decimal value of $S$ is <strong>the exact 1-based index of the erroneous bit</strong>!</p>
        `
      },
      {
        id: 'bit-correction',
        title: '9. Single-Bit Inversion & Data Payload Extraction',
        content: `
          <p>Once the error index $S$ is known, correction is instantaneous:</p>
          <div class="p-2 bg-slate-900 rounded font-mono text-emerald-400 my-2">
            bit[S] = bit[S] ⊕ 1  (flip 0 &harr; 1)
          </div>
          <p>After inverting the corrupted bit, original data bits are harvested directly from their fixed positions ($D_1$ from pos 3, $D_2$ from pos 5, $D_3$ from pos 6, $D_4$ from pos 7).</p>
        `
      },
      {
        id: 'secded-limitations',
        title: '10. Limitations: SECDED Extension (Double Error Detection)',
        content: `
          <p>Standard Hamming (7,4) is a <strong>Single Error Correction (SEC)</strong> code. If two bits flip during transmission, the syndrome calculation erroneously points to a third completely incorrect bit!</p>
          <p class="mt-2">To prevent miscorrection, modern ECC memory (e.g. DDR5 ECC) adds an extra overall parity bit $P_0$ across the entire codeword. This provides <strong>SECDED (Single Error Correction, Double Error Detection)</strong> with minimum distance $d_{min} = 4$.</p>
        `
      }
    ],

    renderAccordion: function () {
      let html = '<div class="space-y-2 mt-4">';
      this.topics.forEach((t, idx) => {
        html += `
          <div class="hamming-edu-card">
            <div class="hamming-edu-header" onclick="HammingHeroGame.toggleEduTopic('edu-${t.id}')">
              <span><i class="fa-solid fa-graduation-cap text-cyan-400 mr-2"></i> ${t.title}</span>
              <i id="icon-edu-${t.id}" class="fa-solid fa-chevron-down text-xs transition-transform"></i>
            </div>
            <div id="edu-${t.id}" class="hamming-edu-body hidden">
              ${t.content}
            </div>
          </div>
        `;
      });
      html += '</div>';
      return html;
    }
  };

  // ==========================================
  // 7. HAMMING HERO GAME MASTER CONTROLLER
  // ==========================================
  const HammingHeroGame = {
    container: null,

    render: function (containerElement) {
      if (!containerElement) {
        containerElement = document.getElementById('main-content') || document.getElementById('main-content-container');
      }
      if (!containerElement) return;
      this.container = containerElement;

      // Render outer arcade wrapper
      containerElement.innerHTML = `
        <div class="hamming-wrapper">
          <!-- Top HUD Header -->
          <div class="hamming-hud-header">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-400 text-purple-300 flex items-center justify-center shadow-lg">
                  <i class="fa-solid fa-wand-magic-sparkles text-lg"></i>
                </div>
                <div>
                  <h2 class="text-lg font-black text-white tracking-wide flex items-center gap-2">
                    HAMMING HERO
                    <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-600/40">
                      Error Correction Challenge
                    </span>
                  </h2>
                  <p class="text-xs text-purple-400 font-semibold">Detect the Error • Locate the Position • Correct the Data</p>
                </div>
              </div>

              <!-- HUD Badges & Actions -->
              <div class="flex items-center gap-3">
                <div class="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
                  <i class="fa-solid fa-star text-amber-400"></i>
                  <span class="text-gray-400 font-medium">XP:</span>
                  <span id="hamming-score-val" class="font-bold text-amber-300 font-mono">${HammingGameState.score}</span>
                </div>

                <div class="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
                  <i class="fa-solid fa-bolt text-cyan-400"></i>
                  <span class="text-gray-400 font-medium">Streak:</span>
                  <span id="hamming-streak-val" class="font-bold text-cyan-300 font-mono">${HammingGameState.streak}</span>
                </div>

                <button onclick="HammingHeroGame.toggleMute()" class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 flex items-center justify-center transition-colors" title="Toggle Sound">
                  <i id="hamming-sound-icon" class="fa-solid ${HammingSoundSystem.muted ? 'fa-volume-xmark text-red-400' : 'fa-volume-high text-cyan-400'} text-xs"></i>
                </button>

                <button onclick="HammingHeroGame.resetGame()" class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 flex items-center justify-center transition-colors" title="Reset Session">
                  <i class="fa-solid fa-rotate-right text-gray-400 text-xs"></i>
                </button>
              </div>
            </div>

            <!-- Mode & Level Selector Row -->
            <div class="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-800">
              <div class="flex items-center gap-2">
                <button class="hamming-mode-tab ${HammingGameState.gameType === 'challenge' ? 'active' : ''}" onclick="HammingHeroGame.switchGameType('challenge')">
                  <i class="fa-solid fa-gamepad mr-1"></i> Challenge Mode
                </button>
                <button class="hamming-mode-tab ${HammingGameState.gameType === 'sandbox' ? 'active' : ''}" onclick="HammingHeroGame.switchGameType('sandbox')">
                  <i class="fa-solid fa-flask mr-1"></i> Sandbox Lab
                </button>
              </div>

              <!-- Level Indicators (in Challenge Mode) -->
              <div id="hamming-level-selector" class="flex items-center gap-1.5 ${HammingGameState.gameType === 'challenge' ? '' : 'hidden'}">
                <span class="text-xs font-bold text-gray-400 uppercase mr-1">Level:</span>
                ${[1, 2, 3, 4, 5].map(lvl => `
                  <button onclick="HammingHeroGame.selectLevel(${lvl})" class="w-7 h-7 rounded text-xs font-mono font-bold transition-all ${HammingGameState.currentLevel === lvl ? 'bg-purple-600 text-white shadow-[0_0_10px_#a855f7]' : 'bg-slate-800 text-gray-400 hover:bg-slate-700 border border-slate-700'}">
                    ${lvl}
                  </button>
                `).join('')}
              </div>

              <!-- Code Mode Selector (in Sandbox Mode) -->
              <div id="hamming-code-selector" class="flex items-center gap-2 ${HammingGameState.gameType === 'sandbox' ? '' : 'hidden'}">
                <span class="text-xs font-bold text-gray-400 uppercase">Architecture:</span>
                <button class="px-2.5 py-1 text-xs rounded font-bold border transition-all ${HammingGameState.mode === '7-4' ? 'bg-purple-600 text-white border-purple-400' : 'bg-slate-800 text-gray-300 border-slate-700'}" onclick="HammingHeroGame.switchCodeMode('7-4')">
                  Hamming (7,4)
                </button>
                <button class="px-2.5 py-1 text-xs rounded font-bold border transition-all ${HammingGameState.mode === '12-8' ? 'bg-purple-600 text-white border-purple-400' : 'bg-slate-800 text-gray-300 border-slate-700'}" onclick="HammingHeroGame.switchCodeMode('12-8')">
                  Hamming (12,8)
                </button>
              </div>
            </div>
          </div>

          <!-- Transmission Arena Canvas -->
          <div class="hamming-arena-container">
            <canvas id="hamming-canvas" class="hamming-arena-canvas"></canvas>
          </div>

          <!-- Status Phase Banner -->
          <div id="hamming-status-banner" class="hamming-status-banner">
            <!-- Dynamic Status Content -->
          </div>

          <!-- Active Stage Working Panel -->
          <div id="hamming-stage-panel" class="hamming-stage-panel">
            <!-- Dynamic Step Content -->
          </div>

          <!-- Educational Reference Section -->
          <div class="p-5 border-t border-slate-800 bg-slate-950/70">
            <h3 class="text-sm font-black uppercase tracking-wider text-purple-400 flex items-center gap-2">
              <i class="fa-solid fa-book-bookmark"></i> Hamming Code Reference Manual & Theory
            </h3>
            ${HammingEducationalPanel.renderAccordion()}
          </div>
        </div>
      `;

      // Initialize transmission canvas
      const canvas = document.getElementById('hamming-canvas');
      HammingTransmissionSystem.init(canvas);

      // Render active stage
      this.renderActiveStage();
    },

    // Switch between Challenge and Sandbox Lab
    switchGameType: function (type) {
      HammingGameState.gameType = type;
      HammingSoundSystem.click();
      this.render();
    },

    // Switch between Hamming (7,4) and Hamming (12,8) in sandbox
    switchCodeMode: function (mode) {
      HammingGameState.mode = mode;
      HammingGameState.inputData = mode === '12-8' ? '10110010' : '1011';
      HammingSoundSystem.click();
      HammingGameState.resetRound();
      this.render();
    },

    // Select a level
    selectLevel: function (lvl) {
      HammingGameState.setLevel(lvl);
      HammingSoundSystem.click();
      this.render();
    },

    // Update banner text
    updateBanner: function (phaseText, instructionText, badgeHtml = '') {
      const banner = document.getElementById('hamming-status-banner');
      if (!banner) return;
      banner.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
          <div>
            <span class="text-cyan-400 font-bold uppercase tracking-wider text-xs">${phaseText}</span>
            <span class="text-slate-300 ml-2 text-xs font-medium">${instructionText}</span>
          </div>
        </div>
        <div>${badgeHtml}</div>
      `;
    },

    // Main Stage Dispatcher
    renderActiveStage: function () {
      const panel = document.getElementById('hamming-stage-panel');
      if (!panel) return;

      const phase = HammingGameState.currentPhase;

      if (phase === 'SENDER_INPUT') {
        this.renderSenderInputStage(panel);
      } else if (phase === 'PARITY_CALC') {
        this.renderParityCalcStage(panel);
      } else if (phase === 'ROUTER_PAUSE') {
        this.renderRouterPauseStage(panel);
      } else if (phase === 'RECEIVER_SYNDROME') {
        this.renderReceiverSyndromeStage(panel);
      } else if (phase === 'CORRECTION') {
        this.renderCorrectionStage(panel);
      } else if (phase === 'RESULTS') {
        this.renderResultsStage(panel);
      }
    },

    // ----------------------------------------------------
    // STAGE 1: SENDER DATA WORD INPUT
    // ----------------------------------------------------
    renderSenderInputStage: function (panel) {
      const isLvl = HammingGameState.gameType === 'challenge';
      const lvlCfg = isLvl ? HammingGameState.levels[HammingGameState.currentLevel - 1] : null;
      const mode = HammingGameState.mode;
      const layout = HammingMathEngine.getLayout(mode);

      this.updateBanner(
        'Phase 1: Sender Input',
        `Enter or select a ${layout.dataBitsCount}-bit data word to encode into ${layout.name}.`,
        `<span class="text-[10px] bg-sky-950 text-sky-300 border border-sky-800 px-2 py-0.5 rounded font-mono">${layout.name}</span>`
      );

      const presets = mode === '12-8' 
        ? ['10110010', '11001101', '01011010', '11110000', '00001111']
        : ['1011', '1100', '1010', '0101', '1111', '0000', '1001'];

      panel.innerHTML = `
        <div class="max-w-2xl mx-auto space-y-5">
          ${isLvl ? `
            <div class="bg-purple-950/40 border border-purple-500/30 rounded-xl p-3.5 flex items-start gap-3">
              <i class="fa-solid fa-flag-checkered text-purple-400 text-lg mt-0.5"></i>
              <div>
                <h4 class="text-xs font-bold text-purple-200 uppercase tracking-wider">${lvlCfg.title}</h4>
                <p class="text-xs text-purple-300/80 mt-0.5 leading-relaxed">${lvlCfg.description}</p>
              </div>
            </div>
          ` : ''}

          <div class="bg-slate-900/80 border border-slate-700/80 rounded-xl p-5 shadow-xl">
            <label class="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
              <i class="fa-solid fa-microchip text-cyan-400 mr-1.5"></i> Sender Data Payload (${layout.dataBitsCount} Bits)
            </label>
            <div class="flex items-center gap-3">
              <input type="text" id="hamming-data-input" value="${HammingGameState.inputData}" maxlength="${layout.dataBitsCount}" class="flex-1 bg-slate-950 border border-cyan-500/40 rounded-lg px-4 py-2.5 font-mono text-lg font-bold text-cyan-300 tracking-widest focus:outline-none focus:border-cyan-400" placeholder="e.g. ${presets[0]}" oninput="HammingHeroGame.onDataInputChanged(this.value)">
              <button onclick="HammingHeroGame.proceedToEncoding()" class="hamming-btn hamming-btn-cyan">
                <i class="fa-solid fa-calculator"></i> Calculate Parity
              </button>
            </div>
            <div id="hamming-input-error" class="text-xs text-red-400 mt-2 hidden font-mono"></div>

            <!-- Quick Presets -->
            <div class="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2">
              <span class="text-[11px] font-bold text-gray-400 uppercase">Presets:</span>
              ${presets.map(p => `
                <button onclick="HammingHeroGame.applyPreset('${p}')" class="px-2.5 py-1 text-xs font-mono font-bold rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors">
                  ${p}
                </button>
              `).join('')}
              <button onclick="HammingHeroGame.applyRandomPreset()" class="px-2.5 py-1 text-xs font-mono font-bold rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-colors">
                <i class="fa-solid fa-shuffle mr-1"></i> Random
              </button>
            </div>
          </div>
        </div>
      `;
    },

    onDataInputChanged: function (val) {
      HammingGameState.inputData = val.trim();
      const errBox = document.getElementById('hamming-input-error');
      if (errBox) errBox.classList.add('hidden');
    },

    applyPreset: function (val) {
      HammingGameState.inputData = val;
      const inp = document.getElementById('hamming-data-input');
      if (inp) inp.value = val;
      HammingSoundSystem.click();
    },

    applyRandomPreset: function () {
      const mode = HammingGameState.mode;
      const count = mode === '12-8' ? 8 : 4;
      let rand = '';
      for (let i = 0; i < count; i++) {
        rand += Math.random() < 0.5 ? '0' : '1';
      }
      this.applyPreset(rand);
    },

    proceedToEncoding: function () {
      const mode = HammingGameState.mode;
      const layout = HammingMathEngine.getLayout(mode);
      const val = HammingGameState.inputData;

      if (!HammingMathEngine.isValidBinary(val, layout.dataBitsCount)) {
        const errBox = document.getElementById('hamming-input-error');
        if (errBox) {
          errBox.textContent = `Error: Please enter exactly ${layout.dataBitsCount} binary bits (0s and 1s only).`;
          errBox.classList.remove('hidden');
        }
        HammingSoundSystem.glitch();
        return;
      }

      // Calculate parity
      const encodeRes = HammingMathEngine.encodeHamming(val, mode);
      HammingGameState.encodedData = encodeRes.encodedBits;
      HammingGameState.encodedBitObjects = encodeRes.bitObjects;
      HammingGameState.parityDetails = encodeRes.parityDetails;
      HammingGameState.currentPhase = 'PARITY_CALC';

      HammingSoundSystem.encode();
      this.renderActiveStage();
    },

    // ----------------------------------------------------
    // STAGE 2: STEP-BY-STEP PARITY CALCULATIONS
    // ----------------------------------------------------
    renderParityCalcStage: function (panel) {
      const mode = HammingGameState.mode;
      const layout = HammingMathEngine.getLayout(mode);

      this.updateBanner(
        'Phase 2: Parity Generation (Sender)',
        `Parity bits calculated using Modulo-2 XOR over monitored bit positions (Even Parity).`,
        `<span class="text-[10px] bg-purple-950 text-purple-300 border border-purple-800 px-2 py-0.5 rounded font-mono">Frame Length: ${layout.totalBits} Bits</span>`
      );

      panel.innerHTML = `
        <div class="max-w-3xl mx-auto space-y-5">
          <!-- Step 1: Encoded Bit Frame Preview -->
          <div class="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4 shadow-xl">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold text-gray-300 uppercase tracking-wider">
                <i class="fa-solid fa-diagram-project text-cyan-400 mr-1.5"></i> Generated ${layout.name} Frame
              </span>
              <div class="flex items-center gap-3 text-[10px] font-bold uppercase">
                <span class="flex items-center gap-1 text-cyan-400"><span class="w-2.5 h-2.5 rounded bg-sky-500/30 border border-sky-400"></span> Data Bits (${layout.dataBitsCount})</span>
                <span class="flex items-center gap-1 text-purple-400"><span class="w-2.5 h-2.5 rounded bg-purple-500/30 border border-purple-400"></span> Parity Bits (${layout.parityBitsCount})</span>
              </div>
            </div>
            ${HammingBitDisplay.renderBitsRow(HammingGameState.encodedBitObjects)}
          </div>

          <!-- Step 2: Parity Equation Breakdown -->
          <div class="hamming-calc-box space-y-3">
            <h4 class="text-xs font-bold uppercase text-purple-300 tracking-wider flex items-center gap-2">
              <i class="fa-solid fa-square-root-variable"></i> Step-by-Step Even Parity Equations
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              ${HammingGameState.parityDetails.map(p => `
                <div class="p-3 rounded-lg bg-slate-900/90 border border-purple-500/20">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-bold text-purple-400">${p.name} (Position #${p.pos})</span>
                    <span class="px-2 py-0.5 text-xs font-bold rounded bg-purple-950 text-purple-300 border border-purple-800">Val = ${p.value}</span>
                  </div>
                  <div class="text-[11px] text-gray-300 leading-relaxed font-mono mt-1">
                    ${p.xorExpr}
                  </div>
                  <div class="text-[9px] text-gray-400 mt-1">
                    Monitors positions where pos &amp; ${p.pos} &ne; 0
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-between pt-2">
            <button onclick="HammingHeroGame.editInputs()" class="hamming-btn hamming-btn-secondary">
              <i class="fa-solid fa-arrow-left"></i> Edit Data
            </button>
            <button onclick="HammingHeroGame.startTransmissionToRouter()" class="hamming-btn hamming-btn-cyan">
              <i class="fa-solid fa-paper-plane"></i> Transmit Frame to Router <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      `;
    },

    editInputs: function () {
      HammingGameState.currentPhase = 'SENDER_INPUT';
      HammingSoundSystem.click();
      this.renderActiveStage();
    },

    startTransmissionToRouter: function () {
      HammingGameState.currentPhase = 'TRANSMIT_TO_ROUTER';
      HammingTransmissionSystem.packetBits = HammingGameState.encodedData;
      HammingTransmissionSystem.state = 'SENDER_TO_ROUTER';
      HammingTransmissionSystem.progress = 0;
      HammingTransmissionSystem.hasError = false;

      HammingSoundSystem.transmit();

      this.updateBanner(
        'Transmitting...',
        'Encoded frame traversing fiber-optic link from Sender to intermediate Router.',
        '<span class="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded font-mono">In Transit</span>'
      );

      const panel = document.getElementById('hamming-stage-panel');
      if (panel) {
        panel.innerHTML = `
          <div class="text-center py-8">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-900/30 border border-cyan-400 text-cyan-400 animate-spin mb-3">
              <i class="fa-solid fa-arrows-rotate text-lg"></i>
            </div>
            <h4 class="text-sm font-bold text-gray-200">Frame Traveling to Router Node...</h4>
            <p class="text-xs text-gray-400 mt-1">Watch the packet moving across the 2D network wire above.</p>
          </div>
        `;
      }
    },

    onRouterReached: function () {
      HammingGameState.currentPhase = 'ROUTER_PAUSE';
      HammingTransmissionSystem.state = 'ROUTER_PAUSED';
      HammingSoundSystem.click();
      this.renderActiveStage();
    },

    // ----------------------------------------------------
    // STAGE 3: INTERACTIVE NOISE CHAMBER / ROUTER PAUSE
    // ----------------------------------------------------
    renderRouterPauseStage: function (panel) {
      const mode = HammingGameState.mode;
      const layout = HammingMathEngine.getLayout(mode);
      const isLvl = HammingGameState.gameType === 'challenge';
      const lvlCfg = isLvl ? HammingGameState.levels[HammingGameState.currentLevel - 1] : null;

      this.updateBanner(
        'Phase 3: Router Inspection / Noise Injection',
        'Choose whether to deliver frame uncorrupted OR introduce a single-bit error into the transmission.',
        '<span class="text-[10px] bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded font-mono">Router Paused</span>'
      );

      // Build bit representation based on current corruptedBitPos
      const bitObjects = [];
      const orig = HammingGameState.encodedData;
      const currErr = HammingGameState.corruptedBitPos;

      for (let pos = 1; pos <= layout.totalBits; pos++) {
        let val = parseInt(orig[pos - 1], 10);
        if (currErr === pos) {
          val = val === 1 ? 0 : 1; // Flipped
        }
        bitObjects.push({
          pos: pos,
          name: layout.slots[pos - 1].name,
          isParity: layout.slots[pos - 1].isParity,
          value: val
        });
      }

      panel.innerHTML = `
        <div class="max-w-3xl mx-auto space-y-5">
          <!-- Router Noise Decision Box -->
          <div class="bg-slate-900/90 border border-purple-500/40 rounded-xl p-5 shadow-2xl">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h4 class="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <i class="fa-solid fa-shuffle text-amber-400"></i> Transmission Channel Noise Simulator
                </h4>
                <p class="text-xs text-gray-400 mt-0.5">Click any bit below to inject a 1-bit flip, or choose Option A for clean transmission.</p>
              </div>
              <span class="text-xs px-2.5 py-1 rounded font-bold ${currErr > 0 ? 'bg-red-950 text-red-300 border border-red-700' : 'bg-emerald-950 text-emerald-300 border border-emerald-700'}">
                ${currErr > 0 ? `Corrupted at Pos #${currErr}` : 'Channel Status: Clean'}
              </span>
            </div>

            <!-- Bit Grid Interactive Selection -->
            <div class="p-3 bg-slate-950/70 rounded-xl border border-slate-800 mb-4">
              <div class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 text-center">
                Interactive Bitstream (Click any bit to flip 0 &harr; 1):
              </div>
              ${HammingBitDisplay.renderBitsRow(bitObjects, {
                interactive: true,
                activeCorruptedPos: currErr,
                onClickHandlerName: 'HammingHeroGame.onBitClicked'
              })}
            </div>

            <!-- Quick Options: Option A vs Option B -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <button onclick="HammingHeroGame.chooseOptionA()" class="p-3.5 rounded-lg border text-left transition-all ${currErr === 0 ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-slate-800/60 border-slate-700 text-gray-300 hover:bg-slate-800'}">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-xs uppercase text-emerald-400">Option A: Clean Channel</span>
                  <i class="fa-solid fa-shield-check text-emerald-400"></i>
                </div>
                <p class="text-[11px] text-gray-400 mt-1">Transmit frame uncorrupted with zero noise. Receiver syndrome will equal 000.</p>
              </button>

              <button onclick="HammingHeroGame.chooseOptionB()" class="p-3.5 rounded-lg border text-left transition-all ${currErr > 0 ? 'bg-red-950/60 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'bg-slate-800/60 border-slate-700 text-gray-300 hover:bg-slate-800'}">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-xs uppercase text-red-400">Option B: Inject 1-Bit Error</span>
                  <i class="fa-solid fa-bolt text-red-400"></i>
                </div>
                <p class="text-[11px] text-gray-400 mt-1">Invert a single bit. Receiver will pinpoint error position and execute auto-repair!</p>
              </button>
            </div>
          </div>

          <!-- Forward to Receiver Button -->
          <div class="flex items-center justify-between pt-2">
            <button onclick="HammingHeroGame.editInputs()" class="hamming-btn hamming-btn-secondary">
              <i class="fa-solid fa-arrow-left"></i> Back to Sender
            </button>
            <button onclick="HammingHeroGame.forwardToReceiver()" class="hamming-btn ${currErr > 0 ? 'hamming-btn-danger' : 'hamming-btn-emerald'}">
              <i class="fa-solid fa-paper-plane"></i> Forward to Receiver <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      `;
    },

    chooseOptionA: function () {
      HammingGameState.corruptedBitPos = 0;
      HammingGameState.errorInjected = false;
      HammingTransmissionSystem.hasError = false;
      HammingSoundSystem.click();
      this.renderActiveStage();
    },

    chooseOptionB: function () {
      // If none flipped, pick position 3 (D1) or level preset
      const isLvl = HammingGameState.gameType === 'challenge';
      const lvlCfg = isLvl ? HammingGameState.levels[HammingGameState.currentLevel - 1] : null;
      let targetPos = 3;
      if (lvlCfg && lvlCfg.forcedErrorPos) {
        targetPos = lvlCfg.forcedErrorPos;
      }
      this.onBitClicked(targetPos);
    },

    onBitClicked: function (pos) {
      if (HammingGameState.corruptedBitPos === pos) {
        // Toggle back off
        HammingGameState.corruptedBitPos = 0;
        HammingGameState.errorInjected = false;
        HammingTransmissionSystem.hasError = false;
        HammingSoundSystem.click();
      } else {
        HammingGameState.corruptedBitPos = pos;
        HammingGameState.errorInjected = true;
        HammingTransmissionSystem.hasError = true;
        HammingSoundSystem.glitch();
      }
      this.renderActiveStage();
    },

    forwardToReceiver: function () {
      const mode = HammingGameState.mode;
      const layout = HammingMathEngine.getLayout(mode);

      // Construct transmitted frame
      const orig = HammingGameState.encodedData;
      const chars = orig.split('');
      if (HammingGameState.corruptedBitPos > 0) {
        const idx = HammingGameState.corruptedBitPos - 1;
        chars[idx] = chars[idx] === '1' ? '0' : '1';
      }
      const transmitted = chars.join('');
      HammingGameState.transmittedFrame = transmitted;

      // Start transmission to receiver
      HammingGameState.currentPhase = 'TRANSMIT_TO_RECEIVER';
      HammingTransmissionSystem.packetBits = transmitted;
      HammingTransmissionSystem.state = 'ROUTER_TO_RECEIVER';
      HammingTransmissionSystem.progress = 0.5;
      HammingTransmissionSystem.hasError = HammingGameState.corruptedBitPos > 0;

      HammingSoundSystem.transmit();

      this.updateBanner(
        'In Transit to Receiver...',
        'Frame traversing from Router to Receiver terminal.',
        '<span class="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded font-mono">Channel Leg 2</span>'
      );

      const panel = document.getElementById('hamming-stage-panel');
      if (panel) {
        panel.innerHTML = `
          <div class="text-center py-8">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-full ${HammingGameState.corruptedBitPos > 0 ? 'bg-red-900/30 border-red-500 text-red-400' : 'bg-emerald-900/30 border-emerald-500 text-emerald-400'} animate-spin mb-3">
              <i class="fa-solid fa-arrows-rotate text-lg"></i>
            </div>
            <h4 class="text-sm font-bold text-gray-200">Arriving at Receiver Terminal...</h4>
            <p class="text-xs text-gray-400 mt-1">Preparing syndrome parity verification matrix.</p>
          </div>
        `;
      }
    },

    onReceiverReached: function () {
      // Calculate syndrome
      const mode = HammingGameState.mode;
      const transmitted = HammingGameState.transmittedFrame;
      const syndromeRes = HammingMathEngine.calculateSyndrome(transmitted, mode);
      HammingGameState.syndromeResult = syndromeRes;

      HammingGameState.currentPhase = 'RECEIVER_SYNDROME';
      HammingTransmissionSystem.state = 'RECEIVER_LANDED';

      if (syndromeRes.hasError) {
        HammingSoundSystem.glitch();
      } else {
        HammingSoundSystem.verifySuccess();
      }

      this.renderActiveStage();
    },

    // ----------------------------------------------------
    // STAGE 4: RECEIVER SYNDROME CALCULATION
    // ----------------------------------------------------
    renderReceiverSyndromeStage: function (panel) {
      const mode = HammingGameState.mode;
      const layout = HammingMathEngine.getLayout(mode);
      const syn = HammingGameState.syndromeResult;
      const rxFrame = syn.receivedFrame;

      // Construct bit objects for received frame
      const rxBitObjects = [];
      for (let pos = 1; pos <= layout.totalBits; pos++) {
        rxBitObjects.push({
          pos: pos,
          name: layout.slots[pos - 1].name,
          isParity: layout.slots[pos - 1].isParity,
          value: parseInt(rxFrame[pos - 1], 10)
        });
      }

      this.updateBanner(
        'Phase 4: Receiver Syndrome Calculation',
        syn.hasError 
          ? `Non-zero syndrome detected (${syn.syndromeBinary})! Error localized at position #${syn.errorPosition}.`
          : 'Zero syndrome (000)! No errors detected. Data integrity intact.',
        `<span class="text-[10px] ${syn.hasError ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'} px-2 py-0.5 rounded font-mono">Syndrome: ${syn.syndromeBinary} (${syn.syndromeDecimal})</span>`
      );

      panel.innerHTML = `
        <div class="max-w-3xl mx-auto space-y-5">
          <!-- Received Frame Display -->
          <div class="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4 shadow-xl">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold text-gray-300 uppercase tracking-wider">
                <i class="fa-solid fa-inbox text-emerald-400 mr-1.5"></i> Received Frame at Terminal
              </span>
              <span class="text-xs font-mono font-bold ${syn.hasError ? 'text-red-400' : 'text-emerald-400'}">
                ${syn.hasError ? `⚠️ Corruption Detected at Position #${syn.errorPosition}` : '✓ Flawless Reception'}
              </span>
            </div>
            ${HammingBitDisplay.renderBitsRow(rxBitObjects, {
              activeCorruptedPos: syn.errorPosition
            })}
          </div>

          <!-- Syndrome Calculation Breakdown -->
          <div class="hamming-calc-box space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold uppercase text-purple-300 tracking-wider flex items-center gap-2">
                <i class="fa-solid fa-square-binary"></i> Independent Syndrome Bit Calculations
              </h4>
              <span class="text-xs font-mono font-bold text-purple-300">
                S = (${syn.syndromeBinary})₂ = ${syn.syndromeDecimal}
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              ${syn.syndromeDetails.map(s => `
                <div class="p-3 rounded-lg bg-slate-900/90 border ${s.value === 1 ? 'border-red-500/40 bg-red-950/20' : 'border-purple-500/20'}">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-bold ${s.value === 1 ? 'text-red-400' : 'text-purple-400'}">${s.name} (Checks 2^${Math.log2(s.pos)})</span>
                    <span class="px-2 py-0.5 text-xs font-bold rounded ${s.value === 1 ? 'bg-red-950 text-red-300 border border-red-700' : 'bg-purple-950 text-purple-300 border border-purple-800'}">Bit = ${s.value}</span>
                  </div>
                  <div class="text-[11px] text-gray-300 leading-relaxed font-mono mt-1">
                    ${s.xorExpr}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Syndrome Verdict Card -->
          <div class="hamming-syndrome-pointer">
            ${syn.hasError ? `
              <div class="flex items-start gap-3">
                <i class="fa-solid fa-triangle-exclamation text-red-400 text-xl mt-0.5"></i>
                <div class="flex-1">
                  <h4 class="text-xs font-bold text-red-200 uppercase tracking-wider">Error Position Identified</h4>
                  <p class="text-xs text-red-300/90 mt-1 leading-relaxed">
                    The syndrome equation evaluated to binary <strong>${syn.syndromeBinary}</strong>, which equals decimal <strong>${syn.syndromeDecimal}</strong>.
                    This proves without ambiguity that <strong>Bit #${syn.errorPosition} (${syn.errorSlot ? syn.errorSlot.name : 'Unknown'})</strong> was corrupted during transmission!
                  </p>
                </div>
              </div>
            ` : `
              <div class="flex items-start gap-3">
                <i class="fa-solid fa-circle-check text-emerald-400 text-xl mt-0.5"></i>
                <div class="flex-1">
                  <h4 class="text-xs font-bold text-emerald-200 uppercase tracking-wider">Zero Syndrome Verified</h4>
                  <p class="text-xs text-emerald-300/90 mt-1 leading-relaxed">
                    All parity check sums evaluated to 0 ($S = 000$). No bit errors were introduced. Data bits can be extracted directly without correction!
                  </p>
                </div>
              </div>
            `}
          </div>

          <!-- Action Button -->
          <div class="flex items-center justify-end pt-2">
            <button onclick="HammingHeroGame.proceedToCorrection()" class="hamming-btn ${syn.hasError ? 'hamming-btn-purple' : 'hamming-btn-emerald'}">
              ${syn.hasError ? '<i class="fa-solid fa-wand-magic-sparkles"></i> Execute Error Correction' : '<i class="fa-solid fa-check"></i> Extract Data Payload'} <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      `;
    },

    proceedToCorrection: function () {
      const mode = HammingGameState.mode;
      const syn = HammingGameState.syndromeResult;
      const corrRes = HammingMathEngine.correctFrame(syn.receivedFrame, syn.errorPosition, mode);
      HammingGameState.correctionResult = corrRes;
      HammingGameState.currentPhase = 'CORRECTION';

      if (syn.hasError) {
        HammingSoundSystem.correctHero();
      } else {
        HammingSoundSystem.verifySuccess();
      }

      this.renderActiveStage();
    },

    // ----------------------------------------------------
    // STAGE 5: HEROIC CORRECTION & DATA EXTRACTION
    // ----------------------------------------------------
    renderCorrectionStage: function (panel) {
      const mode = HammingGameState.mode;
      const layout = HammingMathEngine.getLayout(mode);
      const syn = HammingGameState.syndromeResult;
      const corr = HammingGameState.correctionResult;
      const isMatch = corr.recoveredData === HammingGameState.inputData;

      // Construct bit objects for corrected frame
      const correctedBitObjects = [];
      for (let pos = 1; pos <= layout.totalBits; pos++) {
        correctedBitObjects.push({
          pos: pos,
          name: layout.slots[pos - 1].name,
          isParity: layout.slots[pos - 1].isParity,
          value: parseInt(corr.correctedFrame[pos - 1], 10)
        });
      }

      this.updateBanner(
        'Phase 5: Single-Bit Correction & Data Extraction',
        corr.wasCorrected 
          ? `Bit #${corr.errorPosition} inverted successfully! Original data recovered.`
          : 'Data bits harvested directly from codeword data positions.',
        `<span class="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-mono">Payload: ${corr.recoveredData}</span>`
      );

      panel.innerHTML = `
        <div class="max-w-3xl mx-auto space-y-5">
          <!-- Corrected Frame Visualization -->
          <div class="bg-slate-900/80 border border-emerald-500/40 rounded-xl p-4 shadow-xl">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                <i class="fa-solid fa-shield-heart text-emerald-400"></i> Repaired Codeword
              </span>
              ${corr.wasCorrected ? `
                <span class="text-xs font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600 animate-pulse">
                  ✓ Bit #${corr.errorPosition} Inverted (Repaired)
                </span>
              ` : `
                <span class="text-xs font-bold px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-600">
                  ✓ Original State Intact
                </span>
              `}
            </div>
            ${HammingBitDisplay.renderBitsRow(correctedBitObjects, {
              activeCorrectedPos: corr.wasCorrected ? corr.errorPosition : 0
            })}
          </div>

          <!-- Payload Comparison & Extraction Card -->
          <div class="bg-slate-900/90 border border-slate-700/80 rounded-xl p-5 shadow-2xl">
            <h4 class="text-xs font-bold uppercase text-gray-300 tracking-wider mb-3 flex items-center gap-2">
              <i class="fa-solid fa-arrows-split-up-and-left text-cyan-400"></i> Recovered Data Payload vs Original Input
            </h4>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Original Sender Input</span>
                <span class="font-mono text-lg font-bold text-cyan-400 tracking-widest">${HammingGameState.inputData}</span>
              </div>

              <div class="p-3.5 rounded-lg bg-slate-950 border ${isMatch ? 'border-emerald-500/50' : 'border-red-500/50'}">
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Extracted &amp; Recovered Payload</span>
                <span class="font-mono text-lg font-bold ${isMatch ? 'text-emerald-400' : 'text-red-400'} tracking-widest">${corr.recoveredData}</span>
              </div>
            </div>

            <div class="mt-4 p-3 rounded-lg ${isMatch ? 'bg-emerald-950/30 border border-emerald-500/30 text-emerald-300' : 'bg-red-950/30 border border-red-500/30 text-red-300'} text-xs flex items-center gap-2">
              <i class="fa-solid ${isMatch ? 'fa-circle-check text-emerald-400' : 'fa-circle-xmark text-red-400'} text-base"></i>
              <span>${isMatch ? 'Data Integrity 100% Restored! Extracted payload matches original transmitter input.' : 'Mismatch: Payload could not be restored.'}</span>
            </div>
          </div>

          <!-- Action Button -->
          <div class="flex items-center justify-end pt-2">
            <button onclick="HammingHeroGame.finishRound()" class="hamming-btn hamming-btn-emerald">
              <i class="fa-solid fa-trophy"></i> View Round Telemetry &amp; Score <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      `;
    },

    finishRound: function () {
      const isLvl = HammingGameState.gameType === 'challenge';
      const lvlCfg = isLvl ? HammingGameState.levels[HammingGameState.currentLevel - 1] : null;

      // Award XP
      const baseXP = lvlCfg ? lvlCfg.targetScore : 100;
      HammingGameState.score += baseXP;
      HammingGameState.streak += 1;

      // Update HUD elements
      const scoreEl = document.getElementById('hamming-score-val');
      const streakEl = document.getElementById('hamming-streak-val');
      if (scoreEl) scoreEl.textContent = HammingGameState.score;
      if (streakEl) streakEl.textContent = HammingGameState.streak;

      HammingSoundSystem.levelUp();
      HammingGameState.currentPhase = 'RESULTS';
      this.renderActiveStage();
    },

    // ----------------------------------------------------
    // STAGE 6: RESULTS & PROGRESSION
    // ----------------------------------------------------
    renderResultsStage: function (panel) {
      const isLvl = HammingGameState.gameType === 'challenge';
      const lvlCfg = isLvl ? HammingGameState.levels[HammingGameState.currentLevel - 1] : null;
      const hasNext = isLvl && HammingGameState.currentLevel < HammingGameState.maxLevel;

      this.updateBanner(
        'Round Completed!',
        'Excellent work! Hamming Code encoding, transmission, diagnosis, and correction successfully verified.',
        '<span class="text-[10px] bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded font-mono">MISSION ACCOMPLISHED</span>'
      );

      panel.innerHTML = `
        <div class="max-w-xl mx-auto space-y-5 text-center py-4">
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 text-white flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(168,85,247,0.5)]">
            <i class="fa-solid fa-award text-3xl"></i>
          </div>

          <div>
            <h3 class="text-xl font-black text-white tracking-wide">
              ${isLvl ? lvlCfg.title : 'Hamming Simulation Complete'}
            </h3>
            <p class="text-xs text-purple-300 font-semibold mt-1">Single-Bit Error Successfully Neutralized</p>
          </div>

          <div class="grid grid-cols-2 gap-3 max-w-sm mx-auto">
            <div class="bg-slate-900/80 border border-slate-700/80 rounded-xl p-3">
              <span class="text-[10px] text-gray-400 uppercase font-bold block mb-1">Total Score</span>
              <span class="font-mono text-xl font-black text-amber-300">${HammingGameState.score} XP</span>
            </div>
            <div class="bg-slate-900/80 border border-slate-700/80 rounded-xl p-3">
              <span class="text-[10px] text-gray-400 uppercase font-bold block mb-1">Streak</span>
              <span class="font-mono text-xl font-black text-cyan-300">${HammingGameState.streak} 🔥</span>
            </div>
          </div>

          <!-- Controls -->
          <div class="flex items-center justify-center gap-3 pt-4">
            <button onclick="HammingHeroGame.replayRound()" class="hamming-btn hamming-btn-secondary">
              <i class="fa-solid fa-rotate-left"></i> Replay Round
            </button>
            ${hasNext ? `
              <button onclick="HammingHeroGame.nextLevel()" class="hamming-btn hamming-btn-purple">
                <i class="fa-solid fa-forward-step"></i> Next Level (${HammingGameState.currentLevel + 1})
              </button>
            ` : `
              <button onclick="HammingHeroGame.switchGameType('sandbox')" class="hamming-btn hamming-btn-cyan">
                <i class="fa-solid fa-flask"></i> Explore Sandbox Lab
              </button>
            `}
          </div>
        </div>
      `;
    },

    replayRound: function () {
      HammingGameState.resetRound();
      HammingSoundSystem.click();
      this.renderActiveStage();
    },

    nextLevel: function () {
      if (HammingGameState.currentLevel < HammingGameState.maxLevel) {
        this.selectLevel(HammingGameState.currentLevel + 1);
      }
    },

    resetGame: function () {
      HammingGameState.resetSession();
      HammingSoundSystem.click();
      this.render();
    },

    toggleMute: function () {
      HammingSoundSystem.muted = !HammingSoundSystem.muted;
      const icon = document.getElementById('hamming-sound-icon');
      if (icon) {
        icon.className = `fa-solid ${HammingSoundSystem.muted ? 'fa-volume-xmark text-red-400' : 'fa-volume-high text-cyan-400'} text-xs`;
      }
    },

    toggleEduTopic: function (elementId) {
      const el = document.getElementById(elementId);
      const icon = document.getElementById(`icon-${elementId}`);
      if (!el) return;
      if (el.classList.contains('hidden')) {
        el.classList.remove('hidden');
        if (icon) icon.className = 'fa-solid fa-chevron-up text-xs transition-transform';
        // Render Katex if present
        if (window.renderMathInElement) {
          renderMathInElement(el, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false }
            ],
            throwOnError: false
          });
        }
      } else {
        el.classList.add('hidden');
        if (icon) icon.className = 'fa-solid fa-chevron-down text-xs transition-transform';
      }
    }
  };

  // Expose to window
  window.HammingMathEngine = HammingMathEngine;
  window.HammingSoundSystem = HammingSoundSystem;
  window.HammingTransmissionSystem = HammingTransmissionSystem;
  window.HammingGameState = HammingGameState;
  window.HammingBitDisplay = HammingBitDisplay;
  window.HammingEducationalPanel = HammingEducationalPanel;
  window.HammingHeroGame = HammingHeroGame;

})(window);

