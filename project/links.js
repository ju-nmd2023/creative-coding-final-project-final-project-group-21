/*
Code inspired by SimonDev
Name: Spatial Hash Grids & Tales from Game Development
Video Tutorial: https://www.youtube.com/watch?v=sx4IIQL0x7c
*/

//fast neighbour connections with spatial grid
function connectNearbyTips() {
    if (tips.length === 0) return;

    //Grid
    let grid = new Map();
    for (let i = 0; i < tips.length; i++) {
        let e = tips[i];
        let cx = (e.x / CELL) | 0, cy = (e.y / CELL) | 0;
        let key = cx + ',' + cy;
        if (!grid.has(key)) grid.set(key, []);
        grid.get(key).push(i);
    }

    stroke(190, 230, 255, Config.LINK_ALPHA);
    strokeWeight(1);

    //for each tip, query its 9 neighbouring cells
    for (let i = 0; i < tips.length; i++) {
        let a = tips[i];
        let cx = (a.x / CELL) | 0, cy = (a.y / CELL) | 0;

        for (let gx = cx - 1; gx <= cx + 1; gx++) {
            for (let gy = cy - 1; gy <= cy + 1; gy++) {
                let bucket = grid.get(gx + ',' + gy);
                if (!bucket) continue;

                for (let j of bucket) {
                    if (j <= i) continue; //avoids duplicates
                    let b = tips[j];
                    if (dist(a.x, a.y, b.x, b.y) < Config.LINK_RADIUS) {
                        line(a.x, a.y, b.x, b.y);
                    }
                }
            }
        }
    }
}

window.connectNearbyTips = connectNearbyTips;