// p5 lifecycle and orchestration

function setup() {
  const c = createCanvas(windowWidth, windowHeight);
  c.parent('p5container');
  frameRate(Config.FRAME_RATE);
  pixelDensity(1);
  background(0);

  randomSeed(17);
  noiseSeed(17);
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
}

function mousePressed() {
  const col = color(Config.COLORS[colorIndex % Config.COLORS.length]); colorIndex++;
  spawnBurst(mouseX, mouseY, col);
  ripples.push({ x: mouseX, y: mouseY, col, life: 26, r: 120 });
}