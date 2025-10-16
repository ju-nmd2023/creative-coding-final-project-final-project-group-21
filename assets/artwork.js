//setup
function setup() {
    const c= createCanvas(windowWidth, windowHeight);
}

//json data load
(async function () {
    const response = await fetch("data.json");
    const data = await response.json();

    const artwork = Array.isArray(data) ? data[0] : data;

    const artworkName = document.getElementById('artwork-name');
    const descriptionEl = document.getElementById('description-comment');

    if (artworkName && artwork?.name) artworkName.textContent = artwork.name;
    if (descriptionEl) {
        descriptionEl.textContent = artwork?.description || '';
    }
    return data();
})();

