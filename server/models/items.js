var db = require('../db')

const FETCH_IN = "SELECT * from items_metadata where item_id in $itemsArray";

exports.fetchTheseItems = function(itemIdArray, baap,  done) {
    inBlob = "(" + itemIdArray + ")";
    sql_query = FETCH_IN.replace('$itemsArray', inBlob);

    db.get().query(sql_query, function (err, rows) {
        if(err) {
            return done(err);
        }
        baap["from_items"] = rows;
        done(rows, baap);
    });
};

var calorieItemsMap = {};
function createCaloriesItemsMap() {

}

createCaloriesItemsMap(function (d) {
    console.log(d + "items added in map.");
})