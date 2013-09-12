var mongojs = require('mongojs');
var db = mongojs('localhost/rental');

module.exports = {
    find : function(collection, query, limit, callback) {
    	db.collection(collection).find(query).limit(limit).toArray(callback);
        //console.log('find db=> ' + db + ' , coll=> ' + collection);
    },
    save : function(collection) {
    	console.log('save db=> ');
        //console.log('save db=> ' + db + ' , coll=> ' + collection);
    }
}
