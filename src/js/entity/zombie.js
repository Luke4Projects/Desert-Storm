class Zombie extends Entity {
    constructor(x, y, z) {
        super(x, y, z, 40, 70, zombieImg);
        this.health = 3;
        this.lastHit = 2; // this is the last time this zombie damaged the player.
                          // it makes it so the zombie won't instantly kill the player

        // AI variables                  
        this.xSpeed = 0;
        this.lastSpeedChange = 0.0;
    }
    AI() {
        
        // Move on Z axis
        this.z-=3*deltaTime;

        // Move randomly on X axis
        this.lastSpeedChange+=0.01*deltaTime;
        if(this.lastSpeedChange >= 1) {
            this.xSpeed = random(-2, 2);

            this.lastSpeedChange = 0.0;
        }

        this.x += this.xSpeed*deltaTime;

        // stop from going beyond play area
        if(this.x < -490) {
            this.x = -491;
        }
        if(this.x > 490) {
            this.x = 491;
        }

    }
}