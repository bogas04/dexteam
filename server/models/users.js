var db = require('../db');
var itemsObj = require('../models/items');
var Insights = require('../utils/insights_util');

const FETCH_ALL = 'SELECT DISTINCT(customer_id) from order_data LIMIT 100';
const FETCH_SINGLE = "SELECT * from users where id='$customer_id'";
const FETCH_ORDERS_OF_DAY =
  "SELECT * from order_data where customer_id='$customer_id' and delivered_time>= 'yyyymmdd 00:00:00' and delivered_time<= 'yyyymmdd 23:59:59'";
const FETCH_ALL_FOR_USER =
  "SELECT * from order_data where customer_id='$customer_id'";
const FETCH_CALORIES_HISTORY_FOR_USER =
  "select * from customers_calorie_history where customer_id='$customer_id'";
const FETCH_CALORIES_HISTORY_FOR_USER_BY_DATE =
  "select * from customers_calorie_history where customer_id='$customer_id' and date='yyyymmdd'";

//UPDATE Customers
//SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
//WHERE CustomerID = 1;

const PUT_MEAL_DATA_IN_CALORIE_HISTORY_WHEN_PRESENT =
  "update customers_calorie_history SET calories_intake=$cal_in, metadata='$json_blob' where customer_id='$customer_id' and date='yyyymmdd' and id='$id'";
const PUT_MEAL_DATA_IN_CALORIE_HISTORY_WHEN_ABSENT =
  "insert into customers_calorie_history values('','$customer_id', '$cal_in', 'yyyymmdd', 0, '[]', '$json_blob')";
exports.fetchAllUsers = function(done) {
  db.get().query(FETCH_ALL, function(err, rows) {
    if (err) {
      return done(err);
    }
    done(rows.map(e => e.customer_id));
  });
};

exports.fetchSingleUserInfo = function(customerId, done) {
  sql_query = FETCH_SINGLE.replace('$customer_id', customerId);
  db.get().query(sql_query, function(err, rows) {
    if (err) {
      return done(err);
    }
    if (rows.length > 0) {
      done(rows[0]);
    } else {
      done(rows);
    }
  });
};

exports.fetchOrderOfDay = function(customerId, dayStr, done) {
  sql_query = FETCH_ORDERS_OF_DAY.replace('$customer_id', customerId).replace(
    /yyyymmdd/g,
    dayStr
  );
  db.get().query(sql_query, function(err, rows) {
    if (err) {
      return done(err);
    }
    that_obj = {
      allRows: [],
    };
    rows.forEach(function(order) {
      // order.test1 ='test2';
      // order.bbb = 'ccc';
      self = order;
      itemsObj.fetchTheseItems(JSON.parse(order.items), order, function(
        data,
        baap
      ) {
        order.aaaaa = 'ppppp';
        baap.abc = data;
        console.log('args 0' + arguments[0]);
        console.log('args 1' + arguments[1]);
        arguments[1]['kuchbhi'] = 'kuchbhi';
        self['aaa'] = 'aaa';
        console.log('self = ' + JSON.stringify(self));
        console.log('order= ' + JSON.stringify(order));
        order.new_items = JSON.stringify(data);
        self.new_items1 = JSON.stringify(data);
        // var a = 1;
        that_obj.allRows.push(self);
      });
    });
    // done(that_obj).then();
    done(rows);
  });
};

