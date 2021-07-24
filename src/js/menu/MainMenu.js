var playButton;
var tutorialButton;

var atMenu = true;

var menuImg;
var textImg;

function startMainMenu() {

    playButton = new Button(500, 200, 100, 50, "blue", "Play");
    tutorialButton = new Button(500, 300, 100, 50, "blue", "Tutorial");

    menuImg = loadImage("data/textures/menu/menu.png");
    textImg = loadImage("data/textures/menu/text.png");

    updateMainMenu();
}

function renderMainMenu() {

    // fill the background image
    background(menuImg);
    setOpacity(0.5);
    setColor("black");
    fillRect(0, 0, 1000, 1000);
    setOpacity(1);

    // draw the main title text
    drawImg(textImg, 300, 10, 400, 100);

    // draw play button
    playButton.render();

    // draw tutorial button
    tutorialButton.render();

}

function updateMainMenu() {

    // detect play button click
    if(playButton.clicked()) {
        play();
    }

    // detect tutorial button click
    if(tutorialButton.clicked()) {
        startTutorial();
    }

    // render the main menu
    renderMainMenu();

    // recall this function
    if(atMenu) {
        requestAnimationFrame(updateMainMenu);
    }
}

function play() {

    atMenu = false;

    // call the main update function
    engineUpdate();

    hazeStrength = 0.0;
    gameTime = 0.0;
    playerScore = 0;

    // add game event listeners
    document.onmousedown = mouseDown;

    // spawn first set of entities

    // create cactus
    for(let j = 0; j < 10; j++) {
        var cactus = new Cactus(random(-500, 500), -20, j*100);
        entities.push(cactus);

        // create sand particles
        for(let i = 0; i < 10; i++) {
            var part = new Particle3D(random(-500, 500), 60, j*100, 10, 10, (random(0, 5) == 3 ? "yellowgreen" : "orange"));
            sand.push(part);
        }

        // create zombies (if it has been long enough)
        zombieIterator++;
        if(zombieIterator == 10) {
            var zombie = new Zombie(random(-500, 500), -10, j*100);
            entities.push(zombie);
            zombieIterator = 0; // reset the zombie iterator
        }
    }

    // start the entity spawn loop
    spawnEntities();

    // create walls
    walls.push(new WallParticle(-500, -350, -790, 400, 2000, "gray", true));
    walls.push(new WallParticle(500, -350, -790, 400, 2000, "gray", true));

    // Start the wind sound effect (and loop it)
    windSound.play();
    windSound.addEventListener("timeupdate", function() {
        if(this.currentTime >= this.duration-0.44) {
            this.currentTime = 0.0;
        }
    })

}