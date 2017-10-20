var express = require('express');
var socket = require('socket.io');
require("./button.js");
//store the express functions to var app
var app = express();
//Create a server on localhost:3000
var server = app.listen(5000);
//host content as static on public
app.use(express.static('public'));
console.log("Node is running on port 5000...");
//assign the server to the socket
var io = socket(server);
//dealing with server events / connection
io.sockets.on('connection', newConnection); //callback

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

//function that serves the new connection
function newConnection(socket){
	console.log('New connection: ' + socket.id);
	//socket.on('clickEvent', mouseMsg);
	//function mouseMsg(data){
		//socket.broadcast.emit('clickEvent', data);
		//following line refers to sending data to all
		io.sockets.emit('buttonEvent', buttonPress);
	//	console.log(data);
	//}
}