'use strict';


var assert = require('assert')
  , should = require('should')
  , db = require('../api/db');

suite('database', function() {
    test('find should find 5 users', function(done) {
        db.find('user', {}, 10, function(err, users) {
        	should.not.exist(err);
        	console.log('return ' + users.length + ' users.');
        	users.should.have.lengthOf(5);
        	done();
        });
    });
});