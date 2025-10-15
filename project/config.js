/**
 * Global configuration: tweak visuals and performance here.
 */
const Config = {
  // Palette cycles per click
  COLORS: ['#86e3ff', '#82f0c8', '#ffc06e', '#ff97c7', '#8aa9ff', '#ffa27a'],

  // Burst composition (click spawns)
  BURST_SEEDS: [26, 38],      // starters per click (min, max)
  AXON_CHANCE: 0.28,          // probability a starter is an axon
  AXON_LIFE: [220, 360],      // axons live longer, straighter
  DEND_LIFE: [60, 120],       // dendrites live shorter, curlier
  AXON_TURN: 0.08,            // curvature (smaller = straighter)
  DEND_TURN: 0.22,
  SPEED: [0.9, 1.4],          // branch speed range

  // Rendering
  THICK_MIN: 0.6, THICK_MAX: 1.6, // line thickness
  DOT_MIN: 2.0, DOT_MAX: 4.0,     // synapse dot size

  // Interaction
  MOUSE_RADIUS: 160,          // steer radius
  MOUSE_STEER: 0.06,          // steer strength (keep small)

  // Linking between endpoints
  LINK_RADIUS: 48,            // max distance to draw link
  LINK_ALPHA: 90,             // link opacity

  // Live/perf
  FRAME_RATE: 45,             // keeps laptops happy
  FADE_ALPHA: 10,             // translucent veil each frame
  RESPAWN_EVERY: 24,          // try extra sprouts every N frames
  EXTRA_SPROUTS: 2,           // new sprouts per respawn tick

  // Safety caps
  MAX_ACTIVE: 700,            // max active branches
  MAX_TIPS: 4000              // max stored endpoints
};
