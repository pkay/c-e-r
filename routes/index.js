var express = require('express');
var router = express.Router();

var path = require('path');
var fs = require('fs'); // File System

var dummyLocations = [
  ['Roberta Pelan', 43.6477782, -79.3895628999999, 4],
  ['AC Repair Co', 43.665269,  -79.4540472, 5],
  ['Clint Roenisch Gallery', 43.6544637, -79.4428587, 3],
  ['Cooper Cole', 43.6687871,  -79.4377605, 2],
  ['Franz Kaka', 43.6601822, -79.4455269, 1]
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/flags', function(req, res) {
  var data = [];

  var csv = fs.readFileSync(path.join(__dirname, '../TO-gps.csv')).toString();

  csv.split('\n').forEach((row, index) => {
    if (index !== 0) {
      row = row.match(/(.*)\,\"(.*)\"\,(.*)\,(.*)\,(.*)\,\"(.*)\"/);
      if (row) {
        data.push([row[1], row[4], row[5]]);
      }
    }
  });

  res.json(data);
})

module.exports = router;
