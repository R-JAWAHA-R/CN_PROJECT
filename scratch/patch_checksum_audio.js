const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'checksumGuard.js');
let code = fs.readFileSync(filePath, 'utf8');

// 1. UPDATE SoundSystem
const oldSoundSystem = `  const SoundSystem = {
    audioCtx: null,
    muted: false,

    init: function () {`;

const newSoundSystem = `  const SoundSystem = {
    audioCtx: null,
    muted: (function () {
      try {
        if (typeof sessionStorage !== 'undefined') {
          return sessionStorage.getItem('cg_sound_muted') === 'true';
        }
      } catch (e) {}
      return false;
    })(),
    travelAudio: null,

    initTravelAudio: function () {
      if (this.travelAudio || typeof Audio === 'undefined') return;
      try {
        this.travelAudio = new Audio();
        this.travelAudio.preload = 'auto';
        // Support MP3 with fallback to MP4 (AAC)
        if (this.travelAudio.canPlayType && this.travelAudio.canPlayType('audio/mpeg')) {
          this.travelAudio.src = 'assets/audio/frameParungaJI.mp3';
        } else {
          this.travelAudio.src = 'assets/audio/frameParungaJI.mp4';
        }
        this.travelAudio.volume = 0.85;
      } catch (e) {
        console.warn('Could not initialize frame travel audio:', e);
      }
    },

    playFrameTravel: function () {
      if (this.muted) return;
      this.initTravelAudio();
      if (!this.travelAudio) return;

      try {
        this.stopFrameTravel();
        this.travelAudio.currentTime = 0;
        const playPromise = this.travelAudio.play();
        if (playPromise !== undefined) {
          playPromise.catch(function (err) {
            // Silently handle autoplay restriction or media error
            console.warn('Frame travel audio playback was deferred or blocked by browser policy:', err);
          });
        }
      } catch (e) {
        console.warn('Frame travel audio play error:', e);
      }
    },

    stopFrameTravel: function () {
      if (this.travelAudio) {
        try {
          this.travelAudio.pause();
          this.travelAudio.currentTime = 0;
        } catch (e) {}
      }
    },

    setMuted: function (isMuted) {
      this.muted = !!isMuted;
      try {
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem('cg_sound_muted', this.muted ? 'true' : 'false');
        }
      } catch (e) {}
      if (this.muted) {
        this.stopFrameTravel();
      }
    },

    init: function () {`;

// 2. UPDATE TransmissionSystem (startSenderToRouter and startRouterToReceiver)
const oldTransmissionStarts = `    startSenderToRouter: function (onComplete) {
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
    },`;

const newTransmissionStarts = `    startSenderToRouter: function (onComplete) {
      this.state = 'SENDER_TO_ROUTER';
      this.progress = 0;
      this.hasError = false;
      // Play custom frame travel audio once as frame departs Sender
      SoundSystem.playFrameTravel();

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
          SoundSystem.stopFrameTravel();
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

      // Play custom frame travel audio once as frame departs Router
      SoundSystem.playFrameTravel();
      if (hasCorruptedBit) {
        SoundSystem.glitchAlert();
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
          SoundSystem.stopFrameTravel();
          if (onComplete) onComplete();
        }
      };
      requestAnimationFrame(step);
    },`;

// 3. UPDATE stopLoop in TransmissionSystem
const oldStopLoop = `    stopLoop: function () {
      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
        this.animFrameId = null;
      }
    },`;

const newStopLoop = `    stopLoop: function () {
      SoundSystem.stopFrameTravel();
      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
        this.animFrameId = null;
      }
    },`;

// 4. UPDATE resetToSetup in GameState
const oldResetToSetup = `    resetToSetup: function () {
      this.currentPhase = 'SETUP';
      this.checksumResult = null;
      this.frame = null;
      this.receiverResult = null;
      TransmissionSystem.state = 'IDLE';
      TransmissionSystem.hasError = false;
      TransmissionSystem.particles = [];
    }`;

const newResetToSetup = `    resetToSetup: function () {
      SoundSystem.stopFrameTravel();
      this.currentPhase = 'SETUP';
      this.checksumResult = null;
      this.frame = null;
      this.receiverResult = null;
      TransmissionSystem.state = 'IDLE';
      TransmissionSystem.hasError = false;
      TransmissionSystem.particles = [];
    }`;

