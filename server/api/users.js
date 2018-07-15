var express = require('express');
var router = express.Router();
var Users = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Users.fetchAll(function(data) {
    return res.status(200).json(data);
  });
});

router.post('/', function(req, res, next) {
  //post profile
  // res.send('respond with a resource');
});

router.get('/:customer_id/summary', function(req, res, next) {
  //summary
  Users.userSummary(req.params.customer_id, function(data) {
    return res.status(200).json(data);
  });
});

router.get('/:customer_id/diet/:date_string', function(req, res, next) {
  //diet on a particular date
  Users.fetchOrderOfDay(
    req.params.customer_id,
    req.params.date_string,
    function(data) {
      return res.status(200).json(data);
    }
  );
});

router.put('/put_meal', function(req, res, next) {
  //put a new meal calorie detail

  res.send('respond with a resource');
});

module.exports = router;
