var db = require('../db');
var SuggestionUtil = require('./../utils/suggestions_util');

const FETCH_IN =
  'SELECT item_id,dish_family,restaurant_id,calorie,cross_items  from item_data where item_id in $itemsArray';
const FETCH_ALL =
  'SELECT item_id,dish_family,restaurant_id,calorie,cross_items from item_data limit $limit';
const ITEM_CALORIE =
  'SELECT item_id,calorie  from item_data order by calorie desc';

exports.fetchTheseItems = function(itemIdArray, done) {
  inBlob = '(' + itemIdArray + ')';
  sql_query = FETCH_IN.replace('$itemsArray', inBlob);

  db.get().query(sql_query, function(err, rows) {
    if (err) {
      return done(err);
    }
    to_send = [];
    rows.forEach(function(item) {
      suggestion = [];
      if (item.cross_items) {
        suggestion = SuggestionUtil.getSuggestedItems(
          JSON.parse(item.cross_items)
        );
      }

      to_send.push({
        item_id: item.item_id,
        dish_family: item.dish_family,
        restaurant_id: item.restaurant_id,
        calories: item.calorie,
        suggested_items: suggestion,
      });
    });
    typeof done === 'function' && done(to_send);
  });
};

exports.fetchAllItems = function(limit, done) {
  limit = limit || 100;
  limit - Math.min(limit, 1000);
  sql_query = FETCH_ALL.replace('$limit', limit);
  db.get().query(sql_query, function(err, rows) {
    if (err) {
      return done(err);
    }
    to_send = [];
    rows.forEach(function(item) {
      suggestion = [];
      if (item.cross_items) {
        suggestion = SuggestionUtil.getSuggestedItems(
          JSON.parse(item.cross_items)
        );
      }

      to_send.push({
        item_id: item.item_id,
        dish_family: item.dish_family,
        restaurant_id: item.restaurant_id,
        calories: item.calorie,
        suggested_items: suggestion,
      });
    });
    done(to_send);
  });
};

var calorieItemsMap = {};
function createCaloriesItemsMap(requestedCalorie, done) {
  console.log('ITEM_CALORIE = ' + ITEM_CALORIE);
  if (
    Object.keys(calorieItemsMap).length === 0 &&
    calorieItemsMap.constructor === Object
  ) {
    db.get().query(ITEM_CALORIE, function(err, rows) {
      if (err) {
        return;
      }
      rows.forEach(function(item) {
        if (!calorieItemsMap[item.calorie]) {
          calorieItemsMap[item.calorie] = [];
        }
        calorieItemsMap[item.calorie].push(item.item_id);
      });
      console.log('creating new');
      if (requestedCalorie) {
        done(calorieItemsMap[requestedCalorie]);
      } else {
        done(calorieItemsMap);
      }
    });
  } else {
    console.log('from cache');
    if (requestedCalorie) {
      done(calorieItemsMap[requestedCalorie]);
    } else {
      done(calorieItemsMap);
    }
  }
  // console.log(calorieItemsMap);
}

exports.createCaloriesItemsMap = function(requestedCalorie, done) {
  createCaloriesItemsMap(requestedCalorie, done);
  // done(calorieItemsMap);
};
