var inTutorial = false;

function startTutorial() {

    if(!inTutorial) {
        document.write(

        // how to play header
        "<h1>How to play</h1>" +

        // how to play paragraph
        "<p>The goal of the game is to kill as many zombies as possible. Use your gun to kill the zombies. You will get 5 points per zombie kill. If a zombie passes you, you will loose one point</p>" +
        "<p>Try to not stay in the same place for a long time. If you do, the storm will come in and you will loose vision as it gets dusty. Move forward to get away from the storm</p>" +

        // controls header
        "<h1>Controls</h1>" +

        // controls paragraph
        "<p>Walk forward &nbsp; | &nbsp; 'W'</p>" +
        "<p>Strafe right &nbsp; &nbsp; &nbsp; | &nbsp; 'D'</p>" +
        "<p>Strafe left &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; 'A'</p>" +
        "<p>Shoot &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; 'Click' or 'Left-Shift' </p>" + 

        // Return to menu button

        "<button onclick='returnToMainMenu();'>Back to main menu</button>" +

        // Styles
        "<style>" + 
        "@import url('https://fonts.googleapis.com/css2?family=Titillium+Web&display=swap');" +
        "body {background-image: url('data/textures/menu/menu.png')}" +
        "h1 {font-family: 'Titillium Web'; font-size:45px}" + 
        "p {font-family: 'Titillium Web'; font-size: 25px}" +
        "button {font-family: 'Titillium Web'; width: 180px; height: 50px; border: none; font-size: 20px; background-color: blue; color: white;}" +
        "</style>"
        )
    }

    // make it so there aren't a bunch of text repeated
    inTutorial = true;

}

function returnToMainMenu() {
    location.reload();
}