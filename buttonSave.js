
var five = require("johnny-five"),
    bumper, led, piezo, song;
//require("./server.js");
var buttonPress = false;

five.Board().on("ready", function () {
    //define ports on arduino
    //if wrong (7);
    bumper = new five.Button(7);
    led = new five.Led(13);
    piezo = new five.Piezo(3);


    bumper.on("hit", function () {
        //light and sound on
        led.on();
        piezo.play({
            song: "C D F D A - A A A A G G G G - - C D F D G - G G G G F F F F - -",
            beats: 1 / 4,
            tempo: 113
        });
        console.log("1");
        
    });
    bumper.on("release", function () {
        //light and sond off
        led.off();
        piezo.off();

    });
});
