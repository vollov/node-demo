var mongoose = require('mongoose');

var dbURL = 'mongodb://localhost/rental';
mongoose.connect(dbURL);

var UserSchema = new mongoose.Schema({
	email : {type: String, unique: true},
	password : String
});

var User = mongoose.model('User', UserSchema);

module.exports.User = User;

//module.exports.loadUser = loadUser;
//
//function loadUser(req, res, next) {
//	User.findOne({
//		email : req.params.email
//	}, function(err, user) {
//		if (err) {
//			return next(err);
//		}
//		if (!user) {
//			return res.send('Not found', 404);
//		}
//		req.user = user;
//		next();
//	});
//}


// Add user to database
//function addUser(username, password, callback) {
//  var instance = new MyUser();
//  instance.username = username;
//  instance.password = password;
//  instance.save(function (err) {
//    if (err) {
//      callback(err);
//    }
//    else {
//      callback(null, instance);
//    }
//  });
//}