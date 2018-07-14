exports.getSuggestedItems = function (itemIdCountMap) {
    descSorted =  Object.keys(itemIdCountMap).sort(function(a, b){return itemIdCountMap[b]-itemIdCountMap[a]})
    toReturn = []
    for(var i=0; i< descSorted.length;i++) {
        toReturn.push(descSorted[i]);
    }
    return toReturn;
};