//imports
var express = require('express');
var router = express.Router();
var j5 = require('johnny-five');

//constants
var DB_NAME = 'rgb_led_control';
var RED_PIN = 9;
var GREEN_PIN = 10;
var BLUE_PIN = 11;
var RED = 0;
var GREEN =1;
var BLUE = 2;

//globals
var led;
var bBoardReady = false;
board = new j5.Board();

board.on("ready", function(){
  //create led array
  led = [
   new j5.Led(RED_PIN),
   new j5.Led(GREEN_PIN),
   new j5.Led(BLUE_PIN)
  ];

  //put all leds in the off state
  led[RED].off();
  led[GREEN].off();
  led[BLUE].off();

  //Set board as ready
  bBoardReady = true;
});

/* GET users listing. */
router.get('/selected_color', function(req, res) {
  var db = req.db;
  db.collection(DB_NAME).find({id:1}).toArray(function (err, items) {
        if(err){
            res.json({id:0, color: '#000000'});
        }
        else{
            res.json(items);
        }
    });
});

router.post('/select_color',function(req,res){
  console.log('select color called');
  var db = req.db;
  db.collection(DB_NAME).update(
    {id:1},
    {$set: {color: req.body.newColor}},
    function(err, result) {
    if (err){
      res.json({ color: req.body.currentColor });
    }
    else{
      res.json({ color: req.body.newColor });
      if(bBoardReady){
        var rgbVal = hexToRgb(req.body.newColor);
        led[RED].brightness(rgbVal.r);
        led[GREEN].brightness(rgbVal.g);
        led[BLUE].brightness(rgbVal.b);
      }
    }
    });
});

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

module.exports = router;
