var express = require('express');
var router = express.Router();

var Items = require('./../models/items');

router.get('/', function(req, res, next) {
  console.log('req.params.limit = ' + JSON.stringify(req.query));
  Items.fetchAllItems(req.query.limit, function(data) {
    return res.status(200).json(data);
  });
});

router.get('/selected', function(req, res, next) {
  console.log(req.query.items);
  var requestedIdArray = JSON.parse(decodeURIComponent(req.query.items));
  Items.fetchTheseItems(requestedIdArray, function(data) {
    return res.status(200).json(data);
  });
});

router.get('/calories_item_map', function(req, res, next) {
  var requestedCalorie = undefined;
  if (req.query.calorie) {
    requestedCalorie = JSON.parse(req.query.calorie);
  }

  Items.createCaloriesItemsMap(requestedCalorie, function(data) {
    return res.status(200).json(data);
  });
});

module.exports = router;
