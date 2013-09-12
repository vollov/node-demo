//var User = require('../models/user.js');
var db = require('../api/db');

exports.findUsers = function(req, res) {
	//console.log('calling findusers');
	db.find('user',{}, 10, function(err, users) {
		if (!err) {
			return res.send(users);
		} else {
			return console.log(err);
		}
	});
};

//var db = require('./auth.js');
//
//exports.findUsers = function(req, res) {
//    db.collection('user', function(err, collection) {
//        collection.find().toArray(function(err, items) {
//            res.send(items);
//        });
//    });
//};

// exports.findUsers = function(req, res, next) {
//	User.find({}, function(err, users) {
//		if (err) {
//			return next(err);
//		}
//		res.send(users);
//	});
//    res.send([{name:'wine1'}, {name:'wine2'}, {name:'wine3'}]);
//};
 
//exports.findUserById = function(req, res) {
//    console.log('get id=' + req.params.id);
//    res.send({id:req.params.id, name: "The Name", description: "description"});
//};
