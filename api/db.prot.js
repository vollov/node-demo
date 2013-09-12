var dbURL = 'mongodb://localhost/rental';
var mongojs = require('mongojs');

var db = mongojs(dbURL);

module.exports = {
	find : function(name, query, limit, callback) {
		db.collection(name).find(query).sort({
			_id : -1
		}).limit(limit).toArray(callback);
	},

	findOne : function(name, query, callback) {
		db.collection(name).findOne(query, callback);
	},
	insert : function(name, items, callback) {
		db.collection(name).insert(items, callback);
	},
	insertOne : function(name, item, callback) {
		module.exports.insert(name, item, function(err, items) {
			callback(err, items[0]);
		});
	},
	open : function(callback) {
		db.open(callback);
	}
}
