//setup
function setup() {
    let c= createCanvas(windowWidth, windowHeight);
}

//json data load
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

