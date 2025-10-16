//Shared state arrays and helpers//

//active, growing segments
let branches = []; 

//finished endpoints links
let tips = [];

//rings click
let rippples = [];

//palette per click start
let colorIndex = 0; 

//grill cell size for neighbour search
let CELL = Config.LINK_RADIUS;

//scene reset to clean state
function resetScene() {
    branches.length = 0; 
    tips.length = 0; 
    ripples.length = 0; 
    backround(0); 
}