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

// Initialize site
document.addEventListener('DOMContentLoaded', function() {
  // Show cassette intro for 3 seconds (only on homepage)
  const tapeIntro = document.getElementById('tapeIntro');
  if (tapeIntro) {
    setTimeout(() => {
      tapeIntro.classList.add('hidden');
      setTimeout(() => {
        document.getElementById('mainSite').classList.add('visible');
        // Initialize with a random manifesto quote
        randomizeManifesto();
      }, 1000);
    }, 3000);
  } else {
    // For other pages, show immediately
    document.getElementById('mainSite').classList.add('visible');
    randomizeManifesto();
  }
});

// Navigation functions
function toggleMenu() {
  const nav = document.getElementById('mainNav');
  nav.classList.toggle('open');
}

// Audio functions
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


function randomizeManifesto() {
  const textElement = document.getElementById('manifestoText');
  const authorElement = document.getElementById('manifestoAuthor');

  if (!textElement || !authorElement) return;




function randomizeManifesto() {
  const textElement = document.getElementById('manifestoText');
  const authorElement = document.getElementById('manifestoAuthor');

  if (!textElement || !authorElement) return;
    // pick a random quote
  const randomQuote = manifestoQuotes[Math.floor(Math.random() * manifestoQuotes.length)];

  textElement.classList.remove('show');
  setTimeout(() => {
    textElement.textContent = `"${randomQuote.text}"`;
    authorElement.textContent = `– ${randomQuote.author}`;
    textElement.classList.add('show');
  }, 500);
}

// call once at start
randomizeManifesto();

// set to rotate every 30 seconds
setInterval(randomizeManifesto, 30000);

}
  
console.log('Resonate Data Lab site loaded.');

function toggleMute() {
  const muteBtn = document.getElementById('muteToggle');
  const isMuted = muteBtn.classList.toggle('muted');
  document.querySelectorAll('audio').forEach(a => a.muted = isMuted);
}
