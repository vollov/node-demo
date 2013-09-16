'use strict';

var assert = require('assert')
  , should = require('should')
  , db = require('../routes/db');

suite('database', function() {
    test('find should find 5 users', function(done) {
        db.find('user', {}, 10, function(err, users) {
        	should.not.exist(err);
        	console.log('return ' + users.length + ' users.');
        	users.should.have.lengthOf(5);
        	done();
        });
    });
    
    test('insert should add one user', function(done) {
    	var user = {'password': 'blah', 'is_active': true, 'email': 'insert@gmail.ca','role':2};
    	db.save('user', user);
        db.find('user', {}, 10, function(err, users) {
        	should.not.exist(err);
        	console.log('return ' + users.length + ' users.');
        	users.should.have.lengthOf(6);
        	
        });
    	db.remove('user', {'email': 'insert@gmail.ca'}, function(err, user) {
    		should.not.exist(err);
        	console.log('delete user ' + user.email);
    	} );
    	done();
    });
    
    test('update should update user', function(done) {
    	var user = {'password': 'blah', 'is_active': true, 'email': 'insert@gmail.ca','role':2};
    	db.save('user', user);
    	db.update('user',  {'email': 'insert@gmail.ca'}, {$set: {"email":"insert@gmail.ca","password":"adf","is_active":false,"role":1}}, {multi:true},
    			function(err, doc){
    		should.not.exist(err);
    		console.log('updated user = %j', doc);
    	});
        db.findOne('user', {'email': 'insert@gmail.ca'}, {'is_active': 1, 'email': 1, 'role':1}, function(err, user) {
        	should.not.exist(err);
        	console.log('return user ' + user.email);
        	user.should.have.property('is_active', false);
        	user.should.have.property('role', 1);
        });
    	db.remove('user', {'email': 'insert@gmail.ca'}, function(err, user) {
    		should.not.exist(err);
        	console.log('delete user ' + user.email);
    	} );
    	done();
    });
    
    test('findAndModify should find and update user', function(done) {
    	var user = {'password': 'blah', 'is_active': true, 'email': 'insert@gmail.ca','role':2};
    	db.save('user', user);
    	db.findAndModify('user',  {'email': 'insert@gmail.ca'}, {$set: { is_active: false }}, 
    			function(err, doc){
    		should.not.exist(err);
    		console.log('findAndModify user = %j', doc);
    	});
        db.findOne('user', {'email': 'insert@gmail.ca'}, {'is_active': 1, 'email': 1}, function(err, user) {
        	should.not.exist(err);
        	console.log('return user ' + user.email);
        	user.should.have.property('is_active', false);
        });
    	db.remove('user', {'email': 'insert@gmail.ca'}, function(err, user) {
    		should.not.exist(err);
        	console.log('delete user ' + user.email);
    	} );
    	done();
    });
});