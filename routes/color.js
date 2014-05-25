var express = require('express');
var router = express.Router();
var DB_NAME = 'rgb_led_control';
/* GET users listing. */
router.get('/selected_color', function(req, res) {
  var db = req.db;
  db.collection('rgb_led_control').find({id:1}).toArray(function (err, items) {
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
  db.collection('rgb_led_control').update(
    {id:1},
    {$set: {color: req.body.newColor}},
    function(err, result) {
    if (err){
      res.json({ color: req.body.currentColor });
    }
    else{
      res.json({ color: req.body.newColor });
    }
    });
});

module.exports = router;
