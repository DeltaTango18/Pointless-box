//npm install johhny five and mongoose
var five = require("johnny-five"),
    bumper, led, piezo, song;
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/pointless');

var db = mongoose.connection;

db.once('open', function () {

    //collection table schema
    var pressSchema = mongoose.Schema({
        pressed: String,
        date: {
            type: Date,
            default: Date.now
        }
    });

    //assign to schema
    var pressed = mongoose.model('buttonPressed', pressSchema);

    five.Board().on("ready", function () {
        //define port on arduino
        bumper = new five.Button({
            controller: "digital",
            pin: "7",
            freq: 100
        });
        bumper.on("change", function () {
            var pressRec = new press({pressed: Date.now});

            pressRec.save(function (err, pressRec) {
                if (err) return console.error(err);
            });

            console.log("pressed");
        });
    });
});