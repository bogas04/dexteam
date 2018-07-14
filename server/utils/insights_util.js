exports.getTopFiveRestaurants = function (restIdCountMap) {
    descSorted =  Object.keys(restIdCountMap).sort(function(a, b){return restIdCountMap[b]-restIdCountMap[a]})
    toReturn = []
    for(var i=0; i<5 && i< descSorted.length;i++) {
        toReturn.push(descSorted[i]);
    }
    return toReturn;
};


exports.getTopFiveItems = function (itemIdCountMap) {
    descSorted =  Object.keys(itemIdCountMap).sort(function(a, b){return itemIdCountMap[b]-itemIdCountMap[a]})
    toReturn = []
    for(var i=0; i<5 && i< descSorted.length;i++) {
        toReturn.push(descSorted[i]);
    }
    return toReturn;

};



