var express = require('express')
  , routes = require('./routes')
  , api = require('./routes/api');

var app = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/client'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//Views
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

//API
app.get('/api/user', api.users);
app.get('/api/user/:id', api.user);
app.post('/api/user', api.addUser);
//app.put('/api/user/:id', api.editUser);
app.put('/api/user', api.editUser);
app.delete('/api/user/:id', api.deleteUser);

//redirect all others to the index (HTML5 history)
app.get('*', routes.index);

app.listen(3000, '0.0.0.0');
console.log("Express server listening...");
