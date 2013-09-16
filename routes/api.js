var db = require('./db.js');
var mongojs = require('mongojs');

// ===== GET user =====
exports.users = function(req, res) {
	db.find('user',{}, 10, function(err, users) {
		if (!err) {
			return res.send(users);
		} else {
			return console.log(err);
		}
	});
};

exports.user = function (req, res) {
	var id = req.params.id;
	db.findOne('user', {'_id': mongojs.ObjectId(id)}, {}, function(err, user){
		if (!err) {
			return res.send(user);
		} else {
			return console.log(err);
		}
	});
};

// ===== POST user =====
exports.addUser = function(req, res) {
	db.save('user', req.body)
	res.send(req.body);
};

// ===== PUT user =====
exports.editUser = function(req, res) {
	var id = req.body._id;
	delete req.body['_id']
	db.update('user',  {'_id': mongojs.ObjectId(id)}, {$set: req.body}, {upsert: false, multi:false},
		function(){
			res.send(req.body);
	});
};

// ===== DELETE user =====
exports.deleteUser = function (req, res) {
	var id = req.params.id;
	console.log('server del user id->' + id);
	db.remove('user', {'_id': mongojs.ObjectId(id)}, function(err, user){
		if (!err) {
			res.json(true);
		} else {
			console.log(err);
			res.json(false);
		}
	});
};