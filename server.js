var express = require('express');
var bodyParser = require('body-parser');
var controller = require('./usersCtrl.js');


var app = express();

app.use(bodyParser.json());

app.get('/api/users', controller.getUsers);
app.get('/api/users/:id', controller.getUserId);
app.get('/api/admins', controller.getAdmins);
app.get('/api/nonadmins', controller.getNonadmins);
app.get('/api/user_type/:type', controller.getUserType);
app.put('/api/users/:id', controller.updateUserByID);
app.post('/api/users', controller.addUser);
app.delete('/api/users/:id', controller.removeUser);


var port = 3000;
app.listen(port, () => {console.log(`My ears hurt from constantly listening on port ${port}`)});
