// Spawning bursts and passive sprouts

function randInt(a, b) { return floor(random(a, b)); }

/** Emit a neural burst at (x,y) */
function spawnBurst(x, y, col) {
  const n = randInt(Config.BURST_SEEDS[0], Config.BURST_SEEDS[1]);
  for (let i = 0; i < n; i++) {
    const isAxon = random() < Config.AXON_CHANCE;
    const life = isAxon
      ? randInt(Config.AXON_LIFE[0], Config.AXON_LIFE[1])
      : randInt(Config.DEND_LIFE[0], Config.DEND_LIFE[1]);
    const turn = isAxon ? Config.AXON_TURN : Config.DEND_TURN;

    // Axons biased outward from canvas center; dendrites free
    const outward = atan2(y - height * 0.5, x - width * 0.5) + PI;
    const dir = isAxon ? outward + random(-0.25, 0.25) : random(-PI, PI);

    branches.push(makeBranch(
      x + random(-6, 6),
      y + random(-6, 6),
      dir, col, isAxon, life, turn
    ));
  }
}

/** Occasionally sprout new branches from existing tips */
function passiveRespawn() {
  if (branches.length >= Config.MAX_ACTIVE || tips.length === 0) return;

  for (let i = 0; i < Config.EXTRA_SPROUTS; i++) {
    const e = tips[floor(random(tips.length))];
    const isAxon = random() < 0.2;
    const life = isAxon
      ? randInt(Config.AXON_LIFE[0] * 0.4, Config.AXON_LIFE[0] * 0.7)
      : randInt(Config.DEND_LIFE[0], Config.DEND_LIFE[1]);
    const turn = isAxon ? Config.AXON_TURN : Config.DEND_TURN;
    const outward = atan2(e.y - height * 0.5, e.x - width * 0.5) + PI;
    const dir = isAxon ? outward + random(-0.25, 0.25) : random(-0.7, 0.7);

    branches.push(makeBranch(e.x, e.y, dir, e.col, isAxon, life, turn));
  }
}

window.spawnBurst = spawnBurst;
window.passiveRespawn = passiveRespawn;