//logic behind spawning, click bursts and passive respawn

//spawn mixed burst (axons and dendrites) from position (x, y)
function spawnBurst(x, y, col) {
    let n = floor(random(Config.BURST_SEEDS[0], Config.BURST_SEEDS[1]));
    for (let i = 0; i < n; i++) {
        let isAxon = random() < Config.AXON_CHANCE;
        let life = isAxon ? floor(random(Conig.AXON_LIFE[0], Config.AXON_LIFE[1])) : floor(random(Config.DENT_LIFE[0], Config.DENT_LIFE[1]));
        let turn = isAxon ? Config.AXON_TURN : Config.DEND_TURN;

        //axons biased outward from canvas center, dendrites free direction
        let outward = atan2(y - height * 0.5, x - width * 0.5) + PI;
        let dir = isAxon ? outward + random(-0.25, 0.25) : random(-PI, PI);

        branches.push(makeBranch(
            x + random(-6, 6),
            y + random(-6, 6),
            dir, col, isAxon, life, turn
        ));
    }
}

//Occasional re-growth to keep scene alive without clicks
function passiveRespawn() {
    if (branches.length >= Config.MAX_ACTIVE || tips.length === 0) return;

    for (let i = 0; i < Config.EXTRA_SPROUTS; i++) {
        let e = tips[floor(random(tips.length))];
        let isAxon = random() < 0.2;
        let life = isAxon ? floor(random(Config.AXON_LIFE[0] * 0.4, Config.AXON_LIFE[0] * 0.7)) : floor(random(Config.DEND_LIFE[0], Config.DEND_LIFE[1]));
        let turn = isAxon ? Config.AXON_TURN : Config.DEND_TURN;
        let outward = atan2(e.y - height * 0.5. e.x - width * 0.5) + PI;
        let dir = isAxon ? outward + random(-0.25, 0.25) : random(-0.7, 0.7);

        branches.push(makeBranch(e.x, e.y, dir, e.col, isAxon, life, turn));
    }
}