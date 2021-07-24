var restartButton;

function startDeadMenu() {

    document.onmousedown = ""; // make it so the player can't shoot

    deadScreen = true;

    restartButton = new Button(500, 200, 100, 50, "blue", "Restart");

    windSound.volume = 1;

    updateDeadMenu();
}

function renderDeadMenu() {
    // fill the background image
    background(menuImg);
    setOpacity(0.5);
    setColor("red");
    fillRect(0, 0, 1000, 1000);
    setOpacity(1);

    // Fill the game over text
    fillText("Game Over", 210, 100, 80, "black", "Holtwood One SC");
    
    // fill the score text
    fillText("Score: " + player_score, 440, 120, 20, "black", "Holtwood One SC");

    // Draw the restart button
    restartButton.render();
}

function updateDeadMenu() {

    windSound.volume = 1;


    // check for restart button click
    if(restartButton.clicked()) {
        location.reload();
    }

    // draw the dead menu
    renderDeadMenu();

    // recall this function
    requestAnimationFrame(updateDeadMenu);
}