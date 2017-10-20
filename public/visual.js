var socket;
var serial;
var buttonEvent;

function setup() {
    createCanvas(800, 600);
    background(50);
    socket = io.connect('http://localhost:5000');
    socket.on('buttonEvent', newDrawing);   
}

function newDrawing(buttonEvent) {
    console.log(buttonEvent);
    if (buttonEvent == true){
        fill(random(255), random(255), random(255))
        ellipse(random(800), random(600), random(50, 200), random(50, 200));
    }
}

function draw() { 
}
