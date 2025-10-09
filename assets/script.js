// Manifesto quotes from the team
const manifestoQuotes = [
  { text: "Sound is an extension of a body. It's an extension of how we as a people interact, reflect, and live.", author: "Deo" },
  { text: "Sound is that element that always knows what to say when we don't.", author: "Deo" },
  { text: "Sound is what makes things visible", author: "Deo" },
  { text: "Sound acts as reassurance for interaction.", author: "Catelyn" },
  { text: "Sound can be a means for expression (you in the present), understanding/awareness (of your surroundings), reflection (you in the past), and communication (you with others).", author: "Catelyn" },
  { text: "Sound reflects embodied space and time.", author: "Catelyn" },
  { text: "Sound is the most direct medium of all.", author: "Sarena" },
  { text: "Sound is tangible. Sound touches from afar.", author: "Sarena" },
  { text: "Sound is political. Sound is resistance. Sound is intimate.", author: "Sarena" },
  { text: "Sound is vibrations in matter...that connect that matter together.", author: "Jordan" },
  { text: "Sound is a medium for making: making meaning, making connections, making the familiar strange and the strange familiar.", author: "Jordan" },
  { text: "Sound is always there, whether you are listening to it or not.", author: "Jordan" },
  { text: "Sound is a fundamental part of how I perceive, understand, and interact with the world.", author: "Liuyi" },
  { text: "Sound is information. Sound is a medium for communication.", author: "Liuyi" },
  { text: "Sound is memories. Sound is warning. Sound is awareness.", author: "Liuyi" }
];

// Audio files for hidden playback
const audioFiles = [
  "200101_001 - brandon and prof W-B talking about setting up a recorder.WAV",
  "Calm breathing_slow.wav",
  "Crowd Noise1.mp3",
  "Door - building_slow.wav",
  "Echo Elephants.wav",
  "Thank-You-Brandon-Arthur.wav",
  "Travelling the Stars.wav",
  "Under water - ask permission.wav",
  "dancing sound 20250625-081510_slow.wav",
  "fruit_order_final CTUIR ask permissions.wav",
  "recorder sound for gif.wav"
];

const audioContainer = document.getElementById('hiddenAudioContainer');
const audioElements = audioFiles.map(file => {
  const audio = document.createElement('audio');
  audio.src = `/assets/automatic-randomised-sounds/${file}`;
  audio.preload = 'auto';
  audioContainer.appendChild(audio);
  return audio;
});


// Function to play all hidden audio
function playAllAudio() {
  audioElements.forEach(audio => {
    audio.volume = 1;
    audio.muted = true; // allows autoplay
    audio.play().then(() => {
      audio.muted = false; // unmute after playing starts
    }).catch((err) => {
      console.warn("Audio autoplay blocked:", err);
    });
  });
}


// Initialize site after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const tapeIntro = document.getElementById('tapeIntro');
  const mainSite = document.getElementById('mainSite');

  function startSite() {
    mainSite.classList.add('visible');
    randomizeManifesto();
    playAllAudio();
  }

  if (tapeIntro) {
    setTimeout(() => {
      tapeIntro.classList.add('hidden');
      setTimeout(startSite, 1000);
    }, 3000);
  } else {
    startSite();
  }
});

// Navigation toggle
function toggleMenu() {
  const nav = document.getElementById('mainNav');
  nav.classList.toggle('open');
}

// Manifesto randomization
function randomizeManifesto() {
  const textElement = document.getElementById('manifestoText');
  const authorElement = document.getElementById('manifestoAuthor');
  if (!textElement || !authorElement) return;

  const randomQuote = manifestoQuotes[Math.floor(Math.random() * manifestoQuotes.length)];

  textElement.classList.remove('show');
  setTimeout(() => {
    textElement.textContent = `"${randomQuote.text}"`;
    authorElement.textContent = `– ${randomQuote.author}`;
    textElement.classList.add('show');
  }, 500);
}

// Rotate manifesto every 30 seconds
setInterval(randomizeManifesto, 30000);

// Audio play/pause button (if you keep a manual button)
function playAudio(audioId) {
  const audio = document.getElementById(audioId);
  const button = event.target;

  if (audio.paused) {
    audio.play();
    button.classList.add('playing');
    button.innerHTML = '⏸ Press here to pause';
  } else {
    audio.pause();
    button.classList.remove('playing');
    button.innerHTML = '▶ Press here to play';
  }

  audio.addEventListener('ended', () => {
    button.classList.remove('playing');
    button.innerHTML = '▶ Press here to play';
  });
}

// Mute toggle for all audio
function toggleMute() {
  const muteBtn = document.getElementById('muteToggle');
  const isMuted = muteBtn.classList.toggle('muted');
  document.querySelectorAll('audio').forEach(a => a.muted = isMuted);
}

console.log('Resonate Data Lab site loaded.');
