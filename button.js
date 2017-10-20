//initial setup
var express = require('express');
var socket = require('socket.io');
var app = express();
var server = app.listen(5000);
app.use(express.static('public'));
console.log("Node is running on port 5000...");
var io = socket(server);
io.sockets.on('connection', newConnection);

var five = require("johnny-five"),
    bumper, led, piezo, song;
var buttonPress = false;

five.Board().on("ready", function () {
    //define ports on arduino
    bumper = new five.Button(7);
    led = new five.Led(13);
    piezo = new five.Piezo(3);

//button pressed
    bumper.on("hit", function () {
        //light and sound on
        led.on();
        piezo.play({
            song: "A A A A A A A A A A A A A A",
            beats: 1 / 4,
            tempo: 113
        });
        console.log("1");
        buttonPress = true;
        io.sockets.emit('buttonEvent', buttonPress);
    });
//button not pressed
    bumper.on("release", function () {
        //light and sound off
        led.off();
        piezo.off();
        buttonPress = false;
        console.log("0");
        io.sockets.emit('buttonEvent', buttonPress);

    });
});
//send data
function newConnection(socket) {
    console.log('New connection: ' + socket.id);
    
    io.sockets.emit('buttonEvent', buttonPress);
   
}
