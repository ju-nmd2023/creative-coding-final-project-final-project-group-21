// Global configuration (tweak mood/perf here)
window.Config = {
  COLORS: ['#86e3ff', '#82f0c8', '#ffc06e', '#ff97c7', '#8aa9ff', '#ffa27a'],

  // Burst composition
  BURST_SEEDS: [26, 38],
  AXON_CHANCE: 0.28,
  AXON_LIFE: [220, 360],
  DEND_LIFE: [60, 120],
  AXON_TURN: 0.08,
  DEND_TURN: 0.22,
  SPEED: [0.9, 1.4],

  // Rendering
  THICK_MIN: 0.6, THICK_MAX: 1.6,
  DOT_MIN: 2.0,  DOT_MAX: 4.0,

  // Interaction
  MOUSE_RADIUS: 160,
  MOUSE_STEER: 0.06,

  // Linking
  LINK_RADIUS: 48,
  LINK_ALPHA: 90,

  // Life / perf
  FRAME_RATE: 45,
  FADE_ALPHA: 10,
  RESPAWN_EVERY: 24,
  EXTRA_SPROUTS: 2,

  // Safety caps
  MAX_ACTIVE: 700,
  MAX_TIPS: 4000
};