exports.userSummary = function(customerId, done) {
  sql_query = FETCH_ALL_FOR_USER.replace('$customer_id', customerId);
  db.get().query(sql_query, function(err, rows) {
    if (err) {
      return done(err);
    }
    var totalRows = rows.length;
    var restaurantsOrderCountMap = {};
    var itemOrderCountMap = {};
    var totalMoneySpent = 0;
    for (var i = 0; i < totalRows; i++) {
      iterRow = rows[i];
      restId = iterRow['restaurant_id'];
      if (restId in restaurantsOrderCountMap) {
        restaurantsOrderCountMap[restId] = restaurantsOrderCountMap[restId] + 1;
      } else {
        restaurantsOrderCountMap[restId] = 1;
      }
      orderItems = JSON.parse(iterRow['items']);
      orderItems.forEach(function(itemInOrder) {
        if (itemInOrder in itemOrderCountMap) {
          itemOrderCountMap[itemInOrder] = itemOrderCountMap[itemInOrder] + 1;
        } else {
          itemOrderCountMap[itemInOrder] = 1;
        }
      });
      totalMoneySpent += parseFloat(iterRow['gmv_total']);
    }
    var insights = {
      total_order: totalRows,
      top_5_restaurants: Insights.getTopFiveRestaurants(
        restaurantsOrderCountMap
      ),
      top_5_items: Insights.getTopFiveItems(itemOrderCountMap),
      total_money_spent: totalMoneySpent,
      average_gmv: totalMoneySpent / totalRows,
    };
    done(insights);
  });
};

exports.userCaloriesInOut = function(customerId, done) {
  sql_query = FETCH_CALORIES_HISTORY_FOR_USER.replace(
    '$customer_id',
    customerId
  );
  db.get().query(sql_query, function(err, rows) {
    if (err) {
      return done(err);
    }
    done(rows);
  });
};

exports.userCaloriesInOutByDate = function(customerId, dayStr, done) {
  sql_query = FETCH_CALORIES_HISTORY_FOR_USER_BY_DATE.replace(
    '$customer_id',
    customerId
  ).replace(/yyyymmdd/g, dayStr);
  db.get().query(sql_query, function(err, rows) {
    if (err) {
      return done(err);
    }
    sumObj = {
      customer_id: customerId,
      calories_intake: 0,
      date: dayStr,
      calories_out: 0,
    };
    rows.forEach(function(history) {
      sumObj.calories_intake += history.calories_intake;
      sumObj.calories_out += history.calories_out;
    });
    done(sumObj);
  });
};

exports.addThisMealToDate = function(customerId, dayStr, requestBody, done) {
  var actualMetadataObject = requestBody.metadata;
  var calIn = actualMetadataObject[0].calories;
  var jsonBlobAsString = JSON.stringify(actualMetadataObject);
  sql_query = FETCH_CALORIES_HISTORY_FOR_USER_BY_DATE.replace(
    '$customer_id',
    customerId
  ).replace(/yyyymmdd/g, dayStr);

  db.get().query(sql_query, function(err, rows) {
    if (err) {
      return done(err);
    }
    if (rows.length) {
      //entry present
      var existingValue = rows[0]; //multiple rows case, update 1st row only
      var rowId = existingValue['id'];
      var existingCalIntake = existingValue['calories_intake'];
      var newCalIntake = existingCalIntake + calIn;
      var existingJsonBlob = existingValue['metadata'];
      var existingJsonBlobParsed = JSON.parse(existingJsonBlob);
      existingJsonBlobParsed.push(actualMetadataObject[0]);
      var stringifiedNewMeta = JSON.stringify(existingJsonBlobParsed);
      present_query = PUT_MEAL_DATA_IN_CALORIE_HISTORY_WHEN_PRESENT.replace(
        '$customer_id',
        customerId
      )
        .replace('$cal_in', newCalIntake)
        .replace(/yyyymmdd/g, dayStr)
        .replace('$json_blob', stringifiedNewMeta)
        .replace('$id', rowId);
      db.get().query(present_query, function(err, rows2) {
        done(rows2);
      });
    } else {
      //row absent
      //"insert into customers_calorie_history values('$customer_id', '$cal_in', 'yyyymmdd', 0, '', '$json_blob')";
      absent_query = PUT_MEAL_DATA_IN_CALORIE_HISTORY_WHEN_ABSENT.replace(
        '$customer_id',
        customerId
      )
        .replace('$cal_in', calIn)
        .replace(/yyyymmdd/g, dayStr)
        .replace('$json_blob', jsonBlobAsString);
      db.get().query(absent_query, function(err, rows2) {
        done(rows2);
      });
    }
  });
};
