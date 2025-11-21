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

let audioElements = [];
// Initialize site after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const tapeIntro = document.getElementById('tapeIntro');
  const mainSite = document.getElementById('mainSite');


  // audio elements fixed
  const audioContainer = document.getElementById('hiddenAudioContainer');
  
  if (audioContainer) {
    audioElements = audioFiles.map(file => {
      const audio = document.createElement('audio');
      audio.src = `/Resonate-Data-Lab-Website/assets/automatic-randomised-sounds/${file}`;
      audio.preload = 'auto';
      audio.loop = true; // Loop the sounds
      audio.volume = 0.2; // Set to 50% volume, adjust as needed
      audioContainer.appendChild(audio);
      return audio;
    });
  }

   let currentAudio = null;

function playRandomAudio() {
  if (!audioElements.length) return;

  // Stop previous sound
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  // Pick a new one
  const randomIndex = Math.floor(Math.random() * audioElements.length);
  currentAudio = audioElements[randomIndex];

  currentAudio.play().catch(err => console.error("Audio failed:", err));

  // When it ends, play another random one
  currentAudio.onended = playRandomAudio;
}   
   // Function to play all hidden audio all at once 
  /* function playAllAudio() {
    console.log('Attempting to play audio...');
    audioElements.forEach((audio, index) => {
      audio.play()
        .then(() => { 
          console.log(`Audio ${index + 1} playing successfully`);
        })
        .catch(error => {
          console.error(`Audio ${index + 1} failed to play:`, error);
        });
    });
  }
    */
  // start the content and the audio
  function showEnterButton() {
    tapeIntro.innerHTML = `
      <img src="/Resonate-Data-Lab-Website/assets/tape-animated.gif"
    alt="Animated cassette tape" class="tape-gif">
      <div class="intro-text" style="margin-bottom: 2rem;">preparing a sonic world for you</div>
      <button class="start-btn" id="startBtn" style="
        background: var(--accent);
        color: var(--primary);
        border: none;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.2s ease;
      ">let me in</button>
    `;
    
     const startBtn = document.getElementById('startBtn');
    
    // Hover effects for the button
    startBtn.addEventListener('mouseenter', () => {
      startBtn.style.background = 'var(--orange)';
      startBtn.style.transform = 'translateY(-2px)';
    });
    
    startBtn.addEventListener('mouseleave', () => {
      startBtn.style.background = 'var(--accent)';
      startBtn.style.transform = 'translateY(0)';
    });
    
    // THE KEY - Audio plays AFTER user clicks
    startBtn.addEventListener('click', () => {
      tapeIntro.classList.add('hidden');
      setTimeout(() => {
        mainSite.classList.add('visible');
        randomizeManifesto();
        playRandomAudio();
      }, 500);
    });
  }

  if (tapeIntro) {
    // Show GIF for 3 seconds, then show button
    setTimeout(() => {
      showEnterButton(); // 
    }, 3000);
  } else {
    // No intro, just show main site
    mainSite.classList.add('visible');
    randomizeManifesto();
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

// Audio play/pause button (for manual controls if needed)
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
  
  // Mute/unmute all audio elements
  audioElements.forEach(audio => {
    audio.muted = isMuted;
  });
  
  console.log(isMuted ? 'Audio muted' : 'Audio unmuted');
}

console.log('Resonate Data Lab site loaded.');