// 5. UPDATE ChecksumGuardGame (render, resetGame, toggleMute, cleanup)
const oldShellButton = `<button onclick="ChecksumGuardGame.toggleMute()" id="cg-sound-btn" class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 transition-colors" title="Toggle Sound FX">
                  <i id="cg-sound-icon" class="fa-solid \${SoundSystem.muted ? 'fa-volume-xmark text-red-400' : 'fa-volume-high text-cyan-400'}"></i>
                </button>`;

const newShellButton = `<button onclick="ChecksumGuardGame.toggleMute()" id="cg-sound-btn" class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 transition-all flex items-center gap-1.5 text-xs font-semibold" title="Toggle Sound FX (Currently \${SoundSystem.muted ? 'MUTED' : 'ACTIVE'})" aria-label="Toggle Sound">
                  <i id="cg-sound-icon" class="fa-solid \${SoundSystem.muted ? 'fa-volume-xmark text-red-400' : 'fa-volume-high text-cyan-400'}"></i>
                  <span id="cg-sound-label" class="\${SoundSystem.muted ? 'text-red-400' : 'text-cyan-300'} font-mono text-[10px] tracking-wider">\${SoundSystem.muted ? 'SOUND OFF' : 'SOUND ON'}</span>
                </button>`;

const oldCgGameMethods = `    render: function (targetContainer) {
      this.container = targetContainer;
      this.renderGameShell();
      TransmissionSystem.init(document.getElementById('cg-canvas'));
      this.renderActiveStage();
    },`;

const newCgGameMethods = `    render: function (targetContainer) {
      this.container = targetContainer;
      SoundSystem.initTravelAudio();
      this.renderGameShell();
      TransmissionSystem.init(document.getElementById('cg-canvas'));
      this.renderActiveStage();
    },`;

const oldToggleMute = `    resetGame: function () {
      GameState.resetToSetup();
      this.renderActiveStage();
    },

    toggleMute: function () {
      SoundSystem.muted = !SoundSystem.muted;
      const icon = document.getElementById('cg-sound-icon');
      if (icon) {
        icon.className = \`fa-solid \${SoundSystem.muted ? 'fa-volume-xmark text-red-400' : 'fa-volume-high text-cyan-400'}\`;
      }
    }`;

const newToggleMute = `    resetGame: function () {
      SoundSystem.stopFrameTravel();
      GameState.resetToSetup();
      this.renderActiveStage();
    },

    cleanup: function () {
      SoundSystem.stopFrameTravel();
      TransmissionSystem.stopLoop();
    },

    toggleMute: function () {
      SoundSystem.setMuted(!SoundSystem.muted);
      const icon = document.getElementById('cg-sound-icon');
      const label = document.getElementById('cg-sound-label');
      const btn = document.getElementById('cg-sound-btn');
      if (icon) {
        icon.className = \`fa-solid \${SoundSystem.muted ? 'fa-volume-xmark text-red-400' : 'fa-volume-high text-cyan-400'}\`;
      }
      if (label) {
        label.className = \`\${SoundSystem.muted ? 'text-red-400' : 'text-cyan-300'} font-mono text-[10px] tracking-wider\`;
        label.textContent = SoundSystem.muted ? 'SOUND OFF' : 'SOUND ON';
      }
      if (btn) {
        btn.title = \`Toggle Sound FX (Currently \${SoundSystem.muted ? 'MUTED' : 'ACTIVE'})\`;
      }
    }`;

function replaceNormalized(str, search, replacement) {
  const normStr = str.replace(/\r\n/g, '\n');
  const normSearch = search.replace(/\r\n/g, '\n');
  const normReplacement = replacement.replace(/\r\n/g, '\n');
  if (!normStr.includes(normSearch)) {
    throw new Error('Could not find search block: ' + search.slice(0, 50));
  }
  return normStr.replace(normSearch, normReplacement);
}

code = replaceNormalized(code, oldSoundSystem, newSoundSystem);
code = replaceNormalized(code, oldTransmissionStarts, newTransmissionStarts);
code = replaceNormalized(code, oldStopLoop, newStopLoop);
code = replaceNormalized(code, oldResetToSetup, newResetToSetup);
code = replaceNormalized(code, oldShellButton, newShellButton);
code = replaceNormalized(code, oldCgGameMethods, newCgGameMethods);
code = replaceNormalized(code, oldToggleMute, newToggleMute);

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully patched js/checksumGuard.js with frame travel audio!');
