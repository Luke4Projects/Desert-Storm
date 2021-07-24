//----------------------------------------------------------------------------------------\\
// --------------------this file contains functions for the player------------------------\\
//----------------------------------------------------------------------------------------\\


function player_shoot() { // called in mouse.js

    // set bullet positions
    var bulletX = 500 + random(-25, 25);
    var bulletY = 250 + random(-10, 10);
    var bulletColor = "black";
    var bulletSize = 1;

    // Check if there is a zombie infront of the player, and if there is, kill it
    for(let i = 0; i < entities.length; i++) {

        // check if the entity is a zombie
        if(entities[i] instanceof Zombie) {

            // check collision with the zombie
            if(entities[i].rx + entities[i].rs*entities[i].w > bulletX && entities[i].rx < bulletX) {
                bulletColor = "red";
                bulletSize = 5;
                entities[i].health--;
                if(entities[i].health <= 0) {
                    player_score+=5;
                    texts.push({
                        text: "+5",
                        x: entities[i].rx+camera.x,
                        y: entities[i].ry+camera.y,
                        size: 50,
                        color: "green",
                        time: 0.0
                    })
                    entities.splice(i, 1);
                }
            }

        }
    }

    // Create rendered bullet object
    renderedBullets.push( {
        x: bulletX+camera.x,
        y: bulletY,
        time: 0.0,
        color: bulletColor,
        size: bulletSize
    } );

    // Take away a bullet from the player's current ammo
    player_currentAmmo--;
    // Reload if their ammo is at 0
    if(player_currentAmmo <= 0) {
        player_reload();
    }

    // Play the gun shot sound
    shotSound.currentTime = 0.0;
    shotSound.play();
    
    // Make the muzzle flash and gun bounc
    current_gunImg = gun_flashImg;
    setTimeout(function() {
        current_gunImg = gunImg;
    }, 50) 

}


function player_RenderHealthBar() {
    
    // Draw the red part of the health bar (missing health)
    setColor("red");
    c.fillRect((width/2)-300*scaleFitNative, height-48*scaleFitNative, 150*scaleFitNative, 30*scaleFitNative);

    // Draw the green part of the health bar (how much health you have)
    setColor("green");
    c.fillRect((width/2)-300*scaleFitNative, height-48*scaleFitNative, (player_health*30)*scaleFitNative, 30*scaleFitNative);

    // Draw the text that says "Health"
    noScale_fillText("Health", (width/2)-260*scaleFitNative, height-25*scaleFitNative, 25, "black", "arial");

}

function player_RenderAmmoDisplay() {

    // Draw the ammo icon
    c.drawImage(ammoDisplayImg, (width/2)+70*scaleFitNative, height-50*scaleFitNative, 40*scaleFitNative, 40*scaleFitNative);

    // Draw the ammo text
    noScale_fillText(player_currentAmmo, (width/2)+130*scaleFitNative, height-25*scaleFitNative, 25, "black", "arial");

}

function player_RenderScoreDisplay() {

    // draw the points icon
    c.drawImage(scoreDisplayImg, 0*scaleFitNative, 0*scaleFitNative, 40*scaleFitNative, 40*scaleFitNative);

    // draw the score text
    noScale_fillText(player_score, 45*scaleFitNative, 25*scaleFitNative, 25, "black", "arial");

}

function player_reload() {
    // make it so the player can't shoot
    player_canShoot = false;

    // set the ammo as reloading
    player_currentAmmo = "Reloading";

    // play the sound
    reloadSound.currentTime = 0.0;
    reloadSound.play();
    
    // set the ammo back to 9 and make the player able to shoot again
    setTimeout(function() {
        player_currentAmmo = 9;
        player_canShoot = true;
    }, 700)
}

function player_die() {
    deadScreen = true;

    deathSound.play();

    songAudio.pause();
    songAudio.volume = 0.0;
    windSound.volume = 1;

    startDeadMenu();
}