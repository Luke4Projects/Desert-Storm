class Entity {
    constructor(x, y, z, w, h, img) {
        // set positions
        this.x = x;
        this.y = y;
        this.z = z;
        // set scale
        this.w = w;
        this.h = h;
        // set texture
        this.img = img;
        // Projected positions
        this.rx = this.x;
        this.ry = this.y;
        this.rs = this.w;
    }
    render() {
        drawImg(this.img, this.rx, this.ry, this.rs*this.w, this.rs*this.h);
    }
    update() {
        // project to 3d
        this.rs = 800 / (800 + this.z-camera.z);
        this.rx = ((this.x-camera.x) * this.rs) + 500;
        this.ry = ((this.y-camera.y) * this.rs) + 250;
    }
    collideWithPlayer() {
        // check collision on X axis
        if(this.rx + this.rs*this.w > 500 && this.rx < 500) {
            // check collision on Z axis
            if(this.z+700 <= camera.z && this.z+750 > camera.z) {
                // Stop moving
                camera.z = this.z+700;
                moving = false;

                // damage the player if they hit a zombie
                if(this instanceof Zombie) {
                    this.lastHit+=0.05*deltaTime;
                    if(this.lastHit > 2) {
                        player_health--;
                        hurtSound.currentTime = 0.0;
                        hurtSound.play();
                        if(player_health <= 0) {
                            player_die();
                        }
                        flashing = true;
                        this.lastHit = 0.0;
                    }
                }

            }
        }

    }
}