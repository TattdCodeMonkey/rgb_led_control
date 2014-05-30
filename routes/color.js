//imports
var express = require('express');
var router = express.Router();
var j5 = require('johnny-five');
var selectedColor = { color : '#00ff00' };

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

  //Set board as ready
  bBoardReady = true;

  //load currently selected color to led
  setLedColor(selectedColor.color);
});

/* GET users listing. */
router.get('/selected_color', function(req, res) {
  res.json(selectedColor);
});

router.post('/select_color',function(req,res){
  selectedColor.color = req.body.newColor;

  setLedColor(selectedColor.color);

  res.json(selectedColor);
});

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function setLedColor(color){
  if(bBoardReady){
    var rgbVal = hexToRgb(color);
    led[RED].brightness(rgbVal.r);
    led[GREEN].brightness(rgbVal.g);
    led[BLUE].brightness(rgbVal.b);
  }
}

module.exports = router;
