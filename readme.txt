This demos how to use node.

============Required modules==============
[1] install golbal as root
npm install supervisor -g
npm install mocha -g
npm install forever -g

============Tags==============
[1]step-01 load node to run forever
[2]step-02 read a form from file system, add node superviser. 
[3]step-03 add angularjs client and multiple views
[4]step-04 add mongojs read for users, have a defect for http get
[5]step-05 restructure the codes to use jade, CRUD

============Test==============
curl -i http://10.100.78.111:3000/api/users


============References==============
http://coenraets.org/blog/2012/10/creating-a-rest-api-using-node-js-express-and-mongodb/
https://github.com/mongodb/node-mongodb-native
http://webapplog.com/tutorial-node-js-and-mongodb-json-rest-api-server-with-mongoskin-and-express-js/
http://blog.ijasoneverett.com/2013/03/a-sample-app-with-node-js-express-and-mongodb-part-1/
http://blog.nodejitsu.com/keep-a-nodejs-server-up-with-forever
https://github.com/nodejitsu/forever



https://github.com/mafintosh/mongojs

// find all named 'mathias' and increment their level
db.mycollection.update({name:'mathias'}, {$inc:{level:1}}, {multi:true}, function() {
    // the update is complete
});

// find one named 'mathias', tag him as a contributor and return the modified doc
db.mycollection.findAndModify({
    query: { name: 'mathias' },
    update: { $set: { tag:'maintainer' } },
    new: true
}, function(err, doc) {
    // doc.tag === 'maintainer'
});