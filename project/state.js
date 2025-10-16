//Shared state arrays and helpers//

//active, growing segments
window.branches = []; 

//finished endpoints links
window.tips = [];

//rings click
window.ripples = [];

//palette per click start
window.colorIndex = 0; 

//grill cell size for neighbour search
window.CELL = Config.LINK_RADIUS;

//scene reset to clean state
window.resetScene = function resetScene() {
    branches.length = 0; 
    tips.length = 0; 
    ripples.length = 0; 
    background(0); 
}