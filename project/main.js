/*
Name: Coding Challenge #15: Object Oriented Fractal Trees
Video: https://www.youtube.com/watch?v=fcdNSZ9IzJM
*/


/*
Name: Spatial Hash Grids & Tales from Game Development
Video Tutorial: https://www.youtube.com/watch?v=sx4IIQL0x7c
*/


/*
Name: Object Oriented Ripples in p5.js (DGST 302: Week 3, Day 3)
Video Tutorial: https://www.youtube.com/watch?v=9lEaYKP7yV0
*/


/*
Name: 4.1: Particle System Simulation - The Nature of Code
Video Tutorial: https://www.youtube.com/watch?v=syR0klfncCk
*/


//data.json connection
const nameEl = document.getElementById('artwork-name');
const descEl = document.getElementById('description-comment');

//data.json load
(async function () {
    let response = await fetch("data.json");
    let data = await response.json();

    let artwork = Array.isArray(data) ? data[0] : data;

    let artworkName = document.getElementById('artwork-name');
    let descriptionEl = document.getElementById('description-comment');

    if (artworkName && artwork?.name) artworkName.textContent = artwork.name;
    if (descriptionEl) {
        descriptionEl.textContent = artwork?.description || '';
    }
    return data();
})();


// p5 lifecycle and orchestration

function setup() {
  const c = createCanvas(windowWidth, windowHeight);
  c.parent('p5container');
  frameRate(Config.FRAME_RATE);
  pixelDensity(1);
  background(0);

  randomSeed(17);
  noiseSeed(17);

  //music
  player = new Tone.Player("assets/music.wav").toDestination();
  player.loop = true;
  player.autostart = false;

  player.volume.value = -0.8;
  player.playbackRate = 1.0;
}

function draw() {
  // Soft fading so the image keeps breathing
  noStroke();
  fill(0, Config.FADE_ALPHA);
  rect(0, 0, width, height);

  // 1) Grow all active branches
  for (const b of branches) stepBranch(b);
  branches = branches.filter(b => !b.dead);

  // 2) Click ripples
  for (const r of ripples) drawRipple(r);
  ripples = ripples.filter(r => r.life > 0);

  // 3) Connect endpoints
  connectNearbyTips();

  // 4) Gentle activity
  if (frameCount % Config.RESPAWN_EVERY === 0) passiveRespawn();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  resetScene();
}

function keyPressed() {
  if (key === 'r' || key === 'R') resetScene();

  if (key === ' ') {
    togglePlay();
    return false;
  }

  //controls 
  //volume 
  if (key === 'ArrowUp')   { player.volume.value = Math.min(0,   player.volume.value + 1); return false; }
  if (key === 'ArrowDown') { player.volume.value = Math.max(-60, player.volume.value - 1); return false; }

  //playback rate
  if (key === 'ArrowRight') { player.playbackRate = player.playbackRate + 0.1; return false; }
  if (key === 'ArrowLeft')  { player.playbackRate = Math.max(0.1, player.playbackRate - 0.1); return false; }

  if (key === '0') { player.playbackRate = 1.0; return false; }
}

function mousePressed() {
  const col = color(Config.COLORS[colorIndex % Config.COLORS.length]); colorIndex++;
  spawnBurst(mouseX, mouseY, col);
  ripples.push({ x: mouseX, y: mouseY, col, life: 26, r: 120 });
}

//audio globals
let player = null;
let isPlaying = false; 
let repeatOnceTimer = null;


async function togglePlay() {
  if (!player) return;
  await Tone.start(); // required once by browser policy

  // Use the real Tone state instead of our own flag
  const running = (player.state === 'started');

  if (running) {
    player.stop(0);     // stop immediately
  } else {
    player.start(0);    // start from the beginning
  }
}

