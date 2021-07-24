
// Arrays that contain 3D objects
var entities = []; // the main entities list contains all enties (cactus, zombies, etc)

var sand = []; // the sand particles on the ground (also contains clouds)

var walls = []; // wall and wall particles array

var texts = []; // array of the text that shows when you kill an enemy (that shows +5)

// image / texture variables
var gunImg;
var gun_flashImg;
var current_gunImg;
var zombieImg;
var cactusImg;
var ammoDisplayImg;
var scoreDisplayImg;

// SFX / Sound effects variables
var shotSound; // gunshot sound audio object
var reloadSound; // the sound that plays on reload
var windSound; // the background wind sound (louder when haze is stronger)
var songAudio; // the background song
var deathSound; // the sound that plays when you die
var hurtSound; // the sound that plays when the player gets damaged

// bullet variables
var renderedBullets = []; // the bullets to be rendered (only for a short period of time)

// player variables
var moving = true; // is the player moving on the Z axis
var player_health = 5; // when this is 0 the player is dead, this also controls the health bar
var player_currentAmmo = 9; // the amount of time the player can shoot until they must go thru the reload cycle
var player_canShoot = true;
var player_score = 0; // get 5 points per zombie kill, loose 1 point when a zombie passes you

// Effect variables
var hazeStrength = 0.0;

var gameTime = 0.0;

function start() {
    // load images
    current_gunImg = gunImg = loadImage("data/textures/gun.png");
    gun_flashImg = loadImage("data/textures/gun-flash.png");
    zombieImg = loadImage("data/textures/zombie.png");
    cactusImg = loadImage("data/textures/cactus.png");
    ammoDisplayImg = loadImage("data/textures/ammo.png");
    scoreDisplayImg = loadImage("data/textures/score.png");

    // load sfx (sound effects)
    shotSound = loadAudio("data/sfx/shot.wav");
    reloadSound = loadAudio("data/sfx/gun-charge.wav");
    windSound = loadAudio("data/sfx/wind.wav");
    songAudio = loadAudio("data/sfx/desert-storm.wav");
    deathSound = loadAudio("data/sfx/death.wav");
    hurtSound = loadAudio("data/sfx/hit.wav");

    // set audio volumes
    shotSound.volume = 0.3;
    songAudio.volume = 0.3;

    // make the song loop
    songAudio.loop = true;

    // start the main menu
    startMainMenu();
}

function render() {

    gameTime+=0.1*deltaTime;

    // Draw the sky background
    setColor("skyblue");
    fillRect(0, 0, 1000, 1000);

    // Draw the base yellow floor
    setColor("yellow");
    fillRect(0, 270, 1000, 1000);

    // draw the sand particles on the floor
    for(let i = 0; i < sand.length; i++) {
        sand[i].render();
    }

    // draw the walls and wall rocks / particles
    for(let i = 0; i < walls.length; i++) {
        walls[i].render();
        // remove wall (if it is not a main wall) if it goes past the camera
        if(!walls[i].main) {
            if(walls[i].z < camera.z-700) {
                walls.splice(i, 1);
            }
        }
    }

    // Draw the entities
    for(let i = 0; i < entities.length; i++) {
        entities[i].render();
    }

    // Draw the kill text
    for(let i = 0; i < texts.length; i++) {
        fillText(texts[i].text, texts[i].x-camera.x, texts[i].y-camera.y, texts[i].size, texts[i].color, "Arial");
    }

    // Draw the bullets shot by the player
    for(let i = 0; i < renderedBullets.length; i++) {
        // remove bullet if it has gone for long enough
        renderedBullets[i].time+=0.15*deltaTime;
        if(renderedBullets[i].time > 1) {
            renderedBullets.splice(i, 1);
            break;
        }
        // draw the bullet
        setColor(renderedBullets[i].color);
        fillRect(renderedBullets[i].x-camera.x, renderedBullets[i].y, renderedBullets[i].size, renderedBullets[i].size);
    }

    // Draw the player's hand and gun
    c.drawImage(current_gunImg, (width/2)-50*scaleFitNative, height-180*scaleFitNative, 100*scaleFitNative, 180*scaleFitNative);

    // Draw the player's health bar (displays how much health the player has)
    player_RenderHealthBar();

    // Draw the player's ammo display
    player_RenderAmmoDisplay();

    // Draw the player's score display
    player_RenderScoreDisplay();

    // Draw the haze / fog
    setColor("rgb(179, 201, 68)");
    setOpacity(hazeStrength);
    fillRect(0, 0, 1000, 1000);
    setOpacity(1);
}

function update() {

    // depth sort the entities
    entities.sort(function(e1, e2) {
        return e2.z - e1.z;
    })

    // update the entities
    moving = true;
    for(let i = 0; i < entities.length; i++) {
        entities[i].update();
        entities[i].collideWithPlayer();
        // update the zombie AI
        if(entities[i] instanceof Zombie) {
            entities[i].AI();
            // if zombie passes player, remove 1 point from their score
            if(entities[i].z < camera.z-800) {
                player_score--;
            }
        }
        // remove entities if they pass the camrea
        if(entities[i].z < camera.z-800) {
            entities.splice(i, 1);
        }
    }

    // update the sand particles
    for(let i = 0; i < sand.length; i++) {
        // remove sand if it passes the camera
        if(sand[i].z < camera.z-700) {
            sand.splice(i, 1);
        }
    }

    // update the kill texts
    for(let i = 0; i < texts.length; i++) {
        texts[i].time+=0.1*deltaTime;
        if(texts[i].time >= 1.5) {
            texts.splice(i, 1);
        }
    }

    // update the camera
    camera.z+=camera.zSpeed*deltaTime;
    camera.x+=camera.xSpeed*deltaTime;

    // make it so the player can't leave the play area
    if(camera.x < -490) {
        camera.x = -491;
    }
    if(camera.x > 490) {
        camera.x = 491;
    }

    // Make the fog / haze stronger
    hazeStrength+=0.001*deltaTime;

    if(hazeStrength > camera.zSpeed/3000) {
        hazeStrength-=(camera.zSpeed/3000)*deltaTime
    }

    // make the wind sound volume depend on haze strength
    if(hazeStrength < 0.0) {
        windSound.volume = 0;
        hazeStrength = 0;
    } else if (hazeStrength > 1.0) {
        windSound.volume = 1;
        hazeStrength = 1;
    } else {
        windSound.volume = hazeStrength;
    }

}