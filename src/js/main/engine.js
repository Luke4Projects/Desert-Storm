// Anchor.js
// JavaScript Game Engine / Framework
// 460games - Luke4Projects

var canvas = document.getElementById("canv");
var c = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;

var touchX = 500;
var touchY = 500;

var scaleFitNative = Math.max(width / 1000, height / 1000);

var deadScreen = false;

var camera = {
    x: 0,
    y: 0,
    z: 0,
    xSpeed: 0,
    ySpeed: 0,
    zSpeed: 0,
}

window.onload = function() {
    setCanvasScale();
    startGame();
}

function startGame() {
    setCanvasScale();
    start();
    atMainMenu = false;
}

window.addEventListener("resize", function() {
    setCanvasScale();
})

function engineUpdate() {
    getDeltaTime();
    if(!deadScreen) {
        update();
        render();
        flashScreen("red");
        if(fading) {
            fadeOut("black");
        }
    }
    requestAnimationFrame(engineUpdate);
}

function setColor(color) {
    c.fillStyle = color;
}

function fillRect(x, y, w, h) {
    c.fillRect(x*scaleFitNative, y*scaleFitNative, w*scaleFitNative, h*scaleFitNative);
}

function fillText(text, x, y, size, color, font) {
    c.font = size*scaleFitNative + "px " + font;
    setColor(color);
    c.fillText(text, x*scaleFitNative, y*scaleFitNative);
}

function noScale_fillText(text, x, y, size, color, font) {
    c.font = size*scaleFitNative + "px " + font;
    setColor(color);
    c.fillText(text, x, y);
}

function drawImg(img, x, y, w, h) {
    c.drawImage(img, x*scaleFitNative, y*scaleFitNative, w*scaleFitNative, h*scaleFitNative);
}

function drawTriangle(x1, y1, x2, y2, x3, y3) {
    drawLine(x1, y1, x2, y2);
    drawLine(x2, y2, x3, y3);
    drawLine(x3, y3, x1, y1);
}

function background(img) {
    c.drawImage(img, 0, 0, width, height);
}

function translate(x, y) {
    c.translate(x*scaleFitNative, y*scaleFitNative);
}

function setOpacity(value) {
    c.globalAlpha = value;
}

function drawLine(x1, y1, x2, y2) {
    c.beginPath();
    c.moveTo(x1*scaleFitNative, y1*scaleFitNative);
    c.lineTo(x2*scaleFitNative, y2*scaleFitNative);
    c.stroke();
    c.closePath();
}

function moveTo(x, y) {
    c.moveTo(x*scaleFitNative, y*scaleFitNative);
}

function lineTo(x, y) {
    c.lineTo(x*scaleFitNative, y*scaleFitNative);
}

function setCanvasScale() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    c.webkitImageSmoothingEnabled = false;
    c.mozImageSmoothingEnabled = false;
    c.imageSmoothingEnabled = false;
    scaleFitNative = Math.max(width / 1000, height / 1000);
}

function toRadians(d) {
    return d * (Math.PI/180);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

var flashOp = 0.0;
var flashing = false;

function flashScreen(color) {
    setColor(color);
    if(flashOp < 0.3 && flashing) {
        flashOp+=0.02*deltaTime;
    } else {
        flashing = false;
    }
    if(!flashing && flashOp > 0.02) {
        flashOp-=0.02*deltaTime;
    }
    c.globalAlpha = flashOp;
    fillRect(0, 0, 1000, 1000);
    c.globalAlpha = 1;
}

var fadeFlashOp = 0;
var fading = false;

function fadeOut(color) {
    setColor(color);
    fadeFlashOp+=0.05*deltaTime;
    c.globalAlpha = fadeFlashOp;
    fillRect(0, 0, 1000, 1000);
    c.globalAlpha = 1;
}

var deltaTime;
var dlastcalledtime = Date.now();

function getDeltaTime() {
    deltaTime = (Date.now() - dlastcalledtime) / 10;
    dlastcalledtime = Date.now();
}

function cos(a) {
    return Math.cos(a);
}

function sin(a) {
    return Math.sin(a);
}

function connect(v1, v2) {
    drawLine(v1.x-camera.x, v1.y-camera.y, v2.x-camera.x, v2.y-camera.y);
}

function loadImage(url) {
    var image = new Image();
    image.src = url;
    return image;
}

function loadAudio(url) {
    return new Audio(url);
}
