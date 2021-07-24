var zombieIterator = 0; // the amount of spawns since the last zombie spawn
                        // Purpose: make less zombies

var cloudIterator = 0; // Similar to zombie iterator, but for clouds       


var wallIterator = 0; // Similar to zombie iterator, but for walls                       

function spawnEntities() {

    if(camera.zSpeed != 0 && moving) {

        // create cactus
        var cactus = new Cactus(random(-500, 500), -20, camera.z+1300);
        entities.push(cactus);

        // create sand particles
        for(let i = 0; i < 10; i++) {
            var part = new Particle3D(random(-500, 500), 60, camera.z+1300, 10, 10, (random(0, 5) == 3 ? "yellowgreen" : "orange"), 1);
            sand.push(part);
        }

        // create clouds in the sky (patricles) if it has been long enough
        cloudIterator++;
        if(cloudIterator >= 10) {
            var cloud = new Particle3D(random(-500, 500), -400, camera.z+1300, 200, 300, "white", 0.5);
            sand.push(cloud);

            cloudIterator = 0;
        }

        // Create wall particles
        wallIterator++;
        if(wallIterator > 2) {
            walls.push(new WallParticle(-500, random(-350, 20), camera.z+1150, 25, 80, "dimgray", false));
            walls.push(new WallParticle(500, random(-350, 20), camera.z+1150, 25, 80, "dimgray", false));
            wallIterator = 0;
        }

    }

     // create zombies (if it has been long enough)
     zombieIterator++;
     if(zombieIterator >= 10) {
         var zombie = new Zombie(random(-500, 500), -10, camera.z+1300);
         entities.push(zombie);

         zombieIterator = 0; // reset the zombie iterator
     }

    // recall this function
    setTimeout(spawnEntities, 100);

}