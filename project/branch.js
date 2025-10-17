// for creating branches and growth steps


//Create new branch object
function makeBranch(x, y, dir, col, isAxon, life, turn) {
    return {
        x, y, //current point
        px: x, py: y, //previous point
        dir, //heading, radians
        col, //p5.Color
        isAxon, //cosmetic thickness
        life, total: life, //remaining and initial life
        turn, // curvature factor
        n: random(1000), //noise cursor

        speed: random(Config.SPEED[0], Config.SPEED[1]), 

        dead: false
    };
}

//Smallest angle difference (radians)
function angleDiff(a, b) {
 let d = (b - a + PI) % (TWO_PI) - PI;
 if (d < -PI) d += TWO_PI;
 return d;
}


//off-canvas check with small margin
function outside (x, y) { return x < -12 || x > width + 12 || y < -12 || y > height + 12;
}

//Advance one branch by one step; curve, move, draw, (finsih)
function stepBranch(b) {
    if (b.dead) return;

    //remember prev point
    b.px= b.x; b.py= b.y; 

    //curvature via perline noise (makes organic look)
    let k = noise(b.n);
    b.dir += (k-0.5) * b.turn;
    b.n += 0.01;

    //Slight steering towards mouse if within radius
    let dm = dist(b.x, b.y, mouseX, mouseY);
    if (dm < Config.MOUSE_RADIUS) {
        let ta = atan2(mouseY - b.y, mouseX - b.x);
        b.dir += angleDiff(b.dir, ta) * Config.MOUSE_STEER;
    }


    //Advance position
    b.x += cos(b.dir) * b.speed;
    b.y += sin(b.dir) * b.speed;

    //Axons slightly thicker
    let t = b.life/ b.total; //1...0
    let w = lerp(Config.THICK_MAX, Config.THICK_MIN, 1 - t);
    if (!b.isAxon) w *= 0.85;

    stroke(red(b.col), green(b.col), blue(b.col), 205);
    strokeWeight(w);
    line(b.px, b.py, b.x, b.y); 

    //lifetime
    b.life--;

    //Finish draw and register endpoint
    if (b.life <= 0 || outside(b.x, b.y)) {
        noStroke();
        fill(red(b.col), green(b.col), blue(b.col), 230);
        circle(b.x, b.y, lerp(Config.DOT_MAX, Config.DOT_MIN, 1 - t));

        tips.push({ x: b.x, y: b.y, col: b.col});
        if (tips.length > Config.MAX_TIPS) tips.splice(0, tips.length - Config.MAX_TIPS);
    
        b.dead = true;
    }
}

//expose
window.makeBranch = makeBranch;
window.stepBranch = stepBranch;