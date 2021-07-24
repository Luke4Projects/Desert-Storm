var mouseX,mouseY;
var mousePressed = false;

function mouseDown() {
    if(player_canShoot) {
        player_shoot();
    }
}

function getMousePos(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
} 

window.addEventListener("mousemove", function(e) {
    getMousePos(e);
})

window.addEventListener("mousedown", function(e) {
    songAudio.play();
    getMousePos(e);

    mousePressed = true;
})

window.addEventListener("mouseup", function(e) {
    mousePressed = false;
})