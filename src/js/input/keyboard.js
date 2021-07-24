function keyDown(e) {
    switch(e.code) {
        case "KeyW":
            camera.zSpeed = 5;
            break;
        case "KeyD":
            camera.xSpeed = 5;
            break;
        case "KeyA":
            camera.xSpeed = -5;
            break;
        case "ShiftLeft":
            if(player_canShoot) {
                player_shoot();
            }
            break;
    }
}

function keyUp(e) {
    switch(e.code) {
        case "KeyW":
            camera.zSpeed = 0;
            break;
        case "KeyD":
        case "KeyA":
            camera.xSpeed = 0;
            break;
    }
}

document.onkeydown = keyDown;
document.onkeyup = keyUp;